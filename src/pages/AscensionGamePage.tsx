import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Award,
  Check,
  Compass,
  Crown,
  Dices,
  Flame,
  Gamepad2,
  Heart,
  Lock,
  Minus,
  Plus,
  RotateCcw,
  Scale,
  Share2,
  Shield,
  Skull,
  Sparkles,
  Undo2,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import {
  formatModifier,
  getAbilityModifier,
  type AscensionSaga,
  type DndAbility,
  type DndChoice,
  type DndEncounterNode,
  type EndingTier,
} from '../data/ascensionGame';
import { getDeityPortrait } from '../data/visuals';
import { copyShareableUrl } from '../hooks/useRouter';
import { useI18n } from '../i18n/I18nContext';
import { compactTraditionName, splitTitleHead } from '../i18n/uiStrings';
import type { RouteState } from '../types/mythology';
import type { PantheonFocus } from '../utils/storage';
import {
  playCheckFail,
  playCheckSuccess,
  playDiceClatter,
  playEndingGong,
} from '../utils/soundFx';

interface AscensionGamePageProps {
  pantheonFocus: PantheonFocus;
  initialSagaId?: string;
  onSelectSagaId: (sagaId: string) => void;
  navigate: (next: RouteState) => void;
  onJumpToCompareDeity: (deityId: string) => void;
}

interface UnlockedRelic {
  sourceNodeId: string;
  choiceId: string;
  fallbackName: string;
  bonusAbility: DndAbility;
  bonusValue: number;
}

interface CampaignSnapshot {
  nodeId: string;
  stats: Record<DndAbility, number>;
  bonusAlloc: Record<DndAbility, number>;
  selectedBoonId: string;
  resolve: number;
  relics: UnlockedRelic[];
  visitedNodeIds: string[];
  walkedEdges: string[];
  inspirationAvailable: boolean;
}

interface PendingResolution {
  choiceId: string;
  isRolling: boolean;
  displayDie: number;
  naturalRoll: number | null;
  abilityMod: number;
  relicMod: number;
  totalRoll: number | null;
  succeeded: boolean;
  spiritCollapsed: boolean;
  targetNodeId: string;
}

const ENDINGS_STORAGE_KEY = 'mythos_archive_dnd_endings_v1';
const BESTIARY_ENDINGS_STORAGE_KEY = 'mythos_bestiary_dnd_endings_v1';
const VALID_SAGA_ID_RE = /^[a-z0-9-]{2,40}$/;
const VALID_TIERS = new Set<EndingTier>(['deity', 'alternate', 'failure']);
const MAX_BONUS_POINTS = 2;

function loadDiscoveredEndings(isBestiary: boolean): Record<string, EndingTier[]> {
  try {
    const raw = window.localStorage.getItem(
      isBestiary ? BESTIARY_ENDINGS_STORAGE_KEY : ENDINGS_STORAGE_KEY
    );
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};
    const safe: Record<string, EndingTier[]> = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (!VALID_SAGA_ID_RE.test(k) || !Array.isArray(v)) continue;
      safe[k] = v.filter((item): item is EndingTier => VALID_TIERS.has(item as EndingTier));
    }
    return safe;
  } catch {
    return {};
  }
}

function saveDiscoveredEndings(data: Record<string, EndingTier[]>, isBestiary: boolean): void {
  try {
    window.localStorage.setItem(
      isBestiary ? BESTIARY_ENDINGS_STORAGE_KEY : ENDINGS_STORAGE_KEY,
      JSON.stringify(data)
    );
  } catch {
    // Ignore storage quota errors safely
  }
}

function resolveRelicDisplayName(saga: AscensionSaga, relic: UnlockedRelic): string {
  const srcNode = saga.nodes[relic.sourceNodeId];
  if (srcNode?.kind === 'encounter') {
    const ch = srcNode.choices.find((c) => c.id === relic.choiceId);
    if (ch?.unlockedRelic?.name) {
      return ch.unlockedRelic.name;
    }
  }
  return relic.fallbackName;
}

export const AscensionGamePage: React.FC<AscensionGamePageProps> = ({
  pantheonFocus,
  initialSagaId,
  onSelectSagaId,
  navigate,
  onJumpToCompareDeity,
}) => {
  const { locale, realm, ui, data } = useI18n();
  const isBestiary = realm === 'bestiary';
  const isZh = locale === 'zh';

  const visibleSagas = useMemo(
    () =>
      pantheonFocus === 'all'
        ? data.ascensionSagas
        : data.ascensionSagas.filter((s) => s.traditionId === pantheonFocus),
    [data.ascensionSagas, pantheonFocus]
  );

  const [selectedSagaId, setSelectedSagaId] = useState<string>(() => {
    if (pantheonFocus !== 'all') {
      return visibleSagas[0]?.id ?? data.ascensionSagas[0].id;
    }
    return initialSagaId &&
      VALID_SAGA_ID_RE.test(initialSagaId) &&
      data.ascensionSagas.some((s) => s.id === initialSagaId)
      ? initialSagaId
      : data.ascensionSagas[0].id;
  });

  const saga: AscensionSaga = useMemo(
    () =>
      visibleSagas.find((s) => s.id === selectedSagaId) ??
      visibleSagas[0] ??
      data.ascensionSagas[0],
    [data.ascensionSagas, selectedSagaId, visibleSagas]
  );

  const [currentNodeId, setCurrentNodeId] = useState<string>(saga.startNodeId);
  const [baseStats, setBaseStats] = useState<Record<DndAbility, number>>({
    ...saga.startingStats,
  });
  const [bonusAlloc, setBonusAlloc] = useState<Record<DndAbility, number>>({
    might: 0,
    wisdom: 0,
    dominion: 0,
  });
  const [selectedBoonId, setSelectedBoonId] = useState<string>(data.startingBoons[0].id);
  const [resolve, setResolve] = useState<number>(saga.startingResolve);
  const [relics, setRelics] = useState<UnlockedRelic[]>([]);
  const [visitedNodeIds, setVisitedNodeIds] = useState<string[]>([saga.startNodeId]);
  const [walkedEdges, setWalkedEdges] = useState<string[]>([]);
  const [inspirationAvailable, setInspirationAvailable] = useState<boolean>(true);
  const [historyStack, setHistoryStack] = useState<CampaignSnapshot[]>([]);
  const [pending, setPending] = useState<PendingResolution | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [codexOpen, setCodexOpen] = useState<boolean>(false);
  const [discoveredEndings, setDiscoveredEndings] = useState<Record<string, EndingTier[]>>(() =>
    loadDiscoveredEndings(isBestiary)
  );

  const rollTimerRef = useRef<number | null>(null);

  const clearRollTimer = useCallback(() => {
    if (rollTimerRef.current !== null) {
      window.clearInterval(rollTimerRef.current);
      rollTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearRollTimer();
  }, [clearRollTimer]);

  const activeBoon = useMemo(
    () => data.startingBoons.find((b) => b.id === selectedBoonId) ?? data.startingBoons[0],
    [data.startingBoons, selectedBoonId]
  );

  const effectiveStats = useMemo<Record<DndAbility, number>>(
    () => ({
      might: Math.min(
        20,
        baseStats.might + bonusAlloc.might + (activeBoon.bonusAbility === 'might' ? 1 : 0)
      ),
      wisdom: Math.min(
        20,
        baseStats.wisdom + bonusAlloc.wisdom + (activeBoon.bonusAbility === 'wisdom' ? 1 : 0)
      ),
      dominion: Math.min(
        20,
        baseStats.dominion +
          bonusAlloc.dominion +
          (activeBoon.bonusAbility === 'dominion' ? 1 : 0)
      ),
    }),
    [activeBoon, baseStats, bonusAlloc]
  );

  const spentBonusPoints = bonusAlloc.might + bonusAlloc.wisdom + bonusAlloc.dominion;
  const remainingBonusPoints = MAX_BONUS_POINTS - spentBonusPoints;
  const isCharacterCreationEditable = historyStack.length === 0 && !pending;

  const adjustBonusPoint = (ab: DndAbility, delta: 1 | -1) => {
    if (!isCharacterCreationEditable) return;
    setBonusAlloc((prev) => {
      if (delta === 1 && prev.might + prev.wisdom + prev.dominion >= MAX_BONUS_POINTS) {
        return prev;
      }
      if (delta === -1 && prev[ab] <= 0) {
        return prev;
      }
      return { ...prev, [ab]: prev[ab] + delta };
    });
  };

  const getRelicBonusFor = useCallback(
    (ability: DndAbility): number =>
      relics
        .filter((r) => r.bonusAbility === ability)
        .reduce((sum, r) => sum + r.bonusValue, 0),
    [relics]
  );

  const recordEndingDiscovery = useCallback(
    (sagaId: string, tier: EndingTier) => {
      setDiscoveredEndings((prev) => {
        const existing = prev[sagaId] ?? [];
        if (existing.includes(tier)) return prev;
        const next = { ...prev, [sagaId]: [...existing, tier] };
        saveDiscoveredEndings(next, isBestiary);
        return next;
      });
    },
    [isBestiary]
  );

  const startFreshCampaign = useCallback(
    (targetSaga: AscensionSaga) => {
      clearRollTimer();
      setSelectedSagaId(targetSaga.id);
      onSelectSagaId(targetSaga.id);
      setCurrentNodeId(targetSaga.startNodeId);
      setBaseStats({ ...targetSaga.startingStats });
      setBonusAlloc({ might: 0, wisdom: 0, dominion: 0 });
      setResolve(targetSaga.startingResolve);
      setRelics([]);
      setVisitedNodeIds([targetSaga.startNodeId]);
      setWalkedEdges([]);
      setInspirationAvailable(true);
      setHistoryStack([]);
      setPending(null);
    },
    [clearRollTimer, onSelectSagaId]
  );

  const rewindLastCrossroads = useCallback(() => {
    clearRollTimer();
    setPending(null);
    setHistoryStack((prev) => {
      if (prev.length === 0) return prev;
      const snap = prev[prev.length - 1];
      setCurrentNodeId(snap.nodeId);
      setBaseStats({ ...snap.stats });
      setBonusAlloc({ ...snap.bonusAlloc });
      setSelectedBoonId(snap.selectedBoonId);
      setResolve(snap.resolve);
      setRelics([...snap.relics]);
      setVisitedNodeIds([...snap.visitedNodeIds]);
      setWalkedEdges([...snap.walkedEdges]);
      setInspirationAvailable(snap.inspirationAvailable);
      return prev.slice(0, -1);
    });
  }, [clearRollTimer]);

  const rewindToVisitedNode = useCallback(
    (targetNodeId: string) => {
      const snapIdx = historyStack.findIndex((snap) => snap.nodeId === targetNodeId);
      if (snapIdx === -1) return;
      clearRollTimer();
      setPending(null);
      const snap = historyStack[snapIdx];
      setCurrentNodeId(snap.nodeId);
      setBaseStats({ ...snap.stats });
      setBonusAlloc({ ...snap.bonusAlloc });
      setSelectedBoonId(snap.selectedBoonId);
      setResolve(snap.resolve);
      setRelics([...snap.relics]);
      setVisitedNodeIds([...snap.visitedNodeIds]);
      setWalkedEdges([...snap.walkedEdges]);
      setInspirationAvailable(snap.inspirationAvailable);
      setHistoryStack((prev) => prev.slice(0, snapIdx));
    },
    [clearRollTimer, historyStack]
  );

  const executeChoiceRoll = useCallback(
    (choice: DndChoice, spendingInspiration = false) => {
      clearRollTimer();

      if (spendingInspiration) {
        setInspirationAvailable(false);
      }

      if (!choice.check) {
        const ok = choice.nextNodeId !== 'end-fail';
        if (soundEnabled) {
          if (ok) playCheckSuccess(false);
          else playCheckFail();
        }
        setPending({
          choiceId: choice.id,
          isRolling: false,
          displayDie: 20,
          naturalRoll: null,
          abilityMod: 0,
          relicMod: 0,
          totalRoll: null,
          succeeded: ok,
          spiritCollapsed: false,
          targetNodeId: choice.nextNodeId,
        });
        return;
      }

      const ability = choice.check.ability;
      const abilityMod = getAbilityModifier(effectiveStats[ability]);
      const relicMod = getRelicBonusFor(ability);

      const buf = new Uint32Array(1);
      window.crypto.getRandomValues(buf);
      const naturalRoll = (buf[0] % 20) + 1;
      const totalRoll = naturalRoll + abilityMod + relicMod;
      const succeeded =
        naturalRoll === 20 || (naturalRoll !== 1 && totalRoll >= choice.check.dc);

      const nextResolveAfterFail = resolve + (choice.failResolveDelta ?? -1);
      const spiritCollapsed = !succeeded && nextResolveAfterFail <= 0;
      const targetNodeId = succeeded
        ? choice.nextNodeId
        : spiritCollapsed
          ? 'end-fail'
          : (choice.failNodeId ?? 'branch-shadow');

      if (soundEnabled) {
        playDiceClatter();
      }

      setPending({
        choiceId: choice.id,
        isRolling: true,
        displayDie: ((naturalRoll + 7) % 20) + 1,
        naturalRoll,
        abilityMod,
        relicMod,
        totalRoll,
        succeeded,
        spiritCollapsed,
        targetNodeId,
      });

      let ticks = 0;
      rollTimerRef.current = window.setInterval(() => {
        ticks += 1;
        if (ticks >= 10) {
          clearRollTimer();
          if (soundEnabled) {
            if (succeeded) playCheckSuccess(naturalRoll === 20);
            else playCheckFail();
          }
          setPending((prev) =>
            prev ? { ...prev, isRolling: false, displayDie: naturalRoll } : null
          );
        } else {
          setPending((prev) =>
            prev ? { ...prev, displayDie: ((prev.displayDie * 7 + ticks * 3) % 20) + 1 } : null
          );
        }
      }, 55);
    },
    [clearRollTimer, effectiveStats, getRelicBonusFor, resolve, soundEnabled]
  );

  const currentNode = saga.nodes[currentNodeId] ?? saga.nodes[saga.startNodeId];

  const commitPendingTransition = useCallback(() => {
    if (!pending || pending.isRolling || currentNode.kind !== 'encounter') return;
    const choice = currentNode.choices.find((c) => c.id === pending.choiceId);
    if (!choice) return;

    const snapshot: CampaignSnapshot = {
      nodeId: currentNodeId,
      stats: { ...baseStats },
      bonusAlloc: { ...bonusAlloc },
      selectedBoonId,
      resolve,
      relics: [...relics],
      visitedNodeIds: [...visitedNodeIds],
      walkedEdges: [...walkedEdges],
      inspirationAvailable,
    };
    setHistoryStack((prev) => [...prev, snapshot]);

    const { succeeded, targetNodeId } = pending;

    if (succeeded) {
      if (choice.statDelta) {
        setBaseStats((prev) => ({
          might: Math.min(20, prev.might + (choice.statDelta?.might ?? 0)),
          wisdom: Math.min(20, prev.wisdom + (choice.statDelta?.wisdom ?? 0)),
          dominion: Math.min(20, prev.dominion + (choice.statDelta?.dominion ?? 0)),
        }));
      }
      if (choice.resolveDelta) {
        setResolve((r) => Math.max(1, Math.min(4, r + (choice.resolveDelta ?? 0))));
      }
      if (choice.unlockedRelic) {
        const newRelic: UnlockedRelic = {
          sourceNodeId: currentNodeId,
          choiceId: choice.id,
          fallbackName: choice.unlockedRelic.name,
          bonusAbility: choice.unlockedRelic.bonusAbility,
          bonusValue: choice.unlockedRelic.bonusValue,
        };
        setRelics((prev) =>
          prev.some(
            (r) => r.sourceNodeId === newRelic.sourceNodeId && r.choiceId === newRelic.choiceId
          )
            ? prev
            : [...prev, newRelic]
        );
      }
    } else if (choice.check) {
      setResolve((r) => Math.max(0, r + (choice.failResolveDelta ?? -1)));
    }

    const edgeKey = `${currentNodeId}->${targetNodeId}`;
    setWalkedEdges((prev) => (prev.includes(edgeKey) ? prev : [...prev, edgeKey]));
    setVisitedNodeIds((prev) => (prev.includes(targetNodeId) ? prev : [...prev, targetNodeId]));
    setCurrentNodeId(targetNodeId);
    setPending(null);

    const destNode = saga.nodes[targetNodeId];
    if (destNode?.kind === 'ending') {
      recordEndingDiscovery(saga.id, destNode.endingTier);
      if (soundEnabled) {
        playEndingGong(destNode.endingTier);
      }
    }
  }, [
    baseStats,
    bonusAlloc,
    currentNode,
    currentNodeId,
    inspirationAvailable,
    pending,
    recordEndingDiscovery,
    relics,
    resolve,
    saga,
    selectedBoonId,
    soundEnabled,
    visitedNodeIds,
    walkedEdges,
  ]);

  const handleCopyShareLink = async () => {
    const ok = await copyShareableUrl();
    if (ok) {
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const trad = data.traditionById[saga.traditionId];
  const totalDiscoveredCount = Object.values(discoveredEndings).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
    <div>
      <header className="page-masthead">
        <div className="page-masthead-copy">
          <span className="folio-kicker">
            <Gamepad2 size={14} /> {ui.game.kickerPrefix} ·{' '}
            {pantheonFocus === 'all'
              ? ui.game.deitiesCount(data.ascensionSagas.length)
              : trad?.name.toUpperCase()}
          </span>
          <h1>{pantheonFocus === 'all' ? ui.game.headingAll : saga.ascendedTitle}</h1>
          <p className="page-lead">
            {pantheonFocus === 'all' ? ui.game.leadAll : saga.subtitle}
          </p>
        </div>

        <div className="row-wrap">
          <button
            id="dnd-open-codex-btn"
            type="button"
            className="btn-secondary"
            onClick={() => setCodexOpen(true)}
            title={isZh ? '查看全部结局图鉴与分支提示' : 'Open Endings Gallery & Branch Hints'}
          >
            <Compass size={14} />
            <span>
              {pantheonFocus === 'all'
                ? ui.game.endingsCount(totalDiscoveredCount, data.ascensionSagas.length * 3)
                : ui.game.endingsCount((discoveredEndings[saga.id] ?? []).length, 3)}
            </span>
          </button>

          <button
            id="dnd-sound-toggle-btn"
            type="button"
            className="btn-secondary"
            onClick={() => setSoundEnabled((s) => !s)}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>{soundEnabled ? ui.game.sfxOn : ui.game.sfxMuted}</span>
          </button>

          <button
            id="dnd-share-campaign-btn"
            type="button"
            className="btn-secondary"
            onClick={handleCopyShareLink}
          >
            {copiedLink ? <Check size={14} /> : <Share2 size={14} />}
            <span>{copiedLink ? ui.game.linkCopied : ui.game.shareQuest}</span>
          </button>
        </div>
      </header>

      {visibleSagas.length > 1 && (
        <div className="game-hero-picker-grid" role="tablist" aria-label={ui.game.kickerPrefix}>
          {visibleSagas.map((item) => {
            const isSelected = item.id === saga.id;
            const itemTrad = data.traditionById[item.traditionId];
            const unlocked = discoveredEndings[item.id] ?? [];
            return (
              <button
                key={item.id}
                id={`saga-card-${item.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={
                  isSelected ? 'visual-card visual-tile-btn active' : 'visual-card visual-tile-btn'
                }
                onClick={() => startFreshCampaign(item)}
              >
                <div className="visual-card-media portrait">
                  <img
                    src={getDeityPortrait(item.deityId)}
                    alt={item.ascendedTitle}
                    className="visual-card-img"
                    loading="lazy"
                  />
                  <span className="media-badge-overlay">{compactTraditionName(itemTrad?.name)}</span>
                </div>
                <div className="visual-card-content">
                  <h3 className="tile-card-title" title={item.ascendedTitle}>
                    {splitTitleHead(item.ascendedTitle)}
                  </h3>
                  <p className="mono-meta">{item.dndClass}</p>
                  <div className="dnd-ending-seals-row">
                    <span
                      className={
                        unlocked.includes('deity')
                          ? 'dnd-mini-seal deity unlocked'
                          : 'dnd-mini-seal'
                      }
                    >
                      {ui.game.sealGodhood}
                    </span>
                    <span
                      className={
                        unlocked.includes('alternate')
                          ? 'dnd-mini-seal alt unlocked'
                          : 'dnd-mini-seal'
                      }
                    >
                      {ui.game.sealAlt}
                    </span>
                    <span
                      className={
                        unlocked.includes('failure')
                          ? 'dnd-mini-seal fail unlocked'
                          : 'dnd-mini-seal'
                      }
                    >
                      {ui.game.sealFallen}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <section className="dnd-map-panel mt-lg" aria-label={saga.ascendedTitle}>
        <div className="dnd-map-header">
          <div className="row-wrap">
            <Compass size={15} />
            <span className="folio-kicker">{ui.game.mapKicker(saga.mortalOrOriginName)}</span>
          </div>
          <div className="row-wrap">
            <span className="mono-meta">{ui.game.goldenTrail}</span>
            <span className="mono-meta">·</span>
            <span className="mono-meta">{ui.game.lowerFork}</span>
          </div>
        </div>

        <svg
          viewBox="0 0 870 220"
          className="dnd-campaign-map-svg"
          role="img"
          aria-label={saga.ascendedTitle}
        >
          <defs>
            <clipPath id="dnd-hero-token-clip">
              <circle cx="0" cy="0" r="15" />
            </clipPath>
          </defs>

          {saga.mapEdges.map((edge) => {
            const fromNode = saga.nodes[edge.from];
            const toNode = saga.nodes[edge.to];
            if (!fromNode || !toNode) return null;
            const edgeKey = `${edge.from}->${edge.to}`;
            const isWalked = walkedEdges.includes(edgeKey);
            const midX = (fromNode.mapX + toNode.mapX) / 2;
            const pathD = `M ${fromNode.mapX} ${fromNode.mapY} C ${midX} ${fromNode.mapY}, ${midX} ${toNode.mapY}, ${toNode.mapX} ${toNode.mapY}`;
            const cls = isWalked
              ? `dnd-map-edge walked ${edge.style}`
              : `dnd-map-edge ${edge.style}`;
            return <path key={edgeKey} d={pathD} className={cls} />;
          })}

          {Object.values(saga.nodes).map((node) => {
            const isCurrent = node.id === currentNodeId;
            const isVisited = visitedNodeIds.includes(node.id);
            const isEnding = node.kind === 'ending';
            const canJumpBack = !isCurrent && historyStack.some((s) => s.nodeId === node.id);

            let nodeClass = 'dnd-map-node';
            if (isCurrent) nodeClass += ' current';
            else if (isVisited) nodeClass += ' visited';
            if (canJumpBack) nodeClass += ' clickable';
            if (isEnding) nodeClass += ` ending-${node.endingTier}`;

            const shortLabel = isEnding
              ? node.endingTier === 'deity'
                ? ui.game.mapGodhood
                : node.endingTier === 'alternate'
                  ? ui.game.mapAlt
                  : ui.game.mapFallen
              : node.id === 'branch-shadow' || node.id === 'act-2b'
                ? ui.game.mapShadow
                : node.chapterLabel.split('·')[0].trim();

            return (
              <g
                key={node.id}
                transform={`translate(${node.mapX}, ${node.mapY})`}
                className={nodeClass}
                role={canJumpBack ? 'button' : undefined}
                tabIndex={canJumpBack ? 0 : undefined}
                aria-label={
                  canJumpBack
                    ? isZh
                      ? `回溯至分岔点：${shortLabel}`
                      : `Rewind to crossroads: ${shortLabel}`
                    : undefined
                }
                onClick={canJumpBack ? () => rewindToVisitedNode(node.id) : undefined}
                onKeyDown={
                  canJumpBack
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          rewindToVisitedNode(node.id);
                        }
                      }
                    : undefined
                }
              >
                {canJumpBack && (
                  <title>
                    {isZh ? `点击回溯至此节点：${node.title}` : `Click to rewind to ${node.title}`}
                  </title>
                )}
                {isCurrent && <circle cx="0" cy="0" r="24" className="dnd-map-pulse-ring" />}
                <circle cx="0" cy="0" r={isEnding ? 17 : 15} className="dnd-map-node-circle" />

                {isCurrent ? (
                  <g clipPath="url(#dnd-hero-token-clip)">
                    <image
                      href={getDeityPortrait(saga.deityId)}
                      x="-15"
                      y="-15"
                      width="30"
                      height="36"
                      preserveAspectRatio="xMidYMin slice"
                    />
                  </g>
                ) : (
                  <text x="0" y="4" textAnchor="middle" className="dnd-map-node-glyph">
                    {isEnding
                      ? node.endingTier === 'deity'
                        ? '★'
                        : node.endingTier === 'alternate'
                          ? '◈'
                          : '☠'
                      : isVisited
                        ? '✓'
                        : '◆'}
                  </text>
                )}

                <text
                  x="0"
                  y={node.mapY > 140 ? 31 : -23}
                  textAnchor="middle"
                  className="dnd-map-node-caption"
                >
                  {shortLabel}
                </text>
              </g>
            );
          })}
        </svg>
      </section>

      <div className="dnd-tabletop-grid mt-lg">
        <aside className="dnd-char-sheet" aria-label={saga.mortalOrOriginName}>
          <div className="dnd-sheet-portrait-wrap">
            <img
              src={getDeityPortrait(saga.deityId)}
              alt={saga.mortalOrOriginName}
              className="dnd-sheet-portrait-img"
            />
            <div className="dnd-sheet-portrait-caption">
              <span className="folio-kicker">{saga.dndClass}</span>
              <h3>
                {currentNode.kind === 'encounter'
                  ? currentNode.rankTitle
                  : currentNode.endingTier === 'deity'
                    ? ui.game.enthronedDeity
                    : currentNode.endingTier === 'alternate'
                      ? ui.game.divergentLegend
                      : ui.game.fallenSpirit}
              </h3>
            </div>
          </div>

          <div className="dnd-vitals-box">
            <div className="row-between">
              <span className="mono-meta">
                <Heart size={13} /> {ui.game.spiritResolve}
              </span>
              <span className="dnd-hearts-row" aria-label={`${resolve} / 3`}>
                {[0, 1, 2].map((idx) => (
                  <span
                    key={idx}
                    className={idx < resolve ? 'dnd-heart-pip filled' : 'dnd-heart-pip empty'}
                  >
                    ♦
                  </span>
                ))}
              </span>
            </div>

            <div className="row-between mt-sm">
              <span className="mono-meta">
                <Sparkles size={13} /> {ui.game.inspiration}
              </span>
              <span className={inspirationAvailable ? 'tag-pill verdigris' : 'tag-pill'}>
                {inspirationAvailable ? ui.game.rerollReady : ui.game.spent}
              </span>
            </div>
          </div>

          {isCharacterCreationEditable && (
            <div className="dnd-build-box">
              <div className="row-between">
                <span className="folio-kicker">{ui.game.charBuild}</span>
                <span className="tag-pill rubric">
                  {ui.game.ptsLeft(remainingBonusPoints)}
                </span>
              </div>

              <label className="mono-meta mt-sm" htmlFor="dnd-boon-select">
                {ui.game.startingBoon}
              </label>
              <select
                id="dnd-boon-select"
                className="slot-select"
                value={selectedBoonId}
                onChange={(e) => setSelectedBoonId(e.target.value)}
              >
                {data.startingBoons.map((boon) => (
                  <option key={boon.id} value={boon.id}>
                    {boon.label} ({boon.description.split('·')[0].trim()})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="dnd-ability-grid">
            {(['might', 'wisdom', 'dominion'] as DndAbility[]).map((ab) => {
              const score = effectiveStats[ab];
              const baseMod = getAbilityModifier(score);
              const relicBonus = getRelicBonusFor(ab);
              const totalMod = baseMod + relicBonus;
              const abMeta = ui.game.abilities[ab];
              return (
                <div key={ab} className="dnd-ability-shield">
                  <span className="dnd-ability-short">{abMeta.short}</span>
                  <strong className="dnd-ability-mod">{formatModifier(totalMod)}</strong>
                  <span className="dnd-ability-raw">
                    {ui.game.scorePrefix(score)}
                    {relicBonus > 0 ? ` (+${relicBonus}R)` : ''}
                  </span>

                  {isCharacterCreationEditable && (
                    <div className="dnd-point-stepper">
                      <button
                        type="button"
                        className="dnd-step-btn"
                        disabled={bonusAlloc[ab] <= 0}
                        onClick={() => adjustBonusPoint(ab, -1)}
                        aria-label={`- ${abMeta.label}`}
                      >
                        <Minus size={11} />
                      </button>
                      <span className="mono-meta">+{bonusAlloc[ab]}</span>
                      <button
                        type="button"
                        className="dnd-step-btn"
                        disabled={remainingBonusPoints <= 0}
                        onClick={() => adjustBonusPoint(ab, 1)}
                        aria-label={`+ ${abMeta.label}`}
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="dnd-relic-satchel">
            <span className="folio-kicker">
              <Shield size={12} /> {ui.game.sacredRelics(relics.length)}
            </span>
            {relics.length === 0 ? (
              <p className="mono-meta mt-sm">{ui.game.emptyRelics}</p>
            ) : (
              <div className="stack-sm mt-sm">
                {relics.map((rel) => {
                  const rName = resolveRelicDisplayName(saga, rel);
                  return (
                    <div key={`${rel.sourceNodeId}-${rel.choiceId}`} className="dnd-relic-item">
                      <strong>{rName}</strong>
                      <span className="mono-meta">
                        {ui.game.d20ChecksBonus(
                          rel.bonusValue,
                          ui.game.abilities[rel.bonusAbility].label
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="stack-sm mt-md">
            <button
              id="dnd-rewind-step-btn"
              type="button"
              className="btn-secondary"
              disabled={historyStack.length === 0}
              onClick={rewindLastCrossroads}
            >
              <Undo2 size={14} />
              <span>{ui.game.rewindBtn(historyStack.length)}</span>
            </button>

            <button
              id="dnd-restart-campaign-btn"
              type="button"
              className="btn-ghost"
              onClick={() => startFreshCampaign(saga)}
            >
              <RotateCcw size={14} />
              <span>{ui.game.restartCampaign}</span>
            </button>
          </div>
        </aside>

        <div className="dnd-stage-column">
          {currentNode.kind === 'encounter' ? (
            <EncounterStageView
              node={currentNode}
              saga={saga}
              stats={effectiveStats}
              getRelicBonusFor={getRelicBonusFor}
              pending={pending}
              inspirationAvailable={inspirationAvailable}
              onChoose={(choice) => executeChoiceRoll(choice, false)}
              onRerollInspiration={() => {
                if (pending && inspirationAvailable) {
                  const ch = currentNode.choices.find((c) => c.id === pending.choiceId);
                  if (ch) executeChoiceRoll(ch, true);
                }
              }}
              onCommitTransition={commitPendingTransition}
            />
          ) : (
            <EndingChronicleView
              ending={currentNode}
              saga={saga}
              traditionName={trad?.name ?? ''}
              visitedNodeIds={visitedNodeIds}
              relics={relics}
              canRewind={historyStack.length > 0}
              copiedLink={copiedLink}
              onShare={handleCopyShareLink}
              onRewind={rewindLastCrossroads}
              onRestart={() => startFreshCampaign(saga)}
              onNextSaga={() => {
                const idx = data.ascensionSagas.findIndex((s) => s.id === saga.id);
                startFreshCampaign(
                  data.ascensionSagas[(idx + 1) % data.ascensionSagas.length]
                );
              }}
              onJumpToCompareDeity={() => onJumpToCompareDeity(saga.deityId)}
              onOpenTradition={() =>
                navigate({ page: 'traditions', traditionSlug: saga.traditionId })
              }
            />
          )}
        </div>
      </div>

      {codexOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dnd-codex-title"
          onClick={() => setCodexOpen(false)}
        >
          <div className="dnd-codex-modal" onClick={(e) => e.stopPropagation()}>
            <div className="row-between dnd-codex-header">
              <div>
                <span className="folio-kicker">
                  {isZh ? '全战役结局收藏册与分支线索' : 'CAMPAIGN ENDINGS GALLERY & HINTS'}
                </span>
                <h2 id="dnd-codex-title" className="mt-xs">
                  {isZh
                    ? `已解锁 ${totalDiscoveredCount} / ${data.ascensionSagas.length * 3} 种插画结局`
                    : `${totalDiscoveredCount} of ${data.ascensionSagas.length * 3} Illustrated Endings Unlocked`}
                </h2>
              </div>
              <button
                id="dnd-codex-close-btn"
                type="button"
                className="icon-action-btn"
                onClick={() => setCodexOpen(false)}
                aria-label={isZh ? '关闭结局图鉴' : 'Close Endings Gallery'}
              >
                <X size={16} />
              </button>
            </div>

            <div className="dnd-codex-list">
              {visibleSagas.map((sg) => {
                const unlocked = discoveredEndings[sg.id] ?? [];
                const tiers: EndingTier[] = ['deity', 'alternate', 'failure'];
                const endingByTier = Object.values(sg.nodes).filter(
                  (n): n is Extract<AscensionSaga['nodes'][string], { kind: 'ending' }> =>
                    n.kind === 'ending'
                );

                return (
                  <section key={sg.id} className="dnd-codex-saga-row">
                    <div className="row-between">
                      <div className="row-wrap">
                        <img
                          src={getDeityPortrait(sg.deityId)}
                          alt={sg.ascendedTitle}
                          className="search-deity-avatar"
                        />
                        <div>
                          <strong>{splitTitleHead(sg.ascendedTitle)}</strong>
                          <span className="mono-meta dnd-codex-sub">
                            {compactTraditionName(data.traditionById[sg.traditionId]?.name)} ·{' '}
                            {unlocked.length}/3
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-ghost"
                        onClick={() => {
                          setCodexOpen(false);
                          startFreshCampaign(sg);
                        }}
                      >
                        <Gamepad2 size={14} />
                        <span>{isZh ? '游玩此战役' : 'Play Saga'}</span>
                      </button>
                    </div>

                    <div className="dnd-codex-tiers-grid mt-sm">
                      {tiers.map((tier) => {
                        const isOpen = unlocked.includes(tier);
                        const node = endingByTier.find((e) => e.endingTier === tier);
                        const tierLabel =
                          tier === 'deity'
                            ? ui.game.sealGodhood
                            : tier === 'alternate'
                              ? ui.game.sealAlt
                              : ui.game.sealFallen;
                        const hintText =
                          tier === 'deity'
                            ? isZh
                              ? '线索：在主线检定中稳步通过 d20 试炼并集齐关键圣物。'
                              : 'Hint: Pass the core d20 trials along the golden canonical path.'
                            : tier === 'alternate'
                              ? isZh
                                ? '线索：尝试暗影支线，或在第二、三幕选择盟约/仁慈分支。'
                                : 'Hint: Explore the Shadow Fork or choose a Pact / Mercy branch in Act II–III.'
                              : isZh
                                ? '线索：选择傲慢险途，或让心智定力跌至零点触发陨落结局。'
                                : 'Hint: Choose a perilous hubris path or let Spirit Resolve fall to zero.';

                        return (
                          <div
                            key={tier}
                            className={
                              isOpen
                                ? `dnd-codex-card unlocked tier-${tier}`
                                : 'dnd-codex-card locked'
                            }
                          >
                            {isOpen && node ? (
                              <>
                                <img
                                  src={node.platePath}
                                  alt={node.title}
                                  className="dnd-codex-thumb"
                                  loading="lazy"
                                />
                                <div className="dnd-codex-card-copy">
                                  <span className="folio-kicker">{tierLabel}</span>
                                  <strong>{node.title}</strong>
                                </div>
                              </>
                            ) : (
                              <div className="dnd-codex-card-copy">
                                <span className="folio-kicker dnd-locked-kicker">
                                  <Lock size={12} /> {tierLabel}
                                </span>
                                <p className="text-muted">{hintText}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface EncounterStageViewProps {
  node: DndEncounterNode;
  saga: AscensionSaga;
  stats: Record<DndAbility, number>;
  getRelicBonusFor: (ab: DndAbility) => number;
  pending: PendingResolution | null;
  inspirationAvailable: boolean;
  onChoose: (choice: DndChoice) => void;
  onRerollInspiration: () => void;
  onCommitTransition: () => void;
}

const EncounterStageView: React.FC<EncounterStageViewProps> = ({
  node,
  saga,
  stats,
  getRelicBonusFor,
  pending,
  inspirationAvailable,
  onChoose,
  onRerollInspiration,
  onCommitTransition,
}) => {
  const { ui } = useI18n();
  const destNode = pending ? saga.nodes[pending.targetNodeId] : undefined;
  const pendingChoice = pending
    ? node.choices.find((c) => c.id === pending.choiceId)
    : undefined;

  const pendingNarrative =
    pending && pendingChoice
      ? pending.succeeded
        ? pendingChoice.successNarrative
        : pending.spiritCollapsed
          ? `${pendingChoice.failNarrative ?? pendingChoice.successNarrative} ${ui.game.spiritCollapsedSuffix}`
          : (pendingChoice.failNarrative ?? pendingChoice.successNarrative)
      : '';

  return (
    <section className="dnd-encounter-card" aria-labelledby="dnd-encounter-heading">
      <div className="dnd-scene-media">
        <img src={node.platePath} alt={node.title} className="dnd-scene-img" />
        <div className="dnd-scene-scrim" />
        <div className="dnd-scene-overlay-plaque">
          <span className="folio-kicker">{node.chapterLabel}</span>
          <h2 id="dnd-encounter-heading">{node.title}</h2>
          <p className="mono-meta">{node.location}</p>
        </div>
      </div>

      <div className="dnd-dm-narration">
        <span className="dnd-dm-badge">{ui.game.dungeonMaster}</span>
        <p>{node.dmPrompt}</p>
      </div>

      {!pending || !pendingChoice ? (
        <div className="dnd-choices-grid" role="group" aria-label={node.title}>
          {node.choices.map((ch) => {
            const checkAb = ch.check?.ability;
            const totalBonus = checkAb
              ? getAbilityModifier(stats[checkAb]) + getRelicBonusFor(checkAb)
              : 0;

            const cardClass =
              ch.tone === 'check'
                ? 'dnd-action-card tone-check'
                : ch.tone === 'pact'
                  ? 'dnd-action-card tone-pact'
                  : 'dnd-action-card tone-hubris';

            return (
              <button
                key={ch.id}
                id={`dnd-choice-${ch.id}`}
                type="button"
                className={cardClass}
                onClick={() => onChoose(ch)}
              >
                <div className="dnd-action-ribbon">
                  {ch.check ? (
                    <Dices size={14} />
                  ) : ch.tone === 'pact' ? (
                    <Scale size={14} />
                  ) : (
                    <Flame size={14} />
                  )}
                  <span>{ch.flavorTag}</span>
                </div>

                <h3>{ch.title}</h3>
                <p className="dnd-action-sub">{ch.subtitle}</p>

                <div className="dnd-action-footer">
                  {ch.check ? (
                    <span className="tag-pill rubric">
                      {ui.game.rollVsDc(formatModifier(totalBonus), ch.check.dc)}
                    </span>
                  ) : ch.nextNodeId === 'end-fail' ? (
                    <span className="tag-pill ochre">{ui.game.perilousRisk}</span>
                  ) : (
                    <span className="tag-pill verdigris">{ui.game.directBranch}</span>
                  )}

                  {ch.unlockedRelic && <span className="mono-meta">{ui.game.relicOnPass}</span>}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="dnd-dice-tray" aria-live="polite">
          <div className="dnd-dice-tray-layout">
            <div className={pending.isRolling ? 'dnd-d20-wrap rolling' : 'dnd-d20-wrap'}>
              <svg viewBox="0 0 120 120" className="dnd-d20-svg" aria-hidden="true">
                <polygon
                  points="60,6 110,34 110,86 60,114 10,86 10,34"
                  className={
                    pending.isRolling
                      ? 'dnd-d20-outer'
                      : pending.succeeded
                        ? 'dnd-d20-outer success'
                        : 'dnd-d20-outer fail'
                  }
                />
                <polygon points="60,22 94,80 26,80" className="dnd-d20-inner" />
                <line x1="60" y1="6" x2="60" y2="22" className="dnd-d20-facet" />
                <line x1="110" y1="34" x2="94" y2="80" className="dnd-d20-facet" />
                <line x1="10" y1="34" x2="26" y2="80" className="dnd-d20-facet" />
                <line x1="110" y1="86" x2="94" y2="80" className="dnd-d20-facet" />
                <line x1="10" y1="86" x2="26" y2="80" className="dnd-d20-facet" />
                <line x1="60" y1="114" x2="94" y2="80" className="dnd-d20-facet" />
                <line x1="60" y1="114" x2="26" y2="80" className="dnd-d20-facet" />
                <text x="60" y="67" textAnchor="middle" className="dnd-d20-number">
                  {pending.naturalRoll !== null || pending.isRolling ? pending.displayDie : '⚖'}
                </text>
              </svg>
            </div>

            <div className="dnd-dice-outcome-body">
              {pending.isRolling ? (
                <>
                  <span className="folio-kicker">{ui.game.tumbling}</span>
                  <h3>{ui.game.rollingDie}</h3>
                </>
              ) : (
                <>
                  <div className="row-wrap">
                    <span className={pending.succeeded ? 'tag-pill verdigris' : 'tag-pill ochre'}>
                      {pending.naturalRoll === null
                        ? ui.game.fateChosen
                        : pending.naturalRoll === 20
                          ? ui.game.nat20
                          : pending.succeeded
                            ? ui.game.checkPassed
                            : ui.game.checkFailed}
                    </span>

                    {pendingChoice.check && pending.naturalRoll !== null && (
                      <span className="mono-meta">
                        d20 ({pending.naturalRoll}) {formatModifier(pending.abilityMod)}{' '}
                        {ui.game.abilities[pendingChoice.check.ability].short}
                        {pending.relicMod > 0
                          ? ` +${pending.relicMod} ${ui.game.relicWord}`
                          : ''}{' '}
                        = <strong>{pending.totalRoll}</strong> vs DC {pendingChoice.check.dc}
                      </span>
                    )}
                  </div>

                  <p className="dnd-outcome-prose mt-sm">{pendingNarrative}</p>

                  {pending.succeeded && pendingChoice.unlockedRelic && (
                    <div className="row-wrap mt-sm">
                      <span className="tag-pill rubric">
                        <Sparkles size={12} /> {ui.game.relicGained}{' '}
                        {pendingChoice.unlockedRelic.name} (+
                        {pendingChoice.unlockedRelic.bonusValue}{' '}
                        {ui.game.abilities[pendingChoice.unlockedRelic.bonusAbility].short})
                      </span>
                    </div>
                  )}

                  <p className="mono-meta mt-sm">
                    {ui.game.loreNote} {pendingChoice.mythicNote}
                  </p>

                  <div className="row-wrap mt-md">
                    <button
                      id="dnd-continue-journey-btn"
                      type="button"
                      className="btn-primary"
                      onClick={onCommitTransition}
                    >
                      <span>
                        {destNode?.kind === 'ending'
                          ? destNode.endingTier === 'deity'
                            ? ui.game.claimThrone
                            : destNode.endingTier === 'alternate'
                              ? ui.game.witnessAlt
                              : ui.game.witnessFallen
                          : ui.game.enterChamber(
                              destNode
                                ? splitTitleHead(destNode.title).split('&')[0].trim()
                                : ui.game.nextChamber
                            )}
                      </span>
                      <ArrowRight size={15} />
                    </button>

                    {!pending.succeeded && pendingChoice.check && inspirationAvailable && (
                      <button
                        id="dnd-spend-inspiration-btn"
                        type="button"
                        className="btn-secondary"
                        onClick={onRerollInspiration}
                      >
                        <Sparkles size={14} />
                        <span>{ui.game.spendInspiration}</span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

interface EndingChronicleViewProps {
  ending: Extract<AscensionSaga['nodes'][string], { kind: 'ending' }>;
  saga: AscensionSaga;
  traditionName: string;
  visitedNodeIds: string[];
  relics: UnlockedRelic[];
  canRewind: boolean;
  copiedLink: boolean;
  onShare: () => void;
  onRewind: () => void;
  onRestart: () => void;
  onNextSaga: () => void;
  onJumpToCompareDeity: () => void;
  onOpenTradition: () => void;
}

const EndingChronicleView: React.FC<EndingChronicleViewProps> = ({
  ending,
  saga,
  traditionName,
  visitedNodeIds,
  relics,
  canRewind,
  copiedLink,
  onShare,
  onRewind,
  onRestart,
  onNextSaga,
  onJumpToCompareDeity,
  onOpenTradition,
}) => {
  const { ui } = useI18n();
  const bannerClass = `dnd-ending-card tier-${ending.endingTier}`;

  return (
    <section className={bannerClass} aria-labelledby="dnd-ending-title">
      <div className="dnd-scene-media">
        <img src={ending.platePath} alt={ending.title} className="dnd-scene-img" />
        <div className="dnd-scene-scrim" />
        <div className="dnd-scene-overlay-plaque">
          <div className="row-wrap">
            {ending.endingTier === 'deity' ? (
              <Crown size={18} />
            ) : ending.endingTier === 'alternate' ? (
              <Award size={18} />
            ) : (
              <Skull size={18} />
            )}
            <span className="folio-kicker">
              {ending.badgeLabel} · {traditionName.toUpperCase()}
            </span>
          </div>
          <h2 id="dnd-ending-title">{ending.title}</h2>
          <p className="mono-meta">
            {ending.subtitle} · {ending.location}
          </p>
        </div>
      </div>

      <div className="dnd-ending-body">
        <p className="page-lead">{ending.epilogue}</p>

        <div className="synthesis-banner mt-md">
          <span className="folio-kicker">{ui.game.compInsight}</span>
          <p className="mt-sm">{ending.mythicComparison}</p>
        </div>

        <div className="mt-md">
          <span className="folio-kicker">{ui.game.yourTrail(visitedNodeIds.length)}</span>
          <div className="row-wrap mt-sm">
            {visitedNodeIds.map((nid, idx) => {
              const n = saga.nodes[nid];
              if (!n) return null;
              return (
                <React.Fragment key={nid}>
                  {idx > 0 && <span className="mono-meta">→</span>}
                  <span
                    className={
                      n.kind === 'ending'
                        ? n.endingTier === 'deity'
                          ? 'tag-pill verdigris'
                          : 'tag-pill ochre'
                        : 'tag-pill'
                    }
                  >
                    {splitTitleHead(n.title).split('&')[0].trim()}
                  </span>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {relics.length > 0 && (
          <div className="row-wrap mt-md">
            {relics.map((r) => (
              <span key={`${r.sourceNodeId}-${r.choiceId}`} className="tag-pill rubric">
                <Sparkles size={12} /> {resolveRelicDisplayName(saga, r)}
              </span>
            ))}
          </div>
        )}

        <div className="row-wrap mt-lg">
          {canRewind && (
            <button
              id="dnd-ending-rewind-btn"
              type="button"
              className="btn-primary"
              onClick={onRewind}
            >
              <Undo2 size={15} />
              <span>{ui.game.rewindLast}</span>
            </button>
          )}

          {ending.endingTier === 'deity' && (
            <button
              id="dnd-ending-compare-btn"
              type="button"
              className="btn-secondary"
              onClick={onJumpToCompareDeity}
            >
              <Scale size={15} />
              <span>{ui.game.inspectInComp}</span>
            </button>
          )}

          <button
            id="dnd-ending-share-btn"
            type="button"
            className="btn-secondary"
            onClick={onShare}
          >
            {copiedLink ? <Check size={15} /> : <Share2 size={15} />}
            <span>{copiedLink ? ui.game.linkCopied : ui.game.shareQuest}</span>
          </button>

          <button
            id="dnd-ending-restart-btn"
            type="button"
            className="btn-secondary"
            onClick={onRestart}
          >
            <RotateCcw size={15} />
            <span>{ui.game.newRun}</span>
          </button>

          <button
            id="dnd-ending-next-saga-btn"
            type="button"
            className="btn-secondary"
            onClick={onNextSaga}
          >
            <span>{ui.game.nextDeityCampaign}</span>
            <ArrowRight size={15} />
          </button>

          <button
            id="dnd-ending-tradition-btn"
            type="button"
            className="btn-ghost"
            onClick={onOpenTradition}
          >
            <span>{ui.game.monographSuffix(traditionName)}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

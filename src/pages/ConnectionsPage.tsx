import React, { useMemo, useState } from 'react';
import {
  ArrowLeftRight,
  ArrowRight,
  Check,
  Compass,
  GitBranch,
  Layers,
  Link2,
  Network,
  Scale,
  Sparkles,
  X,
} from 'lucide-react';
import type { ConnectionKind, InspirationEvent } from '../data/connections';
import { getDeityPortrait, getPortalPlate, getTraditionPlate } from '../data/visuals';
import { copyShareableUrl } from '../hooks/useRouter';
import { useI18n } from '../i18n/I18nContext';
import { compactTraditionName } from '../i18n/uiStrings';
import type { Deity, RouteState, TraditionId } from '../types/mythology';
import type { PantheonFocus } from '../utils/storage';

interface ConnectionsPageProps {
  pantheonFocus: PantheonFocus;
  onChangePantheonFocus: (next: PantheonFocus) => void;
  initialPair?: [TraditionId, TraditionId];
  initialEventId?: string;
  onSelectPair: (pair: [TraditionId, TraditionId]) => void;
  onSelectEventId: (eventId: string) => void;
  onJumpToCompareDeities: (deityIds: string[]) => void;
  onJumpToMotif: (motifId: string) => void;
  navigate: (next: RouteState) => void;
}

interface TimelineLaneSpec {
  id: TraditionId | 'pie-steppe';
  shortEraEn: string;
  shortEraZh: string;
  startYear: number;
  endYear: number;
  y: number;
  isRoot?: boolean;
}

const TIMELINE_LANE_SPECS: TimelineLaneSpec[] = [
  {
    id: 'pie-steppe',
    shortEraEn: '4000–2000 BCE',
    shortEraZh: '前4000–前2000',
    startYear: -4000,
    endYear: -2000,
    y: 62,
    isRoot: true,
  },
  {
    id: 'hindu',
    shortEraEn: '1500 BCE–Present',
    shortEraZh: '前1500–当今',
    startYear: -1500,
    endYear: 2026,
    y: 104,
  },
  {
    id: 'chinese',
    shortEraEn: '1600 BCE–Present',
    shortEraZh: '前1600–当今',
    startYear: -1600,
    endYear: 2026,
    y: 146,
  },
  {
    id: 'japanese',
    shortEraEn: '300 BCE–Present',
    shortEraZh: '前300–当今',
    startYear: -300,
    endYear: 2026,
    y: 188,
  },
  {
    id: 'greek',
    shortEraEn: '1600 BCE–400 CE',
    shortEraZh: '前1600–公元400',
    startYear: -1600,
    endYear: 400,
    y: 230,
  },
  {
    id: 'celtic',
    shortEraEn: '800 BCE–1100 CE',
    shortEraZh: '前800–1100年',
    startYear: -800,
    endYear: 1100,
    y: 272,
  },
  {
    id: 'norse',
    shortEraEn: '200–1100 CE',
    shortEraZh: '公元200–1100',
    startYear: 200,
    endYear: 1100,
    y: 314,
  },
  {
    id: 'mesopotamian',
    shortEraEn: '3500–500 BCE',
    shortEraZh: '前3500–前500',
    startYear: -3500,
    endYear: -500,
    y: 356,
  },
  {
    id: 'egyptian',
    shortEraEn: '3100 BCE–400 CE',
    shortEraZh: '前3100–公元400',
    startYear: -3100,
    endYear: 400,
    y: 398,
  },
  {
    id: 'mesoamerican',
    shortEraEn: '1500 BCE–1521 CE',
    shortEraZh: '前1500–1521年',
    startYear: -1500,
    endYear: 1521,
    y: 440,
  },
  {
    id: 'yoruba',
    shortEraEn: '500 BCE–Present',
    shortEraZh: '前500–当今',
    startYear: -500,
    endYear: 2026,
    y: 482,
  },
];

const LANE_Y_BY_ID: Record<string, number> = Object.fromEntries(
  TIMELINE_LANE_SPECS.map((lane) => [lane.id, lane.y])
);

const TIMELINE_TICKS: { year: number; en: string; zh: string }[] = [
  { year: -4000, en: '4000 BCE', zh: '前4000年' },
  { year: -2000, en: '2000 BCE', zh: '前2000年' },
  { year: -800, en: '800 BCE', zh: '前800年' },
  { year: 0, en: '1 CE', zh: '公元1年' },
  { year: 700, en: '700 CE', zh: '700年' },
  { year: 1400, en: '1400 CE', zh: '1400年' },
  { year: 2026, en: 'Present', zh: '当今' },
];

function yearToX(year: number): number {
  const stops: [number, number][] = [
    [-4000, 210],
    [-2000, 340],
    [-800, 460],
    [0, 585],
    [700, 715],
    [1400, 850],
    [2026, 1015],
  ];
  if (year <= stops[0][0]) return stops[0][1];
  for (let i = 0; i < stops.length - 1; i++) {
    const [y0, x0] = stops[i];
    const [y1, x1] = stops[i + 1];
    if (year <= y1) {
      const t = (year - y0) / (y1 - y0);
      return Math.round((x0 + t * (x1 - x0)) * 10) / 10;
    }
  }
  return stops[stops.length - 1][1];
}

function eventInvolvesTradition(ev: InspirationEvent, tid: TraditionId): boolean {
  if (ev.id === 'insp-pie-dispersal') {
    return tid === 'hindu' || tid === 'greek' || tid === 'celtic' || tid === 'norse';
  }
  return ev.fromTradition === tid || ev.toTradition === tid;
}

function kindBadgeClass(kind: ConnectionKind): string {
  switch (kind) {
    case 'shared-root':
      return 'conn-kind-pill shared-root';
    case 'direct-inspiration':
      return 'conn-kind-pill direct-inspiration';
    case 'syncretic-exchange':
      return 'conn-kind-pill syncretic-exchange';
    case 'independent-parallel':
      return 'conn-kind-pill independent-parallel';
  }
}

function defaultPartnerFor(tid: TraditionId): TraditionId {
  const preferred: Record<TraditionId, TraditionId> = {
    greek: 'mesopotamian',
    mesopotamian: 'greek',
    egyptian: 'greek',
    hindu: 'greek',
    norse: 'celtic',
    celtic: 'norse',
    chinese: 'japanese',
    japanese: 'chinese',
    mesoamerican: 'norse',
    yoruba: 'greek',
  };
  return preferred[tid];
}

export const ConnectionsPage: React.FC<ConnectionsPageProps> = ({
  pantheonFocus,
  onChangePantheonFocus,
  initialPair,
  initialEventId,
  onSelectPair,
  onSelectEventId,
  onJumpToCompareDeities,
  onJumpToMotif,
  navigate,
}) => {
  const { locale, realm, ui, data, shortTraditionName, formatPercent } = useI18n();
  const [copiedLink, setCopiedLink] = useState(false);

  const [selectedPair, setSelectedPair] = useState<[TraditionId, TraditionId]>(() => {
    if (initialPair && initialPair[0] !== initialPair[1]) {
      return initialPair;
    }
    if (pantheonFocus !== 'all') {
      return [pantheonFocus, defaultPartnerFor(pantheonFocus)];
    }
    return ['mesopotamian', 'greek'];
  });

  const [selectedEventId, setSelectedEventId] = useState<string>(() => {
    if (initialEventId && data.inspirationTimeline.some((e) => e.id === initialEventId)) {
      return initialEventId;
    }
    if (pantheonFocus !== 'all') {
      const matching = data.inspirationTimeline.find((e) =>
        eventInvolvesTradition(e, pantheonFocus)
      );
      if (matching) return matching.id;
    }
    return 'insp-meso-greek';
  });

  const effectivePair: [TraditionId, TraditionId] = useMemo(() => {
    if (pantheonFocus !== 'all' && selectedPair[0] !== pantheonFocus) {
      const nextB =
        selectedPair[1] !== pantheonFocus
          ? selectedPair[1]
          : defaultPartnerFor(pantheonFocus);
      return [pantheonFocus, nextB];
    }
    return selectedPair;
  }, [pantheonFocus, selectedPair]);

  const [tradAId, tradBId] = effectivePair;
  const tradA = data.traditionById[tradAId];
  const tradB = data.traditionById[tradBId];

  const activePairConnection = useMemo(
    () => data.getPairwiseConnection(tradAId, tradBId),
    [data, tradAId, tradBId]
  );

  const pairDeities = useMemo(() => {
    if (activePairConnection.compareDeityIds.length > 0) {
      return activePairConnection.compareDeityIds
        .map((id) => data.deityById[id])
        .filter((d): d is Deity => Boolean(d));
    }
    const fromA = data.deities.filter((d) => d.traditionId === tradAId).slice(0, 2);
    const fromB = data.deities.filter((d) => d.traditionId === tradBId).slice(0, 2);
    return [...fromA, ...fromB];
  }, [activePairConnection, data.deities, data.deityById, tradAId, tradBId]);

  const activeEvent = useMemo(() => {
    if (pantheonFocus !== 'all') {
      const cur = data.inspirationTimeline.find((e) => e.id === selectedEventId);
      if (cur && eventInvolvesTradition(cur, pantheonFocus)) return cur;
      return (
        data.inspirationTimeline.find((e) => eventInvolvesTradition(e, pantheonFocus)) ??
        data.inspirationTimeline[0]
      );
    }
    return (
      data.inspirationTimeline.find((e) => e.id === selectedEventId) ??
      data.inspirationTimeline[1]
    );
  }, [data.inspirationTimeline, pantheonFocus, selectedEventId]);

  const visibleRootFamilies = useMemo(() => {
    if (pantheonFocus === 'all') return data.ancestralRootFamilies;
    return data.ancestralRootFamilies.filter((root) =>
      root.descendantTraditions.includes(pantheonFocus)
    );
  }, [data.ancestralRootFamilies, pantheonFocus]);

  const closestRelatives = useMemo(() => {
    const anchor = pantheonFocus !== 'all' ? pantheonFocus : tradAId;
    return data.traditions
      .filter((t) => t.id !== anchor)
      .map((t) => ({
        tradition: t,
        conn: data.getPairwiseConnection(anchor, t.id),
      }))
      .sort((a, b) => b.conn.similarityScore - a.conn.similarityScore);
  }, [data, pantheonFocus, tradAId]);

  const focusedTrad = pantheonFocus !== 'all' ? data.traditionById[pantheonFocus] : undefined;

  const handleChoosePair = (nextA: TraditionId, nextB: TraditionId) => {
    if (nextA === nextB) return;
    const next: [TraditionId, TraditionId] = [nextA, nextB];
    setSelectedPair(next);
    onSelectPair(next);
  };

  const handleChooseEvent = (eventId: string) => {
    setSelectedEventId(eventId);
    onSelectEventId(eventId);
  };

  const handleCopyUrl = async () => {
    const ok = await copyShareableUrl();
    if (ok) {
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const activeEventMotif = data.mythMotifs.find((m) => m.id === activeEvent.linkedMotifId);

  return (
    <div>
      <section className="visual-split-banner" aria-labelledby="connections-page-heading">
        <div>
          <div className="row-between">
            <span className="folio-kicker">
              {focusedTrad
                ? ui.connections.kickerFocused(focusedTrad.name)
                : ui.connections.kickerAll}
            </span>
            <button
              id="connections-copy-link-btn"
              type="button"
              className="btn-ghost"
              onClick={handleCopyUrl}
            >
              {copiedLink ? <Check size={14} /> : <Link2 size={14} />}
              <span>
                {copiedLink ? ui.connections.copiedShare : ui.connections.shareView}
              </span>
            </button>
          </div>

          <h1 id="connections-page-heading" className="mt-sm">
            {focusedTrad
              ? ui.connections.headingFocused(focusedTrad.name)
              : ui.connections.headingAll}
          </h1>

          <p className="page-lead mt-sm">
            {focusedTrad
              ? ui.connections.leadFocused(focusedTrad.name)
              : ui.connections.leadAll}
          </p>

          <div className="row-wrap mt-md">
            <span className="conn-kind-pill shared-root">{ui.connections.pillSharedRoot}</span>
            <span className="conn-kind-pill direct-inspiration">
              {ui.connections.pillDirect}
            </span>
            <span className="conn-kind-pill syncretic-exchange">
              {ui.connections.pillSyncretic}
            </span>
            <span className="conn-kind-pill independent-parallel">
              {ui.connections.pillParallel}
            </span>
          </div>

          <div className="row-wrap mt-lg">
            <a href="#section-timeline" className="btn-primary">
              <Compass size={15} />
              <span>{ui.connections.btnTimeline}</span>
            </a>
            <a href="#section-roots" className="btn-secondary">
              <GitBranch size={15} />
              <span>{ui.connections.btnRoots}</span>
            </a>
            <a href="#section-similarity" className="btn-secondary">
              <Network size={15} />
              <span>{ui.connections.btnMatrix}</span>
            </a>
            {focusedTrad && (
              <button
                id="connections-reset-focus-btn"
                type="button"
                className="btn-ghost"
                onClick={() => onChangePantheonFocus('all')}
              >
                <X size={14} />
                <span>{ui.connections.showAll10}</span>
              </button>
            )}
          </div>
        </div>

        <figure className="banner-plate-frame">
          <img
            src={
              focusedTrad
                ? getTraditionPlate(focusedTrad.id, realm)
                : getPortalPlate('connections', realm)
            }
            alt={focusedTrad ? focusedTrad.name : ui.connections.headingAll}
            className="banner-plate-img"
          />
        </figure>
      </section>

      {focusedTrad && (
        <section className="synthesis-banner mt-lg" aria-label={focusedTrad.name}>
          <div className="folio-grid-3">
            <div className="stack-xs">
              <span className="folio-kicker">{ui.connections.focusedMotherKicker}</span>
              <strong>{visibleRootFamilies.map((r) => r.name).join(' · ')}</strong>
              <p className="text-muted">
                {visibleRootFamilies[0]?.homeland} ({visibleRootFamilies[0]?.originEra})
              </p>
            </div>

            <div className="stack-xs">
              <span className="folio-kicker">{ui.connections.focusedCousinKicker}</span>
              <strong>
                {closestRelatives[0]?.tradition.name}{' '}
                {ui.connections.affinitySuffix(
                  formatPercent(closestRelatives[0]?.conn.similarityScore ?? 0)
                )}
              </strong>
              <p className="text-muted">{closestRelatives[0]?.conn.badgeLabel}</p>
            </div>

            <div className="stack-xs">
              <span className="folio-kicker">{ui.connections.focusedExchangeKicker}</span>
              <strong>
                {focusedTrad.relatedTraditions
                  .map((rt) => shortTraditionName(rt.traditionId))
                  .join(' · ')}
              </strong>
              <p className="text-muted">
                {focusedTrad.relatedTraditions[0]?.connectionType}
                {locale === 'zh' ? '：' : ': '}
                {focusedTrad.relatedTraditions[0]?.explanation}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 1: CHRONOLOGICAL INSPIRATION TIMELINE */}
      <section
        id="section-timeline"
        className="mt-xl"
        aria-labelledby="timeline-section-heading"
      >
        <div className="section-heading-row">
          <div>
            <span className="folio-kicker">{ui.connections.timelineKicker}</span>
            <h2 id="timeline-section-heading">{ui.connections.timelineHeading}</h2>
          </div>
          <span className="mono-meta">{ui.connections.timelineHint}</span>
        </div>

        <div className="row-wrap mb-md" role="tablist" aria-label={ui.connections.timelineHeading}>
          {data.inspirationTimeline.map((ev, idx) => {
            const isFocusedMatch =
              pantheonFocus === 'all' || eventInvolvesTradition(ev, pantheonFocus);
            const isActive = activeEvent.id === ev.id;
            return (
              <button
                key={ev.id}
                id={`timeline-pill-${ev.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={[
                  'conn-event-pill',
                  isActive ? 'active' : '',
                  !isFocusedMatch ? 'dimmed' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handleChooseEvent(ev.id)}
              >
                <span className="conn-step-num">{idx + 1}</span>
                <span>
                  {ev.fromLabel.split(/[（(]/)[0].trim()} ➔{' '}
                  {ev.toLabel.split(/[（(]/)[0].trim()}
                </span>
                <span className="mono-meta">({ev.eraLabel.split(/[（(]/)[0].trim()})</span>
              </button>
            );
          })}
        </div>

        <div className="conn-svg-frame">
          <svg
            viewBox="0 0 1060 516"
            className="conn-timeline-svg"
            role="img"
            aria-label={ui.connections.timelineHeading}
          >
            <defs>
              <marker
                id="arrow-gold"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" className="conn-marker-gold" />
              </marker>
              <marker
                id="arrow-verdigris"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" className="conn-marker-verdigris" />
              </marker>
            </defs>

            {TIMELINE_TICKS.map((tick) => {
              const x = yearToX(tick.year);
              return (
                <g key={tick.year}>
                  <line x1={x} y1={36} x2={x} y2={498} className="conn-grid-line" />
                  <text x={x} y={24} textAnchor="middle" className="conn-axis-label">
                    {locale === 'zh' ? tick.zh : tick.en}
                  </text>
                </g>
              );
            })}

            {TIMELINE_LANE_SPECS.map((lane) => {
              const x1 = yearToX(lane.startYear);
              const x2 = yearToX(lane.endYear);
              const laneDimmed =
                pantheonFocus !== 'all' &&
                lane.id !== pantheonFocus &&
                !(
                  lane.id === 'pie-steppe' &&
                  ['hindu', 'greek', 'celtic', 'norse'].includes(pantheonFocus)
                );

              const laneLabel =
                lane.id === 'pie-steppe'
                  ? ui.connections.pieRootLane
                  : shortTraditionName(lane.id);

              return (
                <g
                  key={lane.id}
                  className={laneDimmed ? 'conn-lane-group dimmed' : 'conn-lane-group'}
                >
                  <text x={16} y={lane.y - 3} className="conn-lane-title">
                    {laneLabel}
                  </text>
                  <text x={16} y={lane.y + 12} className="conn-lane-sub">
                    {locale === 'zh' ? lane.shortEraZh : lane.shortEraEn}
                  </text>

                  <line x1={205} y1={lane.y} x2={1020} y2={lane.y} className="conn-lane-track" />
                  <rect
                    x={x1}
                    y={lane.y - 5}
                    width={Math.max(18, x2 - x1)}
                    height={10}
                    rx={5}
                    className={
                      lane.isRoot
                        ? 'conn-lane-span root-span'
                        : lane.id === pantheonFocus
                          ? 'conn-lane-span focused-span'
                          : 'conn-lane-span'
                    }
                  />
                </g>
              );
            })}

            {(['hindu', 'greek', 'celtic', 'norse'] as TraditionId[]).map((targetId) => {
              const startX = yearToX(-3300);
              const startY = LANE_Y_BY_ID['pie-steppe'];
              const targetLane = TIMELINE_LANE_SPECS.find((l) => l.id === targetId)!;
              const endX = yearToX(targetLane.startYear);
              const endY = targetLane.y;
              const midX = Math.round((startX + endX) / 2);
              const isSelected = activeEvent.id === 'insp-pie-dispersal';
              return (
                <path
                  key={`pie-${targetId}`}
                  d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX - 20} ${endY}, ${endX} ${endY}`}
                  markerEnd="url(#arrow-gold)"
                  className={
                    isSelected
                      ? 'conn-flow-path shared-root active'
                      : 'conn-flow-path shared-root'
                  }
                  onClick={() => handleChooseEvent('insp-pie-dispersal')}
                />
              );
            })}

            {data.inspirationTimeline
              .filter((e) => e.id !== 'insp-pie-dispersal')
              .map((ev) => {
                const x = yearToX(ev.yearSort);
                const fromY = LANE_Y_BY_ID[ev.fromTradition];
                const toY = LANE_Y_BY_ID[ev.toTradition];
                const isSelected = activeEvent.id === ev.id;
                const isSameLane = ev.fromTradition === ev.toTradition;
                const markerUrl =
                  ev.kind === 'syncretic-exchange'
                    ? 'url(#arrow-verdigris)'
                    : 'url(#arrow-gold)';

                const pathD = isSameLane
                  ? `M ${x - 75} ${fromY - 4} Q ${x - 20} ${fromY - 34} ${x} ${toY - 6}`
                  : `M ${x - 24} ${fromY} C ${x + 8} ${fromY}, ${x - 8} ${toY}, ${x} ${
                      fromY > toY ? toY + 7 : toY - 7
                    }`;

                return (
                  <path
                    key={`path-${ev.id}`}
                    d={pathD}
                    markerEnd={markerUrl}
                    className={['conn-flow-path', ev.kind, isSelected ? 'active' : '']
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => handleChooseEvent(ev.id)}
                  />
                );
              })}

            {data.inspirationTimeline.map((ev, index) => {
              const cx = yearToX(ev.yearSort);
              const cy =
                ev.id === 'insp-pie-dispersal'
                  ? LANE_Y_BY_ID['pie-steppe']
                  : ev.fromTradition === ev.toTradition
                    ? LANE_Y_BY_ID[ev.toTradition] - 20
                    : Math.round(
                        (LANE_Y_BY_ID[ev.fromTradition] + LANE_Y_BY_ID[ev.toTradition]) / 2
                      );
              const isSelected = activeEvent.id === ev.id;
              return (
                <g
                  key={`node-${ev.id}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${index + 1}. ${ev.headline}`}
                  className={isSelected ? 'conn-event-node active' : 'conn-event-node'}
                  onClick={() => handleChooseEvent(ev.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleChooseEvent(ev.id);
                    }
                  }}
                >
                  <circle cx={cx} cy={cy} r={isSelected ? 16 : 13} className="conn-node-ring" />
                  <text
                    x={cx}
                    y={cy + 1}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="conn-node-num"
                  >
                    {index + 1}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <article
          className="visual-split-banner mt-md"
          aria-live="polite"
          aria-labelledby="active-event-heading"
        >
          <div>
            <div className="row-between">
              <span className={kindBadgeClass(activeEvent.kind)}>
                {activeEvent.kind === 'shared-root'
                  ? ui.connections.kindDispersal
                  : activeEvent.kind === 'syncretic-exchange'
                    ? ui.connections.kindSyncretism
                    : ui.connections.kindDirect}
              </span>
              <span className="mono-meta">{activeEvent.eraLabel}</span>
            </div>

            <h3 id="active-event-heading" className="mt-sm">
              {activeEvent.headline}
            </h3>

            <p className="mono-meta mt-xs">
              <strong>{ui.connections.transmissionVector}</strong> {activeEvent.fromLabel} ➔{' '}
              {activeEvent.toLabel} · <em>{activeEvent.historicalChannel}</em>
            </p>

            <p className="mt-sm">{activeEvent.scholarlySummary}</p>

            <div className="conn-transfer-table mt-md">
              <div className="conn-transfer-header">
                <span>{ui.connections.colSource}</span>
                <span>{ui.connections.colOutcome}</span>
              </div>
              {activeEvent.whatWasInspired.map((row) => (
                <div key={row.sourceElement} className="conn-transfer-row">
                  <strong>{row.sourceElement}</strong>
                  <span>{row.inspiredOutcome}</span>
                </div>
              ))}
            </div>

            <div className="row-wrap mt-md">
              <button
                id="event-compare-deities-btn"
                type="button"
                className="btn-primary"
                onClick={() => {
                  onJumpToCompareDeities(activeEvent.compareDeityIds);
                  navigate({
                    page: 'deities',
                    compareIds: activeEvent.compareDeityIds,
                  });
                }}
              >
                <Scale size={15} />
                <span>{ui.connections.compareSourceVsInspired}</span>
              </button>

              {activeEventMotif && (
                <button
                  id="event-open-motif-btn"
                  type="button"
                  className="btn-secondary"
                  onClick={() => onJumpToMotif(activeEventMotif.id)}
                >
                  <Layers size={15} />
                  <span>{ui.connections.parallelMythPrefix(activeEventMotif.title)}</span>
                </button>
              )}
            </div>
          </div>

          <div className="stack-sm">
            <figure className="banner-plate-frame">
              <img
                src={activeEvent.platePath}
                alt={activeEvent.headline}
                className="banner-plate-img"
              />
            </figure>

            <div className="conn-mini-deity-strip">
              {activeEvent.compareDeityIds.map((did) => {
                const d = data.deityById[did];
                if (!d) return null;
                return (
                  <button
                    key={d.id}
                    type="button"
                    className="conn-mini-deity-card"
                    onClick={() => {
                      onJumpToCompareDeities(activeEvent.compareDeityIds);
                      navigate({
                        page: 'deities',
                        compareIds: activeEvent.compareDeityIds,
                      });
                    }}
                  >
                    <img
                      src={getDeityPortrait(d.id)}
                      alt={d.name}
                      className="conn-mini-deity-img"
                      loading="lazy"
                    />
                    <div>
                      <strong>{d.name}</strong>
                      <span className="mono-meta">{shortTraditionName(d.traditionId)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </article>
      </section>

      {/* SECTION 2: ANCESTRAL MOTHER RELIGIONS */}
      <section id="section-roots" className="mt-xl" aria-labelledby="roots-section-heading">
        <div className="section-heading-row">
          <div>
            <span className="folio-kicker">{ui.connections.rootsKicker}</span>
            <h2 id="roots-section-heading">{ui.connections.rootsHeading}</h2>
          </div>
          <span className="mono-meta">
            {ui.connections.spheresCount(visibleRootFamilies.length)}
          </span>
        </div>

        <div className="folio-grid-2">
          {visibleRootFamilies.map((root) => (
            <article key={root.id} className="visual-card conn-root-card">
              <div className="visual-card-media">
                <img
                  src={root.platePath}
                  alt={root.name}
                  className="visual-card-img"
                  loading="lazy"
                />
                <span className="media-badge-overlay">{root.originEra}</span>
              </div>

              <div className="visual-card-content stack-sm">
                <span className="folio-kicker">{root.homeland.toUpperCase()}</span>
                <h3>{root.name}</h3>
                <p className="text-muted">{root.summary}</p>

                <div>
                  <span className="mono-meta">{ui.connections.daughterTraditions}</span>
                  <div className="row-wrap mt-xs">
                    {root.descendantTraditions.map((tid) => {
                      const t = data.traditionById[tid];
                      if (!t) return null;
                      return (
                        <button
                          key={tid}
                          type="button"
                          className={tid === pantheonFocus ? 'tag-pill rubric' : 'tag-pill'}
                          onClick={() => navigate({ page: 'traditions', traditionSlug: tid })}
                        >
                          {compactTraditionName(t.name)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="conn-transfer-table">
                  <div className="conn-transfer-header">
                    <span>{ui.connections.colAncestralPattern}</span>
                    <span>{ui.connections.colManifestations}</span>
                  </div>
                  {root.inheritedTraits.map((trait) => (
                    <div key={trait.concept} className="conn-transfer-row">
                      <strong>{trait.concept}</strong>
                      <span>{trait.manifestations}</span>
                    </div>
                  ))}
                </div>

                <div className="row-between mt-xs">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      onJumpToCompareDeities(root.compareDeityIds);
                      navigate({ page: 'deities', compareIds: root.compareDeityIds });
                    }}
                  >
                    <Scale size={14} />
                    <span>{ui.connections.compareCognateGods}</span>
                  </button>

                  {root.descendantTraditions.length >= 2 && (
                    <button
                      type="button"
                      className="btn-ghost"
                      onClick={() => {
                        handleChoosePair(
                          root.descendantTraditions[0],
                          root.descendantTraditions[1]
                        );
                        document
                          .getElementById('section-similarity')
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <span>{ui.connections.inspectPairwise}</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 3: PAIRWISE SIMILARITY EXPLORER & 10×10 MATRIX */}
      <section
        id="section-similarity"
        className="mt-xl"
        aria-labelledby="similarity-section-heading"
      >
        <div className="section-heading-row">
          <div>
            <span className="folio-kicker">{ui.connections.matrixKicker}</span>
            <h2 id="similarity-section-heading">{ui.connections.matrixHeading}</h2>
          </div>
          <span className="mono-meta">{ui.connections.matrixHint}</span>
        </div>

        <div className="synthesis-banner mb-md">
          <div className="conn-pair-picker-grid">
            <div>
              <label htmlFor="conn-select-trad-a" className="folio-kicker">
                {ui.connections.firstReligion}
              </label>
              <select
                id="conn-select-trad-a"
                className="conn-trad-select mt-xs"
                value={tradAId}
                disabled={pantheonFocus !== 'all'}
                onChange={(e) => {
                  const nextA = e.target.value as TraditionId;
                  const nextB = nextA === tradBId ? defaultPartnerFor(nextA) : tradBId;
                  handleChoosePair(nextA, nextB);
                }}
              >
                {data.traditions.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.eraLabel})
                  </option>
                ))}
              </select>
            </div>

            <div className="conn-swap-col">
              <button
                id="conn-swap-pair-btn"
                type="button"
                className="btn-ghost"
                disabled={pantheonFocus !== 'all'}
                onClick={() => handleChoosePair(tradBId, tradAId)}
              >
                <ArrowLeftRight size={16} />
              </button>
            </div>

            <div>
              <label htmlFor="conn-select-trad-b" className="folio-kicker">
                {ui.connections.secondReligion}
              </label>
              <select
                id="conn-select-trad-b"
                className="conn-trad-select mt-xs"
                value={tradBId}
                onChange={(e) => handleChoosePair(tradAId, e.target.value as TraditionId)}
              >
                {data.traditions
                  .filter((t) => t.id !== tradAId)
                  .map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.eraLabel})
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="mt-md">
            <span className="mono-meta">
              {ui.connections.closestRelativesTo} <strong>{tradA?.name}</strong>{' '}
              {ui.connections.sortedBySimilarity}
            </span>
            <div className="row-wrap mt-xs">
              {closestRelatives.map(({ tradition, conn }) => (
                <button
                  key={tradition.id}
                  type="button"
                  className={
                    tradition.id === tradBId ? 'subnav-pill-btn active' : 'subnav-pill-btn'
                  }
                  onClick={() => handleChoosePair(tradAId, tradition.id)}
                >
                  <span>{shortTraditionName(tradition.id)}</span>
                  <span className="mono-meta">{formatPercent(conn.similarityScore)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {tradA && tradB && (
          <article className="conn-pair-dossier" aria-live="polite">
            <div className="conn-pair-header">
              <div className="conn-pair-trad-tile">
                <img
                  src={getTraditionPlate(tradA.id, realm)}
                  alt={tradA.name}
                  className="conn-pair-thumb"
                />
                <div>
                  <span className="folio-kicker">{tradA.folioCode}</span>
                  <h3>{tradA.name}</h3>
                  <span className="mono-meta">{tradA.eraLabel}</span>
                </div>
              </div>

              <div className="conn-score-medallion">
                <span className="folio-kicker">{ui.connections.affinityMedallionKicker}</span>
                <div className="conn-score-value">
                  {formatPercent(activePairConnection.similarityScore)}
                </div>
                <svg viewBox="0 0 200 10" className="conn-score-bar-svg" aria-hidden="true">
                  <rect x={0} y={0} width={200} height={10} rx={5} className="conn-bar-bg" />
                  <rect
                    x={0}
                    y={0}
                    width={Math.round(activePairConnection.similarityScore * 2)}
                    height={10}
                    rx={5}
                    className={`conn-bar-fill ${activePairConnection.kind}`}
                  />
                </svg>
                <span className={kindBadgeClass(activePairConnection.kind)}>
                  {activePairConnection.badgeLabel}
                </span>
              </div>

              <div className="conn-pair-trad-tile">
                <img
                  src={getTraditionPlate(tradB.id, realm)}
                  alt={tradB.name}
                  className="conn-pair-thumb"
                />
                <div>
                  <span className="folio-kicker">{tradB.folioCode}</span>
                  <h3>{tradB.name}</h3>
                  <span className="mono-meta">{tradB.eraLabel}</span>
                </div>
              </div>
            </div>

            <div className="folio-grid-2 mt-md">
              <div className="stack-sm">
                <div>
                  <span className="folio-kicker">{ui.connections.sharedRootOrVector}</span>
                  <p className="mt-xs">
                    <strong>{activePairConnection.sharedMotherOrVector}</strong>
                  </p>
                </div>

                <div>
                  <span className="folio-kicker">{ui.connections.keySimilarities}</span>
                  <ul className="scholarly-list mt-xs">
                    {activePairConnection.keySimilarities.map((sim) => (
                      <li key={sim}>{sim}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="stack-sm">
                <div>
                  <span className="folio-kicker">{ui.connections.definingDivergence}</span>
                  <p className="mt-xs">{activePairConnection.keyDifference}</p>
                </div>

                <div>
                  <span className="folio-kicker">{ui.connections.counterpartDeities}</span>
                  <div className="conn-mini-deity-strip mt-xs">
                    {pairDeities.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        className="conn-mini-deity-card"
                        onClick={() => {
                          const ids = pairDeities.map((x) => x.id);
                          onJumpToCompareDeities(ids);
                          navigate({ page: 'deities', compareIds: ids });
                        }}
                      >
                        <img
                          src={getDeityPortrait(d.id)}
                          alt={d.name}
                          className="conn-mini-deity-img"
                          loading="lazy"
                        />
                        <div>
                          <strong>{d.name}</strong>
                          <span className="mono-meta">{shortTraditionName(d.traditionId)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="row-wrap mt-xs">
                  <button
                    id="pair-compare-deities-btn"
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      const ids = pairDeities.map((x) => x.id);
                      onJumpToCompareDeities(ids);
                      navigate({ page: 'deities', compareIds: ids });
                    }}
                  >
                    <Sparkles size={15} />
                    <span>
                      {ui.connections.comparePairGods(
                        shortTraditionName(tradA.id),
                        shortTraditionName(tradB.id)
                      )}
                    </span>
                  </button>

                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => navigate({ page: 'traditions', traditionSlug: tradB.id })}
                  >
                    <span>{ui.connections.readMonograph(shortTraditionName(tradB.id))}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        )}

        <div className="conn-matrix-wrap mt-lg">
          <div className="row-between mb-sm">
            <span className="folio-kicker">{ui.connections.matrixTableTitle}</span>
            <div className="row-wrap">
              <span className="conn-kind-pill shared-root">{ui.connections.shortRoot}</span>
              <span className="conn-kind-pill direct-inspiration">
                {ui.connections.shortDirect}
              </span>
              <span className="conn-kind-pill syncretic-exchange">{ui.connections.shortSync}</span>
              <span className="conn-kind-pill independent-parallel">
                {ui.connections.shortParallel}
              </span>
            </div>
          </div>

          <div className="conn-matrix-scroll">
            <table className="conn-matrix-table">
              <thead>
                <tr>
                  <th scope="col">{ui.connections.matrixColTradition}</th>
                  {data.traditions.map((col) => (
                    <th key={col.id} scope="col">
                      {shortTraditionName(col.id)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.traditions.map((row) => {
                  const rowDimmed = pantheonFocus !== 'all' && row.id !== pantheonFocus;
                  return (
                    <tr key={row.id} className={rowDimmed ? 'dimmed-row' : undefined}>
                      <th scope="row">{shortTraditionName(row.id)}</th>
                      {data.traditions.map((col) => {
                        if (row.id === col.id) {
                          return (
                            <td key={col.id} className="conn-matrix-self">
                              —
                            </td>
                          );
                        }
                        const rel = data.getPairwiseConnection(row.id, col.id);
                        const isSelectedCell =
                          (row.id === tradAId && col.id === tradBId) ||
                          (row.id === tradBId && col.id === tradAId);
                        return (
                          <td key={col.id}>
                            <button
                              type="button"
                              className={[
                                'conn-matrix-cell',
                                rel.kind,
                                isSelectedCell ? 'selected' : '',
                              ]
                                .filter(Boolean)
                                .join(' ')}
                              title={`${row.name} & ${col.name}: ${formatPercent(rel.similarityScore)} (${rel.badgeLabel})`}
                              onClick={() => {
                                if (pantheonFocus !== 'all') {
                                  const other =
                                    row.id === pantheonFocus
                                      ? col.id
                                      : col.id === pantheonFocus
                                        ? row.id
                                        : col.id;
                                  if (other !== pantheonFocus) {
                                    handleChoosePair(pantheonFocus, other);
                                  }
                                } else {
                                  handleChoosePair(row.id, col.id);
                                }
                              }}
                            >
                              {formatPercent(rel.similarityScore)}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

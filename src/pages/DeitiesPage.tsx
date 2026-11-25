import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Gamepad2,
  Layers,
  LayoutGrid,
  Plus,
  Printer,
  Search,
  Share2,
  Sparkles,
  Star,
  Trash2,
  X,
} from 'lucide-react';
import { DeityReaderDrawer } from '../components/DeityReaderDrawer';
import { ArchetypeMedallion, DeityComparisonRadar } from '../components/VisualEmblems';
import { DEITIES as EN_DEITIES } from '../data/deities';
import { getDeityPortrait } from '../data/visuals';
import { copyShareableUrl } from '../hooks/useRouter';
import { useI18n } from '../i18n/I18nContext';
import { compactTraditionName } from '../i18n/uiStrings';
import type { ArchetypeId, Deity, RouteState, TraditionId } from '../types/mythology';
import type { PantheonFocus, RealmMode } from '../utils/storage';

interface DeitiesPageProps {
  pantheonFocus: PantheonFocus;
  compareIds: string[];
  favoriteIds: string[];
  onToggleFavorite: (deityId: string) => void;
  onJumpCrossRealm: (targetRealm: RealmMode, targetDeityId: string) => void;
  initialReaderDeityId?: string | null;
  onClearInitialReader?: () => void;
  onSetCompareIds: (ids: string[]) => void;
  onToggleCompareDeity: (deityId: string) => void;
  navigate: (next: RouteState) => void;
  onJumpToSaga: (sagaId: string) => void;
}

const PAGE_STEP = 24;
const EN_DEITY_LOOKUP = new Map(EN_DEITIES.map((d) => [d.id, d]));

export const DeitiesPage: React.FC<DeitiesPageProps> = ({
  pantheonFocus,
  compareIds,
  favoriteIds,
  onToggleFavorite,
  onJumpCrossRealm,
  initialReaderDeityId,
  onClearInitialReader,
  onSetCompareIds,
  onToggleCompareDeity,
  navigate,
  onJumpToSaga,
}) => {
  const { locale, realm, ui, data, shortTraditionName } = useI18n();
  const isZh = locale === 'zh';
  const isBestiary = realm === 'bestiary';

  const [selectedArchetype, setSelectedArchetype] = useState<ArchetypeId | 'all'>('all');
  const [selectedTradition, setSelectedTradition] = useState<TraditionId | 'all'>('all');
  const [savedOnly, setSavedOnly] = useState(false);
  const [catalogQuery, setCatalogQuery] = useState('');
  const [catalogView, setCatalogView] = useState<'grid' | 'grouped'>('grid');
  const [visibleCount, setVisibleCount] = useState(PAGE_STEP);

  const [showAllPresets, setShowAllPresets] = useState(false);
  const [expandedMythRow, setExpandedMythRow] = useState(false);
  const [expandedInsightRow, setExpandedInsightRow] = useState(false);
  const [readerDeityId, setReaderDeityId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const activeReaderId =
    readerDeityId ??
    (initialReaderDeityId && data.deityById[initialReaderDeityId] ? initialReaderDeityId : null);

  const theadRef = useRef<HTMLTableSectionElement | null>(null);
  const tableWrapRef = useRef<HTMLElement | null>(null);
  const [showStickyCols, setShowStickyCols] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const thead = theadRef.current;
      const wrap = tableWrapRef.current;
      if (!thead || !wrap) {
        setShowStickyCols(false);
        return;
      }
      const headRect = thead.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      const siteHeader = document.querySelector('.atlas-header');
      const stickyThreshold = siteHeader ? siteHeader.getBoundingClientRect().bottom + 4 : 100;
      const headerCleared = headRect.bottom <= stickyThreshold;
      const tableStillVisible = wrapRect.bottom > stickyThreshold + 130;
      setShowStickyCols(headerCleared && tableStillVisible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const availableDeities = useMemo(
    () =>
      pantheonFocus === 'all'
        ? data.deities
        : data.deities.filter((d) => d.traditionId === pantheonFocus),
    [data.deities, pantheonFocus]
  );

  const handleCopyLink = async () => {
    const ok = await copyShareableUrl();
    if (ok) {
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const comparedDeities = useMemo(() => {
    const fromIds = compareIds
      .map((id) => data.deityById[id])
      .filter((d): d is NonNullable<typeof d> =>
        Boolean(d) && (pantheonFocus === 'all' || d.traditionId === pantheonFocus)
      );
    if (fromIds.length >= 2) return fromIds;
    return availableDeities.slice(0, Math.min(4, availableDeities.length));
  }, [availableDeities, compareIds, data.deityById, pantheonFocus]);

  const visiblePresets = useMemo(() => {
    const all = data.comparisonPresets;
    if (showAllPresets || all.length <= 4) return all;
    const topFour = all.slice(0, 4);
    const activeOutside = all.slice(4).find(
      (p) =>
        p.deityIds.length === compareIds.length &&
        p.deityIds.every((id) => compareIds.includes(id))
    );
    if (activeOutside) {
      return [...topFour.slice(0, 3), activeOutside];
    }
    return topFour;
  }, [compareIds, data.comparisonPresets, showAllPresets]);

  const dynamicSynthesis = useMemo(() => {
    if (comparedDeities.length < 2) {
      return ui.deities.selectTwoPrompt;
    }

    const matchingPreset = data.comparisonPresets.find(
      (p) =>
        p.deityIds.length === comparedDeities.length &&
        p.deityIds.every((id) => compareIds.includes(id))
    );
    if (matchingPreset) return matchingPreset.synthesisNote;

    const uniqueTraditions = new Set(
      comparedDeities.map((d) => compactTraditionName(data.traditionById[d.traditionId]?.name))
    );
    const uniqueArchetypes = new Set(
      comparedDeities.map((d) => data.archetypes.find((a) => a.id === d.archetypeId)?.label)
    );

    if (uniqueArchetypes.size === 1) {
      const archName = Array.from(uniqueArchetypes)[0] ?? '';
      const archMeta = data.archetypes.find((a) => a.id === comparedDeities[0].archetypeId);
      return ui.deities.sharedArchSynth(
        archName,
        uniqueTraditions.size,
        archMeta?.scholarlyNote ?? ''
      );
    }

    return ui.deities.multiArchSynth(
      comparedDeities.map((d) => d.name).join(' / '),
      Array.from(uniqueTraditions).join(' · '),
      uniqueArchetypes.size,
      Array.from(uniqueArchetypes).join(' · ')
    );
  }, [comparedDeities, compareIds, data, ui.deities]);

  const filteredCatalog = useMemo(() => {
    const q = catalogQuery.trim().toLowerCase();
    return availableDeities.filter((d) => {
      if (savedOnly && !favoriteIds.includes(d.id)) return false;
      const matchesArch =
        selectedArchetype === 'all' ||
        d.archetypeId === selectedArchetype ||
        d.secondaryArchetypeId === selectedArchetype;
      const matchesTrad =
        pantheonFocus !== 'all' ||
        selectedTradition === 'all' ||
        d.traditionId === selectedTradition;
      if (!matchesArch || !matchesTrad) return false;
      if (!q) return true;

      const enFallback = EN_DEITY_LOOKUP.get(d.id);
      return (
        d.name.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.epithet.toLowerCase().includes(q) ||
        d.originSummary.toLowerCase().includes(q) ||
        d.alternateNames.some((a) => a.toLowerCase().includes(q)) ||
        d.domains.some((dom) => dom.toLowerCase().includes(q)) ||
        d.symbols.some((sym) => sym.toLowerCase().includes(q)) ||
        Boolean(enFallback?.name.toLowerCase().includes(q))
      );
    });
  }, [
    availableDeities,
    catalogQuery,
    favoriteIds,
    pantheonFocus,
    savedOnly,
    selectedArchetype,
    selectedTradition,
  ]);

  const displayedCatalog = useMemo(
    () => (catalogView === 'grid' ? filteredCatalog.slice(0, visibleCount) : filteredCatalog),
    [catalogView, filteredCatalog, visibleCount]
  );

  const groupedCatalog = useMemo(() => {
    if (catalogView !== 'grouped') return [];
    return data.traditions
      .map((trad) => ({
        tradition: trad,
        items: filteredCatalog.filter((d) => d.traditionId === trad.id),
      }))
      .filter((g) => g.items.length > 0);
  }, [catalogView, data.traditions, filteredCatalog]);

  const readerDeity: Deity | null = activeReaderId ? (data.deityById[activeReaderId] ?? null) : null;

  const handleSlotSwap = (slotIndex: number, newDeityId: string) => {
    const next = comparedDeities.map((d) => d.id);
    const existingIdx = next.indexOf(newDeityId);
    if (existingIdx !== -1 && existingIdx !== slotIndex) {
      next[existingIdx] = next[slotIndex];
    }
    next[slotIndex] = newDeityId;
    onSetCompareIds(next);
  };

  const handleAddFourthSlot = () => {
    const activeIds = comparedDeities.map((d) => d.id);
    if (activeIds.length >= 4) return;
    const candidate = availableDeities.find((d) => !activeIds.includes(d.id));
    if (candidate) {
      onSetCompareIds([...activeIds, candidate.id]);
    }
  };

  const handleRemoveSlot = (idToRemove: string) => {
    const activeIds = comparedDeities.map((d) => d.id);
    if (activeIds.length <= 2) return;
    onSetCompareIds(activeIds.filter((id) => id !== idToRemove));
  };

  const copyLabels = {
    curatedPresets: isZh ? '精选主题对照预设' : 'CURATED MATCHUP PRESETS',
    showAllPresets: (total: number) =>
      isZh ? `展开全部 ${total} 组预设` : `Show all ${total} presets`,
    collapsePresets: isZh ? '收起预设' : 'Show fewer presets',
    readMore: isZh ? '展开全文' : 'Read more',
    readLess: isZh ? '收起长文' : 'Show less',
    openReader: isZh ? '阅读详传' : 'Quick Read',
    filterPlaceholder: isZh
      ? isBestiary
        ? '在异兽图鉴中即时筛选名称、异名、能力或特征……'
        : '在众神图鉴中即时筛选神名、别称、神职或圣物……'
      : isBestiary
        ? 'Filter creatures by name, power, anatomy, or alias...'
        : 'Filter deities by name, domain, symbol, or alias...',
    clearFilter: isZh ? '清空筛选' : 'Clear filter',
    viewPaged: isZh ? '卡片网格' : 'Paged Grid',
    viewGrouped: isZh ? '按传统分组' : 'By Tradition',
    showingCount: (shown: number, total: number) =>
      isZh ? `当前显示 ${shown} / 共 ${total} 项` : `Showing ${shown} of ${total}`,
    loadMore: (step: number) => (isZh ? `再加载 ${step} 项` : `Load ${step} More`),
    showAllBtn: (total: number) => (isZh ? `一次显示全部（${total}）` : `Show All (${total})`),
    originPrefix: isZh ? '起源：' : 'Origin:',
    kinPrefix: isZh ? '谱系与亲缘：' : 'Kin & Lineage:',
    printSheet: isZh ? '打印 / PDF' : 'Print / PDF',
    savedFilter: (n: number) => (isZh ? `已收藏 (${n})` : `Saved (${n})`),
    saveAria: isZh ? '收藏到个人典籍' : 'Save to My Codex',
    emptySaved: isZh
      ? '尚未收藏任何条目，点击卡片右上角星标或阅读窗中的“收藏”按钮即可加入个人典籍。'
      : 'No saved entries yet. Click the star on any card or inside Quick Read to build your personal codex.',
  };

  const renderCatalogCard = (deity: Deity) => {
    const trad = data.traditionById[deity.traditionId];
    const arch = data.archetypes.find((a) => a.id === deity.archetypeId);
    const isSelected = compareIds.includes(deity.id);
    const isFavorite = favoriteIds.includes(deity.id);

    return (
      <article key={deity.id} className="visual-card">
        <div
          className="visual-card-media portrait clickable-media"
          role="button"
          tabIndex={0}
          onClick={() => setReaderDeityId(deity.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setReaderDeityId(deity.id);
            }
          }}
          aria-label={`${copyLabels.openReader}: ${deity.name}`}
        >
          <img
            src={getDeityPortrait(deity.id)}
            alt={`${deity.name} — ${deity.epithet}`}
            className="visual-card-img"
            loading="lazy"
          />
          <span className="media-badge-overlay">{compactTraditionName(trad?.name)}</span>
          <button
            id={`catalog-fav-${deity.id}`}
            type="button"
            className={isFavorite ? 'media-fav-btn active' : 'media-fav-btn'}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(deity.id);
            }}
            aria-label={`${copyLabels.saveAria}: ${deity.name}`}
            aria-pressed={isFavorite}
            title={copyLabels.saveAria}
          >
            <Star size={14} className={isFavorite ? 'star-filled' : undefined} />
          </button>
          <div className="media-medallion-badge">
            <ArchetypeMedallion archetypeId={deity.archetypeId} size={34} />
          </div>
        </div>

        <div className="visual-card-content">
          <div className="visual-card-header-row">
            <h3 title={deity.name}>
              <button
                type="button"
                className="card-title-link-btn"
                onClick={() => setReaderDeityId(deity.id)}
              >
                {deity.name}
              </button>
            </h3>
            <span className="tag-pill rubric card-pill-nowrap">{arch?.shortLabel}</span>
          </div>

          <p className="visual-card-hook visual-card-hook-clamped" title={deity.epithet}>
            {deity.epithet}
          </p>

          <div className="row-wrap visual-card-tags">
            {deity.domains.slice(0, 3).map((d) => (
              <span key={d} className="tag-pill">
                {d}
              </span>
            ))}
          </div>

          <div className="folio-card-footer">
            <div className="row-wrap">
              <button
                id={`catalog-read-${deity.id}`}
                type="button"
                className="btn-ghost"
                onClick={() => setReaderDeityId(deity.id)}
              >
                <BookOpen size={13} />
                <span>{copyLabels.openReader}</span>
              </button>

              {data.sagaByDeityId[deity.id] && (
                <button
                  id={`catalog-quest-${deity.id}`}
                  type="button"
                  className="btn-ghost"
                  onClick={() => onJumpToSaga(data.sagaByDeityId[deity.id].id)}
                >
                  <Gamepad2 size={13} />
                  <span>{ui.deities.playDndQuest}</span>
                </button>
              )}
            </div>

            <button
              id={`catalog-toggle-${deity.id}`}
              type="button"
              className={isSelected ? 'btn-ghost selected' : 'btn-secondary'}
              onClick={() => onToggleCompareDeity(deity.id)}
            >
              {isSelected ? <Check size={14} /> : <Plus size={14} />}
              <span>{isSelected ? ui.deities.inMatrix : ui.deities.compareBtn}</span>
            </button>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div>
      <header className="page-masthead">
        <div className="page-masthead-copy">
          <span className="folio-kicker">{ui.deities.kicker}</span>
          <h1>{ui.deities.heading}</h1>
          <p className="page-lead">{ui.deities.lead(data.deities.length)}</p>
        </div>

        <div className="row-wrap">
          <button
            id="share-comparison-btn"
            type="button"
            className="btn-secondary"
            onClick={handleCopyLink}
          >
            {copiedLink ? <Check size={15} /> : <Share2 size={15} />}
            <span>{copiedLink ? ui.deities.copiedLink : ui.deities.shareMatchup}</span>
          </button>

          <button
            id="print-comparison-btn"
            type="button"
            className="btn-ghost"
            onClick={() => window.print()}
          >
            <Printer size={15} />
            <span>{copyLabels.printSheet}</span>
          </button>

          {compareIds.length < 4 && (
            <button
              id="add-compare-slot-btn"
              type="button"
              className="btn-secondary"
              onClick={handleAddFourthSlot}
            >
              <Plus size={15} />
              <span>{ui.deities.addColumn(compareIds.length)}</span>
            </button>
          )}
        </div>
      </header>

      {pantheonFocus === 'all' && (
        <section className="preset-section" aria-label="Curated Comparison Sets">
          <div className="preset-header-bar">
            <span className="folio-kicker">{copyLabels.curatedPresets}</span>
            {data.comparisonPresets.length > 4 && (
              <button
                id="toggle-all-presets-btn"
                type="button"
                className="btn-ghost"
                onClick={() => setShowAllPresets((prev) => !prev)}
                aria-expanded={showAllPresets}
              >
                <span>
                  {showAllPresets
                    ? copyLabels.collapsePresets
                    : copyLabels.showAllPresets(data.comparisonPresets.length)}
                </span>
                {showAllPresets ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            )}
          </div>

          <div className="preset-strip preset-strip-4">
            {visiblePresets.map((preset) => {
              const isActive =
                preset.deityIds.length === compareIds.length &&
                preset.deityIds.every((id) => compareIds.includes(id));
              return (
                <button
                  key={preset.id}
                  id={`comparator-preset-${preset.id}`}
                  type="button"
                  className={isActive ? 'preset-card-btn active' : 'preset-card-btn'}
                  onClick={() => onSetCompareIds(preset.deityIds)}
                >
                  <strong>{preset.title}</strong>
                  <span>{preset.subtitle}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <section className="comparator-overview-grid" aria-label="Visual Domain Radar and Synthesis">
        <DeityComparisonRadar deities={comparedDeities} />

        <div className="synthesis-banner">
          <div className="row-wrap">
            <Sparkles size={16} />
            <span className="folio-kicker">{ui.deities.synthesisKicker}</span>
          </div>
          <p className="mt-sm">{dynamicSynthesis}</p>

          <div className="row-wrap mt-md">
            {comparedDeities.map((d) => {
              const trad = data.traditionById[d.traditionId];
              return (
                <button
                  key={d.id}
                  id={`synth-trad-${d.id}`}
                  type="button"
                  className="btn-ghost"
                  onClick={() => setReaderDeityId(d.id)}
                >
                  <img
                    src={getDeityPortrait(d.id)}
                    alt={d.name}
                    className="search-deity-avatar"
                  />
                  <span>
                    {d.name} · {compactTraditionName(trad?.name)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section
        ref={tableWrapRef}
        className="compare-table-section"
        aria-label="Side-by-Side Deity Comparison Table"
      >
        {/* Pinned Sticky Mini-Header Bar When Scrolling Long Matrix Rows */}
        <div className="compare-sticky-anchor">
          {showStickyCols && (
            <div
              className={`compare-sticky-bar cols-${comparedDeities.length}`}
              role="region"
              aria-label={ui.deities.heading}
            >
              <div className="compare-sticky-label">{ui.deities.axisCol}</div>
              {comparedDeities.map((deity) => (
                <button
                  key={deity.id}
                  type="button"
                  className="compare-sticky-item"
                  onClick={() => setReaderDeityId(deity.id)}
                  title={`${copyLabels.openReader}: ${deity.name}`}
                >
                  <img
                    src={getDeityPortrait(deity.id)}
                    alt=""
                    className="compare-sticky-avatar"
                  />
                  <div className="compare-sticky-text">
                    <strong>{deity.name}</strong>
                    <span>{shortTraditionName(deity.traditionId)}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead ref={theadRef}>
              <tr>
                <th className="compare-row-label">{ui.deities.axisCol}</th>
                {comparedDeities.map((deity, idx) => {
                  const trad = data.traditionById[deity.traditionId];
                  const compactTrad = compactTraditionName(trad?.name);
                  return (
                    <th key={deity.id} className="compare-col-header">
                      <div className="compare-header-stack">
                        <button
                          type="button"
                          className="compare-portrait-btn"
                          onClick={() => setReaderDeityId(deity.id)}
                          title={`${copyLabels.openReader}: ${deity.name}`}
                        >
                          <img
                            src={getDeityPortrait(deity.id)}
                            alt={`${deity.name} — ${deity.epithet}`}
                            className="compare-portrait-thumb"
                          />
                          <span className="compare-portrait-read-pill">
                            <BookOpen size={12} />
                            <span>{copyLabels.openReader}</span>
                          </span>
                        </button>

                        <div className="compare-kicker-row">
                          <span className="folio-kicker compare-kicker-label" title={trad?.name}>
                            {compactTrad}
                          </span>
                          {comparedDeities.length > 2 && (
                            <button
                              id={`remove-slot-${deity.id}`}
                              type="button"
                              className="btn-ghost compare-remove-btn"
                              onClick={() => handleRemoveSlot(deity.id)}
                              aria-label={deity.name}
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>

                        <div className="compare-title-row">
                          <ArchetypeMedallion archetypeId={deity.archetypeId} size={34} />
                          <h2 className="compare-deity-title" title={deity.name}>
                            <button
                              type="button"
                              className="card-title-link-btn"
                              onClick={() => setReaderDeityId(deity.id)}
                            >
                              {deity.name}
                            </button>
                          </h2>
                        </div>

                        <p className="compare-epithet" title={deity.epithet}>
                          {deity.epithet}
                        </p>

                        <label className="sr-only" htmlFor={`slot-select-${idx}`}>
                          {deity.name}
                        </label>
                        <select
                          id={`slot-select-${idx}`}
                          className="slot-select"
                          value={deity.id}
                          onChange={(e) => handleSlotSwap(idx, e.target.value)}
                        >
                          {(pantheonFocus === 'all'
                            ? data.traditions
                            : data.traditions.filter((t) => t.id === pantheonFocus)
                          ).map((t) => (
                            <optgroup key={t.id} label={compactTraditionName(t.name)}>
                              {data.deities
                                .filter((d) => d.traditionId === t.id)
                                .map((d) => (
                                  <option key={d.id} value={d.id}>
                                    {d.name} · {shortTraditionName(t.id)}
                                  </option>
                                ))}
                            </optgroup>
                          ))}
                        </select>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              <tr>
                <th className="compare-row-label">{ui.deities.rowArchetype}</th>
                {comparedDeities.map((deity) => {
                  const primary = data.archetypes.find((a) => a.id === deity.archetypeId);
                  const secondary = data.archetypes.find(
                    (a) => a.id === deity.secondaryArchetypeId
                  );
                  return (
                    <td key={deity.id}>
                      <div className="row-wrap">
                        <span className="tag-pill rubric">{primary?.shortLabel}</span>
                        {secondary && <span className="tag-pill">{secondary.shortLabel}</span>}
                      </div>
                    </td>
                  );
                })}
              </tr>

              <tr>
                <th className="compare-row-label">{ui.deities.rowDomains}</th>
                {comparedDeities.map((deity) => (
                  <td key={deity.id}>
                    <div className="row-wrap">
                      {deity.domains.map((dom) => (
                        <span key={dom} className="tag-pill ochre">
                          {dom}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* #6: Scannable Bullet List for Symbols + Distinct Chips for Sacred Animals */}
              <tr>
                <th className="compare-row-label">{ui.deities.rowSymbols}</th>
                {comparedDeities.map((deity) => (
                  <td key={deity.id}>
                    <ul className="compare-bullet-list">
                      {deity.symbols.map((sym) => (
                        <li key={sym}>{sym}</li>
                      ))}
                    </ul>
                    {deity.sacredAnimals.length > 0 && (
                      <div className="compare-subblock">
                        <span className="compare-sublabel">{ui.deities.sacredAnimalsPrefix}</span>
                        <div className="row-wrap mt-xs">
                          {deity.sacredAnimals.map((anim) => (
                            <span key={anim} className="tag-pill">
                              {anim}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* #6: Structured Dwelling & Lineage Subblocks */}
              <tr>
                <th className="compare-row-label">{ui.deities.rowDwelling}</th>
                {comparedDeities.map((deity) => (
                  <td key={deity.id}>
                    <strong className="compare-field-lead">{deity.dwelling}</strong>
                    <div className="compare-subblock">
                      <span className="compare-sublabel">{copyLabels.kinPrefix}</span>
                      <p className="text-muted mt-xs">{deity.consortOrKin}</p>
                    </div>
                  </td>
                ))}
              </tr>

              {/* #2: Collapsible Long Myths + One-Click Quick-Read Drawer */}
              <tr>
                <th className="compare-row-label">{ui.deities.rowMyth}</th>
                {comparedDeities.map((deity) => (
                  <td key={deity.id}>
                    <strong className="compare-field-lead">{deity.signatureMythTitle}</strong>
                    {expandedMythRow && (
                      <p className="text-muted mt-xs">
                        <strong>{copyLabels.originPrefix}</strong> {deity.originSummary}
                      </p>
                    )}
                    <p
                      className={
                        expandedMythRow
                          ? 'mt-sm'
                          : 'mt-sm compare-prose-clamped'
                      }
                    >
                      {deity.signatureMyth}
                    </p>
                    <div className="compare-cell-actions">
                      <button
                        type="button"
                        className="inline-expand-btn"
                        onClick={() => setExpandedMythRow((prev) => !prev)}
                      >
                        <span>
                          {expandedMythRow ? copyLabels.readLess : copyLabels.readMore}
                        </span>
                        {expandedMythRow ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>
                      <button
                        type="button"
                        className="inline-expand-btn accent"
                        onClick={() => setReaderDeityId(deity.id)}
                      >
                        <BookOpen size={12} />
                        <span>{copyLabels.openReader}</span>
                      </button>
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <th className="compare-row-label">{ui.deities.rowInsight}</th>
                {comparedDeities.map((deity) => (
                  <td key={deity.id}>
                    <p className={expandedInsightRow ? '' : 'compare-prose-clamped-3'}>
                      {deity.comparativeInsight}
                    </p>
                    <button
                      type="button"
                      className="inline-expand-btn mt-xs"
                      onClick={() => setExpandedInsightRow((prev) => !prev)}
                    >
                      <span>
                        {expandedInsightRow ? copyLabels.readLess : copyLabels.readMore}
                      </span>
                      {expandedInsightRow ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>
                  </td>
                ))}
              </tr>

              <tr>
                <th className="compare-row-label">{ui.deities.rowCounterparts}</th>
                {comparedDeities.map((deity) => (
                  <td key={deity.id}>
                    <div className="row-wrap">
                      {deity.counterpartIds.map((cid) => {
                        const peer = data.deityById[cid];
                        if (!peer) return null;
                        const inTray = compareIds.includes(peer.id);
                        return (
                          <button
                            key={cid}
                            id={`matrix-peer-${deity.id}-${cid}`}
                            type="button"
                            className={inTray ? 'btn-ghost selected' : 'btn-ghost'}
                            onClick={() => onToggleCompareDeity(peer.id)}
                          >
                            {inTray ? <Check size={12} /> : <Plus size={12} />}
                            <span>{peer.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* #4: Inline Quick-Filter Search + Paginated / Grouped Catalog */}
      <section aria-labelledby="deity-catalog-heading">
        <div className="section-heading-row">
          <div>
            <span className="folio-kicker">{ui.deities.catalogKicker}</span>
            <h2 id="deity-catalog-heading">{ui.deities.browseAll(filteredCatalog.length)}</h2>
          </div>

          <div className="catalog-toolbar-right">
            <div className="catalog-inline-search">
              <Search size={15} />
              <input
                id="catalog-inline-filter-input"
                type="search"
                value={catalogQuery}
                onChange={(e) => {
                  setCatalogQuery(e.target.value);
                  setVisibleCount(PAGE_STEP);
                }}
                placeholder={copyLabels.filterPlaceholder}
                aria-label={copyLabels.filterPlaceholder}
              />
              {catalogQuery && (
                <button
                  type="button"
                  className="catalog-search-clear"
                  onClick={() => {
                    setCatalogQuery('');
                    setVisibleCount(PAGE_STEP);
                  }}
                  aria-label={copyLabels.clearFilter}
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <button
              id="catalog-saved-only-btn"
              type="button"
              aria-pressed={savedOnly}
              className={savedOnly ? 'chip-btn active' : 'chip-btn'}
              onClick={() => {
                setSavedOnly((prev) => !prev);
                setVisibleCount(PAGE_STEP);
              }}
            >
              <Star size={14} className={savedOnly ? 'star-filled' : undefined} />
              <span>{copyLabels.savedFilter(favoriteIds.length)}</span>
            </button>

            {pantheonFocus === 'all' && (
              <div className="lang-toggle-group" role="group" aria-label="Catalog layout mode">
                <button
                  id="catalog-view-grid-btn"
                  type="button"
                  aria-pressed={catalogView === 'grid'}
                  className={catalogView === 'grid' ? 'lang-toggle-btn active' : 'lang-toggle-btn'}
                  onClick={() => setCatalogView('grid')}
                >
                  <LayoutGrid size={13} /> {copyLabels.viewPaged}
                </button>
                <button
                  id="catalog-view-grouped-btn"
                  type="button"
                  aria-pressed={catalogView === 'grouped'}
                  className={
                    catalogView === 'grouped' ? 'lang-toggle-btn active' : 'lang-toggle-btn'
                  }
                  onClick={() => setCatalogView('grouped')}
                >
                  <Layers size={13} /> {copyLabels.viewGrouped}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="filter-bar" role="group" aria-label={ui.deities.rowArchetype}>
          <button
            id="arch-filter-all"
            type="button"
            className={selectedArchetype === 'all' ? 'chip-btn active' : 'chip-btn'}
            onClick={() => {
              setSelectedArchetype('all');
              setVisibleCount(PAGE_STEP);
            }}
          >
            {ui.deities.allArchetypes}
          </button>
          {data.archetypes.map((arch) => (
            <button
              key={arch.id}
              id={`arch-filter-${arch.id}`}
              type="button"
              className={selectedArchetype === arch.id ? 'chip-btn active' : 'chip-btn'}
              onClick={() => {
                setSelectedArchetype(arch.id);
                setVisibleCount(PAGE_STEP);
              }}
            >
              {arch.shortLabel}
            </button>
          ))}
        </div>

        {pantheonFocus === 'all' && (
          <div className="filter-bar" role="group" aria-label={ui.deities.all10Pantheons}>
            <button
              id="deity-trad-all"
              type="button"
              className={selectedTradition === 'all' ? 'chip-btn active' : 'chip-btn'}
              onClick={() => {
                setSelectedTradition('all');
                setVisibleCount(PAGE_STEP);
              }}
            >
              {ui.deities.all10Pantheons}
            </button>
            {data.traditions.map((trad) => (
              <button
                key={trad.id}
                id={`deity-trad-${trad.id}`}
                type="button"
                className={selectedTradition === trad.id ? 'chip-btn active' : 'chip-btn'}
                onClick={() => {
                  setSelectedTradition(trad.id);
                  setVisibleCount(PAGE_STEP);
                }}
              >
                {compactTraditionName(trad.name)}
              </button>
            ))}
          </div>
        )}

        {filteredCatalog.length === 0 ? (
          <div className="synthesis-banner">
            <p className="text-muted">
              {savedOnly ? copyLabels.emptySaved : ui.search.noResults(catalogQuery)}
            </p>
          </div>
        ) : catalogView === 'grouped' && pantheonFocus === 'all' ? (
          <div className="catalog-groups-stack">
            {groupedCatalog.map(({ tradition, items }) => (
              <section key={tradition.id} className="catalog-trad-group">
                <div className="section-heading-row catalog-group-header">
                  <div>
                    <span className="folio-kicker">{tradition.folioCode}</span>
                    <h3>
                      {compactTraditionName(tradition.name)}{' '}
                      <span className="mono-meta">({items.length})</span>
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() =>
                      navigate({ page: 'traditions', traditionSlug: tradition.id })
                    }
                  >
                    <span>{ui.traditions.openMonograph}</span>
                  </button>
                </div>
                <div className="folio-grid-3">{items.map(renderCatalogCard)}</div>
              </section>
            ))}
          </div>
        ) : (
          <>
            <div className="folio-grid-3">{displayedCatalog.map(renderCatalogCard)}</div>

            {filteredCatalog.length > PAGE_STEP && (
              <div className="catalog-pagination-bar">
                <span className="mono-meta">
                  {copyLabels.showingCount(displayedCatalog.length, filteredCatalog.length)}
                </span>
                {displayedCatalog.length < filteredCatalog.length && (
                  <div className="row-wrap">
                    <button
                      id="catalog-load-more-btn"
                      type="button"
                      className="btn-primary"
                      onClick={() => setVisibleCount((prev) => prev + PAGE_STEP)}
                    >
                      <Plus size={15} />
                      <span>
                        {copyLabels.loadMore(
                          Math.min(PAGE_STEP, filteredCatalog.length - displayedCatalog.length)
                        )}
                      </span>
                    </button>
                    <button
                      id="catalog-show-all-btn"
                      type="button"
                      className="btn-secondary"
                      onClick={() => setVisibleCount(filteredCatalog.length)}
                    >
                      <span>{copyLabels.showAllBtn(filteredCatalog.length)}</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </section>

      {/* #2: Spacious 65ch Single-Column Reader Drawer */}
      <DeityReaderDrawer
        deity={readerDeity}
        roster={filteredCatalog.length > 0 ? filteredCatalog : availableDeities}
        compareIds={compareIds}
        favoriteIds={favoriteIds}
        onToggleFavorite={onToggleFavorite}
        onJumpCrossRealm={onJumpCrossRealm}
        onClose={() => {
          setReaderDeityId(null);
          onClearInitialReader?.();
        }}
        onSelectDeity={(id) => {
          setReaderDeityId(id);
          onClearInitialReader?.();
        }}
        onToggleCompareDeity={onToggleCompareDeity}
        navigate={navigate}
        onJumpToSaga={onJumpToSaga}
      />
    </div>
  );
};

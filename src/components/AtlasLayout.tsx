import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUp,
  BookOpen,
  Compass,
  Crown,
  Filter,
  Flame,
  Gamepad2,
  GitBranch,
  GraduationCap,
  Layers,
  Moon,
  Network,
  Scale,
  ScrollText,
  Search,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';
import { ASCENSION_SAGAS as EN_SAGAS } from '../data/ascensionGame';
import { CANONICAL_BOOKS as EN_BOOKS } from '../data/books';
import { INSPIRATION_TIMELINE as EN_INFLUENCES } from '../data/connections';
import { DEITIES as EN_DEITIES } from '../data/deities';
import { MYTH_MOTIFS as EN_MOTIFS } from '../data/motifs';
import { TRADITIONS as EN_TRADITIONS } from '../data/traditions';
import { getBrandEmblem, getDeityPortrait } from '../data/visuals';
import { ENGLISH_DATA, buildChineseData, useI18n } from '../i18n/I18nContext';
import { compactTraditionName } from '../i18n/uiStrings';
import type { Deity, PageId, RouteState } from '../types/mythology';
import type { PantheonFocus, RealmMode, ThemeMode } from '../utils/storage';

interface AtlasLayoutProps {
  route: RouteState;
  navigate: (next: RouteState) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  pantheonFocus: PantheonFocus;
  onChangePantheonFocus: (next: PantheonFocus) => void;
  compareIds: string[];
  onJumpToCompareDeity: (deityId: string) => void;
  onJumpCrossRealm: (targetRealm: RealmMode, targetDeityId: string) => void;
  onJumpToMotif: (motifId: string) => void;
  onJumpToBook: (bookId: string) => void;
  onJumpToSaga: (sagaId: string) => void;
  children: React.ReactNode;
}

const EN_TRAD_MAP = new Map(EN_TRADITIONS.map((t) => [t.id, t]));
const EN_DEITY_MAP = new Map(EN_DEITIES.map((d) => [d.id, d]));
const EN_MOTIF_MAP = new Map(EN_MOTIFS.map((m) => [m.id, m]));
const EN_BOOK_MAP = new Map(EN_BOOKS.map((b) => [b.id, b]));
const EN_SAGA_MAP = new Map(EN_SAGAS.map((s) => [s.id, s]));
const EN_INFL_MAP = new Map(EN_INFLUENCES.map((e) => [e.id, e]));

export const AtlasLayout: React.FC<AtlasLayoutProps> = ({
  route,
  navigate,
  theme,
  onToggleTheme,
  pantheonFocus,
  onChangePantheonFocus,
  compareIds,
  onJumpToCompareDeity,
  onJumpCrossRealm,
  onJumpToMotif,
  onJumpToBook,
  onJumpToSaga,
  children,
}) => {
  const { locale, setLocale, realm, setRealm, ui, data, shortTraditionName } = useI18n();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [loadedCrossRealmPool, setLoadedCrossRealmPool] = useState<{
    key: string;
    realm: RealmMode;
    items: Deity[];
    enById: Record<string, Deity>;
  } | null>(null);

  const otherRealm: RealmMode = realm === 'bestiary' ? 'pantheons' : 'bestiary';
  const expectedPoolKey = `${otherRealm}-${locale}`;

  useEffect(() => {
    if (!searchOpen) return;
    if (otherRealm === 'pantheons' && locale === 'en') return;
    if (loadedCrossRealmPool?.key === expectedPoolKey) return;

    let cancelled = false;
    if (otherRealm === 'bestiary') {
      import('../bestiary/index').then((mod) => {
        if (cancelled) return;
        const localized = mod.buildBestiaryData(locale);
        const enRef = mod.buildBestiaryData('en');
        setLoadedCrossRealmPool({
          key: expectedPoolKey,
          realm: 'bestiary',
          items: localized.deities,
          enById: enRef.deityById,
        });
      });
    } else if (locale === 'zh') {
      import('../i18n/zh/index').then((zhMod) => {
        if (cancelled) return;
        const zhPantheon = buildChineseData(zhMod);
        setLoadedCrossRealmPool({
          key: expectedPoolKey,
          realm: 'pantheons',
          items: zhPantheon.deities,
          enById: ENGLISH_DATA.deityById,
        });
      });
    }

    return () => {
      cancelled = true;
    };
  }, [expectedPoolKey, loadedCrossRealmPool?.key, locale, otherRealm, searchOpen]);

  const crossRealmPool = useMemo(() => {
    if (otherRealm === 'pantheons' && locale === 'en') {
      return {
        key: expectedPoolKey,
        realm: 'pantheons' as RealmMode,
        items: ENGLISH_DATA.deities,
        enById: ENGLISH_DATA.deityById,
      };
    }
    return loadedCrossRealmPool?.key === expectedPoolKey ? loadedCrossRealmPool : null;
  }, [expectedPoolKey, loadedCrossRealmPool, locale, otherRealm]);

  const directToolLinks: { page: PageId; label: string; icon: React.ReactNode }[] = [
    { page: 'atlas', label: ui.nav.worldAtlas, icon: <Compass size={14} /> },
    { page: 'lineages', label: ui.nav.familyTrees, icon: <GitBranch size={14} /> },
    { page: 'texts', label: ui.nav.sacredTexts, icon: <ScrollText size={14} /> },
    { page: 'motifs', label: ui.nav.parallelMotifs, icon: <Layers size={14} /> },
    { page: 'connections', label: ui.nav.rootsAndInfluence, icon: <Network size={14} /> },
  ];

  const focusedTrad = pantheonFocus !== 'all' ? data.traditionById[pantheonFocus] : undefined;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 700);
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase().slice(0, 80);
    const scopedTrads =
      pantheonFocus === 'all'
        ? data.traditions
        : data.traditions.filter((t) => t.id === pantheonFocus);
    const scopedDeities =
      pantheonFocus === 'all'
        ? data.deities
        : data.deities.filter((d) => d.traditionId === pantheonFocus);
    const scopedMotifs =
      pantheonFocus === 'all'
        ? data.mythMotifs
        : data.mythMotifs.filter((m) => m.retellings.some((r) => r.traditionId === pantheonFocus));
    const scopedBooks =
      pantheonFocus === 'all'
        ? data.canonicalBooks
        : data.canonicalBooks.filter((b) => b.traditionId === pantheonFocus);
    const scopedSagas =
      pantheonFocus === 'all'
        ? data.ascensionSagas
        : data.ascensionSagas.filter((s) => s.traditionId === pantheonFocus);
    const scopedInfluences =
      pantheonFocus === 'all'
        ? data.inspirationTimeline
        : data.inspirationTimeline.filter(
            (ev) =>
              ev.fromTradition === pantheonFocus ||
              ev.toTradition === pantheonFocus ||
              (ev.id === 'insp-pie-dispersal' &&
                ['hindu', 'greek', 'celtic', 'norse'].includes(pantheonFocus))
          );

    if (!normalized) {
        return {
        traditions: scopedTrads.slice(0, 3),
        deities: scopedDeities.slice(0, 5),
        otherRealmMatches: [] as Deity[],
        motifs: scopedMotifs.slice(0, 3),
        books: scopedBooks.slice(0, 3),
        sagas: scopedSagas.slice(0, 3),
        influences: scopedInfluences.slice(0, 2),
      };
    }

    const traditions = scopedTrads
      .filter((t) => {
        const en = EN_TRAD_MAP.get(t.id);
        return (
          t.name.toLowerCase().includes(normalized) ||
          t.region.toLowerCase().includes(normalized) ||
          t.summary.toLowerCase().includes(normalized) ||
          Boolean(en?.name.toLowerCase().includes(normalized)) ||
          Boolean(en?.region.toLowerCase().includes(normalized))
        );
      })
      .slice(0, 5);

    const deities = scopedDeities
      .filter((d) => {
        const en = EN_DEITY_MAP.get(d.id);
        return (
          d.id.toLowerCase().includes(normalized) ||
          d.name.toLowerCase().includes(normalized) ||
          d.epithet.toLowerCase().includes(normalized) ||
          d.originSummary.toLowerCase().includes(normalized) ||
          d.alternateNames.some((a) => a.toLowerCase().includes(normalized)) ||
          d.domains.some((dom) => dom.toLowerCase().includes(normalized)) ||
          d.symbols.some((sym) => sym.toLowerCase().includes(normalized)) ||
          Boolean(en?.name.toLowerCase().includes(normalized)) ||
          Boolean(en?.alternateNames.some((a) => a.toLowerCase().includes(normalized)))
        );
      })
      .slice(0, 8);

    const motifs = scopedMotifs
      .filter((m) => {
        const en = EN_MOTIF_MAP.get(m.id);
        return (
          m.id.toLowerCase().includes(normalized) ||
          m.title.toLowerCase().includes(normalized) ||
          m.comparativeThesis.toLowerCase().includes(normalized) ||
          m.retellings.some(
            (r) =>
              (pantheonFocus === 'all' || r.traditionId === pantheonFocus) &&
              r.title.toLowerCase().includes(normalized)
          ) ||
          Boolean(en?.title.toLowerCase().includes(normalized))
        );
      })
      .slice(0, 4);

    const books = scopedBooks
      .filter((b) => {
        const en = EN_BOOK_MAP.get(b.id);
        return (
          b.id.toLowerCase().includes(normalized) ||
          b.title.toLowerCase().includes(normalized) ||
          b.nativeTitle.toLowerCase().includes(normalized) ||
          b.authorOrCompiler.toLowerCase().includes(normalized) ||
          b.keyMythsIncluded.some((km) => km.toLowerCase().includes(normalized)) ||
          Boolean(en?.title.toLowerCase().includes(normalized))
        );
      })
      .slice(0, 5);

    const gameKeywords = [
      'game',
      'd&d',
      'dnd',
      'd20',
      'apotheosis',
      'quest',
      'campaign',
      'monster',
      'hunt',
      'dragon',
      '游戏',
      '封神',
      '战役',
      '冒险',
      '异兽',
      '讨伐',
    ];
    const sagas = scopedSagas.filter((s) => {
      const en = EN_SAGA_MAP.get(s.id);
      return (
        gameKeywords.some((kw) => kw.includes(normalized) || normalized.includes(kw)) ||
        s.id.toLowerCase().includes(normalized) ||
        s.ascendedTitle.toLowerCase().includes(normalized) ||
        s.mortalOrOriginName.toLowerCase().includes(normalized) ||
        s.dndClass.toLowerCase().includes(normalized) ||
        Boolean(en?.ascendedTitle.toLowerCase().includes(normalized))
      );
    });

    const influenceKeywords = [
      'similarity',
      'influence',
      'inspire',
      'root',
      'pie',
      'indo-european',
      'timeline',
      'syncretism',
      '相似',
      '同源',
      '母源',
      '印欧',
      '时间线',
      '传承',
      '启发',
    ];
    const influences = scopedInfluences
      .filter((ev) => {
        const en = EN_INFL_MAP.get(ev.id);
        return (
          influenceKeywords.some((kw) => kw.includes(normalized) || normalized.includes(kw)) ||
          ev.headline.toLowerCase().includes(normalized) ||
          ev.fromLabel.toLowerCase().includes(normalized) ||
          ev.toLabel.toLowerCase().includes(normalized) ||
          ev.scholarlySummary.toLowerCase().includes(normalized) ||
          Boolean(en?.headline.toLowerCase().includes(normalized))
        );
      })
      .slice(0, 4);

    const otherRealmMatches: Deity[] =
      normalized && crossRealmPool
        ? crossRealmPool.items
            .filter((d) => {
              if (pantheonFocus !== 'all' && d.traditionId !== pantheonFocus) return false;
              const en = crossRealmPool.enById[d.id];
              return (
                d.id.toLowerCase().includes(normalized) ||
                d.name.toLowerCase().includes(normalized) ||
                d.epithet.toLowerCase().includes(normalized) ||
                d.alternateNames.some((a) => a.toLowerCase().includes(normalized)) ||
                d.domains.some((dom) => dom.toLowerCase().includes(normalized)) ||
                d.symbols.some((sym) => sym.toLowerCase().includes(normalized)) ||
                Boolean(en?.name.toLowerCase().includes(normalized)) ||
                Boolean(en?.epithet.toLowerCase().includes(normalized))
              );
            })
            .slice(0, 6)
        : [];

    return { traditions, deities, otherRealmMatches, motifs, books, sagas, influences };
  }, [crossRealmPool, data, query, pantheonFocus]);

  return (
    <div className="atlas-shell">
      {/* Top Masthead Utility Bar (Brand + Mode/Language/Search/Theme — scrolls away cleanly) */}
      <div className="atlas-topbar">
        <div className="atlas-topbar-inner">
          <button
            id="brand-home-btn"
            type="button"
            className="brand-lockup"
            onClick={() => navigate({ page: 'home' })}
          >
            <img
              src={getBrandEmblem(realm)}
              alt={ui.brand.emblemAlt}
              className="brand-emblem"
            />
            <span>
              <span className="brand-title">{ui.brand.title}</span>
              <span className="brand-subtitle">
                {focusedTrad
                  ? ui.brand.subtitleFocused(focusedTrad.name)
                  : ui.brand.subtitleAll}
              </span>
            </span>
          </button>

          <div className="header-actions">
            {/* REALM MODE SWITCHER: GODS & PANTHEONS <-> MONSTERS & BESTIARY */}
            <div
              className={
                realm === 'bestiary' ? 'realm-toggle-group bestiary-active' : 'realm-toggle-group'
              }
              role="group"
              aria-label={
                locale === 'zh' ? '在众神谱系与神话异兽之间切换' : 'Switch between Gods and Monsters'
              }
            >
              <button
                id="realm-toggle-pantheons"
                type="button"
                aria-pressed={realm === 'pantheons'}
                className={
                  realm === 'pantheons' ? 'realm-toggle-btn active-gods' : 'realm-toggle-btn'
                }
                onClick={() => setRealm('pantheons')}
                title={
                  locale === 'zh'
                    ? '众神万神殿模式（诸神、神话与封神之路）'
                    : 'Gods & Pantheons Mode'
                }
              >
                <Crown size={13} />
                <span>{locale === 'zh' ? '众神' : 'Gods'}</span>
              </button>
              <button
                id="realm-toggle-bestiary"
                type="button"
                aria-pressed={realm === 'bestiary'}
                className={
                  realm === 'bestiary' ? 'realm-toggle-btn active-monsters' : 'realm-toggle-btn'
                }
                onClick={() => setRealm('bestiary')}
                title={
                  locale === 'zh'
                    ? '神话异兽志模式（怪物、巨龙、瑞兽与猎魔奇谭）'
                    : 'Monsters & Mythological Creatures Mode'
                }
              >
                <Flame size={13} />
                <span>{locale === 'zh' ? '异兽' : 'Monsters'}</span>
              </button>
            </div>

            {/* GLOBAL PANTHEON FOCUS TOGGLE */}
            <div
              className={
                pantheonFocus !== 'all'
                  ? 'pantheon-focus-control active'
                  : 'pantheon-focus-control'
              }
            >
              <Filter size={13} />
              <label htmlFor="global-pantheon-focus-select" className="sr-only">
                {ui.nav.filterAria}
              </label>
              <select
                id="global-pantheon-focus-select"
                className="pantheon-focus-select"
                value={pantheonFocus}
                onChange={(e) => onChangePantheonFocus(e.target.value as PantheonFocus)}
                title={ui.nav.filterTitle}
              >
                <option value="all">{ui.nav.all10Pantheons}</option>
                {data.traditions.map((t) => (
                  <option key={t.id} value={t.id}>
                    {ui.nav.onlyPrefix(shortTraditionName(t.id))}
                  </option>
                ))}
              </select>
              {pantheonFocus !== 'all' && (
                <button
                  id="clear-pantheon-focus-btn"
                  type="button"
                  className="pantheon-focus-clear-btn"
                  onClick={() => onChangePantheonFocus('all')}
                  aria-label={ui.nav.resetAllAria}
                  title={ui.nav.showAll10}
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* ENGLISH / CHINESE LANGUAGE TOGGLE (EN | 中文) */}
            <div
              className="lang-toggle-group"
              role="group"
              aria-label={ui.nav.langSwitchAria}
            >
              <button
                id="lang-toggle-en"
                type="button"
                aria-pressed={locale === 'en'}
                className={locale === 'en' ? 'lang-toggle-btn active' : 'lang-toggle-btn'}
                onClick={() => setLocale('en')}
              >
                EN
              </button>
              <button
                id="lang-toggle-zh"
                type="button"
                aria-pressed={locale === 'zh'}
                className={locale === 'zh' ? 'lang-toggle-btn active' : 'lang-toggle-btn'}
                onClick={() => setLocale('zh')}
              >
                中文
              </button>
            </div>

            <button
              id="global-search-open-btn"
              type="button"
              className="icon-action-btn"
              onClick={() => setSearchOpen(true)}
              aria-label={ui.nav.searchAria}
            >
              <Search size={15} />
              <span className="mono-meta search-shortcut-hint">⌘K</span>
            </button>

            <button
              id="theme-toggle-btn"
              type="button"
              className="icon-action-btn"
              onClick={onToggleTheme}
              aria-label={theme === 'light' ? ui.nav.switchToDark : ui.nav.switchToLight}
              title={theme === 'light' ? ui.nav.switchToDark : ui.nav.switchToLight}
            >
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
              <span className="theme-toggle-label">
                {theme === 'light'
                  ? locale === 'zh'
                    ? '深色'
                    : 'Dark'
                  : locale === 'zh'
                    ? '浅色'
                    : 'Light'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Consolidated Sticky Top Navigation Banner — Core Pillars + Direct Archive Tools */}
      <header className="atlas-header">
        <div className="atlas-navbar-inner">
          <nav className="primary-nav" aria-label="Primary Navigation">
            <div className="nav-group-primary">
              <button
                id="nav-btn-home"
                type="button"
                className={route.page === 'home' ? 'nav-item-btn active' : 'nav-item-btn'}
                onClick={() => navigate({ page: 'home' })}
              >
                <Sparkles size={15} />
                <span>{focusedTrad ? ui.nav.sanctum : ui.nav.exhibition}</span>
              </button>

              <button
                id="nav-btn-explore"
                type="button"
                className={route.page === 'traditions' ? 'nav-item-btn active' : 'nav-item-btn'}
                onClick={() =>
                  navigate(
                    pantheonFocus !== 'all'
                      ? { page: 'traditions', traditionSlug: pantheonFocus }
                      : { page: 'traditions' }
                  )
                }
              >
                <BookOpen size={15} />
                <span>{ui.nav.encyclopedia}</span>
              </button>

              <button
                id="nav-btn-compare"
                type="button"
                className={route.page === 'deities' ? 'nav-item-btn active' : 'nav-item-btn'}
                onClick={() => navigate({ page: 'deities' })}
              >
                <Scale size={15} />
                <span>{ui.nav.compare}</span>
                {compareIds.length > 0 && (
                  <span className="compare-badge">{compareIds.length}</span>
                )}
              </button>

              <button
                id="nav-btn-ascension"
                type="button"
                className={
                  route.page === 'ascension'
                    ? 'nav-item-btn nav-game-highlight active'
                    : 'nav-item-btn nav-game-highlight'
                }
                onClick={() => navigate({ page: 'ascension' })}
              >
                <Gamepad2 size={15} />
                <span>{ui.nav.godhoodGame}</span>
              </button>

              <button
                id="nav-btn-learn"
                type="button"
                className={route.page === 'learn' ? 'nav-item-btn active' : 'nav-item-btn'}
                onClick={() => navigate({ page: 'learn' })}
              >
                <GraduationCap size={15} />
                <span>{ui.nav.study}</span>
              </button>
            </div>

            <span className="nav-group-divider" aria-hidden="true" />

            <div
              className="nav-group-tools"
              role="group"
              aria-label={locale === 'zh' ? '直达专题工具' : 'Direct Archive Tools'}
            >
              {directToolLinks.map((tool) => (
                <button
                  key={tool.page}
                  id={`nav-tool-${tool.page}`}
                  type="button"
                  className={
                    route.page === tool.page
                      ? 'nav-item-btn nav-tool-btn active'
                      : 'nav-item-btn nav-tool-btn'
                  }
                  onClick={() => navigate({ page: tool.page })}
                >
                  {tool.icon}
                  <span>{tool.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Non-Sticky Focus Lens Ribbon when scoped to a single Pantheon */}
      {focusedTrad && (
        <div className="pantheon-focus-ribbon" role="status">
          <div className="pillar-subnav-inner">
            <div className="row-wrap">
              <span className="tag-pill rubric">{ui.nav.singlePantheonLens}</span>
              <span className="mono-meta">
                {ui.nav.ribbonShowing(focusedTrad.name, focusedTrad.eraLabel)}
              </span>
            </div>
            <button
              id="ribbon-reset-all-pantheons-btn"
              type="button"
              className="btn-ghost"
              onClick={() => onChangePantheonFocus('all')}
            >
              <X size={13} />
              <span>{ui.nav.showAll10}</span>
            </button>
          </div>
        </div>
      )}

      <main className="atlas-main">{children}</main>

      <footer className="atlas-footer">
        <div className="atlas-footer-inner">
          <div>
            <strong className="brand-title">{ui.brand.title}</strong>
            <span>
              {focusedTrad
                ? ui.nav.footerFocused(focusedTrad.name, focusedTrad.region)
                : ui.nav.footerSummary(
                    data.traditions.length,
                    data.deities.length,
                    data.canonicalBooks.length,
                    data.ascensionSagas.length
                  )}
            </span>
          </div>
          <div className="row-wrap">
            <button
              id="footer-nav-traditions"
              type="button"
              className="btn-ghost"
              onClick={() =>
                navigate(
                  pantheonFocus !== 'all'
                    ? { page: 'traditions', traditionSlug: pantheonFocus }
                    : { page: 'traditions' }
                )
              }
            >
              {ui.nav.traditions}
            </button>
            <button
              id="footer-nav-deities"
              type="button"
              className="btn-ghost"
              onClick={() => navigate({ page: 'deities' })}
            >
              {ui.nav.comparatorShort}
            </button>
            <button
              id="footer-nav-connections"
              type="button"
              className="btn-ghost"
              onClick={() => navigate({ page: 'connections' })}
            >
              {ui.nav.rootsAndInfluence}
            </button>
            <button
              id="footer-nav-texts"
              type="button"
              className="btn-ghost"
              onClick={() => navigate({ page: 'texts' })}
            >
              {ui.nav.sacredTexts}
            </button>
            <button
              id="footer-nav-ascension"
              type="button"
              className="btn-ghost"
              onClick={() => navigate({ page: 'ascension' })}
            >
              {ui.nav.godhoodGame}
            </button>
            <button
              id="footer-nav-atlas"
              type="button"
              className="btn-ghost"
              onClick={() => navigate({ page: 'atlas' })}
            >
              {ui.nav.worldAtlas}
            </button>
            <button
              id="footer-nav-learn"
              type="button"
              className="btn-ghost"
              onClick={() => navigate({ page: 'learn' })}
            >
              {ui.nav.studyStudio}
            </button>
          </div>
        </div>
      </footer>

      {searchOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={ui.search.dialogAria}
          onClick={() => setSearchOpen(false)}
        >
          <div className="search-modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="search-input-row">
              <Search size={18} />
              <input
                id="global-search-input"
                type="search"
                className="search-modal-input"
                placeholder={
                  focusedTrad
                    ? ui.search.placeholderFocused(focusedTrad.name)
                    : ui.search.placeholderAll
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <button
                id="global-search-close-btn"
                type="button"
                className="btn-ghost"
                onClick={() => setSearchOpen(false)}
              >
                <X size={15} />
                <span>Esc</span>
              </button>
            </div>

            <div className="search-results-list">
              {focusedTrad && (
                <div className="row-between mb-sm">
                  <span className="tag-pill rubric">{ui.search.scopedTo(focusedTrad.name)}</span>
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => onChangePantheonFocus('all')}
                  >
                    <span>{ui.search.searchAll10}</span>
                  </button>
                </div>
              )}

              {searchResults.traditions.length > 0 && (
                <div className="stack-sm">
                  <div className="folio-kicker">{ui.search.secTraditions}</div>
                  {searchResults.traditions.map((t) => (
                    <button
                      key={t.id}
                      id={`search-trad-${t.id}`}
                      type="button"
                      className="search-result-btn"
                      onClick={() => {
                        setSearchOpen(false);
                        navigate({ page: 'traditions', traditionSlug: t.id });
                      }}
                    >
                      <div>
                        <strong>{t.name}</strong>
                        <p className="text-muted">{t.subtitle}</p>
                      </div>
                      <span className="mono-meta">{t.eraLabel}</span>
                    </button>
                  ))}
                </div>
              )}

              {searchResults.deities.length > 0 && (
                <div className="stack-sm mt-md">
                  <div className="folio-kicker">{ui.search.secDeities}</div>
                  {searchResults.deities.map((d) => {
                    const trad = data.traditionById[d.traditionId];
                    return (
                      <button
                        key={d.id}
                        id={`search-deity-${d.id}`}
                        type="button"
                        className="search-result-btn"
                        onClick={() => {
                          setSearchOpen(false);
                          onJumpToCompareDeity(d.id);
                        }}
                      >
                        <div className="search-hit-identity">
                          <img
                            src={getDeityPortrait(d.id)}
                            alt=""
                            className="search-deity-avatar"
                          />
                          <div className="search-hit-copy">
                            <strong>{d.name}</strong>
                            <p className="text-muted">
                              {d.epithet} · {d.domains.slice(0, 2).join(' / ')}
                            </p>
                          </div>
                        </div>
                        <span className="tag-pill card-pill-nowrap">
                          {compactTraditionName(trad?.name)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {searchResults.otherRealmMatches.length > 0 && crossRealmPool && (
                <div className="stack-sm mt-md">
                  <div className="folio-kicker">
                    {crossRealmPool.realm === 'bestiary'
                      ? locale === 'zh'
                        ? '来自神话异兽志（点击切换模式）'
                        : 'FROM MONSTERS & BESTIARY (SWITCHES REALM)'
                      : locale === 'zh'
                        ? '来自众神万神殿（点击切换模式）'
                        : 'FROM GODS & PANTHEONS (SWITCHES REALM)'}
                  </div>
                  {searchResults.otherRealmMatches.map((d) => (
                    <button
                      key={`xrealm-${d.id}`}
                      id={`search-crossrealm-${d.id}`}
                      type="button"
                      className="search-result-btn"
                      onClick={() => {
                        setSearchOpen(false);
                        onJumpCrossRealm(crossRealmPool.realm, d.id);
                      }}
                    >
                      <div className="search-hit-identity">
                        <img
                          src={getDeityPortrait(d.id)}
                          alt=""
                          className="search-deity-avatar"
                        />
                        <div className="search-hit-copy">
                          <strong>{d.name}</strong>
                          <p className="text-muted">
                            {d.epithet} · {d.domains.slice(0, 2).join(' / ')}
                          </p>
                        </div>
                      </div>
                      <span className="tag-pill verdigris card-pill-nowrap">
                        {shortTraditionName(d.traditionId)} ·{' '}
                        {crossRealmPool.realm === 'bestiary'
                          ? locale === 'zh'
                            ? '异兽'
                            : 'Bestiary'
                          : locale === 'zh'
                            ? '众神'
                            : 'Gods'}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {searchResults.motifs.length > 0 && (
                <div className="stack-sm mt-md">
                  <div className="folio-kicker">{ui.search.secMotifs}</div>
                  {searchResults.motifs.map((m) => (
                    <button
                      key={m.id}
                      id={`search-motif-${m.id}`}
                      type="button"
                      className="search-result-btn"
                      onClick={() => {
                        setSearchOpen(false);
                        onJumpToMotif(m.id);
                      }}
                    >
                      <div>
                        <strong>{m.title}</strong>
                        <p className="text-muted">{m.subtitle}</p>
                      </div>
                      <span className="tag-pill rubric">{m.folioNumber}</span>
                    </button>
                  ))}
                </div>
              )}

              {searchResults.books.length > 0 && (
                <div className="stack-sm mt-md">
                  <div className="folio-kicker">{ui.search.secBooks}</div>
                  {searchResults.books.map((b) => {
                    const trad = data.traditionById[b.traditionId];
                    return (
                      <button
                        key={b.id}
                        id={`search-book-${b.id}`}
                        type="button"
                        className="search-result-btn"
                        onClick={() => {
                          setSearchOpen(false);
                          onJumpToBook(b.id);
                        }}
                      >
                        <div>
                          <strong>{b.title}</strong>
                          <p className="text-muted">
                            {b.dateComposed} · {b.tagline}
                          </p>
                        </div>
                        <span className="tag-pill card-pill-nowrap">
                          {compactTraditionName(trad?.name)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {searchResults.sagas.length > 0 && (
                <div className="stack-sm mt-md">
                  <div className="folio-kicker">{ui.search.secSagas}</div>
                  {searchResults.sagas.map((s) => {
                    const trad = data.traditionById[s.traditionId];
                    return (
                      <button
                        key={s.id}
                        id={`search-saga-${s.id}`}
                        type="button"
                        className="search-result-btn"
                        onClick={() => {
                          setSearchOpen(false);
                          onJumpToSaga(s.id);
                        }}
                      >
                        <div className="row-wrap">
                          <img
                            src={getDeityPortrait(s.deityId)}
                            alt=""
                            className="search-deity-avatar"
                          />
                          <div>
                            <strong>{s.ascendedTitle}</strong>
                            <p className="text-muted">
                              {s.dndClass} · {ui.search.threeEndings}
                            </p>
                          </div>
                        </div>
                        <span className="tag-pill rubric card-pill-nowrap">
                          {compactTraditionName(trad?.name)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {searchResults.influences.length > 0 && (
                <div className="stack-sm mt-md">
                  <div className="folio-kicker">{ui.search.secInfluences}</div>
                  {searchResults.influences.map((ev) => (
                    <button
                      key={ev.id}
                      id={`search-influence-${ev.id}`}
                      type="button"
                      className="search-result-btn"
                      onClick={() => {
                        setSearchOpen(false);
                        navigate({ page: 'connections', connectionEventId: ev.id });
                      }}
                    >
                      <div>
                        <strong>{ev.headline}</strong>
                        <p className="text-muted">
                          {ev.fromLabel} ➔ {ev.toLabel}
                        </p>
                      </div>
                      <span className="mono-meta">{ev.eraLabel.split(/[（(]/)[0].trim()}</span>
                    </button>
                  ))}
                </div>
              )}

              {searchResults.traditions.length === 0 &&
                searchResults.deities.length === 0 &&
                searchResults.otherRealmMatches.length === 0 &&
                searchResults.motifs.length === 0 &&
                searchResults.books.length === 0 &&
                searchResults.sagas.length === 0 &&
                searchResults.influences.length === 0 && (
                  <p className="text-muted mt-md">{ui.search.noResults(query)}</p>
                )}
            </div>
          </div>
        </div>
      )}
      {showBackToTop && (
        <button
          id="back-to-top-btn"
          type="button"
          className="back-to-top-fab"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={locale === 'zh' ? '回到页面顶部' : 'Scroll back to top'}
        >
          <ArrowUp size={15} />
          <span>{locale === 'zh' ? '顶部' : 'Top'}</span>
        </button>
      )}
    </div>
  );
};

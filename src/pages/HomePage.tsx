import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Compass,
  Gamepad2,
  GitBranch,
  Layers,
  Network,
  Scale,
  ScrollText,
  X,
} from 'lucide-react';
import { CelestialPantheonWheel } from '../components/CelestialPantheonWheel';
import { DeityReaderDrawer } from '../components/DeityReaderDrawer';
import { MythicCinemaStage } from '../components/MythicCinemaStage';
import { getDeityPortrait, getPortalPlate, getTraditionPlate } from '../data/visuals';
import { useI18n } from '../i18n/I18nContext';
import { splitTitleHead } from '../i18n/uiStrings';
import type { PageId, RouteState } from '../types/mythology';
import type { PantheonFocus, RealmMode } from '../utils/storage';

interface HomePageProps {
  pantheonFocus: PantheonFocus;
  onChangePantheonFocus: (next: PantheonFocus) => void;
  compareIds: string[];
  favoriteIds: string[];
  onToggleFavorite: (deityId: string) => void;
  onJumpCrossRealm: (targetRealm: RealmMode, targetDeityId: string) => void;
  onToggleCompareDeity: (deityId: string) => void;
  navigate: (next: RouteState) => void;
  onApplyPreset: (deityIds: string[]) => void;
  onSelectMotif: (motifId: string) => void;
  onJumpToSaga: (sagaId: string) => void;
}

const PRIMARY_PATHS: {
  id: 'traditions' | 'deities' | 'ascension';
  icon: React.ReactNode;
}[] = [
  { id: 'traditions', icon: <BookOpen size={15} /> },
  { id: 'deities', icon: <Scale size={15} /> },
  { id: 'ascension', icon: <Gamepad2 size={15} /> },
];

export const HomePage: React.FC<HomePageProps> = ({
  pantheonFocus,
  onChangePantheonFocus,
  compareIds,
  favoriteIds,
  onToggleFavorite,
  onJumpCrossRealm,
  onToggleCompareDeity,
  navigate,
  onApplyPreset,
  onSelectMotif,
  onJumpToSaga,
}) => {
  const { locale, realm, ui, data, shortTraditionName } = useI18n();
  const [readerDeityId, setReaderDeityId] = useState<string | null>(null);
  const isZh = locale === 'zh';

  if (pantheonFocus !== 'all') {
    const trad = data.traditionById[pantheonFocus];
    if (trad) {
      const pDeities = data.deities.filter((d) => d.traditionId === trad.id);
      const pBooks = data.canonicalBooks.filter((b) => b.traditionId === trad.id);
      const pMotifs = data.mythMotifs.filter((m) =>
        m.retellings.some((r) => r.traditionId === trad.id)
      );
      const pSaga = data.sagaByTraditionId[trad.id];
      const shortName = shortTraditionName(trad.id);

      const focusedQuickLinks: {
        id: Exclude<PageId, 'home'>;
        label: string;
        icon: React.ReactNode;
        onOpen: () => void;
      }[] = [
        {
          id: 'traditions',
          label: ui.home.focused.monographCard(shortName),
          icon: <BookOpen size={14} />,
          onOpen: () => navigate({ page: 'traditions', traditionSlug: trad.id }),
        },
        {
          id: 'texts',
          label: ui.home.focused.canonCard(pBooks.length),
          icon: <ScrollText size={14} />,
          onOpen: () => navigate({ page: 'texts' }),
        },
        {
          id: 'lineages',
          label: ui.home.focused.lineageCard(shortName),
          icon: <GitBranch size={14} />,
          onOpen: () => navigate({ page: 'lineages' }),
        },
        {
          id: 'motifs',
          label: ui.home.focused.motifsCard(pMotifs.length),
          icon: <Layers size={14} />,
          onOpen: () => navigate({ page: 'motifs' }),
        },
        {
          id: 'connections',
          label: ui.home.focused.rootsCard,
          icon: <Network size={14} />,
          onOpen: () => navigate({ page: 'connections' }),
        },
        {
          id: 'atlas',
          label: ui.nav.worldAtlas,
          icon: <Compass size={14} />,
          onOpen: () => navigate({ page: 'atlas' }),
        },
      ];

      return (
        <div>
          <section className="visual-split-banner" aria-labelledby="focused-home-heading">
            <div>
              <div className="row-between">
                <span className="folio-kicker">
                  {trad.folioCode} · {trad.region.toUpperCase()}
                </span>
                <span className="mono-meta">{trad.eraLabel}</span>
              </div>

              <h1 id="focused-home-heading" className="mt-sm">
                {ui.home.focused.mythologySuffix(trad.name)}
              </h1>
              <p className="page-lead mt-sm">{trad.summary}</p>

              <blockquote className="monograph-thesis">“{trad.worldviewThesis}”</blockquote>

              <div className="row-wrap mt-md">
                {trad.sacredSymbols.map((sym) => (
                  <span key={sym} className="tag-pill rubric">
                    {sym}
                  </span>
                ))}
              </div>

              <div className="row-wrap mt-lg">
                {pSaga && (
                  <button
                    id="focused-home-play-quest-btn"
                    type="button"
                    className="btn-primary"
                    onClick={() => onJumpToSaga(pSaga.id)}
                  >
                    <Gamepad2 size={15} />
                    <span>{ui.home.focused.playQuest(splitTitleHead(pSaga.ascendedTitle))}</span>
                  </button>
                )}

                <button
                  id="focused-home-monograph-btn"
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate({ page: 'traditions', traditionSlug: trad.id })}
                >
                  <span>{ui.home.focused.fullMonograph}</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  id="focused-home-reset-btn"
                  type="button"
                  className="btn-ghost"
                  onClick={() => onChangePantheonFocus('all')}
                >
                  <X size={14} />
                  <span>{ui.home.focused.viewAll10}</span>
                </button>
              </div>
            </div>

            <figure className="banner-plate-frame">
              <img
                src={getTraditionPlate(trad.id, realm)}
                alt={trad.name}
                className="banner-plate-img"
              />
            </figure>
          </section>

          {/* Compact 1-Row Quick Links Strip (replaces the old 7-card Focused Sanctum wall) */}
          <nav
            className="focused-tools-strip mt-md"
            aria-label={ui.home.focused.exploreTitle(trad.name)}
          >
            <span className="home-tools-label">{ui.home.focused.exploreTitle(shortName)}</span>
            <div className="home-tools-pills">
              {focusedQuickLinks.map((item) => (
                <button
                  key={item.id}
                  id={`focused-door-${item.id}`}
                  type="button"
                  className="home-tool-pill"
                  onClick={item.onOpen}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Key Figures Shown Immediately Without Scrolling Past 7 Portal Cards */}
          <section className="mt-lg" aria-labelledby="focused-deities-heading">
            <div className="section-heading-row">
              <div>
                <span className="folio-kicker">{ui.home.focused.figuresKicker}</span>
                <h2 id="focused-deities-heading">{ui.home.focused.keyFiguresTitle(trad.name)}</h2>
              </div>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate({ page: 'deities' })}
              >
                <Scale size={14} />
                <span>{ui.home.focused.compareSideBySide}</span>
              </button>
            </div>

            <div className="game-hero-picker-grid">
              {pDeities.map((deity) => (
                <button
                  key={deity.id}
                  type="button"
                  className="visual-card visual-tile-btn"
                  onClick={() => setReaderDeityId(deity.id)}
                >
                  <div className="visual-card-media portrait">
                    <img
                      src={getDeityPortrait(deity.id)}
                      alt={deity.name}
                      className="visual-card-img"
                      loading="lazy"
                    />
                    <span className="media-badge-overlay">{deity.domains[0]}</span>
                  </div>
                  <div className="visual-card-content">
                    <h3 className="tile-card-title" title={deity.name}>
                      {deity.name}
                    </h3>
                    <p className="deity-epithet-prose visual-card-hook-clamped">{deity.epithet}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <DeityReaderDrawer
            deity={readerDeityId ? (data.deityById[readerDeityId] ?? null) : null}
            roster={pDeities}
            compareIds={compareIds}
            favoriteIds={favoriteIds}
            onToggleFavorite={onToggleFavorite}
            onJumpCrossRealm={onJumpCrossRealm}
            onClose={() => setReaderDeityId(null)}
            onSelectDeity={(id) => setReaderDeityId(id)}
            onToggleCompareDeity={onToggleCompareDeity}
            navigate={navigate}
            onJumpToSaga={onJumpToSaga}
          />
        </div>
      );
    }
  }

  const startPathCtas: Record<'traditions' | 'deities' | 'ascension', string> = {
    traditions: isZh
      ? realm === 'bestiary'
        ? '浏览十大异兽谱'
        : '探索十大神话体系'
      : realm === 'bestiary'
        ? 'Explore Bestiaries'
        : 'Explore Worlds',
    deities: isZh
      ? realm === 'bestiary'
        ? '打开异兽对照仪'
        : '打开众神对照仪'
      : 'Open Comparator',
    ascension: isZh
      ? realm === 'bestiary'
        ? '开始猎魔冒险'
        : '开始封神冒险'
      : realm === 'bestiary'
        ? 'Start a Monster Hunt'
        : 'Start an Adventure',
  };

  return (
    <div>
      <MythicCinemaStage
        navigate={navigate}
        onApplyPreset={onApplyPreset}
        onSelectMotif={onSelectMotif}
      />

      {/* Consolidated 3 Guided Entry Paths (replaces the overwhelming 9-card Sanctum I–IX wall) */}
      <section className="mt-lg" aria-labelledby="portals-heading">
        <div className="section-heading-row">
          <div>
            <span className="folio-kicker">{ui.home.chooseDest}</span>
            <h2 id="portals-heading">{ui.home.enterHall}</h2>
          </div>
        </div>

        <div className="start-paths-grid">
          {PRIMARY_PATHS.map(({ id, icon }) => {
            const copy = ui.home.doors[id];
            return (
              <button
                key={id}
                id={`portal-door-${id}`}
                type="button"
                className="start-path-card"
                onClick={() => navigate({ page: id })}
              >
                <div className="start-path-media">
                  <img
                    src={getPortalPlate(id, realm)}
                    alt=""
                    className="start-path-img"
                    loading="lazy"
                  />
                  <span className="start-path-badge">
                    {icon}
                    <span>{copy.kicker}</span>
                  </span>
                </div>
                <div className="start-path-body">
                  <h3>{copy.title}</h3>
                  <p className="text-muted">{copy.tagline}</p>
                  <span className="start-path-cta">
                    <span>{startPathCtas[id]}</span>
                    <ArrowRight size={15} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <CelestialPantheonWheel navigate={navigate} />
    </div>
  );
};

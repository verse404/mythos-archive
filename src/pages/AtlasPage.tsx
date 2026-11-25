import React, { useMemo, useState } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { DeityReaderDrawer } from '../components/DeityReaderDrawer';
import { ChronoLifespanSvg } from '../components/VisualEmblems';
import { getAtlasPlate, getDeityPortrait, getTraditionPlate } from '../data/visuals';
import { useI18n } from '../i18n/I18nContext';
import { MILESTONE_CATEGORY_LABEL, compactTraditionName } from '../i18n/uiStrings';
import type { RouteState, TraditionId } from '../types/mythology';
import type { PantheonFocus, RealmMode } from '../utils/storage';

interface AtlasPageProps {
  pantheonFocus: PantheonFocus;
  compareIds: string[];
  favoriteIds: string[];
  onToggleFavorite: (deityId: string) => void;
  onJumpCrossRealm: (targetRealm: RealmMode, targetDeityId: string) => void;
  onToggleCompareDeity: (deityId: string) => void;
  onJumpToSaga: (sagaId: string) => void;
  navigate: (next: RouteState) => void;
}

export const AtlasPage: React.FC<AtlasPageProps> = ({
  pantheonFocus,
  compareIds,
  favoriteIds,
  onToggleFavorite,
  onJumpCrossRealm,
  onToggleCompareDeity,
  onJumpToSaga,
  navigate,
}) => {
  const { locale, realm, ui, data, shortTraditionName } = useI18n();
  const [selectedTradId, setSelectedTradId] = useState<TraditionId>(
    pantheonFocus !== 'all' ? pantheonFocus : 'greek'
  );
  const [activeRouteId, setActiveRouteId] = useState<string | 'all'>('all');
  const [scrubYear, setScrubYear] = useState<number>(2026);
  const [readerDeityId, setReaderDeityId] = useState<string | null>(null);

  const effectiveTradId = pantheonFocus !== 'all' ? pantheonFocus : selectedTradId;
  const selectedTrad = data.traditionById[effectiveTradId] ?? data.traditions[0];
  const selectedTradFigures = useMemo(
    () => data.deities.filter((d) => d.traditionId === selectedTrad.id),
    [data.deities, selectedTrad.id]
  );

  const scopedTraditions = useMemo(
    () =>
      pantheonFocus === 'all'
        ? data.traditions
        : data.traditions.filter((t) => t.id === pantheonFocus),
    [data.traditions, pantheonFocus]
  );

  const scopedDiffusionRoutes = useMemo(
    () =>
      pantheonFocus === 'all'
        ? data.diffusionRoutes
        : data.diffusionRoutes.filter((r) => r.traditionIds.includes(pantheonFocus)),
    [data.diffusionRoutes, pantheonFocus]
  );

  const visibleRoutes = useMemo(() => {
    if (activeRouteId === 'all') return scopedDiffusionRoutes;
    return scopedDiffusionRoutes.filter((r) => r.id === activeRouteId);
  }, [activeRouteId, scopedDiffusionRoutes]);

  const activeTraditionsAtYear = useMemo(() => {
    return scopedTraditions.filter((t) => t.startYear <= scrubYear);
  }, [scopedTraditions, scrubYear]);

  const visibleMilestones = useMemo(() => {
    return data.chronoMilestones.filter(
      (m) =>
        m.year <= scrubYear &&
        (pantheonFocus === 'all' || m.traditionId === pantheonFocus)
    );
  }, [data.chronoMilestones, pantheonFocus, scrubYear]);

  return (
    <div>
      <header className="page-masthead">
        <div className="page-masthead-copy">
          <span className="folio-kicker">{ui.atlas.kicker}</span>
          <h1>{ui.atlas.heading}</h1>
          <p className="page-lead">{ui.atlas.lead}</p>
        </div>
      </header>

      <div className="filter-bar" role="group" aria-label={ui.atlas.corridorsHeading}>
        <button
          id="route-filter-all"
          type="button"
          className={activeRouteId === 'all' ? 'chip-btn active' : 'chip-btn'}
          onClick={() => setActiveRouteId('all')}
        >
          {ui.atlas.allCorridors(scopedDiffusionRoutes.length)}
        </button>
        {scopedDiffusionRoutes.map((route) => (
          <button
            key={route.id}
            id={`route-filter-${route.id}`}
            type="button"
            className={activeRouteId === route.id ? 'chip-btn active' : 'chip-btn'}
            onClick={() => setActiveRouteId(route.id)}
          >
            {route.name}
          </button>
        ))}
      </div>

      <section className="atlas-map-card" aria-label={ui.atlas.heading}>
        <svg
          className="atlas-world-svg"
          viewBox="0 0 1000 520"
          role="img"
          aria-label={ui.atlas.heading}
        >
          {/* Antique double cartographic border */}
          <rect x="6" y="6" width="988" height="508" rx="4" className="atlas-frame-outer" />
          <rect x="12" y="12" width="976" height="496" rx="2" className="atlas-frame-inner" />

          {[
            { y: 130, label: '30°N' },
            { y: 260, label: locale === 'zh' ? '赤道 0°' : 'EQUATOR 0°' },
            { y: 390, label: '30°S' },
          ].map((lat) => (
            <g key={`lat-${lat.y}`}>
              <line x1="12" y1={lat.y} x2="988" y2={lat.y} className="atlas-graticule" />
              <text x="20" y={lat.y - 5} className="atlas-lat-label">
                {lat.label}
              </text>
            </g>
          ))}
          {[200, 400, 600, 800].map((x) => (
            <line key={`lon-${x}`} x1={x} y1="12" x2={x} y2="508" className="atlas-graticule" />
          ))}

          {/* Engraved Cartographic Compass Rose (South-West Ocean) */}
          <g transform="translate(96, 424)" className="atlas-compass-rose" aria-hidden="true">
            <circle cx="0" cy="0" r="34" className="atlas-compass-ring" />
            <circle cx="0" cy="0" r="26" className="atlas-compass-ring-inner" />
            <polygon points="0,-32 6,-6 0,0 -6,-6" className="atlas-compass-needle-n" />
            <polygon points="0,32 6,6 0,0 -6,6" className="atlas-compass-needle-s" />
            <polygon points="32,0 6,6 0,0 6,-6" className="atlas-compass-needle-s" />
            <polygon points="-32,0 -6,6 0,0 -6,-6" className="atlas-compass-needle-s" />
            <circle cx="0" cy="0" r="3.5" className="map-pin-inner" />
            <text x="0" y="-38" textAnchor="middle" className="atlas-compass-cardinal">
              N
            </text>
            <text x="0" y="46" textAnchor="middle" className="atlas-compass-cardinal">
              S
            </text>
            <text x="41" y="4" textAnchor="middle" className="atlas-compass-cardinal">
              E
            </text>
            <text x="-41" y="4" textAnchor="middle" className="atlas-compass-cardinal">
              W
            </text>
          </g>

          {data.atlasLandmasses.map((land) => (
            <path key={land.id} d={land.d} className="atlas-land-path">
              <title>{land.label}</title>
            </path>
          ))}

          {visibleRoutes.map((route) => (
            <path
              key={route.id}
              d={route.svgPath}
              className={
                activeRouteId === route.id ? 'diffusion-path active' : 'diffusion-path'
              }
            />
          ))}

          {scopedTraditions.map((trad) => {
            const isSelected = trad.id === selectedTrad.id;
            const isActiveInEra = trad.startYear <= scrubYear;
            if (!isActiveInEra) return null;

            return (
              <g
                key={trad.id}
                id={`atlas-pin-${trad.id}`}
                className={isSelected ? 'map-pin-group active' : 'map-pin-group'}
                onClick={() => setSelectedTradId(trad.id)}
                tabIndex={0}
                role="button"
                aria-label={`${trad.name} (${trad.region})`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedTradId(trad.id);
                  }
                }}
              >
                <circle
                  cx={trad.mapCoords.x}
                  cy={trad.mapCoords.y}
                  r={isSelected ? 12 : 9}
                  className="map-pin-outer"
                />
                <circle
                  cx={trad.mapCoords.x}
                  cy={trad.mapCoords.y}
                  r={4}
                  className="map-pin-inner"
                />
                <text
                  x={trad.mapCoords.x}
                  y={trad.mapCoords.y - 15}
                  textAnchor="middle"
                  className="map-pin-label"
                >
                  {shortTraditionName(trad.id)}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="atlas-plaque-grid">
          <img
            src={getTraditionPlate(selectedTrad.id, realm)}
            alt={selectedTrad.name}
            className="atlas-plaque-img"
          />

          <div>
            <span className="folio-kicker">
              <Compass size={13} /> {ui.atlas.selectedHomeland(selectedTrad.region)}
            </span>
            <h2 className="mt-sm">
              {selectedTrad.name} ({selectedTrad.eraLabel})
            </h2>
            <p className="text-muted mt-sm">{data.traditionShortHook[selectedTrad.id]}</p>

            {/* Clickable Regional Figures Preview Strip */}
            <div className="atlas-region-figures mt-sm">
              {selectedTradFigures.slice(0, 4).map((fig) => (
                <button
                  key={fig.id}
                  id={`atlas-fig-${fig.id}`}
                  type="button"
                  className="atlas-region-fig-btn"
                  onClick={() => setReaderDeityId(fig.id)}
                  title={fig.epithet}
                >
                  <img
                    src={getDeityPortrait(fig.id)}
                    alt={fig.name}
                    className="atlas-region-fig-avatar"
                  />
                  <span>{fig.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            id="atlas-open-selected-trad"
            type="button"
            className="btn-primary"
            onClick={() => navigate({ page: 'traditions', traditionSlug: selectedTrad.id })}
          >
            <span>{ui.atlas.openMonograph}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <section className="timeline-scrubber-box mt-lg" aria-labelledby="chrono-heading">
        <div className="row-between">
          <div>
            <span className="folio-kicker">{ui.atlas.timelineKicker}</span>
            <h2 id="chrono-heading">{ui.atlas.lifespansAt(ui.atlas.formatYear(scrubYear))}</h2>
          </div>
          <span className="tag-pill ochre">
            {ui.atlas.emergedMilestones(activeTraditionsAtYear.length, visibleMilestones.length)}
          </span>
        </div>

        <input
          id="chrono-year-slider"
          type="range"
          min={-3500}
          max={2026}
          step={50}
          value={scrubYear}
          onChange={(e) => setScrubYear(Number(e.target.value))}
          className="year-range-input"
          aria-label={ui.atlas.timelineKicker}
        />

        <ChronoLifespanSvg
          traditions={scopedTraditions}
          scrubYear={scrubYear}
          onSelectTradition={setSelectedTradId}
        />
      </section>

      <section className="mt-lg" aria-labelledby="diffusion-cards-heading">
        <div className="section-heading-row">
          <div>
            <span className="folio-kicker">{ui.atlas.exchangeKicker}</span>
            <h2 id="diffusion-cards-heading">{ui.atlas.corridorsHeading}</h2>
          </div>
        </div>

        <div className="folio-grid-2">
          {visibleRoutes.map((route) => (
            <article key={route.id} className="visual-card">
              <div className="visual-card-media">
                <img
                  src={getAtlasPlate(route.id, realm)}
                  alt={route.name}
                  className="visual-card-img"
                  loading="lazy"
                />
                <span className="media-badge-overlay">{route.eraLabel}</span>
              </div>
              <div className="visual-card-content">
                <h3>{route.name}</h3>
                <p className="visual-card-hook">{route.summary}</p>
                <div className="folio-card-footer">
                  <div className="row-wrap">
                    {route.traditionIds.map((tid) => (
                      <button
                        key={tid}
                        id={`route-trad-btn-${route.id}-${tid}`}
                        type="button"
                        className="btn-ghost"
                        onClick={() => navigate({ page: 'traditions', traditionSlug: tid })}
                      >
                        <span>{compactTraditionName(data.traditionById[tid]?.name)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-lg" aria-labelledby="milestones-heading">
        <div className="section-heading-row">
          <div>
            <span className="folio-kicker">{ui.atlas.landmarksKicker}</span>
            <h2 id="milestones-heading">
              {ui.atlas.milestonesHeading(visibleMilestones.length)}
            </h2>
          </div>
        </div>

        <div className="folio-grid-3">
          {visibleMilestones.map((ms) => {
            const trad = data.traditionById[ms.traditionId];
            return (
              <article key={ms.id} className="visual-card">
                <div className="visual-card-media">
                  <img
                    src={getAtlasPlate(ms.id, realm)}
                    alt={ms.title}
                    className="visual-card-img"
                    loading="lazy"
                  />
                  <span className="media-badge-overlay">
                    {ms.yearLabel} · {compactTraditionName(trad?.name)}
                  </span>
                </div>
                <div className="visual-card-content">
                  <h3>{ms.title}</h3>
                  <p className="visual-card-hook">{ms.description}</p>
                  <div className="folio-card-footer">
                    <span className="tag-pill ochre">
                      {MILESTONE_CATEGORY_LABEL[locale][ms.category]}
                    </span>
                    <button
                      id={`ms-open-${ms.id}`}
                      type="button"
                      className="btn-ghost"
                      onClick={() =>
                        navigate({ page: 'traditions', traditionSlug: ms.traditionId })
                      }
                    >
                      <span>{ui.atlas.exploreBtn}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <DeityReaderDrawer
        deity={readerDeityId ? (data.deityById[readerDeityId] ?? null) : null}
        roster={selectedTradFigures}
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
};

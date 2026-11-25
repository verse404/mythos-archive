import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Gamepad2,
  GitBranch,
  Layers,
  Plus,
  Printer,
  Scale,
  ScrollText,
} from 'lucide-react';
import { DeityReaderDrawer } from '../components/DeityReaderDrawer';
import { ArchetypeMedallion, CosmologyCrossSectionSvg } from '../components/VisualEmblems';
import { getDeityPortrait, getTraditionPlate } from '../data/visuals';
import { useI18n } from '../i18n/I18nContext';
import { compactTraditionName } from '../i18n/uiStrings';
import type { Deity, RouteState, TraditionId } from '../types/mythology';
import type { PantheonFocus, RealmMode } from '../utils/storage';

interface TraditionsPageProps {
  selectedSlug?: TraditionId;
  pantheonFocus: PantheonFocus;
  onChangePantheonFocus: (next: PantheonFocus) => void;
  navigate: (next: RouteState) => void;
  compareIds: string[];
  favoriteIds: string[];
  onToggleFavorite: (deityId: string) => void;
  onJumpCrossRealm: (targetRealm: RealmMode, targetDeityId: string) => void;
  onToggleCompareDeity: (deityId: string) => void;
  onSelectLineageTradition: (tradId: TraditionId) => void;
  onOpenTraditionTexts: (tradId: TraditionId) => void;
  onJumpToSaga: (sagaId: string) => void;
}

export const TraditionsPage: React.FC<TraditionsPageProps> = ({
  selectedSlug,
  pantheonFocus,
  onChangePantheonFocus,
  navigate,
  compareIds,
  favoriteIds,
  onToggleFavorite,
  onJumpCrossRealm,
  onToggleCompareDeity,
  onSelectLineageTradition,
  onOpenTraditionTexts,
  onJumpToSaga,
}) => {
  const { locale, realm, ui, data } = useI18n();
  const [eraFilter, setEraFilter] = useState<'all' | 'living' | 'ancient'>('all');
  const [readerDeityId, setReaderDeityId] = useState<string | null>(null);
  const quickReadLabel = locale === 'zh' ? '阅读详传' : 'Quick Read';

  const selectedTradition = selectedSlug ? data.traditionById[selectedSlug] : undefined;
  const readerDeity: Deity | null = readerDeityId ? (data.deityById[readerDeityId] ?? null) : null;

  const filteredTraditions = useMemo(() => {
    if (eraFilter === 'living') return data.traditions.filter((t) => t.isLivingTradition);
    if (eraFilter === 'ancient') return data.traditions.filter((t) => !t.isLivingTradition);
    return data.traditions;
  }, [data.traditions, eraFilter]);

  if (selectedTradition) {
    const pantheonDeities = data.deities.filter((d) => d.traditionId === selectedTradition.id);

    return (
      <article>
        <div className="row-between">
          <button
            id="monograph-back-btn"
            type="button"
            className="btn-secondary"
            onClick={() =>
              pantheonFocus !== 'all'
                ? onChangePantheonFocus('all')
                : navigate({ page: 'traditions' })
            }
          >
            <ArrowLeft size={15} />
            <span>
              {pantheonFocus !== 'all' ? ui.traditions.unlockAll10 : ui.traditions.backAll10}
            </span>
          </button>

          <div className="row-wrap">
            {data.sagaByTraditionId[selectedTradition.id] && (
              <button
                id="monograph-open-saga-btn"
                type="button"
                className="btn-secondary"
                onClick={() => {
                  const sg = data.sagaByTraditionId[selectedTradition.id];
                  if (sg) onJumpToSaga(sg.id);
                }}
              >
                <Gamepad2 size={15} />
                <span>{ui.traditions.playSaga(compactTraditionName(selectedTradition.name))}</span>
              </button>
            )}
            <button
              id="monograph-open-lineage-btn"
              type="button"
              className="btn-secondary"
              onClick={() => {
                onSelectLineageTradition(selectedTradition.id);
                navigate({ page: 'lineages', lineageTradition: selectedTradition.id });
              }}
            >
              <GitBranch size={15} />
              <span>{ui.traditions.familyTreeBtn(compactTraditionName(selectedTradition.name))}</span>
            </button>
            <button
              id="monograph-print-btn"
              type="button"
              className="btn-ghost"
              onClick={() => window.print()}
            >
              <Printer size={15} />
              <span>{locale === 'zh' ? '打印 / PDF' : 'Print / PDF'}</span>
            </button>
            <button
              id="monograph-open-comparator-btn"
              type="button"
              className="btn-primary"
              onClick={() => navigate({ page: 'deities' })}
            >
              <Scale size={15} />
              <span>{ui.traditions.comparatorCount(compareIds.length)}</span>
            </button>
          </div>
        </div>

        <header className="visual-split-banner mt-md">
          <div>
            <div className="row-between">
              <span className="folio-kicker">{selectedTradition.folioCode}</span>
              <span className="mono-meta">{selectedTradition.eraLabel}</span>
            </div>
            <h1 className="mt-sm">{ui.traditions.monographTitle(selectedTradition.name)}</h1>
            <p className="page-lead mt-sm">{selectedTradition.summary}</p>

            <blockquote className="monograph-thesis">
              “{selectedTradition.worldviewThesis}”
            </blockquote>

            <div className="row-wrap mt-md">
              {selectedTradition.keyValues.map((val) => (
                <span key={val} className="tag-pill ochre">
                  {val}
                </span>
              ))}
            </div>
          </div>

          <figure className="banner-plate-frame">
            <img
              src={getTraditionPlate(selectedTradition.id, realm)}
              alt={selectedTradition.name}
              className="banner-plate-img"
            />
          </figure>
        </header>

        <div className="monograph-columns">
          <section aria-labelledby="cosmology-heading">
            <div className="section-heading-row">
              <div>
                <span className="folio-kicker">{ui.traditions.cosmicArch}</span>
                <h2 id="cosmology-heading">{ui.traditions.threeTierTitle}</h2>
              </div>
            </div>

            <CosmologyCrossSectionSvg
              realms={selectedTradition.realms}
              axisName={selectedTradition.cosmicAxis}
            />

            <div className="cosmology-stack">
              {selectedTradition.realms.map((realm) => (
                <div key={realm.name} className={`realm-tier-box ${realm.tier}`}>
                  <div className="row-between">
                    <strong>{realm.name}</strong>
                    <span className="tag-pill">
                      {realm.tier === 'upper'
                        ? ui.traditions.upperSky
                        : realm.tier === 'middle'
                          ? ui.traditions.middleEarth
                          : ui.traditions.underworld}
                    </span>
                  </div>
                  <p className="text-muted mt-sm">{realm.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="sources-heading">
            <div className="section-heading-row">
              <div>
                <span className="folio-kicker">{ui.traditions.sacredCanon}</span>
                <h2 id="sources-heading">{ui.traditions.primaryTextsSymbols}</h2>
              </div>
              <button
                id="monograph-open-texts-btn"
                type="button"
                className="btn-ghost"
                onClick={() => onOpenTraditionTexts(selectedTradition.id)}
              >
                <ScrollText size={14} />
                <span>{ui.traditions.readInLibrary}</span>
              </button>
            </div>

            <div className="row-wrap">
              {selectedTradition.sacredSymbols.map((sym) => (
                <span key={sym} className="tag-pill rubric">
                  {sym}
                </span>
              ))}
            </div>

            <div className="text-source-list mt-md">
              {selectedTradition.primaryTexts.map((txt) => (
                <div key={txt.title} className="text-source-item">
                  <div className="row-between">
                    <strong>{txt.title}</strong>
                    <span className="mono-meta">{txt.period}</span>
                  </div>
                  <p className="text-muted mt-sm">{txt.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section aria-labelledby="pantheon-roster-heading">
          <div className="section-heading-row">
            <div>
              <span className="folio-kicker">{ui.traditions.pantheonFigures}</span>
              <h2 id="pantheon-roster-heading">
                {ui.traditions.deitiesOf(selectedTradition.name)}
              </h2>
            </div>
          </div>

          <div className="folio-grid-2">
            {pantheonDeities.map((deity) => {
              const isSelected = compareIds.includes(deity.id);
              const arch = data.archetypes.find((a) => a.id === deity.archetypeId);
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
                    aria-label={`${quickReadLabel}: ${deity.name}`}
                  >
                    <img
                      src={getDeityPortrait(deity.id)}
                      alt={`${deity.name} — ${deity.epithet}`}
                      className="visual-card-img"
                      loading="lazy"
                    />
                    <span className="media-badge-overlay">{arch?.shortLabel}</span>
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
                      <div className="row-wrap card-actions-nowrap">
                        <button
                          id={`trad-read-${deity.id}`}
                          type="button"
                          className="btn-ghost"
                          onClick={() => setReaderDeityId(deity.id)}
                        >
                          <BookOpen size={13} />
                          <span>{quickReadLabel}</span>
                        </button>
                        {data.sagaByDeityId[deity.id] && (
                          <button
                            id={`trad-quest-${deity.id}`}
                            type="button"
                            className="btn-ghost"
                            onClick={() => {
                              const sg = data.sagaByDeityId[deity.id];
                              if (sg) onJumpToSaga(sg.id);
                            }}
                          >
                            <Gamepad2 size={14} />
                            <span>{ui.traditions.dndQuestBtn}</span>
                          </button>
                        )}
                        <button
                          id={`trad-compare-toggle-${deity.id}`}
                          type="button"
                          className={isSelected ? 'btn-ghost selected' : 'btn-secondary'}
                          onClick={() => onToggleCompareDeity(deity.id)}
                        >
                          {isSelected ? <Check size={14} /> : <Plus size={14} />}
                          <span>
                            {isSelected ? ui.traditions.inComparator : ui.traditions.compareBtn}
                          </span>
                        </button>
                      </div>
                    </div>

                    <p className="deity-epithet-prose">{deity.epithet}</p>
                    <p className="folio-card-body compare-prose-clamped">{deity.signatureMyth}</p>
                    <div className="row-wrap">
                      {deity.domains.map((dom) => (
                        <span key={dom} className="tag-pill">
                          {dom}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <DeityReaderDrawer
          deity={readerDeity}
          roster={pantheonDeities}
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

        {pantheonFocus === 'all' && (
          <section className="mt-lg" aria-labelledby="cross-links-heading">
            <div className="section-heading-row">
              <div>
                <span className="folio-kicker">{ui.traditions.crossResonance}</span>
                <h2 id="cross-links-heading">{ui.traditions.connectedPantheons}</h2>
              </div>
              <button
                id="monograph-motifs-btn"
                type="button"
                className="btn-ghost"
                onClick={() => navigate({ page: 'motifs' })}
              >
                <Layers size={14} />
                <span>{ui.traditions.parallelMythsBtn}</span>
              </button>
            </div>

            <div className="folio-grid-3">
              {selectedTradition.relatedTraditions.map((rel) => {
                const target = data.traditionById[rel.traditionId];
                if (!target) return null;
                return (
                  <article key={rel.traditionId} className="visual-card">
                    <div className="visual-card-media">
                      <img
                        src={getTraditionPlate(target.id, realm)}
                        alt={target.name}
                        className="visual-card-img"
                        loading="lazy"
                      />
                      <span className="media-badge-overlay">{rel.connectionType}</span>
                    </div>
                    <div className="visual-card-content">
                      <h3>{target.name}</h3>
                      <p className="visual-card-hook">{rel.explanation}</p>
                      <div className="folio-card-footer">
                        <span className="mono-meta">{target.eraLabel}</span>
                        <button
                          id={`rel-jump-${target.id}`}
                          type="button"
                          className="btn-ghost"
                          onClick={() =>
                            navigate({ page: 'traditions', traditionSlug: target.id })
                          }
                        >
                          <span>{ui.traditions.exploreBtn}</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </article>
    );
  }

  return (
    <div>
      <header className="page-masthead">
        <div className="page-masthead-copy">
          <span className="folio-kicker">{ui.traditions.kicker}</span>
          <h1>{ui.traditions.heading}</h1>
          <p className="page-lead">{ui.traditions.lead}</p>
        </div>

        <div className="filter-bar">
          <button
            id="trad-filter-all"
            type="button"
            className={eraFilter === 'all' ? 'chip-btn active' : 'chip-btn'}
            onClick={() => setEraFilter('all')}
          >
            {ui.traditions.filterAll(data.traditions.length)}
          </button>
          <button
            id="trad-filter-living"
            type="button"
            className={eraFilter === 'living' ? 'chip-btn active' : 'chip-btn'}
            onClick={() => setEraFilter('living')}
          >
            {ui.traditions.filterLiving}
          </button>
          <button
            id="trad-filter-ancient"
            type="button"
            className={eraFilter === 'ancient' ? 'chip-btn active' : 'chip-btn'}
            onClick={() => setEraFilter('ancient')}
          >
            {ui.traditions.filterAncient}
          </button>
        </div>
      </header>

      <div className="folio-grid-2">
        {filteredTraditions.map((trad) => {
          const count = data.deities.filter((d) => d.traditionId === trad.id).length;
          return (
            <article key={trad.id} className="visual-card">
              <div className="visual-card-media">
                <img
                  src={getTraditionPlate(trad.id, realm)}
                  alt={trad.name}
                  className="visual-card-img"
                  loading="lazy"
                />
                <span className="media-badge-overlay">
                  {trad.folioCode} · {trad.eraLabel}
                </span>
              </div>

              <div className="visual-card-content">
                <div className="visual-card-header-row">
                  <h2 title={trad.name}>{compactTraditionName(trad.name)}</h2>
                  {trad.isLivingTradition ? (
                    <span className="tag-pill verdigris card-pill-nowrap">{ui.traditions.livingBadge}</span>
                  ) : (
                    <span className="tag-pill card-pill-nowrap">{ui.traditions.archivalBadge}</span>
                  )}
                </div>

                <p className="visual-card-hook visual-card-hook-clamped">
                  {data.traditionShortHook[trad.id]}
                </p>

                <div className="row-wrap visual-card-tags">
                  {trad.keyValues.slice(0, 3).map((v) => (
                    <span key={v} className="tag-pill ochre">
                      {v}
                    </span>
                  ))}
                </div>

                <div className="folio-card-footer">
                  <span className="mono-meta">
                    {ui.traditions.cardMeta(count, trad.primaryTexts.length)}
                  </span>
                  <button
                    id={`open-monograph-${trad.id}`}
                    type="button"
                    className="btn-primary"
                    onClick={() => navigate({ page: 'traditions', traditionSlug: trad.id })}
                  >
                    <span>{ui.traditions.openMonograph}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

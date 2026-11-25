import React, { useMemo, useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { MOTIF_PLATE, getRetellingPlate } from '../data/visuals';
import { useI18n } from '../i18n/I18nContext';
import { compactTraditionName, splitTitleHead } from '../i18n/uiStrings';
import type { RouteState, TraditionId } from '../types/mythology';
import type { PantheonFocus } from '../utils/storage';

interface MotifsPageProps {
  pantheonFocus: PantheonFocus;
  activeMotifId: string;
  onSelectMotif: (id: string) => void;
  navigate: (next: RouteState) => void;
}

export const MotifsPage: React.FC<MotifsPageProps> = ({
  pantheonFocus,
  activeMotifId,
  onSelectMotif,
  navigate,
}) => {
  const { ui, data } = useI18n();
  const [traditionFilter, setTraditionFilter] = useState<TraditionId | 'all'>('all');

  const availableMotifs = useMemo(
    () =>
      pantheonFocus === 'all'
        ? data.mythMotifs
        : data.mythMotifs.filter((m) => m.retellings.some((r) => r.traditionId === pantheonFocus)),
    [data.mythMotifs, pantheonFocus]
  );

  const motif = useMemo(
    () =>
      availableMotifs.find((m) => m.id === activeMotifId) ??
      availableMotifs[0] ??
      data.mythMotifs[0],
    [activeMotifId, availableMotifs, data.mythMotifs]
  );

  const visibleRetellings = useMemo(() => {
    if (pantheonFocus !== 'all') {
      return motif.retellings.filter((r) => r.traditionId === pantheonFocus);
    }
    if (traditionFilter === 'all') return motif.retellings;
    return motif.retellings.filter((r) => r.traditionId === traditionFilter);
  }, [motif, pantheonFocus, traditionFilter]);

  return (
    <div>
      <header className="page-masthead">
        <div className="page-masthead-copy">
          <span className="folio-kicker">{ui.motifs.kicker}</span>
          <h1>{ui.motifs.heading}</h1>
          <p className="page-lead">{ui.motifs.lead}</p>
        </div>
      </header>

      <section className="folio-grid-3" aria-label={ui.motifs.heading}>
        {availableMotifs.map((item) => {
          const isSelected = item.id === motif.id;
          return (
            <button
              key={item.id}
              id={`motif-tab-${item.id}`}
              type="button"
              className={
                isSelected ? 'visual-card visual-tile-btn active' : 'visual-card visual-tile-btn'
              }
              onClick={() => {
                onSelectMotif(item.id);
                setTraditionFilter('all');
              }}
            >
              <div className="visual-card-media">
                <img
                  src={MOTIF_PLATE[item.id]}
                  alt={item.title}
                  className="visual-card-img"
                  loading="lazy"
                />
                <span className="media-badge-overlay">{item.folioNumber}</span>
              </div>
              <div className="visual-card-content">
                <div className="row-between">
                  <h2>{splitTitleHead(item.title)}</h2>
                  {isSelected && <span className="tag-pill rubric">{ui.motifs.selected}</span>}
                </div>
                <p className="visual-card-hook">{data.motifShortTagline[item.id]}</p>
              </div>
            </button>
          );
        })}
      </section>

      <section className="visual-split-banner mt-lg" aria-labelledby="active-motif-heading">
        <div>
          <span className="folio-kicker">
            {motif.folioNumber} · {motif.category}
          </span>
          <h2 id="active-motif-heading" className="mt-sm">
            {motif.title}
          </h2>
          <p className="page-lead mt-sm">{motif.comparativeThesis}</p>

          <div className="motif-mechanics-cols">
            <div>
              <span className="folio-kicker">{ui.motifs.sharedInvariants}</span>
              <ul className="motif-list">
                {motif.sharedElements.map((el) => (
                  <li key={el}>{el}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className="folio-kicker">{ui.motifs.culturalDivergences}</span>
              <ul className="motif-list">
                {motif.keyDivergences.map((div) => (
                  <li key={div}>{div}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <figure className="banner-plate-frame">
          <img src={MOTIF_PLATE[motif.id]} alt={motif.title} className="banner-plate-img" />
        </figure>
      </section>

      {pantheonFocus === 'all' && (
        <div className="filter-bar" role="group" aria-label={ui.motifs.heading}>
          <button
            id="motif-trad-all"
            type="button"
            className={traditionFilter === 'all' ? 'chip-btn active' : 'chip-btn'}
            onClick={() => setTraditionFilter('all')}
          >
            {ui.motifs.allCulturesSideBySide(motif.retellings.length)}
          </button>
          {motif.retellings.map((r) => {
            const trad = data.traditionById[r.traditionId];
            return (
              <button
                key={r.traditionId}
                id={`motif-trad-${r.traditionId}`}
                type="button"
                className={traditionFilter === r.traditionId ? 'chip-btn active' : 'chip-btn'}
                onClick={() => setTraditionFilter(r.traditionId)}
              >
                {compactTraditionName(trad?.name)}
              </button>
            );
          })}
        </div>
      )}

      <div className="folio-grid-2">
        {visibleRetellings.map((retelling) => {
          const trad = data.traditionById[retelling.traditionId];
          return (
            <article key={retelling.traditionId} className="visual-card">
              <div className="visual-card-media">
                <img
                  src={getRetellingPlate(motif.id, retelling.traditionId)}
                  alt={retelling.title}
                  className="visual-card-img"
                  loading="lazy"
                />
                <span className="media-badge-overlay">{compactTraditionName(trad?.name)}</span>
              </div>

              <div className="visual-card-content">
                <div className="row-between">
                  <h3>{retelling.title}</h3>
                  <span className="mono-meta">{retelling.primarySource}</span>
                </div>

                <div className="row-wrap">
                  {retelling.keyFigures.map((fig) => (
                    <span key={fig} className="tag-pill ochre">
                      {fig}
                    </span>
                  ))}
                </div>

                <div>
                  <div className="arc-stage-row">
                    <span className="arc-stage-label">{ui.motifs.stage1}</span>
                    <p>{retelling.catalyst}</p>
                  </div>

                  <div className="arc-stage-row">
                    <span className="arc-stage-label">{ui.motifs.stage2}</span>
                    <p>{retelling.ordeal}</p>
                  </div>

                  <div className="arc-stage-row">
                    <span className="arc-stage-label">{ui.motifs.stage3}</span>
                    <p>{retelling.climax}</p>
                  </div>

                  <div className="arc-stage-row">
                    <span className="arc-stage-label">{ui.motifs.stage4}</span>
                    <p>{retelling.cosmicLegacy}</p>
                  </div>
                </div>

                <div className="folio-card-footer">
                  <span className="text-muted">
                    <BookOpen size={13} /> <em>{retelling.philosophicalTheme}</em>
                  </span>
                  <button
                    id={`motif-open-trad-${retelling.traditionId}`}
                    type="button"
                    className="btn-ghost"
                    onClick={() =>
                      navigate({ page: 'traditions', traditionSlug: retelling.traditionId })
                    }
                  >
                    <span>{ui.motifs.monographBtn}</span>
                    <ArrowRight size={13} />
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

import React, { useEffect, useState } from 'react';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { getTraditionPlate } from '../data/visuals';
import { useI18n } from '../i18n/I18nContext';
import type { RouteState, TraditionId } from '../types/mythology';

interface CelestialPantheonWheelProps {
  navigate: (next: RouteState) => void;
}

export const CelestialPantheonWheel: React.FC<CelestialPantheonWheelProps> = ({ navigate }) => {
  const { realm, ui, data, shortTraditionName } = useI18n();
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoCycle, setAutoCycle] = useState(true);

  useEffect(() => {
    if (!autoCycle) return;
    const timer = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % data.traditions.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, [autoCycle, data.traditions.length]);

  const activeTrad = data.traditions[activeIdx];
  const cx = 230;
  const cy = 230;
  const orbitR = 166;

  const activeAngle = -Math.PI / 2 + (activeIdx * 2 * Math.PI) / data.traditions.length;
  const activeOrbX = Number((cx + orbitR * Math.cos(activeAngle)).toFixed(1));
  const activeOrbY = Number((cy + orbitR * Math.sin(activeAngle)).toFixed(1));

  const handleSelectTradition = (idx: number, id?: TraditionId) => {
    setAutoCycle(false);
    setActiveIdx(idx);
    if (id) {
      navigate({ page: 'traditions', traditionSlug: id });
    }
  };

  return (
    <section className="astrolabe-showcase" aria-labelledby="wheel-section-heading">
      <div className="section-heading-row">
        <div>
          <span className="folio-kicker">{ui.home.wheel.kicker}</span>
          <h2 id="wheel-section-heading">{ui.home.wheel.heading}</h2>
        </div>

        <button
          id="wheel-autocycle-btn"
          type="button"
          className="btn-ghost"
          onClick={() => setAutoCycle((a) => !a)}
        >
          {autoCycle ? <Pause size={13} /> : <Play size={13} />}
          <span>{autoCycle ? ui.home.wheel.autoOrbiting : ui.home.wheel.resumeOrbit}</span>
        </button>
      </div>

      <div className="astrolabe-grid">
        <div className="astrolabe-svg-wrap">
          <svg
            viewBox="0 0 460 460"
            className="astrolabe-wheel-svg"
            role="img"
            aria-label={ui.home.wheel.heading}
          >
            <g className="orbit-ring-clockwise">
              <circle cx={cx} cy={cy} r="208" className="astro-ring-dashed" />
              <circle cx={cx} cy={cy} r="196" className="astro-ring-fine" />
            </g>

            <g className="orbit-ring-counter">
              <circle cx={cx} cy={cy} r="126" className="astro-ring-dashed" />
              <path
                d="M 230 92 L 230 368 M 92 230 L 368 230 M 133 133 L 327 327 M 327 133 L 133 327"
                className="astro-spokes"
              />
            </g>

            <circle cx={cx} cy={cy} r={orbitR} className="astro-orbit-track" />

            <line
              x1={cx}
              y1={cy}
              x2={activeOrbX}
              y2={activeOrbY}
              className="astro-pointer-beam"
            />

            <circle cx={cx} cy={cy} r="44" className="astro-core-circle" />
            <text x={cx} y={cy - 4} textAnchor="middle" className="astro-core-kicker">
              {ui.home.wheel.centerLabel}
            </text>
            <text x={cx} y={cy + 14} textAnchor="middle" className="astro-core-num">
              {activeIdx + 1} / 10
            </text>

            {data.traditions.map((trad, idx) => {
              const angle = -Math.PI / 2 + (idx * 2 * Math.PI) / data.traditions.length;
              const nx = Number((cx + orbitR * Math.cos(angle)).toFixed(1));
              const ny = Number((cy + orbitR * Math.sin(angle)).toFixed(1));
              const isSelected = idx === activeIdx;
              const shortName = shortTraditionName(trad.id);

              return (
                <g
                  key={trad.id}
                  id={`wheel-node-${trad.id}`}
                  className={isSelected ? 'astro-orb-group active' : 'astro-orb-group'}
                  onMouseEnter={() => {
                    setAutoCycle(false);
                    setActiveIdx(idx);
                  }}
                  onClick={() => handleSelectTradition(idx)}
                  tabIndex={0}
                  role="button"
                  aria-label={trad.name}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectTradition(idx);
                    }
                  }}
                >
                  <circle cx={nx} cy={ny} r={isSelected ? 30 : 25} className="astro-orb-circle" />
                  <text x={nx} y={ny + 4} textAnchor="middle" className="astro-orb-label">
                    {shortName}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <article className="astrolabe-portal-card" key={activeTrad.id}>
          <div className="astrolabe-portal-media">
            <img
              src={getTraditionPlate(activeTrad.id, realm)}
              alt={activeTrad.name}
              className="astrolabe-portal-img"
            />
            <span className="media-badge-overlay">
              {activeTrad.folioCode} · {activeTrad.eraLabel}
            </span>
          </div>

          <div className="visual-card-content">
            <div className="row-between">
              <h3>{activeTrad.name}</h3>
              {activeTrad.isLivingTradition && (
                <span className="tag-pill verdigris">{ui.home.wheel.livingTradition}</span>
              )}
            </div>

            <p className="visual-card-hook">{data.traditionShortHook[activeTrad.id]}</p>

            <div className="row-wrap">
              {activeTrad.sacredSymbols.slice(0, 3).map((sym) => (
                <span key={sym} className="tag-pill ochre">
                  {sym}
                </span>
              ))}
            </div>

            <div className="folio-card-footer">
              <span className="mono-meta">{activeTrad.region}</span>
              <button
                id={`wheel-enter-${activeTrad.id}`}
                type="button"
                className="btn-primary"
                onClick={() => navigate({ page: 'traditions', traditionSlug: activeTrad.id })}
              >
                <span>{ui.home.wheel.enterGallery(shortTraditionName(activeTrad.id))}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

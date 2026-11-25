import React from 'react';
import { getDeityRadarScores } from '../data/visuals';
import { useI18n } from '../i18n/I18nContext';
import type { ArchetypeId, CosmicRealm, Deity, Tradition } from '../types/mythology';

export const ArchetypeMedallion: React.FC<{
  archetypeId: ArchetypeId;
  size?: number;
}> = ({ archetypeId, size = 42 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className="archetype-medallion-svg"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" className="medallion-ring-outer" />
      <circle cx="24" cy="24" r="18" className="medallion-ring-inner" />

      {archetypeId === 'sky-sovereign' && (
        <g className="medallion-glyph">
          <path d="M26 9L15 25H24L21 39L33 22H24L26 9Z" />
        </g>
      )}

      {archetypeId === 'trickster-guide' && (
        <g className="medallion-glyph">
          <path d="M12 24H36M24 12V36M16 16L32 32M32 16L16 32" />
          <circle cx="24" cy="24" r="4" />
        </g>
      )}

      {archetypeId === 'underworld-ruler' && (
        <g className="medallion-glyph">
          <path d="M15 34V20C15 15 19 11 24 11C29 11 33 15 33 20V34" />
          <path d="M12 34H36M20 34V23M28 34V23" />
        </g>
      )}

      {archetypeId === 'wisdom-order' && (
        <g className="medallion-glyph">
          <path d="M11 24C15 17 20 15 24 15C28 15 33 17 37 24C33 31 28 33 24 33C20 33 15 31 11 24Z" />
          <circle cx="24" cy="24" r="4.5" />
        </g>
      )}

      {archetypeId === 'solar-renewal' && (
        <g className="medallion-glyph">
          <circle cx="24" cy="24" r="6.5" />
          <path d="M24 10V14M24 34V38M10 24H14M34 24H38M14 14L17 17M31 31L34 34M34 14L31 17M17 31L14 34" />
        </g>
      )}

      {archetypeId === 'war-storm' && (
        <g className="medallion-glyph">
          <path d="M16 14H32V21H16V14ZM24 21V36M19 36H29" />
        </g>
      )}
    </svg>
  );
};

const SERIES_CLASSES = ['radar-poly-0', 'radar-poly-1', 'radar-poly-2', 'radar-poly-3'];
const DOT_CLASSES = ['radar-dot-0', 'radar-dot-1', 'radar-dot-2', 'radar-dot-3'];

function polarPoint(cx: number, cy: number, radius: number, index: number, total = 5) {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / total;
  return {
    x: Number((cx + radius * Math.cos(angle)).toFixed(1)),
    y: Number((cy + radius * Math.sin(angle)).toFixed(1)),
  };
}

export const DeityComparisonRadar: React.FC<{ deities: Deity[] }> = ({ deities }) => {
  const { data } = useI18n();
  const cx = 175;
  const cy = 142;
  const maxR = 92;

  return (
    <div className="radar-visual-card">
      <svg
        viewBox="0 0 350 285"
        className="radar-svg"
        role="img"
        aria-label="Five-axis comparative domain chart across selected deities"
      >
        {[0.25, 0.5, 0.75, 1].map((scale) => {
          const pts = [0, 1, 2, 3, 4]
            .map((idx) => {
              const p = polarPoint(cx, cy, maxR * scale, idx);
              return `${p.x},${p.y}`;
            })
            .join(' ');
          return <polygon key={scale} points={pts} className="radar-grid-ring" />;
        })}

        {data.radarAxes.map((label, idx) => {
          const end = polarPoint(cx, cy, maxR, idx);
          const lbl = polarPoint(cx, cy, maxR + 24, idx);
          return (
            <g key={label}>
              <line x1={cx} y1={cy} x2={end.x} y2={end.y} className="radar-spoke" />
              <text x={lbl.x} y={lbl.y + 4} textAnchor="middle" className="radar-axis-label">
                {label}
              </text>
            </g>
          );
        })}

        {deities.map((deity, dIdx) => {
          const scores = getDeityRadarScores(deity);
          const pts = scores
            .map((val, idx) => {
              const p = polarPoint(cx, cy, (val / 5) * maxR, idx);
              return `${p.x},${p.y}`;
            })
            .join(' ');
          const polyClass = SERIES_CLASSES[dIdx % SERIES_CLASSES.length];
          const dotClass = DOT_CLASSES[dIdx % DOT_CLASSES.length];

          return (
            <g key={deity.id}>
              <polygon points={pts} className={`radar-series-poly ${polyClass}`} />
              {scores.map((val, idx) => {
                const p = polarPoint(cx, cy, (val / 5) * maxR, idx);
                return <circle key={idx} cx={p.x} cy={p.y} r="3.5" className={dotClass} />;
              })}
            </g>
          );
        })}
      </svg>

      <div className="radar-legend">
        {deities.map((deity, idx) => (
          <span key={deity.id} className="radar-legend-item">
            <span className={`radar-swatch swatch-${idx % 4}`} />
            <strong>{deity.name}</strong>
          </span>
        ))}
      </div>
    </div>
  );
};

export const CosmologyCrossSectionSvg: React.FC<{ realms: CosmicRealm[]; axisName: string }> = ({
  realms,
  axisName,
}) => {
  const { ui } = useI18n();
  const upper = realms.find((r) => r.tier === 'upper');
  const middle = realms.find((r) => r.tier === 'middle');
  const lower = realms.find((r) => r.tier === 'lower');

  return (
    <svg
      viewBox="0 0 540 270"
      className="cosmology-diagram-svg"
      role="img"
      aria-label={`Three-tier cosmic diagram connected by ${axisName}`}
    >
      <path d="M 30 92 Q 270 8 510 92 L 510 96 L 30 96 Z" className="cosmo-band-upper" />
      <rect x="30" y="106" width="480" height="68" rx="6" className="cosmo-band-middle" />
      <path d="M 30 184 L 510 184 L 480 254 L 60 254 Z" className="cosmo-band-lower" />

      <line x1="270" y1="22" x2="270" y2="250" className="cosmo-axis-pillar" />
      <circle cx="270" cy="64" r="6" className="cosmo-axis-node" />
      <circle cx="270" cy="140" r="6" className="cosmo-axis-node" />
      <circle cx="270" cy="218" r="6" className="cosmo-axis-node" />

      <text x="270" y="54" textAnchor="middle" className="cosmo-tier-kicker">
        {ui.emblems.celestialRealm}
      </text>
      <text x="270" y="80" textAnchor="middle" className="cosmo-tier-title">
        {upper?.name ?? ''}
      </text>

      <text x="270" y="128" textAnchor="middle" className="cosmo-tier-kicker">
        {ui.emblems.mortalMiddleWorld}
      </text>
      <text x="270" y="154" textAnchor="middle" className="cosmo-tier-title">
        {middle?.name ?? ''}
      </text>

      <text x="270" y="208" textAnchor="middle" className="cosmo-tier-kicker">
        {ui.emblems.underworldThreshold}
      </text>
      <text x="270" y="234" textAnchor="middle" className="cosmo-tier-title">
        {lower?.name ?? ''}
      </text>
    </svg>
  );
};

export const ChronoLifespanSvg: React.FC<{
  traditions: Tradition[];
  scrubYear: number;
  onSelectTradition: (id: Tradition['id']) => void;
}> = ({ traditions, scrubYear, onSelectTradition }) => {
  const { locale, shortTraditionName } = useI18n();
  const minY = -3600;
  const maxY = 2026;
  const span = maxY - minY;
  const xForYear = (yr: number) => 155 + ((yr - minY) / span) * 695;
  const markerX = xForYear(scrubYear);

  return (
    <svg
      viewBox="0 0 880 305"
      className="lifespan-chart-svg"
      role="img"
      aria-label="Chronological lifespan bars comparing all ten world mythologies"
    >
      {[-3000, -2000, -1000, 0, 1000, 2000].map((yr) => {
        const x = xForYear(yr);
        const label =
          locale === 'zh'
            ? yr < 0
              ? `前${Math.abs(yr)}`
              : yr === 0
                ? '公元1年'
                : `${yr}年`
            : yr < 0
              ? `${Math.abs(yr)} BCE`
              : yr === 0
                ? '1 CE'
                : `${yr} CE`;
        return (
          <g key={yr}>
            <line x1={x} y1="20" x2={x} y2="275" className="atlas-graticule" />
            <text x={x} y="294" textAnchor="middle" className="lineage-node-role">
              {label}
            </text>
          </g>
        );
      })}

      {traditions.map((trad, idx) => {
        const y = 26 + idx * 25;
        const x1 = xForYear(trad.startYear);
        const x2 = xForYear(trad.endYear);
        const width = Math.max(8, x2 - x1);
        const activeNow = trad.startYear <= scrubYear && trad.endYear >= scrubYear;

        return (
          <g
            key={trad.id}
            className="lifespan-row-group"
            onClick={() => onSelectTradition(trad.id)}
          >
            <text x="144" y={y + 13} textAnchor="end" className="lifespan-row-label">
              {shortTraditionName(trad.id)}
            </text>
            <rect
              x={x1}
              y={y + 2}
              width={width}
              height={14}
              rx="4"
              className={
                activeNow
                  ? 'lifespan-bar active'
                  : trad.isLivingTradition
                    ? 'lifespan-bar living'
                    : 'lifespan-bar'
              }
            />
          </g>
        );
      })}

      <line x1={markerX} y1="14" x2={markerX} y2="280" className="lifespan-scrub-line" />
      <circle cx={markerX} cy="14" r="4.5" className="map-pin-inner" />
    </svg>
  );
};

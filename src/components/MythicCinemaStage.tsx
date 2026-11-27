import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Pause, Play, Sparkles, Zap } from 'lucide-react';
import { assetUrl } from '../data/visuals';
import { useI18n } from '../i18n/I18nContext';
import type { RouteState } from '../types/mythology';

interface CinemaSceneConfig {
  id: string;
  videoSrc: string;
  bestiaryVideoSrc: string;
  posterSrc: string;
  bestiaryPosterSrc: string;
  targetRoute: RouteState;
  useFirstPreset?: boolean;
  pantheonMotifId?: string;
  bestiaryMotifId?: string;
}

const SCENE_CONFIGS: CinemaSceneConfig[] = [
  {
    id: 'axis-mundi',
    videoSrc: '/videos/hero-axis-mundi.mp4',
    bestiaryVideoSrc: '/videos/bestiary-leviathans.mp4',
    posterSrc: '/plates/cosmic-tree-hero.webp',
    bestiaryPosterSrc: '/plates/bestiary/cinema-leviathans.webp',
    targetRoute: { page: 'lineages' },
  },
  {
    id: 'storm-gods',
    videoSrc: '/videos/reel-storm-gods.mp4',
    bestiaryVideoSrc: '/videos/bestiary-hydras.mp4',
    posterSrc: '/plates/motif-chaoskampf.webp',
    bestiaryPosterSrc: '/plates/bestiary/cinema-hydras.webp',
    targetRoute: { page: 'deities' },
    useFirstPreset: true,
  },
  {
    id: 'solar-barque',
    videoSrc: '/videos/reel-solar-barque.mp4',
    bestiaryVideoSrc: '/videos/bestiary-duat.mp4',
    posterSrc: '/plates/trad-egyptian.webp',
    bestiaryPosterSrc: '/plates/bestiary/cinema-duat.webp',
    targetRoute: { page: 'atlas' },
  },
  {
    id: 'amaterasu-dawn',
    videoSrc: '/videos/reel-amaterasu-dawn.mp4',
    bestiaryVideoSrc: '/videos/bestiary-yokai.mp4',
    posterSrc: '/plates/trad-japanese.webp',
    bestiaryPosterSrc: '/plates/bestiary/cinema-yokai.webp',
    targetRoute: { page: 'motifs' },
    pantheonMotifId: 'katabasis',
    bestiaryMotifId: 'shapeshifters',
  },
];

interface EmberMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
}

interface LightningBolt {
  segments: { x1: number; y1: number; x2: number; y2: number }[];
  ringX: number;
  ringY: number;
  life: number;
}

interface MythicCinemaStageProps {
  navigate: (next: RouteState) => void;
  onApplyPreset: (deityIds: string[]) => void;
  onSelectMotif: (motifId: string) => void;
}

export const MythicCinemaStage: React.FC<MythicCinemaStageProps> = ({
  navigate,
  onApplyPreset,
  onSelectMotif,
}) => {
  const { realm, ui, cinemaScenes, data } = useI18n();
  const [sceneIdx, setSceneIdx] = useState(0);
  const [isMotionPaused, setIsMotionPaused] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -999,
    y: -999,
    active: false,
  });
  const boltsRef = useRef<LightningBolt[]>([]);

  const activeConfig = SCENE_CONFIGS[sceneIdx];
  const activeText = cinemaScenes[activeConfig.id];
  const activeVideo = assetUrl(
    realm === 'bestiary' ? activeConfig.bestiaryVideoSrc : activeConfig.videoSrc
  );
  const activePoster = assetUrl(
    realm === 'bestiary' ? activeConfig.bestiaryPosterSrc : activeConfig.posterSrc
  );

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isMotionPaused) {
      vid.pause();
    } else {
      vid.play().catch(() => {
        // Autoplay prevented; poster + Ken Burns handles gracefully
      });
    }
  }, [sceneIdx, isMotionPaused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = stageRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.clientWidth || 960;
    let height = container.clientHeight || 520;

    const resize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth || 960;
      height = container.clientHeight || 520;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    const motes: EmberMote[] = Array.from({ length: 56 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: -0.25 - Math.random() * 0.55,
      r: 1.2 + Math.random() * 2.3,
      alpha: 0.3 + Math.random() * 0.55,
    }));

    let rafId = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!isMotionPaused) {
        const ptr = pointerRef.current;

        for (let i = 0; i < motes.length; i++) {
          const m = motes[i];
          m.x += m.vx;
          m.y += m.vy;

          if (ptr.active) {
            const dx = ptr.x - m.x;
            const dy = ptr.y - m.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 150 && dist > 1) {
              m.x += (dx / dist) * 0.55;
              m.y += (dy / dist) * 0.55;

              ctx.beginPath();
              ctx.moveTo(m.x, m.y);
              ctx.lineTo(ptr.x, ptr.y);
              ctx.strokeStyle = `rgba(236, 194, 118, ${((1 - dist / 150) * 0.34).toFixed(3)})`;
              ctx.lineWidth = 0.9;
              ctx.stroke();
            }
          }

          if (m.y < -10) {
            m.y = height + 10;
            m.x = Math.random() * width;
          }
          if (m.x < -10) m.x = width + 10;
          if (m.x > width + 10) m.x = -10;

          ctx.beginPath();
          ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 208, 138, ${m.alpha})`;
          ctx.fill();
        }

        const remainingBolts: LightningBolt[] = [];
        for (const bolt of boltsRef.current) {
          bolt.life -= 0.045;
          if (bolt.life <= 0) continue;
          remainingBolts.push(bolt);

          ctx.save();
          ctx.strokeStyle = `rgba(255, 232, 175, ${bolt.life})`;
          ctx.shadowColor = 'rgba(224, 152, 67, 0.9)';
          ctx.shadowBlur = 14;
          ctx.lineWidth = 2.3 * bolt.life + 0.6;
          ctx.beginPath();
          for (const seg of bolt.segments) {
            ctx.moveTo(seg.x1, seg.y1);
            ctx.lineTo(seg.x2, seg.y2);
          }
          ctx.stroke();

          const radius = (1 - bolt.life) * 78 + 8;
          ctx.beginPath();
          ctx.arc(bolt.ringX, bolt.ringY, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(236, 184, 104, ${bolt.life * 0.75})`;
          ctx.lineWidth = 1.6;
          ctx.stroke();
          ctx.restore();
        }
        boltsRef.current = remainingBolts;
      }

      rafId = window.requestAnimationFrame(render);
    };

    rafId = window.requestAnimationFrame(render);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [isMotionPaused]);

  const spawnLightningAt = (targetX: number, targetY: number) => {
    if (isMotionPaused) return;
    const segments: { x1: number; y1: number; x2: number; y2: number }[] = [];
    let currX = targetX + (Math.random() - 0.5) * 140;
    let currY = 0;
    const steps = 9;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const nextX =
        i === steps
          ? targetX
          : currX + (targetX - currX) * (1 / (steps - i + 1)) + (Math.random() - 0.5) * 44;
      const nextY = targetY * t;
      segments.push({ x1: currX, y1: currY, x2: nextX, y2: nextY });

      if (i > 2 && i < steps - 1 && Math.random() > 0.5) {
        segments.push({
          x1: nextX,
          y1: nextY,
          x2: nextX + (Math.random() - 0.5) * 65,
          y2: nextY + 28 + Math.random() * 25,
        });
      }
      currX = nextX;
      currY = nextY;
    }
    boltsRef.current.push({ segments, ringX: targetX, ringY: targetY, life: 1 });
  };

  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    spawnLightningAt(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handlePrimaryAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeConfig.useFirstPreset && data.comparisonPresets[0]) {
      onApplyPreset(data.comparisonPresets[0].deityIds);
    }
    const targetMotif =
      realm === 'bestiary' ? activeConfig.bestiaryMotifId : activeConfig.pantheonMotifId;
    if (targetMotif) {
      onSelectMotif(targetMotif);
    }
    navigate(activeConfig.targetRoute);
  };

  return (
    <section className="cinema-stage-wrapper" aria-labelledby="cinema-hero-title">
      <div
        ref={stageRef}
        className={isMotionPaused ? 'cinema-viewport paused' : 'cinema-viewport'}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          pointerRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            active: true,
          };
        }}
        onMouseLeave={() => {
          pointerRef.current.active = false;
        }}
        onClick={handleStageClick}
      >
        {!videoFailed ? (
          <video
            key={activeVideo}
            ref={videoRef}
            className="cinema-video-bg"
            src={activeVideo}
            poster={activePoster}
            autoPlay={!isMotionPaused}
            loop
            muted
            playsInline
            onError={() => setVideoFailed(true)}
          />
        ) : (
          <img
            key={activePoster}
            src={activePoster}
            alt={activeText.title}
            className="cinema-kenburns-fallback"
          />
        )}

        <div className="cinema-scrim" />
        <canvas ref={canvasRef} className="cinema-fx-canvas" aria-hidden="true" />

        <div className="cinema-top-bar" onClick={(e) => e.stopPropagation()}>
          <span className="cinema-live-badge">
            <Sparkles size={13} />
            <span>
              {activeText.roman} · {ui.home.interactiveStage}
            </span>
          </span>

          <div className="row-wrap">
            <button
              id="cinema-summon-bolt-btn"
              type="button"
              className="cinema-ctrl-btn"
              onClick={() => spawnLightningAt(260 + Math.random() * 380, 180 + Math.random() * 140)}
            >
              <Zap size={13} />
              <span>{ui.home.strikeLightning}</span>
            </button>

            <button
              id="cinema-pause-toggle-btn"
              type="button"
              className="cinema-ctrl-btn"
              onClick={() => setIsMotionPaused((p) => !p)}
            >
              {isMotionPaused ? <Play size={13} /> : <Pause size={13} />}
              <span>{isMotionPaused ? ui.home.resumeMotion : ui.home.pauseMotion}</span>
            </button>
          </div>
        </div>

        <div className="cinema-overlay-copy" onClick={(e) => e.stopPropagation()}>
          <h1 id="cinema-hero-title">{activeText.title}</h1>
          <p className="cinema-caption">{activeText.caption}</p>

          <div className="row-wrap mt-md">
            <button
              id="cinema-primary-cta-btn"
              type="button"
              className="btn-cinema-gold"
              onClick={handlePrimaryAction}
            >
              <span>{activeText.primaryCtaLabel}</span>
              <ArrowRight size={16} />
            </button>

            <button
              id="cinema-secondary-traditions-btn"
              type="button"
              className="btn-cinema-glass"
              onClick={() => navigate({ page: 'traditions' })}
            >
              <span>{ui.home.browse10Pantheons}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="cinema-reel-strip" role="tablist" aria-label="Choose Animated Mythic Scene">
        {SCENE_CONFIGS.map((sc, idx) => {
          const isActive = idx === sceneIdx;
          const scText = cinemaScenes[sc.id];
          const thumbSrc = assetUrl(realm === 'bestiary' ? sc.bestiaryPosterSrc : sc.posterSrc);
          return (
            <button
              key={sc.id}
              id={`cinema-scene-tab-${sc.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={isActive ? 'cinema-reel-tab active' : 'cinema-reel-tab'}
              onClick={() => {
                setVideoFailed(false);
                setSceneIdx(idx);
              }}
            >
              <img src={thumbSrc} alt="" className="cinema-reel-thumb" />
              <div>
                <span className="folio-kicker">{scText.roman}</span>
                <strong>{scText.shortLabel}</strong>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

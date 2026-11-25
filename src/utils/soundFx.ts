// Zero-dependency Web Audio API synthesizer for subtle tabletop polyhedral dice & bronze chimes.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (Ctor) {
      audioCtx = new Ctor();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playDiceClatter(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  // 5 crisp obsidian-on-wood polyhedral clicks
  const offsets = [0, 0.08, 0.17, 0.28, 0.41];
  offsets.forEach((off, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520 + idx * 85, now + off);
    osc.frequency.exponentialRampToValueAtTime(160, now + off + 0.045);

    gain.gain.setValueAtTime(0.08, now + off);
    gain.gain.exponentialRampToValueAtTime(0.001, now + off + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + off);
    osc.stop(now + off + 0.05);
  });
}

export function playCheckSuccess(isCritical = false): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const freqs = isCritical ? [392, 493.88, 587.33, 783.99] : [329.63, 440, 554.37];

  freqs.forEach((f, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, now + idx * 0.06);

    gain.gain.setValueAtTime(0.09, now + idx * 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + idx * 0.06);
    osc.stop(now + idx * 0.06 + 0.48);
  });
}

export function playCheckFail(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  [196, 146.83].forEach((f, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(f, now + idx * 0.11);

    gain.gain.setValueAtTime(0.055, now + idx * 0.11);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.11 + 0.36);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + idx * 0.11);
    osc.stop(now + idx * 0.11 + 0.38);
  });
}

export function playEndingGong(tier: 'deity' | 'alternate' | 'failure'): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const chord =
    tier === 'deity'
      ? [220, 329.63, 440, 659.25]
      : tier === 'alternate'
        ? [220, 293.66, 392]
        : [130.81, 155.56, 196];

  chord.forEach((f) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, now);

    gain.gain.setValueAtTime(0.075, now);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 1.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1.4);
  });
}

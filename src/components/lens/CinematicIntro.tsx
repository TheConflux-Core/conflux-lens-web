'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const EMBLEM = '/original-emblem.png';  // Circular CONFLUX/LENS

// ─── Particle burst ─────────────────────────────────────────────────────────
function emitBurst(canvas: HTMLCanvasElement | null, cx: number, cy: number) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth, h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);

  const particles = Array.from({ length: 120 }, () => ({
    x: cx, y: cy,
    vx: (Math.random() - 0.5) * 30,
    vy: (Math.random() - 0.5) * 30 - 8,
    life: 1,
    decay: 0.007 + Math.random() * 0.015,
    r: 2 + Math.random() * 4,
    hue: 36 + Math.random() * 18,
  }));

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    let alive = false;
    for (const p of particles) {
      if (p.life <= 0) continue;
      alive = true;
      p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life -= p.decay;
      const r = Math.max(0, p.r * p.life);
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 92%, 68%, ${Math.max(0, p.life * 0.85)})`;
      ctx.fill();
    }
    if (alive) requestAnimationFrame(draw);
  };
  draw();
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function CinematicIntro() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLImageElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // ─── Skip conditions ─────────────────────────────────────────────────
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      console.log('[CinematicIntro] skipping — reduced-motion');
      return;
    }

    // ─── Refs must be live (refs attach before effect runs in React 19) ───
    const overlay = overlayRef.current!;
    const emblem  = emblemRef.current!;
    const flash   = flashRef.current!;
    const W       = window.innerWidth;

    console.log('[CinematicIntro] ▶  running');

    // ─── Initial states ───────────────────────────────────────────────────
    gsap.set(overlay, { opacity: 0, zIndex: 10000 });
    gsap.set(emblem, { xPercent: -50, yPercent: -50, left: '50%', top: '50%' });
    gsap.set(emblem, { opacity: 0, scale: 0, rotation: 0 });
    gsap.set(flash, { opacity: 0, scale: 0.5, transformOrigin: '50% 50%' });

    const tl = gsap.timeline({
      onComplete: () => {
        console.log('[CinematicIntro] ■ complete');
        setTimeout(() => { overlay.style.display = 'none'; }, 300);
      },
    });

    // ── T+0.0 — fade in black
    tl.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' });

    // ── T+0.35 — emblem springs into center with a slight rotational unwind
    tl.to(emblem, {
      opacity: 1, scale: 1, rotation: 0,
      duration: 0.9, ease: 'back.out(1.7)',
    }, 0.35);

    // ── T+1.1 — gold glow bloom
    tl.to(emblem, {
      filter: 'drop-shadow(0 0 28px rgba(212,175,55,0.55))',
      duration: 0.4,
    }, 1.1);

    // ── T+1.5 — particle burst from center
    tl.add(() => {
      console.log('[CinematicIntro] 💥 burst');
      emitBurst(burstRef.current, W * 0.5, window.innerHeight * 0.5);
    }, 1.5);

    // ── T+2.0 — intensify glow, brief breathing hold
    tl.to(emblem, {
      filter: 'drop-shadow(0 0 42px rgba(212,175,55,0.75))',
      duration: 0.5,
    }, 2.0);

    // ── T+2.8 — boom: scale up and white flash
    tl.to(emblem, { scale: 2.8, opacity: 0, duration: 0.4, ease: 'power2.inOut' }, 2.8);
    tl.to(flash, { opacity: 0.97, scale: 2.5, duration: 0.25, ease: 'power3.out' }, 3.0);

    // ── T+3.2 — flash dissolves, hero revealed
    tl.to(flash, { opacity: 0, scale: 7, duration: 0.2 }, 3.2);
    tl.to(overlay, { opacity: 0, duration: 0.25, ease: 'power2.in' }, 3.15);

    return () => { tl.kill(); console.log('[CinematicIntro] cleanup'); };
  }, []);

  return (
    <div ref={overlayRef} className="cinematic-intro">
      <div className="cinematic-black" />
      <canvas ref={burstRef} className="burst-canvas absolute inset-0" />
      <div ref={flashRef} className="cinematic-flash" />
      <img
        ref={emblemRef}
        src={EMBLEM}
        alt="Conflux Lens"
        className="intro-emblem"
      />
    </div>
  );
}

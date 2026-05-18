'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const EMBLEM_1 = '/conflux-emblem.png';   // Lens+crosshair
const EMBLEM_2 = '/original-emblem.png';  // Circular CONFLUX/LENS
const SKIP_KEY = 'conflux-lens:hasSeenIntro';

// ─── Particle burst ─────────────────────────────────────────────────────────
function emitBursts(canvas: HTMLCanvasElement | null, cx: number, cy: number) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth, h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);

  const particles = Array.from({ length: 80 }, () => ({
    x: cx, y: cy,
    vx: (Math.random() - 0.5) * 26,
    vy: (Math.random() - 0.5) * 26 - 6,
    life: 1,
    decay: 0.009 + Math.random() * 0.018,
    r: 2 + Math.random() * 3,
    hue: 36 + Math.random() * 18,
  }));

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    let alive = false;
    for (const p of particles) {
      if (p.life <= 0) continue;
      alive = true;
      p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life -= p.decay;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 92%, 68%, ${p.life * 0.85})`;
      ctx.fill();
    }
    if (alive) requestAnimationFrame(draw);
  };
  draw();
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function CinematicIntro() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const e1Ref    = useRef<HTMLImageElement>(null);
  const e2Ref    = useRef<HTMLImageElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const b1Ref    = useRef<HTMLCanvasElement>(null);
  const b2Ref    = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // ─── Skip conditions ─────────────────────────────────────────────────
    if (typeof window === 'undefined') return;
    if (window.sessionStorage.getItem(SKIP_KEY) === 'true') {
      console.log('[CinematicIntro] skipping — seen this session');
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      console.log('[CinematicIntro] skipping — reduced-motion');
      return;
    }

    // ─── Refs must be live (refs attach before effect runs in React 19) ───
    const overlay = overlayRef.current!;
    const em1     = e1Ref.current!;
    const em2     = e2Ref.current!;
    const flash   = flashRef.current!;
    const W = window.innerWidth;

    console.log('[CinematicIntro] ▶  running — window:', W, 'innerH:', window.innerHeight);
    console.log('  overlay:', overlay, 'em1:', em1, 'em2:', em2, 'flash:', flash);

    // ─── Initial states ───────────────────────────────────────────────────
    gsap.set(overlay, { opacity: 0, zIndex: 10000 });
    gsap.set([em1, em2], { xPercent: -50, yPercent: -50 });

    gsap.set(em1, {
      left: '50%', top: '50%',
      x: -W * 0.42, opacity: 0, scale: 0, rotation: -35
    });
    gsap.set(em2, {
      left: '50%', top: '50%',
      x:  W * 0.42, opacity: 0, scale: 0, rotation:  35
    });
    gsap.set(flash, { opacity: 0, scale: 0.5, transformOrigin: '50% 50%' });

    const tl = gsap.timeline({
      onComplete: () => {
        window.sessionStorage.setItem(SKIP_KEY, 'true');
        console.log('[CinematicIntro] ■ complete — flag set');
        setTimeout(() => { overlay.style.display = 'none'; }, 300);
      },
    });

    // ── T+0.0 — fade in black
    tl.to(overlay, { opacity: 1, duration: 0.4, ease: 'power2.out' });

    // ── T+0.4 — both emblems spring in
    tl.to(em1, {
      opacity: 1, scale: 1, rotation: 0, x: -W * 0.28,
      duration: 0.9, ease: 'back.out(1.7)'
    }, 0.4);
    tl.to(em2, {
      opacity: 1, scale: 1, rotation: 0, x:  W * 0.28,
      duration: 0.9, ease: 'back.out(1.5)'
    }, 0.4);

    // ── T+1.2 — gold glow bloom
    tl.to([em1, em2], {
      filter: 'drop-shadow(0 0 28px rgba(212,175,55,0.55))',
      duration: 0.4
    }, 1.2);

    // ── T+1.5 — particle bursts
    tl.add(() => {
      const r1 = em1.getBoundingClientRect();
      const r2 = em2.getBoundingClientRect();
      console.log('[CinematicIntro] 💥 bursts at', r1.left, r2.left);
      emitBursts(
        b1Ref.current,
        r1.left + r1.width * 0.5, r1.top + r1.height * 0.5
      );
      emitBursts(
        b2Ref.current,
        r2.left + r2.width * 0.5, r2.top + r2.height * 0.5
      );
    }, 1.5);

    // ── T+2.3 — cross-fade: em1 out, em2 dominant
    tl.to(em1, {
      opacity: 0, scale: 0.8, x: -W * 0.38,
      duration: 0.55, ease: 'power2.in'
    }, 2.3);
    tl.to(em2, {
      x: 0, scale: 1.12,
      filter: 'drop-shadow(0 0 38px rgba(212,175,55,0.7))',
      duration: 0.7, ease: 'power3.out'
    }, 2.3);

    // ── T+3.2 — emblem 2 breathing hold (1s)
    tl.to(
      { t: 0 },
      {
        t: 1,
        duration: 1,
        onUpdate() { gsap.set(em2, { scale: 1.12 + Math.sin(this.progress() * Math.PI * 3) * 0.025 }); },
      },
      3.2
    );

    // ── T+4.3 — scale up to white flash
    tl.to(em2, { scale: 2.6, opacity: 0, duration: 0.45, ease: 'power2.inOut' }, 4.3);
    tl.to(flash, { opacity: 0.97, scale: 2.5, duration: 0.28, ease: 'power3.out' }, 4.53);

    // ── T+4.8 — flash dissolves, hero revealed
    tl.to(flash, { opacity: 0, scale: 7, duration: 0.22 }, 4.8);
    tl.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 4.75);

    return () => { tl.kill(); console.log('[CinematicIntro] cleanup'); };
  }, []);

  return (
    <div ref={overlayRef} className="cinematic-intro">
      <div className="cinematic-black" />
      <canvas ref={b1Ref} className="burst-canvas absolute inset-0" />
      <canvas ref={b2Ref} className="burst-canvas absolute inset-0" />
      <div ref={flashRef} className="cinematic-flash" />
      <img
        ref={e1Ref}
        src={EMBLEM_1}
        alt="Conflux Lens emblem"
        className="intro-emblem"
      />
      <img
        ref={e2Ref}
        src={EMBLEM_2}
        alt="Conflux Lens"
        className="intro-emblem"
      />
    </div>
  );
}

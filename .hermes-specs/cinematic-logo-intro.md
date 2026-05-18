# Cinematic Logo Intro & Background Treatment — Conflux Lens

## The Ask

1. **Cinematic first-load intro** — both logos animate on screen together the first time someone opens the site across both versions.
2. **Background hero treatment** — the glass/lens emblem becomes a rich animated backdrop in the `Hero` section.

---

## What We're Working With

| Asset | Location | Notes |
|---|---|---|
| `public/conflux-emblem.png` | freshly cropped 600×600 | Conflux circular + CONFLUX/LENS text + orbital sun + crosshairs |
| `public/original-emblem.png` | freshly saved from the image user sent | Black/gold Art Deco → we'll save this too |
| Hero already has a 3D scene | `Hero3D.tsx` | Gold icosahedron, particles, glow ring |
| Stack | Three.js `^0.184`, R3F `@^10`, GSAP `^3`, Framer Motion `^12` | Nothing new to install |

---

## Plan of Attack

### Phase 1 — Asset Prep

1. Save **both** PNG variants to `public/` with clear names
2. Crop each to tight square, no transparent padding
3. Confirm both are accessible from `/` so `next/image` or `<img>` can load them
4. Public functions on the emblems over Cin

### Phase 2 — Cinematic Loading Intro (One-Time Per Visitor)

Build `src/components/lens/CinematicIntro.tsx`:

```
Full-screen fixed overlay (z: 9998, below grain overlay at 9999)
=====================================================
T=0.0 — Fade in from black (0.6s)
T=0.6 — Both emblem images spawn, scale from 0 → 1 with stagger
        [emblem 1] spin-in from angle −30° with gold particle burst (THREE.Points)
        [emblem 2] slide up from below, gold particle burst
T=1.8 — Both glow / pulsing gold light wash fades in
T=2.8 — Slow cross-dissolve: emblem 1 → emblem 2
T=4.2 — Emblem 2 held for 800ms of calm breathing
T=5.0 — Emblem 2 scales up fast, fades to white flash → black
T=5.3 — Overlay slides up, Hero content underneath
    
localStorage('conflux-lens:hasSeenIntro') = true  (set before slide starts)
```

Key implementation decisions:
- Use **R3F `<Html>`** or **absolute-positioned `<img>`** for the two logo variants
- Use a **separate THREE.Points** burst for each spawn animation
- Use a **THREE.Sprite** full-screen gold flash at the flash point
- GSAP timeline on a `useLayoutEffect` — all CSS `opacity`/`transform`, R3F values are R3F-compatible
- Skip entire component on revisit (return `null`)
- Also respect `prefers-reduced-motion` — skip or shorten intro

### Phase 3 — Hero Background Upgrade

Layer the **Conflux emblem (crosshair + orbital)** into `Hero3D.tsx` as a **scrolling large ring** behind the hero content, between the existing `SlowParticles` and the icosahedron core:

```
Layer order (back to front):
1. SlowParticles — 200 of them, barely visible float
2. Large emblem ring — 2D ImageTexture or CanvasTexture on a plane, 
    rotates slowly, glows at edges
3. LensCore (icosahedron distort) — existing
4. SubtleGlowRing (torus) — existing
5. Text/content (z-index via CSS/HTML)
```

Implement as a `HeroEmblemRing` component that uses `useLoader(THREE.TextureLoader, '/conflux-emblem.png')` applied to an `THREE.PlaneGeometry` or `THREE.RingGeometry` with opacity/blending for a dreamy look. Or — simpler and sharper — use a `<Html>` positioned element that overlays the canvas, animated with Framer Motion.

---

## Updated File List

| File | Action |
|---|---|
| `src/components/lens/CinematicIntro.tsx` | **CREATE** — full-screen loading sequence |
| `src/components/lens/Hero3D.tsx` | **PATCH** — add emblem ring / background layers |
| `src/app/layout.tsx` | **PATCH** — gutter CinematicIntro above `<body>` children |
| `public/conflux-emblem.png` | **CREATE** — lens+crosshair variant (existing img saved properly) |
| `public/original-emblem.png` | **CREATE** — original conflux+CONFLUX/LENS variant |
| `src/app/globals.css` | **PATCH** — add `.cinematic-intro` / `.intro-overlay` CSS |

---

## Anti-Patterns

- **No hardcoded delays without GSAP timeline** — all timing driven by one master `gsap.timeline()`
- **No SSR issues** — CinematicIntro is `'use client'`, wrapped in `{typeof window !== 'undefined' && <CinematicIntro />}`
- **No blocking main thread** — intro runs on GPU, JS work is zero after mount
- **No flash of content** — layout.tsx loads CinematicIntro above everything, site only renders after intro declares done
- **No broken image alt** — both logos need `alt` text per WCAG

---

## Open Question for Don

1. *Which emblem is primary?* The Lens+crosshair one feels more brand-specific; the circular CONFLUX/LENS one feels more ceremonial. Both shown is yes?
2. *Intro duration happy?* 5.5 seconds is long — can dial down to 3.5s to stay snappy
3. On *revisit* — should the intro show if there hasn't been a 7-day gap? (`sessionStorage` vs `localStorage`) — currently I lean `sessionStorage` (never in same session, skip forever)

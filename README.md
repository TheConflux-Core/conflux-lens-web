<!--
  ____            _       _____                       _    
 |  _ \ ___  _ __| |_    / ____|                     | |   
 | |_) / _ \| / _` | |  | (___   ___ ___ _ __   ___  | |_  
 |  _ < (_) | | (_| | |   \___ \ / __/ _ \ '_ \ / _ \ | __| 
 | |_) \__, |_\__,_|_|   ____) | (_|  __/ | | | (_) || |_  
 |____/  /_/            |_____/ \___\___|_| |_|\___/ \__| 
                                                                              
Conflux Lens Website — Landing page + dashboard for the AI agent HTTP proxy
-->

<div align="center">

<img src="https://github.com/TheConflux-Core/conflux-lens-web/raw/main/public/logo.svg" width="120" alt="Conflux Lens Logo">

# <span style="color:#F4D03F">Conflux Lens</span> <span style="color:#888">for AI Agents</span>

> **See Through the AI Black Box**  
> Inspect every request, response, token, and tool call — in real time.

[![GitHub stars](https://img.shields.io/github/stars/TheConflux-Core/conflux-lens-web?style=flat-square&color=F4D03F)](https://github.com/TheConflux-Core/conflux-lens-web/stargazers)
[![MIT License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.184.0-black?style=flat-square&logo=three.js)](https://threejs.org/)

</div>

---

## 🎯 What Is This?

This is the **official website + live dashboard** for [**Conflux Lens**](https://github.com/TheConflux-Core/conflux-lens) — the HTTP proxy that gives you X-ray vision into AI agent traffic.

Built with **Next.js 16**, **React 19**, **Tailwind v4**, and **Three.js** (yes, there's a spinning 3D lens in the hero — because seeing through black boxes should look cool).

<div align="center">
<img src="https://github.com/TheConflux-Core/conflux-lens-web/raw/main/screenshots/hero-3d.png" width="800" alt="Conflux Lens Hero with 3D spinning lens">
</div>

---

## ✨ Why This Site Exists

**Conflux Lens** (the core project) is a powerful tool. But tools need homes. This website:

- **Shows it off** — beautiful landing page with animated 3D hero, glassmorphic cards, and cinematic scroll
- **Hosts the dashboard** — the real-time UI that displays live agent traffic when you run the proxy
- **Documents everything** — quick start, SDK reference, feature breakdown, comparison to BurpSuite
- **Open source showcase** — MIT licensed, built in public, ready to fork

---

## 🚀 Quick Start — For Visitors

Want to **see Conflux Lens in action**? Clone the core project, not this website:

```bash
# 1. Clone the actual Conflux Lens project (the proxy)
git clone https://github.com/TheConflux-Core/conflux-lens.git
cd conflux-lens

# 2. Install dependencies
npm install

# 3. Build and run
npm run build
npm start

# 4. Open the dashboard
open http://localhost:3000
# or visit: http://localhost:3000  (if you already see this website running)
```

**This repo (`conflux-lens-web`) is the website code only.**  
The **actual proxy + SDK** lives in: 👉 **[github.com/TheConflux-Core/conflux-lens](https://github.com/TheConflux-Core/conflux-lens)**

---

## 💎 Features (Website)

This is not just a static page. It's a full Next.js app:

| Feature | Tech |
|---------|------|
| **3D Animated Hero** | Three.js + React Three Fiber + MeshDistortMaterial |
| **Smooth Scrolling** | Framer Motion (page reveal animations, staggered cards) |
| **Responsive Layout** | Tailwind v4 (mobile → desktop → wide-screen) |
| **Glassmorphism UI** | Custom border gradients, blur effects, radial overlays |
| **Live Dashboard** | Real-time request feed, token counters, cost tracking |
| **Developer Docs** | Syntax-highlighted code blocks, feature comparison tables |

---

## 🏗️ Tech Stack

<div align="center">

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Runtime** | React 19 |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion 12 |
| **3D Graphics** | Three.js + @react-three/fiber + @react-three/drei |
| **Icons** | Lucide React |
| **Code Highlight** | Prism React Renderer |
| **Language** | TypeScript |

</div>

---

## 📁 Project Structure

```
conflux-lens-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout (fonts, metadata)
│   │   ├── page.tsx          # Landing page entry
│   │   ├── globals.css       # Global styles + Tailwind imports
│   │   └── favicon.ico
│   └── components/
│       └── lens/
│           ├── Navigation.tsx      # Top nav bar
│           ├── Hero.tsx            # Hero section (with dynamic 3D import)
│           ├── Hero3D.tsx          # Three.js 3D spinning lens scene
│           ├── Features.tsx        # 6 feature cards
│           ├── QuickStart.tsx      # Step-by-step install guide
│           ├── SDK.tsx             # Code examples tabbed UI
│           ├── Compare.tsx         # Feature comparison table
│           └── Footer.tsx          # Footer with links
├── public/                     # Static assets (SVGs, icons)
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md                  # You are here
```

---

## 🎨 Design System

The Conflux Lens visual identity is all about **seeing through the dark**:

- **Primary Gold** `#F4D03F` — the lens glare, buttons, highlights
- **Deep Black** `#050505` — the black box being penetrated
- **Text White** `#FAFAFA` — what you see when you look through
- **Muted Gray** `#888` — supporting text, subtle UI elements
- **Accent Cyan** `#22D3EE` — trust indicators, healthy states

Key visual motifs:
- **Radial gradients** — light emanating from the center (the lens focus)
- **Glass panels** — semi-transparent surfaces with backdrop blur
- **Animated shimmer** — gold-to-white gradient sweep on key headlines
- **Grid patterns** — subtle background texture suggesting structure

---

## 🛠️ Development

Want to modify the website? (Go for it.)

```bash
# Clone this repo
git clone https://github.com/TheConflux-Core/conflux-lens-web.git
cd conflux-lens-web

# Install dependencies
npm install

# Run dev server (auto-reload on changes)
npm run dev

# Build for production
npm run build
npm start
```

**Dev server runs at:** `http://localhost:3000` (or `3001` if `3000` is busy)

---

## 🔗 Related Projects

| Project | Description | Link |
|---------|-------------|------|
| **Conflux Lens (Core)** | The actual HTTP proxy + SDK — what this website is for | [![GitHub](https://img.shields.io/badge/🔗_Core_Project-black?style=flat-square)](https://github.com/TheConflux-Core/conflux-lens) |
| **Conflux Home** | The desktop app that houses the agent runtime | [![GitHub](https://img.shields.io/badge/🏠_Conflux_Home-dark?style=flat-square)](https://github.com/TheConflux-Core/conflux-home) |
| **OpenClaw** | The underlying multi-agent orchestration framework | [![GitHub](https://img.shields.io/badge/🐺_OpenClaw-gray?style=flat-square)](https://github.com/TheConflux-Core/openclaw) |

---

## 📄 License

This project (the website) is **MIT Licensed**.  
The core [Conflux Lens](https://github.com/TheConflux-Core/conflux-lens) project is also MIT.

---

<div align="center">

**Built with ❤️ by [The Conflux](https://github.com/TheConflux-Core)**  
For the AI agent developer who wants to see *everything*.

[⬆ Back to top](#-conflux-lens--for-ai-agents-)

</div>

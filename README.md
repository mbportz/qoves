# Qoves Landing Page

Single-page marketing experience for Qoves facial analysis. Built with Next.js, TypeScript, SCSS, GSAP, and Recharts.

## Quick start

```bash
npm install
npm run dev
```

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Development server ([localhost:3000](http://localhost:3000)) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run sync:videos` | Copies `src/assets/video/landing-video.mp4` → `public/videos` (runs before `dev` / `build`) |

---

## Architecture

The app follows a **feature-first** layout: route shell in `app/`, reusable UI in `components/`, page sections in `features/`, cross-cutting concerns in `lib/` and `styles/`.

```txt
src/app/                 → routing, root layout, global styles entry
src/features/landing/    → page sections (hero, analysis, faq, philosophy)
src/components/          → shared UI, layout chrome, charts
src/lib/                 → GSAP system, utilities
src/styles/              → design tokens, mixins, global SCSS
src/data/                → static chart / interaction data
src/assets/              → images, SVGs, video (see `src/assets/README.md`)
```

**Composition flow**

```txt
app/page.tsx
  └── features/landing/LandingPage.tsx
        ├── components/layout/Navbar
        ├── features/landing/hero/HeroSection
        ├── features/landing/analysis/FacialAnalysisSection
        ├── features/landing/faq/FaqSection
        ├── features/landing/philosophy/VideoStorytellingSection
        └── components/layout/Footer
```

Client boundaries sit at section roots (`"use client"`) and interactive chart components. `GsapProvider` in `app/layout.tsx` registers GSAP plugins once for the tree.

---

## Feature modules

Each landing section is a self-contained folder:

```txt
features/landing/<section>/
  <Section>.tsx              # markup + composition
  <Section>.module.scss      # section-scoped layout & visuals
  <section>.animation.ts     # GSAP timelines / ScrollTriggers
  *Content.ts                # copy / config (where applicable)
```

| Section | Folder | Animation |
| ------- | ------ | --------- |
| Hero | `hero/` | `hero.animation.ts` — steps, chart hover, motion path |
| Facial analysis | `analysis/` | `analysis.animation.ts` — dashboard reveal |
| FAQ | `faq/` | `faq.animation.ts` — accordion panels |
| Video storytelling | `philosophy/` | `videoStorytelling.animation.ts` — scroll narrative |

Sections attach animations via `useSectionAnimation(createXAnimation)` from `src/lib/gsap`. Animation factories receive the section root ref and return a cleanup function.

**Analysis dashboard** (`analysis/AnalysisDashboard.tsx`) composes a portrait layer and a chart overlay grid (left: distribution / bell / blocks; right: trait bar / feature / container). Interactive trait bar: `components/charts/ScatterplotChartBar/`.

---

## Components

```txt
components/
├── animations/     GsapProvider
├── charts/         Recharts wrappers + ScatterplotChartBar
│   ├── AnalysisChart/
│   ├── ScoreChart/
│   ├── ScatterplotChartBar/
│   ├── Tooltip/
│   └── theme/chartTheme.ts
├── layout/         Navbar, Footer, SectionWrapper, GridOverlay, SectionSpacer
└── ui/             Button, Card, Accordion, SectionLabel, glass cards, etc.
```

- **UI** — presentational, token-driven, no section-specific business logic.
- **Layout** — site chrome and section spacing utilities.
- **Charts** — Recharts for hero/analysis demos; Figma SVG assets + GSAP overlay for the analysis trait bar (`data/scatter-*` targets, geometry in `data/scatterBarChartData.ts`).

---

## GSAP (`src/lib/gsap/`)

| Module | Role |
| ------ | ---- |
| `motion.ts` | Shared durations, eases, stagger, scroll presets |
| `interactions.ts` | Reusable hovers (`bindChartBarHover`, `bindScatterBarChartHover`, glow, parallax) |
| `reveal.ts` / `sectionReveal.ts` | Scroll-in presets and section header/item reveals |
| `scroll.ts` | ScrollTrigger helpers |
| `selectors.ts` | `data-*` selector constants per section |
| `useSectionAnimation.ts` | Hook: mount animation, cleanup on unmount |
| `responsive.ts` / `reducedMotion.ts` | `shouldSimplifyMotion()` gate for reduced / mobile motion |

**Convention:** keep timelines out of JSX. Section files export `createXAnimation(scope)`; interaction bindings run in `useEffect` or dedicated interaction modules.

---

## Styling (`src/styles/`)

```txt
styles/
├── tokens/       _colors, _spacing, _typography, _breakpoints, _fonts
├── mixins/       _media, _flex, layout helpers
├── utilities/    _helpers
└── globals/      _reset, _theme, _fonts → imported by app/globals.scss
```

- Components use **CSS Modules** (`*.module.scss`).
- No hardcoded magic numbers in components when a token or mixin exists.
- Breakpoints consumed via `@include up(md)` etc. from `mixins/_media.scss`.

---

## Data

```txt
data/
├── chartData.ts              # Recharts series for ScoreChart / AnalysisChart
└── scatterBarChartData.ts    # Trait bar positions + hover metric helpers
```

Static content and section copy live beside features (e.g. `analysisContent.ts`, `philosophyContent.ts`).

---

## Assets

- **Raster / SVG** — `src/assets/` (Figma exports: charts, portrait, icons).
- **Video** — source at `src/assets/video/landing-video.mp4`, synced to `public/videos/` for Next static serving.

Design reference files at repo root: `Colors.md`, `Fonts.md`, `FRONTEND-PLAN.md`.

---

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Sass · GSAP 3 · Recharts 3

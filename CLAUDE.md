# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A **Next.js 15 (App Router)** marketing landing page for **ImagineArt Campaign Director**. Single-page site, desktop-locked at 1280px. JSX (not TypeScript), client components throughout. Deployed to Vercel — no `vercel.json` needed; framework is auto-detected.

## Running locally

```
npm install
npm run dev      # http://localhost:3000
npm run build    # production build to .next/
npm run start    # serve .next/ on http://localhost:3000
```

The dev server hot-reloads on save (HMR). No cache-bust query strings — the bundler hashes chunk filenames automatically.

## Architecture

### Entry & layout

- `app/layout.jsx` — root layout. Server component. Sets `<html lang="en">`, `<body className="dark">`, page metadata, viewport (`width: 1280`), and renders `<Footer/>` after `{children}`. Imports `app/globals.css` once.
- `app/page.jsx` — the homepage. Client component (`"use client"`). Composes the page from section components, manages tweak state, applies the accent color CSS variable.
- `app/globals.css` — every style rule the page needs in one file: design tokens (primitive scales → semantic), `.dark` palette flip, `@font-face` declarations, all 27+ `@keyframes`, the scrollbar polish, focus styles, `.dot-grid`, `[id]{scroll-margin-top:72px}`. Imported only from `app/layout.jsx`.

### Components

Each section is one file under `components/`. All are client components (`"use client"`) because of canvas/postMessage/listeners/refs.

- `components/primitives.jsx` — the foundation: `T` (design-token shortcuts), `Icon`, `ICONS`, `useReveal`, `Reveal`. Everything else imports from here. **Don't reorder these or split them — most other files depend on this single import path.**
- `components/section-head.jsx` — `SectionHead` (eyebrow/title/sub with word-stagger reveal).
- `components/copy-text.js` — `copyText` helper (works in sandboxed iframes; falls back to `navigator.clipboard`).
- `components/hero.jsx` — `Hero`, `CodexCallout`. Internally: `NotchNav`, `HeroStarterPrompt`, `HeroCTA`, `StarField` (canvas), `GradientBars`, `HeroNotchPoints`. **`NotchNav` reads viewport width via `useState(1280)` + `useEffect` resize listener — do not refactor it to read `window.innerWidth` during render or SSR will crash.**
- `components/how-it-works.jsx` — `HowItWorks`.
- `components/video-block.jsx` — `VideoBlock` (the 40-second walkthrough).
- `components/sentence-network.jsx` — `SentenceNetwork` (the "what it does" section, with live canvas-build animation).
- `components/templates.jsx` — `Templates` (auto-scrolling marquee).
- `components/examples.jsx` — `Examples` + `EXAMPLES` data array.
- `components/faq.jsx` — `FAQ`.
- `components/final-cta.jsx` — `FinalCTA`.
- `components/footer.jsx` — site footer (ported from the original vanilla `footer.js`).

### Tweaks (edit-mode) protocol

`components/tweaks-panel.jsx` provides a generic floating control panel and a `useTweaks` hook that posts `__edit_mode_set_keys` messages to `window.parent`. `components/tweaks.jsx` defines this site's specific controls and the `CAMPAIGN_TWEAK_DEFAULTS` object.

The defaults block is wrapped in magic comment markers:

```jsx
export const CAMPAIGN_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{ ... }/*EDITMODE-END*/;
```

A host iframe watches for `__edit_mode_set_keys` and rewrites the JSON between those markers **on disk**. Next's HMR then picks up the new defaults on the next render. **Preserve the `EDITMODE-BEGIN`/`EDITMODE-END` markers byte-identically** — there's a `prettier-ignore` and `eslint-disable` guard on the block to prevent autoformatters from touching it. Don't reorder keys, don't add comments inside, don't rename the file or move it (it lives at `components/tweaks.jsx`).

The panel itself is hidden until the host posts `__activate_edit_mode`; it announces itself with `__edit_mode_available` on mount.

### Light/dark sectioning pattern

`app/page.jsx` defines `<DarkSection>` and `<LightSection>` wrappers. `<LightSection>` adds `className="light"` so the CSS variables in `globals.css` flip back to the light palette inside that band, while `<body class="dark">` keeps the rest of the page dark. When adding a new section, wrap it in one of these — don't hand-roll background/foreground colors.

### Design tokens

`app/globals.css` carries the imagine-one-web design system. Two tiers: primitive scales (`--primary-60`, `--neutral-30`, …) → semantic tokens (`--background`, `--surface-primary`, `--content-primary`, …). `.dark` flips semantics. In JSX, consume tokens through the `T` object from `components/primitives.jsx` (`T.bg`, `T.fg`, `T.brand`, `T.btnDark`, …) rather than hardcoding hex.

Fonts are self-hosted under `public/fonts/` (Google Sans Flex variable, Lemon Milk display) and served via `@font-face` declarations in `globals.css`.

## Conventions worth knowing

- The viewport is locked to `width: 1280` (in `app/layout.jsx`'s `viewport` export) — desktop-only landing page, not responsive.
- `[id] { scroll-margin-top: 72px }` clears the sticky 56px-ish nav for any anchor jump. Anchors come "for free" on any element with an `id`.
- Most `@keyframes` live in `app/globals.css`. Three component-local keyframes are inlined as JSX `<style>` blocks in their owning components: `pulseBar` (hero gradient bars), `tplScroll` (templates marquee), and the `twk-*` styles (tweaks panel).
- Asset URLs are root-relative: `/assets/walkthrough.mp4`, `/fonts/google-sans-flex.ttf`. All assets live under `public/`.
- Path alias: `@/*` resolves from the repo root (e.g. `import { T } from '@/components/primitives'`). Configured in `jsconfig.json`.

## Path map (quick reference)

```
app/
├── layout.jsx          ← root layout (server)
├── page.jsx            ← homepage (client)
└── globals.css         ← all global styles + tokens + keyframes

components/
├── primitives.jsx      ← T, Icon, ICONS, useReveal, Reveal
├── section-head.jsx    ← SectionHead
├── copy-text.js        ← copyText helper
├── hero.jsx            ← Hero, CodexCallout, NotchNav, StarField, …
├── how-it-works.jsx    ← HowItWorks
├── video-block.jsx     ← VideoBlock
├── sentence-network.jsx
├── templates.jsx
├── examples.jsx
├── faq.jsx
├── final-cta.jsx
├── footer.jsx
├── tweaks-panel.jsx    ← TweaksPanel + Tweak* controls
└── tweaks.jsx          ← CAMPAIGN_TWEAK_DEFAULTS (EDITMODE block) + CampaignTweaks

public/
├── assets/             ← all images and videos
└── fonts/              ← self-hosted fonts

next.config.mjs         ← redirects /Campaign Director.html → /
jsconfig.json           ← @/* path alias
```

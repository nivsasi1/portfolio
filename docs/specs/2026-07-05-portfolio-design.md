# Portfolio — "Mission Control" Design Spec

**Date:** 2026-07-05
**Owner:** Niv Sasi (@nivsasi1)
**Status:** Approved by user

## Concept

A single-page dark JARVIS-style operations dashboard. Visual language: glassmorphism
panels, cyan/teal glow accents on near-black, monospace details for data readouts,
subtle grid/scan-line texture, Framer Motion animations. English only.

## Stack

- React 18 + Vite + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Framer Motion for animation
- Static SPA, no backend. Contact form via Web3Forms (free, emails nivsasi@gmail.com).
- Repo: `nivsasi1/portfolio` (public, GitHub). Deploy target: Vercel.
- Hero background image generated once with Higgsfield, committed as a static asset.

## Page flow (single page, scroll)

1. **Boot sequence** — 2–3s "SYSTEM INITIALIZING…" terminal intro. Skippable on click.
   Plays only on first visit per tab (sessionStorage flag).
2. **Hero** — `NIV SASI — Full-Stack Developer`, status readout (Rehovot, IL · ONLINE),
   Higgsfield ambient background, CTAs: View Work / Download Resume.
3. **About** — short bio panel framed as "operator profile".
4. **Featured Deployment** — Lev Hatahbiv case study: description, stack badges,
   screenshot, live link (https://lev-hatahbiv.vercel.app) + repo link. Data-driven
   project card structure so more projects can be added by appending to a data file.
5. **Systems** — skills as system modules (Frontend / Backend / AI & Automation)
   with status indicators.
6. **Telemetry** — live GitHub stats (repo count, recent commits, top languages)
   fetched client-side from the public GitHub API for user `nivsasi1`.
   On fetch failure or rate limit → baked-in fallback values, no broken UI.
7. **Comms** — Web3Forms contact form, email/GitHub/LinkedIn links, resume PDF
   download button.

## Error handling

- GitHub API: try/catch around fetch; fallback constants; no loading jank (skeleton →
  fallback after timeout).
- Contact form: inline success/error message, disabled submit while sending.

## Open items (user to supply later)

- Resume PDF for the download button (placeholder file until then).
- Bio text final pass.
- LinkedIn URL.
- Web3Forms access key (site works with a placeholder; form shows "not configured"
  message until key is set).

## Verification

- `npm run build` passes; dev server checked in browser (desktop + mobile viewport),
  no console errors.

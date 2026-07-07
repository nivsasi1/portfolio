# Cinematic Hero — "Command Deck Descent" (design spec)

Date: 2026-07-07 · Branch: `redesign/cinematic-hero` · Status: approved by Niv

## Goal

Replace the current static-video hero with an Awwwards-level, scroll-driven cinematic hero.
Two switchable variants are built so Niv can compare live and pick one:

- **Variant A — layered stills**: pure image-layer 3D parallax, scroll-scrubbed.
- **Variant B — film + stills**: a Higgsfield cinematic video opens the page; on scroll it
  scales back and hands off to the same still layers for the parallax descent.

Scope is **hero + transition** into the About section. The rest of the site keeps the
existing JARVIS theme; the new scene uses the same void/cyan palette so it belongs.

## Concept

A pinned hero occupying ~250vh of scroll track. One coherent Higgsfield environment split
into depth layers:

1. **Background** — deep teal/cyan sci-fi vista (nebula horizon), barely moves.
2. **Midground** — silhouetted structures/terrain, moves moderately.
3. **Foreground** — close element with transparent cutout, sweeps past camera.
4. **Haze** — translucent atmospheric layer for depth.

Scroll progress drives layer translation/scale (transforms only), a staged text reveal
(name → title → tagline → CTAs), then a parallax exit as About slides over the scene.
Desktop adds subtle mouse-move parallax. Film grain + vignette overlay for texture.

## Architecture

- `src/components/hero/CinematicHero.tsx` — shared scroll rig (pin container, useScroll +
  useTransform maps, text reveal, exit transition). Takes `variant: 'layers' | 'film'`.
- `src/components/hero/FilmIntro.tsx` — Variant B's video opening (scale/fade handoff).
- `src/components/hero/HeroToggle.tsx` — floating chip, syncs `?hero=` query param.
- `lenis` for smooth scroll (wheel-scrubbed animation is steppy without it on Windows).
- Assets in `public/cinematic/` (AVIF/WebP + mp4), preloaded poster.

## Non-negotiables

- `prefers-reduced-motion`: static composed frame, no pin, no video autoplay.
- Mobile: no video download, no mouse parallax; full layer stack retained (transforms only,
  tested fine — richer than the originally planned 2-layer cut).
- Transforms/opacity only — no scroll-linked layout or filter animation.
- Old `Hero.tsx` stays in the tree until a variant is chosen (easy rollback).

## Verification

Dev server + screenshots at 0/25/50/75/100% scroll for both variants, console/network
clean, Lighthouse spot check, then push branch → Vercel preview URL for Niv's review.

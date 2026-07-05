# Niv Sasi — Portfolio

Personal portfolio with a "Mission Control" theme — dark JARVIS-style dashboard built with React, Vite, TypeScript, Tailwind CSS v4 and Framer Motion.

## Features

- Boot-up intro sequence (once per session, click to skip)
- AI-generated ambient hero background
- Featured project case studies (data-driven — add projects in `src/data/site.ts`)
- Live GitHub stats with offline fallback
- Contact form via Web3Forms

## Development

```sh
npm install
npm run dev     # local dev server
npm run build   # type-check + production build
```

## Configuration

- **Contact form**: set `VITE_WEB3FORMS_KEY` in `.env` (get a free key at web3forms.com). Without it the form shows a "not configured" note and email links still work.
- **Resume**: replace `public/resume.pdf` with the real file.
- **Content**: everything (bio, projects, skills, links) lives in `src/data/site.ts`.

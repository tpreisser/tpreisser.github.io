## The Iron & Oak Podcast Website

Marketing site and content architecture for The Iron & Oak Podcast, built with Next.js App Router, TypeScript, Tailwind CSS v4, GSAP, Lenis, Framer Motion, `next-themes`, and `lite-youtube-embed`.

## What Is Here

- A cinematic, pre-launch homepage designed to sell the show and drive newsletter signup
- Full route architecture for episodes, questions, series, about, subscribe, contact, merch, and resources
- Typed content models for hosts, series, episodes, and 100+ question deep links
- Shared interaction systems for smooth scrolling, page transitions, a custom cursor, sparks, and text reveals
- Tracking docs at the project root: `PLAN.md`, `TASKS.md`, and `KNOWLEDGE.md`

## Commands

```bash
npm run dev
npm run lint
npm run build
```

Open [http://localhost:3000](http://localhost:3000) during local development.

## Notes

- Newsletter and contact form flows are UI-only right now.
- Episode media IDs, timestamps, photos, and real outbound platform/resource links are still placeholder-populated.
- The oak-tree requirement currently ships as an animated timeline fallback on `/series/[slug]`.

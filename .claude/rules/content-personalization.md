---
paths: ["scripts/personalize-site.mjs", "src/data/content.ts", "src/types/content.ts", "src/components/**"]
---

# Content personalization

`scripts/personalize-site.mjs` is the only place Tyler's live profile/project/resume data
lives. It runs in `postbuild` and rewrites the minified `next build` output with exact
string replacements — production content is edited here, never in `src/`.

- Editing a string in a `src/components/**` file changes what `npm run dev` shows, not what
  deploys. If a change needs to reach production, find (or add) the matching replacement in
  `personalize-site.mjs`.
- `src/data/content.ts` / `src/types/content.ts` are the dev-mode podcast scaffold. They are
  intentionally left generic — do not "fix" them to show Tyler's data; that would break the
  scaffold's reuse for other personalized builds and has no effect on what deploys anyway.
- After changing anything `personalize-site.mjs` targets, run a real `npm run build` and
  check the rendered `/out` output (or `npm start`) — a passing build does not prove the
  replacement matched; a missed string match fails silently.

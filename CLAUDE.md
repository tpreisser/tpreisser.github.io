# tyler-preisser-website — CLAUDE.md

## What
Tyler Preisser's personal portfolio/resume site, deployed to https://tylerpreisser.com.
Next.js source is a reusable podcast-site scaffold; a post-build script rewrites the
compiled bundle into Tyler's portfolio content. GitHub: `tpreisser/tpreisser.github.io`.
Repo lives at `~/Projects/Coding Projects/tyler-preisser-website` — any doc still pointing at
`~/Documents/New project/` is STALE.

## Why — the two-stage build (read before touching content)
Maximizes code reuse (one component/animation library serves both a podcast-site template and
this portfolio) while keeping personal data out of source.
1. **Stage 1** `npm run build` — Next.js compiles the generic podcast scaffold
   (`src/data/content.ts`: hosts, episodes, series, questions) to static HTML + minified JS.
   This is **not** what users see.
2. **Stage 2** `postbuild` (automatic) — `scripts/personalize-site.mjs` string-replaces chunks of
   the minified bundle with Tyler's data: profile (name, education, experience, skills, awards),
   12-project portfolio, resume summary + taglines, contact info, footer copy; hides podcast
   sections and shows portfolio tabs (experience / education / achievements). ~5–10s, vs 30+s
   for a full rebuild.
3. Result: `/out` is Tyler's portfolio, not a podcast site.
**Implication:** do NOT edit strings in `src/` expecting them in production — edit
`scripts/personalize-site.mjs`. `src/data/content.ts` is intentionally left as scaffold.

## Stack
- Next.js 16.2.1 (App Router, `output: "export"` — static, no server, no `/api` routes;
  trailing slashes enabled). Turbopack is the Next 16 default builder.
- React 19.2.4 + TypeScript 5 (`strict: true`, ES2017 target, `@/*` → `./src/*`)
- Tailwind CSS v4 (global resets only in `src/app/globals.css`; no CSS modules)
- GSAP 3.14.2 (SplitText + ScrollTrigger) + Framer Motion 12.38.0
- Lenis 1.3.20 — **installed but NOT integrated**; `smooth-scroll-provider.tsx` is a placeholder
- next-themes 0.4.6 (`attribute: "class"`, dark default, no system-preference auto-detect)
- clsx 2.1.1, lite-youtube-embed 0.3.4
- Deploy: Cloudflare Pages via Wrangler, `pages_build_output_dir = "out"` (wrangler.toml)

## Commands
```bash
npm install
npm run dev      # HMR, NO personalization — shows raw podcast scaffold content
npm run lint      # ESLint (declared — pre-existing failures below, not this rollout's)
npm run build     # next build; postbuild auto-runs export-resume-pdf, cache-bust, personalize
npm start         # serve /out locally
npx wrangler pages deploy out --project-name tylerpreisser --branch=main   # publish
```
`npm run lint` executed in rollout verification (2026-08-26): 16 pre-existing errors (two
`<a>`-vs-`next/link` violations in `projects/page.tsx:134` and `resume/page.tsx:81`) +
~1590 warnings, nearly all from ESLint linting the *built* minified bundles under
`public/assets/*.js` (no ignore pattern excludes them). Pre-existing; not introduced here.
(An older CLAUDE.md claim that "`npm run lint` passes" is STALE.)

## Key files
- `scripts/personalize-site.mjs` — **the single place to edit Tyler's data.** 3,500+ lines
  of exact-string replacements against the minified postbuild JS.
- `scripts/export-resume-pdf.mjs` → `/out/Resume_Tyler_Preisser.pdf`;
  `scripts/cache-bust-static.mjs` appends version strings to static assets. Both run in
  `postbuild` in order pdf → cache-bust → personalize — order matters if you touch that chain.
- `src/components/tyler-site-shell.tsx` — client app entry mounting to `<div id="root">`; all
  three routes (`/`, `/projects`, `/resume`) mount this same component (SPA-in-Next.js-clothing;
  navigation happens in JS, not the Next Router). Under it: `SiteChrome` (`site-header.tsx` fixed
  nav + theme toggle, `site-footer.tsx` contact links), plus `CustomCursor` and `SparkCanvas`.
- `src/data/content.ts` / `src/types/content.ts` — dev-mode-only podcast scaffold data
  (`Host`/`Series`/`SeriesPhase`/`Episode`/`Question`/`SocialLink`; hosts Tyler Preisser (CPO,
  R Squared AI) + Lincoln Myers (Myers Media LLC); series "Foundations of the Faith", 12
  episodes / 5 phases, 100+ questions). Never reaches the deployed bundle.
- `src/lib/gsap.ts` — GSAP plugin registration guard (`pluginsRegistered`); all GSAP imports must
  go through this file, not `gsap` directly, or plugins double-register.
- `src/lib/site.ts` — nav, socials, email config. `src/lib/utils.ts` — `cn`, `slugify`,
  `formatDate`.
- `public/_headers` — Cloudflare cache/CSP headers. `public/_vercel/` — Speed Insights script.
- `wrangler.toml` — Cloudflare Pages config, output dir `out`.
- Companion docs: `README.md`, `PLAN.md` (phase roadmap), `TASKS.md`, `KNOWLEDGE.md`.

## Conventions
- Components/utils: kebab-case files, PascalCase component + type exports, camelCase functions,
  constants camelCase or UPPER_SNAKE_CASE (`siteConfig`, `SPARK_PALETTE`).
- Import via `@/*` path alias, never relative `../../..`.
- Styling: Tailwind utilities only; no inline `style=`, no new custom CSS classes, no hardcoded
  colors. `cn()` from `@/lib/utils` for conditional classes; CSS variables for repeated tokens
  (e.g. `--nav-safe-area-inset-bottom`).
- Fonts: Righteous (headers), system stack (body), Fira Code (mono), Lobster (decorative).
- All interactive components (animation, forms, cursor, canvas) are `"use client"`.
- Every animation must respect `prefers-reduced-motion`; custom cursor/canvas hidden on
  touch (`@media (hover: hover) and (pointer: fine)`). `SparkCanvas` = 10–16 particle bursts in a
  golden/copper palette; `magnetic.tsx` = pointer-offset hover.
- Accessibility bar: 4.5:1 WCAG AA body contrast, keyboard-reachable controls, semantic HTML,
  alt text on every image.
- No error boundaries and no test framework exist yet.

## Gotchas
- **Personalize script is fragile by design**: string matches against minified output must
  be byte-exact. A Next.js/GSAP version bump that changes the minified shape silently breaks
  replacements — verify the deployed site's content after any dependency bump, not just that
  the build succeeds. (Standing tech-debt proposal: move the data to `/public/data.json` + a
  runtime `fetch()` and delete the script.)
- **Static export**: no dynamic `[id]` routes without `generateStaticParams`, no API routes,
  no server-side data fetching at request time. Forms are UI-only, no backend wired.
- **Personal accounts, not R2's**: Cloudflare Pages project `tylerpreisser` is on the
  PERSONAL Cloudflare account (tylerpreisser@gmail.com); GitHub repo is on the PERSONAL
  GitHub account. `wrangler` on this Mac defaults to the WORK account — `wrangler login` to
  personal before any deploy, or it will target/auth against the wrong account.
- No env vars (`.env` is never read), no CI/CD (`.github/workflows/` empty) — builds and deploys
  are MANUAL. Any claim that "pushing to GitHub auto-deploys" is STALE and false.
- Google Fonts are vendored under `public/fonts.googleapis.com/` and `public/fonts.gstatic.com/`;
  they do not auto-update — download and cache new fonts locally.
- Host images are `null` in source and episode media IDs/resource links are placeholders; all are
  replaced post-build.
- Untested/unaudited: real-device mobile + touch, Lighthouse/bundle size, low-end SparkCanvas
  perf, social preview cards. No image optimization, code-splitting, or analytics.

## GitHub MCP + Context7
Connected globally — no per-repo `.mcp.json` wiring needed for either.

## Settled decisions
See `DECISIONS/` (this repo) and `~/.claude-shared/DECISIONS/` (global; wins on conflict).
Conformance to an Accepted ADR is never a defect — see `DECISIONS/README.md` for the full
protocol (immutability, superseding, "Decision Concerns" for objections). When the owner settles
a question, write the ADR immediately as `Status: Accepted` at the next free `NNNN`; fix a bad
capture by superseding (`ADR_SUPERSEDE=1`), never by editing.

## graphify
`graphify-out/` holds this repo's knowledge graph. Prefer `graphify query "<question>"` /
`graphify path` / `graphify explain` over raw grepping when it exists; `graphify update .`
after code changes.

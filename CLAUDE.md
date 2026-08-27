# tyler-preisser-website — CLAUDE.md

## What
Tyler Preisser's personal portfolio/resume site, deployed to https://tylerpreisser.com.
Next.js source is a reusable podcast-site scaffold; a post-build script rewrites the
compiled bundle into Tyler's portfolio content. GitHub: `tpreisser/tpreisser.github.io`.

## Why
Two-stage build maximizes code reuse (same component/animation library serves both a
podcast-site template and Tyler's portfolio) while keeping personal data out of source:
`npm run build` compiles the generic scaffold, then `postbuild` (automatic) rewrites the
minified JS with Tyler's profile/projects/resume data. See "Two-stage build" below before
touching content.

## Stack
- Next.js 16.2.1 (App Router, `output: "export"` — static, no server, no `/api` routes)
- React 19.2.4 + TypeScript 5 (`strict: true`)
- Tailwind CSS v4, GSAP 3.14.2 + Framer Motion 12.38.0, next-themes 0.4.6 (dark default)
- Deploy: Cloudflare Pages via Wrangler, `pages_build_output_dir = "out"` (wrangler.toml)

## Commands
```bash
npm install
npm run dev      # HMR, NO personalization — shows raw podcast scaffold content
npm run lint      # ESLint (declared — pre-existing failures below, not this rollout's)
npm run build     # next build; postbuild auto-runs export-resume-pdf, cache-bust, personalize
npm start         # serve /out locally
npx wrangler pages deploy out --project-name tylerpreisser --branch=main
```
`npm run lint` executed in rollout verification (2026-08-26): 16 pre-existing errors (two
`<a>`-vs-`next/link` violations in `projects/page.tsx:134` and `resume/page.tsx:81`) +
~1590 warnings, nearly all from ESLint linting the *built* minified bundles under
`public/assets/*.js` (no ignore pattern excludes them). Pre-existing; not introduced here.

## Key files
- `scripts/personalize-site.mjs` — **the single place to edit Tyler's data.** 3,500+ lines
  of exact-string replacements against the minified postbuild JS. Do NOT edit component
  source (`src/`) expecting it to reach production — it's replaced wholesale.
- `src/components/tyler-site-shell.tsx` — client app entry; all three routes (`/`,
  `/projects`, `/resume`) mount this same component (SPA-in-Next.js-clothing).
- `src/data/content.ts` / `src/types/content.ts` — dev-mode-only podcast scaffold data,
  intentionally left as-is; never reaches the deployed bundle.
- `src/lib/gsap.ts` — GSAP plugin registration guard; all GSAP imports must go through this
  file, not `gsap` directly, or plugins double-register.
- `wrangler.toml` — Cloudflare Pages config, output dir `out`.

## Conventions
- Components/utils: kebab-case files, PascalCase component exports, camelCase functions.
- Import via `@/*` path alias, never relative `../../..`.
- Styling: Tailwind utilities only; no inline `style=`, no new custom CSS classes.
- All interactive components (animation, forms, cursor, canvas) are `"use client"`.
- Every animation must respect `prefers-reduced-motion`; custom cursor/canvas hidden on
  touch (`@media (hover: hover) and (pointer: fine)`).

## Gotchas
- **Personalize script is fragile by design**: string matches against minified output must
  be byte-exact. A Next.js/GSAP version bump that changes the minified shape silently breaks
  replacements — verify the deployed site's content after any dependency bump, not just that
  the build succeeds.
- **Static export**: no dynamic `[id]` routes without `generateStaticParams`, no API routes,
  no server-side data fetching at request time.
- **Personal accounts, not R2's**: Cloudflare Pages project `tylerpreisser` is on the
  PERSONAL Cloudflare account (tylerpreisser@gmail.com); GitHub repo is on the PERSONAL
  GitHub account. `wrangler` on this Mac defaults to the WORK account — `wrangler login` to
  personal before any deploy, or it will target/auth against the wrong account.
- No env vars, no CI/CD (`.github/workflows/` empty) — builds/deploys are manual.
- Resume PDF (`scripts/export-resume-pdf.mjs`) and cache-busting (`scripts/cache-bust-static.mjs`)
  both run in `postbuild`, after personalize — order matters if you touch that chain.

## GitHub MCP + Context7
Connected globally — no per-repo `.mcp.json` wiring needed for either.

## Settled decisions
See `DECISIONS/` (this repo) and `~/.claude-shared/DECISIONS/` (global; wins on conflict).
Conformance to an Accepted ADR is never a defect — see `DECISIONS/README.md` for the full
protocol (immutability, superseding, "Decision Concerns" for objections).

## graphify
`graphify-out/` holds this repo's knowledge graph. Prefer `graphify query "<question>"` /
`graphify path` / `graphify explain` over raw grepping when it exists; `graphify update .`
after code changes.

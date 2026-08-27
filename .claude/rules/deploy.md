---
paths: ["wrangler.toml", "scripts/**", "public/**"]
---

# Build & deploy

- Build output is static export to `/out` (`next.config.ts`: `output: "export"`). No API
  routes, no dynamic route without `generateStaticParams`.
- `postbuild` runs three scripts in order after `next build`: `export-resume-pdf.mjs` →
  `cache-bust-static.mjs` → `personalize-site.mjs`. Order matters if any of them read output
  the previous one wrote (e.g. cache-busted filenames).
- Deploy target is Cloudflare Pages project `tylerpreisser`, on Tyler's PERSONAL Cloudflare
  account (tylerpreisser@gmail.com) — not R2's work account. `wrangler` on this Mac defaults
  to the work account; `wrangler login` to personal first, or the deploy authenticates
  against/targets the wrong account.
- `npx wrangler pages deploy out --project-name tylerpreisser --branch=main` — never deploy
  from `.next/` or without running `npm run build` first (postbuild personalization is what
  makes `/out` the actual portfolio instead of the podcast scaffold).
- GitHub remote (`tpreisser/tpreisser.github.io`) is also on the PERSONAL GitHub account.

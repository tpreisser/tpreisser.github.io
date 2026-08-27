# REVIEW.md — evidence bar for this repo

Every finding needs a concrete failing scenario, not a description of a pattern. Cite
`file:line`. Score confidence 0–100; discard anything under 80. Read the actual
implementation, not just the diff — trace callers before claiming something is unreachable
or unused. If the behavior is guarded, intentional, or you cannot demonstrate it fails,
discard the finding rather than report it.

**Excluded, never report:** style preferences, speculative risk ("this could theoretically…"
with no path to it), feature requests, generated/minified code (`public/assets/*.js`,
`.next/`, `out/`), lockfiles, anything ESLint/`tsc` already catches. Conformance to an
Accepted ADR in `DECISIONS/` is never a defect — see `DECISIONS/README.md`.

## Repo-specific must-checks

1. **Personalize-script reach.** If a change touches anything `scripts/personalize-site.mjs`
   targets (profile data, project list, resume copy, UI toggles it flips), confirm the
   change was verified against an actual `npm run build` output, not just `npm run dev`. A
   component-source edit that doesn't have a matching replacement in the script silently
   never reaches production — that's a real, demonstrable defect, not speculation.
2. **Static export violations.** Flag any new dynamic route without `generateStaticParams`,
   any new `/api/*` route, or any server-only API (`fetch` with request-time secrets, `cookies()`,
   etc.) — `output: "export"` in `next.config.ts` makes these build-time failures or silent
   no-ops at runtime, not just style issues.
3. **`prefers-reduced-motion` coverage.** New GSAP/Framer Motion animation code that doesn't
   check `prefers-reduced-motion` (directly or via the existing hook pattern in
   `src/lib/gsap.ts`) is a real accessibility regression given the rest of the codebase
   consistently guards it — cite the missing guard, not "should probably check this."
4. **Account/target confusion.** Any change to `wrangler.toml`, deploy scripts, or CI touching
   the `tylerpreisser` Cloudflare Pages project or the `tpreisser/tpreisser.github.io` GitHub
   repo — these are personal accounts distinct from R2's; a defect here is high-severity
   (wrong-account deploy or exposure), not a nitpick.

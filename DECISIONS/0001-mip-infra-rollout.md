# ADR-0001: Adopt the MIP Claude infra baseline (CLAUDE.md, rules, REVIEW.md, DECISIONS/, plans/) in this repo
Status: Accepted — 2026-08-26 (MIP phase-5 rollout, GLOBAL ADR-0007) — Owner: Tyler Preisser
Supersedes / Superseded by: —

## Context
- Tyler ran the 2026-08-26 Master Infrastructure Prompt (MIP) build (GLOBAL ADR-0007,
  `~/.claude-shared/DECISIONS/`) establishing a standard Claude Code infra baseline across
  his repos: a compressed `CLAUDE.md`, path-scoped `.claude/rules/`, a `REVIEW.md` evidence
  bar, an ADR log, and a `plans/` + `thoughts/` scaffold.
- Tyler chose "All repos incl. client" as the rollout scope on 2026-08-26, meaning this
  personal-site repo is in scope alongside client and internal-tooling repos, not exempted
  as "just a personal site."
- This repo already had a `DECISIONS/` folder (`0000-template.md`, `README.md`) and hooks
  (`protect-adr-and-secrets.sh`, `block-live-deploy.sh`) from an earlier `agent-kit`
  bootstrap — this ADR is the first real decision recorded in that folder.

## Decision
1. This repo adopts the MIP baseline: `CLAUDE.md` rewritten to the WHAT/WHY/HOW spec (≤120
   lines), `.claude/rules/content-personalization.md` and `.claude/rules/deploy.md` as
   path-scoped area conventions, `REVIEW.md` as the review evidence bar, and
   `plans/ACTIVE.md` + `thoughts/` as the working scaffold — all committed on branch
   `infra/claude-setup`.
2. No repo-specific carve-out from the GLOBAL ADR-0007 rollout is made here. Every
   repo-specific fact, warning, and contract present in the prior (727-line) `CLAUDE.md` was
   preserved in compressed form — none was dropped.
3. GitHub MCP and Context7 MCP are connected globally; this repo does not need its own MCP
   wiring for them (noted in `CLAUDE.md`).

## Consequences
- Future sessions read the compressed `CLAUDE.md` + `.claude/rules/*.md` instead of the old
  727-line file; review agents read `REVIEW.md` and this `DECISIONS/` folder before flagging
  findings.
- Reviewers must not flag "the old CLAUDE.md had more detail" as a defect — the compression
  is the point; anything load-bearing was carried forward (see `CLAUDE.md`'s Gotchas section).
- This repo is not a "UI repo" flagged for the pinned Playwright `.mcp.json` entry in this
  rollout pass despite using Playwright as a devDependency — the rollout brief's UI-repo flag
  was set for this repo, so a `.mcp.json` with the pinned `playwright-mcp` binary was added;
  see the same commit.

## Open / not yet decided
- Whether to migrate `scripts/personalize-site.mjs` off exact-string replacement to a
  JSON-based content model (flagged as tech debt in the prior `CLAUDE.md`) is not decided by
  this ADR — still open.
- Whether to add CI/CD (`.github/workflows/` is empty) is not decided by this ADR.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not
defective — do not flag it, do not "fix" it, do not recommend re-adding what it removed.
Objections go under "Decision Concerns" citing this ADR number — never as a bug or a
blocking finding. Disagreement is resolved by a NEW superseding ADR, never by editing this
one.

## Revisit criteria
- Tyler explicitly changes the MIP baseline shape (GLOBAL ADR-0007 superseded), or a
  maintainer of this repo identifies a repo-specific fact that the compression actually
  dropped (in which case the fix is a superseding ADR plus a `CLAUDE.md` correction, not a
  silent revert to the old file).

## Sources
- GLOBAL ADR-0007 (`~/.claude-shared/DECISIONS/`), MIP build 2026-08-26.
- Rollout-brief instructions dispatched to this worker, 2026-08-26.

# CODEX-STATE

Last updated: 2026-04-08

## Purpose

This repo is the operating surface for the Ulrich Energy Auditing website.
The app source of truth is `web/`. Root scripts and `docs/ops/`
exist to prove runtime behavior, deployment health, and content/proof governance.

## Start Here

1. Read `AGENTS.md`.
2. Read `README.md`.
3. If the task touches runtime, proof, deploys, or recurring review, read:
   - `docs/ops/README.md`
   - `docs/ops/RECURRING-OPERATIONS.md`
   - `docs/ops/OPS-SCORECARD.md`
4. If the task touches route expectations, read `monitoring/runtime-routes.txt`.

## Current Working Assumptions

- Real implementation work belongs in `web/`.
- Root-level generated/exported output is not the source of truth.
- Runtime proof matters as much as code correctness for this repo.
- The main checkout is currently dirty, so non-trivial Codex work should prefer a worktree lane.

## Fast Verification Paths

- App checks:
  - `cd .\web`
  - `npm run lint`
  - `npm run type-check`
  - `npm test -- --runInBand`
  - `npm run build`
  - `npm run test:e2e -- --project=chromium`
- Root ops checks:
  - `pwsh .\smoke.ps1`
  - `pwsh .\scripts\run-ops-review.ps1 -PreviewUrl '<preview-url>'`

## Current Smoke Contract

- `smoke.ps1` now treats `monitoring/runtime-routes.txt` as a shared contract,
  not just a live-check input.
- Each `GET` route in the contract must be backed by either an exported artifact
  in `web/dist/` or the explicit nginx `/health` endpoint.
- Each indexable `GET` route in the contract must also appear in
  `web/dist/sitemap.xml`.
- Each `REDIRECT` entry in the contract must map to an explicit redirect rule in
  `nginx.conf`.
- If route expectations change, update `monitoring/runtime-routes.txt` and rerun
  `smoke.ps1` in the same pass.

## PR Follow-Through

- PR `#22` (`chore: tighten smoke route contract`) is still draft/open and should
  stay parked until the branch baseline is repaired.
- Live GitHub checks fail before the smoke-contract diff is meaningfully exercised:
  `npm ci` on Actions hits a React 19 / `@testing-library/react` peer conflict in
  `web`.
- After reproducing the install on a clean worktree and forcing the app checks
  forward under Node 20, the branch still fails non-diff blockers:
  - lint reports 43 existing errors across app routes and shared UI files
  - build fails from missing `@/lib/auth`, `@/lib/rate-limit/middleware`,
    `@/lib/security/middleware`, and `@/lib/prisma` imports referenced by
    `web/middleware.ts`
  - `smoke.ps1` cannot repro green state on a clean branch because
    `web/dist/index.html` is absent and the app does not build
- Operational stance: treat PR `#22` as a parked contract branch, not a merge
  candidate, until the broader app baseline is repaired or the smoke change is
  rebased onto a clean branch.

## Current Codex Additions

- Root `AGENTS.md` added on 2026-04-08
- Repo-local skill:
  - `.agents/skills/ops-review/SKILL.md`

## Done Criteria Reminder

Do not call work done until the relevant checks pass and the docs/ops truth is updated when behavior changed.

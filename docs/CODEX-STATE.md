# CODEX-STATE

Last updated: 2026-04-20

## Purpose

This repo is the operating surface for the Ulrich Energy Auditing website.
The app source of truth is `web/`. Root scripts and docs exist to prove repo
readiness, runtime behavior, and deployment health without treating the live
Unraid host as the primary proof surface.

## Start Here

1. Read `AGENTS.md`.
2. Read `README.md`.
3. If the task touches runtime routes, proof, or recurring review, read the repo-local monitoring and smoke surfaces that actually exist:
   - `monitoring/runtime-routes.txt`
   - `smoke.ps1`
   - `docs/RUNBOOK.md`
4. If the task touches route expectations, read `monitoring/runtime-routes.txt`.

## Repo Truth

- Real implementation work belongs in `web/`.
- The canonical static export artifact is `web/dist/`.
- Root-level exported HTML and `_next/` snapshots are reference-only output.
- `web/src/lib/site.ts` owns the canonical site-origin contract used by metadata, `robots.txt`, and `sitemap.xml`.
- `web/public/favicon.svg` is the canonical favicon asset used by both app metadata and the web app manifest.
- `web/public/robots.txt` and `web/public/sitemap.xml` should stay absent; those SEO artifacts are generated from `web/src/app`.
- The canonical public origin is `https://ulrichenergyauditing.com`; local Unraid URLs remain operational references, not SEO defaults.
- Canonical repo proof surfaces are:
  - `powershell -ExecutionPolicy Bypass -File .\scripts\verify-repo-contract.ps1`
  - `npm --prefix web run verify`

## Readiness Status

- Repo-local contract added in `AGENTS.md`.
- Machine-checkable contract lane added in `scripts/verify-repo-contract.ps1`.
- Local Lighthouse config exists at `monitoring/lighthouse-ci.js`.
- Stable local proof currently means contract alignment plus `npm --prefix web run verify` (`type-check` + `build`).
- Legacy ESLint, Jest, and Playwright assets still exist, but they are not yet clean enough to gate readiness work.

## Current Expectations

- `docker-compose.yml`, `scripts/deploy.sh`, and `.github/workflows/ci-cd.yml` should reference `web/dist/`.
- `netlify.toml` should publish `web/dist` and build from `web/`.
- `netlify.toml` should also export `NEXT_PUBLIC_SITE_URL=https://ulrichenergyauditing.com` so generated SEO metadata does not fall back to the LAN host.
- `web/playwright.config.ts` should target a local preview server, not the live Unraid host.
- `web/src/app/robots.ts` and `web/src/app/sitemap.ts` should generate SEO artifacts from the shared site-url helper instead of hand-maintained `web/public` files.
- `web/public/manifest.json` and `web/src/app/layout.tsx` should both reference `web/public/favicon.svg` so exported app icons do not 404.
- `monitoring/lighthouse-ci.js` must exist because CI references it directly.

## Smoke Contract

- `smoke.ps1` treats `monitoring/runtime-routes.txt` as a shared route contract.
- Each `GET` route in that contract must be backed by either an exported artifact in `web/dist/` or the explicit nginx `/health` endpoint.
- Each indexable `GET` route in the contract must also appear in `web/dist/sitemap.xml`.
- Each `REDIRECT` entry in the contract must map to an explicit redirect rule in `nginx.conf`.

## Operator Notes

- Older docs in `README.md`, `PROJECT-COMPLETION-SUMMARY.md`, and `docs/` may overstate deployment and test readiness unless updated in the same lane.
- The main checkout is currently dirty, so non-trivial Codex work should prefer a worktree lane.
- If a future lane changes the canonical artifact path, update this file and `scripts/verify-repo-contract.ps1` in the same change.

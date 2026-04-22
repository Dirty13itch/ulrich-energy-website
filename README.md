# Ulrich Energy Auditing Website

Professional website for Twin Cities HERS rating and energy inspection services.

## Current Repo Truth

- Canonical source lives in `web/`.
- Canonical static export lives in `web/dist/`.
- Root-level exported HTML and `_next/` snapshots are reference-only output.
- Canonical public origin is `https://ulrichenergyauditing.com`.
- The LAN host `http://192.168.1.203:8088/` is an operational reference only, not repo proof.

## Stable Proof Lane

Use these commands before claiming readiness:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\verify-repo-contract.ps1
npm --prefix web run verify
```

Current readiness note:

- `verify-repo-contract.ps1` is the machine-checkable repo contract gate.
- `npm --prefix web run verify` is the stable app proof lane (`clean`, `type-check`, `build`).
- Legacy ESLint, Jest, and Playwright assets still exist, but they are not the readiness gate.

## Local Development

```powershell
cd web
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Build Output

```powershell
cd web
npm run build
```

The static export is written to `web/dist/`.

## Architecture

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 App Router |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI | Custom components plus shadcn/ui |
| Icons | Lucide React |
| Hosting Surface | nginx container on Unraid |

## Key Files

- `AGENTS.md`: repo operating contract
- `docs/CODEX-STATE.md`: current autonomous truth
- `scripts/verify-repo-contract.ps1`: repo-contract verifier
- `monitoring/runtime-routes.txt`: runtime route contract
- `smoke.ps1`: runtime smoke and header checks
- `nginx.conf`: runtime routing and security headers
- `netlify.toml`: secondary deploy surface aligned to `web/dist`

## Deployment Note

This repo still contains live-server deployment and monitoring scripts such as `scripts/deploy.sh`
and `scripts/health-check.sh`. They are operational surfaces, not the primary readiness proof lane.

If you need live operational guidance, use:

- `docs/RUNBOOK.md` for ops context
- `scripts/deploy.sh` for deployment workflow

Do not use the live Unraid host as proof that repo changes are correct.

## Contribution Workflow

1. Make changes in `web/`, repo-contract docs, or readiness scripts.
2. Run `powershell -ExecutionPolicy Bypass -File .\scripts\verify-repo-contract.ps1`.
3. Run `npm --prefix web run verify`.
4. Review the diff before commit or PR creation.

## Archive Note

Older documents such as `PROJECT-COMPLETION-SUMMARY.md` record historical completion state and may
overstate readiness or describe retired proof surfaces. Prefer `AGENTS.md` and
`docs/CODEX-STATE.md` when they disagree.

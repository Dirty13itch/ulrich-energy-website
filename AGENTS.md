# Ulrich Energy Auditing Website Repo Guide

## Scope
- Keep readiness work bounded to this repo.
- Treat deployment, auth repair, and server mutation as hard stops unless Shaun explicitly asks for them.

## Canonical Truth
- Source code lives in `web/`.
- The canonical static export artifact is `web/dist/`.
- Root-level exported HTML (`index.html`, `about.html`, `contact.html`, `services.html`, `_next/`, and sibling text dumps) is reference output only, not the source of truth for edits or verification.
- `docs/CODEX-STATE.md` is the current repo truth for autonomous work and outranks older completion writeups when they disagree.

## Startup
1. Read this file and `docs/CODEX-STATE.md`.
2. Run `git log --oneline -5` and `git diff --stat`.
3. Use `powershell -ExecutionPolicy Bypass -File .\scripts\verify-repo-contract.ps1` before claiming the repo contract is aligned.
4. Use `npm --prefix web run verify` for the app proof lane when code or build-facing config changes.

## Guardrails
- Prefer changes inside `web/`, `scripts/`, `monitoring/`, and repo-contract docs for readiness work.
- Do not treat the live Unraid URL as proof for repo changes; local contract and local build proof come first.
- If deployment surfaces disagree again, fix the contract or document the drift in `docs/CODEX-STATE.md` before closing the lane.

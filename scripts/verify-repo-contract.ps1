[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$checks = @()

function Add-Check {
    param(
        [string]$Name,
        [bool]$Passed,
        [string]$Detail
    )

    $script:checks += [pscustomobject]@{
        name = $Name
        passed = $Passed
        detail = $Detail
    }
}

function Read-Text {
    param([string]$Path)
    Get-Content -Raw -LiteralPath (Join-Path $repoRoot $Path)
}

function Assert-Match {
    param(
        [string]$Name,
        [string]$Path,
        [string]$Pattern,
        [string]$Detail
    )

    $content = Read-Text -Path $Path
    $matches = [regex]::IsMatch($content, $Pattern, [System.Text.RegularExpressions.RegexOptions]::Multiline)
    Add-Check -Name $Name -Passed $matches -Detail $Detail
}

Add-Check -Name 'AGENTS.md present' -Passed (Test-Path (Join-Path $repoRoot 'AGENTS.md')) -Detail 'Repo-local agent contract exists.'
Add-Check -Name 'docs/CODEX-STATE.md present' -Passed (Test-Path (Join-Path $repoRoot 'docs/CODEX-STATE.md')) -Detail 'Repo-local Codex state exists.'
Add-Check -Name 'monitoring/lighthouse-ci.js present' -Passed (Test-Path (Join-Path $repoRoot 'monitoring/lighthouse-ci.js')) -Detail 'Workflow Lighthouse config exists.'

Assert-Match -Name 'Next export uses dist/' -Path 'web/next.config.ts' -Pattern "distDir:\s*'dist'" -Detail 'Next.js export stays in web/dist/.'
Assert-Match -Name 'Docker serves canonical dist path' -Path 'docker-compose.yml' -Pattern '\./web/dist:/usr/share/nginx/html:ro' -Detail 'Docker compose points at web/dist/.'
Assert-Match -Name 'Deploy script syncs canonical dist path' -Path 'scripts/deploy.sh' -Pattern '\$PROJECT_DIR/web/dist/' -Detail 'Deploy script syncs web/dist/.'
Assert-Match -Name 'GitHub Actions runs repo contract verifier' -Path '.github/workflows/ci-cd.yml' -Pattern 'powershell\s+-ExecutionPolicy\s+Bypass\s+-File\s+\.\\scripts\\verify-repo-contract\.ps1' -Detail 'Workflow runs the repo-contract verifier before app proof.'
Assert-Match -Name 'GitHub Actions runs stable verify lane' -Path '.github/workflows/ci-cd.yml' -Pattern 'working-directory:\s*\./web[\s\S]*npm run verify' -Detail 'Workflow uses the stable verify lane from web/.'
Assert-Match -Name 'GitHub Actions uploads canonical dist path' -Path '.github/workflows/ci-cd.yml' -Pattern 'path:\s*web/dist/' -Detail 'Workflow artifact/deploy path uses web/dist/.'
Assert-Match -Name 'Netlify publishes canonical dist path' -Path 'netlify.toml' -Pattern 'publish = "web/dist"' -Detail 'Netlify publish path uses web/dist.'
Assert-Match -Name 'Netlify builds app from source root' -Path 'netlify.toml' -Pattern 'npm --prefix web ci && npm --prefix web run build' -Detail 'Netlify build command runs from web/.'
Assert-Match -Name 'Playwright proof is local' -Path 'web/playwright.config.ts' -Pattern "baseURL:\s*'http://127\.0\.0\.1:3000'" -Detail 'Playwright base URL is local.'
Assert-Match -Name 'Playwright web server is local' -Path 'web/playwright.config.ts' -Pattern "url:\s*'http://127\.0\.0\.1:3000'" -Detail 'Playwright preview server is local.'

$failed = @($checks | Where-Object { -not $_.passed })
$result = [pscustomobject]@{
    ok = ($failed.Count -eq 0)
    check_count = $checks.Count
    failed_count = $failed.Count
    checks = $checks
}

$result | ConvertTo-Json -Depth 4

if ($failed.Count -gt 0) {
    exit 1
}

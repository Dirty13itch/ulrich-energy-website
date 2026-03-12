$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location $repoRoot

try {
    $requiredFiles = @(
        ".\\index.html",
        ".\\about.html",
        ".\\contact.html",
        ".\\services.html",
        ".\\docker-compose.yml",
        ".\\nginx.conf",
        ".\\.env.example"
    )

    foreach ($file in $requiredFiles) {
        if (-not (Test-Path $file)) {
            throw "Required file missing: $file"
        }
    }

    Write-Host "Smoke passed."
}
finally {
    Pop-Location
}

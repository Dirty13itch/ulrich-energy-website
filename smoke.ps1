param(
    [string]$ExpectedSiteUrl = "",
    [switch]$CheckLiveRoutes,
    [switch]$CheckArtifactSiteUrl
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$distRoot = Join-Path $repoRoot "ulrich-energy-auditing\dist"
$routeContractPath = Join-Path $repoRoot "monitoring\runtime-routes.txt"
Push-Location $repoRoot

function Assert-PathExists {
    param([string]$Path)

    if (-not (Test-Path $Path)) {
        throw "Required path missing: $Path"
    }
}

function Get-CurlResponse {
    param([string]$Url)

    $headers = & curl.exe -sS -o NUL -D - $Url
    if ($LASTEXITCODE -ne 0) {
        throw "curl.exe failed for $Url"
    }

    $statusLine = $headers | Where-Object { $_ -match "^HTTP/" } | Select-Object -Last 1
    if (-not $statusLine) {
        throw "No HTTP status line returned for $Url"
    }

    $statusCode = [int](($statusLine -split "\s+")[1])
    $location = $headers |
        Where-Object { $_ -match "^(?i:Location):" } |
        ForEach-Object { ($_ -split ":\s*", 2)[1].Trim() } |
        Select-Object -Last 1

    return [PSCustomObject]@{
        StatusCode = $statusCode
        Location = $location
        RawHeaders = ($headers -join "`n")
    }
}

function Get-RouteContractEntries {
    param([string]$Path)

    Assert-PathExists -Path $Path

    $entries = @()
    $lineNumber = 0

    foreach ($line in Get-Content $Path) {
        $lineNumber += 1
        $trimmed = $line.Trim()
        if (-not $trimmed -or $trimmed.StartsWith("#")) {
            continue
        }

        $parts = $trimmed -split "\s+"
        if ($parts.Count -lt 2) {
            throw "Invalid route contract entry on line ${lineNumber}: '$line'"
        }

        $kind = $parts[0]
        if ($kind -eq "GET") {
            $entries += [PSCustomObject]@{
                Kind = $kind
                Route = $parts[1]
                Target = $null
            }
            continue
        }

        if ($kind -eq "REDIRECT") {
            if ($parts.Count -lt 3) {
                throw "Redirect entry on line $lineNumber is missing a target: '$line'"
            }

            $entries += [PSCustomObject]@{
                Kind = $kind
                Route = $parts[1]
                Target = $parts[2]
            }
            continue
        }

        throw "Unsupported route contract kind '$kind' on line $lineNumber."
    }

    if (-not $entries.Count) {
        throw "Route contract '$Path' did not contain any active entries."
    }

    return $entries
}

function Get-ArtifactPathForRoute {
    param(
        [string]$DistRoot,
        [string]$Route
    )

    if ($Route -eq "/") {
        return Join-Path $DistRoot "index.html"
    }

    $trimmedRoute = $Route.Trim("/")
    if (-not $trimmedRoute) {
        return Join-Path $DistRoot "index.html"
    }

    $relativePath = $trimmedRoute -replace "/", "\"
    if ($relativePath -match "\.[a-zA-Z0-9]+$") {
        return Join-Path $DistRoot $relativePath
    }

    return Join-Path (Join-Path $DistRoot $relativePath) "index.html"
}

function Assert-SecurityHeaders {
    param([string]$Url)

    $response = Get-CurlResponse -Url $Url
    $headers = $response.RawHeaders.ToLowerInvariant()
    $requiredHeaders = @(
        "x-frame-options:",
        "x-content-type-options:",
        "referrer-policy:",
        "permissions-policy:",
        "content-security-policy:",
        "cross-origin-opener-policy:",
        "cross-origin-resource-policy:"
    )

    foreach ($header in $requiredHeaders) {
        if ($headers -notmatch [regex]::Escape($header)) {
            throw "Missing required security header '$header' on $Url"
        }
    }

    if ($headers -match "(?m)^server:\s+[^\r\n]+/\d") {
        throw "Server header exposes version details on $Url"
    }
}

function Assert-RouteContractBackedByRepo {
    param(
        [object[]]$Entries,
        [string]$DistRoot,
        [string]$Sitemap,
        [string]$Nginx
    )

    foreach ($entry in $Entries) {
        if ($entry.Kind -eq "GET") {
            if ($entry.Route -eq "/health") {
                $healthPattern = "(?s)location\s*=\s*/health\s*\{[^}]*return\s+200\s+`"healthy\\n`";"
                if ($Nginx -notmatch $healthPattern) {
                    throw "Route contract GET $($entry.Route) is not backed by the nginx health endpoint."
                }

                continue
            }

            $artifactPath = Get-ArtifactPathForRoute -DistRoot $DistRoot -Route $entry.Route
            if (-not (Test-Path $artifactPath)) {
                throw "Route contract GET $($entry.Route) is missing its exported artifact: $artifactPath"
            }

            if ($entry.Route -in @("/robots.txt", "/sitemap.xml")) {
                continue
            }

            if ($entry.Route -ne "/") {
                $normalizedRoute = $entry.Route.TrimEnd("/")
                $routePattern = [regex]::Escape($normalizedRoute)
                if ($Sitemap -notmatch $routePattern) {
                    throw "Route contract GET $($entry.Route) is missing from sitemap.xml."
                }
            }

            continue
        }

        $escapedRoute = [regex]::Escape($entry.Route)
        $escapedTarget = [regex]::Escape($entry.Target)
        $redirectPattern = "(?s)location\s*=\s*$escapedRoute\s*\{[^}]*return\s+30[1278]\s+$escapedTarget;"
        if ($Nginx -notmatch $redirectPattern) {
            throw "Route contract REDIRECT $($entry.Route) -> $($entry.Target) is not backed by nginx.conf."
        }
    }
}

try {
    $requiredPaths = @(
        ".\ulrich-energy-auditing\dist\index.html",
        ".\ulrich-energy-auditing\dist\about\index.html",
        ".\ulrich-energy-auditing\dist\services\index.html",
        ".\ulrich-energy-auditing\dist\programs\index.html",
        ".\ulrich-energy-auditing\dist\programs\minnesota-green-path\index.html",
        ".\ulrich-energy-auditing\dist\programs\energy-star\index.html",
        ".\ulrich-energy-auditing\dist\programs\doe-efficient-new-homes\index.html",
        ".\ulrich-energy-auditing\dist\programs\multifamily-affordable\index.html",
        ".\ulrich-energy-auditing\dist\programs\45l-status\index.html",
        ".\ulrich-energy-auditing\dist\proof\index.html",
        ".\ulrich-energy-auditing\dist\proof\blower-door-final-handoff\index.html",
        ".\ulrich-energy-auditing\dist\proof\rough-in-insulation-review\index.html",
        ".\ulrich-energy-auditing\dist\proof\multifamily-lane-routing\index.html",
        ".\ulrich-energy-auditing\dist\resources\index.html",
        ".\ulrich-energy-auditing\dist\resources\choose-the-right-minnesota-project-lane\index.html",
        ".\ulrich-energy-auditing\dist\resources\code-only-vs-program-driven-builder-work\index.html",
        ".\ulrich-energy-auditing\dist\resources\green-path-vs-energy-star-vs-doe-efficient-new-homes\index.html",
        ".\ulrich-energy-auditing\dist\resources\how-funding-overlays-change-multifamily-scope\index.html",
        ".\ulrich-energy-auditing\dist\resources\when-multifamily-needs-its-own-lane\index.html",
        ".\ulrich-energy-auditing\dist\resources\what-builders-should-have-ready-before-intake\index.html",
        ".\ulrich-energy-auditing\dist\resources\why-utility-territory-belongs-in-intake-before-scope-locks\index.html",
        ".\ulrich-energy-auditing\dist\resources\when-45l-is-still-worth-discussing\index.html",
        ".\ulrich-energy-auditing\dist\faq\index.html",
        ".\ulrich-energy-auditing\dist\get-started\index.html",
        ".\ulrich-energy-auditing\dist\privacy\index.html",
        ".\ulrich-energy-auditing\dist\contact\index.html",
        ".\ulrich-energy-auditing\dist\robots.txt",
        ".\ulrich-energy-auditing\dist\sitemap.xml",
        ".\ulrich-energy-auditing\dist\404.html",
        ".\ulrich-energy-auditing\dist\manifest.json",
        ".\ulrich-energy-auditing\dist\images\evidence\blower-door-readings.png",
        ".\ulrich-energy-auditing\dist\images\evidence\insulation-photo-summary.png",
        ".\nginx.conf",
        ".\netlify.toml",
        ".\monitoring\runtime-routes.txt"
    )

    foreach ($path in $requiredPaths) {
        Assert-PathExists -Path $path
    }

    $routeEntries = Get-RouteContractEntries -Path $routeContractPath
    $robots = Get-Content ".\ulrich-energy-auditing\dist\robots.txt" -Raw
    $sitemap = Get-Content ".\ulrich-energy-auditing\dist\sitemap.xml" -Raw
    $nginx = Get-Content ".\nginx.conf" -Raw

    if ($robots -notmatch "Sitemap:\s+") {
        throw "robots.txt is missing a Sitemap declaration."
    }

    if ($sitemap -notmatch "/programs/energy-star" -or $sitemap -notmatch "/resources/choose-the-right-minnesota-project-lane") {
        throw "sitemap.xml is missing expected current routes."
    }

    Assert-RouteContractBackedByRepo -Entries $routeEntries -DistRoot $distRoot -Sitemap $sitemap -Nginx $nginx

    if ($ExpectedSiteUrl -and $CheckArtifactSiteUrl) {
        if ($robots -notmatch [regex]::Escape($ExpectedSiteUrl) -or $sitemap -notmatch [regex]::Escape($ExpectedSiteUrl)) {
            throw "Expected site URL '$ExpectedSiteUrl' not found in robots/sitemap output."
        }
    }

    if ($CheckLiveRoutes) {
        $siteUrl = if ($ExpectedSiteUrl) { $ExpectedSiteUrl.TrimEnd("/") } else { "http://192.168.1.203:8088" }

        foreach ($entry in $routeEntries) {
            if ($entry.Kind -eq "GET") {
                $response = Get-CurlResponse -Url "$siteUrl$($entry.Route)"
                if ($response.StatusCode -lt 200 -or $response.StatusCode -ge 400) {
                    throw "Live route check failed for $siteUrl$($entry.Route) with status $($response.StatusCode)"
                }
            }

            if ($entry.Kind -eq "REDIRECT") {
                $redirect = Get-CurlResponse -Url "$siteUrl$($entry.Route)"
                if ($redirect.StatusCode -notin 301,302,307,308) {
                    throw "$($entry.Route) did not redirect as expected. Status: $($redirect.StatusCode)"
                }

                if ($redirect.Location -ne $entry.Target) {
                    throw "$($entry.Route) redirect target was '$($redirect.Location)', expected '$($entry.Target)'"
                }
            }
        }

        Assert-SecurityHeaders -Url "$siteUrl/"
    }

    Write-Host "Smoke passed."
}
finally {
    Pop-Location
}

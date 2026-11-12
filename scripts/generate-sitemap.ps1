param(
    [Parameter(Mandatory = $true)]
    [string]$SiteUrl,

    [string]$OutputPath,

    [string]$RobotsPath
)

$parsedUrl = $null
if (-not [System.Uri]::TryCreate($SiteUrl, [System.UriKind]::Absolute, [ref]$parsedUrl) -or
    $parsedUrl.Scheme -ne "https" -or
    $parsedUrl.AbsolutePath -ne "/" -or
    $parsedUrl.Query -or
    $parsedUrl.Fragment) {
    throw "SiteUrl must be an HTTPS origin, for example https://your-project.vercel.app"
}

$origin = $parsedUrl.GetLeftPart([System.UriPartial]::Authority)
$urls = @(
    "$origin/",
    "$origin/about.html",
    "$origin/projects.html",
    "$origin/seo-practice.html",
    "$origin/pages/ai_mockinterview.html"
)

$urlEntries = ($urls | ForEach-Object {
    $escapedUrl = [System.Security.SecurityElement]::Escape($_)
    "  <url>`n    <loc>$escapedUrl</loc>`n  </url>"
}) -join "`n"

$sitemap = @"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
$urlEntries
</urlset>
"@

if (-not $OutputPath) {
    $OutputPath = Join-Path (Split-Path -Parent $PSScriptRoot) "sitemap.xml"
}

$resolvedOutputPath = [System.IO.Path]::GetFullPath($OutputPath)
Set-Content -LiteralPath $resolvedOutputPath -Value $sitemap -Encoding UTF8

if (-not $RobotsPath) {
    $RobotsPath = Join-Path (Split-Path -Parent $PSScriptRoot) "robots.txt"
}

$resolvedRobotsPath = [System.IO.Path]::GetFullPath($RobotsPath)
$robotsLines = @()
if (Test-Path -LiteralPath $resolvedRobotsPath) {
    $robotsLines = @(Get-Content -LiteralPath $resolvedRobotsPath |
        Where-Object { $_ -notmatch '^\s*Sitemap\s*:' })
}
$robotsLines += "Sitemap: $origin/sitemap.xml"
Set-Content -LiteralPath $resolvedRobotsPath -Value $robotsLines -Encoding UTF8

Write-Output "Sitemap written to $resolvedOutputPath"
Write-Output "Robots file updated at $resolvedRobotsPath"

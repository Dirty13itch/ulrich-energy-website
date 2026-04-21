const defaultSiteUrl = "https://ulrichenergyauditing.com";

function normalizeSiteUrl(rawSiteUrl: string): string {
  return rawSiteUrl.trim().replace(/\/+$/, "");
}

export function getSiteUrl(): string {
  const configuredSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim()
      ? process.env.NEXT_PUBLIC_SITE_URL
      : defaultSiteUrl;

  return normalizeSiteUrl(configuredSiteUrl);
}

export function getSiteUrlObject(): URL {
  return new URL(getSiteUrl());
}

import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

// Keep sitemap exports deterministic so repo proof does not churn on every build.
const canonicalLastModified = new Date("2026-04-20T00:00:00.000Z");

const indexedRoutes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return indexedRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: canonicalLastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

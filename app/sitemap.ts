import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

// Single honest lastmod for all entries: every page's served output
// changed on this date (round 5 — OG fields on the local pages, the
// Person/ProfilePage JSON-LD move on the homepage). Update this date
// whenever a page's content actually changes; do not invent per-URL
// dates and do not use a dynamic `new Date()` (it would claim a change
// on every build).
const lastModified = new Date("2026-11-12");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: siteUrl + "/web-developer-lahore",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: siteUrl + "/web-developer-muridke",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

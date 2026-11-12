export function normalizeSiteUrl(value?: string): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;

  try {
    const candidate = /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed)
      ? trimmed
      : "https://" + trimmed;
    const parsed = new URL(candidate);

    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return undefined;
    }

    return parsed.origin;
  } catch {
    return undefined;
  }
}

/**
 * Set NEXT_PUBLIC_SITE_URL to your canonical production URL.
 * Vercel's production project URL is a safe fallback.
 * Preview deployment URLs are intentionally not used as canonical URLs.
 *
 * Final fallback is the production URL itself: without it, a missing env
 * var silently made the sitemap ship empty and robots drop its Sitemap
 * line. The canonical URL must never be undefined for this site.
 *
 * (This repo deploys on Vercel only. The old platform config file
 * was deleted in round 3, so no other platform's URL env var is
 * consulted.)
 */
export const siteUrl =
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  "https://hamzabhulla.vercel.app";

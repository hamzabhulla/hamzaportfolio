function normalizeSiteUrl(value?: string): string | undefined {
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
 * Netlify's URL and Vercel's production project URL are safe fallbacks.
 * Preview deployment URLs are intentionally not used as canonical URLs.
 */
export const siteUrl =
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  normalizeSiteUrl(process.env.URL) ??
  normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL);

import { afterEach, describe, expect, it, vi } from "vitest";

import { normalizeSiteUrl } from "./site-url";

describe("normalizeSiteUrl", () => {
  it("adds https:// to a bare host", () => {
    expect(normalizeSiteUrl("hamzabhulla.vercel.app")).toBe(
      "https://hamzabhulla.vercel.app",
    );
  });

  it("keeps a full https URL and strips path, query and trailing slash", () => {
    expect(
      normalizeSiteUrl("https://hamzabhulla.vercel.app/some/page?x=1"),
    ).toBe("https://hamzabhulla.vercel.app");
  });

  it("keeps http (local dev) and trims surrounding whitespace", () => {
    expect(normalizeSiteUrl("  http://localhost:3000/  ")).toBe(
      "http://localhost:3000",
    );
  });

  it("rejects non-http(s) schemes", () => {
    expect(normalizeSiteUrl("ftp://example.com")).toBeUndefined();
  });

  it("rejects unparseable values and empty input", () => {
    expect(normalizeSiteUrl("not a url :::")).toBeUndefined();
    expect(normalizeSiteUrl("example.com:abc")).toBeUndefined();
    expect(normalizeSiteUrl("")).toBeUndefined();
    expect(normalizeSiteUrl(undefined)).toBeUndefined();
  });
});

describe("siteUrl fallback chain", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  async function loadSiteUrl(): Promise<string> {
    vi.resetModules();
    const mod = await import("./site-url");
    return mod.siteUrl;
  }

  it("prefers NEXT_PUBLIC_SITE_URL when set", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://custom.example");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "other.vercel.app");
    expect(await loadSiteUrl()).toBe("https://custom.example");
  });

  it("falls back to VERCEL_PROJECT_PRODUCTION_URL, adding https://", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "my-site.vercel.app");
    expect(await loadSiteUrl()).toBe("https://my-site.vercel.app");
  });

  it("falls through an invalid NEXT_PUBLIC_SITE_URL to the next fallback", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", ":::");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "my-site.vercel.app");
    expect(await loadSiteUrl()).toBe("https://my-site.vercel.app");
  });

  it("falls back to the hardcoded production URL when nothing is set", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    expect(await loadSiteUrl()).toBe("https://hamzabhulla.vercel.app");
  });
});

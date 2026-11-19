import { NextRequest, NextResponse } from "next/server";

// Per-request CSP nonce (Next.js 16 CSP guide: "Adding a nonce with
// Proxy"). `middleware.ts` is deprecated in Next.js 16 in favour of
// `proxy.ts`; this file follows the guide's proxy.ts example.
//
// How it works:
// - A fresh random nonce is generated for every request.
// - The nonce is put in the CSP response header (script-src) AND in the
//   `x-nonce` request header, from which the app reads it via headers()
//   to stamp the three user-authored JSON-LD <script> tags. Next.js itself
//   parses the CSP header from the request and stamps the nonce onto its
//   own inline runtime scripts automatically.
// - style-src keeps 'unsafe-inline': the drag stack sets inline style
//   attributes (React style props), which no nonce can allow, and
//   securityheaders.com does not cap the grade for style-src.
// - script-src has NO 'unsafe-inline' — that is the one warning that
//   capped the securityheaders.com grade at A. 'strict-dynamic' is in the
//   guide's example and lets the nonce'd runtime scripts load the page
//   bundles.
// - 'unsafe-eval' is added in development only, exactly as the guide
//   does: React uses eval for enhanced debugging in dev, never in prod.
//
// Consequence (per the guide): pages that read the nonce are dynamically
// rendered — static optimisation is off for them and each request is
// server-rendered. That is the documented price of nonce-based CSP.
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  const cspHeader = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set("Content-Security-Policy", cspHeader);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * (Guide's recommended matcher; also skips prefetch requests.)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

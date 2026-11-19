/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    // No Content-Security-Policy here: the CSP is set per request by
    // proxy.ts with a fresh nonce (script-src has no 'unsafe-inline',
    // which capped the securityheaders.com grade at A). A CSP set here
    // AND by the proxy would both be enforced, and this static one would
    // keep 'unsafe-inline' effective. The other four headers are static
    // and stay here. 'frame-ancestors none' matches X-Frame-Options: DENY.
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

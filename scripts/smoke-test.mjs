import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const expectedVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
const expectedContact = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

assert.ok(configuredSiteUrl, "NEXT_PUBLIC_SITE_URL must be set for production-route smoke tests.");

let expectedSiteUrl;
try {
  expectedSiteUrl = new URL(configuredSiteUrl).origin;
} catch {
  throw new Error("NEXT_PUBLIC_SITE_URL must be a valid absolute URL for production-route smoke tests.");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getFreePort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  assert.ok(address && typeof address === "object", "Could not allocate a local port.");
  const { port } = address;
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  return port;
}

const port = await getFreePort();
const baseUrl = `http://127.0.0.1:${port}`;
const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)],
  {
    cwd: process.cwd(),
    env: { ...process.env, HOSTNAME: "127.0.0.1", PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  },
);

let serverOutput = "";
child.stdout.setEncoding("utf8");
child.stderr.setEncoding("utf8");
child.stdout.on("data", (chunk) => { serverOutput += chunk; });
child.stderr.on("data", (chunk) => { serverOutput += chunk; });
const childExited = new Promise((resolve) => {
  child.once("exit", (code, signal) => resolve({ code, signal }));
});

async function stopServer() {
  if (child.exitCode === null && child.signalCode === null) {
    child.kill("SIGTERM");
    const exited = await Promise.race([
      childExited.then(() => true),
      sleep(2000).then(() => false),
    ]);
    if (!exited && child.exitCode === null && child.signalCode === null) {
      child.kill("SIGKILL");
      await Promise.race([childExited, sleep(1000)]);
    }
  }
}

async function request(pathname) {
  const response = await fetch(new URL(pathname, baseUrl));
  return response;
}

try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (child.exitCode !== null) {
      throw new Error(`next start exited before becoming ready (code ${child.exitCode}).\n${serverOutput}`);
    }
    try {
      const response = await request("/");
      if (response.status === 200) {
        ready = true;
        break;
      }
    } catch {
      // The server may still be starting; retry for up to 30 seconds.
    }
    await sleep(500);
  }
  assert.ok(ready, `Production server did not become ready.\n${serverOutput}`);

  const homeResponse = await request("/");
  assert.equal(homeResponse.status, 200, "Homepage should return HTTP 200.");
  assert.match(homeResponse.headers.get("content-type") ?? "", /text\/html/i);
  assert.equal(homeResponse.headers.get("x-powered-by"), null, "The framework fingerprint header should be disabled.");
  assert.equal(homeResponse.headers.get("x-content-type-options"), "nosniff", "Content type sniffing should be disabled.");
  assert.equal(homeResponse.headers.get("x-frame-options"), "DENY", "The page should not be embeddable in frames.");
  assert.equal(
    homeResponse.headers.get("referrer-policy"),
    "strict-origin-when-cross-origin",
    "Referrer policy should avoid leaking full paths to other origins.",
  );
  assert.equal(
    homeResponse.headers.get("permissions-policy"),
    "camera=(), microphone=(), geolocation=()",
    "Unused sensitive browser capabilities should be disabled.",
  );
  const html = await homeResponse.text();

  assert.ok(html.includes("Hamza Bhulla | Full-Stack Developer"), "The homepage title should render.");
  const canonicalMatch = html.match(/<link\b(?=[^>]*\brel="canonical")(?=[^>]*\bhref="([^"]+)")[^>]*>/);
  assert.ok(canonicalMatch, "Canonical link should be present.");
  const canonicalUrl = new URL(canonicalMatch[1], expectedSiteUrl);
  assert.equal(canonicalUrl.origin, new URL(expectedSiteUrl).origin, "Canonical link should use the configured site origin.");
  assert.equal(canonicalUrl.pathname, "/", "Canonical link should point to the homepage root.");
  assert.ok(html.includes('property="og:url"'), "Open Graph URL should be present.");
  assert.ok(html.includes(expectedSiteUrl), "Open Graph should resolve against the configured site origin.");
  if (expectedVerification) {
    assert.ok(html.includes("google-site-verification"), "Google Search Console verification tag should be present when configured.");
    assert.ok(html.includes(expectedVerification), "Google verification value should match the configured value.");
  }
  if (expectedContact) {
    assert.ok(html.includes(expectedContact), "The configured public contact email should render.");
  }
  for (const sectionId of ['id="top"', 'id="work"', 'id="about"', 'id="skills"', 'id="contact"']) {
    assert.ok(html.includes(sectionId), `Expected homepage section ${sectionId}.`);
  }
  for (const projectName of ["VibeTalk", "Ember &amp; Co.", "WebNotepad", "WhatsApp Concierge"]) {
    assert.ok(html.includes(projectName), `Expected featured project ${projectName}.`);
  }

  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map(([tag]) => tag);
  assert.ok(imageTags.length > 0, "The homepage should render project imagery.");
  for (const [index, imageTag] of imageTags.entries()) {
    assert.match(imageTag, /\balt="[^"]*"/i, `Rendered image ${index + 1} should have an alt attribute.`);
  }

  const anchorTargets = [...html.matchAll(/\bhref="#([^"]+)"/g)].map(([, id]) => id);
  const renderedIds = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id));
  for (const targetId of anchorTargets) {
    assert.ok(renderedIds.has(targetId), `In-page link should target an existing element: #${targetId}`);
  }

  const robotsResponse = await request("/robots.txt");
  assert.equal(robotsResponse.status, 200, "robots.txt should return HTTP 200.");
  const robotsText = await robotsResponse.text();
  assert.ok(robotsText.includes("Allow: /"), "robots.txt should allow crawling.");
  assert.ok(robotsText.includes(`Sitemap: ${expectedSiteUrl}/sitemap.xml`), "robots.txt should point to the canonical sitemap.");

  const sitemapResponse = await request("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200, "sitemap.xml should return HTTP 200.");
  assert.match(sitemapResponse.headers.get("content-type") ?? "", /xml/i);
  const sitemapText = await sitemapResponse.text();
  assert.ok(sitemapText.includes(`<loc>${expectedSiteUrl}</loc>`), "Sitemap should list the configured canonical origin.");

  const imageResponse = await request("/opengraph-image");
  assert.equal(imageResponse.status, 200, "Open Graph image should return HTTP 200.");
  assert.match(imageResponse.headers.get("content-type") ?? "", /image\/png/i);
  const imageBytes = await imageResponse.arrayBuffer();
  assert.ok(imageBytes.byteLength > 0, "Open Graph image should not be empty.");

  const iconResponse = await request("/icon.svg");
  assert.equal(iconResponse.status, 200, "The branded SVG favicon should return HTTP 200.");
  assert.match(iconResponse.headers.get("content-type") ?? "", /image\/svg\+xml/i);
  const iconMarkup = await iconResponse.text();
  assert.ok(iconMarkup.includes("<svg"), "The branded favicon should contain SVG markup.");

  const projectsResponse = await request("/api/projects");
  assert.equal(projectsResponse.status, 200, "Project API should return HTTP 200.");
  assert.match(projectsResponse.headers.get("content-type") ?? "", /application\/json/i);
  const projects = await projectsResponse.json();
  assert.equal(projects.length, 4, "Project API should return all four featured projects.");
  assert.deepEqual(
    projects.map((project) => project.title),
    ["VibeTalk", "Ember & Co.", "WebNotepad", "WhatsApp Concierge"],
    "Project API should return the expected project order.",
  );
  assert.equal(
    new Set(projects.map((project) => project.id)).size,
    projects.length,
    "Featured project IDs should be unique.",
  );
  for (const project of projects) {
    assert.ok(typeof project.description === "string" && project.description.trim(), `${project.title} needs a non-empty description.`);
    assert.ok(typeof project.image === "string" && project.image.trim(), `${project.title} needs an image path.`);
    assert.ok(typeof project.githubUrl === "string", `${project.title} needs a source repository link.`);
    assert.equal(new URL(project.githubUrl).protocol, "https:", `${project.title} source link must use HTTPS.`);
    if (project.liveUrl) {
      assert.equal(new URL(project.liveUrl).protocol, "https:", `${project.title} live link must use HTTPS.`);
    }
  }

  console.log("Production smoke test passed: homepage metadata, security headers, images/accessibility anchors, robots.txt, sitemap.xml, Open Graph image, SVG favicon, and project data.");
} finally {
  await stopServer();
}

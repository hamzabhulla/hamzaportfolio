import { projects } from "@/lib/mock-data";
import { siteUrl } from "@/lib/site-url";
import { socialLinks } from "@/lib/social-links";

export const dynamic = "force-static";

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "heyhamza.dev@gmail.com";

type ProjectEntry = {
  title: string;
  description: string;
  liveUrl?: string;
  githubUrl: string;
};

function projectLine(project: ProjectEntry): string {
  const name = project.liveUrl
    ? `[${project.title}](${project.liveUrl})`
    : project.title;
  return `- ${name}: ${project.description} Source: ${project.githubUrl}`;
}

export function GET() {
  const base = siteUrl ?? "https://hamzabhulla.vercel.app";

  const body = `# Hamza Bhulla

> Hamza Bhulla is a full-stack developer based in Lahore, Pakistan, building thoughtful, responsive web products remotely for clients and teams around the world.

## Services

- Full-stack web applications and SaaS products
- AI-powered features and products
- Restaurant and business platforms (ordering, reservations, payments, staff operations)

## Tech stack

- Frontend: React, TypeScript, JavaScript
- Backend: Node.js, Express, REST APIs
- Data and auth: Supabase, PostgreSQL
- Integrations: Stripe payments, realtime features, WebRTC, AI APIs

## Projects

${(projects as ProjectEntry[]).map(projectLine).join("\n")}

## Contact

- Email: ${contactEmail}
- Website: ${base}

## Profiles

${socialLinks.map((link) => `- ${link.label}: ${link.href}`).join("\n")}
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

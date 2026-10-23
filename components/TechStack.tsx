const groups = [
  {
    number: "01",
    title: "Frontend",
    summary: "Interfaces, routing & state",
    tools: ["React", "TypeScript", "JavaScript", "HTML & CSS", "Tailwind CSS", "Vite", "TanStack Start", "TanStack Router", "React Router", "Radix UI", "TanStack React Query"],
  },
  {
    number: "02",
    title: "Backend & data",
    summary: "Auth, databases & secure APIs",
    tools: ["Node.js", "Express", "REST APIs", "Supabase", "PostgreSQL", "Supabase Auth", "Row Level Security", "Zod", "Rate limiting", "Helmet", "CORS"],
  },
  {
    number: "03",
    title: "Integrations",
    summary: "Payments & real-time features",
    tools: ["Stripe", "Payment webhooks", "Gemini API", "Supabase Realtime", "WebRTC", "Web Push", "VAPID", "QR pairing"],
  },
  {
    number: "04",
    title: "Browser & delivery",
    summary: "Offline apps, testing & deployment",
    tools: ["PWA", "Service Workers", "localStorage", "Upstash Redis", "Vercel Functions", "Cloudflare Workers", "Vitest", "Testing Library", "GitHub Actions", "Web Crypto API"],
  },
];

export default function TechStack() {
  return (
    <section id="skills" className="skills-section content-shell" aria-labelledby="skills-heading">
      <div className="section-topline">
        <p className="eyebrow">Skills</p>
        <p className="section-index">USED IN PROJECTS · 04 GROUPS</p>
      </div>

      <div className="skills-heading-row">
        <h2 id="skills-heading" className="section-heading">
          My <span>toolkit.</span>
        </h2>
        <p className="skills-intro">
          A practical stack, built by shipping real products.
        </p>
      </div>

      <div className="skill-groups">
        {groups.map((group) => (
          <article className="skill-group" key={group.number}>
            <div className="skill-card-heading">
              <span className="skill-number">{group.number}</span>
              <span className="skill-card-mark" aria-hidden="true">↗</span>
            </div>
            <h3>{group.title}</h3>
            <p className="skill-summary">{group.summary}</p>
            <ul aria-label={group.title + " technologies"}>
              {group.tools.map((tool) => <li key={tool}>{tool}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

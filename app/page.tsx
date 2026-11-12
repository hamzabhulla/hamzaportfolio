import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CaseStudy from "@/components/CaseStudy";
import TechStack from "@/components/TechStack";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import { projects } from "@/lib/mock-data";
import { siteUrl } from "@/lib/site-url";
import { socialLinks } from "@/lib/social-links";

const siteDescription =
  "Portfolio of Hamza Bhulla, a full-stack developer building thoughtful, responsive web products with React, TypeScript, and practical backend integrations.";

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "heyhamza.dev@gmail.com";

// Person/ProfilePage JSON-LD lives here only (moved out of the shared
// layout in round 5): the local service pages carry their own
// ProfessionalService + FAQPage @graph instead.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: siteUrl,
  mainEntity: {
    "@type": "Person",
    name: "Hamza Bhulla",
    jobTitle: "Full-Stack Developer",
    description: siteDescription,
    url: siteUrl,
    email: contactEmail,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    nationality: {
      "@type": "Country",
      name: "Pakistan",
    },
    knowsAbout: [
      "React",
      "TypeScript",
      "JavaScript",
      "TanStack Start",
      "Responsive web development",
      "Full-stack web applications",
      "REST APIs",
      "Node.js and Express",
      "Supabase Auth and Realtime",
      "PostgreSQL and Row Level Security",
      "Web Crypto API and AES-GCM group-message encryption",
      "Stripe payments and webhooks",
      "WebRTC",
      "Web Push notifications",
      "Progressive web apps and service workers",
      "Offline-first browser applications",
      "Automated tests with Vitest and Testing Library",
    ],
    sameAs: socialLinks.map((link) => link.href),
  },
};

export default function Home() {
  const personJsonLd = JSON.stringify(personSchema).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: personJsonLd }}
      />
      <SiteNav />
      <main className="site-main">
        <Hero />

        <section
          id="work"
          className="work-section content-shell"
          aria-labelledby="work-heading"
        >
          <div className="section-topline">
            <p className="eyebrow">Projects</p>
          </div>
          <div className="work-heading-row">
            <h2 id="work-heading" className="section-heading">
              Selected <span>work.</span>
            </h2>
            <p className="section-lede">
              Messaging, commerce, productivity, and customer operations.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <CaseStudy key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        <About />
        <TechStack />
        <Faq />
        <Contact />
      </main>
    </>
  );
}

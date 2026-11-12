import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import LocalLanding from "@/components/LocalLanding";
import CaseStudy from "@/components/CaseStudy";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import { projects } from "@/lib/mock-data";
import { siteUrl } from "@/lib/site-url";

const canonicalPath = "/web-developer-lahore";
const pageUrl = siteUrl + canonicalPath;

export const metadata: Metadata = {
  title: "Freelance Web Developer in Lahore",
  description:
    "Freelance web developer in Lahore building React and TypeScript websites and web apps for small businesses, restaurants and teams.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Freelance Web Developer in Lahore | Hamza Bhulla",
    description:
      "Freelance web developer in Lahore building React and TypeScript websites and web apps for small businesses, restaurants and teams.",
    url: pageUrl,
    type: "website",
    siteName: "Hamza Bhulla",
    locale: "en_US",
    images: [
      {
        url: "/web-developer-lahore/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Freelance Web Developer in Lahore — Hamza Bhulla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Web Developer in Lahore | Hamza Bhulla",
    description:
      "Freelance web developer in Lahore building React and TypeScript websites and web apps for small businesses, restaurants and teams.",
    images: ["/web-developer-lahore/opengraph-image"],
  },
};

export default function WebDeveloperLahore() {
  return (
    <>
      <SiteNav />
      <main className="site-main">
        <LocalLanding
          city="Lahore"
          area="Lahore, Punjab, Pakistan"
          canonicalPath={canonicalPath}
          kicker="Freelance web developer / Lahore · Remote"
          titleLine="Freelance web developer"
          titleSpan="in Lahore."
          intro="I'm Hamza Bhulla, a full-stack web developer based in Lahore, Pakistan. My work is web apps and platforms — real-time chat, restaurant ordering, dashboards — built with React, TypeScript and Supabase, for businesses in Lahore and for remote clients around the world."
          servicesHeading="Web apps, built end to end."
          servicesLede="From the interface to the backend and the database — the same stack behind VibeTalk, Ember & Co. and my client work."
          services={[
            {
              title: "Web apps and SaaS",
              summary:
                "Full-stack apps with React, TypeScript and Next.js — customer-facing products, dashboards and internal tools, from the interface to the database.",
            },
            {
              title: "Restaurant and e-commerce",
              summary:
                "Ordering, reservations, Stripe payments and order tracking for restaurants and retail in Lahore — the platform I built for Ember & Co., and the kind of commerce I know end to end.",
            },
            {
              title: "Dashboards and operations",
              summary:
                "Supabase and PostgreSQL backends, auth and realtime features — the kind of operations dashboard I built for a real client at RESI D'ELITE, managing bookings, leads and conversations.",
            },
            {
              title: "Business websites",
              summary:
                "Fast, mobile-first websites for Lahore businesses — what you do, how to reach you, and how to order or book, without clutter.",
            },
          ]}
          faqs={[
            {
              question: "What kind of work do you do for Lahore businesses?",
              answer:
                "Web apps and SaaS products, restaurant ordering and e-commerce, and dashboards that run the operations behind a business. I build end to end — the interface, the backend, the database, and the integrations like payments and WhatsApp.",
            },
            {
              question: "Are you based in Lahore?",
              answer:
                "Yes. I'm based in Lahore, Punjab, Pakistan, and I work remotely with clients in Lahore and around the world. Communication is async-friendly, and I make time to overlap for calls and updates.",
            },
            {
              question: "Have you built anything for a real client?",
              answer:
                "Yes. I built a WhatsApp concierge dashboard for a real customer at RESI D'ELITE, for managing bookings, leads, conversations and properties. I also shipped VibeTalk, a real-time messaging app, and Ember & Co., a complete restaurant platform.",
            },
            {
              question: "How much does a website or web app cost?",
              answer:
                "It depends on the scope — a business website and a full web app with ordering, payments or a dashboard are different jobs. Email me a few lines about what you're building and I'll give you a quote after we talk through the scope.",
            },
            {
              question: "How long does a typical project take?",
              answer:
                "It depends on the scope and on how quickly content and feedback come back. We agree on the scope and the timeline before work starts, and I only take on work I can finish properly.",
            },
            {
              question: "Do you work with businesses outside Lahore?",
              answer: (
                <>
                  Yes. Most of my work is remote, so I work with clients
                  across Pakistan and internationally. I also serve businesses
                  in Muridke — see my{" "}
                  <a href="/web-developer-muridke">Muridke page</a> for that.
                </>
              ),
            },
          ]}
        />

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
              Real products and real client work — messaging, commerce,
              productivity, and customer operations. VibeTalk and Ember &amp;
              Co. are live; the RESI D&apos;ELITE dashboard was built for a
              real customer. These are the tools my Lahore work is built on:
              the chat, ordering and dashboard systems I build for businesses
              here.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <CaseStudy key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        <About
          lead="I'm Hamza Bhulla, a full-stack developer in Lahore building web apps and platforms — from the interface to the backend — with care for clarity and reliability."
          note="I'm based in Lahore, and most of my work is remote — with businesses here in the city and with teams around the world. The work I do most here is web apps and platforms: real-time chat, restaurant ordering, and dashboards that run a business's operations."
        />
        <TechStack
          intro="The stack behind the web apps — React, TypeScript and Supabase, with the payments and realtime integrations my Lahore projects run on. One stack, end to end, so nothing gets lost between the interface and the database."
          closing="The same stack runs everything from a restaurant ordering system to a real-time chat app — the tools stay the same, the product changes with the business."
        />
        <Contact currentArea="lahore" cta="Open to remote roles, thoughtful collaborations, and select freelance projects — with businesses in Lahore and teams around the world. Email me a few lines about what you're building and I'll tell you honestly whether it's a good fit." />
      </main>
    </>
  );
}

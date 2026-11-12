import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import LocalLanding from "@/components/LocalLanding";
import CaseStudy from "@/components/CaseStudy";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import { projects } from "@/lib/mock-data";
import { siteUrl } from "@/lib/site-url";

const canonicalPath = "/web-developer-muridke";
const pageUrl = siteUrl + canonicalPath;

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "heyhamza.dev@gmail.com";

export const metadata: Metadata = {
  title: "Web Developer in Muridke",
  description:
    "Web developer in Muridke building React and TypeScript websites for shops, clinics, and restaurants, working remotely from Lahore.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Web Developer in Muridke | Hamza Bhulla",
    description:
      "Web developer in Muridke building React and TypeScript websites for shops, clinics, and restaurants, working remotely from Lahore.",
    url: pageUrl,
    type: "website",
    siteName: "Hamza Bhulla",
    locale: "en_US",
    images: [
      {
        url: "/web-developer-muridke/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Web Developer in Muridke, Hamza Bhulla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Developer in Muridke | Hamza Bhulla",
    description:
      "Web developer in Muridke building React and TypeScript websites for shops, clinics, and restaurants, working remotely from Lahore.",
    images: ["/web-developer-muridke/opengraph-image"],
  },
};

export default function WebDeveloperMuridke() {
  return (
    <>
      <SiteNav />
      <main className="site-main">
        <LocalLanding
          city="Muridke"
          area="Muridke, Sheikhupura District, Punjab, Pakistan"
          canonicalPath={canonicalPath}
          kicker="Freelance web developer / Muridke / Lahore / Remote"
          titleLine="Web developer"
          titleSpan="in Muridke."
          intro="I'm Hamza Bhulla, a full-stack web developer based in Lahore, working remotely with small businesses in Muridke, Sheikhupura District, Punjab. If you run a shop, a clinic, or a restaurant or cafe in Muridke, I build you a website that works on every phone, and you review it on your own phone before it goes live."
          servicesHeading="Built for small businesses."
          servicesLede="Practical websites and tools for Muridke businesses: no jargon, no clutter, and you see it working before it goes live."
          services={[
            {
              title: "Websites for shops and clinics",
              summary:
                "A clear, fast website for your shop, clinic or service in Muridke: what you offer, your hours and location, and how customers reach you.",
            },
            {
              title: "Restaurant and cafe ordering",
              summary:
                "Menu, ordering and reservations for restaurants and cafes, the same kind of platform I built for Ember & Co.",
            },
            {
              title: "WhatsApp and booking tools",
              summary:
                "Booking and customer-management tools that work with WhatsApp, the kind of operations dashboard I built for a real client at RESI D'ELITE.",
            },
            {
              title: "Simple web apps",
              summary:
                "Small, focused web apps with React and TypeScript: a booking form, a customer list, a dashboard, built to be maintained, not to impress.",
            },
          ]}
          faqHeadingLine="Questions, "
          faqHeadingSpan="answered."
          process={{
            heading: "How remote work works.",
            lede: "No office visits needed. The whole project runs on messages and calls.",
            steps: [
              {
                title: "Tell me what you need",
                summary:
                  "Email me a few lines about your business and what you want the website to do.",
              },
              {
                title: "We agree the scope",
                summary:
                  "We talk through it by message or call, and agree what will be built before any work starts.",
              },
              {
                title: "You review previews",
                summary:
                  "I build it and share previews as I go. You check each step on your own phone.",
              },
              {
                title: "It goes live",
                summary:
                  "Once you're happy with it, the website goes live.",
              },
            ],
          }}
          faqs={[
            {
              question: "I'm in Muridke and you're in Lahore. How does that work?",
              answer:
                "Everything runs remotely. We talk by message and call, I build the website online, and you review previews on your own phone. No office visits are needed, and the work is the same as what my Lahore clients get.",
            },
            {
              question: "What can you build for a small business in Muridke?",
              answer:
                "A website for your shop, clinic or service, ordering and reservations for a restaurant or cafe, or a small booking tool that works with WhatsApp. Tell me what your business needs and I'll tell you honestly whether I can build it.",
            },
            {
              question: "Can I see the website before it goes live?",
              answer:
                "Yes. I share previews as I build, and you check each step on your own phone. Nothing goes live until you're happy with it.",
            },
            {
              question: "How much does a website for a small business cost?",
              answer:
                "It depends on what the website has to do. A simple business website and a site with ordering or booking are different jobs. Email me a few lines about your business and I'll give you a quote after we talk through the scope.",
            },
            {
              question: "Do you also work in Lahore?",
              answer: (
                <>
                  Yes. I&apos;m based in Lahore and work with businesses there
                  too. See my <a href="/web-developer-lahore">Lahore page</a>{" "}
                  for that. Muridke is part of the same service area.
                </>
              ),
            },
            {
              question: "How do we start?",
              answer: (
                <>
                  Email me at {contactEmail} with a few lines about your
                  business and what you want the website to do. We&apos;ll
                  talk through the scope first, and I&apos;ll tell you
                  honestly if it&apos;s a good fit.
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
              The work <span>behind it.</span>
            </h2>
            <p className="section-lede">
              The same work, delivered remotely: messaging, commerce,
              productivity, and customer operations. The chat, ordering and
              dashboard tools behind these products are what I build for
              small businesses. Every one of them started the way a Muridke
              project starts: a few lines about the business, then previews
              on the owner&apos;s phone.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <CaseStudy key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        <About
          lead="I'm Hamza Bhulla, a full-stack developer based in Lahore, building websites for small businesses in Muridke and across Punjab, remotely, with care for clarity and reliability."
          note="I work remotely from Lahore with businesses in Muridke and across Punjab. If you run a shop, a clinic, or a restaurant or cafe, the project runs on messages and calls, and you review previews on your own phone before anything goes live."
          headline={
            <>
              Simple websites,
              <br />
              <span>built properly.</span>
            </>
          }
        />
        <TechStack
          intro="The same stack, kept simple: React and TypeScript, so a small business website stays fast, easy to maintain, and easy to change later."
          closing="The same stack, kept to what a small business needs: fast pages, simple maintenance, and room to grow later."
          heading={
            <>
              A simple <span>toolkit.</span>
            </>
          }
        />
        <Contact
          currentArea="muridke"
          cta="If you run a business in Muridke, email me a few lines about it: what it does, and what you want the website to do. I'll tell you honestly whether it's a good fit, and what it would take."
          heading={
            <>
              Tell me about
              <br />
              <span>your business.</span>
            </>
          }
        />
      </main>
    </>
  );
}

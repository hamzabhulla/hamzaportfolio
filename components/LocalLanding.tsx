import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import DragStack from "@/components/DragStack";
import FaqAccordion from "@/components/FaqAccordion";
import { siteUrl } from "@/lib/site-url";
import { socialLinks } from "@/lib/social-links";
import { toPlainText } from "@/lib/to-plain-text";

export type LocalService = {
  title: string;
  summary: string;
};

export type LocalFaq = {
  question: string;
  answer: ReactNode;
};

export type LocalProcessStep = {
  title: string;
  summary: string;
};

export type LocalProcess = {
  heading: string;
  lede: string;
  steps: LocalProcessStep[];
};

export type LocalLandingProps = {
  city: string;
  area: string;
  canonicalPath: string;
  kicker: string;
  titleLine: string;
  titleSpan: string;
  intro: string;
  servicesHeading: string;
  servicesLede: string;
  services: LocalService[];
  process?: LocalProcess;
  faqs: LocalFaq[];
};

export function LocalFaqSection({
  faqs,
  faqHeadingLine = "Common ",
  faqHeadingSpan = "questions.",
}: {
  faqs: LocalFaq[];
  faqHeadingLine?: string;
  faqHeadingSpan?: string;
}) {
  return (
    <section
      id="faq"
      className="faq-section content-shell"
      aria-labelledby="local-faq-heading"
    >
      <div className="section-topline">
        <p className="eyebrow">FAQ</p>
      </div>

      <div className="faq-heading-row">
        <h2 id="local-faq-heading" className="section-heading">
          {faqHeadingLine}<span>{faqHeadingSpan}</span>
        </h2>
      </div>

      <FaqAccordion faqs={faqs} />
    </section>
  );
}

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "heyhamza.dev@gmail.com";

export default function LocalLanding({
  city,
  area,
  canonicalPath,
  kicker,
  titleLine,
  titleSpan,
  intro,
  servicesHeading,
  servicesLede,
  services,
  process,
  faqs,
}: LocalLandingProps) {
  const base = siteUrl;
  const pageUrl = base + canonicalPath;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": pageUrl + "#service",
        name: "Hamza Bhulla, Freelance Web Developer",
        description: intro,
        url: pageUrl,
        email: contactEmail,
        areaServed: {
          "@type": "City",
          name: city,
          addressRegion: "Punjab",
          addressCountry: "PK",
        },
        serviceArea: area,
        provider: {
          "@type": "Person",
          name: "Hamza Bhulla",
          jobTitle: "Full-Stack Developer",
          url: base,
        },
        sameAs: socialLinks.map((link) => link.href),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: toPlainText(faq.answer),
          },
        })),
      },
    ],
  };

  const schemaJsonLd = JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJsonLd }}
      />

      <section id="top" className="hero-section" aria-labelledby="local-title">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">
              <span className="status-dot" aria-hidden="true" />
              {kicker}
            </p>

            <h1 id="local-title" className="hero-title">
              {titleLine}
              <br />
              <span>{titleSpan}</span>
            </h1>

            <p className="hero-description">{intro}</p>

            <div className="hero-actions">
              <a className="button-primary" href="#work">
                View projects <ArrowDownRight size={17} aria-hidden="true" />
              </a>
              <a className="button-text" href="#contact">
                Contact me <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <DragStack />
        </div>
      </section>

      <section
        id="services"
        className="skills-section content-shell local-services"
        aria-labelledby="services-heading"
      >
        <div className="section-topline">
          <p className="eyebrow">Services</p>
        </div>

        <div className="skills-heading-row">
          <h2 id="services-heading" className="section-heading">
            {servicesHeading}
          </h2>
          <p className="section-lede">{servicesLede}</p>
        </div>

        <div className="skill-groups">
          {services.map((service, index) => (
            <article className="skill-group" key={service.title}>
              <div className="skill-card-heading">
                <span className="skill-number">
                  0{index + 1}
                </span>
              </div>
              <h3>{service.title}</h3>
              <p className="skill-summary">{service.summary}</p>
            </article>
          ))}
        </div>
      </section>

      {process && (
        <section
          id="process"
          className="skills-section content-shell local-services"
          aria-labelledby="process-heading"
        >
          <div className="section-topline">
            <p className="eyebrow">Process</p>
          </div>

          <div className="skills-heading-row">
            <h2 id="process-heading" className="section-heading">
              {process.heading}
            </h2>
            <p className="section-lede">{process.lede}</p>
          </div>

          <div className="skill-groups">
            {process.steps.map((step, index) => (
              <article className="skill-group" key={step.title}>
                <div className="skill-card-heading">
                  <span className="skill-number">0{index + 1}</span>
                </div>
                <h3>{step.title}</h3>
                <p className="skill-summary">{step.summary}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

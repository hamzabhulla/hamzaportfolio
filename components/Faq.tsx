const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "heyhamza.dev@gmail.com";

export const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "I build full-stack web products end to end: customer-facing web apps and SaaS products, AI-powered features, and business platforms like restaurant ordering, reservations, and payments — from the interface to the backend, database, and integrations.",
  },
  {
    question: "Are you available for remote work with international clients?",
    answer:
      "Yes. I'm based in Lahore, Pakistan and work remotely with clients and teams around the world. I'm open to remote roles, thoughtful collaborations, and select freelance projects.",
  },
  {
    question: "What is your tech stack?",
    answer:
      "React and TypeScript on the frontend, Node.js and Express on the backend, and Supabase with PostgreSQL for data, auth, and realtime features. I add integrations like Stripe payments and AI APIs where they earn their place.",
  },
  {
    question: "What have you built?",
    answer:
      "The work section above covers the highlights: VibeTalk, a real-time messaging app; Ember & Co., a complete restaurant platform; WebNotepad, an offline-first writing PWA; and a WhatsApp booking dashboard built for a real client.",
  },
  {
    question: "How do we start a project together?",
    answer: `Email me at ${contactEmail} with a few lines about what you're building. We'll talk through the scope and timeline first, and I only take on work I can finish properly.`,
  },
  {
    question: "Where are you based, and how do we work across time zones?",
    answer:
      "I'm based in Lahore, Pakistan (PKT), and working remotely is my default. I keep communication async-friendly and make time to overlap with clients for calls and updates.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Faq() {
  const faqJsonLd = JSON.stringify(faqSchema).replace(/</g, "\\u003c");

  return (
    <section
      id="faq"
      className="faq-section content-shell"
      aria-labelledby="faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />
      <div className="section-topline">
        <p className="eyebrow">FAQ</p>
        <p className="section-index">QUESTIONS · 06</p>
      </div>

      <div className="faq-heading-row">
        <h2 id="faq-heading" className="section-heading">
          Common <span>questions.</span>
        </h2>
        <p className="section-lede">
          Short, honest answers — the same ones I would give you on a call.
        </p>
      </div>

      <div className="faq-list">
        {faqs.map((faq) => (
          <article className="faq-item" key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

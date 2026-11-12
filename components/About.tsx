import type { ReactNode } from "react";

export default function About({ note, headline, lead }: { note?: string; headline?: ReactNode; lead?: string }) {
  return (
    <section
      id="about"
      className="about-section content-shell"
      aria-labelledby="about-heading"
    >
      <div className="section-topline">
        <p className="eyebrow">About</p>
      </div>

      <div className="about-grid">
        <h2 id="about-heading" className="section-heading">
          {headline ?? (
            <>
              Good software
              <br />
              <span>feels simple.</span>
            </>
          )}
        </h2>

        <div className="about-copy">
          <p className="about-lead">
            {lead ??
              "I’m Hamza Bhulla, a full-stack developer building web apps from interface to backend, with care for clarity and reliability."}
          </p>
          <p>
            My work spans real-time messaging, restaurant commerce,
            offline-first productivity, and a WhatsApp concierge dashboard
            built for a real customer.
          </p>
          {note && <p>{note}</p>}
          <a className="text-link" href="#contact">
            Work with me
          </a>
        </div>
      </div>
    </section>
  );
}

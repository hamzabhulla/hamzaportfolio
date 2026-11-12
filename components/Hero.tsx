import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

/**
 * Static hero: same headline, kicker, description and buttons as before.
 * The three draggable preview cards are replaced by one static VibeTalk
 * preview — no drag handlers, no hint, no stage tags.
 */
export default function Hero() {
  return (
    <section id="top" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="status-dot" aria-hidden="true" />
            Full-stack developer <span className="kicker-divider">/</span> Pakistan · Remote
          </p>

          <h1 id="hero-title" className="hero-title">
            I build web
            <br />
            <span>products that work.</span>
          </h1>

          <p className="hero-description">
            Thoughtful interfaces, reliable backends, and practical integrations
            across messaging, commerce, and productivity.
          </p>

          <div className="hero-actions">
            <a className="button-primary" href="#work">
              View projects <ArrowDownRight size={17} aria-hidden="true" />
            </a>
            <a className="button-text" href="#contact">
              Contact me <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <figure className="hero-preview">
          <Image
            src="/vibetalk-preview.png"
            alt="VibeTalk chat interface preview"
            width={1881}
            height={894}
            sizes="(max-width: 760px) 92vw, (max-width: 1050px) 45vw, 40vw"
            priority
            decoding="async"
            draggable={false}
          />
          <figcaption>
            <span>VibeTalk</span>
            <span>Realtime chat · WebRTC calls</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

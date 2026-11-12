import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import DragStack from "@/components/DragStack";

export default function Hero() {
  return (
    <section id="top" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="status-dot" aria-hidden="true" />
            Full-stack developer <span className="kicker-divider">/</span> Pakistan / Remote
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

        <DragStack />
      </div>
    </section>
  );
}

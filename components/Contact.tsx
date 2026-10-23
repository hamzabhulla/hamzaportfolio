import { ArrowUpRight, Mail } from "lucide-react";
import SocialIcon from "@/components/SocialIcon";
import { socialLinks } from "@/lib/social-links";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "heyhamza.dev@gmail.com";

export default function Contact() {
  return (
    <footer id="contact" className="contact-section">
      <div className="contact-inner content-shell">
        <div className="section-topline">
          <p className="eyebrow">Have something in mind?</p>
          <p className="section-index">LET’S MAKE IT USEFUL</p>
        </div>
        <div className="contact-main">
          <h2 className="contact-heading">
            Good work starts
            <br />
            <span>with a conversation.</span>
          </h2>
          <div className="contact-cta">
            <p>Open to remote roles, thoughtful collaborations, and select freelance projects with teams around the world.</p>
            <a className="contact-email" href={"mailto:" + contactEmail}>
              <Mail size={17} aria-hidden="true" /> {contactEmail}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="contact-bottom">
          <a href="#top" className="footer-brand" aria-label="Back to top">
            <span className="brand-mark">h<span>.</span></span>
            <span>Hamza Bhulla</span>
          </a>

          <nav className="social-links" aria-label="Social profiles">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer me">
                <SocialIcon name={link.icon} />
                {link.label}<ArrowUpRight size={12} aria-hidden="true" />
              </a>
            ))}
          </nav>
          <p className="copyright">© {new Date().getFullYear()} Hamza Bhulla</p>
        </div>
      </div>
    </footer>
  );
}

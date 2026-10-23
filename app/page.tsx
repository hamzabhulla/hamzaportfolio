import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CaseStudy from "@/components/CaseStudy";
import TechStack from "@/components/TechStack";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import { projects } from "@/lib/mock-data";

export default function Home() {
  return (
    <>
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
            <p className="section-index">SELECTED WORK · 04</p>
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

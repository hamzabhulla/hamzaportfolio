import Image from "next/image";
import { ArrowUpRight, Code2 } from "lucide-react";

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  statusNote?: string;
  gallery?: { src: string; alt: string }[];
};

export default function CaseStudy({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const imageSrc = project.image.startsWith("https://")
    ? project.image
    : project.image.startsWith("/")
      ? project.image
      : "/" + project.image;

  return (
    <article className={"project-card project-card-" + ((index % 2) + 1)}>
      <a
        className="project-image-link"
        href={project.liveUrl || project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={"Open " + project.title + " project"}
      >
        <div className="project-image">
          <div className="project-image-chrome">
            <span className="chrome-dots"><i /><i /><i /></span>
            <span className="project-image-path">PROJECT / {project.id}</span>
            <span className="project-image-arrow"><ArrowUpRight size={16} /></span>
          </div>
          <Image
            src={imageSrc}
            alt={project.title + " project screenshot"}
            width={1200}
            height={800}
            sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1050px) calc(50vw - 34px), 620px"
            loading="lazy"
            decoding="async"
          />
          <span className="project-image-index">{project.id}</span>
        </div>
      </a>

      {project.gallery && project.gallery.length > 0 && (
        <div className="project-gallery" aria-label={project.title + " additional screenshots"}>
          {project.gallery.map((item, galleryIndex) => (
            <a
              className="project-gallery-item"
              key={item.src}
              href={item.src}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={"Open full screenshot: " + item.alt}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={640}
                height={440}
                sizes="(max-width: 760px) 28vw, (max-width: 1050px) 14vw, 12vw"
                loading="lazy"
                decoding="async"
              />
              <span>0{galleryIndex + 2}</span>
            </a>
          ))}
        </div>
      )}

      <div className="project-content">
        <div className="project-meta">
          <span>{project.category}</span>
          <span className="project-meta-line" />
          <span>0{index + 1} / 04</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.statusNote && <p className="project-status-note">{project.statusNote}</p>}
        <ul className="project-tags" aria-label={project.title + " technologies"}>
          {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <div className="project-links">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live project <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Code2 size={15} aria-hidden="true" /> Source code <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

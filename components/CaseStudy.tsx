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
};

export default function CaseStudy({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  // Project images are local only (public/): next/image has no
  // remotePatterns, so a remote URL would throw at runtime. The old
  // https:// branch could never work — it is deleted, not kept.
  const imageSrc = project.image.startsWith("/")
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
          <Image
            src={imageSrc}
            alt={project.title + " project screenshot"}
            width={1200}
            height={800}
            sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1050px) calc(50vw - 34px), 620px"
            loading="lazy"
            decoding="async"
          />
        </div>
      </a>

      <div className="project-content">
        <div className="project-meta">
          <span>{project.category}</span>
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

import { ArrowUpRight, ExternalLink } from "lucide-react";

function Cover({ project }) {
  if (project.cover) {
    return <img src={project.cover} alt={`${project.title} preview`} loading="lazy" />;
  }
  const initials = project.title
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w) && w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <span className="cover-fallback" aria-hidden="true">
      <span className="cover-initials">{initials}</span>
      <span className="cover-label">{project.tech.slice(0, 3).join("  ·  ")}</span>
    </span>
  );
}

export default function Projects({ projects, onSelectProject }) {
  return (
    <section className="projects" id="projects">
      <h2 className="section-title">Selected projects</h2>

      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id} className="project-card">
            {project.demo ? (
              <a
                className="project-thumb"
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open the live demo of ${project.title}`}
              >
                <Cover project={project} />
                <span className="thumb-badge">
                  Live demo <ExternalLink size={15} />
                </span>
              </a>
            ) : (
              <button
                type="button"
                className="project-thumb"
                onClick={() => onSelectProject(project)}
                aria-label={`Open details for ${project.title}`}
              >
                <Cover project={project} />
                <span className="thumb-badge">
                  Details <ArrowUpRight size={15} />
                </span>
              </button>
            )}

            <button
              type="button"
              className="project-info"
              onClick={() => onSelectProject(project)}
              aria-label={`Open details for ${project.title}`}
            >
              <span className="project-kind">{project.category}</span>
              <span className="project-title">{project.title}</span>
              <span className="project-desc">{project.description}</span>
              <span className="project-tags">
                {project.tech.slice(0, 4).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </span>
              <span className="project-more">
                Read the story <ArrowUpRight size={18} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

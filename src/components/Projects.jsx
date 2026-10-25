import { ArrowUpRight } from "lucide-react";

export default function Projects({ projects, onSelectProject }) {
  return (
    <section className="projects" id="projects">
      <h2 className="section-title">Selected projects</h2>

      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id}>
            <button
              type="button"
              className="project-row"
              onClick={() => onSelectProject(project)}
              aria-label={`Open details for ${project.title}`}
            >
              <span className="project-kind">{project.category}</span>
              <span className="project-main">
                <span className="project-title">{project.title}</span>
                <span className="project-desc">{project.description}</span>
                <span className="project-tags">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </span>
              </span>
              <span className="project-arrow" aria-hidden="true">
                <ArrowUpRight size={26} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { ArrowUpRight } from "lucide-react";
import ProjectPreview from "./ProjectPreview";

export default function Projects({ projects, onSelectProject }) {
  return (
    <section className="projects-section section-wrap" id="projects">
      <div className="projects-heading-row">
        <div>
          <span className="section-kicker">My Projects</span>
          <h2 className="section-heading">
            Featured <span>Projects</span>
          </h2>
        </div>
        <a className="view-all" href="#projects">
          Explore Projects <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <button
            type="button"
            className="project-card"
            key={project.id}
            onClick={() => onSelectProject(project)}
            aria-label={`View details for ${project.title}`}
          >
            <ProjectPreview type={project.icon} />
            <div className="project-card-content">
              <span className="project-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <span className="project-link">
                View Project <ArrowUpRight size={15} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

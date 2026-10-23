import { ExternalLink, X } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import ProjectPreview from "./ProjectPreview";

export default function ProjectModal({ project, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X />
        </button>

        <span className="section-kicker">Project Details</span>
        <ProjectPreview type={project.icon} />
        <span className="project-category">{project.category}</span>
        <h2>{project.title}</h2>
        <p>{project.details}</p>
        <h3>Technologies Used</h3>

        <div className="tech-tags">
          {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
        </div>

        <div className="modal-actions">
          {project.demo ? (
            <a className="button button-pink" href={project.demo} target="_blank" rel="noreferrer">
              Live Demo <ExternalLink size={15} />
            </a>
          ) : (
            <span className="button button-pink disabled-button">
              Live Demo — Add link
            </span>
          )}

          {project.github ? (
            <a className="button button-outline" href={project.github} target="_blank" rel="noreferrer">
              <FaGithub size={16} /> GitHub
            </a>
          ) : (
            <span className="button button-outline disabled-button">
              GitHub — Add link
            </span>
          )}
        </div>
      </section>
    </div>
  );
}

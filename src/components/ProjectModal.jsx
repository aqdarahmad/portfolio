import { useEffect, useRef } from "react";
import { ExternalLink, X } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

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
          ref={closeRef}
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X size={20} />
        </button>

        <p className="modal-kind">{project.category}</p>
        <h2>{project.title}</h2>
        <p className="modal-details">{project.details}</p>

        {project.gallery?.length > 0 && (
          <ul className="gallery" aria-label="Project images">
            {project.gallery.map((img) => (
              <li key={img.src}>
                <a href={img.src} target="_blank" rel="noreferrer">
                  <img src={img.src} alt={img.caption} loading="lazy" width="596" height="335" />
                </a>
                <span>{img.caption}</span>
              </li>
            ))}
          </ul>
        )}

        <ul className="tech-tags" aria-label="Technologies used">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className="modal-actions">
          {project.demo && (
            <a className="button button-solid" href={project.demo} target="_blank" rel="noreferrer">
              Live demo <ExternalLink size={16} />
            </a>
          )}
          {project.github && (
            <a className="button button-ghost" href={project.github} target="_blank" rel="noreferrer">
              <FaGithub size={17} /> Source code
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

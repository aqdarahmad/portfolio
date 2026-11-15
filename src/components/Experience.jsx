import { ArrowUpRight, Award } from "lucide-react";

export default function Experience({
  items,
  certificates,
  projects,
  onSelectCertificate,
  onSelectProject,
}) {
  return (
    <section className="experience" id="experience">
      <h2 className="section-title">Experience</h2>
      <ol className="experience-list">
        {items.map((item) => {
          const certificate = certificates.find((c) => c.id === item.certificateId);
          const project = projects.find((p) => p.id === item.projectId);
          return (
            <li key={item.id} className="experience-item">
              <h3 className="experience-role">{item.role}</h3>
              <p className="experience-org">
                {item.org} · {item.type}
              </p>
              <p className="experience-meta">
                {item.period} · {item.duration} · {item.location}
              </p>
              {item.details.map((text) => (
                <p key={text} className="experience-detail">
                  {text}
                </p>
              ))}
              <ul className="experience-skills" aria-label="Skills used">
                {item.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              {(certificate || project) && (
                <div className="experience-links">
                  {certificate && (
                    <button
                      type="button"
                      className="button button-ghost button-small"
                      onClick={() => onSelectCertificate(certificate)}
                    >
                      <Award size={16} aria-hidden="true" /> View certificate
                    </button>
                  )}
                  {project && (
                    <button
                      type="button"
                      className="button button-ghost button-small"
                      onClick={() => onSelectProject(project)}
                    >
                      View {project.title} <ArrowUpRight size={16} aria-hidden="true" />
                    </button>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { Download, ExternalLink, X } from "lucide-react";

export default function CertificateModal({ item, onClose }) {
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

  const meta = [item.issuer, item.date].filter(Boolean).join(" · ");

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="project-modal cert-modal"
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close certificate"
        >
          <X size={20} />
        </button>

        <p className="modal-kind">{item.category}</p>
        <h2>{item.title}</h2>
        {meta && <p className="cert-modal-meta">{meta}</p>}
        <p className="modal-details">{item.summary}</p>

        <a className="cert-modal-image" href={item.image} target="_blank" rel="noreferrer">
          <img src={item.image} alt={`${item.title} certificate`} />
        </a>

        {item.chips?.length > 0 && (
          <ul className="tech-tags" aria-label="Highlights">
            {item.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
        )}

        {item.credential && (
          <p className="cert-credential">Certificate no. {item.credential}</p>
        )}

        <div className="modal-actions">
          {item.verify && (
            <a className="button button-solid" href={item.verify} target="_blank" rel="noreferrer">
              Verify online <ExternalLink size={16} />
            </a>
          )}
          {item.pdf && (
            <a className="button button-ghost" href={item.pdf} target="_blank" rel="noreferrer">
              <Download size={16} /> PDF
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

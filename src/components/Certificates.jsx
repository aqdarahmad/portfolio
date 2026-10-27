import { ArrowUpRight } from "lucide-react";

function CertGroup({ title, items, onSelect }) {
  return (
    <div className="cert-group">
      <h3 className="cert-group-title">{title}</h3>
      <ul className="cert-grid">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="cert-card"
              onClick={() => onSelect(item)}
              aria-label={`View certificate: ${item.title}`}
            >
              <span className="cert-thumb">
                <img src={item.image} alt={`${item.title} certificate`} loading="lazy" width="1400" height="990" />
                <span className="thumb-badge">
                  View <ArrowUpRight size={15} />
                </span>
              </span>
              <span className="project-kind">{item.category}</span>
              <span className="cert-title">{item.title}</span>
              <span className="cert-meta">
                {[item.issuer, item.date].filter(Boolean).join(" · ")}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Certificates({ achievements, certificates, onSelectCertificate }) {
  return (
    <section className="certificates" id="certificates">
      <h2 className="section-title">Certificates &amp; achievements</h2>
      <CertGroup title="Achievements" items={achievements} onSelect={onSelectCertificate} />
      <CertGroup title="Certificates & training" items={certificates} onSelect={onSelectCertificate} />
    </section>
  );
}

import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="section-wrap contact-content">
        <span className="section-kicker">Have a project in mind?</span>
        <h2>
          Let's build something <span>amazing</span>
        </h2>
        <p>
          I'd love to hear about opportunities, collaborations,
          or just say hello!
        </p>
        <a className="button button-pink" href="mailto:your-email@example.com">
          Get In Touch <Mail size={16} />
        </a>
      </div>
    </section>
  );
}

import { Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <h2>Have an idea or an opportunity? Let's talk.</h2>
      <div className="contact-actions">
        <a className="button button-solid" href="mailto:aqdarahmad2@gmail.com">
          <Mail size={18} /> aqdarahmad2@gmail.com
        </a>
        <a
          className="button button-ghost"
          href="https://github.com/aqdarahmad"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub size={18} /> GitHub
        </a>
        <a
          className="button button-ghost"
          href="https://www.linkedin.com/in/aqdar-ahmad-b30832421"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedinIn size={18} /> LinkedIn
        </a>
        <a className="button button-ghost" href="/Aqdar_Ahmad_CV.pdf" download>
          <Download size={18} /> Download CV
        </a>
      </div>
    </section>
  );
}

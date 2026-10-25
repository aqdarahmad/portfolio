import { ArrowDownRight, Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import portrait from "../assets/aqdar.jpg";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <h1 className="hero-name" aria-label="Aqdar Ahmad">
        <span className="hero-name-line"><span>Aqdar</span></span>
        <span className="hero-name-line"><span>Ahmad</span></span>
      </h1>

      <figure className="hero-portrait">
        <img
          src={portrait}
          alt="Portrait of Aqdar Ahmad"
          width="900"
          height="1200"
        />
      </figure>

      <div className="hero-side">
        <p className="hero-role">Computer Systems Engineer</p>
        <p className="hero-description">
          I build web applications and APIs, and I like turning an idea into
          something people can actually use. I'm always learning new tools to
          do it better.
        </p>
        <div className="hero-actions">
          <a className="button button-solid" href="#projects">
            See my projects <ArrowDownRight size={18} />
          </a>
          <a className="button button-ghost" href="mailto:aqdarahmad2@gmail.com">
            <Mail size={17} /> Email me
          </a>
          <a
            className="icon-link"
            href="https://github.com/aqdarahmad"
            target="_blank"
            rel="noreferrer"
            aria-label="Aqdar on GitHub"
          >
            <FaGithub size={22} />
          </a>
        </div>
      </div>
    </section>
  );
}

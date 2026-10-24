import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import portrait from "../assets/aqdar.jpg";

export default function Hero() {
  return (
    <section className="hero section-wrap" id="home">
      <div className="hero-copy">
        <span className="eyebrow-pill">Hello, I'm</span>
        <h1>
          Aqdar <span>Ahmad</span>
        </h1>
        <h2>Computer Systems Engineer</h2>
        <p className="hero-description">
          I'm a passionate developer who loves building modern web
          applications and turning ideas into real solutions. I enjoy
          learning new technologies and creating projects that make
          an impact.
        </p>

        <div className="hero-buttons">
          <a className="button button-pink" href="#projects">
            View My Projects <ArrowUpRight size={17} />
          </a>
          <a className="button button-outline" href="#contact">
            Contact Me <Mail size={16} />
          </a>
        </div>

        <div className="social-links">
          <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn size={20} />
          </a>
          <a href="mailto:aqdarahmad2@gmail.com" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="portrait-shape">
          <img
            className="portrait-photo"
            src={portrait}
            alt="Aqdar Ahmad"
            width="820"
            height="878"
          />
        </div>
        <span className="doodle doodle-crown">♕</span>
        <span className="doodle doodle-heart">♡</span>
        <span className="handwritten">
          Code<br />
          Create<br />
          Improve ♡
        </span>
      </div>
    </section>
  );
}

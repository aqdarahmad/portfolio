import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer">
      <a className="brand" href="#home" aria-label="Back to home">
        A<span>A</span>
      </a>

      <div>
        <strong>Aqdar Ahmad</strong>
        <small>Computer Systems Engineer</small>
      </div>

      <div className="footer-socials">
        <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <FaLinkedinIn />
        </a>
        <a href="mailto:your-email@example.com" aria-label="Email">
          <Mail />
        </a>
      </div>

      <span className="footer-note">
        Thanks for visiting my portfolio! ♡
      </span>
    </footer>
  );
}

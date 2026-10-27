import { Download, Moon, Sun } from "lucide-react";

export default function Navbar({ darkMode, onToggleTheme }) {
  return (
    <header className="navbar">
      <a className="brand" href="#home" aria-label="Aqdar Ahmad, back to top">
        Aqdar Ahmad
      </a>

      <nav aria-label="Main">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a className="nav-extra" href="#certificates">Certificates</a>
        <a href="#contact">Contact</a>
      </nav>

      <a className="cv-pill" href="/Aqdar_Ahmad_CV.pdf" download>
        <Download size={15} aria-hidden="true" /> CV
      </a>

      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}

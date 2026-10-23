
import { Download, Moon, Sun } from "lucide-react";

export default function Navbar({ darkMode, onToggleTheme }) {
  return (
    <header className="navbar">
      <a className="brand" href="#home" aria-label="Home">
        A<span>A</span>
      </a>

      <nav>
        <a className="active" href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="nav-actions">
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {darkMode ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        <a className="button button-pink cv-button" href="/cv.pdf" download>
          <Download size={15} />
          Download CV
        </a>
      </div>
    </header>
  );
}

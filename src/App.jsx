import { useEffect, useState } from "react";
import Constellation from "./components/Constellation";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectModal from "./components/ProjectModal";
import CertificateModal from "./components/CertificateModal";
import { projects, skillGroups } from "./data/projects";
import { achievements, certificates } from "./data/certificates";
import { experience } from "./data/experience";
import "./App.css";

const allCertificates = [...achievements, ...certificates];

export default function App() {
  // light is the default; index.html has already applied the saved choice
  const [darkMode, setDarkMode] = useState(
    () => document.documentElement.dataset.theme === "dark",
  );
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // storage can be blocked; the choice then lasts for this visit only
    }
  };

  return (
    <div className={`portfolio ${darkMode ? "dark-mode" : ""}`}>
      <Constellation dark={darkMode} />
      <Navbar darkMode={darkMode} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Experience
          items={experience}
          certificates={allCertificates}
          projects={projects}
          onSelectCertificate={setSelectedCertificate}
          onSelectProject={setSelectedProject}
        />
        <Projects projects={projects} onSelectProject={setSelectedProject} />
        <Skills groups={skillGroups} />
        <Certificates
          achievements={achievements}
          certificates={certificates}
          onSelectCertificate={setSelectedCertificate}
        />
        <Contact />
      </main>
      <Footer />
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
      {selectedCertificate && (
        <CertificateModal
          item={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  );
}

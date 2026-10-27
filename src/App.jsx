import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectModal from "./components/ProjectModal";
import CertificateModal from "./components/CertificateModal";
import { projects, skillGroups } from "./data/projects";
import { achievements, certificates } from "./data/certificates";
import "./App.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  return (
    <div className={`portfolio ${darkMode ? "dark-mode" : ""}`}>
      <Navbar darkMode={darkMode} onToggleTheme={() => setDarkMode((prev) => !prev)} />
      <main>
        <Hero />
        <About />
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

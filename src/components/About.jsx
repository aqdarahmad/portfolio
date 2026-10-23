import { Code2, GraduationCap, Heart, Lightbulb } from "lucide-react";

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="section-wrap about-grid">
        <div>
          <span className="section-kicker">About Me</span>
          <h2 className="section-heading">
            My <span>Journey</span>
          </h2>
          <p className="about-description">
            I'm a Computer Systems Engineering graduate passionate
            about software development, problem solving, and building
            useful applications. I'm always excited to learn new tools
            and improve my skills.
          </p>
        </div>

        <div className="journey-items">
          <div className="journey-item">
            <div className="journey-icon"><GraduationCap /></div>
            <span>Graduate</span>
          </div>
          <div className="journey-item">
            <div className="journey-icon"><Code2 /></div>
            <span>Problem Solver</span>
          </div>
          <div className="journey-item">
            <div className="journey-icon"><Heart /></div>
            <span>Team Player</span>
          </div>
          <div className="journey-item">
            <div className="journey-icon"><Lightbulb /></div>
            <span>Always Learning</span>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Code2, GraduationCap, Heart, Lightbulb } from "lucide-react";

const TRAITS = [
  { icon: GraduationCap, label: "Computer Systems Engineering graduate" },
  { icon: Code2, label: "Problem solver" },
  { icon: Heart, label: "Team player" },
  { icon: Lightbulb, label: "Always learning" },
];

export default function About() {
  return (
    <section className="about" id="about">
      <h2 className="about-statement">
        I'm passionate about software development, problem solving, and
        building useful applications.
      </h2>
      <ul className="traits">
        {TRAITS.map(({ icon: Icon, label }) => (
          <li key={label}>
            <Icon size={20} aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}

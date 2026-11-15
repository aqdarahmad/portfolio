// Work experience shown in the "Experience" section, newest first.
// certificateId and projectId point at items in certificates.js and projects.js,
// so a role can open the matching certificate or project.

export const experience = [
  {
    id: "orion-vlsi",
    role: "Design Verification Engineer (Trainee)",
    org: "Orion VLSI Technologies",
    type: "Internship",
    period: "Sep 2025 – Nov 2025",
    duration: "3 months",
    location: "Ramallah, West Bank · Hybrid",
    details: [
      "Verified a 32-bit ALU using UVM in SystemVerilog and built a reusable testbench with a driver, monitor, scoreboard and agent.",
      "Applied constrained-random stimulus and functional coverage.",
    ],
    skills: ["UVM", "SystemVerilog", "Functional verification", "Functional coverage"],
    certificateId: "orion-vlsi-internship",
  },
  {
    id: "gaza-sky-geeks",
    role: "Problem Solving (Trainee)",
    org: "Gaza Sky Geeks",
    type: "Internship",
    period: "Aug 2025 – Oct 2025",
    duration: "3 months",
    location: "Remote",
    details: [
      "Solved 50+ algorithm and data-structure challenges covering arrays, linked lists, recursion and sorting.",
    ],
    skills: ["Standard Template Library (STL)", "Algorithms", "Data structures"],
    certificateId: "problem-solving",
  },
  {
    id: "palestine-tech-hub",
    role: "Full Stack MERN Development",
    org: "Palestine Tech Hub",
    type: "Internship",
    period: "Jul 2025 – Oct 2025",
    duration: "4 months",
    location: "Remote",
    details: [
      "Completed 45 hours of theoretical training and 120 hours of practical work, fulfilling all assigned tasks and projects.",
      "Project: QuizLoom, a React + Vite frontend with Material UI and Redux Toolkit, backed by an Express REST API and a PostgreSQL (Neon) database.",
    ],
    skills: ["React", "Material UI", "Redux Toolkit", "Express", "PostgreSQL"],
    certificateId: "mern-stack",
    projectId: 6,
  },
];

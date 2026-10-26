export const skillGroups = [
  {
    name: "Backend",
    items: ["C#", "ASP.NET Core", "Entity Framework Core", "Python", "FastAPI", "Node.js", "Express", "JWT"],
  },
  {
    name: "Frontend",
    items: ["React", "Vite", "Material UI", "Redux Toolkit", "Flutter"],
  },
  {
    name: "Data and AI",
    items: ["YOLOv8", "Computer vision", "PostgreSQL", "pgvector", "ChromaDB", "Google Gemini", "Semantic search"],
  },
  {
    name: "Tools and foundations",
    items: ["Git", "Docker", "Swagger", "C++", "Data structures", "Algorithms"],
  },
];

export const projects = [
  {
    id: 7,
    title: "Fabric Defect Detection System",
    category: "Computer vision, graduation project",
    description:
      "A mobile app and Raspberry Pi camera that spot fabric defects, identify the fabric type and rate its quality, so buyers can check what they are really getting.",
    details:
      "My senior graduation project, built with a team of three. People buying fabric often cannot tell the material, find defects by eye, or find the same fabric again, and online listings can be misleading. Fabric AI takes a photo from the phone or from a Raspberry Pi 4 camera with a ring light, sends it to a YOLOv8 model hosted on Roboflow, and shows the defect type, the fabric type and a quality score in the app, with reports that can be saved. The model was trained on a custom defect dataset (holes, stains and tears) and reached 85.1% mAP@50, 86.8% precision and 81.7% F1-score. The Flutter app also runs as a website: a small Node.js server handles sign-in and keeps the AI keys private, and the app keeps a history of every inspection.",
    tech: ["YOLOv8", "Computer Vision", "Flutter", "Node.js", "Raspberry Pi 4", "Roboflow", "Google Colab"],
    icon: "fabric",
    cover: "/fabric/app-overview.png",
    demo: "https://fabric-ai-py95.onrender.com",
    github: "https://github.com/aqdarahmad/Fabric-AI",
    gallery: [
      { src: "/fabric/system-design.png", caption: "How a photo becomes a result: app or Raspberry Pi, Roboflow YOLOv8 server, database, results screen" },
      { src: "/fabric/hardware.png", caption: "The inspection stand: Raspberry Pi 4, camera module and ring light" },
      { src: "/fabric/app-overview.png", caption: "The Fabric AI mobile app" },
      { src: "/fabric/app-login.png", caption: "Sign in and create account" },
      { src: "/fabric/app-connect.png", caption: "Connecting the app to the Raspberry Pi" },
      { src: "/fabric/app-scan.png", caption: "Scan flow: defects, fabric type and quality" },
      { src: "/fabric/app-dashboard.png", caption: "Quality dashboard with recent scans" },
      { src: "/fabric/app-report.png", caption: "Saved reports for each inspection" },
      { src: "/fabric/test-defect.png", caption: "Test case 1: the stain on the fabric is detected and located" },
      { src: "/fabric/test-fabric-type.png", caption: "Test case 2: the fabric is identified as polyester" },
      { src: "/fabric/test-quality.png", caption: "Test case 3: a suspected counterfeit gets a low quality score" },
    ],
  },
  {
    id: 1,
    title: "Booking System API",
    category: "Backend API",
    description:
      "A RESTful booking and ticket management API with JWT authentication and role-based access control.",
    details:
      "A backend project built with ASP.NET Core and Entity Framework Core that lets authenticated users book trips and view their tickets, while an Admin manages tickets and flights. It uses ASP.NET Core Identity with JWT for authentication, Admin/User roles for authorization, and ownership checks so users can only access their own bookings and tickets. Data is stored in PostgreSQL and the API is documented with Swagger.",
    tech: [
      "C#",
      "ASP.NET Core Web API",
      "Entity Framework Core",
      "PostgreSQL",
      "JWT",
      "ASP.NET Core Identity",
      "Swagger",
    ],
    icon: "booking",
    cover: "/projects/booking-api.jpg",
    demo: "https://booking-system-api-r3tp.onrender.com/swagger/index.html",
    github: "https://github.com/aqdarahmad/booking-system-api",
  },
  {
  id: 2,
  title: "Store Management API",
  category: "Backend API",
  description:
    "A RESTful API for managing store products and categories, with JWT authentication and role-based authorization.",
  details:
    "A backend project built with C# and ASP.NET Core Web API. It provides full CRUD for products and categories, user registration and login with ASP.NET Core Identity, and JWT bearer authentication with role-based authorization (Admin/User). It uses Entity Framework Core with PostgreSQL, is documented with Swagger/OpenAPI, and is containerized with Docker and deployed on Render.",
  tech: [
    "C#",
    "ASP.NET Core Web API",
    "Entity Framework Core",
    "PostgreSQL",
    "JWT",
    "ASP.NET Core Identity",
    "Swagger",
    "Docker"
  ],
  icon: "store",
  cover: "/projects/store-api.jpg",
  demo: "https://store-management-1-7wrw.onrender.com/swagger/index.html",
  github: "https://github.com/aqdarahmad/Store-Management",
},
 
  {
    id: 3,
    title: "GitHub RAG Chatbot",
    category: "AI chatbot",
    description:
      "A RAG chatbot that answers questions about the FastAPI documentation using semantic search and Google Gemini.",
    details:
      "A Retrieval-Augmented Generation chatbot with a FastAPI backend and a React + Vite frontend. Documentation is split into markdown-aware chunks, embedded with MiniLM on ONNX Runtime, and stored in ChromaDB. For each question, the most relevant chunks are retrieved and sent to Google Gemini to generate the answer. It includes per-IP rate limiting, input validation, API tests with pytest, and is containerized with Docker and deployed on Render.",
    tech: [
      "Python",
      "FastAPI",
      "ChromaDB",
      "Google Gemini",
      "ONNX Runtime",
      "React",
      "Vite",
      "Docker",
    ],
    icon: "chat",
    cover: "/projects/rag-chatbot.jpg",
    demo: "https://github-rag-chatbot.onrender.com",
    github: "https://github.com/aqdarahmad/github-rag-chatbot",
  },
  {
    id: 4,
    title: "Semantic Job Matching Tool",
    category: "AI web app",
    description:
      "An AI-powered tool that analyzes a PDF resume and recommends the most relevant jobs using semantic search and skill matching.",
    details:
      "A full-stack project with a FastAPI backend and a React + Vite frontend. It extracts text and skills from an uploaded resume, creates embeddings with all-MiniLM-L6-v2 on ONNX Runtime, and ranks jobs with a hybrid score that combines pgvector semantic similarity and skill matching. Google Gemini then evaluates the top matches with strengths, missing skills, and recommendations. It includes rate limiting, automatic database setup, and is containerized with Docker and deployed on Render with a Neon PostgreSQL database.",
    tech: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "ONNX Runtime",
      "Google Gemini",
      "React",
      "Vite",
      "Docker",
    ],
    icon: "search",
    cover: "/projects/job-matching.jpg",
    demo: "https://semantic-search-tool.onrender.com",
    github: "https://github.com/aqdarahmad/semantic-search-tool",
  },
  {
    id: 5,
    title: "Problem Solving",
    category: "Algorithms",
    description:
      "110 C++ solutions from contest training sheets and LeetCode, focused on data structures and algorithmic thinking.",
    details:
      "A collection of 110 problems solved in C++. It includes 75 problems from the Assiut training sheets covering data types and conditions, loops, arrays, and strings, plus 35 LeetCode problems from the Blind 75 list covering trees, linked lists, dynamic programming, graphs, and sliding window techniques.",
    tech: ["C++", "Data Structures", "Algorithms", "LeetCode"],
    icon: "code",
    cover: "/projects/leetcode.jpg",
    demo: "",
    github: "https://github.com/aqdarahmad/competitive-programming",
  },
  {
    id: 6,
    title: "QuizLoom",
    category: "Full-stack web app",
    description:
      "A full-stack quiz platform where students take timed quizzes and track their history, and admins manage categories, questions and student performance.",
    details:
      "A React + Vite frontend with Material UI and Redux Toolkit, backed by an Express REST API and a PostgreSQL (Neon) database. It has real sign-up and login with bcrypt-hashed passwords and JWT, role-based access for students and admins, randomized timed quizzes scored on the server, quiz history with statistics, and an admin dashboard with charts, a question bank editor and student management. Deployed as a single service on Render.",
    tech: [
      "React",
      "Vite",
      "Material UI",
      "Redux Toolkit",
      "Node.js",
      "Express",
      "PostgreSQL",
      "JWT",
    ],
    icon: "booking",
    cover: "/quizloom-cover.jpg",
    demo: "https://quiz-loom.onrender.com",
    github: "https://github.com/aqdarahmad/Quiz-Loom",
  },
];

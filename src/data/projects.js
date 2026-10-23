export const skills = [
  
  "C++",
  "C#",
  "ASP.NET Core",
  "Git",
];

export const projects = [
  {
    id: 1,
    title: "Booking System API",
    category: ".NET · C# · SQL",
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
    demo: "",
    github: "https://github.com/aqdarahmad/booking-system-api",
  },
  {
  id: 2,
  title: "Store Management API",
  category: ".NET · Backend Development",
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
  demo: "https://store-management-1-7wrw.onrender.com/swagger/index.html",
  github: "https://github.com/aqdarahmad/Store-Management",
},
 
  {
    id: 3,
    title: "GitHub RAG Chatbot",
    category: "AI · RAG · FastAPI",
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
    demo: "https://github-rag-chatbot.onrender.com",
    github: "https://github.com/aqdarahmad/github-rag-chatbot",
  },
  {
    id: 4,
    title: "Problem Solving",
    category: "C++ · Algorithms · LeetCode",
    description:
      "110 C++ solutions from contest training sheets and LeetCode, focused on data structures and algorithmic thinking.",
    details:
      "A collection of 110 problems solved in C++. It includes 75 problems from the Assiut training sheets covering data types and conditions, loops, arrays, and strings, plus 35 LeetCode problems from the Blind 75 list covering trees, linked lists, dynamic programming, graphs, and sliding window techniques.",
    tech: ["C++", "Data Structures", "Algorithms", "LeetCode"],
    icon: "code",
    demo: "",
    github: "https://github.com/aqdarahmad/competitive-programming",
  },
];

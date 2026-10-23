export const skills = [
  
  "C++",
  "C#",
  "ASP.NET Core",
  "Git",
];

export const projects = [
  {
    id: 1,
    title: "Fabric Type Detection API",
    category: "AI · FastAPI · Gemini",
    description:
      "An AI-powered API that detects fabric types from images and provides characteristics and care tips.",
    details:
      "A fabric detection API built with FastAPI and Google Gemini Vision. It analyzes uploaded images and returns the predicted fabric type, confidence level, characteristics, and care recommendations.",
    tech: ["Python", "FastAPI", "Google Gemini", "REST API"],
    icon: "fabric",
    demo: "",
    github: "",
  },
  {
    id: 2,
    title: "Booking System API",
    category: ".NET · C# · SQL",
    description:
      "A RESTful booking system API with authentication, database integration, and ticket management.",
    details:
      "A backend project built with ASP.NET Core and Entity Framework Core, with API endpoints for managing bookings, tickets, and related data.",
    tech: ["C#", "ASP.NET Core", "Entity Framework Core", "SQL Server", "JWT"],
    icon: "booking",
    demo: "",
    github: "",
  },
 {
  id: 3,
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
    id: 4,
    title: "Problem Solving",
    category: "C++ · Algorithms",
    description:
      "Programming exercises focused on data structures and algorithmic thinking.",
    details:
      "A collection of programming challenges covering arrays, strings, maps, algorithms, and data structures.",
    tech: ["C++", "Data Structures", "Algorithms"],
    icon: "code",
    demo: "",
    github: "",
  },
];

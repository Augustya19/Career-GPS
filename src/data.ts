export interface RoadmapStep {
  phase: string;
  duration: string;
  tasks: string[];
  resources?: string[];
}

export interface SkillRequirement {
  name: string;
  importance: 'Critical' | 'High' | 'Medium';
  timeToLearn: string;
}

export interface CareerRole {
  id: string;
  title: string;
  description: string;
  requiredSkills: SkillRequirement[];
  roadmap: RoadmapStep[];
  clusters: { name: string; skills: string[] }[];
}

export const ROLES: CareerRole[] = [
  {
    id: "data-analyst",
    title: "Data Analyst",
    description: "Interpret data and turn it into information which can offer ways to improve a business.",
    requiredSkills: [
      { name: "SQL", importance: "Critical", timeToLearn: "4 weeks" },
      { name: "Excel", importance: "High", timeToLearn: "2 weeks" },
      { name: "Python", importance: "High", timeToLearn: "6 weeks" },
      { name: "Tableau", importance: "Medium", timeToLearn: "3 weeks" },
      { name: "Statistics", importance: "High", timeToLearn: "4 weeks" },
      { name: "Communication", importance: "Medium", timeToLearn: "Ongoing" }
    ],
    clusters: [
      { name: "Foundation", skills: ["Excel", "Statistics"] },
      { name: "Core", skills: ["SQL", "Python"] },
      { name: "Visualization", skills: ["Tableau", "Communication"] }
    ],
    roadmap: [
      { phase: "Phase 1: Fundamentals", duration: "Weeks 1-2", tasks: ["Master Excel functions", "Basic Statistics concepts"], resources: ["Excel for Data Analysis (Coursera)", "Khan Academy Statistics"] },
      { phase: "Phase 2: Database & SQL", duration: "Weeks 3-5", tasks: ["SQL Joins and Aggregations", "Database design basics"], resources: ["Mode Analytics SQL Tutorial", "SQLZoo"] },
      { phase: "Phase 3: Visualization", duration: "Weeks 6-8", tasks: ["Tableau/PowerBI basics", "Creating dashboards"], resources: ["Tableau Public Gallery", "Storytelling with Data"] },
      { phase: "Phase 4: Capstone", duration: "Weeks 9-10", tasks: ["Build a portfolio project", "Resume optimization"], resources: ["Kaggle Datasets", "LinkedIn Optimization Guide"] }
    ]
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Use analytical, statistical, and programming skills to collect, analyze, and interpret large data sets.",
    requiredSkills: [
      { name: "Python", importance: "Critical", timeToLearn: "8 weeks" },
      { name: "Machine Learning", importance: "Critical", timeToLearn: "12 weeks" },
      { name: "Statistics", importance: "Critical", timeToLearn: "6 weeks" },
      { name: "SQL", importance: "High", timeToLearn: "4 weeks" },
      { name: "Deep Learning", importance: "Medium", timeToLearn: "10 weeks" },
      { name: "Cloud Computing", importance: "Medium", timeToLearn: "4 weeks" }
    ],
    clusters: [
      { name: "Math & Programming", skills: ["Python", "Statistics"] },
      { name: "Modeling", skills: ["Machine Learning", "Deep Learning"] },
      { name: "Infrastructure", skills: ["SQL", "Cloud Computing"] }
    ],
    roadmap: [
      { phase: "Phase 1: Math & Stats", duration: "Weeks 1-4", tasks: ["Linear Algebra & Calculus", "Probability & Statistics"] },
      { phase: "Phase 2: Advanced Python", duration: "Weeks 5-8", tasks: ["Pandas & Scikit-Learn", "Data Preprocessing"] },
      { phase: "Phase 3: Machine Learning", duration: "Weeks 9-14", tasks: ["Supervised & Unsupervised Learning", "Model Evaluation"] },
      { phase: "Phase 4: Deep Learning", duration: "Weeks 15-20", tasks: ["Neural Networks", "PyTorch/TensorFlow basics"] }
    ]
  },
  {
    id: "product-manager",
    title: "Product Manager",
    description: "Lead the strategy, roadmap, and feature definition for a product or product line.",
    requiredSkills: [
      { name: "Product Strategy", importance: "Critical", timeToLearn: "8 weeks" },
      { name: "User Research", importance: "High", timeToLearn: "4 weeks" },
      { name: "Agile", importance: "High", timeToLearn: "2 weeks" },
      { name: "Communication", importance: "Critical", timeToLearn: "Ongoing" },
      { name: "Market Analysis", importance: "Medium", timeToLearn: "4 weeks" },
      { name: "Data Analysis", importance: "Medium", timeToLearn: "6 weeks" }
    ],
    clusters: [
      { name: "Strategy", skills: ["Product Strategy", "Market Analysis"] },
      { name: "Execution", skills: ["Agile", "User Research"] },
      { name: "Soft Skills", skills: ["Communication", "Data Analysis"] }
    ],
    roadmap: [
      { phase: "Phase 1: Product Thinking", duration: "Weeks 1-3", tasks: ["Understanding User Needs", "Market Research basics"] },
      { phase: "Phase 2: Execution", duration: "Weeks 4-6", tasks: ["Agile/Scrum methodologies", "Writing PRDs"] },
      { phase: "Phase 3: Strategy", duration: "Weeks 7-9", tasks: ["Product Roadmapping", "Prioritization frameworks"] },
      { phase: "Phase 4: Soft Skills", duration: "Weeks 10-12", tasks: ["Stakeholder management", "Leadership workshops"] }
    ]
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    description: "Build the visual and interactive parts of websites and web applications.",
    requiredSkills: [
      { name: "React", importance: "Critical", timeToLearn: "8 weeks" },
      { name: "TypeScript", importance: "High", timeToLearn: "4 weeks" },
      { name: "Tailwind CSS", importance: "High", timeToLearn: "2 weeks" },
      { name: "JavaScript", importance: "Critical", timeToLearn: "6 weeks" },
      { name: "HTML/CSS", importance: "Critical", timeToLearn: "3 weeks" },
      { name: "Next.js", importance: "Medium", timeToLearn: "4 weeks" }
    ],
    clusters: [
      { name: "Core Web", skills: ["HTML/CSS", "JavaScript"] },
      { name: "Frameworks", skills: ["React", "Next.js"] },
      { name: "Tooling", skills: ["TypeScript", "Tailwind CSS"] }
    ],
    roadmap: [
      { phase: "Phase 1: Web Basics", duration: "Weeks 1-3", tasks: ["HTML5 semantic tags", "CSS Flexbox & Grid"] },
      { phase: "Phase 2: JavaScript Mastery", duration: "Weeks 4-7", tasks: ["ES6+ features", "DOM manipulation", "Async/Await"] },
      { phase: "Phase 3: React Ecosystem", duration: "Weeks 8-12", tasks: ["Hooks", "State Management", "React Router"] },
      { phase: "Phase 4: Modern Tooling", duration: "Weeks 13-15", tasks: ["TypeScript basics", "Tailwind CSS integration"] }
    ]
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    description: "Build and maintain the server-side logic, databases, and APIs that power web applications.",
    requiredSkills: [
      { name: "Node.js", importance: "Critical", timeToLearn: "6 weeks" },
      { name: "PostgreSQL", importance: "Critical", timeToLearn: "5 weeks" },
      { name: "Redis", importance: "Medium", timeToLearn: "2 weeks" },
      { name: "Docker", importance: "High", timeToLearn: "4 weeks" },
      { name: "API Design", importance: "Critical", timeToLearn: "4 weeks" },
      { name: "System Design", importance: "High", timeToLearn: "8 weeks" }
    ],
    clusters: [
      { name: "Runtime", skills: ["Node.js"] },
      { name: "Data Storage", skills: ["PostgreSQL", "Redis"] },
      { name: "Architecture", skills: ["API Design", "System Design", "Docker"] }
    ],
    roadmap: [
      { phase: "Phase 1: Server Basics", duration: "Weeks 1-3", tasks: ["Node.js event loop", "Express.js fundamentals"] },
      { phase: "Phase 2: Databases", duration: "Weeks 4-7", tasks: ["SQL queries", "ORM usage (Prisma/TypeORM)", "Indexing"] },
      { phase: "Phase 3: DevOps & Scaling", duration: "Weeks 8-11", tasks: ["Dockerizing apps", "Caching with Redis"] },
      { phase: "Phase 4: Architecture", duration: "Weeks 12-16", tasks: ["Microservices basics", "Advanced System Design"] }
    ]
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    description: "Design intuitive and user-centered digital experiences through research and prototyping.",
    requiredSkills: [
      { name: "Figma", importance: "Critical", timeToLearn: "4 weeks" },
      { name: "User Research", importance: "Critical", timeToLearn: "6 weeks" },
      { name: "Prototyping", importance: "High", timeToLearn: "4 weeks" },
      { name: "Wireframing", importance: "High", timeToLearn: "3 weeks" },
      { name: "Visual Design", importance: "Medium", timeToLearn: "8 weeks" },
      { name: "Usability Testing", importance: "High", timeToLearn: "4 weeks" }
    ],
    clusters: [
      { name: "Research", skills: ["User Research", "Usability Testing"] },
      { name: "Design Tools", skills: ["Figma", "Wireframing"] },
      { name: "Execution", skills: ["Prototyping", "Visual Design"] }
    ],
    roadmap: [
      { phase: "Phase 1: Design Thinking", duration: "Weeks 1-3", tasks: ["UX principles", "User personas", "Empathy mapping"] },
      { phase: "Phase 2: Tooling", duration: "Weeks 4-6", tasks: ["Figma mastery", "Auto-layout", "Components"] },
      { phase: "Phase 3: Prototyping", duration: "Weeks 7-10", tasks: ["Low-fi wireframes", "High-fi interactive prototypes"] },
      { phase: "Phase 4: Testing", duration: "Weeks 11-14", tasks: ["Conducting user tests", "Iterating based on feedback"] }
    ]
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    description: "Protect an organization's networks and data from cyber threats and security breaches.",
    requiredSkills: [
      { name: "Network Security", importance: "Critical", timeToLearn: "8 weeks" },
      { name: "Ethical Hacking", importance: "High", timeToLearn: "12 weeks" },
      { name: "Linux", importance: "High", timeToLearn: "4 weeks" },
      { name: "Python", importance: "Medium", timeToLearn: "6 weeks" },
      { name: "SIEM Tools", importance: "High", timeToLearn: "5 weeks" },
      { name: "Incident Response", importance: "Critical", timeToLearn: "6 weeks" }
    ],
    clusters: [
      { name: "Fundamentals", skills: ["Network Security", "Linux"] },
      { name: "Offensive", skills: ["Ethical Hacking", "Python"] },
      { name: "Defensive", skills: ["SIEM Tools", "Incident Response"] }
    ],
    roadmap: [
      { phase: "Phase 1: Networking Basics", duration: "Weeks 1-4", tasks: ["TCP/IP stack", "DNS", "Firewalls"] },
      { phase: "Phase 2: OS Security", duration: "Weeks 5-8", tasks: ["Linux command line", "Windows security logs"] },
      { phase: "Phase 3: Security Operations", duration: "Weeks 9-13", tasks: ["Using SIEM tools (Splunk)", "Vulnerability scanning"] },
      { phase: "Phase 4: Advanced Defense", duration: "Weeks 14-18", tasks: ["Incident response protocols", "Digital forensics"] }
    ]
  },
  {
    id: "cloud-architect",
    title: "Cloud Architect",
    description: "Design and implement cloud computing strategies and infrastructure for organizations.",
    requiredSkills: [
      { name: "AWS/Azure", importance: "Critical", timeToLearn: "12 weeks" },
      { name: "Terraform", importance: "High", timeToLearn: "6 weeks" },
      { name: "Kubernetes", importance: "High", timeToLearn: "8 weeks" },
      { name: "Networking", importance: "High", timeToLearn: "4 weeks" },
      { name: "Python", importance: "Medium", timeToLearn: "4 weeks" },
      { name: "Security", importance: "High", timeToLearn: "6 weeks" }
    ],
    clusters: [
      { name: "Cloud Platforms", skills: ["AWS/Azure"] },
      { name: "Infrastructure as Code", skills: ["Terraform", "Kubernetes"] },
      { name: "Foundations", skills: ["Networking", "Security", "Python"] }
    ],
    roadmap: [
      { phase: "Phase 1: Cloud Fundamentals", duration: "Weeks 1-4", tasks: ["Cloud service models (IaaS, PaaS)", "Basic AWS/Azure services"] },
      { phase: "Phase 2: Infrastructure as Code", duration: "Weeks 5-9", tasks: ["Terraform basics", "Containerization with Docker"] },
      { phase: "Phase 3: Orchestration", duration: "Weeks 10-14", tasks: ["Kubernetes clusters", "CI/CD pipelines"] },
      { phase: "Phase 4: Architecture Design", duration: "Weeks 15-20", tasks: ["High availability design", "Cost optimization strategies"] }
    ]
  },
  {
    id: "digital-marketing-specialist",
    title: "Digital Marketing Specialist",
    description: "Develop and execute online marketing strategies to drive brand awareness and lead generation.",
    requiredSkills: [
      { name: "SEO", importance: "Critical", timeToLearn: "6 weeks" },
      { name: "Google Ads", importance: "High", timeToLearn: "4 weeks" },
      { name: "Content Strategy", importance: "High", timeToLearn: "4 weeks" },
      { name: "Social Media", importance: "Medium", timeToLearn: "3 weeks" },
      { name: "Data Analytics", importance: "High", timeToLearn: "5 weeks" },
      { name: "Email Marketing", importance: "Medium", timeToLearn: "2 weeks" }
    ],
    clusters: [
      { name: "Search", skills: ["SEO", "Google Ads"] },
      { name: "Content", skills: ["Content Strategy", "Social Media"] },
      { name: "Analysis", skills: ["Data Analytics", "Email Marketing"] }
    ],
    roadmap: [
      { phase: "Phase 1: Marketing Basics", duration: "Weeks 1-2", tasks: ["Marketing funnel concepts", "Consumer psychology"] },
      { phase: "Phase 2: Search Marketing", duration: "Weeks 3-7", tasks: ["Keyword research", "On-page & Off-page SEO", "PPC basics"] },
      { phase: "Phase 3: Content & Social", duration: "Weeks 8-10", tasks: ["Content calendar creation", "Social media ad campaigns"] },
      { phase: "Phase 4: Analytics & Optimization", duration: "Weeks 11-13", tasks: ["Google Analytics 4", "A/B testing", "ROI calculation"] }
    ]
  },
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    description: "Handle both frontend and backend development, managing the entire web application lifecycle.",
    requiredSkills: [
      { name: "React", importance: "Critical", timeToLearn: "8 weeks" },
      { name: "Node.js", importance: "Critical", timeToLearn: "6 weeks" },
      { name: "PostgreSQL", importance: "High", timeToLearn: "5 weeks" },
      { name: "TypeScript", importance: "High", timeToLearn: "4 weeks" },
      { name: "Tailwind CSS", importance: "Medium", timeToLearn: "2 weeks" },
      { name: "System Design", importance: "High", timeToLearn: "8 weeks" }
    ],
    clusters: [
      { name: "Frontend", skills: ["React", "Tailwind CSS"] },
      { name: "Backend", skills: ["Node.js", "PostgreSQL"] },
      { name: "Architecture", skills: ["TypeScript", "System Design"] }
    ],
    roadmap: [
      { phase: "Phase 1: Frontend Mastery", duration: "Weeks 1-6", tasks: ["React hooks", "State management", "Responsive design"] },
      { phase: "Phase 2: Backend Mastery", duration: "Weeks 7-12", tasks: ["RESTful APIs", "Database schemas", "Authentication"] },
      { phase: "Phase 3: Integration", duration: "Weeks 13-16", tasks: ["Connecting FE to BE", "Full-stack testing"] },
      { phase: "Phase 4: Scaling", duration: "Weeks 17-20", tasks: ["Deployment", "Performance optimization"] }
    ]
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    description: "Bridge the gap between development and operations, automating deployment and infrastructure.",
    requiredSkills: [
      { name: "Docker", importance: "Critical", timeToLearn: "4 weeks" },
      { name: "Kubernetes", importance: "Critical", timeToLearn: "8 weeks" },
      { name: "Terraform", importance: "High", timeToLearn: "6 weeks" },
      { name: "CI/CD", importance: "Critical", timeToLearn: "4 weeks" },
      { name: "Linux", importance: "High", timeToLearn: "4 weeks" },
      { name: "AWS/Azure", importance: "High", timeToLearn: "10 weeks" }
    ],
    clusters: [
      { name: "Containerization", skills: ["Docker", "Kubernetes"] },
      { name: "Automation", skills: ["Terraform", "CI/CD"] },
      { name: "Infrastructure", skills: ["Linux", "AWS/Azure"] }
    ],
    roadmap: [
      { phase: "Phase 1: Linux & Docker", duration: "Weeks 1-4", tasks: ["Shell scripting", "Docker images & containers"] },
      { phase: "Phase 2: CI/CD Pipelines", duration: "Weeks 5-8", tasks: ["GitHub Actions/Jenkins", "Automated testing"] },
      { phase: "Phase 3: Cloud & IaC", duration: "Weeks 9-14", tasks: ["AWS/Azure basics", "Terraform modules"] },
      { phase: "Phase 4: Orchestration", duration: "Weeks 15-20", tasks: ["Kubernetes architecture", "Monitoring & Logging"] }
    ]
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    description: "Develop and deploy artificial intelligence models and systems to solve complex problems.",
    requiredSkills: [
      { name: "Python", importance: "Critical", timeToLearn: "6 weeks" },
      { name: "Machine Learning", importance: "Critical", timeToLearn: "12 weeks" },
      { name: "Deep Learning", importance: "High", timeToLearn: "10 weeks" },
      { name: "NLP", importance: "High", timeToLearn: "8 weeks" },
      { name: "PyTorch/TensorFlow", importance: "High", timeToLearn: "8 weeks" },
      { name: "Mathematics", importance: "High", timeToLearn: "12 weeks" }
    ],
    clusters: [
      { name: "Foundations", skills: ["Python", "Mathematics"] },
      { name: "Core AI", skills: ["Machine Learning", "Deep Learning"] },
      { name: "Specialization", skills: ["NLP", "PyTorch/TensorFlow"] }
    ],
    roadmap: [
      { phase: "Phase 1: Math & Python", duration: "Weeks 1-6", tasks: ["Linear Algebra", "Calculus", "Advanced Python"] },
      { phase: "Phase 2: Machine Learning", duration: "Weeks 7-14", tasks: ["Statistical learning", "Feature engineering"] },
      { phase: "Phase 3: Deep Learning", duration: "Weeks 15-22", tasks: ["Neural networks", "Computer Vision basics"] },
      { phase: "Phase 4: Deployment", duration: "Weeks 23-26", tasks: ["Model serving", "MLOps basics"] }
    ]
  }
];

export const ALL_SKILLS = Array.from(new Set(ROLES.flatMap(r => r.requiredSkills.map(s => s.name)))).sort();

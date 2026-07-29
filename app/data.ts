export type Project = {
  version: string;
  title: string;
  tag: string;
  date: string;
  summary: string;
  stack: string[];
  links: { label: string; href: string }[];
  image?: string;
  highlights?: string[];
  features?: string[];
  metrics?: { label: string; value: string }[];
  architecture?: {
    flow: string[];
    solve: string;
  };
};

export const profile = {
  name: "Sourav",
  role: "Full-Stack & AI/ML Engineer",
  tagline:
    "Building production-grade software across web, ML pipelines, and applied AI — with an ECE foundation underneath it.",
  location: "Pune, Maharashtra · open to remote",
  github: "https://github.com/LEVELING2108",
  linkedin: "https://www.linkedin.com/in/sourav-suman-325a46353",
  email: "sumansourav2108@gmail.com",
  resumeHref: "/resume.pdf",
  avatar: "/sourav.jpeg",
};


export type EducationItem = {
  degree: string;
  shortDegree: string;
  school: string;
  detail: string;
  location: string;
  status: string;
  icon: string;
};

export const education: EducationItem[] = [
  {
    degree: "B.Tech, Electronics & Communication Engineering",
    shortDegree: "B.Tech ECE",
    school: "Bharati Vidyapeeth (Deemed University), Pune",
    detail: "CGPA 9.1",
    location: "Pune, Maharashtra",
    status: "Distinction · CGPA 9.1",
    icon: "Cpu",
  },
  {
    degree: "B.Sc, Data Science & Applications",
    shortDegree: "B.Sc Data Science",
    school: "Indian Institute of Technology, Madras",
    detail: "CGPA 7.2",
    location: "IIT Madras Program",
    status: "Dual Degree · CGPA 7.2",
    icon: "GraduationCap",
  },
];




export const stats = [
  { label: "LeetCode solved", value: "200+" },
  { label: "SIH 2025 (Internal)", value: "Round 2 Cleared" },
  { label: "Projects built", value: "6+ Shipped" },
  { label: "Team led", value: "TEAM NEMESIS" },
];

export const skills = {
  languages: ["Python", "Java", "C++", "JavaScript", "TypeScript"],
  frontend: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
  backend: ["Node.js", "Express.js", "FastAPI", "Flask", "REST APIs"],
  database: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  systemDesign: ["JWT Auth", "WebSockets", "Caching", "Rate Limiting", "Distributed Systems"],
  devops: ["Docker", "GitHub Actions", "CI/CD", "Git", "AWS (S3, EC2)", "GCP", "Vercel", "Render"],
  aiml: ["PyTorch", "Scikit-learn", "Hugging Face", "RAG Pipelines", "LangChain", "LangGraph"],
};


export const projects: Project[] = [
  {
    version: "v1.0",
    title: "ROADSoS",
    tag: "emergency-response · PWA",
    date: "Core project",
    summary:
      "A live, Vercel-deployed progressive web app for emergency response coordination — built with TEAM NEMESIS for Smart India Hackathon.",
    stack: ["React", "PWA", "Vercel"],
    image: "/projects/roadsos.jpg",
    highlights: ["SIH Round 2 Cleared", "PWA offline ready", "Team Nemesis"],
    features: [
      "Real-time geolocation dispatch",
      "Offline-first PWA caching",
      "Instant multi-agency alerts"
    ],
    metrics: [
      { label: "Status", value: "Live PWA" },
      { label: "Scope", value: "Hackathon Win" }
    ],
    architecture: {
      flow: [
        "Emergency Trigger",
        "PWA Offline Cache",
        "Redis Queue & Mutex Lock",
        "Live Dispatch Broadcast"
      ],
      solve:
        "Eliminated duplicate dispatching under high-concurrency emergency surges by hunting down and fixing a nasty Redis race condition."
    },
    links: [
      { label: "Live", href: "#" }, // TODO: add live URL
      { label: "GitHub", href: "https://github.com/LEVELING2108" },
    ],
  },
  {
    version: "v1.1",
    title: "FraudShield",
    tag: "machine learning · fraud detection",
    date: "Core project",
    summary:
      "An ML-powered fraud detection platform that flags anomalous transaction patterns in real time.",
    stack: ["Python", "ML", "REST API"],
    image: "/projects/fraudshield.jpg",
    highlights: ["Real-time Inference", "High Precision", "REST Pipeline"],
    features: [
      "Streaming anomaly detection engine",
      "Feature engineering & drift monitoring",
      "RESTful scoring endpoint with low latency"
    ],
    metrics: [
      { label: "Latency", value: "< 25ms" },
      { label: "Model", value: "Ensemble ML" }
    ],
    architecture: {
      flow: [
        "Transaction Ingestion",
        "Feature Engineering",
        "Ensemble ML Scoring",
        "Real-Time Risk Decision"
      ],
      solve:
        "Engineered a high-precision ML inference pipeline operating at <25ms latency with streaming drift monitoring and self-healing error bounds."
    },
    links: [{ label: "GitHub", href: "https://github.com/LEVELING2108" }],
  },
  {
    version: "v1.2",
    title: "NLP Text Classification Pipeline",
    tag: "MLOps",
    date: "Core project",
    summary:
      "An end-to-end MLOps pipeline for text classification, covering training, evaluation, and deployment stages.",
    stack: ["Python", "NLP", "MLOps"],
    image: "/projects/nlppipeline.jpg",
    highlights: ["End-to-End MLOps", "Model Evaluation", "Automated Runs"],
    features: [
      "Automated text data preprocessing & tokenization",
      "Model tracking & evaluation metrics logging",
      "Containerized deployment workflow"
    ],
    metrics: [
      { label: "Pipeline", value: "MLOps v1" },
      { label: "Domain", value: "NLP Classifier" }
    ],
    architecture: {
      flow: [
        "Raw Text Corpus",
        "Tokenization & Preprocessing",
        "Model Evaluation & Tracking",
        "Containerized Release"
      ],
      solve:
        "Automated end-to-end MLOps lifecycle to eliminate manual model retrain overhead and maintain consistent evaluation metrics."
    },
    links: [{ label: "GitHub", href: "https://github.com/LEVELING2108" }],
  },
  {
    version: "v1.3",
    title: "Ledgerline",
    tag: "personal finance manager",
    date: "In progress",
    summary:
      "A personal finance manager for tracking spending and visualizing trends, built as a full Next.js application.",
    stack: ["Next.js", "Tailwind CSS", "Recharts"],
    image: "/projects/ledgerline.jpg",
    highlights: ["Interactive Charts", "Budget Insights", "Full-Stack Next.js"],
    features: [
      "Custom analytics & spending trends visualization",
      "Categorized expense logging with budget alerts",
      "Responsive dark-mode UI with instant search"
    ],
    metrics: [
      { label: "Status", value: "In Active Dev" },
      { label: "Stack", value: "Next.js + Recharts" }
    ],
    architecture: {
      flow: [
        "Expense Entry",
        "Validation & Categorization",
        "Database Persistence",
        "Recharts Analytics Engine"
      ],
      solve:
        "Built responsive full-stack financial insights dashboard with instant search, real-time analytics aggregation, and zero layout shift."
    },
    links: [{ label: "GitHub", href: "https://github.com/LEVELING2108" }],
  },
  {
    version: "v1.4",
    title: "CRM CSV Importer",
    tag: "applied LLM",
    date: "In progress",
    summary:
      "A CRM lead-import tool that uses the Anthropic API with structured output to map messy CSV data to clean lead records.",
    stack: ["Next.js", "TypeScript", "Anthropic API"],
    image: "/projects/crmimporter.jpg",
    highlights: ["LLM Extraction", "Zero CSV Schema Rules", "Type-Safe JSON"],
    features: [
      "AI-driven schema mapping for unformatted CSV rows",
      "Anthropic API structured JSON mode parsing",
      "Bulk lead validation & import preview"
    ],
    metrics: [
      { label: "Engine", value: "Anthropic Claude" },
      { label: "Output", value: "Structured JSON" }
    ],
    architecture: {
      flow: [
        "Unformatted CSV Upload",
        "Chunked Batch Parser",
        "Anthropic Structured Mode",
        "Type-Safe Lead JSON"
      ],
      solve:
        "Leveraged structured LLM outputs to parse completely unformatted, messy CSV lead files without relying on static regex or brittle column rules."
    },
    links: [{ label: "GitHub", href: "https://github.com/LEVELING2108" }],
  },
  {
    version: "v1.5",
    title: "ModelSentry API",
    tag: "ML inference gateway",
    date: "Ongoing",
    summary:
      "A production-grade ML inference gateway with JWT authentication, Prometheus metrics, and A/B model routing.",
    stack: ["Python", "JWT", "Prometheus"],
    image: "/projects/modelsentry.jpg",
    highlights: ["JWT Secured", "Prometheus Metrics", "A/B Routing"],
    features: [
      "Dynamic A/B model traffic splitter",
      "Prometheus metric telemetry & request rate monitoring",
      "Secure JWT token auth with rate limiting"
    ],
    metrics: [
      { label: "Metrics", value: "Prometheus" },
      { label: "Auth", value: "JWT Guard" }
    ],
    architecture: {
      flow: [
        "Inference Gateway",
        "JWT Token Verification",
        "A/B Model Traffic Splitter",
        "Prometheus Telemetry"
      ],
      solve:
        "Engineered production-grade gateway managing JWT rate limiting, zero-downtime model routing, and Prometheus request telemetry."
    },
    links: [{ label: "GitHub", href: "https://github.com/LEVELING2108" }],
  },
  {
    version: "v1.6",
    title: "RailTrack Pro",
    tag: "QR-based vendor & track fittings management · Flask + React · SIH",
    date: "SIH 2025 R2",
    summary:
      "A full-stack system for Indian Railways to track rail fittings from manufacturing to installation, with QR-based field verification and AI-powered vendor/item risk scoring.",
    stack: ["Flask", "React", "PostgreSQL", "Docker", "Redis"],
    image: "/projects/railtrackpro.jpg",
    highlights: [
      "Team Nemesis · SIH 2025 R2",
      "30+ REST API Endpoints",
      "~75%+ Test Coverage",
    ],
    features: [
      "QR code generation + camera scanning for field verification of vendors & track items",
      "Multi-stage inspection workflow (manufacturing, supply, installation, defect) with A–F quality grading",
      "AI-powered risk scoring (0–100) flagging missing vendor data & high defect patterns",
    ],
    metrics: [
      { label: "Endpoints", value: "30+ REST APIs" },
      { label: "Coverage", value: "~75%+ Tested" },
    ],
    architecture: {
      flow: [
        "QR Code Field Scan",
        "Flask 3.0 REST API",
        "Multi-Stage Quality Audit",
        "AI Vendor Risk Engine (0-100)"
      ],
      solve:
        "Architected end-to-end QR field tracking across 4 database models with role-based JWT security, automated quality grading, and vendor anomaly scoring."
    },
    links: [
      {
        label: "GitHub",
        href: "https://github.com/LEVELING2108/SIH_Project-Railtrack_PRO-",
      },
    ],
  },
];


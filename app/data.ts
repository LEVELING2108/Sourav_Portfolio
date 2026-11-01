export type ProjectCategory = "ai" | "web" | "oss";

export type ProjectCaseStudy = {
  subtitle: string;
  lead: string;
  leadHighlight: string;
  role: string;
  annotations: [string, string];
  numbers: { value: string; label: string; note: string; peek?: boolean }[];
  problem: [string, string];
  howItWorks: { title: string; body: string }[];
  whatIBuilt: { title: string; body: string }[];
  reflection: string;
};

export type Project = {
  slug: string;
  version: string;
  title: string;
  tag: string;
  date: string;
  status: string;
  stickerBg: string;
  cats: ProjectCategory[];
  win: string;
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
  caseStudy: ProjectCaseStudy;
};

export const profile = {
  name: "Sourav Suman",
  role: "Full-Stack & AI/ML Engineer",
  tagline:
    "Building production-grade software across web, ML pipelines, and applied AI — with an ECE foundation underneath it.",
  location: "Pune, Maharashtra · open to remote",
  github: "https://github.com/LEVELING2108",
  linkedin: "https://www.linkedin.com/in/sourav-suman-dev",
  leetcode: "https://leetcode.com/u/sumansourav2108/",
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
    detail: "CGPA 9.04",
    location: "Pune, Maharashtra",
    status: "Distinction · CGPA 9.04",
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
  { label: "Upstream OSS", value: "33,000+ ★" },
  { label: "Systems Built", value: "8+ Shipped" },
  { label: "Core Stack", value: "20+ Techs" },
  { label: "Dual-Track", value: "IITM × BVDU" },
];

export const skills = {
  languages: ["Python", "Java", "C++", "JavaScript", "TypeScript"],
  frontend: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
  backend: ["Node.js", "Express.js", "FastAPI", "Flask", "REST APIs"],
  database: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  systemDesign: ["JWT Auth", "WebSockets", "Caching", "Rate Limiting", "Distributed Systems"],
  devops: ["Docker", "GitHub Actions", "CI/CD", "Git", "AWS (S3, EC2)", "GCP", "Vercel", "Render"],
  aiml: [
    "PyTorch",
    "LlamaIndex",
    "CrewAI",
    "LangChain",
    "LangGraph",
    "ModernBERT",
    "System-1 Routing",
    "RAG Pipelines",
    "Hugging Face",
    "Scikit-learn",
    "DVC & MLflow",
  ],
};

const LIVE = "#E3F1E1";
const WIP = "#FFF4C7";
const OSS = "#DCEBF7";

export const projects: Project[] = [
  {
    slug: "laya-system-1-integrations",
    version: "v0.4.11",
    title: "Laya System-1 Integrations",
    tag: "open source · 33k★",
    date: "Production Shipped",
    status: "7 PRs merged",
    stickerBg: OSS,
    cats: ["ai", "oss"],
    win: "~1,500ms → ~33ms per decision",
    summary:
      "Tool selection plus LangChain, LangGraph, LlamaIndex and CrewAI routers for Laya — agent decisions in one forward pass instead of token-by-token.",
    stack: ["Python", "PyTorch", "LangGraph", "LlamaIndex", "CrewAI", "ModernBERT"],
    image: "/projects/laya.jpg",
    highlights: [
      "33,000+ Upstream Stars",
      "7 Merged PRs (#229, #257, #533, #535, #737, #977, #1020)",
      "~33ms Routing (98% Faster)",
    ],
    features: [
      "Official LayaToolSelector & ToolRouteDecision for ~32.8ms GPU tool and function calling across Python, LangChain, CrewAI, LlamaIndex & JSON Schemas",
      "Sub-35ms conditional edge routing for LangGraph with Shannon-entropy confidence gating",
      "Official LlamaIndex LayaSingleSelector and CrewAI LayaCrewRouter for zero-token RAG & swarm delegation",
      "Thread-safe .NET tokenizer cache synchronization (#1020) and cross-platform Windows CI path normalization (#737)",
    ],
    metrics: [
      { label: "Latency", value: "~33ms" },
      { label: "Ecosystem", value: "33,000+ ★" },
    ],
    architecture: {
      flow: [
        "agent state / tool schemas",
        "ModernBERT, 1 pass",
        "confidence gating",
        "sub-35ms dispatch",
      ],
      solve:
        "Eliminated token-by-token autoregressive LLM branching and tool-calling overhead (reducing decision latency from ~1,500ms to ~33ms) across major agent frameworks.",
    },
    links: [
      { label: "upstream", href: "https://github.com/NandhaKishorM/laya" },
      { label: "PRs", href: "/oss" },
    ],
    caseStudy: {
      subtitle: "v0.4.11 · NandhaKishorM/laya (33k+ ★) · upstream open source",
      lead: "Replaces slow, token-by-token LLM branching and tool selection with a single ~33ms non-autoregressive forward pass across LangChain, LangGraph, LlamaIndex, and CrewAI.",
      leadHighlight: "single ~33ms non-autoregressive forward pass",
      role: "Core Open Source Contributor (7 merged PRs)",
      annotations: ["~32.8ms GPU forward pass", "zero output tokens generated"],
      numbers: [
        { value: "~33ms", label: "decision latency", note: "down from ~1,500ms!! ~45× faster", peek: true },
        { value: "7", label: "merged pull requests", note: "+1 in review (#982)" },
        { value: "+3,114", label: "lines merged upstream", note: "across Python & C#/.NET" },
        { value: "4", label: "agent frameworks", note: "LangChain · LangGraph · LlamaIndex · CrewAI" },
      ],
      problem: [
        "Multi-agent workflows spend most of their wall-clock time not generating final answers, but deciding which node, index, or tool to call next. Using an autoregressive LLM for every router edge or tool choice costs 1,000–1,800ms and hundreds of tokens per hop.",
        "Agent frameworks needed a drop-in System-1 decision layer that could evaluate candidate tools, RAG indices, and graph edges in a single deterministic forward pass — with calibrated confidence gating so uncertain queries safely fall back.",
      ],
      howItWorks: [
        { title: "Agent state / schemas", body: "Normalizes Python callables, LangChain/CrewAI/LlamaIndex tools, or JSON Schemas into choice criteria." },
        { title: "ModernBERT 1-pass", body: "Runs a single non-autoregressive forward pass (~32.8ms on T4 GPU) over state and candidates." },
        { title: "Confidence gating", body: "Applies calibrated probability & Shannon-entropy thresholds, failing closed when uncertain." },
        { title: "Sub-35ms dispatch", body: "Returns ToolRouteDecision or conditional graph edge with zero generated tokens." },
      ],
      whatIBuilt: [
        { title: "LayaToolSelector (#977)", body: "Official tool and function router evaluating Python functions, framework tools, and JSON Schemas in one ~32.8ms pass." },
        { title: "LangGraph, LlamaIndex & CrewAI (#229, #533, #535)", body: "Built LayaRouter, LayaGuardrail, LayaSingleSelector, and LayaCrewRouter for zero-token RAG and multi-agent routing." },
        { title: ".NET Concurrency & CI Fixes (#1020, #737)", body: "Synchronized HfTokenizer cache writes with double-checked locking and atomic .part renames to eliminate parallel test races." },
      ],
      reflection:
        "Designing integrations across four different agent frameworks taught me that great SDKs feel invisible: they accept whatever tool object the developer already has, validate inputs strictly, and fail closed when confidence drops.",
    },
  },
  {
    slug: "roadsos",
    version: "v1.0",
    title: "ROADSoS",
    tag: "emergency response · PWA",
    date: "Core project",
    status: "live",
    stickerBg: LIVE,
    cats: ["web"],
    win: "fixed a Redis race that double-dispatched",
    summary:
      "An offline-first progressive web app for emergency response, with real-time incident dispatch to multiple agencies.",
    stack: ["React", "PWA", "Redis", "Vercel"],
    image: "/projects/roadsos.jpg",
    highlights: ["PWA offline ready", "Real-time dispatch", "Zero-downtime cache"],
    features: [
      "Real-time geolocation dispatch",
      "Offline-first PWA caching",
      "Instant multi-agency alerts",
    ],
    metrics: [
      { label: "Status", value: "Live PWA" },
      { label: "Architecture", value: "Offline First" },
    ],
    architecture: {
      flow: [
        "emergency trigger",
        "PWA offline cache",
        "Redis queue + mutex",
        "live dispatch",
      ],
      solve:
        "Eliminated duplicate dispatching under high-concurrency emergency surges by hunting down and fixing a nasty Redis race condition.",
    },
    links: [
      { label: "live", href: "https://road-so-s-rose.vercel.app" },
      { label: "code", href: "https://github.com/LEVELING2108/RoadSoS" },
    ],
    caseStudy: {
      subtitle: "v1.0 · Emergency Response Coordination · Live PWA",
      lead: "An offline-first progressive web application that coordinates real-time emergency dispatch across agencies even when cellular connectivity drops.",
      leadHighlight: "offline-first progressive web application",
      role: "Lead Full-Stack Engineer",
      annotations: ["works offline via service workers", "Redis mutex prevents double-dispatch"],
      numbers: [
        { value: "0", label: "duplicate dispatches", note: "fixed with Redis mutex locks", peek: true },
        { value: "100%", label: "offline form capture", note: "queued in IndexedDB + service worker" },
        { value: "<1s", label: "live broadcast latency", note: "multi-agency alert fanout" },
        { value: "PWA", label: "installable on any phone", note: "zero app-store friction" },
      ],
      problem: [
        "During road accidents and highway emergencies, witnesses often have spotty 2G/3G connectivity and panic-tap submit buttons multiple times. Traditional web apps either fail to load or create duplicate incident tickets across responders.",
        "We needed an installable PWA that captures geolocation and incident details offline, syncs automatically when signal returns, and guarantees idempotent dispatch under concurrent surges.",
      ],
      howItWorks: [
        { title: "Emergency trigger", body: "Captures GPS coordinates and incident severity, caching locally if offline." },
        { title: "PWA offline cache", body: "Service workers serve the shell instantly and replay queued reports on reconnect." },
        { title: "Redis queue + mutex", body: "Acquires a distributed lock per incident fingerprint so concurrent taps don't double-dispatch." },
        { title: "Live dispatch", body: "Broadcasts verified incidents to nearby medical, police, and tow agencies in real time." },
      ],
      whatIBuilt: [
        { title: "Offline-first PWA shell", body: "Service worker caching and background sync so incident reporting works on flaky highway networks." },
        { title: "Idempotent Redis dispatch queue", body: "Hunted down and fixed a check-then-act race condition that caused duplicate agency alerts under load." },
        { title: "Live responder console", body: "Real-time geolocation map and status tracker deployed on Vercel." },
      ],
      reflection:
        "Reproducing the duplicate-dispatch bug under concurrent requests was a turning point — it taught me never to trust non-atomic check-then-set logic in distributed queues.",
    },
  },
  {
    slug: "railtrack-pro",
    version: "v1.6",
    title: "RailTrack Pro",
    tag: "SIH 2025 · enterprise",
    date: "Production Build",
    status: "production build",
    stickerBg: LIVE,
    cats: ["web", "ai"],
    win: "30+ REST endpoints · ~75% test coverage",
    summary:
      "Tracks rail fittings from manufacturing to installation, with QR field verification and AI vendor risk scoring.",
    stack: ["Flask", "React", "PostgreSQL", "Docker", "Redis"],
    image: "/projects/railtrackpro.jpg",
    highlights: [
      "Field QR Verification",
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
        "QR field scan",
        "Flask 3.0 REST API",
        "multi-stage audit",
        "vendor risk 0–100",
      ],
      solve:
        "Architected end-to-end QR field tracking across 4 database models with role-based JWT security, automated quality grading, and vendor anomaly scoring.",
    },
    links: [
      {
        label: "code",
        href: "https://github.com/LEVELING2108/SIH_Project-Railtrack_PRO-",
      },
    ],
    caseStudy: {
      subtitle: "v1.6 · Smart India Hackathon 2025 · production build",
      lead: "Follows every rail fitting from manufacturing to installation — scanned by QR in the field, graded at each stage, risk-scored by vendor.",
      leadHighlight: "manufacturing to installation",
      role: "Full-Stack & Backend Architect (SIH 2025)",
      annotations: ["every fitting gets a QR code", "vendors scored 0–100 for risk"],
      numbers: [
        { value: "30+", label: "REST API endpoints", note: "all JWT-secured, role-based", peek: true },
        { value: "~75%", label: "test coverage", note: "tracked in GitHub Actions CI" },
        { value: "4", label: "inspection stages", note: "make → supply → install → defect" },
        { value: "A–F", label: "quality grade per item", note: "graded at every stage" },
      ],
      problem: [
        "A rail fitting changes hands several times before it is bolted to a track: it is manufactured, supplied, installed, and sometimes found defective. Each stage needs a check, and each check needs to be tied back to the exact item and the vendor who made it.",
        "Without item-level traceability on Indian Railways track fittings, defective batches and high-risk vendors are only discovered after field failures occur — when paper logs are too fragmented to audit.",
      ],
      howItWorks: [
        { title: "QR field scan", body: "An inspector scans the fitting with a phone camera." },
        { title: "Flask 3.0 REST API", body: "JWT-secured, role-based endpoints record the check." },
        { title: "Multi-stage audit", body: "Manufacturing → supply → installation → defect, graded A–F." },
        { title: "Vendor risk engine", body: "Scores each vendor 0–100 from missing data and defect patterns." },
      ],
      whatIBuilt: [
        { title: "QR codes, end to end", body: "Generates a code for every vendor and track item, and verifies them with camera scanning in the field." },
        { title: "A four-stage inspection flow", body: "Manufacturing, supply, installation and defect checks, each producing an A–F quality grade." },
        { title: "AI vendor risk scoring", body: "A 0–100 score that flags vendors with missing data or recurring defects before they become a problem." },
      ],
      reflection:
        "Designing the 4-stage audit schema taught me how to model strict state transitions in PostgreSQL while keeping field mobile scans fast and forgiving on slow connections.",
    },
  },
  {
    slug: "fraudshield",
    version: "v1.1",
    title: "FraudShield",
    tag: "ML · fraud detection",
    date: "Core project",
    status: "core project",
    stickerBg: OSS,
    cats: ["ai"],
    win: "inference under 25ms",
    summary:
      "Scores transactions for fraud in real time, with feature engineering, drift monitoring and a REST scoring endpoint.",
    stack: ["Python", "PyTorch", "FastAPI", "Scikit-learn"],
    image: "/projects/fraudshield.jpg",
    highlights: ["Real-time Inference", "High Precision", "REST Pipeline"],
    features: [
      "Streaming anomaly detection engine",
      "Feature engineering & drift monitoring",
      "RESTful scoring endpoint with low latency",
    ],
    metrics: [
      { label: "Latency", value: "< 25ms" },
      { label: "Model", value: "Ensemble ML" },
    ],
    architecture: {
      flow: [
        "transaction ingestion",
        "feature engineering",
        "ensemble scoring",
        "real-time decision",
      ],
      solve:
        "Engineered a high-precision ML inference pipeline operating at <25ms latency with streaming drift monitoring and self-healing error bounds.",
    },
    links: [
      { label: "code", href: "https://github.com/LEVELING2108/End-to-End-ML-Platform---Fraud-Detection" },
    ],
    caseStudy: {
      subtitle: "v1.1 · Real-Time ML Fraud Detection · Core Project",
      lead: "An end-to-end machine learning platform that scores incoming financial transactions for anomalies in under 25ms with continuous drift monitoring.",
      leadHighlight: "anomalies in under 25ms",
      role: "ML Systems Engineer",
      annotations: ["<25ms p95 scoring latency", "monitors feature drift live"],
      numbers: [
        { value: "<25ms", label: "scoring latency", note: "FastAPI + pre-warmed ensemble", peek: true },
        { value: "3", label: "ensemble models", note: "combined for high precision" },
        { value: "24/7", label: "drift telemetry", note: "catches distribution shifts early" },
        { value: "REST", label: "stateless scoring API", note: "ready for payment gateways" },
      ],
      problem: [
        "Payment fraud detection has a strict latency budget: if scoring takes hundreds of milliseconds, checkout conversion drops, but simple rule engines miss evolving fraud patterns.",
        "We needed an ensemble ML pipeline that computes velocity and behavioral features on the fly, returns a calibrated risk score in under 25ms, and alerts when input distributions drift.",
      ],
      howItWorks: [
        { title: "Transaction ingestion", body: "Receives raw payment payload over a validated FastAPI endpoint." },
        { title: "Feature engineering", body: "Computes real-time transaction velocity, amount deviation, and risk signals." },
        { title: "Ensemble scoring", body: "Runs PyTorch & Scikit-learn ensemble inference in a single low-latency pass." },
        { title: "Real-time decision", body: "Returns allow / flag / block verdict and logs telemetry for drift checks." },
      ],
      whatIBuilt: [
        { title: "Sub-25ms scoring API", body: "Pre-loaded model artifacts and vectorized feature transforms inside FastAPI." },
        { title: "Ensemble calibration", body: "Combined tree-based and neural anomaly detectors to keep false positives low on imbalanced data." },
        { title: "Streaming drift monitor", body: "Tracks feature distributions and prediction confidence bounds across sliding windows." },
      ],
      reflection:
        "Most of the latency wasn't in the model forward pass — it was in feature serialization. Vectorizing the preprocessing step cut p95 latency in half.",
    },
  },
  {
    slug: "crm-csv-importer",
    version: "v1.4",
    title: "CRM CSV Importer",
    tag: "applied LLM",
    date: "In progress",
    status: "live",
    stickerBg: LIVE,
    cats: ["ai", "web"],
    win: "any CSV in, type-safe JSON out",
    summary:
      "Maps messy CSV lead files to clean CRM records using the Anthropic API with structured output — no brittle column rules.",
    stack: ["Next.js", "TypeScript", "Anthropic API"],
    image: "/projects/crmimporter.jpg",
    highlights: ["LLM Extraction", "Zero CSV Schema Rules", "Type-Safe JSON"],
    features: [
      "AI-driven schema mapping for unformatted CSV rows",
      "Anthropic API structured JSON mode parsing",
      "Bulk lead validation & import preview",
    ],
    metrics: [
      { label: "Engine", value: "Anthropic Claude" },
      { label: "Output", value: "Structured JSON" },
    ],
    architecture: {
      flow: [
        "messy CSV upload",
        "chunked batch parser",
        "structured LLM output",
        "type-safe lead JSON",
      ],
      solve:
        "Leveraged structured LLM outputs to parse completely unformatted, messy CSV lead files without relying on static regex or brittle column rules.",
    },
    links: [
      { label: "live", href: "https://gro-weasy.vercel.app" },
      { label: "code", href: "https://github.com/LEVELING2108/GROWeasy" },
    ],
    caseStudy: {
      subtitle: "v1.4 · Applied LLM Data Pipeline · Live on Vercel",
      lead: "Turns messy, arbitrary-column CSV spreadsheets into clean, validated CRM lead records using Anthropic structured outputs.",
      leadHighlight: "clean, validated CRM lead records",
      role: "Full-Stack AI Engineer",
      annotations: ["zero regex column rules", "interactive row validation preview"],
      numbers: [
        { value: "0", label: "manual column rules", note: "LLM infers schema automatically", peek: true },
        { value: "100%", label: "schema-valid JSON", note: "enforced via structured output" },
        { value: "Batch", label: "chunked row streaming", note: "handles large CSV uploads" },
        { value: "Live", label: "deployed on Vercel", note: "gro-weasy.vercel.app" },
      ],
      problem: [
        "Every sales team exports leads differently — merged name columns, inconsistent phone formats, swapped headers, or extra notes stuffed into cells. Traditional CSV importers break the moment a header name changes.",
        "Instead of forcing users through a tedious column-mapping wizard, we wanted an importer that understands any spreadsheet layout and outputs strictly typed CRM records.",
      ],
      howItWorks: [
        { title: "Messy CSV upload", body: "Parses raw CSV files client-side and samples header + row patterns." },
        { title: "Chunked batch parser", body: "Splits rows into token-safe batches with retry and rate-limit handling." },
        { title: "Structured LLM output", body: "Calls Anthropic Claude with a strict JSON schema for lead extraction." },
        { title: "Type-safe lead JSON", body: "Renders an editable preview table before committing clean leads." },
      ],
      whatIBuilt: [
        { title: "Schema-enforced LLM mapper", body: "Prompt + structured-output pipeline that normalizes names, emails, phones, and company fields." },
        { title: "Chunked batch processor", body: "Streams batch progress to the UI so large files never time out serverless functions." },
        { title: "Interactive diff & preview UI", body: "Lets operators inspect, edit, and approve normalized leads before final export." },
      ],
      reflection:
        "Sending every row individually to an LLM is too slow and expensive; inferring the column mapping + normalizing in compact batches gave the best balance of speed and accuracy.",
    },
  },
  {
    slug: "modelsentry-api",
    version: "v1.5",
    title: "ModelSentry API",
    tag: "ML inference gateway",
    date: "Ongoing",
    status: "ongoing",
    stickerBg: WIP,
    cats: ["ai"],
    win: "swap models with zero downtime",
    summary:
      "An inference gateway with JWT auth, rate limiting, A/B model routing and Prometheus metrics.",
    stack: ["Python", "JWT", "Prometheus", "Docker"],
    image: "/projects/modelsentry.jpg",
    highlights: ["JWT Secured", "Prometheus Metrics", "A/B Routing"],
    features: [
      "Dynamic A/B model traffic splitter",
      "Prometheus metric telemetry & request rate monitoring",
      "Secure JWT token auth with rate limiting",
    ],
    metrics: [
      { label: "Metrics", value: "Prometheus" },
      { label: "Auth", value: "JWT Guard" },
    ],
    architecture: {
      flow: [
        "inference gateway",
        "JWT verification",
        "A/B traffic splitter",
        "Prometheus telemetry",
      ],
      solve:
        "Engineered production-grade gateway managing JWT rate limiting, zero-downtime model routing, and Prometheus request telemetry.",
    },
    links: [
      { label: "code", href: "https://github.com/LEVELING2108/Modelsentry-api" },
    ],
    caseStudy: {
      subtitle: "v1.5 · ML Inference Gateway · Containerized Service",
      lead: "A production gateway sitting in front of ML models — handling JWT authentication, rate limiting, canary A/B traffic splitting, and Prometheus metrics.",
      leadHighlight: "canary A/B traffic splitting",
      role: "Backend & MLOps Engineer",
      annotations: ["A/B traffic routing", "Prometheus latency histograms"],
      numbers: [
        { value: "A/B", label: "live traffic splitting", note: "roll out new models safely", peek: true },
        { value: "JWT", label: "token auth + rate limits", note: "protects GPU endpoints" },
        { value: "Prom", label: "metrics exported", note: "latency, error rate, model split" },
        { value: "Docker", label: "single-command deploy", note: "reproducible runtime" },
      ],
      problem: [
        "Wrapping a model in a bare Flask or FastAPI route works in a notebook demo, but fails in production when you need to authenticate callers, throttle abusive clients, compare v1 vs v2 models on live traffic, and scrape latency metrics.",
        "ModelSentry separates those operational concerns into a clean gateway layer so ML models can be swapped and benchmarked with zero downtime.",
      ],
      howItWorks: [
        { title: "Inference gateway", body: "Single entry point receiving client prediction requests." },
        { title: "JWT verification", body: "Validates bearer tokens and enforces per-client rate limits." },
        { title: "A/B traffic splitter", body: "Routes configurable traffic percentages between primary and canary models." },
        { title: "Prometheus telemetry", body: "Records per-model latency histograms, status codes, and throughput." },
      ],
      whatIBuilt: [
        { title: "Weighted A/B router", body: "Deterministic and weighted traffic splitting to compare candidate models in production." },
        { title: "JWT & rate-limit middleware", body: "Stateless token verification paired with request throttling." },
        { title: "Prometheus instrumentation", body: "Custom counters and histograms exposed on /metrics for Grafana dashboards." },
      ],
      reflection:
        "Treating ML endpoints like standard microservices — with auth, observability, and canary routing — makes shipping model updates dramatically less stressful.",
    },
  },
  {
    slug: "nlp-text-classification",
    version: "v1.2",
    title: "NLP Text Classification",
    tag: "MLOps",
    date: "Core project",
    status: "core project",
    stickerBg: OSS,
    cats: ["ai"],
    win: "retraining without the manual chores",
    summary:
      "An end-to-end MLOps pipeline for text classification — preprocessing, tracked evaluation and a containerised release.",
    stack: ["Python", "Hugging Face", "DVC & MLflow", "Docker"],
    image: "/projects/nlppipeline.jpg",
    highlights: ["End-to-End MLOps", "Model Evaluation", "Automated Runs"],
    features: [
      "Automated text data preprocessing & tokenization",
      "Model tracking & evaluation metrics logging",
      "Containerized deployment workflow",
    ],
    metrics: [
      { label: "Pipeline", value: "MLOps v1" },
      { label: "Domain", value: "NLP Classifier" },
    ],
    architecture: {
      flow: [
        "raw text corpus",
        "tokenise + preprocess",
        "evaluate + track",
        "containerised release",
      ],
      solve:
        "Automated end-to-end MLOps lifecycle to eliminate manual model retrain overhead and maintain consistent evaluation metrics.",
    },
    links: [
      { label: "code", href: "https://github.com/LEVELING2108/NLP-Text-Classification-MLOps" },
    ],
    caseStudy: {
      subtitle: "v1.2 · End-to-End MLOps Pipeline · Core Project",
      lead: "A reproducible NLP training and deployment pipeline that versions datasets, tracks experiments, and builds containerized inference releases automatically.",
      leadHighlight: "reproducible NLP training and deployment pipeline",
      role: "MLOps Engineer",
      annotations: ["experiment runs tracked automatically", "reproducible Docker artifact"],
      numbers: [
        { value: "4", label: "automated pipeline stages", note: "ingest → preprocess → train → eval", peek: true },
        { value: "100%", label: "reproducible runs", note: "pinned configs + data versioning" },
        { value: "CI", label: "automated verification", note: "GitHub Actions workflow" },
        { value: "Docker", label: "containerized serving", note: "ready for cloud deploy" },
      ],
      problem: [
        "NLP models often start as messy Jupyter notebooks where preprocessing rules, hyperparameters, and evaluation splits live in scattered cells — making it impossible to reproduce last week's best checkpoint.",
        "This project turns the entire text-classification lifecycle into a modular, versioned pipeline where every run logs metrics and produces a deployable container.",
      ],
      howItWorks: [
        { title: "Raw text corpus", body: "Ingests and validates labeled text datasets with reproducible splits." },
        { title: "Tokenise + preprocess", body: "Applies deterministic cleaning and Hugging Face tokenization." },
        { title: "Evaluate + track", body: "Logs accuracy, F1, confusion matrices, and artifacts to experiment tracking." },
        { title: "Containerised release", body: "Packages the winning checkpoint and inference server into a Docker image." },
      ],
      whatIBuilt: [
        { title: "Modular stage runner", body: "Config-driven Python stages for ingestion, transformation, training, and evaluation." },
        { title: "Experiment & artifact tracking", body: "Integrated DVC & MLflow logging so every metric is tied to exact data and code hashes." },
        { title: "Containerized inference service", body: "Automated Docker build serving predictions from the registered model artifact." },
      ],
      reflection:
        "Building the MLOps scaffolding first meant that experimenting with new tokenizers and hyperparameters took minutes instead of hours of manual glue work.",
    },
  },
  {
    slug: "ledgerline",
    version: "v1.3",
    title: "Ledgerline",
    tag: "personal finance",
    date: "In progress",
    status: "in progress",
    stickerBg: WIP,
    cats: ["web"],
    win: "budget alerts + trend charts",
    summary:
      "A personal finance manager for logging expenses, setting budgets and charting spending trends.",
    stack: ["Next.js", "Tailwind CSS", "Recharts"],
    image: "/projects/ledgerline.jpg",
    highlights: ["Interactive Charts", "Budget Insights", "Full-Stack Next.js"],
    features: [
      "Custom analytics & spending trends visualization",
      "Categorized expense logging with budget alerts",
      "Responsive dark-mode UI with instant search",
    ],
    metrics: [
      { label: "Status", value: "In Active Dev" },
      { label: "Stack", value: "Next.js + Recharts" },
    ],
    architecture: {
      flow: [
        "expense entry",
        "validate + categorise",
        "database",
        "Recharts analytics",
      ],
      solve:
        "Built responsive full-stack financial insights dashboard with instant search, real-time analytics aggregation, and zero layout shift.",
    },
    links: [
      { label: "code", href: "https://github.com/LEVELING2108/ledgerline" },
    ],
    caseStudy: {
      subtitle: "v1.3 · Personal Finance & Analytics · Next.js Application",
      lead: "A fast, keyboard-friendly personal finance tracker for logging daily expenses, setting category budgets, and visualizing monthly cash-flow trends.",
      leadHighlight: "visualizing monthly cash-flow trends",
      role: "Full-Stack Developer",
      annotations: ["real-time Recharts breakdowns", "instant category filtering"],
      numbers: [
        { value: "0", label: "layout shift on filter", note: "smooth Recharts transitions", peek: true },
        { value: "<50ms", label: "instant client search", note: "across categories & notes" },
        { value: "Next.js", label: "full-stack App Router", note: "typed end-to-end" },
        { value: "Live", label: "budget threshold alerts", note: "visual warnings per category" },
      ],
      problem: [
        "Most personal finance apps are either bloated with bank-sync upsells or too barebones to show where money actually goes week over week.",
        "Ledgerline focuses on frictionless expense entry and clear visual feedback — showing category burn rates and monthly trends at a glance.",
      ],
      howItWorks: [
        { title: "Expense entry", body: "Quick-add form captures amount, category, date, and notes." },
        { title: "Validate + categorise", body: "Validates inputs and computes category budget utilization." },
        { title: "Database", body: "Persists transactions and aggregates monthly rollups." },
        { title: "Recharts analytics", body: "Renders interactive spending curves and category breakdowns." },
      ],
      whatIBuilt: [
        { title: "Interactive Recharts dashboard", body: "Responsive time-series and category breakdown charts with custom tooltips." },
        { title: "Budget threshold engine", body: "Highlights categories approaching or exceeding monthly limits." },
        { title: "Instant search & filter bar", body: "Filter transactions by date range, category, or keyword with zero lag." },
      ],
      reflection:
        "Good financial dashboards are all about information hierarchy — surfacing the three numbers you care about today before the twenty charts you only check once a month.",
    },
  },
];

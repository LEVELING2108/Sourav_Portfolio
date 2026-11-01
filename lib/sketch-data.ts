// Extra content the sketch design needs on top of app/data.ts.

export type Mood =
  | "idle" | "stars" | "happy" | "sparkle" | "surprised" | "delighted"
  | "bashful" | "blink" | "dizzy" | "sleepy" | "lookLeft" | "lookRight"
  | "lookDownLeft" | "lookDownRight" | "lookUp" | "lookCenter";

/** Mascot poses (files in /public/mascot) — pencil versions of the character sheets. */
export const MASCOT_IMG: Record<Mood, string> = {
  idle: "look-left", stars: "stars", happy: "happy", sparkle: "sparkle", surprised: "surprised",
  delighted: "delighted", bashful: "bashful", blink: "blink", dizzy: "dizzy", sleepy: "sleepy",
  lookLeft: "look-left", lookRight: "look-right", lookDownLeft: "look-downleft",
  lookDownRight: "look-downright", lookUp: "look-up", lookCenter: "look-center",
};
export const mascotSrc = (m: Mood) => `/mascot/mascot-${MASCOT_IMG[m]}.png`;

/** What the mascot says on each page/state. */
export const MASCOT_LINES = {
  home: { idle: "psst — start here", stars: "ooh, good pick!", happy: "hehe, hi!", sparkle: "all the code lives here", surprised: "~45× faster?!", delighted: "root mode, nice" },
  projects: { all: "eight of them!", ai: "the brainy ones", web: "the full-stack ones", oss: "upstream!!" },
  case: { idle: "SIH 2025 build!", bashful: "this bit is still blank…" },
  oss: { idle: "click a PR!", merged: "merged!!", "in review": "fingers crossed…", closed: "a dupe of #656, oops" },
  about: { "": "the story so far", "2023": "day one, deep breath", "2024": "two degrees?! okay", "2025": "hackathon mode", "2026": "merged upstream!", "2027": "hire me? hehe" },
  contact: { idle: "write me something!", write: "go on, I’m reading…", role: "a job?! yes please", project: "ooh, a project", oss: "open source, my fave", hi: "hi back!", sent: "yay! it flew!" },
  notFound: "where did it go?!",
} as const;

/** Red-pen notes shown on hover over numbers. */
export const RED_PEN = {
  home: { stars: "the repo's stars — 7 of its PRs are mine", shipped: "2 are live, 2 still cooking", latency: "down from ~1,500ms!! ~45× faster" },
  oss: { merged: "+1 still in review (#982)", lines: "biggest: #977 at +1,246", stars: "the repo’s, not mine — still climbing", frameworks: "LangChain · LangGraph · LlamaIndex · CrewAI" },
  railtrack: { endpoints: "all JWT-secured, role-based", coverage: "tracked in GitHub Actions CI", stages: "make → supply → install → defect", grade: "graded at every stage" },
} as const;

/** Architecture flows drawn on project cards (from app/data.ts architecture.flow, shortened). */
export const PROJECT_FLOWS: Record<string, string[]> = {
  "Laya System-1 Integrations": ["agent state", "ModernBERT", "confidence gate", "sub-35ms route"],
  ROADSoS: ["SOS trigger", "PWA cache", "Redis mutex", "live dispatch"],
  "RailTrack Pro": ["QR field scan", "Flask 3 API", "4-stage audit", "vendor score"],
  FraudShield: ["tx ingestion", "feature pipe", "ensemble ML", "live decision"],
  "CRM CSV Importer": ["CSV upload", "chunk parser", "LLM extract", "typed JSON"],
  "ModelSentry API": ["API gateway", "JWT auth", "A/B splitter", "telemetry"],
  "NLP Text Classification": ["raw corpus", "tokenise", "eval + track", "Docker build"],
  "NLP Text Classification Pipeline": ["raw corpus", "tokenise", "eval + track", "Docker build"],
  Ledgerline: ["expense form", "auto-tag", "database", "Recharts UI"],
};

/** Tech stack page: where each tool shipped (mirrors SkillsMarquee projectProof). */
export const USED_IN: Record<string, string[]> = {
  "Next.js": ["ROADSoS", "Ledgerline"], Python: ["FraudShield", "RailTrack Pro"], TypeScript: ["all frontend & full-stack systems"],
  "React.js": ["ROADSoS", "RailTrack Pro"], FastAPI: ["FraudShield (REST scoring)"], Flask: ["RailTrack Pro"],
  "Tailwind CSS": ["this portfolio", "Ledgerline"], "C++": ["ECE hardware & algorithms"], PyTorch: ["FraudShield"],
  "Hugging Face": ["NLP pipeline"], "RAG Pipelines": ["CRM CSV Importer (GrowEasy)"], "Scikit-learn": ["FraudShield"],
  LangChain: ["Laya integrations", "CRM CSV Importer (GrowEasy)"], LangGraph: ["Laya integrations", "CRM CSV Importer (GrowEasy)"],
  LlamaIndex: ["Laya v0.4.11"], CrewAI: ["Laya v0.4.11"], "DVC & MLflow": ["NLP pipeline"], Redis: ["ROADSoS (mutex locks)"],
  Docker: ["ModelSentry API", "RailTrack Pro"], PostgreSQL: ["RailTrack Pro (4-table models)"], "GitHub Actions": ["RailTrack Pro", "NLP pipeline"],
  "CI/CD": ["RailTrack Pro", "NLP pipeline"], "JWT Auth": ["ModelSentry API"], "Rate Limiting": ["ModelSentry API"],
  "AWS (S3, EC2)": ["cloud storage & server hosting"],
};

/** Sticky-note colours (stay pastel in every theme; text on them is always dark). */
export const STICKY = { yellow: "#FFF4C7", blue: "#DCEBF7", green: "#E3F1E1", pink: "#F8E1D7", purple: "#ECE4F6" };

export type OssPrStatus = "merged" | "in review" | "closed";

export type OssPr = {
  num: string;
  status: OssPrStatus;
  when: string;
  adds: number;
  dels: number;
  filesChanged: number;
  plain: string;
  title: string;
  detail: string;
};

/** Every pull request to NandhaKishorM/laya (from V2OSS.dc.html). */
export const OSS_PRS: OssPr[] = [
  {
    num: "1020",
    status: "merged",
    when: "v0.4.1",
    adds: 49,
    dels: 26,
    filesChanged: 1,
    plain: "Stopped a .NET race condition in the tokenizer cache",
    title: "fix(dotnet): synchronize EnsureStrippedTokenizer to prevent race condition",
    detail:
      "Parallel test runs were racing to write the same stripped tokenizer. Added double-checked locking and GUID-scoped atomic .part writes in HfTokenizer.cs.",
  },
  {
    num: "982",
    status: "in review",
    when: "open",
    adds: 377,
    dels: 23,
    filesChanged: 3,
    plain: "Early stopping and a cleaner validation split for training",
    title: "feat(train): add early stopping, disjoint validation split, and budget-independent schedules",
    detail:
      "Patience-based early stopping plus a three-way disjoint validation / calibration split, so calibration temperature no longer leaks into validation.",
  },
  {
    num: "977",
    status: "merged",
    when: "v0.4.11",
    adds: 1246,
    dels: 0,
    filesChanged: 7,
    plain: "LayaToolSelector — pick the right tool in ~33ms",
    title: "feat(integrations): add LayaToolSelector for tool and function routing",
    detail:
      "Chooses between candidate Python functions, LangChain / CrewAI / LlamaIndex tools and JSON Schemas in one ~32.8ms forward pass, with calibrated confidence gating and zero tokens generated.",
  },
  {
    num: "737",
    status: "merged",
    when: "v0.3.23",
    adds: 3,
    dels: 3,
    filesChanged: 1,
    plain: "Three lines that fixed Windows CI",
    title: "fix(tests): normalize relpath separators in test_env_docs for Windows compatibility",
    detail:
      "Windows runners failed because os.path.relpath returned backslashes. Normalising the separator brought them back in line with Linux and macOS.",
  },
  {
    num: "670",
    status: "closed",
    when: "duplicate",
    adds: 132,
    dels: 6,
    filesChanged: 5,
    plain: "Reverse-proxy subpath support for laya-serve",
    title: "feat(serve): add LAYA_ROOT_PATH support for reverse proxy subpaths",
    detail:
      "Closed as a duplicate of #656, which landed the same feature.",
  },
  {
    num: "535",
    status: "merged",
    when: "merged",
    adds: 489,
    dels: 0,
    filesChanged: 3,
    plain: "CrewAI: route tasks without an LLM manager",
    title: "feat(integrations): add CrewAI task delegation routing and guardrails",
    detail:
      "LayaCrewRouter delegates tasks in hierarchical crews in under 35ms, and LayaTaskGuard screens task prompts for injections and jailbreaks.",
  },
  {
    num: "533",
    status: "merged",
    when: "merged",
    adds: 416,
    dels: 0,
    filesChanged: 3,
    plain: "LlamaIndex: route RAG queries for zero tokens",
    title: "feat(integrations): add LlamaIndex query routing and selectors",
    detail:
      "LayaSingleSelector and LayaMultiSelector route queries across vector indices for RouterQueryEngine in under 35ms.",
  },
  {
    num: "257",
    status: "merged",
    when: "merged",
    adds: 45,
    dels: 3,
    filesChanged: 2,
    plain: "LangGraph packaging, done properly",
    title: "fix(integrations): LangGraph packaging & remote laya-serve client decoupling",
    detail:
      "Added the langgraph extra to pyproject.toml, a compiled StateGraph example and a conditional-edge mapping test.",
  },
  {
    num: "229",
    status: "merged",
    when: "first PR",
    adds: 866,
    dels: 1,
    filesChanged: 3,
    plain: "LangChain + LangGraph integration — where it started",
    title: "feat(integrations): add LangChain and LangGraph routing and guardrails",
    detail:
      "LayaRouter, LayaGuardrail, LayaTriage and LayaEvaluator — working with local models or a remote laya-serve endpoint, with tests and a quickstart.",
  },
];

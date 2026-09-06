"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Terminal,
  Cpu,
  Layers,
  Palette,
  Server,
  Database,
  ShieldCheck,
  Network,
  Box,
  Cloud,
  BrainCircuit,
  Zap,
  ArrowUpRight,
  Activity,
  Sliders,
  CheckCircle2,
  Radio,
  type LucideIcon,
} from "lucide-react";

type MarqueeSkill = {
  id: string;
  name: string;
  category: "Full-Stack" | "AI/ML & Data" | "Systems & Cloud";
  level: string;
  projectProof: string;
  projectUrl: string;
  icon: LucideIcon;
  highlight: string;
};

const TRACK_1_SKILLS: MarqueeSkill[] = [
  {
    id: "nextjs",
    name: "Next.js 16",
    category: "Full-Stack",
    level: "Production Core",
    projectProof: "v1.0 ROADSoS & v1.3 Ledgerline",
    projectUrl: "#projects",
    icon: Layers,
    highlight: "App Router, Turbopack, Server Components & PWA deployment",
  },
  {
    id: "python",
    name: "Python",
    category: "Full-Stack",
    level: "Daily Driver",
    projectProof: "v1.1 FraudShield & v1.6 RailTrack Pro",
    projectUrl: "#projects",
    icon: Terminal,
    highlight: "Async APIs, PyTorch pipelines, Flask & FastAPI microservices",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Full-Stack",
    level: "Strict Mode",
    projectProof: "All frontend & full-stack systems",
    projectUrl: "#projects",
    icon: Code2,
    highlight: "Type-safe schemas, end-to-end API contract verification",
  },
  {
    id: "react",
    name: "React 19",
    category: "Full-Stack",
    level: "Production UI",
    projectProof: "v1.0 ROADSoS & v1.6 RailTrack Pro",
    projectUrl: "#projects",
    icon: Layers,
    highlight: "Concurrent rendering, server actions, client hydration",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Full-Stack",
    level: "High Throughput",
    projectProof: "v1.1 FraudShield REST Scoring",
    projectUrl: "#projects",
    icon: Zap,
    highlight: "Asynchronous REST endpoints with Pydantic schema validation",
  },
  {
    id: "flask",
    name: "Flask 3.0",
    category: "Full-Stack",
    level: "30+ REST APIs",
    projectProof: "v1.6 RailTrack Pro (SIH 2025)",
    projectUrl: "#projects",
    icon: Server,
    highlight: "Modular Blueprints, JWT security & QR field audit pipelines",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS v4",
    category: "Full-Stack",
    level: "Modern Styling",
    projectProof: "Portfolio & Ledgerline",
    projectUrl: "#projects",
    icon: Palette,
    highlight: "Theme variables, fluid responsive grids, micro-interactions",
  },
  {
    id: "cpp",
    name: "C++ / Systems",
    category: "Full-Stack",
    level: "DSA & Core",
    projectProof: "ECE Hardware & Algorithms",
    projectUrl: "#projects",
    icon: Cpu,
    highlight: "Memory management, algorithmic optimization & systems fundamentals",
  },
];

const TRACK_2_SKILLS: MarqueeSkill[] = [
  {
    id: "pytorch",
    name: "PyTorch",
    category: "AI/ML & Data",
    level: "<25ms Inference",
    projectProof: "v1.1 FraudShield ML Platform",
    projectUrl: "#projects",
    icon: BrainCircuit,
    highlight: "Real-time tensor scoring & streaming anomaly detection",
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    category: "AI/ML & Data",
    level: "Transformer Core",
    projectProof: "v1.2 NLP MLOps Pipeline",
    projectUrl: "#projects",
    icon: BrainCircuit,
    highlight: "Pre-trained tokenizers, BERT fine-tuning & evaluation benchmarks",
  },
  {
    id: "rag",
    name: "RAG Pipelines",
    category: "AI/ML & Data",
    level: "Applied AI",
    projectProof: "GROWeasy AI Importer",
    projectUrl: "#projects",
    icon: Network,
    highlight: "Vector chunking, context injection & structured schema generation",
  },
  {
    id: "scikit",
    name: "Scikit-learn",
    category: "AI/ML & Data",
    level: "Ensemble Scoring",
    projectProof: "v1.1 FraudShield",
    projectUrl: "#projects",
    icon: Cpu,
    highlight: "Random Forests, XGBoost, feature scaling & precision metrics",
  },
  {
    id: "langchain",
    name: "LangChain / LangGraph",
    category: "AI/ML & Data",
    level: "Agentic Workflows",
    projectProof: "v1.4 CRM CSV Importer",
    projectUrl: "#projects",
    icon: Activity,
    highlight: "Deterministic tool calling & state graph orchestration",
  },
  {
    id: "mlops",
    name: "DVC & MLflow",
    category: "AI/ML & Data",
    level: "Production MLOps",
    projectProof: "v1.2 NLP Classification Pipeline",
    projectUrl: "#projects",
    icon: Box,
    highlight: "Data versioning, model registry & automated experiment tracking",
  },
];

const TRACK_3_SKILLS: MarqueeSkill[] = [
  {
    id: "redis",
    name: "Redis (Mutex Locks)",
    category: "Systems & Cloud",
    level: "Zero Race Conditions",
    projectProof: "v1.0 ROADSoS Emergency Surge",
    projectUrl: "#projects",
    icon: Database,
    highlight: "Atomic SETNX locks eliminating duplicate emergency dispatches",
  },
  {
    id: "docker",
    name: "Docker",
    category: "Systems & Cloud",
    level: "Multi-stage Builds",
    projectProof: "v1.5 ModelSentry & v1.6 RailTrack Pro",
    projectUrl: "#projects",
    icon: Box,
    highlight: "Containerized deployment with minimal layer footprints",
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "Systems & Cloud",
    level: "Relational Schemas",
    projectProof: "v1.6 RailTrack Pro (4-table models)",
    projectUrl: "#projects",
    icon: Database,
    highlight: "Foreign key constraints, indexing, and transactional integrity",
  },
  {
    id: "github-actions",
    name: "GitHub Actions CI/CD",
    category: "Systems & Cloud",
    level: "~75%+ Test Coverage",
    projectProof: "v1.6 RailTrack Pro & v1.2 NLP",
    projectUrl: "#projects",
    icon: Cloud,
    highlight: "Automated linting, unit testing, and Docker push workflows",
  },
  {
    id: "jwt",
    name: "JWT Rate Limiting",
    category: "Systems & Cloud",
    level: "Security Gateway",
    projectProof: "v1.5 ModelSentry Gateway",
    projectUrl: "#projects",
    icon: ShieldCheck,
    highlight: "Role-based authorization and IP/token bucket throttling",
  },
  {
    id: "aws",
    name: "AWS (S3, EC2)",
    category: "Systems & Cloud",
    level: "Cloud Deployments",
    projectProof: "Cloud storage & server hosting",
    projectUrl: "#projects",
    icon: Cloud,
    highlight: "Asset storage, EC2 inference hosting, and security groups",
  },
];

export default function SkillsMarquee() {
  const [selectedSkill, setSelectedSkill] = useState<MarqueeSkill>(TRACK_1_SKILLS[0]);
  const [isPaused, setIsPaused] = useState(false);

  const renderMarqueeRow = (
    skills: MarqueeSkill[],
    direction: "left" | "right",
    speed: number,
    trackLabel: string
  ) => {
    // Duplicate skills 3 times to create an unbroken seamless infinite loop
    const duplicatedSkills = [...skills, ...skills, ...skills];

    return (
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 px-1">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate/70">
            {trackLabel}
          </span>
        </div>

        <div
          className="relative flex overflow-hidden py-1 select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            animate={{
              x: direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: isPaused ? speed * 3.5 : speed,
                ease: "linear",
              },
            }}
            className="flex gap-2.5 shrink-0"
          >
            {duplicatedSkills.map((skill, index) => {
              const IconComp = skill.icon;
              const isSelected = selectedSkill.id === skill.id;

              return (
                <button
                  key={`${skill.id}-${index}`}
                  onClick={() => setSelectedSkill(skill)}
                  className={`group flex items-center gap-2 rounded-xl border px-3 py-1.5 font-mono text-xs transition-all cursor-pointer ${
                    isSelected
                      ? "bg-copper/25 border-copper-bright text-paper font-semibold shadow-[0_0_16px_rgba(184,118,62,0.35)] scale-105"
                      : "bg-ink-raised border-trace text-slate hover:text-paper hover:border-copper/60 hover:bg-ink-raised/95"
                  }`}
                >
                  <span
                    className={`p-1 rounded-md border transition-colors ${
                      isSelected
                        ? "bg-copper text-ink border-copper-bright"
                        : "bg-ink border-trace text-copper-bright group-hover:text-signal"
                    }`}
                  >
                    <IconComp size={13} />
                  </span>
                  <span className="whitespace-nowrap">{skill.name}</span>
                  <span
                    className={`text-[9px] rounded px-1.5 py-0.5 border ${
                      isSelected
                        ? "bg-copper/30 border-copper text-copper-bright font-bold"
                        : "bg-ink border-trace/60 text-slate/80 group-hover:text-paper"
                    }`}
                  >
                    {skill.level}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>
    );
  };

  const SelectedIcon = selectedSkill.icon;

  return (
    <div className="space-y-6">
      {/* Live HUD Terminal Inspector Drawer */}
      <div className="rounded-3xl border border-copper/50 bg-ink-raised/95 backdrop-blur-xl p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
        {/* Top ambient accent highlight line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-copper via-copper-bright to-signal opacity-100" />

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSkill.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="space-y-4"
          >
            {/* Header: Icon, Name, Badge & Instructions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-trace/60 pb-4">
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-2xl bg-ink border border-copper/50 text-copper-bright shadow-inner">
                  <SelectedIcon size={24} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-mono text-lg sm:text-xl font-bold text-paper">
                      {selectedSkill.name}
                    </h3>
                    <span className="font-mono text-[10px] rounded bg-copper/15 px-2 py-0.5 text-copper-bright border border-copper/40 font-semibold">
                      {selectedSkill.level}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-slate mt-0.5">
                    Domain: <span className="text-paper font-medium">{selectedSkill.category}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-slate">
                <span className="p-1 rounded bg-ink border border-trace text-signal">
                  <Sliders size={12} />
                </span>
                <span>Click any badge below to inspect solve & proof</span>
              </div>
            </div>

            {/* Detailed Specs Grid */}
            <div className="grid gap-4 sm:grid-cols-2 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-ink border border-trace space-y-1.5">
                <span className="text-[10px] uppercase text-slate tracking-wider block font-semibold">
                  // Production Engineering Solve
                </span>
                <p className="text-paper text-xs leading-relaxed font-sans">
                  {selectedSkill.highlight}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-ink border border-trace space-y-1.5 flex flex-col justify-between">
                <span className="text-[10px] uppercase text-slate tracking-wider block font-semibold">
                  // Shipped In Portfolio Project
                </span>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-copper-bright font-semibold">
                    {selectedSkill.projectProof}
                  </span>
                  <a
                    href={selectedSkill.projectUrl}
                    className="inline-flex items-center gap-1 text-[11px] text-signal hover:underline font-semibold"
                  >
                    <span>Inspect Project</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Infinite Scrolling Tickers Container with Masked Edges */}
      <div className="relative space-y-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        {/* Track 1: Runtime & Full-Stack */}
        {renderMarqueeRow(
          TRACK_1_SKILLS,
          "left",
          32,
          "Tier 01 · Full-Stack & Runtime"
        )}

        {/* Track 2: Applied AI/ML & MLOps */}
        {renderMarqueeRow(
          TRACK_2_SKILLS,
          "right",
          28,
          "Tier 02 · Applied AI/ML & Data Pipelines"
        )}

        {/* Track 3: Systems & Cloud Infrastructure */}
        {renderMarqueeRow(
          TRACK_3_SKILLS,
          "left",
          36,
          "Tier 03 · Distributed Systems, DB & Cloud"
        )}
      </div>

      {/* Footer Instructions */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate px-2">
        <span className="flex items-center gap-1.5">
          <Activity size={12} className="text-signal animate-pulse" />
          <span>Bi-directional infinite marquee · hover to slow down</span>
        </span>
        <span className="hidden sm:inline text-slate/70">
          20 production-verified engineering tools
        </span>
      </div>
    </div>
  );
}


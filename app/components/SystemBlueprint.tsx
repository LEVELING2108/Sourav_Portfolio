"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  ShieldCheck,
  BrainCircuit,
  Database,
  Cloud,
  ArrowRight,
  Terminal,
  Activity,
  Check,
  Cpu,
  Boxes,
} from "lucide-react";

export type ArchitectureTier = {
  id: string;
  number: string;
  name: string;
  badge: string;
  icon: any;
  status: string;
  description: string;
  technologies: string[];
  projects: string[]; // project ids that use this tier
};

const TIERS: ArchitectureTier[] = [
  {
    id: "tier-client",
    number: "01",
    name: "Client & Edge Layer",
    badge: "PWA & UI",
    icon: Layers,
    status: "Offline Ready · Responsive",
    description: "Responsive interfaces with offline caching, local state sync, and zero layout shift.",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
    projects: ["roadsos", "ledgerline", "crmimporter", "railtrackpro"],
  },
  {
    id: "tier-gateway",
    number: "02",
    name: "API Gateway & Ingestion",
    badge: "30+ REST APIs",
    icon: ShieldCheck,
    status: "JWT Guard · Rate Limited",
    description: "High-throughput API endpoints with JWT authentication, request validation, and telemetry.",
    technologies: ["FastAPI", "Flask", "Node.js", "Express.js", "REST APIs", "WebSockets"],
    projects: ["railtrackpro", "modelsentry", "fraudshield", "roadsos"],
  },
  {
    id: "tier-aiml",
    number: "03",
    name: "Real-Time AI/ML Engine",
    badge: "<25ms Inference",
    icon: BrainCircuit,
    status: "Drift Monitoring · RAG",
    description: "Streaming ML pipelines, structured LLM extraction, and sub-25ms inference gateways.",
    technologies: ["PyTorch", "Scikit-learn", "Hugging Face", "RAG Pipelines", "LangChain", "LangGraph"],
    projects: ["fraudshield", "nlppipeline", "modelsentry", "crmimporter", "railtrackpro"],
  },
  {
    id: "tier-cache",
    number: "04",
    name: "Concurrency Cache & Database",
    badge: "Mutex Locks",
    icon: Database,
    status: "Zero Race Conditions",
    description: "Relational modeling, atomic Redis locks to eliminate duplicate events, and document persistence.",
    technologies: ["PostgreSQL", "Redis", "MySQL", "MongoDB", "Distributed Queues"],
    projects: ["roadsos", "railtrackpro", "ledgerline", "modelsentry"],
  },
  {
    id: "tier-cloud",
    number: "05",
    name: "Cloud & DevOps Mesh",
    badge: "CI/CD & Containers",
    icon: Cloud,
    status: "Automated Deployments",
    description: "Multi-stage Docker builds, automated GitHub Actions pipelines, and cloud hosting.",
    technologies: ["Docker", "GitHub Actions", "CI/CD", "AWS (S3, EC2)", "GCP", "Vercel", "Render"],
    projects: ["railtrackpro", "modelsentry", "nlppipeline", "roadsos", "crmimporter"],
  },
];

const PROJECT_FILTERS = [
  { id: "all", label: "Full Stack Topology", subtitle: "All 5 Tiers Connected" },
  { id: "roadsos", label: "ROADSoS (v1.0)", subtitle: "Redis Mutex + PWA" },
  { id: "fraudshield", label: "FraudShield (v1.1)", subtitle: "<25ms ML Scoring" },
  { id: "railtrackpro", label: "RailTrack Pro (v1.6)", subtitle: "30+ Flask APIs + QR" },
  { id: "modelsentry", label: "ModelSentry (v1.5)", subtitle: "JWT Gateway + Prometheus" },
  { id: "crmimporter", label: "GROWeasy (v1.4)", subtitle: "Structured Claude LLM" },
];

export default function SystemBlueprint() {
  const [activeProject, setActiveProject] = useState("all");
  const [activeTier, setActiveTier] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Top Filter Bar: Interactive Project Tracer */}
      <div className="rounded-2xl border border-trace bg-ink-raised p-4 sm:p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-trace/60 pb-3 mb-3.5">
          <div className="flex items-center gap-2 font-mono text-xs text-paper">
            <span className="p-1 rounded bg-ink border border-copper/40 text-copper-bright">
              <Terminal size={13} />
            </span>
            <span className="font-semibold">Interactive System Topology Tracer</span>
          </div>
          <span className="font-mono text-[11px] text-slate">
            Select a project to illuminate its architectural path:
          </span>
        </div>

        {/* Project Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {PROJECT_FILTERS.map((proj) => {
            const isSelected = activeProject === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveProject(proj.id)}
                className={`group flex items-center gap-2 rounded-xl px-3.5 py-2 font-mono text-xs transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-copper/15 border-copper text-paper font-semibold shadow-[0_0_15px_rgba(184,118,62,0.25)]"
                    : "bg-ink border-trace text-slate hover:text-paper hover:border-slate/50"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full transition-all ${
                    isSelected
                      ? "bg-copper-bright ring-2 ring-copper/40 shadow-[0_0_8px_rgba(217,119,6,0.8)]"
                      : "bg-trace group-hover:bg-slate"
                  }`}
                />
                <span className="text-paper">{proj.label}</span>
                <span className="hidden md:inline text-[10px] text-slate/70">
                  ({proj.subtitle})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Architecture Blueprint Flow (5 Interactive Tiers) */}
      <div className="relative space-y-4">
        {TIERS.map((tier, idx) => {
          const isHighlighted =
            activeProject === "all" || tier.projects.includes(activeProject);
          const isHovered = activeTier === tier.id;
          const IconComp = tier.icon;

          return (
            <div key={tier.id} className="relative">
              {/* Connector Signal Trace Line to next tier */}
              {idx < TIERS.length - 1 && (
                <div
                  className="absolute left-7 sm:left-9 top-full h-4 w-0.5 z-0 transition-colors duration-500"
                  style={{
                    backgroundColor: isHighlighted ? "#b8763e" : "#232a33",
                    boxShadow: isHighlighted ? "0 0 8px rgba(184,118,62,0.5)" : "none",
                  }}
                />
              )}

              {/* Tier Node Card */}
              <motion.div
                onMouseEnter={() => setActiveTier(tier.id)}
                onMouseLeave={() => setActiveTier(null)}
                animate={{
                  opacity: isHighlighted ? 1 : 0.35,
                  scale: isHovered ? 1.01 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={`relative z-10 rounded-2xl border p-5 sm:p-6 transition-all duration-300 bg-ink-raised ${
                  isHighlighted
                    ? isHovered
                      ? "border-copper-bright shadow-[0_8px_30px_rgba(184,118,62,0.2)] bg-ink-raised"
                      : "border-copper/60 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                    : "border-trace/60"
                }`}
              >
                <div className="grid gap-4 lg:grid-cols-[240px_1fr] items-start">
                  {/* Left Column: Tier Identity & Badge */}
                  <div className="space-y-2 border-b lg:border-b-0 lg:border-r border-trace/60 pb-3 lg:pb-0 lg:pr-4">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`flex items-center justify-center p-2 rounded-xl border transition-colors ${
                          isHighlighted
                            ? "bg-copper/15 border-copper/40 text-copper-bright"
                            : "bg-ink border-trace text-slate"
                        }`}
                      >
                        <IconComp size={18} />
                      </span>
                      <div>
                        <span className="font-mono text-[10px] text-slate font-semibold uppercase tracking-wider block">
                          Tier {tier.number}
                        </span>
                        <h4 className="font-mono text-sm sm:text-base font-bold text-paper tracking-tight">
                          {tier.name}
                        </h4>
                      </div>
                    </div>

                    {/* Status Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="font-mono text-[10px] rounded bg-copper/10 px-2 py-0.5 text-copper-bright border border-copper/30 font-semibold">
                        {tier.badge}
                      </span>
                      <span className="font-mono text-[10px] text-slate flex items-center gap-1">
                        <Activity size={10} className="text-signal" />
                        {tier.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate font-sans leading-relaxed pt-1">
                      {tier.description}
                    </p>
                  </div>

                  {/* Right Column: Interactive Tech Badges inside this Tier */}
                  <div className="flex flex-col justify-between h-full space-y-3">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-slate mb-2">
                        // Stack Components &amp; Protocols
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tier.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs transition-all select-none ${
                              isHighlighted
                                ? "bg-ink border-trace text-paper hover:border-copper/60 hover:text-copper-bright hover:shadow-sm"
                                : "bg-ink/50 border-trace/40 text-slate/60"
                            }`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-signal/70" />
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Project Provenance */}
                    <div className="pt-2 border-t border-trace/40 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-slate">
                      <span className="flex items-center gap-1">
                        <Check size={12} className="text-signal" />
                        <span>Production verified across {tier.projects.length} portfolio projects</span>
                      </span>
                      {isHighlighted && activeProject !== "all" && (
                        <span className="text-copper-bright font-semibold animate-pulse">
                          ⚡ Active in {PROJECT_FILTERS.find((p) => p.id === activeProject)?.label}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

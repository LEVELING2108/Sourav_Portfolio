"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "../data";
import {
  ArrowUpRight,
  GitBranch,
  ShieldCheck,
  Zap,
  Activity,
  Cpu,
  Layers,
  Sparkles,
  Workflow,
  X,
  Radio,
  Clock,
  ChevronRight,
  Database,
  Lock,
} from "lucide-react";
import {
  NextjsIcon,
  PythonIcon,
  TypescriptIcon,
  ReactIcon,
  FastapiIcon,
  FlaskIcon,
  TailwindIcon,
  PytorchIcon,
  RedisIcon,
  DockerIcon,
  PostgresIcon,
  GithubActionsIcon,
  JwtIcon,
  MlopsIcon,
} from "./BrandIcons";

// Helper to get official brand icon for stack tags
function getStackIcon(tech: string) {
  const normalized = tech.toLowerCase();
  if (normalized.includes("react") || normalized.includes("pwa")) return ReactIcon;
  if (normalized.includes("next")) return NextjsIcon;
  if (normalized.includes("python")) return PythonIcon;
  if (normalized.includes("typescript")) return TypescriptIcon;
  if (normalized.includes("fastapi")) return FastapiIcon;
  if (normalized.includes("flask")) return FlaskIcon;
  if (normalized.includes("tailwind")) return TailwindIcon;
  if (normalized.includes("pytorch") || normalized.includes("ml")) return PytorchIcon;
  if (normalized.includes("redis")) return RedisIcon;
  if (normalized.includes("docker")) return DockerIcon;
  if (normalized.includes("postgres") || normalized.includes("sql")) return PostgresIcon;
  if (normalized.includes("github") || normalized.includes("ci/cd")) return GithubActionsIcon;
  if (normalized.includes("jwt") || normalized.includes("auth")) return JwtIcon;
  if (normalized.includes("mlops")) return MlopsIcon;
  return Cpu;
}

// 3D Spotlight Bento Card Wrapper
function BentoCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-3xl border border-trace bg-gradient-to-b from-ink-raised via-ink to-ink overflow-hidden transition-all duration-300 hover:border-copper/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] ${className}`}
    >
      {/* 3D Top Specular Highlight Edge */}
      <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-20" />

      {/* Mouse Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: isHovered
            ? `radial-gradient(450px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(184, 118, 62, 0.15), transparent 80%)`
            : "none",
        }}
      />

      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  );
}

export default function ProjectsBento() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "flagship" | "aiml" | "systems">("all");
  const [inspectedProject, setInspectedProject] = useState<Project | null>(null);

  // Filter logic
  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "flagship") return p.version === "v1.0" || p.version === "v1.6";
    if (selectedCategory === "aiml") return p.tag.includes("machine learning") || p.tag.includes("MLOps") || p.tag.includes("LLM");
    if (selectedCategory === "systems") return p.tag.includes("gateway") || p.tag.includes("emergency") || p.tag.includes("Indian Railways");
    return true;
  });

  const roadsos = projects.find((p) => p.version === "v1.0");
  const fraudshield = projects.find((p) => p.version === "v1.1");
  const railtrack = projects.find((p) => p.version === "v1.6");
  const modelsentry = projects.find((p) => p.version === "v1.5");
  const crmimporter = projects.find((p) => p.version === "v1.4");
  const ledgerline = projects.find((p) => p.version === "v1.3");
  const nlppipeline = projects.find((p) => p.version === "v1.2");

  return (
    <div className="space-y-8">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-ink border border-trace">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              selectedCategory === "all"
                ? "bg-copper/20 text-copper-bright border border-copper/40 font-semibold"
                : "text-slate hover:text-paper"
            }`}
          >
            All Systems (7)
          </button>
          <button
            onClick={() => setSelectedCategory("flagship")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              selectedCategory === "flagship"
                ? "bg-copper/20 text-copper-bright border border-copper/40 font-semibold"
                : "text-slate hover:text-paper"
            }`}
          >
            Flagship & SIH (2)
          </button>
          <button
            onClick={() => setSelectedCategory("aiml")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              selectedCategory === "aiml"
                ? "bg-copper/20 text-copper-bright border border-copper/40 font-semibold"
                : "text-slate hover:text-paper"
            }`}
          >
            Applied AI / ML (3)
          </button>
          <button
            onClick={() => setSelectedCategory("systems")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              selectedCategory === "systems"
                ? "bg-copper/20 text-copper-bright border border-copper/40 font-semibold"
                : "text-slate hover:text-paper"
            }`}
          >
            Distributed & Cloud (4)
          </button>
        </div>

        <div className="flex items-center gap-2 text-slate/80 text-[11px]">
          <span className="flex h-2 w-2 rounded-full bg-signal animate-pulse" />
          <span>Interactive Bento Command Center · Click card to inspect flow</span>
        </div>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* ========================================================================= */}
        {/* CARD 1 (ROADSoS - 7 Cols): Flagship Live Emergency Response PWA */}
        {/* ========================================================================= */}
        {roadsos && (
          <BentoCard className="md:col-span-7">
            <div className="p-6 sm:p-7 flex flex-col justify-between h-full">
              {/* Top Header: Badge, Radar Telemetry, Links */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-trace/60 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-copper-bright bg-copper/15 border border-copper/40 px-2.5 py-0.5 rounded-md">
                      {roadsos.version}
                    </span>
                    <span className="font-mono text-xs text-slate">
                      {roadsos.tag}
                    </span>
                  </div>

                  {/* Live Radar Ping Status */}
                  <div className="flex items-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-3 py-1 font-mono text-[11px] text-signal font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
                    </span>
                    <span>LIVE PWA · Vercel</span>
                  </div>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <h3 className="font-mono text-2xl sm:text-3xl font-bold text-paper group-hover:text-copper-bright transition-colors">
                    {roadsos.title}
                  </h3>
                  <span className="font-mono text-xs text-copper-bright/90 font-medium">
                    SIH Round 2 Cleared
                  </span>
                </div>

                {/* Minimalist 2-line solve */}
                <p className="mt-2.5 text-sm text-slate leading-relaxed font-sans max-w-xl">
                  {roadsos.summary}
                </p>

                {/* Image Preview with Interactive Radar Scanner Overlay */}
                <div className="mt-5 relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden border border-trace/80 bg-ink shadow-inner">
                  {roadsos.image && (
                    <Image
                      src={roadsos.image}
                      alt={roadsos.title}
                      fill
                      className="object-cover object-top opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-90" />

                  {/* Live Concurrency Solve Micro-Widget */}
                  <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-ink-raised/95 border border-copper/50 backdrop-blur-md flex items-center justify-between font-mono text-xs shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded bg-copper/20 text-copper-bright">
                        <Lock size={12} />
                      </span>
                      <span className="text-paper text-[11px] font-semibold">
                        Redis Concurrency Mutex
                      </span>
                    </div>
                    <span className="text-[10px] text-signal font-medium">
                      0 Race Conditions Under Surge
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions & Stack */}
              <div className="mt-6 pt-4 border-t border-trace/60 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  {roadsos.stack.map((tech) => {
                    const IconComp = getStackIcon(tech);
                    return (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-trace bg-ink px-2.5 py-1 font-mono text-xs text-slate"
                      >
                        <IconComp size={13} />
                        <span>{tech}</span>
                      </span>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInspectedProject(roadsos)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ink border border-trace text-slate hover:text-paper hover:border-copper/60 font-mono text-xs transition-colors cursor-pointer"
                  >
                    <Workflow size={12} className="text-copper-bright" />
                    <span>Inspect Flow</span>
                  </button>
                  {roadsos.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all ${
                        link.label === "Live"
                          ? "bg-copper text-ink hover:bg-copper-bright"
                          : "bg-ink border border-trace text-paper hover:border-copper/60"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight size={12} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>
        )}

        {/* ========================================================================= */}
        {/* CARD 2 (FraudShield - 5 Cols): Real-time ML Platform <25ms Inference */}
        {/* ========================================================================= */}
        {fraudshield && (
          <BentoCard className="md:col-span-5">
            <div className="p-6 sm:p-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-trace/60 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-copper-bright bg-copper/15 border border-copper/40 px-2.5 py-0.5 rounded-md">
                      {fraudshield.version}
                    </span>
                    <span className="font-mono text-xs text-slate">
                      Real-Time ML
                    </span>
                  </div>

                  {/* <25ms Latency Badge */}
                  <span className="inline-flex items-center gap-1 rounded-full border border-copper-bright/40 bg-copper/10 px-2.5 py-0.5 font-mono text-[11px] text-copper-bright font-bold">
                    <Zap size={11} className="text-signal" />
                    <span>&lt;25ms Inference</span>
                  </span>
                </div>

                <h3 className="mt-5 font-mono text-2xl font-bold text-paper group-hover:text-copper-bright transition-colors">
                  {fraudshield.title}
                </h3>

                <p className="mt-2 text-sm text-slate leading-relaxed font-sans">
                  Streaming anomaly detection engine with feature drift monitoring and self-healing error bounds.
                </p>

                {/* Animated Inference Latency Waveform */}
                <div className="mt-5 p-4 rounded-2xl border border-trace/80 bg-ink/90 relative overflow-hidden shadow-inner">
                  <div className="flex items-center justify-between font-mono text-[10px] text-slate pb-2">
                    <span>STREAMING INGESTION</span>
                    <span className="text-signal font-semibold">18.4ms AVG</span>
                  </div>

                  {/* Simulated Waveform SVG */}
                  <svg className="w-full h-16" viewBox="0 0 300 60" fill="none">
                    <path
                      d="M0 30 Q 30 10, 60 30 T 120 30 T 180 15 T 240 45 T 300 25"
                      stroke="rgba(79, 209, 197, 0.4)"
                      strokeWidth="2"
                    />
                    <path
                      d="M0 35 Q 35 20, 70 35 T 140 25 T 210 40 T 280 15 T 300 30"
                      stroke="#d99a5f"
                      strokeWidth="2"
                      className="opacity-80"
                    />
                    <circle cx="210" cy="40" r="3" fill="#4fd1c5" className="animate-ping" />
                    <circle cx="210" cy="40" r="3" fill="#4fd1c5" />
                  </svg>

                  <div className="flex items-center justify-between font-mono text-[10px] pt-2 border-t border-trace/40 text-slate">
                    <span>Model: Ensemble ML</span>
                    <span className="text-paper">Anomaly Rate: 0.04%</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions & Stack */}
              <div className="mt-6 pt-4 border-t border-trace/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-lg border border-trace bg-ink px-2 py-1 font-mono text-xs text-slate">
                    <PythonIcon size={13} />
                    <span>Python</span>
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg border border-trace bg-ink px-2 py-1 font-mono text-xs text-slate">
                    <PytorchIcon size={13} />
                    <span>PyTorch</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInspectedProject(fraudshield)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-ink border border-trace text-slate hover:text-paper hover:border-copper/60 font-mono text-xs transition-colors cursor-pointer"
                  >
                    <Workflow size={12} className="text-copper-bright" />
                    <span>Flow</span>
                  </button>
                  <a
                    href={fraudshield.links[0]?.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-copper text-ink hover:bg-copper-bright font-mono text-xs font-semibold transition-all"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          </BentoCard>
        )}

        {/* ========================================================================= */}
        {/* CARD 3 (RailTrack Pro - 4 Cols): SIH 2025 Indian Railways Inspection */}
        {/* ========================================================================= */}
        {railtrack && (
          <BentoCard className="md:col-span-4">
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-trace/60 pb-3">
                  <span className="font-mono text-xs font-bold text-copper-bright bg-copper/15 border border-copper/40 px-2 py-0.5 rounded">
                    {railtrack.version}
                  </span>
                  <span className="font-mono text-[10px] text-signal font-semibold border border-signal/30 bg-signal/10 px-2 py-0.5 rounded">
                    SIH 2025 R2
                  </span>
                </div>

                <h3 className="mt-4 font-mono text-xl font-bold text-paper group-hover:text-copper-bright transition-colors">
                  {railtrack.title}
                </h3>

                <p className="mt-2 text-xs text-slate leading-relaxed font-sans">
                  Indian Railways track auditing with QR field scanning and multi-table integrity verification.
                </p>

                {/* Telemetry pill box */}
                <div className="mt-4 p-3 rounded-xl border border-trace/60 bg-ink space-y-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate">API Throughput:</span>
                    <span className="text-copper-bright font-semibold">30+ REST Endpoints</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate">Relational DB:</span>
                    <span className="text-paper">4-Table PostgreSQL</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-trace/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <FlaskIcon size={14} />
                  <PostgresIcon size={14} />
                  <DockerIcon size={14} />
                </div>
                <button
                  onClick={() => setInspectedProject(railtrack)}
                  className="inline-flex items-center gap-1 text-xs font-mono text-copper-bright hover:underline cursor-pointer"
                >
                  <span>Architecture</span>
                  <ArrowUpRight size={12} />
                </button>
              </div>
            </div>
          </BentoCard>
        )}

        {/* ========================================================================= */}
        {/* CARD 4 (ModelSentry API - 4 Cols): ML Gateway & Rate Limiter */}
        {/* ========================================================================= */}
        {modelsentry && (
          <BentoCard className="md:col-span-4">
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-trace/60 pb-3">
                  <span className="font-mono text-xs font-bold text-copper-bright bg-copper/15 border border-copper/40 px-2 py-0.5 rounded">
                    {modelsentry.version}
                  </span>
                  <span className="font-mono text-[10px] text-paper/80 border border-trace px-2 py-0.5 rounded">
                    Security Gateway
                  </span>
                </div>

                <h3 className="mt-4 font-mono text-xl font-bold text-paper group-hover:text-copper-bright transition-colors">
                  {modelsentry.title}
                </h3>

                <p className="mt-2 text-xs text-slate leading-relaxed font-sans">
                  Dockerized ML serving gateway with JWT authentication and token-bucket request throttling.
                </p>

                {/* Token bucket gauge */}
                <div className="mt-4 p-3 rounded-xl border border-trace/60 bg-ink space-y-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate">Token Bucket:</span>
                    <span className="text-signal font-semibold">100 req/s Max</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate">Auth Guard:</span>
                    <span className="text-paper">Bearer JWT Validated</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-trace/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <PythonIcon size={14} />
                  <JwtIcon size={14} />
                  <DockerIcon size={14} />
                </div>
                <button
                  onClick={() => setInspectedProject(modelsentry)}
                  className="inline-flex items-center gap-1 text-xs font-mono text-copper-bright hover:underline cursor-pointer"
                >
                  <span>Architecture</span>
                  <ArrowUpRight size={12} />
                </button>
              </div>
            </div>
          </BentoCard>
        )}

        {/* ========================================================================= */}
        {/* CARD 5 (CRM CSV Importer - 4 Cols): Applied LLM with Anthropic Claude */}
        {/* ========================================================================= */}
        {crmimporter && (
          <BentoCard className="md:col-span-4">
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-trace/60 pb-3">
                  <span className="font-mono text-xs font-bold text-copper-bright bg-copper/15 border border-copper/40 px-2 py-0.5 rounded">
                    {crmimporter.version}
                  </span>
                  <span className="font-mono text-[10px] text-signal font-semibold border border-signal/30 bg-signal/10 px-2 py-0.5 rounded">
                    Applied LLM
                  </span>
                </div>

                <h3 className="mt-4 font-mono text-xl font-bold text-paper group-hover:text-copper-bright transition-colors">
                  {crmimporter.title}
                </h3>

                <p className="mt-2 text-xs text-slate leading-relaxed font-sans">
                  Zero static regex rules: leverages Anthropic Claude structured JSON mode to map messy CSV rows into typed records.
                </p>

                {/* Extraction badge */}
                <div className="mt-4 p-3 rounded-xl border border-trace/60 bg-ink space-y-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate">Engine:</span>
                    <span className="text-paper font-semibold">Anthropic API</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate">Validation:</span>
                    <span className="text-copper-bright">Type-Safe Schema</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-trace/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <NextjsIcon size={14} />
                  <TypescriptIcon size={14} />
                  <TailwindIcon size={14} />
                </div>
                <button
                  onClick={() => setInspectedProject(crmimporter)}
                  className="inline-flex items-center gap-1 text-xs font-mono text-copper-bright hover:underline cursor-pointer"
                >
                  <span>Architecture</span>
                  <ArrowUpRight size={12} />
                </button>
              </div>
            </div>
          </BentoCard>
        )}

        {/* ========================================================================= */}
        {/* CARD 6 (Ledgerline - 6 Cols): Full-Stack Next.js Finance Manager */}
        {/* ========================================================================= */}
        {ledgerline && (
          <BentoCard className="md:col-span-6">
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-trace/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-copper-bright bg-copper/15 border border-copper/40 px-2 py-0.5 rounded">
                      {ledgerline.version}
                    </span>
                    <span className="font-mono text-xs text-slate">
                      Full-Stack Next.js
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-paper/80 border border-trace px-2 py-0.5 rounded">
                    In Active Dev
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <h3 className="font-mono text-xl font-bold text-paper group-hover:text-copper-bright transition-colors">
                    {ledgerline.title}
                  </h3>
                  <span className="font-mono text-xs text-signal">
                    Interactive Recharts
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate leading-relaxed font-sans">
                  {ledgerline.summary}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-trace/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <NextjsIcon size={14} />
                  <TailwindIcon size={14} />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setInspectedProject(ledgerline)}
                    className="inline-flex items-center gap-1 text-xs font-mono text-copper-bright hover:underline cursor-pointer"
                  >
                    <span>Inspect Flow</span>
                    <ArrowUpRight size={12} />
                  </button>
                  <a
                    href={ledgerline.links[0]?.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-slate hover:text-paper"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>
          </BentoCard>
        )}

        {/* ========================================================================= */}
        {/* CARD 7 (NLP Pipeline - 6 Cols): End-to-End MLOps Lifecycle */}
        {/* ========================================================================= */}
        {nlppipeline && (
          <BentoCard className="md:col-span-6">
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-trace/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-copper-bright bg-copper/15 border border-copper/40 px-2 py-0.5 rounded">
                      {nlppipeline.version}
                    </span>
                    <span className="font-mono text-xs text-slate">
                      Production MLOps
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-copper-bright border border-copper/40 px-2 py-0.5 rounded">
                    DVC & MLflow
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <h3 className="font-mono text-xl font-bold text-paper group-hover:text-copper-bright transition-colors">
                    {nlppipeline.title}
                  </h3>
                  <span className="font-mono text-xs text-signal">
                    Automated CI/CD
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate leading-relaxed font-sans">
                  Automated text classification lifecycle from tokenization and training to registry evaluation.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-trace/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <PythonIcon size={14} />
                  <MlopsIcon size={14} />
                  <GithubActionsIcon size={14} />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setInspectedProject(nlppipeline)}
                    className="inline-flex items-center gap-1 text-xs font-mono text-copper-bright hover:underline cursor-pointer"
                  >
                    <span>Inspect Flow</span>
                    <ArrowUpRight size={12} />
                  </button>
                  <a
                    href={nlppipeline.links[0]?.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-slate hover:text-paper"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>
          </BentoCard>
        )}
      </div>

      {/* ========================================================================= */}
      {/* Interactive System Flow Modal / Slide-out Drawer */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {inspectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInspectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-2xl rounded-3xl border border-copper/60 bg-ink-raised p-5 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-copper via-copper-bright to-signal" />

              {/* Close Button */}
              <button
                onClick={() => setInspectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-xl border border-trace bg-ink text-slate hover:text-paper hover:border-copper/60 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-copper-bright bg-copper/15 border border-copper/40 px-2 py-0.5 rounded">
                      {inspectedProject.version}
                    </span>
                    <span className="font-mono text-xs text-slate">
                      {inspectedProject.tag}
                    </span>
                  </div>
                  <h3 className="font-mono text-2xl font-bold text-paper mt-2">
                    {inspectedProject.title}
                  </h3>
                  <p className="text-xs text-slate mt-1">
                    System Architecture &amp; Production Flow Diagram
                  </p>
                </div>

                {/* 4-Stage Architecture Pipeline */}
                {inspectedProject.architecture && (
                  <div className="p-4 rounded-2xl border border-trace bg-ink space-y-3">
                    <span className="font-mono text-[10px] uppercase text-slate tracking-wider block font-semibold">
                      // End-to-End Data Pipeline
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 font-mono text-xs">
                      {inspectedProject.architecture.flow.map((stage, i) => (
                        <div
                          key={stage}
                          className="p-2.5 rounded-xl border border-trace/70 bg-ink-raised/80 flex flex-col justify-between relative"
                        >
                          <span className="text-[10px] text-copper-bright font-bold">
                            0{i + 1}
                          </span>
                          <span className="text-paper text-xs mt-2 font-medium leading-snug">
                            {stage}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Engineering Solve Box */}
                {inspectedProject.architecture?.solve && (
                  <div className="p-4 rounded-2xl border border-copper/40 bg-copper/5 space-y-1.5 font-mono text-xs">
                    <span className="text-[10px] uppercase text-copper-bright tracking-wider block font-semibold">
                      // Core Engineering Solve
                    </span>
                    <p className="text-paper text-xs leading-relaxed font-sans">
                      {inspectedProject.architecture.solve}
                    </p>
                  </div>
                )}

                {/* CTAs */}
                <div className="pt-2 flex items-center justify-end gap-3 font-mono text-xs">
                  {inspectedProject.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold transition-all ${
                        link.label === "Live"
                          ? "bg-copper text-ink hover:bg-copper-bright"
                          : "bg-ink border border-trace text-paper hover:border-copper/60"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight size={13} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

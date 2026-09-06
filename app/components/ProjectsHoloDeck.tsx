"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { projects, Project } from "../data";
import {
  ArrowUpRight,
  Workflow,
  X,
  Zap,
  Sparkles,
  ShieldCheck,
  Radio,
  Lock,
  Layers,
  Cpu,
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

// 3D Tilt HoloCard with Multi-Plane Depth
function HoloCard({
  project,
  onInspect,
}: {
  project: Project;
  onInspect: (p: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate motion values (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for buttery-smooth responsiveness
  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 20 });

  // 3D Rotation transforms
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Dynamic glass glare sheen tracking
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const isFlagship = project.version === "v1.0" || project.version === "v1.1" || project.version === "v1.6";

  return (
    <div
      style={{ perspective: "1200px" }}
      className="w-full flex justify-center py-2 select-none"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`group relative w-full rounded-3xl border bg-gradient-to-b from-ink-raised via-ink to-ink p-6 sm:p-7 transition-shadow duration-300 ${
          isFlagship
            ? "border-copper/60 shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:border-copper-bright hover:shadow-[0_20px_50px_rgba(184,118,62,0.25)]"
            : "border-trace shadow-lg hover:border-copper/70 hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
        }`}
      >
        {/* Top 3D Specular Highlight Line */}
        <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        {/* Dynamic Holographic Glare Sheen */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30"
          style={{
            background: isHovered
              ? `radial-gradient(400px circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.08), transparent 70%)`
              : "none",
          }}
        />

        {/* ================================================================= */}
        {/* PLANE 1 (Depth: 25px): Header - Version & Live Status Pill */}
        {/* ================================================================= */}
        <div
          style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}
          className="flex items-center justify-between border-b border-trace/60 pb-4"
        >
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-copper-bright bg-copper/15 border border-copper/40 px-2.5 py-0.5 rounded-md shadow-sm">
              {project.version}
            </span>
            <span className="font-mono text-xs text-slate truncate max-w-[140px] sm:max-w-none">
              {project.tag}
            </span>
          </div>

          {/* Live Status Pill with custom animations */}
          {project.version === "v1.0" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-2.5 py-0.5 font-mono text-[11px] text-signal font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
              </span>
              <span>LIVE PWA</span>
            </span>
          ) : project.version === "v1.1" ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-copper-bright/40 bg-copper/15 px-2.5 py-0.5 font-mono text-[11px] text-copper-bright font-bold">
              <Zap size={11} className="text-signal" />
              <span>&lt;25ms ML</span>
            </span>
          ) : project.version === "v1.6" ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-signal/40 bg-signal/10 px-2.5 py-0.5 font-mono text-[11px] text-signal font-bold">
              <Sparkles size={11} />
              <span>SIH 2025 R2</span>
            </span>
          ) : (
            <span className="font-mono text-[10px] rounded border border-trace bg-ink px-2 py-0.5 text-slate font-medium">
              {project.metrics?.[0]?.value || "Production"}
            </span>
          )}
        </div>

        {/* ================================================================= */}
        {/* PLANE 2 (Depth: 40px): Title & Minimal 1-line summary */}
        {/* ================================================================= */}
        <div
          style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
          className="mt-4"
        >
          <h3 className="font-mono text-xl sm:text-2xl font-bold text-paper group-hover:text-copper-bright transition-colors">
            {project.title}
          </h3>
          <p className="mt-1.5 text-xs text-slate line-clamp-2 leading-relaxed font-sans">
            {project.summary}
          </p>
        </div>

        {/* ================================================================= */}
        {/* PLANE 3 (Depth: 55px): High-Definition Mockup with Bezel */}
        {/* ================================================================= */}
        <div
          style={{ transform: "translateZ(55px)", transformStyle: "preserve-3d" }}
          className="mt-4 relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden border border-trace/90 bg-ink shadow-inner"
        >
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-85" />

          {/* Floating Telemetry Pill on Screenshot */}
          {project.architecture?.solve && (
            <div className="absolute bottom-2.5 inset-x-2.5 p-2 rounded-xl bg-ink-raised/95 border border-trace backdrop-blur-md flex items-center justify-between font-mono text-[11px] text-slate shadow-md">
              <div className="flex items-center gap-1.5 truncate">
                <span className="p-0.5 rounded bg-copper/20 text-copper-bright">
                  <Lock size={11} />
                </span>
                <span className="text-paper truncate font-medium">
                  {project.highlights?.[0] || "Architecture"}
                </span>
              </div>
              <span className="text-copper-bright font-semibold shrink-0 ml-2">
                {project.metrics?.[0]?.value || "Verified"}
              </span>
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* PLANE 4 (Depth: 65px): Tech Stack Brand Icons & Direct Actions */}
        {/* ================================================================= */}
        <div
          style={{ transform: "translateZ(65px)", transformStyle: "preserve-3d" }}
          className="mt-5 pt-4 border-t border-trace/60 flex flex-wrap items-center justify-between gap-3"
        >
          {/* Brand Vector SVGs */}
          <div className="flex items-center gap-1.5">
            {project.stack.slice(0, 4).map((tech) => {
              const IconComp = getStackIcon(tech);
              return (
                <span
                  key={tech}
                  title={tech}
                  className="p-1.5 rounded-lg border border-trace bg-ink hover:border-copper/60 transition-colors flex items-center justify-center shadow-inner"
                >
                  <IconComp size={15} />
                </span>
              );
            })}
          </div>

          {/* Quick Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onInspect(project)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-ink border border-trace text-slate hover:text-paper hover:border-copper/60 font-mono text-xs transition-all cursor-pointer"
            >
              <Workflow size={12} className="text-copper-bright" />
              <span>Flow</span>
            </button>

            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all ${
                  link.label === "Live"
                    ? "bg-copper text-ink hover:bg-copper-bright shadow-md"
                    : "bg-ink border border-trace text-paper hover:border-copper/60"
                }`}
              >
                <span>{link.label}</span>
                <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsHoloDeck() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "flagship" | "aiml" | "systems">("all");
  const [inspectedProject, setInspectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "flagship") return p.version === "v1.0" || p.version === "v1.6";
    if (selectedCategory === "aiml") return p.tag.includes("machine learning") || p.tag.includes("MLOps") || p.tag.includes("LLM");
    if (selectedCategory === "systems") return p.tag.includes("gateway") || p.tag.includes("emergency") || p.tag.includes("Indian Railways");
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-ink border border-trace overflow-x-auto max-w-full scrollbar-none w-full sm:w-auto">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-copper/20 text-copper-bright border border-copper/40 font-semibold"
                : "text-slate hover:text-paper"
            }`}
          >
            All Systems (7)
          </button>
          <button
            onClick={() => setSelectedCategory("flagship")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              selectedCategory === "flagship"
                ? "bg-copper/20 text-copper-bright border border-copper/40 font-semibold"
                : "text-slate hover:text-paper"
            }`}
          >
            Flagship & SIH (2)
          </button>
          <button
            onClick={() => setSelectedCategory("aiml")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              selectedCategory === "aiml"
                ? "bg-copper/20 text-copper-bright border border-copper/40 font-semibold"
                : "text-slate hover:text-paper"
            }`}
          >
            Applied AI / ML (3)
          </button>
          <button
            onClick={() => setSelectedCategory("systems")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 whitespace-nowrap ${
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
          <span>3D Parallax Tilt Holo-Decks · Hover to tilt in 3D perspective</span>
        </div>
      </div>

      {/* 3D Holo-Deck Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <HoloCard
            key={project.version}
            project={project}
            onInspect={setInspectedProject}
          />
        ))}
      </div>

      {/* ========================================================================= */}
      {/* Interactive System Flow Modal */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {inspectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInspectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-2xl rounded-3xl border border-copper/60 bg-ink-raised p-5 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-copper via-copper-bright to-signal" />

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

                {inspectedProject.architecture && (
                  <div className="p-4 rounded-2xl border border-trace bg-ink space-y-3">
                    <span className="font-mono text-[10px] uppercase text-slate tracking-wider block font-semibold">
                      // End-to-End Data Pipeline
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 font-mono text-xs">
                      {inspectedProject.architecture.flow.map((stage, i) => (
                        <div
                          key={stage}
                          className="p-2.5 rounded-xl border border-trace/70 bg-ink-raised/80 flex flex-col justify-between"
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

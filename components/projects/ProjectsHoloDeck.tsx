"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/app/data";
import { ArrowUpRight, Zap, Sparkles, Cpu, Terminal } from "lucide-react";
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
} from "@/components/shared/BrandIcons";

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

function StatusBadge({ project }: { project: Project }) {
  if (project.version.startsWith("v0.")) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-copper/40 bg-copper/10 px-2 py-0.5 font-mono text-[10px] text-copper-bright font-semibold shrink-0">
        <span className="h-1.5 w-1.5 rounded-full bg-copper-bright animate-pulse" />
        <span>33k+ ★ OSS</span>
      </span>
    );
  }
  if (project.version === "v1.0") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-signal/40 bg-signal/10 px-2 py-0.5 font-mono text-[10px] text-signal font-semibold shrink-0">
        <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
        <span>Live PWA</span>
      </span>
    );
  }
  if (project.version === "v1.1") {
    return (
      <span className="inline-flex items-center gap-1 rounded-md border border-copper/40 bg-copper/10 px-2 py-0.5 font-mono text-[10px] text-copper-bright font-semibold shrink-0">
        <Zap size={10} className="text-signal" />
        <span>&lt;25ms ML</span>
      </span>
    );
  }
  if (project.version === "v1.6") {
    return (
      <span className="inline-flex items-center gap-1 rounded-md border border-signal/40 bg-signal/10 px-2 py-0.5 font-mono text-[10px] text-signal font-semibold shrink-0">
        <Sparkles size={10} />
        <span>QR Audit</span>
      </span>
    );
  }
  return (
    <span className="font-mono text-[10px] rounded-md border border-trace bg-ink px-2 py-0.5 text-slate shrink-0">
      {project.metrics?.[0]?.value || project.date}
    </span>
  );
}

export default function ProjectsHoloDeck() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = projects[activeIndex] || projects[0];
  const isFlagship =
    activeProject.version.startsWith("v0.") ||
    activeProject.version === "v1.0" ||
    activeProject.version === "v1.1" ||
    activeProject.version === "v1.6";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] lg:h-[430px] gap-4 items-stretch">
      {/* Left Rail: Compact Project Selector */}
      <div className="rounded-2xl border border-trace bg-ink-raised/60 p-2 flex flex-col justify-between gap-1 h-full">
        {projects.map((proj, idx) => {
          const isSelected = activeIndex === idx;
          const PrimaryIcon = getStackIcon(proj.stack[0] || "Python");
          return (
            <button
              key={proj.version}
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => setActiveIndex(idx)}
              className="relative w-full flex-1 text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between gap-2.5 cursor-pointer select-none"
            >
              {isSelected && (
                <motion.div
                  layoutId="split-selector-pill"
                  className="absolute inset-0 rounded-xl bg-ink border border-copper/40 shadow-[0_4px_20px_rgba(184,118,62,0.12)]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}

              <div className="relative z-10 flex items-center gap-2.5 min-w-0">
                <span
                  className={`p-1.5 rounded-lg border transition-colors shrink-0 ${
                    isSelected
                      ? "border-copper/40 bg-copper/10 text-copper-bright"
                      : "border-trace bg-ink text-slate"
                  }`}
                >
                  <PrimaryIcon size={13} />
                </span>
                <div className="min-w-0">
                  <div
                    className={`font-mono text-xs font-bold truncate transition-colors ${
                      isSelected ? "text-paper" : "text-slate"
                    }`}
                  >
                    {proj.title}
                  </div>
                  <div className="font-mono text-[10px] text-slate/60 truncate">
                    {proj.tag.split("·")[0].trim()}
                  </div>
                </div>
              </div>

              <span
                className={`relative z-10 font-mono text-[10px] px-1.5 py-0.5 rounded shrink-0 ${
                  isSelected
                    ? "text-copper-bright bg-copper/15 font-semibold"
                    : "text-slate/60"
                }`}
              >
                {proj.version}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right Stage: Two-Side Split Deck — Locked Exact Height */}
      <div
        className={`relative h-full rounded-2xl border bg-gradient-to-br from-ink-raised/95 to-ink p-5 sm:p-6 overflow-hidden ${
          isFlagship ? "border-copper/50" : "border-signal/40"
        }`}
      >
        {/* Top Specular Beam */}
        <div
          className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent ${
            isFlagship ? "via-copper-bright" : "via-signal"
          } to-transparent`}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.version}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="h-full grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6 items-stretch"
          >
            {/* SIDE 1: Minimal Essential Info (Uniform Fixed Slots) */}
            <div className="flex flex-col justify-between h-full min-w-0">
              <div className="space-y-3.5">
                {/* Version & Status */}
                <div className="flex items-center justify-between gap-2 border-b border-trace/60 pb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-xs font-bold text-copper-bright bg-copper/15 border border-copper/40 px-2.5 py-0.5 rounded-md shrink-0">
                      {activeProject.version}
                    </span>
                    <span className="font-mono text-xs text-slate truncate">
                      {activeProject.tag.split("·")[0].trim()}
                    </span>
                  </div>
                  <StatusBadge project={activeProject} />
                </div>

                {/* Title & Summary (Locked 1-line title + 2-line summary) */}
                <div>
                  <h2 className="font-mono text-xl sm:text-2xl font-bold text-paper truncate">
                    {activeProject.title}
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate leading-relaxed font-sans line-clamp-2 h-[38px] sm:h-[42px]">
                    {activeProject.summary}
                  </p>
                </div>

                {/* Key Highlight Chips (Single Non-Wrapping Row) */}
                {activeProject.highlights && (
                  <div className="flex items-center gap-1.5 font-mono overflow-hidden whitespace-nowrap">
                    {activeProject.highlights.slice(0, 3).map((chip) => (
                      <span
                        key={chip}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-trace bg-ink/90 px-2.5 py-1 text-[11px] text-paper/90 shrink-0"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                            isFlagship ? "bg-copper-bright" : "bg-signal"
                          }`}
                        />
                        <span className="truncate max-w-[170px]">{chip}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Concise Engineering Solve (Locked 2-line Box) */}
                {activeProject.architecture?.solve && (
                  <div className="h-[64px] p-3 rounded-xl border border-trace bg-ink/70 flex items-start gap-2.5 text-xs overflow-hidden">
                    <Terminal
                      size={13}
                      className="text-copper-bright shrink-0 mt-0.5"
                    />
                    <span className="text-slate leading-relaxed font-sans text-xs line-clamp-2">
                      <strong className="text-paper font-mono">Solve: </strong>
                      {activeProject.architecture.solve}
                    </span>
                  </div>
                )}
              </div>

              {/* Footer: Stack Icons + Direct Action Links (Single Row) */}
              <div className="pt-3.5 border-t border-trace/50 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  {activeProject.stack.slice(0, 4).map((tech) => {
                    const IconComp = getStackIcon(tech);
                    return (
                      <span
                        key={tech}
                        title={tech}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border border-trace bg-ink font-mono text-[11px] text-slate shrink-0"
                      >
                        <IconComp size={12} />
                        <span className="hidden sm:inline">{tech}</span>
                      </span>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {activeProject.links.map((link) => {
                    const isInternal = link.href.startsWith("/");
                    const isPrimary =
                      link.label === "Live" || link.label === "Inspect Diffs";
                    const cls = `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all whitespace-nowrap ${
                      isPrimary
                        ? "bg-copper/20 border border-copper/40 text-copper-bright hover:bg-copper/30"
                        : "bg-ink border border-trace text-paper hover:border-copper/40"
                    }`;

                    return isInternal ? (
                      <Link key={link.label} href={link.href} className={cls}>
                        <span>{link.label}</span>
                        <ArrowUpRight size={13} />
                      </Link>
                    ) : (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={cls}
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight size={13} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SIDE 2: Dedicated Project Photo / Visual Viewport (Locked Height) */}
            <div className="relative rounded-xl border border-trace/90 bg-ink overflow-hidden flex flex-col h-[240px] sm:h-[280px] xl:h-full shadow-inner group">
              {/* Top Window Frame Bar */}
              <div className="flex items-center justify-between px-3.5 py-2 border-b border-trace/70 bg-ink-raised/80 font-mono text-[10px] text-slate shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500/70" />
                  <span className="h-2 w-2 rounded-full bg-amber-500/70" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
                  <span className="ml-1.5 text-slate/80 truncate">
                    {activeProject.title.toLowerCase().replace(/\s+/g, "-")}
                  </span>
                </div>
                <span className="text-copper-bright font-semibold">
                  {activeProject.version}
                </span>
              </div>

              {/* Project Image or System-1 Terminal Preview */}
              <div className="relative flex-1 w-full overflow-hidden bg-[#07080a]">
                {activeProject.image ? (
                  <>
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent pointer-events-none" />
                  </>
                ) : (
                  <div className="h-full w-full p-4 sm:p-5 flex flex-col justify-between font-mono text-xs bg-gradient-to-br from-ink-raised via-[#08090c] to-ink">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate/70 border-b border-trace/50 pb-2">
                        <span className="text-signal">laya.integrations.tools</span>
                        <span className="text-emerald-400">7 Merged PRs · v0.4.11</span>
                      </div>
                      <div className="space-y-1.5 pt-1 text-[11px] leading-relaxed">
                        <div className="text-slate/70"># Non-autoregressive System-1 routing (~32.8ms)</div>
                        <div className="text-paper">
                          selector = <span className="text-copper-bright">LayaToolSelector</span>(tools=candidates)
                        </div>
                        <div className="text-paper">
                          decision = selector.<span className="text-signal">select</span>(agent_state)
                        </div>
                        <div className="text-emerald-300 pt-1">
                          ➔ ToolRouteDecision(tool=&quot;issue_refund&quot;, conf=0.998)
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-trace/50 text-[10px]">
                      <div className="p-2 rounded-lg bg-ink border border-trace">
                        <span className="text-slate/60 block">LATENCY</span>
                        <span className="text-amber-400 font-bold text-xs">~32.8 ms (45x)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-ink border border-trace">
                        <span className="text-slate/60 block">ECOSYSTEM</span>
                        <span className="text-copper-bright font-bold text-xs">33,000+ ★</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

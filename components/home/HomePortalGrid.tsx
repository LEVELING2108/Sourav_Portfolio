"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Cpu,
  GraduationCap,
  Mail,
  ArrowUpRight,
  GitBranch,
} from "lucide-react";
import {
  NextjsIcon,
  PythonIcon,
  PytorchIcon,
  DockerIcon,
  RedisIcon,
} from "@/components/shared/BrandIcons";

const MODULES = [
  {
    id: "projects",
    name: "Projects",
    badge: "8 Shipped",
    accent: "copper" as const,
    href: "/projects",
    cta: "Launch Systems Gallery",
    icon: Layers,
    summary: "Production AI systems, full-stack applications & deployed tools.",
    chips: ["RailTrack Pro (QR Audit)", "Laya Integrations", "ROADSoS PWA"],
  },
  {
    id: "oss",
    name: "Open Source",
    badge: "30k+ ★",
    accent: "signal" as const,
    href: "/oss",
    cta: "Inspect Upstream PRs",
    icon: GitBranch,
    summary: "Upstream PRs and core tooling for leading AI frameworks.",
    chips: ["Laya (5 Merged PRs)", "LangChain", "CrewAI CI"],
  },
  {
    id: "stack",
    name: "Tech Stack",
    badge: "20+ Tools",
    accent: "signal" as const,
    href: "/stack",
    cta: "Inspect Architecture",
    icon: Cpu,
    summary: "Deep learning engines, vector databases & cloud infrastructure.",
    icons: [PytorchIcon, NextjsIcon, PythonIcon, DockerIcon, RedisIcon],
  },
  {
    id: "education",
    name: "Education",
    badge: "Dual Track",
    accent: "copper" as const,
    href: "/about",
    cta: "Read Background",
    icon: GraduationCap,
    summary: "ECE at BVDU Pune (9.1 CGPA) & Data Science at IIT Madras.",
    chips: ["BVDU Pune · 9.1 CGPA", "IIT Madras · DS & AI"],
  },
  {
    id: "contact",
    name: "Contact",
    badge: "Available",
    accent: "signal" as const,
    href: "/contact",
    cta: "Initialize Uplink",
    icon: Mail,
    summary: "Direct line for engineering roles, technical advisory & inquiries.",
    chips: ["Pune / Remote", "Replies < 24h"],
  },
];

export default function HomePortalGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % MODULES.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + MODULES.length) % MODULES.length);
    }
  };

  return (
    <section id="portals" className="px-4 sm:px-6 py-14 sm:py-18 border-t border-trace">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-signal">$ ls ~/portals</p>
            <h2 className="mt-1 font-mono text-lg sm:text-xl md:text-2xl font-bold text-paper">
              Command Portals
            </h2>
          </div>

          {/* Quick-switch targeted plate pills */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-ink-raised/60 border border-trace/70 w-fit">
            {MODULES.map((mod, idx) => {
              const isCur = activeIndex === idx;
              const isCopper = mod.accent === "copper";

              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`relative px-3 py-1 rounded-lg font-mono text-xs transition-colors cursor-pointer select-none ${
                    isCur
                      ? isCopper
                        ? "text-copper-bright font-semibold"
                        : "text-signal font-semibold"
                      : "text-slate/70 hover:text-slate"
                  }`}
                  aria-label={`Select ${mod.name}`}
                >
                  {isCur && (
                    <motion.div
                      layoutId="portal-tab-pill"
                      className={`absolute inset-0 rounded-lg bg-ink border shadow-sm -z-10 ${
                        isCopper ? "border-copper/40" : "border-signal/40"
                      }`}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span>{mod.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop / Tablet: Kinetic Accordion Deck */}
        <div
          role="region"
          aria-label="Command Portals Deck (use arrow keys to navigate)"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="hidden md:flex gap-3 min-h-[280px] md:h-[280px] lg:h-[270px] w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-signal/50 rounded-2xl"
        >
          {MODULES.map((mod, idx) => {
            const isActive = activeIndex === idx;
            const Icon = mod.icon;
            const isCopper = mod.accent === "copper";

            return (
              <div
                key={mod.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => {
                  if (isActive) {
                    router.push(mod.href);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                className={`relative rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between overflow-hidden cursor-pointer select-none ${
                  isActive
                    ? isCopper
                      ? "flex-[3.2] border-copper/60 bg-gradient-to-br from-ink-raised/95 to-ink shadow-[0_12px_36px_rgba(184,118,62,0.18)]"
                      : "flex-[3.2] border-signal/60 bg-gradient-to-br from-ink-raised/95 to-ink shadow-[0_12px_36px_rgba(79,209,197,0.16)]"
                    : "flex-1 border-trace/60 bg-ink-raised/40 hover:bg-ink-raised/70 hover:border-trace"
                }`}
                title={isActive ? `Click to launch ${mod.name}` : `Click to inspect ${mod.name}`}
              >
                {/* Luminous Top Beam sliding across portals */}
                {isActive && (
                  <motion.div
                    layoutId="portal-top-beam"
                    className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent ${
                      isCopper
                        ? "via-copper-bright shadow-[0_0_14px_rgba(184,118,62,0.6)]"
                        : "via-signal shadow-[0_0_14px_rgba(79,209,197,0.6)]"
                    } to-transparent pointer-events-none z-20`}
                    transition={{ type: "spring", stiffness: 360, damping: 32 }}
                  />
                )}

                {/* Ambient Radial Backdrop sliding across portals */}
                {isActive && (
                  <motion.div
                    layoutId="portal-active-glow"
                    className={`absolute inset-0 pointer-events-none opacity-40 z-0 ${
                      isCopper
                        ? "bg-[radial-gradient(ellipse_at_top,rgba(184,118,62,0.22)_0%,transparent_70%)]"
                        : "bg-[radial-gradient(ellipse_at_top,rgba(79,209,197,0.18)_0%,transparent_70%)]"
                    }`}
                    transition={{ type: "spring", stiffness: 320, damping: 32 }}
                  />
                )}

                <AnimatePresence mode="wait" initial={false}>
                  {/* Collapsed State */}
                  {!isActive ? (
                    <motion.div
                      key={`collapsed-${mod.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="h-full flex flex-col items-center justify-between py-5 px-3 relative z-10"
                    >
                      <span
                        className={`p-2 rounded-xl bg-ink border transition-colors ${
                          isCopper
                            ? "border-copper/30 text-copper-bright"
                            : "border-signal/30 text-signal"
                        }`}
                      >
                        <Icon size={16} />
                      </span>

                      <div className="[writing-mode:vertical-lr] rotate-180 font-mono text-xs text-slate uppercase tracking-widest font-medium whitespace-nowrap">
                        {mod.name}
                      </div>

                      <span className="font-mono text-[10px] text-slate/60">
                        {mod.badge}
                      </span>
                    </motion.div>
                  ) : (
                    /* Expanded State */
                    <motion.div
                      key={`expanded-${mod.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="h-full flex flex-col justify-between p-5 relative z-10"
                    >
                      <div>
                        {/* Top Tag & Badge */}
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.24, delay: 0.05 }}
                          className="flex items-center justify-between"
                        >
                          <span className="font-mono text-[11px] text-slate/70 tracking-wider">
                            PORTAL // 0{idx + 1}
                          </span>
                          <span
                            className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold ${
                              isCopper
                                ? "border-copper/30 bg-copper/10 text-copper-bright"
                                : "border-signal/30 bg-signal/10 text-signal"
                            }`}
                          >
                            {mod.badge}
                          </span>
                        </motion.div>

                        {/* Title & Icon */}
                        <motion.div
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.28, delay: 0.09 }}
                          className="mt-3 flex items-center gap-3"
                        >
                          <span
                            className={`p-2 rounded-xl bg-ink border shadow-inner ${
                              isCopper
                                ? "border-copper/40 text-copper-bright shadow-copper/10"
                                : "border-signal/40 text-signal shadow-signal/10"
                            }`}
                          >
                            <Icon size={18} />
                          </span>
                          <h3 className="font-mono text-xl sm:text-2xl font-bold text-paper">
                            {mod.name}
                          </h3>
                        </motion.div>

                        {/* Minimal Clean Summary */}
                        <motion.p
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.12 }}
                          className="mt-2 font-mono text-xs text-slate leading-relaxed max-w-md"
                        >
                          {mod.summary}
                        </motion.p>

                        {/* Targeted Highlight Chips or Brand Icons */}
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.15 }}
                          className="mt-3"
                        >
                          {mod.icons ? (
                            <div className="flex items-center gap-2 p-1.5 px-2.5 rounded-xl bg-ink/90 border border-trace w-fit shadow-sm">
                              {mod.icons.map((Brand, i) => (
                                <Brand key={i} size={16} />
                              ))}
                              <span className="font-mono text-[10px] text-slate ml-1">
                                + 15 tools
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                              {mod.chips?.map((chip, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-trace bg-ink/80 px-2 py-0.5 text-[11px] text-slate shadow-sm"
                                >
                                  <span
                                    className={`h-1.5 w-1.5 rounded-full ${
                                      isCopper ? "bg-copper-bright" : "bg-signal animate-pulse"
                                    }`}
                                  />
                                  <span>{chip}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      </div>

                      {/* Bottom CTA Row */}
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, delay: 0.18 }}
                        className="pt-3 border-t border-trace/40 flex items-center justify-between"
                      >
                        <Link
                          href={mod.href}
                          onClick={(e) => e.stopPropagation()}
                          className={`inline-flex items-center gap-2 font-mono text-xs font-semibold group/btn ${
                            isCopper
                              ? "text-copper-bright hover:underline"
                              : "text-signal hover:underline"
                          }`}
                        >
                          <span>{mod.cta}</span>
                          <ArrowUpRight
                            size={13}
                            className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                          />
                        </Link>
                        <span className="font-mono text-[10px] text-slate/50">
                          [click to launch]
                        </span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Mobile: Interactive Stack List */}
        <div className="md:hidden space-y-3">
          {MODULES.map((mod, idx) => {
            const Icon = mod.icon;
            const isCopper = mod.accent === "copper";

            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                whileTap={{ scale: 0.985 }}
              >
                <Link
                  href={mod.href}
                  className="block rounded-xl border border-trace bg-ink-raised/70 p-3.5 sm:p-4 transition-all hover:border-copper/50 hover:bg-ink-raised"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`p-2 rounded-lg bg-ink border shrink-0 ${
                          isCopper
                            ? "border-copper/30 text-copper-bright"
                            : "border-signal/30 text-signal"
                        }`}
                      >
                        <Icon size={16} />
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-mono text-sm sm:text-base font-bold text-paper truncate">
                            {mod.name}
                          </h3>
                          <span
                            className={`rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold border ${
                              isCopper
                                ? "bg-copper/10 border-copper/30 text-copper-bright"
                                : "bg-signal/10 border-signal/30 text-signal"
                            }`}
                          >
                            {mod.badge}
                          </span>
                        </div>
                        <p className="font-mono text-[11px] text-slate/80 truncate mt-0.5">
                          {mod.summary}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`p-1.5 rounded-md border border-trace bg-ink shrink-0 ${
                        isCopper ? "text-copper-bright" : "text-signal"
                      }`}
                    >
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

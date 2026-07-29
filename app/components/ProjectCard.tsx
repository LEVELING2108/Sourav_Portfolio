"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
  PanInfo,
} from "framer-motion";
import { Project } from "../data";
import ProjectPreview from "./ProjectPreview";
import {
  GitBranch,
  Globe,
  RotateCw,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

interface ProjectCardProps {
  project: Project;
  direction?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 260 : -260,
    opacity: 0,
    scale: 0.94,
    rotate: direction > 0 ? 5 : -5,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -260 : 260,
    opacity: 0,
    scale: 0.94,
    rotate: direction > 0 ? -5 : 5,
  }),
};

export default function ProjectCard({
  project,
  direction = 1,
  onSwipeLeft,
  onSwipeRight,
}: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // 3D Cursor Tilt Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateXRaw = useTransform(y, [-150, 150], [6, -6]);
  const rotateYRaw = useTransform(x, [-200, 200], [-8, 8]);

  const rotateX = useSpring(rotateXRaw, { stiffness: 300, damping: 26 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 300, damping: 26 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const toggleFlip = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button.action-btn")) return;
    setIsFlipped((prev) => !prev);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -70 && onSwipeLeft) {
      onSwipeLeft();
    } else if (info.offset.x > 70 && onSwipeRight) {
      onSwipeRight();
    }
  };

  return (
    <motion.div
      custom={direction}
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      drag={!isFlipped ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.65}
      onDragEnd={handleDragEnd}
      style={{
        rotateX: !isFlipped ? rotateX : 0,
        rotateY: !isFlipped ? rotateY : 0,
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={toggleFlip}
      className="relative w-full max-w-6xl min-h-[460px] sm:min-h-[500px] rounded-3xl border border-trace/80 bg-ink-raised/95 backdrop-blur-xl p-6 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.55)] cursor-grab active:cursor-grabbing hover:border-copper/70 hover:shadow-[0_28px_80px_rgba(184,118,62,0.25)] transition-colors duration-300 select-none touch-pan-y"
    >
      {/* Top Ambient Glow Accent Line */}
      <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-copper via-copper-bright/70 to-signal opacity-100" />

      {/* 3D Perspective Container */}
      <div className="relative h-full flex flex-col justify-between [perspective:1200px]">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full [transform-style:preserve-3d] flex flex-col justify-between"
        >
          {/* CARD FRONT */}
          <div
            className={`w-full h-full flex flex-col justify-between space-y-5 [backface-visibility:hidden] ${
              isFlipped ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            {/* Header Row */}
            <div className="flex items-center justify-between border-b border-trace/60 pb-3.5 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-copper/15 px-3 py-1 text-xs font-bold text-copper-bright border border-copper/30">
                  {project.version}
                </span>
                <span className="font-semibold text-paper text-base sm:text-lg">
                  {project.title}
                </span>
              </div>
              <span className="text-slate text-xs font-mono">{project.tag}</span>
            </div>

            {/* Content Body: Large Preview Image + Right Column */}
            <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] items-center my-auto">
              {/* Left Column: Spacious High-Res Preview Image */}
              <ProjectPreview
                image={project.image}
                title={project.title}
                date={project.date}
              />

              {/* Right Column: Detailed Info & Badges */}
              <div className="space-y-4 font-sans">
                <p className="text-sm text-paper/90 leading-relaxed">
                  {project.summary}
                </p>

                {/* Highlights Badges */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center gap-1 rounded-md bg-ink px-2.5 py-1 font-mono text-xs text-paper/90 border border-trace"
                      >
                        <Sparkles size={11} className="text-copper-bright" />
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="pt-1">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-slate mb-1.5">
                    // tech stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-trace/80 bg-ink px-2.5 py-1 font-mono text-xs text-paper/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Action Row */}
            <div className="flex items-center justify-between border-t border-trace/50 pt-3.5 font-mono text-xs">
              <div className="flex items-center gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="action-btn inline-flex items-center gap-1.5 rounded-lg bg-copper/15 border border-copper/40 px-3.5 py-1.5 text-copper-bright hover:bg-copper hover:text-ink font-semibold transition-all text-xs"
                  >
                    <span>{link.label === "Live" ? "Live Demo" : "GitHub Repo"}</span>
                    <ArrowUpRight size={13} />
                  </a>
                ))}
              </div>

              <div className="inline-flex items-center gap-1.5 text-signal font-medium animate-pulse text-xs">
                <RotateCw size={13} />
                <span>Swipe ↔ or Click to Flip 3D</span>
              </div>
            </div>
          </div>

          {/* CARD BACK */}
          <div
            className={`absolute inset-0 w-full h-full flex flex-col justify-between space-y-4 [transform:rotateY(180deg)] [backface-visibility:hidden] ${
              !isFlipped ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-trace/60 pb-3.5 font-mono text-xs">
              <div className="flex items-center gap-2 text-signal font-semibold text-sm">
                <CheckCircle2 size={16} />
                <span>{project.title} ({project.version}) — Architecture & Highlights</span>
              </div>
              <span className="text-copper-bright font-mono">{project.date}</span>
            </div>

            {/* Content Body */}
            <div className="space-y-4 font-mono text-xs my-auto">
              {project.architecture && (
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-wider text-slate">
                    // system workflow pipeline
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {project.architecture.flow.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="rounded-lg bg-ink border border-signal/40 px-3 py-1 text-paper font-medium text-xs">
                          {step}
                        </span>
                        {idx < project.architecture!.flow.length - 1 && (
                          <span className="text-copper-bright font-bold text-sm">➔</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Engineering Solve Callout */}
              {project.architecture && (
                <div className="p-4 rounded-xl bg-ink/90 border border-copper/40 font-sans text-xs sm:text-sm text-slate leading-relaxed">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-copper-bright font-semibold block mb-1">
                    ⚡ Key Engineering Challenge & Solve
                  </span>
                  {project.architecture.solve}
                </div>
              )}

              {/* Key Features List */}
              <div className="space-y-1.5 font-sans">
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate">
                  // key capabilities
                </p>
                <ul className="grid gap-2 sm:grid-cols-2 text-xs text-paper/90">
                  {project.features?.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Sparkles size={12} className="text-copper-bright shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex items-center justify-between border-t border-trace/50 pt-3.5 font-mono text-xs">
              <div className="flex items-center gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="action-btn inline-flex items-center gap-1.5 rounded-xl bg-copper px-4 py-2 text-ink font-semibold hover:bg-copper-bright transition-all text-xs shadow-sm"
                  >
                    {link.label === "Live" ? <Globe size={14} /> : <GitBranch size={14} />}
                    <span>{link.label === "Live" ? "Live Demo" : "GitHub Repo"}</span>
                  </a>
                ))}
              </div>

              <span className="text-signal text-xs font-mono font-medium">
                Click to Flip Front ↺
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

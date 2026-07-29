"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
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
  isTop: boolean;
  stackIndex: number;
  totalCards: number;
  onNext?: () => void;
}

export default function ProjectCard({
  project,
  isTop,
  stackIndex,
  totalCards,
}: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // 3D Cursor Tilt Motion Values for Active Top Card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateXRaw = useTransform(y, [-140, 140], [6, -6]);
  const rotateYRaw = useTransform(x, [-180, 180], [-8, 8]);

  const rotateX = useSpring(rotateXRaw, { stiffness: 300, damping: 26 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 300, damping: 26 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isTop || shouldReduceMotion) return;
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

  // Stack Depth Scaling & Vertical Offset (Apple Wallet style)
  const cardScale = Math.max(0.86, 1 - stackIndex * 0.045);
  const cardYOffset = stackIndex * 16;
  const cardOpacity = Math.max(0.4, 1 - stackIndex * 0.22);
  const cardZIndex = totalCards - stackIndex;

  return (
    <motion.div
      style={{
        zIndex: cardZIndex,
        rotateX: isTop && !isFlipped ? rotateX : 0,
        rotateY: isTop && !isFlipped ? rotateY : 0,
      }}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{
        opacity: cardOpacity,
        y: cardYOffset,
        scale: cardScale,
      }}
      exit={{ opacity: 0, x: 260, rotate: 12, scale: 0.85 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={isTop ? toggleFlip : undefined}
      className={`relative w-full max-w-3xl min-h-[460px] sm:min-h-[490px] h-[480px] sm:h-[500px] rounded-3xl border border-trace/80 bg-ink-raised/95 backdrop-blur-xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-colors duration-300 ${
        isTop
          ? "cursor-pointer hover:border-copper/70 hover:shadow-[0_24px_70px_rgba(184,118,62,0.22)]"
          : "pointer-events-none select-none"
      }`}
    >
      {/* Top Ambient Glow Halo Accent Line */}
      <div
        className={`absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-copper via-copper-bright/60 to-signal transition-opacity duration-300 ${
          isTop ? "opacity-100" : "opacity-40"
        }`}
      />

      {/* 3D Container with Perspective */}
      <div className="relative h-full flex flex-col justify-between [perspective:1200px]">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full [transform-style:preserve-3d] flex flex-col justify-between"
        >
          {/* CARD FRONT (Minimal) */}
          <div
            className={`w-full h-full flex flex-col justify-between space-y-4 [backface-visibility:hidden] ${
              isFlipped ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-trace/60 pb-3 font-mono text-xs">
              <div className="flex items-center gap-2.5">
                <span className="rounded-md bg-copper/15 px-2.5 py-0.5 font-mono text-xs font-bold text-copper-bright border border-copper/30">
                  {project.version}
                </span>
                <span className="font-semibold text-paper text-sm sm:text-base">
                  {project.title}
                </span>
              </div>
              <span className="text-slate text-xs font-mono">{project.tag}</span>
            </div>

            {/* Content Body: Image + Brief Summary */}
            <div className="grid gap-5 sm:grid-cols-[1.1fr_0.9fr] items-center my-auto">
              {/* Left Column: One-line summary & Tech Badges */}
              <div className="space-y-3 font-sans">
                <p className="text-xs sm:text-sm text-slate leading-relaxed">
                  {project.summary}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-trace/80 bg-ink px-2 py-0.5 font-mono text-[11px] text-paper/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Project Preview Image */}
              <ProjectPreview
                image={project.image}
                title={project.title}
                date={project.date}
              />
            </div>

            {/* Footer Row */}
            <div className="flex items-center justify-between border-t border-trace/50 pt-3 font-mono text-xs">
              <div className="flex items-center gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="action-btn inline-flex items-center gap-1 text-copper-bright hover:text-paper transition-colors font-medium text-xs"
                  >
                    {link.label}
                    <ArrowUpRight size={13} />
                  </a>
                ))}
              </div>

              {isTop && (
                <div className="inline-flex items-center gap-1 text-signal font-medium animate-pulse text-xs">
                  <RotateCw size={12} />
                  <span>Click to Explore 3D ↻</span>
                </div>
              )}
            </div>
          </div>

          {/* CARD BACK (Extremely Minimal — Highlights & Links Only) */}
          <div
            className={`absolute inset-0 w-full h-full flex flex-col justify-between space-y-4 [transform:rotateY(180deg)] [backface-visibility:hidden] ${
              !isFlipped ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-trace/60 pb-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-signal font-semibold">
                <CheckCircle2 size={15} />
                <span>{project.title} ({project.version})</span>
              </div>
              <span className="text-copper-bright font-mono">{project.date}</span>
            </div>

            {/* Concise Bullet Highlights Only */}
            <div className="space-y-3 font-mono text-xs my-auto">
              <p className="text-[10px] uppercase tracking-wider text-slate">
                // key project highlights
              </p>
              <ul className="space-y-2 text-xs text-paper/90 font-sans">
                {project.features?.slice(0, 3).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Sparkles size={12} className="text-copper-bright shrink-0 mt-0.5" />
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct GitHub & Live Demo Action Buttons */}
            <div className="flex items-center justify-between border-t border-trace/50 pt-3 font-mono text-xs">
              <div className="flex items-center gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="action-btn inline-flex items-center gap-1.5 rounded-xl bg-copper px-4 py-1.5 text-ink font-semibold hover:bg-copper-bright transition-all text-xs shadow-sm"
                  >
                    {link.label === "Live" ? <Globe size={13} /> : <GitBranch size={13} />}
                    <span>{link.label === "Live" ? "Live Demo" : "GitHub Repo"}</span>
                  </a>
                ))}
              </div>

              <span className="text-signal text-[11px] font-mono cursor-pointer">
                Flip Front ↺
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

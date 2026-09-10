"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { profile } from "@/app/data";
import {
  ArrowDown,
  ArrowUpRight,
  GitBranch,
  Sparkles,
  FileText,
} from "lucide-react";
import Link from "next/link";
import HeroPhotoOrbital from "./HeroPhotoOrbital";
import NeuralBackground from "./NeuralBackground";

const FOCUS_AREAS = [
  "real-time ML pipelines (<25ms inference)",
  "high-concurrency distributed systems",
  "enterprise QR & track telemetry engines",
  "applied LLM & structured JSON extraction",
];

function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________0101";

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 28);
  };

  useEffect(() => {
    scramble();
  }, [text]);

  return (
    <span
      onMouseEnter={scramble}
      className="cursor-pointer select-none transition-colors hover:text-copper-bright"
      title="Hover to re-scramble"
    >
      {display}
    </span>
  );
}

function TypewriterFocus({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = items[index];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayedText(current.slice(0, displayedText.length + 1));
      }, 65);
    } else if (!isDeleting && displayedText.length === current.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(current.slice(0, displayedText.length - 1));
      }, 35);
    } else if (isDeleting && displayedText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % items.length);
      }, 400);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, index, items]);

  return (
    <span className="inline-flex items-center text-copper-bright font-medium">
      <span>{displayedText}</span>
      <span className="inline-block w-1.5 h-3.5 sm:h-4 bg-copper-bright ml-1 rounded-xs animate-pulse" />
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col justify-center px-4 sm:px-6 pt-16 sm:pt-20 pb-16 overflow-hidden"
    >
      {/* Background Engineering Blueprint Mesh & Ambient Radiance */}
      <div className="absolute inset-0 bg-[radial-gradient(#26262d_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_60%,transparent_100%)] pointer-events-none opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-copper/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-signal/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Interactive Neural Particle & Synaptic Constellation */}
      <NeuralBackground />

      {/* Main 50/50 Dual-Pillar Hero Stage */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Pillar: Identity, Story & Action CTAs */}
          <div>
            {/* Top Credibility Badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2 mb-4"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-3 py-1 font-mono text-[11px] text-signal shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                <span>Dual-Track: IIT Madras × BVDU Pune</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-copper/30 bg-copper/10 px-3 py-1 font-mono text-[11px] text-copper-bright/90">
                <Sparkles size={11} />
                <span>7+ Shipped</span>
              </span>
            </motion.div>

            {/* Monospace Command Prefix */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="mb-2 font-mono text-xs sm:text-sm text-signal"
            >
              <span className="text-slate">$</span> whoami --runtime=production
            </motion.p>

            {/* Headline with Hacker Scramble Effect */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-paper"
            >
              <ScrambleText text={profile.name} />
              <span className="text-copper">.</span>
            </motion.h1>

            {/* Subtitle / Role */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 max-w-xl text-base sm:text-lg lg:text-xl text-paper/90 font-medium"
            >
              {profile.role}
            </motion.p>

            {/* Dynamic Focus Capsule */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 flex items-center gap-2 font-mono text-xs sm:text-sm text-slate min-h-[24px]"
            >
              <span className="text-signal">$ runtime.focus():</span>
              <TypewriterFocus items={FOCUS_AREAS} />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-copper px-5 py-2.5 font-mono text-xs sm:text-sm font-medium text-ink hover:bg-copper-bright transition-all duration-300 active:scale-95 shadow-md"
              >
                explore systems
                <ArrowUpRight size={15} />
              </Link>
              <a
                href={profile.resumeHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-copper/60 bg-copper/10 px-5 py-2.5 font-mono text-xs sm:text-sm text-copper-bright hover:bg-copper/20 transition-all duration-300 active:scale-95"
              >
                <FileText size={15} />
                Resume PDF
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-trace px-5 py-2.5 font-mono text-xs sm:text-sm text-paper hover:border-copper/60 transition-all duration-300 active:scale-95"
              >
                <GitBranch size={15} />
                GitHub
              </a>
            </motion.div>
          </div>

          {/* Right Pillar: 3D Hologram Stage with Locked-in Orbital Rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center lg:justify-end"
          >
            <HeroPhotoOrbital />
          </motion.div>
        </div>
      </div>

      {/* Sleek Interactive Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute bottom-6 inset-x-0 flex flex-col items-center justify-center select-none z-10"
      >
        <a
          href="#portals"
          className="group flex flex-col items-center justify-center gap-1.5 cursor-pointer p-2"
          aria-label="Scroll to Command Portals"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate/60 group-hover:text-copper-bright transition-colors">
            explore portals
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-copper-bright/70 group-hover:text-copper-bright transition-colors"
          >
            <ArrowDown size={14} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}

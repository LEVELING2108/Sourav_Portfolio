"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { profile, stats } from "../data";
import { ArrowDown, GitBranch, Sparkles, FileText } from "lucide-react";
import Image from "next/image";
import HeroPhotoBadge from "./HeroPhotoBadge";

const FOCUS_AREAS = [
  "real-time ML pipelines (<25ms inference)",
  "high-concurrency distributed systems",
  "SIH '25 Indian Railways track management",
  "applied LLM & structured JSON extraction",
];

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
      className="relative flex min-h-screen flex-col justify-center px-4 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-16"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_310px] items-center">
          {/* Left Column: Intro Text & Stats */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 sm:mb-4 font-mono text-xs sm:text-sm text-signal"
            >
              <span className="text-slate">$</span> whoami
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-paper"
            >
              <span>{profile.name}</span>
              <span className="text-copper">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2.5 sm:mt-3 max-w-xl text-base sm:text-lg lg:text-xl text-paper/90 font-medium"
            >
              {profile.role}
            </motion.p>

            {/* Dynamic Focus Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 flex items-center gap-2 font-mono text-xs sm:text-sm text-slate min-h-[22px]"
            >
              <span className="text-signal">focusing on:</span>
              <TypewriterFocus items={FOCUS_AREAS} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 sm:mt-4 max-w-lg text-sm sm:text-base text-slate leading-relaxed"
            >
              {profile.tagline}
            </motion.p>

            {/* Live Status Pulse */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs text-slate"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-trace bg-ink-raised px-3 py-1 text-slate">
                <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
                <span className="text-paper font-medium">Now:</span>
                <span>Dual Degree ECE @ BVDU Pune &amp; IIT Madras BS</span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded bg-copper px-5 py-2.5 font-mono text-xs sm:text-sm font-medium text-ink hover:bg-copper-bright transition-all duration-300 active:scale-95 shadow-md"
              >
                view the log
                <ArrowDown size={15} />
              </a>
              <a
                href={profile.resumeHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded border border-copper/60 bg-copper/10 px-5 py-2.5 font-mono text-xs sm:text-sm text-copper-bright hover:bg-copper/20 transition-all duration-300 active:scale-95"
              >
                <FileText size={15} />
                Resume PDF
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded border border-trace px-5 py-2.5 font-mono text-xs sm:text-sm text-paper hover:border-copper/60 transition-all duration-300 active:scale-95"
              >
                <GitBranch size={15} />
                GitHub
              </a>
            </motion.div>
          </div>

          {/* Right Column: Style 1 - 3D Holographic Specular Glass Engineer Pass */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 lg:mt-0"
          >
            <HeroPhotoBadge />
          </motion.div>
        </div>

        {/* Stats Row Below Intro */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-trace pt-6 max-w-2xl"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-mono text-[11px] sm:text-xs uppercase tracking-wide text-slate">
                {s.label}
              </dt>
              <dd className="mt-1 font-mono text-base sm:text-lg text-copper-bright">{s.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}


"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { profile, stats } from "../data";
import { ArrowDown, GitBranch, Sparkles, FileText } from "lucide-react";
import Image from "next/image";

function TypewriterName({ name }: { name: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < name.length) {
      // Type forward
      timeout = setTimeout(() => {
        setDisplayedText(name.slice(0, displayedText.length + 1));
      }, 120);
    } else if (!isDeleting && displayedText.length === name.length) {
      // Hold full text for 2.5 seconds
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2500);
    } else if (isDeleting && displayedText.length > 0) {
      // Delete backward
      timeout = setTimeout(() => {
        setDisplayedText(name.slice(0, displayedText.length - 1));
      }, 75);
    } else if (isDeleting && displayedText.length === 0) {
      // Short pause before looping
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 600);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, name]);

  return (
    <span className="inline-flex items-center">
      <span>{displayedText}</span>
      <span className="text-copper">.</span>
      <span className="inline-block w-2 sm:w-3.5 h-6 sm:h-12 bg-copper-bright ml-1 sm:ml-2 rounded-sm animate-pulse" />
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
              <TypewriterName name={profile.name} />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2.5 sm:mt-3 max-w-xl text-base sm:text-lg lg:text-xl text-paper/90 font-medium"
            >
              {profile.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 sm:mt-4 max-w-lg text-sm sm:text-base text-slate leading-relaxed"
            >
              {profile.tagline}
            </motion.p>

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

          {/* Right Column: Oval-Squircle Personal Photo Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end mt-4 lg:mt-0"
          >
            <div className="relative group">
              {/* Outer Glowing Ambient Ring Halo */}
              <div className="absolute -inset-2 rounded-[44px] sm:rounded-[52px] lg:rounded-[64px] bg-gradient-to-tr from-copper via-copper-bright/50 to-signal opacity-70 blur-lg transition-all duration-700 ease-out group-hover:opacity-100 group-hover:blur-xl" />

              {/* Main Oval-Squircle Frame Container */}
              <motion.div
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="relative overflow-hidden rounded-[40px] sm:rounded-[48px] lg:rounded-[58px] border-2 border-copper/80 bg-ink-raised w-[220px] h-[270px] sm:w-[260px] sm:h-[310px] lg:w-[280px] lg:h-[340px] shadow-[0_10px_40px_rgba(184,118,62,0.3)] backdrop-blur"
              >
                <Image
                  src={profile.avatar}
                  alt={`${profile.name} Personal Photo`}
                  fill
                  priority
                  sizes="(max-width: 640px) 220px, (max-width: 1024px) 260px, 280px"
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-hover:brightness-110"
                />

                {/* Subtle bottom gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60" />

                {/* Floating Status Pill Overlay */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between font-mono text-[10px] sm:text-[11px] bg-ink/85 backdrop-blur px-2.5 py-1.5 rounded-full border border-copper/50 text-paper">
                  <span className="flex items-center gap-1.5 text-signal font-semibold">
                    <span className="h-2 w-2 rounded-full bg-signal animate-ping" />
                    Available for roles
                  </span>
                  <Sparkles size={12} className="text-copper-bright" />
                </div>
              </motion.div>
            </div>
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


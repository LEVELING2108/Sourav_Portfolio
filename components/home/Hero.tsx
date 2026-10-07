"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { profile } from "@/app/data";
import {
  ArrowDown,
  ArrowUpRight,
  GitBranch,
  FileText,
} from "lucide-react";
import Link from "next/link";
import HeroPhotoOrbital from "./HeroPhotoOrbital";
import NeuralBackground from "./NeuralBackground";
import { Mascot } from "@/components/shared/Mascot";

const FOCUS_AREAS = [
  "upstream System-1 agent routing (Laya · 30k+ ★)",
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

function HeroActionDock() {
  const [hovered, setHovered] = useState<string | null>(null);

  const items = [
    {
      id: "systems",
      label: "explore systems",
      href: "/projects",
      isInternal: true,
      icon: (
        <ArrowUpRight
          size={14}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      ),
    },
    {
      id: "resume",
      label: "resume",
      href: profile.resumeHref,
      isInternal: false,
      icon: <FileText size={14} className="text-copper-bright transition-colors" />,
    },
    {
      id: "github",
      label: "github",
      href: profile.github,
      isInternal: false,
      icon: <GitBranch size={14} className="text-signal transition-colors" />,
    },
  ];

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className="relative mt-5 sm:mt-6 inline-flex items-center gap-1 p-1 sm:p-1.5 rounded-full border border-trace/90 bg-ink-raised/90 backdrop-blur-xl shadow-xl shadow-black/30 shrink-0 select-none"
    >
      {/* Specular ambient rim reflection on outer dock */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

      {items.map((item, index) => {
        const isHovered = hovered === item.id;
        const isSystems = item.id === "systems";

        const content = (
          <span className="relative z-10 flex items-center gap-1.5 font-mono text-xs sm:text-[13px] tracking-tight">
            <span
              className={`transition-colors duration-200 ${
                isSystems && !hovered
                  ? "text-copper-bright font-semibold"
                  : isHovered
                  ? "text-paper font-semibold"
                  : "text-slate group-hover:text-paper"
              }`}
            >
              {item.label}
            </span>
            {item.icon}
          </span>
        );

        const className =
          "group relative flex items-center justify-center rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200";

        return (
          <div key={item.id} className="relative flex items-center">
            {index > 0 && (
              <div className="h-4 w-px bg-trace/70 mx-0.5 transition-opacity duration-200 group-hover:opacity-20" />
            )}

            {item.isInternal ? (
              <Link
                href={item.href}
                onMouseEnter={() => setHovered(item.id)}
                className={className}
              >
                {/* Resting liquid glass state on primary when dock is idle */}
                {isSystems && !hovered && (
                  <motion.div
                    layoutId="liquid-glass-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-b from-copper/25 via-copper/15 to-copper/5 border border-copper/50 shadow-[0_2px_12px_rgba(235,140,80,0.25),inset_0_1px_1.5px_rgba(255,255,255,0.25)] backdrop-blur-md"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 32,
                      mass: 0.7,
                    }}
                  />
                )}

                {/* Sliding Liquid Glass Morphing Pill while hovering */}
                {isHovered && (
                  <motion.div
                    layoutId="liquid-glass-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-white/[0.08] to-white/[0.02] border border-white/35 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.45),0_0_16px_rgba(235,140,80,0.2)] backdrop-blur-xl"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 30,
                      mass: 0.65,
                    }}
                  >
                    {/* Liquid glass light sheen refraction */}
                    <div className="absolute inset-x-2.5 top-0.5 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-copper/20 to-transparent pointer-events-none" />
                  </motion.div>
                )}

                {content}
              </Link>
            ) : (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setHovered(item.id)}
                className={className}
              >
                {/* Sliding Liquid Glass Morphing Pill while hovering */}
                {isHovered && (
                  <motion.div
                    layoutId="liquid-glass-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-white/[0.08] to-white/[0.02] border border-white/35 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.45),0_0_16px_rgba(235,140,80,0.2)] backdrop-blur-xl"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 30,
                      mass: 0.65,
                    }}
                  >
                    {/* Liquid glass light sheen refraction */}
                    <div className="absolute inset-x-2.5 top-0.5 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-copper/20 to-transparent pointer-events-none" />
                  </motion.div>
                )}

                {content}
              </a>
            )}
          </div>
        );
      })}
    </div>
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
            {/* Interactive Mascot Companion */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 inline-flex items-center gap-3"
            >
              <Mascot
                directions="/mascots/sourav-directions.webp"
                reactions="/mascots/sourav-reactions.webp"
                size={110}
                label="Sourav"
              />
              <div className="hidden xs:flex flex-col text-left">
                <span className="font-mono text-xs text-copper-bright font-medium tracking-wide flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-signal animate-pulse" />
                  cursor tracker online
                </span>
                <span className="font-mono text-[11px] text-slate">click to boop</span>
              </div>
            </motion.div>

            {/* Headline with Hacker Scramble Effect */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-paper"
            >
              <ScrambleText text={profile.name} />
              <span className="text-copper">.</span>
            </motion.h1>

            {/* Subtitle / Role */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2.5 sm:mt-3 max-w-xl text-sm sm:text-base lg:text-lg text-paper/90 font-medium"
            >
              {profile.role}
            </motion.p>

            {/* Dynamic Focus Capsule */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2.5 sm:mt-3 flex flex-wrap items-baseline gap-1.5 font-mono text-[11px] xs:text-xs sm:text-sm text-slate min-h-[24px]"
            >
              <span className="text-signal shrink-0">$ runtime.focus():</span>
              <TypewriterFocus items={FOCUS_AREAS} />
            </motion.div>

            {/* Action Buttons: Liquid Glass Floating Command Dock */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              <HeroActionDock />
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

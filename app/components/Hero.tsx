"use client";

import { motion } from "framer-motion";
import { profile, stats } from "../data";
import { ArrowDown, GitBranch, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center px-4 sm:px-6 pt-24 pb-16"
    >
      <div className="mx-auto w-full max-w-5xl pl-8 sm:pl-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_310px] items-center">
          {/* Left Column: Intro Text & Stats */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 font-mono text-sm text-signal"
            >
              <span className="text-slate">$</span> whoami
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-mono text-4xl sm:text-6xl font-bold tracking-tight text-paper"
            >
              {profile.name}
              <span className="text-copper">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 max-w-xl text-lg sm:text-xl text-paper/90"
            >
              {profile.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 max-w-lg text-base text-slate leading-relaxed"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded bg-copper px-5 py-2.5 font-mono text-sm font-medium text-ink hover:bg-copper-bright transition-colors"
              >
                view the log
                <ArrowDown size={15} />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded border border-trace px-5 py-2.5 font-mono text-sm text-paper hover:border-copper/60 transition-colors"
              >
                <GitBranch size={15} />
                GitHub
              </a>
            </motion.div>
          </div>

          {/* Right Column: Oval-Squircle Personal Photo Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Outer Glowing Ambient Ring Halo */}
              <div className="absolute -inset-2 rounded-[52px] sm:rounded-[64px] bg-gradient-to-tr from-copper via-copper-bright/50 to-signal opacity-70 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl" />

              {/* Main Oval-Squircle Frame Container */}
              <motion.div
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative overflow-hidden rounded-[48px] sm:rounded-[58px] border-2 border-copper/80 bg-ink-raised w-[260px] h-[310px] sm:w-[280px] sm:h-[340px] shadow-[0_10px_40px_rgba(184,118,62,0.3)] backdrop-blur"
              >
                <Image
                  src={profile.avatar}
                  alt={`${profile.name} Personal Photo`}
                  fill
                  priority
                  sizes="(max-width: 768px) 260px, 280px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                />

                {/* Subtle bottom gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60" />

                {/* Floating Status Pill Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px] bg-ink/85 backdrop-blur px-3 py-1.5 rounded-full border border-copper/50 text-paper">
                  <span className="flex items-center gap-1.5 text-signal font-semibold">
                    <span className="h-2 w-2 rounded-full bg-signal animate-ping" />
                    Available for roles
                  </span>
                  <Sparkles size={13} className="text-copper-bright" />
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
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-trace pt-6 max-w-2xl"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-mono text-xs uppercase tracking-wide text-slate">
                {s.label}
              </dt>
              <dd className="mt-1 font-mono text-lg text-copper-bright">{s.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}


"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../data";
import { ArrowUpRight, Sparkles, Layers, Terminal, CheckCircle2, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function ProjectFlashcard({ project }: { project: Project }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative rounded-xl border border-trace bg-ink-raised/90 p-5 backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-copper/60 hover:shadow-[0_12px_36px_rgba(184,118,62,0.14)]"
    >
      {/* Subtle top copper/signal gradient ambient glow bar */}
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-xl bg-gradient-to-r from-copper via-copper-bright/40 to-signal opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-trace/60 pb-3">
        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="rounded bg-signal/10 px-2 py-0.5 text-xs font-semibold text-signal border border-signal/20">
            {project.version}
          </span>
          <h3 className="text-base font-bold text-paper group-hover:text-copper-bright transition-colors duration-300">
            {project.title}
          </h3>
        </div>
        <span className="font-mono text-xs text-slate">{project.tag}</span>
      </div>

      {/* Main Flashcard Body */}
      <div className="mt-4 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] items-start">
        {/* Left Side: Summary, Stack, and Links */}
        <div className="flex flex-col justify-between h-full space-y-4">
          <div>
            <p className="text-sm text-slate leading-relaxed">{project.summary}</p>

            {/* Feature Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.highlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1 rounded-md bg-ink px-2.5 py-1 font-mono text-xs text-copper-bright border border-trace"
                  >
                    <Sparkles size={11} className="text-copper" />
                    {h}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Tech Stack Pills */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate mb-1.5">
              // tech stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded border border-trace/80 bg-ink px-2 py-0.5 font-mono text-xs text-paper/80 group-hover:border-slate/40 transition-colors duration-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links & Flip Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-trace/40">
            <div className="flex items-center gap-3">
              {project.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs font-medium text-copper-bright hover:text-signal transition-colors duration-300"
                >
                  {l.label}
                  <ArrowUpRight size={13} />
                </a>
              ))}
            </div>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="inline-flex items-center gap-1.5 rounded-md border border-copper/30 bg-copper/5 px-2.5 py-1 font-mono text-xs text-copper-bright hover:bg-copper/20 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <Layers size={13} />
              {isFlipped ? "Show Preview" : "Overview Card"}
            </button>
          </div>
        </div>

        {/* Right Side: Interactive Preview / Visual Flashcard */}
        <div className="relative overflow-hidden rounded-lg border border-trace bg-ink min-h-[190px] flex flex-col justify-between group/card [perspective:1000px]">
          <AnimatePresence mode="wait">
            {!isFlipped ? (
              /* Front Card: Image or Code Terminal View */
              <motion.div
                key="front"
                initial={{ opacity: 0, rotateY: -15, scale: 0.96 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 15, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full flex flex-col justify-between min-h-[190px]"
              >
                {project.image ? (
                  <div className="relative w-full h-[190px] overflow-hidden rounded-lg">
                    <Image
                      src={project.image}
                      alt={`${project.title} Preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
                    {project.metrics && (
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center gap-2 font-mono text-[11px] bg-ink/80 backdrop-blur px-2.5 py-1 rounded border border-trace/60 text-paper">
                        <span className="text-signal">{project.metrics[0]?.label}: {project.metrics[0]?.value}</span>
                        {project.metrics[1] && (
                          <span className="text-copper-bright">{project.metrics[1]?.label}: {project.metrics[1]?.value}</span>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Fallback Code Terminal Flashcard */
                  <div className="p-4 font-mono text-xs space-y-2 h-full flex flex-col justify-between min-h-[190px]">
                    <div className="flex items-center justify-between text-slate text-[11px] border-b border-trace/40 pb-2">
                      <span className="flex items-center gap-1 text-signal">
                        <Terminal size={12} />
                        {project.title.toLowerCase()}.config.json
                      </span>
                      <span>{project.date}</span>
                    </div>
                    <div className="space-y-1.5 text-paper/90 pt-1">
                      <p className="text-copper-bright">// Key Metrics & Architecture</p>
                      {project.metrics?.map((m) => (
                        <div key={m.label} className="flex justify-between text-[11px]">
                          <span className="text-slate">{m.label}:</span>
                          <span className="text-signal">{m.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 text-[10px] text-slate/70 flex items-center justify-between border-t border-trace/40">
                      <span>Hover / Flip for details</span>
                      <ChevronRight size={12} className="text-copper group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              /* Back Card: Feature & Architecture Breakdown */
              <motion.div
                key="back"
                initial={{ opacity: 0, rotateY: 15, scale: 0.96 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: -15, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="p-4 font-mono text-xs h-full flex flex-col justify-between min-h-[190px] bg-ink-raised/95"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-copper-bright font-semibold border-b border-trace/60 pb-1.5 mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-signal" />
                    Key Architecture & Features
                  </p>
                  <ul className="space-y-2 text-paper/90 text-[11px]">
                    {project.features?.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-tight">
                        <span className="text-signal select-none">›</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t border-trace/40 text-[10px] text-slate flex justify-between items-center">
                  <span>Scope: {project.date}</span>
                  <span className="text-copper font-medium">Overview mode</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

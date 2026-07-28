"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EducationItem } from "../data";
import { Cpu, GraduationCap, Layers, Sparkles, CheckCircle2, Award, MapPin } from "lucide-react";

export default function EducationFlashcard({ item }: { item: EducationItem }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const getIcon = (iconName: string) => {
    if (iconName === "Cpu") return <Cpu className="text-copper-bright" size={16} />;
    return <GraduationCap className="text-signal" size={16} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
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
          <span className="p-1 rounded bg-ink border border-trace">
            {getIcon(item.icon)}
          </span>
          <span className="rounded bg-copper/10 px-2 py-0.5 text-xs font-semibold text-copper-bright border border-copper/20">
            {item.shortDegree}
          </span>
        </div>
        <span className="font-mono text-xs text-signal font-semibold">
          {item.detail}
        </span>
      </div>

      {/* Main Body with Flip Support */}
      <div className="mt-4 [perspective:1000px]">
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            /* Front Card View */
            <motion.div
              key="front"
              initial={{ opacity: 0, rotateY: -15, scale: 0.96 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: 15, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-between space-y-4 min-h-[160px]"
            >
              <div>
                <h3 className="font-mono text-sm font-bold text-paper group-hover:text-copper-bright transition-colors duration-300">
                  {item.degree}
                </h3>
                <p className="mt-1.5 text-xs text-slate font-sans leading-relaxed">
                  {item.school}
                </p>

                {/* Location & Status Pills */}
                <div className="mt-2.5 flex flex-wrap items-center gap-2 font-mono text-[11px] text-slate">
                  <span className="inline-flex items-center gap-1 text-slate/80">
                    <MapPin size={12} className="text-copper" />
                    {item.location}
                  </span>
                  <span className="text-trace">•</span>
                  <span className="inline-flex items-center gap-1 text-copper-bright font-medium">
                    <Award size={12} />
                    {item.status}
                  </span>
                </div>

                {/* Highlights */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.highlights.map((h) => (
                    <span
                      key={h}
                      className="inline-flex items-center gap-1 rounded bg-ink px-2.5 py-1 font-mono text-[11px] text-paper/90 border border-trace"
                    >
                      <Sparkles size={10} className="text-copper" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Flip Toggle Button */}
              <div className="pt-2 border-t border-trace/40 flex justify-end">
                <button
                  onClick={() => setIsFlipped(true)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-copper/30 bg-copper/5 px-2.5 py-1 font-mono text-xs text-copper-bright hover:bg-copper/20 transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  <Layers size={12} />
                  Coursework Breakdown
                </button>
              </div>
            </motion.div>
          ) : (
            /* Back Card View: Coursework & Focus Areas */
            <motion.div
              key="back"
              initial={{ opacity: 0, rotateY: 15, scale: 0.96 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -15, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-between space-y-3 min-h-[160px] bg-ink/60 p-3.5 rounded-lg border border-trace/60"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-copper-bright font-semibold border-b border-trace/60 pb-1 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-signal" />
                  Key Coursework & Focus Areas
                </p>
                <ul className="space-y-1.5 font-mono text-[11px] text-paper/90">
                  {item.courses.map((course, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 leading-tight">
                      <span className="text-signal select-none">›</span>
                      <span>{course}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-trace/40 flex items-center justify-between font-mono text-[10px]">
                <span className="text-slate">{item.shortDegree} Overview</span>
                <button
                  onClick={() => setIsFlipped(false)}
                  className="text-copper-bright hover:text-signal transition-colors cursor-pointer underline"
                >
                  Back to summary
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

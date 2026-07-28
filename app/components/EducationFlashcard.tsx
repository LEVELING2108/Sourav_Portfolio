"use client";

import { motion } from "framer-motion";
import { EducationItem } from "../data";
import { Cpu, GraduationCap, Award, MapPin } from "lucide-react";

export default function EducationFlashcard({ item }: { item: EducationItem }) {
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
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative rounded-xl border border-trace bg-ink-raised p-5 backdrop-blur transition-all duration-300 hover:border-copper/60 hover:shadow-[0_8px_24px_rgba(184,118,62,0.12)]"
    >
      {/* Subtle top copper/signal gradient ambient glow bar */}
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-xl bg-gradient-to-r from-copper via-copper-bright/40 to-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-trace/60 pb-3">
        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="p-1 rounded bg-ink border border-trace">
            {getIcon(item.icon)}
          </span>
          <span className="rounded bg-copper/10 px-2.5 py-0.5 text-xs font-semibold text-copper-bright border border-copper/20">
            {item.shortDegree}
          </span>
        </div>
        <span className="font-mono text-xs text-signal font-semibold">
          {item.detail}
        </span>
      </div>

      {/* Card Content */}
      <div className="mt-3.5 space-y-2.5">
        <div>
          <h3 className="font-mono text-sm font-bold text-paper group-hover:text-copper-bright transition-colors duration-300">
            {item.degree}
          </h3>
          <p className="mt-1 text-xs text-slate font-sans leading-relaxed">
            {item.school}
          </p>
        </div>

        {/* Location & Status Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-slate">
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
      </div>
    </motion.div>
  );
}



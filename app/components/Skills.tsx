"use client";

import { SectionHeading } from "./Projects";
import SkillsMarquee from "./SkillsMarquee";
import { Terminal, ShieldCheck, Zap } from "lucide-react";

export default function Skills() {
  return (
    <section id="skills" className="px-4 sm:px-6 py-24 border-t border-trace">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-trace/40 pb-6">
          <SectionHeading eyebrow="$ cat stack.json" title="Stack & Architecture" />

          {/* Authentic Architecture Metrics */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-slate">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-trace bg-ink px-2.5 py-1 text-paper">
              <Terminal size={12} className="text-copper-bright" />
              <span>19 Core Technologies</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-trace bg-ink px-2.5 py-1 text-paper">
              <Zap size={12} className="text-signal" />
              <span>3 Architectural Tiers</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-trace bg-ink px-2.5 py-1 text-paper">
              <ShieldCheck size={12} className="text-copper" />
              <span>Production Tested</span>
            </span>
          </div>
        </div>

        {/* Marquee + HUD Inspector */}
        <div className="mt-8">
          <SkillsMarquee />
        </div>
      </div>
    </section>
  );
}



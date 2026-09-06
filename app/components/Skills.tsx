"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "../data";
import { SectionHeading } from "./Projects";
import SkillsRadar, { SkillCategory } from "./SkillsRadar";
import SkillTile from "./SkillTile";
import {
  Code2,
  Layers,
  Server,
  Database,
  Network,
  Cloud,
  BrainCircuit,
  Filter,
  Cpu,
} from "lucide-react";
import SystemBlueprint from "./SystemBlueprint";

const categories: SkillCategory[] = [
  {
    key: "languages",
    label: "Languages",
    icon: "Code2",
    value: 92,
    badge: "Daily Stack",
    context: "Core runtime languages used daily across projects",
    items: skills.languages,
  },
  {
    key: "frontend",
    label: "Frontend",
    icon: "Layers",
    value: 88,
    badge: "Production UI",
    context: "Shipped in ROADSoS (PWA), Ledgerline & RailTrack Pro",
    items: skills.frontend,
  },
  {
    key: "backend",
    label: "Backend",
    icon: "Server",
    value: 90,
    badge: "30+ REST APIs",
    context: "High-throughput APIs in Flask, FastAPI & Express",
    items: skills.backend,
  },
  {
    key: "database",
    label: "Database & Cache",
    icon: "Database",
    value: 86,
    badge: "Relational & Redis",
    context: "PostgreSQL models & Redis concurrency locks",
    items: skills.database,
  },
  {
    key: "systemDesign",
    label: "System Architecture",
    icon: "Network",
    value: 88,
    badge: "Distributed Systems",
    context: "JWT rate limiting, caching & mutex concurrency",
    items: skills.systemDesign,
  },
  {
    key: "devops",
    label: "DevOps & Cloud",
    icon: "Cloud",
    value: 85,
    badge: "CI/CD & Docker",
    context: "Dockerized containers, AWS/GCP, GitHub Actions",
    items: skills.devops,
  },
  {
    key: "aiml",
    label: "Applied AI / ML",
    icon: "BrainCircuit",
    value: 87,
    badge: "<25ms Inference",
    context: "Real-time fraud scoring, RAG pipelines & MLOps",
    items: skills.aiml,
  },
];

function getCategoryIcon(key: string) {
  const iconClass = "text-copper-bright";
  switch (key) {
    case "languages":
      return <Code2 className={iconClass} size={15} />;
    case "frontend":
      return <Layers className={iconClass} size={15} />;
    case "backend":
      return <Server className={iconClass} size={15} />;
    case "database":
      return <Database className={iconClass} size={15} />;
    case "systemDesign":
      return <Network className={iconClass} size={15} />;
    case "devops":
      return <Cloud className={iconClass} size={15} />;
    case "aiml":
      return <BrainCircuit className={iconClass} size={15} />;
    default:
      return <Code2 className={iconClass} size={15} />;
  }
}

export default function Skills() {
  const [viewMode, setViewMode] = useState<"blueprint" | "mesh">("blueprint");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = activeCategory
    ? categories.filter((c) => c.key === activeCategory)
    : categories;

  return (
    <section id="skills" className="px-4 sm:px-6 py-24 border-t border-trace">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="$ cat stack.json" title="Stack & Architecture" />

          {/* View Mode Toggle: System Blueprint vs Domain Mesh */}
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl border border-trace bg-ink p-1 font-mono text-xs">
              <button
                onClick={() => setViewMode("blueprint")}
                title="Interactive System Architecture Flow"
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
                  viewMode === "blueprint"
                    ? "bg-copper/20 text-copper-bright font-semibold border border-copper/40"
                    : "text-slate hover:text-paper"
                }`}
              >
                <Cpu size={13} />
                <span>System Blueprint</span>
              </button>
              <button
                onClick={() => setViewMode("mesh")}
                title="7-Axis Domain Radar Mesh"
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
                  viewMode === "mesh"
                    ? "bg-copper/20 text-copper-bright font-semibold border border-copper/40"
                    : "text-slate hover:text-paper"
                }`}
              >
                <Network size={13} />
                <span>Domain Mesh</span>
              </button>
            </div>

            {viewMode === "mesh" && activeCategory && (
              <button
                onClick={() => setActiveCategory(null)}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-copper-bright hover:text-paper transition-colors bg-ink-raised border border-trace px-3 py-1.5 rounded-xl cursor-pointer"
              >
                <Filter size={13} />
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* View Mode Content */}
        {viewMode === "blueprint" ? (
          <div className="mt-10">
            <SystemBlueprint />
          </div>
        ) : (
          <div className="mt-10">
            {/* Top Grid: Radar Mesh + Category Selector */}
            <div className="grid gap-8 lg:grid-cols-[360px_1fr] items-center">
              <SkillsRadar
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />

          {/* Quick Filter Pill Buttons */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate">
              {"// Filter domain"}
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-all cursor-pointer ${
                  activeCategory === null
                    ? "border-copper-bright bg-copper/10 text-paper font-medium"
                    : "border-trace bg-ink-raised text-slate hover:border-slate/40 hover:text-paper"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
                  className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 font-mono text-xs transition-all cursor-pointer ${
                    activeCategory === cat.key
                      ? "border-copper-bright bg-copper/10 text-copper-bright font-medium"
                      : "border-trace bg-ink-raised text-slate hover:border-slate/40 hover:text-paper"
                  }`}
                >
                  {getCategoryIcon(cat.key)}
                  {cat.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate leading-relaxed font-mono pt-2 border-t border-trace/40">
              Hands-on engineering across full-stack systems, distributed backends, databases, DevOps pipelines, and applied AI/ML.
            </p>
          </div>
        </div>

        {/* Minimal Category Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat, idx) => (
              <motion.div
                key={cat.key}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                className={`group relative rounded-xl border p-5 bg-ink-raised transition-all duration-300 ${
                  activeCategory === cat.key
                    ? "border-copper-bright shadow-[0_4px_24px_rgba(184,118,62,0.15)]"
                    : "border-trace hover:border-copper/50"
                }`}
              >
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-trace pb-2.5 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-ink border border-trace/60">
                      {getCategoryIcon(cat.key)}
                    </span>
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-paper">
                      {cat.label}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-copper-bright font-semibold rounded bg-copper/10 px-2 py-0.5 border border-copper/30">
                    {cat.badge}
                  </span>
                </div>

                {/* Context / Production Exposure Subtitle */}
                {cat.context && (
                  <p className="text-[11px] text-slate font-sans mb-3 leading-snug">
                    {cat.context}
                  </p>
                )}

                {/* Skill Chips Grid */}
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill) => (
                    <SkillTile key={skill} skill={skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    )}
  </div>
</section>
);
}



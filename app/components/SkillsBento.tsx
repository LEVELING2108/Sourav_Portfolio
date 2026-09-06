"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Zap,
  Network,
  Server,
  Layers,
  Cloud,
  Database,
  Terminal,
  Activity,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Sparkles,
  GitBranch,
} from "lucide-react";

export default function SkillsBento() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Top Context Subtitle */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate border-b border-trace/60 pb-3">
        <span className="flex items-center gap-2 text-paper">
          <span className="p-1 rounded bg-ink border border-trace text-copper-bright">
            <Layers size={13} />
          </span>
          <span className="font-semibold">Interactive Modular Bento Ecosystem</span>
        </span>
        <span className="text-[11px] text-slate/80">
          Hover over each module to inspect real-world production telemetry
        </span>
      </div>

      {/* Modern Responsive Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* ================= CARD 1: AI/ML & Real-Time Inference (Span 2 Cols) ================= */}
        <motion.div
          onMouseEnter={() => setHoveredCard("aiml")}
          onMouseLeave={() => setHoveredCard(null)}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-2 relative rounded-3xl border border-trace bg-ink-raised p-6 sm:p-7 shadow-sm overflow-hidden group hover:border-copper/70 transition-all duration-300"
        >
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-copper/15 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-2xl bg-ink border border-trace text-copper-bright group-hover:scale-105 transition-transform">
                  <BrainCircuit size={22} />
                </span>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate block font-semibold">
                    Core Specialization
                  </span>
                  <h3 className="font-mono text-lg sm:text-xl font-bold text-paper">
                    Applied AI/ML &amp; Real-Time Inference
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1.5 rounded-full bg-ink border border-signal/40 px-3 py-1 font-mono text-xs text-signal font-semibold">
                <Zap size={13} className="text-signal animate-pulse" />
                <span>&lt; 25ms Latency</span>
              </div>
            </div>

            {/* Live Telemetry Visualizer Box */}
            <div className="rounded-2xl border border-trace/70 bg-ink/80 p-4 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between text-slate text-[11px] border-b border-trace/50 pb-2">
                <span className="flex items-center gap-1.5 text-copper-bright">
                  <Activity size={12} />
                  <span>fraudshield.inference.telemetry</span>
                </span>
                <span className="text-signal font-medium">99.8% Precision</span>
              </div>

              {/* Simulated Latency Sparkline */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate">Real-time ML Scoring Latency:</span>
                  <span className="text-copper-bright font-bold">18.4ms (p99)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-ink border border-trace/60 overflow-hidden">
                  <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-signal via-copper to-copper-bright animate-pulse" />
                </div>
              </div>

              <p className="text-[11px] text-slate font-sans leading-relaxed pt-1">
                Engineered streaming anomaly detection pipelines, LLM structured JSON extraction, and RAG architectures with drift tracking.
              </p>
            </div>

            {/* Tech Badges */}
            <div className="space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate">
                // Frameworks &amp; Tooling
              </p>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {["PyTorch", "Scikit-learn", "Hugging Face", "RAG Pipelines", "LangChain", "LangGraph", "MLflow"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-trace bg-ink px-3 py-1 text-paper/90 group-hover:border-copper/40 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= CARD 2: Distributed Systems & Concurrency ================= */}
        <motion.div
          onMouseEnter={() => setHoveredCard("systems")}
          onMouseLeave={() => setHoveredCard(null)}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-3xl border border-trace bg-ink-raised p-6 shadow-sm overflow-hidden group hover:border-copper/70 transition-all duration-300 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-ink border border-trace text-copper-bright">
                  <Network size={18} />
                </span>
                <h3 className="font-mono text-base font-bold text-paper">
                  Distributed Systems
                </h3>
              </div>
              <span className="font-mono text-[10px] rounded bg-copper/10 px-2 py-0.5 text-copper-bright border border-copper/30 font-semibold">
                Concurrency
              </span>
            </div>

            <p className="text-xs text-slate font-sans leading-relaxed">
              Eliminated duplicate event dispatching under high concurrency emergency surges by hunting down and resolving a Redis race condition.
            </p>

            {/* Simulated Mutex Lock Diagram */}
            <div className="rounded-xl border border-trace/70 bg-ink/80 p-3 font-mono text-[11px] space-y-2">
              <div className="flex items-center justify-between text-slate">
                <span className="flex items-center gap-1 text-signal">
                  <Lock size={12} />
                  <span>Redis Mutex Lock</span>
                </span>
                <span className="text-[10px] text-paper">Atomic SETNX</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate bg-ink px-2 py-1 rounded border border-trace/40">
                <span>Emergency Surge Ingestion</span>
                <span className="text-copper-bright font-bold">➔ Locked</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-trace/40">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate">
              // Protocols &amp; Primitives
            </p>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {["Redis", "Distributed Queues", "JWT Auth", "Rate Limiting", "WebSockets"].map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-trace bg-ink px-2.5 py-1 text-paper/90 group-hover:border-copper/40 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ================= CARD 3: High-Throughput Backend & APIs ================= */}
        <motion.div
          onMouseEnter={() => setHoveredCard("backend")}
          onMouseLeave={() => setHoveredCard(null)}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-3xl border border-trace bg-ink-raised p-6 shadow-sm overflow-hidden group hover:border-copper/70 transition-all duration-300 flex flex-col justify-between space-y-5"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-ink border border-trace text-copper-bright">
                  <Server size={18} />
                </span>
                <h3 className="font-mono text-base font-bold text-paper">
                  Backend &amp; REST APIs
                </h3>
              </div>
              <span className="font-mono text-[10px] rounded bg-copper/10 px-2 py-0.5 text-copper-bright border border-copper/30 font-semibold">
                30+ Endpoints
              </span>
            </div>

            {/* Simulated Live Route Log */}
            <div className="rounded-xl border border-trace/70 bg-ink/80 p-3 font-mono text-[10px] space-y-1.5">
              <div className="flex items-center justify-between text-slate pb-1 border-b border-trace/40">
                <span>RailTrack Pro REST Gateway</span>
                <span className="text-signal">Flask 3.0</span>
              </div>
              <div className="flex justify-between text-paper/90">
                <span className="text-signal font-semibold">POST /api/v1/qr/inspect</span>
                <span className="text-slate">200 OK (16ms)</span>
              </div>
              <div className="flex justify-between text-paper/90">
                <span className="text-copper-bright font-semibold">GET /api/v1/risk/score</span>
                <span className="text-slate">200 OK (11ms)</span>
              </div>
            </div>

            <p className="text-xs text-slate font-sans leading-relaxed">
              Designed 30+ secure REST endpoints with role-based JWT access and automated quality audits for Indian Railways track fittings.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-trace/40">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate">
              // Backend Engines
            </p>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {["FastAPI", "Flask", "Node.js", "Express.js", "Python", "Java", "C++"].map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-trace bg-ink px-2.5 py-1 text-paper/90 group-hover:border-copper/40 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ================= CARD 4: Modern Frontend & Edge UI ================= */}
        <motion.div
          onMouseEnter={() => setHoveredCard("frontend")}
          onMouseLeave={() => setHoveredCard(null)}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-3xl border border-trace bg-ink-raised p-6 shadow-sm overflow-hidden group hover:border-copper/70 transition-all duration-300 flex flex-col justify-between space-y-5"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-ink border border-trace text-copper-bright">
                  <Layers size={18} />
                </span>
                <h3 className="font-mono text-base font-bold text-paper">
                  Frontend &amp; Edge UI
                </h3>
              </div>
              <span className="font-mono text-[10px] rounded bg-copper/10 px-2 py-0.5 text-copper-bright border border-copper/30 font-semibold">
                React 19
              </span>
            </div>

            <div className="rounded-xl border border-trace/70 bg-ink/80 p-3 font-mono text-[10px] space-y-1.5">
              <div className="flex items-center justify-between text-slate pb-1 border-b border-trace/40">
                <span>Next.js 16 App Router</span>
                <span className="text-signal">Turbopack</span>
              </div>
              <div className="flex justify-between text-paper/90">
                <span>Rendering Engine</span>
                <span className="text-copper-bright">RSC + Client Hydration</span>
              </div>
              <div className="flex justify-between text-paper/90">
                <span>PWA Service Worker</span>
                <span className="text-signal">Active Cache</span>
              </div>
            </div>

            <p className="text-xs text-slate font-sans leading-relaxed">
              High-performance web apps built with Next.js 16, React 19, Tailwind CSS v4, and offline-first PWA caching for SIH 2025.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-trace/40">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate">
              // Client Stack
            </p>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "HTML5", "CSS3"].map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-trace bg-ink px-2.5 py-1 text-paper/90 group-hover:border-copper/40 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ================= CARD 5: Database & Cloud Infrastructure ================= */}
        <motion.div
          onMouseEnter={() => setHoveredCard("infra")}
          onMouseLeave={() => setHoveredCard(null)}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-3xl border border-trace bg-ink-raised p-6 shadow-sm overflow-hidden group hover:border-copper/70 transition-all duration-300 flex flex-col justify-between space-y-5"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-ink border border-trace text-copper-bright">
                  <Cloud size={18} />
                </span>
                <h3 className="font-mono text-base font-bold text-paper">
                  Database &amp; Cloud Infra
                </h3>
              </div>
              <span className="font-mono text-[10px] rounded bg-copper/10 px-2 py-0.5 text-copper-bright border border-copper/30 font-semibold">
                CI/CD &amp; Docker
              </span>
            </div>

            <div className="rounded-xl border border-trace/70 bg-ink/80 p-3 font-mono text-[10px] space-y-1.5">
              <div className="flex items-center justify-between text-slate pb-1 border-b border-trace/40">
                <span>Infrastructure &amp; Storage</span>
                <span className="text-signal">Automated</span>
              </div>
              <div className="flex justify-between text-paper/90">
                <span>Relational Storage</span>
                <span className="text-copper-bright">PostgreSQL / MySQL</span>
              </div>
              <div className="flex justify-between text-paper/90">
                <span>Containerization</span>
                <span className="text-signal">Multi-stage Docker</span>
              </div>
            </div>

            <p className="text-xs text-slate font-sans leading-relaxed">
              Automated testing and multi-stage container deployment pipelines with ~75%+ test coverage across GitHub Actions, AWS, and GCP.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-trace/40">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate">
              // Persistence &amp; DevOps
            </p>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {["Docker", "PostgreSQL", "GitHub Actions", "AWS (S3, EC2)", "MongoDB", "Vercel"].map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-trace bg-ink px-2.5 py-1 text-paper/90 group-hover:border-copper/40 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

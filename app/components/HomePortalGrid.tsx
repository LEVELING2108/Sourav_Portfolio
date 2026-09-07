"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Layers,
  Cpu,
  GraduationCap,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Activity,
  Terminal,
} from "lucide-react";
import {
  NextjsIcon,
  PythonIcon,
  PytorchIcon,
  DockerIcon,
  RedisIcon,
} from "./BrandIcons";

const PORTALS = [
  {
    href: "/projects",
    sysId: "SYS.01 // PRODUCTION LOG",
    title: "Systems & Build Log",
    description:
      "Explore 7 shipped engineering systems including SIH '25 Indian Railways QR tracking, <25ms ML fraud scoring, and live PWAs.",
    tag: "7 Systems · SIH '25",
    accent: "border-copper/40 hover:border-copper-bright",
    badgeColor: "bg-copper/15 text-copper-bright border-copper/30",
    icon: Layers,
    action: "Launch Gallery",
    preview: (
      <div className="flex items-center gap-2 pt-2">
        <span className="flex h-2 w-2 rounded-full bg-signal animate-pulse" />
        <span className="font-mono text-[11px] text-signal font-medium">
          ROADSoS (Live PWA) · RailTrack Pro · FraudShield
        </span>
      </div>
    ),
  },
  {
    href: "/stack",
    sysId: "SYS.02 // ARCHITECTURE",
    title: "Stack & Capabilities",
    description:
      "Interactive 20-technology system architecture matrix with verified project proofs, HUD inspector, and continuous marquee.",
    tag: "20 Brand SVGs · HUD",
    accent: "border-signal/40 hover:border-signal",
    badgeColor: "bg-signal/10 text-signal border-signal/30",
    icon: Cpu,
    action: "Inspect Stack",
    preview: (
      <div className="flex items-center gap-2 pt-2">
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-ink border border-trace">
          <NextjsIcon size={14} />
          <PythonIcon size={14} />
          <PytorchIcon size={14} />
          <DockerIcon size={14} />
          <RedisIcon size={14} />
        </div>
        <span className="font-mono text-[11px] text-slate">Full-Stack &amp; AI</span>
      </div>
    ),
  },
  {
    href: "/about",
    sysId: "SYS.03 // ACADEMIC TRACK",
    title: "Background & Dual-Track",
    description:
      "The engineering fusion: B.Tech in Electronics & Communication (BVDU Pune, CGPA 9.1) parallel with Data Science at IIT Madras.",
    tag: "BVDU ECE × IIT Madras",
    accent: "border-copper/40 hover:border-copper-bright",
    badgeColor: "bg-copper/15 text-copper-bright border-copper/30",
    icon: GraduationCap,
    action: "Read Background",
    preview: (
      <div className="flex items-center gap-2 pt-2 font-mono text-[11px] text-slate">
        <span className="text-copper-bright font-semibold">Dual Degree</span>
        <span>•</span>
        <span>SIH 2025 R2 Cleared</span>
      </div>
    ),
  },
  {
    href: "/contact",
    sysId: "SYS.04 // DIRECT CHANNEL",
    title: "Initialize Channel",
    description:
      "Direct communication hub for full-time full-stack and AI/ML opportunities, high-concurrency systems, and collaboration.",
    tag: "Open to Roles · Pune / Remote",
    accent: "border-signal/40 hover:border-signal",
    badgeColor: "bg-signal/10 text-signal border-signal/30",
    icon: Mail,
    action: "Open Channel",
    preview: (
      <div className="flex items-center gap-2 pt-2 font-mono text-[11px] text-slate">
        <Activity size={12} className="text-signal animate-pulse" />
        <span>Response Time: &lt;24 hrs</span>
      </div>
    ),
  },
];

export default function HomePortalGrid() {
  return (
    <section className="px-4 sm:px-6 py-20 border-t border-trace">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 space-y-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs sm:text-sm text-signal">
              $ ls -la ~/modules
            </p>
            <h2 className="mt-1.5 font-mono text-2xl sm:text-3xl font-bold text-paper">
              System Directory
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate font-sans max-w-xl">
              Select a dedicated system module below to inspect full case studies, architecture flowcharts, and academic records.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate">
            <span className="p-1 rounded bg-ink border border-trace text-copper-bright">
              <Terminal size={12} />
            </span>
            <span>4 Independent Modules</span>
          </div>
        </div>

        {/* 2x2 Responsive Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {PORTALS.map((portal) => {
            const IconComp = portal.icon;
            return (
              <Link
                key={portal.href}
                href={portal.href}
                className={`group relative rounded-3xl border ${portal.accent} bg-gradient-to-b from-ink-raised to-ink p-6 sm:p-7 shadow-lg hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer select-none`}
              >
                {/* Top specular highlight edge */}
                <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <div className="space-y-4">
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-slate tracking-wider">
                      {portal.sysId}
                    </span>
                    <span
                      className={`font-mono text-[10px] px-2.5 py-0.5 rounded-md border font-semibold ${portal.badgeColor}`}
                    >
                      {portal.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 rounded-xl bg-ink border border-trace group-hover:border-copper/60 transition-colors">
                        <IconComp size={18} className="text-copper-bright" />
                      </span>
                      <h3 className="font-mono text-xl sm:text-2xl font-bold text-paper group-hover:text-copper-bright transition-colors">
                        {portal.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 text-xs sm:text-sm text-slate leading-relaxed font-sans">
                      {portal.description}
                    </p>
                  </div>

                  {/* Preview Snippet */}
                  {portal.preview}
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-6 pt-4 border-t border-trace/60 flex items-center justify-between font-mono text-xs text-slate group-hover:text-paper transition-colors">
                  <span className="font-medium text-copper-bright">
                    {portal.action}
                  </span>
                  <span className="p-1.5 rounded-lg border border-trace bg-ink group-hover:border-copper/60 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-all">
                    <ArrowUpRight size={14} className="text-copper-bright" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

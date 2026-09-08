"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Cpu,
  GraduationCap,
  Mail,
  ArrowUpRight,
  Sparkles,
  Activity,
} from "lucide-react";
import {
  NextjsIcon,
  PythonIcon,
  PytorchIcon,
  DockerIcon,
  RedisIcon,
} from "@/components/shared/BrandIcons";

const MODULES = [
  {
    id: "systems",
    sysId: "SYS.01",
    label: "PRODUCTION LOG",
    title: "Systems & Build Log",
    badge: "7 Shipped",
    accent: "copper",
    href: "/projects",
    cta: "Launch Systems Gallery",
    icon: Layers,
    description: "Production-ready distributed systems and real-time AI engines.",
    highlights: [
      { text: "ROADSoS (Live PWA)", dot: true },
      { text: "RailTrack Pro (QR Audit)", spark: true },
      { text: "FraudShield (<25ms)" },
    ],
  },
  {
    id: "stack",
    sysId: "SYS.02",
    label: "STACK & ENGINE",
    title: "Engineering Stack",
    badge: "20 Techs",
    accent: "signal",
    href: "/stack",
    cta: "Inspect Architecture HUD",
    icon: Cpu,
    description: "Battle-tested tools across AI/ML pipelines, backend engines, and cloud.",
    icons: [PytorchIcon, NextjsIcon, PythonIcon, DockerIcon, RedisIcon],
  },
  {
    id: "about",
    sysId: "SYS.03",
    label: "DUAL-TRACK",
    title: "Academic Track",
    badge: "Dual Degree",
    accent: "copper",
    href: "/about",
    cta: "Read Dual-Track Bio",
    icon: GraduationCap,
    description: "Hardware foundations fused with rigorous mathematical data science.",
    academic: [
      { school: "BVDU Pune", score: "9.1 CGPA", field: "ECE" },
      { school: "IIT Madras", score: "Active", field: "Data Science & AI" },
    ],
  },
  {
    id: "contact",
    sysId: "SYS.04",
    label: "DIRECT UPLINK",
    title: "Initialize Channel",
    badge: "Available",
    accent: "signal",
    href: "/contact",
    cta: "Open Direct Channel",
    icon: Mail,
    description: "Currently open to AI/ML and full-stack engineering opportunities.",
    telemetry: [
      { label: "Location", val: "Pune / Remote" },
      { label: "Turnaround", val: "< 24 Hours" },
      { label: "Status", val: "Open for Roles", live: true },
    ],
  },
];

export default function HomePortalGrid() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16 border-t border-trace">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-signal">$ inspect ~/runtime_modules</p>
            <h2 className="mt-1 font-mono text-xl sm:text-2xl font-bold text-paper">
              Kinetic Stage
            </h2>
          </div>
          <span className="font-mono text-xs text-slate hidden sm:inline">
            // Hover or tap modules to expand focus
          </span>
        </div>

        {/* Desktop / Tablet: Kinetic Accordion Deck */}
        <div className="hidden md:flex gap-3 h-[280px] w-full">
          {MODULES.map((mod, idx) => {
            const isActive = activeIndex === idx;
            const Icon = mod.icon;
            const isCopper = mod.accent === "copper";

            return (
              <div
                key={mod.id}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`relative rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between overflow-hidden cursor-pointer select-none ${
                  isActive
                    ? isCopper
                      ? "flex-[3.2] border-copper/60 bg-gradient-to-br from-ink-raised/95 to-ink shadow-[0_12px_36px_rgba(184,118,62,0.16)]"
                      : "flex-[3.2] border-signal/60 bg-gradient-to-br from-ink-raised/95 to-ink shadow-[0_12px_36px_rgba(79,209,197,0.14)]"
                    : "flex-1 border-trace/60 bg-ink-raised/40 hover:bg-ink-raised/70 hover:border-trace"
                }`}
              >
                {/* Ambient top light */}
                {isActive && (
                  <div
                    className={`absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent ${
                      isCopper ? "via-copper" : "via-signal"
                    } to-transparent pointer-events-none`}
                  />
                )}

                {/* Collapsed State */}
                {!isActive && (
                  <div className="h-full flex flex-col items-center justify-between py-6 px-3">
                    <div className="flex flex-col items-center gap-3">
                      <span className="font-mono text-[11px] text-slate/70 uppercase tracking-wider">
                        {mod.sysId}
                      </span>
                      <span
                        className={`p-2 rounded-xl bg-ink border ${
                          isCopper
                            ? "border-copper/30 text-copper-bright"
                            : "border-signal/30 text-signal"
                        }`}
                      >
                        <Icon size={16} />
                      </span>
                    </div>

                    <div className="[writing-mode:vertical-lr] rotate-180 font-mono text-xs text-slate uppercase tracking-widest font-medium">
                      {mod.title}
                    </div>

                    <span className="font-mono text-[10px] text-slate/60">
                      {mod.badge}
                    </span>
                  </div>
                )}

                {/* Expanded State */}
                {isActive && (
                  <div className="h-full flex flex-col justify-between p-6">
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-slate/80 uppercase tracking-widest">
                          {mod.sysId} // {mod.label}
                        </span>
                        <span
                          className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold ${
                            isCopper
                              ? "border-copper/30 bg-copper/10 text-copper-bright"
                              : "border-signal/30 bg-signal/10 text-signal"
                          }`}
                        >
                          {mod.badge}
                        </span>
                      </div>

                      {/* Title & Icon */}
                      <div className="mt-4 flex items-center gap-3">
                        <span
                          className={`p-2.5 rounded-xl bg-ink border ${
                            isCopper
                              ? "border-copper/40 text-copper-bright"
                              : "border-signal/40 text-signal"
                          }`}
                        >
                          <Icon size={20} />
                        </span>
                        <div>
                          <h3 className="font-mono text-2xl font-bold text-paper">
                            {mod.title}
                          </h3>
                          <p className="font-sans text-xs text-slate mt-0.5 line-clamp-1">
                            {mod.description}
                          </p>
                        </div>
                      </div>

                      {/* Content Preview Slot */}
                      <div className="mt-5">
                        {/* Systems Highlights */}
                        {mod.highlights && (
                          <div className="flex flex-wrap gap-2 font-mono text-xs">
                            {mod.highlights.map((h, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-trace bg-ink px-2.5 py-1 text-slate"
                              >
                                {h.dot && (
                                  <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                                )}
                                {h.spark && (
                                  <Sparkles size={11} className="text-copper-bright" />
                                )}
                                <span>{h.text}</span>
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Stack Icons */}
                        {mod.icons && (
                          <div className="flex items-center gap-2 p-2 rounded-xl bg-ink/90 border border-trace w-fit">
                            {mod.icons.map((Brand, i) => (
                              <Brand key={i} size={18} />
                            ))}
                            <span className="font-mono text-[10px] text-slate ml-2">
                              + 15 specialized tools
                            </span>
                          </div>
                        )}

                        {/* Academic Track */}
                        {mod.academic && (
                          <div className="grid grid-cols-2 gap-2 font-mono text-xs max-w-md">
                            {mod.academic.map((ac, i) => (
                              <div
                                key={i}
                                className="rounded-lg bg-ink px-3 py-1.5 border border-trace/70"
                              >
                                <div className="text-[10px] text-slate">{ac.school}</div>
                                <div
                                  className={`font-bold text-xs ${
                                    i === 0 ? "text-copper-bright" : "text-signal"
                                  }`}
                                >
                                  {ac.field} · {ac.score}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Telemetry / Uplink */}
                        {mod.telemetry && (
                          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate">
                            {mod.telemetry.map((t, i) => (
                              <span key={i} className="inline-flex items-center gap-1.5">
                                {t.live && (
                                  <Activity size={12} className="text-signal animate-pulse" />
                                )}
                                <span className="text-paper font-medium">{t.val}</span>
                                {i < mod.telemetry.length - 1 && <span>•</span>}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom CTA Row */}
                    <div className="pt-3 border-t border-trace/40 flex items-center justify-between">
                      <Link
                        href={mod.href}
                        className={`inline-flex items-center gap-2 font-mono text-xs font-semibold ${
                          isCopper
                            ? "text-copper-bright hover:underline"
                            : "text-signal hover:underline"
                        }`}
                      >
                        <span>{mod.cta}</span>
                        <ArrowUpRight size={13} />
                      </Link>
                      <span className="font-mono text-[10px] text-slate/60">
                        ESC / TAB to switch
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: Interactive Stack List */}
        <div className="md:hidden space-y-3">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            const isCopper = mod.accent === "copper";

            return (
              <Link
                key={mod.id}
                href={mod.href}
                className="block rounded-xl border border-trace bg-ink-raised/70 p-4 transition-colors hover:border-copper/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`p-2 rounded-lg bg-ink border ${
                        isCopper
                          ? "border-copper/30 text-copper-bright"
                          : "border-signal/30 text-signal"
                      }`}
                    >
                      <Icon size={16} />
                    </span>
                    <div>
                      <span className="font-mono text-[10px] text-slate uppercase tracking-wider block">
                        {mod.sysId}
                      </span>
                      <h3 className="font-mono text-base font-bold text-paper">
                        {mod.title}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`p-1.5 rounded-md border border-trace bg-ink ${
                      isCopper ? "text-copper-bright" : "text-signal"
                    }`}
                  >
                    <ArrowUpRight size={14} />
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

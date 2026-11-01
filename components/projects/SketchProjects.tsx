"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects, type ProjectCategory } from "@/app/data";
import { PAGE_INTRO, riseIn } from "@/lib/motion";
import { MASCOT_LINES, PROJECT_FLOWS, type Mood } from "@/lib/sketch-data";
import { Mascot, MascotProvider, useMascot } from "@/components/sketch/Mascot";
import { SketchFlow } from "@/components/sketch/features";
import { Scribble, SketchButton, SketchCard, WriteIn } from "@/components/sketch/primitives";
import { useSound } from "@/components/sketch/SoundProvider";
import { useTheme } from "@/components/sketch/ThemeProvider";
import ProjectsHoloDeck from "@/components/projects/ProjectsHoloDeck";
import { ArrowLeft, Layers } from "lucide-react";

type FilterId = "all" | ProjectCategory;

const FILTERS: { id: FilterId; label: string; mood: Mood; line: string }[] = [
  { id: "all", label: "everything", mood: "lookDownLeft", line: MASCOT_LINES.projects.all },
  { id: "ai", label: "AI / ML", mood: "sparkle", line: MASCOT_LINES.projects.ai },
  { id: "web", label: "full-stack", mood: "happy", line: MASCOT_LINES.projects.web },
  { id: "oss", label: "open source", mood: "stars", line: MASCOT_LINES.projects.oss },
];

const TILTS = [-1, 0.8, -0.5, 1.1];

function ProjectsContent() {
  const [filter, setFilter] = useState<FilterId>("all");
  const { set } = useMascot();
  const { play } = useSound();

  const shown = filter === "all" ? projects : projects.filter((p) => p.cats.includes(filter));

  const pickFilter = (f: typeof FILTERS[number]) => {
    play("thock");
    setFilter(f.id);
    set(f.mood, f.line);
  };

  return (
    <main>
      <section data-tick className="mx-auto flex max-w-[1240px] flex-wrap items-end justify-between gap-8 px-6 pb-6 pt-16">
        <div className="min-w-0 flex-[999_1_560px]">
          <motion.div variants={riseIn} initial="hidden" animate="show" custom={PAGE_INTRO.kicker}>
            <Link href="/" className="inline-block py-2 font-mono text-sm text-muted no-underline">
              ← back home
            </Link>
            <p className="m-0 mt-4 font-hand text-[30px] text-note">everything I&apos;ve shipped —</p>
          </motion.div>
          <WriteIn delay={PAGE_INTRO.title} className="m-0 text-[clamp(60px,8vw,112px)] font-extrabold leading-none tracking-[-0.03em]">
            Projects
          </WriteIn>
          <Scribble width={300} height={24} delay={PAGE_INTRO.underline} className="mt-1.5 block max-w-full" />
          <motion.p variants={riseIn} initial="hidden" animate="show" custom={PAGE_INTRO.lead} className="mt-6 max-w-[720px] text-[22px] leading-relaxed">
            <span className="marker">Eight shipped systems</span> — hover a card to see it in colour and watch its architecture sketch itself.
          </motion.p>
          <motion.div
            variants={riseIn}
            initial="hidden"
            animate="show"
            custom={PAGE_INTRO.lead + 0.1}
            role="group"
            aria-label="Filter projects"
            className="mt-8 flex flex-wrap gap-3.5"
          >
            {FILTERS.map((f) => {
              const fid = f.id;
              const count = fid === "all" ? projects.length : projects.filter((p) => p.cats.includes(fid)).length;
              const active = filter === fid;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => pickFilter(f)}
                  className={`sk-box min-h-11 cursor-pointer px-[18px] text-base font-bold transition-transform duration-300 hover:-translate-y-0.5 hover:-rotate-1 ${
                    active ? "bg-ink text-paper" : "bg-card text-ink"
                  }`}
                >
                  {f.label}{" "}
                  <span className="font-mono text-xs font-normal opacity-75">{count}</span>
                </button>
              );
            })}
          </motion.div>
        </div>
        <div className="mr-7">
          <Mascot size={140} delay={PAGE_INTRO.mascot} />
        </div>
      </section>

      <section aria-label="Project list" data-tick className="mx-auto max-w-[1240px] px-6 pb-16 pt-10">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,520px),1fr))] gap-x-12 gap-y-14">
          {shown.map((p, i) => {
            const isLaya = p.slug === "laya-system-1-integrations";
            return (
              <SketchCard
                key={p.slug}
                tilt={TILTS[i % 4]}
                className="relative flex flex-col gap-3.5 px-[22px] pb-[26px] pt-[22px]"
              >
                {isLaya ? (
                  <div className="sk-box-b flex h-[230px] flex-col items-center justify-center gap-1.5 bg-ink text-paper">
                    <span className="text-[64px] font-extrabold tracking-[-0.02em]">~33ms</span>
                    <span className="font-hand text-[28px] text-accent">
                      per agent decision, down from ~1,500ms
                    </span>
                  </div>
                ) : (
                  <div className="sk-box-b h-[230px] overflow-hidden bg-paper">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={`Screenshot of ${p.title}`}
                      className="block h-full w-full object-cover object-top grayscale contrast-[1.15] transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-100"
                    />
                  </div>
                )}

                <span
                  className="sk-box absolute right-1 top-1 rotate-[8deg] px-3 py-1.5 font-mono text-xs text-[#1F1D1A] transition-transform duration-300 group-hover:scale-[1.08] group-hover:-rotate-[4deg]"
                  style={{ background: p.stickerBg }}
                >
                  {p.status}
                </span>

                <div className="mt-1 flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[13px] text-muted">{p.version}</span>
                  <span className="text-right font-mono text-[13px] text-muted">{p.tag}</span>
                </div>

                <h2 className="m-0 text-[32px] font-extrabold leading-[1.1]">{p.title}</h2>
                <p className="m-0 text-base leading-relaxed text-body">{p.summary}</p>

                <SketchFlow steps={PROJECT_FLOWS[p.title] ?? p.architecture?.flow ?? []} />

                <p className="m-0 font-hand text-2xl text-note">↳ {p.win}</p>

                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-1.5 flex flex-wrap gap-3.5">
                  <SketchButton href={`/projects/${p.slug}`} shape="b" className="min-h-11 px-4 text-[15px]">
                    read the case →
                  </SketchButton>
                  {p.links.map((l) => (
                    <SketchButton
                      key={l.label}
                      href={l.href}
                      external={l.href.startsWith("http")}
                      className="min-h-11 bg-transparent px-4 text-[15px]"
                    >
                      {l.label} ↗
                    </SketchButton>
                  ))}
                </div>
              </SketchCard>
            );
          })}
        </div>

        <div className="mt-16 flex justify-end">
          <SketchButton href="/oss">next: open source →</SketchButton>
        </div>
      </section>
    </main>
  );
}

export default function SketchProjects() {
  const { theme } = useTheme();
  if (theme === "classic") {
    return (
      <main className="flex-1 px-4 sm:px-6 pt-24 sm:pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 space-y-8">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-slate hover:text-copper-bright transition-colors"
            >
              <ArrowLeft size={13} />
              <span>cd ~/portfolio</span>
            </Link>
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-trace pb-5">
              <div>
                <h1 className="font-mono text-2xl sm:text-3xl font-bold text-paper">
                  Projects
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate max-w-xl font-sans">
                  Production AI systems, real-time ML pipelines &amp; full-stack applications.
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-slate">
                <span className="p-1 rounded bg-ink border border-trace text-copper-bright">
                  <Layers size={13} />
                </span>
                <span>8 Shipped Systems</span>
              </div>
            </div>
          </div>
          <ProjectsHoloDeck />
        </div>
      </main>
    );
  }

  return (
    <MascotProvider idle={{ mood: "lookDownLeft", line: MASCOT_LINES.projects.all }}>
      <ProjectsContent />
    </MascotProvider>
  );
}

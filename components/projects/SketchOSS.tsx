"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PAGE_INTRO, riseIn } from "@/lib/motion";
import { MASCOT_LINES, OSS_PRS, RED_PEN, type Mood, type OssPrStatus } from "@/lib/sketch-data";
import { Mascot, MascotProvider, useMascot } from "@/components/sketch/Mascot";
import { RedPenNote } from "@/components/sketch/features";
import { Scribble, SketchButton, WriteIn } from "@/components/sketch/primitives";
import { useSound } from "@/components/sketch/SoundProvider";
import { useTheme } from "@/components/sketch/ThemeProvider";
import GitDiffInspector from "@/components/projects/GitDiffInspector";
import { ArrowLeft, GitBranch } from "lucide-react";

const STATUS_MOOD: Record<OssPrStatus, { mood: Mood; line: string }> = {
  merged: { mood: "delighted", line: MASCOT_LINES.oss.merged },
  "in review": { mood: "blink", line: MASCOT_LINES.oss["in review"] },
  closed: { mood: "bashful", line: MASCOT_LINES.oss.closed },
};

const DOTS: Record<OssPrStatus, string> = {
  merged: "#BFE0C9",
  "in review": "#FFE58F",
  closed: "#D6D2C8",
};

function getDiffSquares(adds: number, dels: number): string[] {
  const tot = adds + dels;
  let g = tot ? Math.round((adds / tot) * 5) : 0;
  const d = dels > 0 ? Math.max(1, 5 - g) : 0;
  if (g + d > 5) g = 5 - d;
  const out: string[] = [];
  for (let i = 0; i < 5; i++) {
    out.push(i < g ? "#7DBF93" : i < g + d ? "#E59A8C" : "transparent");
  }
  return out;
}

function OssContent() {
  const [filter, setFilter] = useState<"all" | "merged">("all");
  const [openPr, setOpenPr] = useState<string>("977");
  const { set } = useMascot();
  const { play } = useSound();
  const { theme } = useTheme();
  const dark = theme !== "paper";

  const stampColor = (status: OssPrStatus) => {
    if (dark) {
      if (status === "merged") return "#9BE3B4";
      if (status === "in review") return "#FFE08A";
      return "#C9C4BA";
    }
    if (status === "merged") return "#2F6B4F";
    if (status === "in review") return "#8A6A00";
    return "#6B6760";
  };

  const addColor = dark ? "#9BE3B4" : "#2F6B4F";
  const delColor = dark ? "#FFB0A0" : "#A33B2E";

  const shownPrs = OSS_PRS.filter((p) => filter === "all" || p.status === "merged");

  return (
    <main>
      {/* Header */}
      <section data-tick className="mx-auto flex max-w-[1240px] flex-wrap items-end justify-between gap-8 px-6 pb-6 pt-16">
        <div className="min-w-0 flex-[999_1_600px]">
          <motion.div variants={riseIn} initial="hidden" animate="show" custom={PAGE_INTRO.kicker}>
            <Link href="/" className="inline-block py-2 font-mono text-sm text-muted no-underline">
              ← back home
            </Link>
            <p className="m-0 mt-4 font-hand text-[30px] text-note">upstream, in public —</p>
          </motion.div>
          <WriteIn delay={PAGE_INTRO.title} className="m-0 text-[clamp(60px,8vw,112px)] font-extrabold leading-none tracking-[-0.03em]">
            Open source
          </WriteIn>
          <Scribble width={420} height={24} delay={PAGE_INTRO.underline} className="mt-1.5 block max-w-full" />
          <motion.p variants={riseIn} initial="hidden" animate="show" custom={PAGE_INTRO.lead} className="mt-6 max-w-[760px] text-[22px] leading-relaxed">
            Core contributions to <b>NandhaKishorM/laya</b> (33k+ ★) — <span className="marker">sub-35ms tool calling</span>, agent routing &amp; runtime patches.
          </motion.p>
          <motion.div variants={riseIn} initial="hidden" animate="show" custom={PAGE_INTRO.lead + 0.1} className="mt-6">
            <SketchButton href="https://github.com/NandhaKishorM/laya" external accent>
              Laya on GitHub ↗
            </SketchButton>
          </motion.div>
        </div>
        <div className="mr-7">
          <Mascot size={140} delay={PAGE_INTRO.mascot} />
        </div>
      </section>

      {/* Numbers */}
      <motion.section
        aria-label="Numbers"
        data-tick
        variants={riseIn}
        initial="hidden"
        animate="show"
        custom={PAGE_INTRO.lead + 0.15}
        className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-7 px-6 pb-5 pt-14"
      >
        <RedPenNote note={RED_PEN.oss.merged} peek className="border-t-2 border-ink pt-4">
          <p className="m-0 text-[52px] font-extrabold tracking-[-0.02em]">7</p>
          <p className="mt-1.5 font-mono text-sm text-muted">pull requests merged</p>
        </RedPenNote>
        <RedPenNote note={RED_PEN.oss.lines} className="border-t-2 border-ink pt-4">
          <p className="m-0 text-[52px] font-extrabold tracking-[-0.02em]">+3,114</p>
          <p className="mt-1.5 font-mono text-sm text-muted">lines merged upstream</p>
        </RedPenNote>
        <RedPenNote note={RED_PEN.oss.stars} className="border-t-2 border-ink pt-4">
          <p className="m-0 text-[52px] font-extrabold tracking-[-0.02em]">~33k ★</p>
          <p className="mt-1.5 font-mono text-sm text-muted">stars on the repo</p>
        </RedPenNote>
        <RedPenNote note={RED_PEN.oss.frameworks} className="border-t-2 border-ink pt-4">
          <p className="m-0 text-[52px] font-extrabold tracking-[-0.02em]">4</p>
          <p className="mt-1.5 font-mono text-sm text-muted">frameworks integrated</p>
        </RedPenNote>
      </motion.section>

      {/* PR Timeline */}
      <section data-tick className="mx-auto max-w-[1240px] px-6 pb-16 pt-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="m-0 font-hand text-[28px] text-note">git log --mine — click one</p>
            <h2 className="mt-1 text-5xl font-extrabold tracking-[-0.02em]">Every pull request</h2>
          </div>
          <div role="group" aria-label="Filter pull requests" className="flex flex-wrap gap-3">
            {(
              [
                { id: "all", label: "all 9" },
                { id: "merged", label: "merged only" },
              ] as const
            ).map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    play("thock");
                    setFilter(f.id);
                  }}
                  className={`sk-box min-h-11 cursor-pointer px-[18px] text-base font-bold transition-transform duration-300 hover:-translate-y-0.5 hover:-rotate-1 ${
                    active ? "bg-ink text-paper" : "bg-card text-ink"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative pl-[52px]">
          <div aria-hidden className="absolute bottom-2 left-2.5 top-2 border-l-[2.5px] border-dashed border-ink" />
          <ol className="m-0 flex list-none flex-col gap-[22px] p-0">
            {shownPrs.map((p, idx) => {
              const isOpen = openPr === p.num;
              const squares = getDiffSquares(p.adds, p.dels);
              const react = STATUS_MOOD[p.status];
              return (
                <motion.li
                  key={p.num}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: idx * 0.04 }}
                  className="group relative"
                >
                  <span
                    aria-hidden
                    className=" -left-[52px] absolute top-[26px] h-[22px] w-[22px] rounded-[50%_45%_55%_50%] border-2 border-ink transition-transform duration-300 group-hover:scale-125"
                    style={{ background: DOTS[p.status] }}
                  />
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => {
                      play("thock");
                      setOpenPr(isOpen ? "" : p.num);
                      set(react.mood, react.line);
                    }}
                    onMouseEnter={() => {
                      play("graphite");
                      set(react.mood, react.line);
                    }}
                    className={`sk-box-b flex w-full cursor-pointer flex-col gap-2 px-[22px] py-5 text-left text-ink transition-transform duration-300 hover:translate-x-1.5 hover:-rotate-[0.4deg] ${
                      isOpen ? "bg-paper" : "bg-card"
                    }`}
                  >
                    <span className="flex w-full flex-wrap items-center gap-3.5">
                      <span className="font-mono text-[15px] font-medium">#{p.num}</span>
                      <span
                        className="-rotate-4 inline-block rounded-md border-2 border-current px-2.5 py-1 font-mono text-xs font-medium uppercase tracking-wider"
                        style={{ color: stampColor(p.status) }}
                      >
                        {p.status}
                      </span>
                      <span className="font-mono text-[13px] text-muted">{p.when}</span>
                      <span className="flex-1" />
                      <span className="font-mono text-[13px]">
                        <span style={{ color: addColor }}>+{p.adds.toLocaleString("en-US")}</span>{" "}
                        <span style={{ color: delColor }}>−{p.dels}</span>
                      </span>
                      <span className="flex gap-[3px]" aria-hidden>
                        {squares.map((sq, i) => (
                          <span
                            key={i}
                            className="h-3 w-3 rounded-[2px] border-[1.5px] border-ink"
                            style={{ background: sq }}
                          />
                        ))}
                      </span>
                    </span>
                    <span className="text-xl font-extrabold leading-snug">{p.plain}</span>
                    <span className="font-mono text-[13px] leading-relaxed text-muted">{p.title}</span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="ml-[18px] flex flex-wrap items-center gap-x-8 gap-y-4 border-l-2 border-ink px-[22px] py-[18px]"
                      >
                        <p className="m-0 flex-[1_1_420px] text-base leading-relaxed text-body">
                          {p.detail}
                        </p>
                        <span className="font-mono text-[13px] text-muted">
                          {p.filesChanged} {p.filesChanged === 1 ? "file changed" : "files changed"}
                        </span>
                        <SketchButton
                          href={`https://github.com/NandhaKishorM/laya/pull/${p.num}`}
                          external
                          className="min-h-11 px-4 text-[15px]"
                        >
                          view on GitHub ↗
                        </SketchButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <motion.div
          variants={riseIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="ml-[52px] mt-11 flex items-start gap-2.5"
        >
          <svg width="40" height="34" viewBox="0 0 40 34" aria-hidden className="shrink-0">
            <path
              d="M4 4 C 6 18, 18 28, 34 28 M27 21 L35 28 L27 33"
              fill="none"
              stroke="var(--note)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="m-0 mt-2 font-hand text-[26px] text-note">
            also: opened issue #675 asking for a production-patterns guide, then reviewed the docs PR (#684) that came out of it
          </p>
        </motion.div>

        <div className="mt-16 flex justify-end">
          <SketchButton href="/stack">next: tech stack →</SketchButton>
        </div>
      </section>
    </main>
  );
}

export default function SketchOSS() {
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
                  Open Source
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate max-w-xl font-sans">
                  Core contributions to <span className="text-paper font-medium">NandhaKishorM/laya</span> (33,000+ ★) — sub-35ms System-1 tool calling, agent routing &amp; runtime patches.
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-slate">
                <span className="p-1 rounded bg-ink border border-trace text-copper-bright">
                  <GitBranch size={13} />
                </span>
                <span>33,000+ Stars Ecosystem</span>
              </div>
            </div>
          </div>
          <GitDiffInspector />
        </div>
      </main>
    );
  }

  return (
    <MascotProvider idle={{ mood: "lookCenter", line: MASCOT_LINES.oss.idle }}>
      <OssContent />
    </MascotProvider>
  );
}

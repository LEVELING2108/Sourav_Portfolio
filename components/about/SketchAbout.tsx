"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mascot, MascotProvider, useMascot } from "@/components/sketch/Mascot";
import {
  SketchButton,
  SketchCard,
  Scribble,
  WriteIn,
} from "@/components/sketch/primitives";
import { PaperPlaneResume, RedPenNote } from "@/components/sketch/features";
import { useSound } from "@/components/sketch/SoundProvider";
import { useTheme } from "@/components/sketch/ThemeProvider";
import About from "@/components/about/About";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { type Mood } from "@/lib/sketch-data";
import { PAGE_INTRO, riseIn } from "@/lib/motion";

const TIMELINE_REACT: Record<string, { mood: Mood; line: string }> = {
  "": { mood: "lookUp", line: "the story so far" },
  "2023": { mood: "blink", line: "day one, deep breath" },
  "2024": { mood: "sparkle", line: "two degrees?! okay" },
  "2025": { mood: "stars", line: "hackathon mode" },
  "2026": { mood: "delighted", line: "merged upstream!" },
  "2027": { mood: "happy", line: "hire me? hehe" },
};

const EDUCATION_CARDS = [
  {
    rot: -0.8,
    where: "Pune · batch of 2027",
    grade: "CGPA 9.04",
    note: "with distinction",
    peek: true,
    tagBg: "#FFF4C7",
    degree: "B.Tech, Electronics & Communication Engineering",
    school: "Bharati Vidyapeeth (Deemed University)",
    tagline: "where the hardware brain comes from",
  },
  {
    rot: 0.7,
    where: "IIT Madras · online B.Sc",
    grade: "CGPA 7.2",
    note: "alongside a full B.Tech",
    peek: false,
    tagBg: "#DCEBF7",
    degree: "B.Sc, Data Science & Applications",
    school: "Indian Institute of Technology, Madras",
    tagline: "where the ML side gets its maths",
  },
];

const TIMELINE_STEPS = [
  {
    year: "2023",
    dot: "#F5F2EA",
    title: "Started B.Tech ECE at Bharati Vidyapeeth",
    body: "Circuits, signals and embedded systems — the foundation underneath everything else.",
  },
  {
    year: "2024",
    dot: "#F5F2EA",
    title: "Added the IIT Madras Data Science degree",
    body: "Statistics, ML and programming, running in parallel with engineering.",
  },
  {
    year: "2025",
    dot: "#FFF4C7",
    title: "Built RailTrack Pro for Smart India Hackathon",
    body: "QR-verified rail fittings, a four-stage inspection flow and vendor risk scoring.",
  },
  {
    year: "2026",
    dot: "#BFE0C9",
    title: "7 pull requests merged into Laya",
    body: "LangChain, LangGraph, LlamaIndex and CrewAI integrations, LayaToolSelector, and two runtime fixes.",
  },
  {
    year: "2027",
    dot: "var(--accent)",
    title: "Graduating — and looking for my first full-time role",
    body: "AI/ML or full-stack, in Pune or remote.",
  },
];

function SketchAboutInner() {
  const { play } = useSound();
  const { set: setMascot } = useMascot();

  return (
    <main>
      {/* 1. HEADER & BIO + TAPED POLAROID */}
      <section
        data-tick="1"
        className="max-w-[1240px] mx-auto px-6 pt-[60px] pb-10 flex flex-wrap gap-16 items-start"
      >
        <div className="flex-[999_1_560px] min-w-0">
          <motion.div
            variants={riseIn}
            initial="hidden"
            animate="show"
            custom={PAGE_INTRO.kicker}
          >
            <Link
              href="/"
              onMouseEnter={() => play("graphite")}
              className="inline-block font-mono text-[14px] text-muted no-underline py-2 hover:text-ink"
            >
              ← back home
            </Link>

            <p className="font-hand text-[30px] text-note mt-[18px] mb-0">
              about me —
            </p>
          </motion.div>

          <WriteIn
            delay={PAGE_INTRO.title}
            className="m-0 text-[clamp(52px,6.5vw,92px)] leading-[1.02] font-extrabold tracking-[-0.03em]"
          >
            Education &amp; background
          </WriteIn>

          <Scribble
            width={380}
            height={24}
            delay={PAGE_INTRO.underline}
            className="block max-w-full mt-2"
          />

          <motion.p
            variants={riseIn}
            initial="hidden"
            animate="show"
            custom={PAGE_INTRO.lead}
            className="mt-[26px] mb-0 text-[22px] leading-[1.5] max-w-[680px]"
          >
            Dual-degree track across{" "}
            <span className="marker">ECE (BVDU Pune · 9.04 CGPA)</span> and Data
            Science (IIT Madras).
          </motion.p>

          <motion.div
            variants={riseIn}
            initial="hidden"
            animate="show"
            custom={PAGE_INTRO.lead + 0.15}
          >
            <h2 className="mt-10 mb-0 text-[30px] font-extrabold tracking-[-0.01em]">
              Two degrees, one brain, zero chill.
            </h2>

            <div className="mt-3.5 text-[18px] leading-[1.7] text-body max-w-[680px]">
              <p className="m-0">
                I&apos;m finishing ECE at{" "}
                <b className="text-ink">Bharati Vidyapeeth, Pune</b> while
                running a parallel questline in Data Science at{" "}
                <b className="text-ink">IIT Madras</b>. I build software that
                doesn&apos;t just work — it survives real users, bad inputs and
                3am traffic spikes.
              </p>
              <p className="mt-[18px] mb-0">
                I&apos;m drawn to the stuff tutorials skip:{" "}
                <span className="marker">sub-35ms agent routing</span> upstream
                in Laya, self-healing ML pipelines in FraudShield, a nasty Redis
                race condition in ROADSoS, and QR verification for rail fittings
                in RailTrack Pro.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-7 items-center">
              <PaperPlaneResume
                href="/resume.pdf"
                label="download resume ↓"
                className="!bg-accent !text-[var(--on-accent)] !min-h-12 !px-5 !text-[17px]"
              />
              <SketchButton href="/contact" shape="b">
                say hi →
              </SketchButton>
            </div>
          </motion.div>
        </div>

        {/* Polaroid photo on the right */}
        <div className="flex-[1_1_300px] flex justify-center pt-10">
          <div className="relative w-[300px] animate-photo-drop">
            <div className="sk-box hatch bg-card pt-[14px] px-[14px] pb-[56px] transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] hover:rotate-[4deg] hover:scale-[1.02]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/portrait-crop.jpg"
                alt="Portrait of Sourav Suman"
                className="block w-full h-[340px] object-cover grayscale contrast-[1.15] brightness-[1.05]"
              />
              <p className="font-hand mt-2.5 mb-0 text-center text-[26px] font-bold text-ink">
                pune, 2026
              </p>
            </div>
            <span
              aria-hidden="true"
              className="tape animate-tape-on top-[-14px] left-1/2 -ml-[55px] w-[110px] -rotate-3"
            />
          </div>
        </div>
      </section>

      {/* 2. EDUCATION DUAL TRACK */}
      <section
        data-tick="1"
        className="max-w-[1240px] mx-auto px-6 pt-20 pb-5"
      >
        <div className="mb-10">
          <p className="font-hand m-0 text-[28px] text-note">
            the dual track —
          </p>
          <h2 className="mt-1 mb-0 text-[48px] font-extrabold tracking-[-0.02em]">
            Education
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-11">
          {EDUCATION_CARDS.map((e) => (
            <SketchCard
              key={e.degree}
              tilt={e.rot}
              className="p-[30px_28px] flex flex-col gap-3 min-h-[260px]"
            >
              <div className="flex justify-between items-baseline gap-3">
                <span className="font-mono text-[13px] text-muted">
                  {e.where}
                </span>
                <RedPenNote note={e.note} peek={e.peek}>
                  <span
                    className="sk-box-b font-mono inline-block text-[13px] px-3 py-[5px] text-[#1F1D1A]"
                    style={{ background: e.tagBg }}
                  >
                    {e.grade}
                  </span>
                </RedPenNote>
              </div>

              <h3 className="m-0 text-[30px] font-extrabold leading-[1.15]">
                {e.degree}
              </h3>
              <p className="m-0 text-[18px] text-body">{e.school}</p>
              <p className="font-hand mt-auto mb-0 text-[24px] text-note">
                {e.tagline}
              </p>
            </SketchCard>
          ))}
        </div>
      </section>

      {/* 3. TIMELINE */}
      <section
        data-tick="1"
        className="max-w-[1240px] mx-auto px-6 pt-[100px] pb-[60px] flex flex-wrap gap-10 items-start"
      >
        <div className="flex-[999_1_640px] min-w-0">
          <div className="mb-11">
            <p className="font-hand m-0 text-[28px] text-note">
              so far — hover a year
            </p>
            <h2 className="mt-1 mb-0 text-[48px] font-extrabold tracking-[-0.02em]">
              The short version
            </h2>
          </div>

          <div className="relative pl-[100px] sm:pl-[130px]">
            <div
              aria-hidden="true"
              className="absolute left-[68px] sm:left-[96px] top-1.5 bottom-1.5 border-l-[2.5px] border-dashed border-ink"
            />
            <ol className="list-none m-0 p-0 flex flex-col gap-[34px]">
              {TIMELINE_STEPS.map((t) => {
                const react = TIMELINE_REACT[t.year] || TIMELINE_REACT[""];
                return (
                  <li
                    key={t.year}
                    tabIndex={0}
                    onMouseEnter={() => {
                      play("graphite");
                      setMascot(react.mood, react.line);
                    }}
                    onFocus={() => {
                      setMascot(react.mood, react.line);
                    }}
                    className="group relative outline-none rounded-xl py-1.5 px-2.5 -my-1.5 -mx-2.5 transition-colors duration-250 hover:bg-[var(--accent-soft)] focus:bg-[var(--accent-soft)]"
                  >
                    <span className="font-hand absolute left-[-100px] sm:left-[-130px] top-[-6px] w-[60px] sm:w-[80px] text-right text-[30px] sm:text-[34px] font-bold text-accent transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-[1.12] group-hover:-rotate-4 group-focus:scale-[1.12] group-focus:-rotate-4">
                      {t.year}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute left-[-40px] sm:left-[-42px] top-1.5 w-[18px] h-[18px] border-2 border-ink rounded-[50%_45%_55%_50%]"
                      style={{ background: t.dot }}
                    />
                    <p className="m-0 text-[22px] font-extrabold">{t.title}</p>
                    <p className="mt-1 mb-0 text-[16px] leading-[1.55] text-body max-w-[640px]">
                      {t.body}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Mascot reacting to hovered year */}
        <div className="flex-[1_1_220px] flex justify-center pt-12 lg:pt-[180px]">
          <Mascot size={130} delay={PAGE_INTRO.mascot} />
        </div>
      </section>

      {/* Bottom Next Button */}
      <div className="max-w-[1240px] mx-auto px-6 pb-8 flex justify-end">
        <SketchButton href="/contact">next: contact →</SketchButton>
      </div>
    </main>
  );
}

export default function SketchAbout() {
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
                  Education &amp; Background
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate max-w-xl font-sans">
                  Dual-degree track across ECE (BVDU Pune · 9.04 CGPA) and Data Science (IIT Madras).
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-slate">
                <span className="p-1 rounded bg-ink border border-trace text-copper-bright">
                  <GraduationCap size={14} />
                </span>
                <span>BVDU Pune × IIT Madras</span>
              </div>
            </div>
          </div>
          <About />
        </div>
      </main>
    );
  }

  return (
    <MascotProvider idle={{ mood: "lookUp", line: "the story so far" }}>
      <SketchAboutInner />
    </MascotProvider>
  );
}

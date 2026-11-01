"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PAGE_INTRO, riseIn, settleIn } from "@/lib/motion";
import { USED_IN, mascotSrc } from "@/lib/sketch-data";
import { Scribble, SketchButton, WriteIn } from "@/components/sketch/primitives";
import { useSound } from "@/components/sketch/SoundProvider";
import { useTheme } from "@/components/sketch/ThemeProvider";
import SkillsMarquee from "@/components/stack/SkillsMarquee";
import { ArrowLeft, Cpu } from "lucide-react";

const GROUPS: { name: string; tools: string[] }[] = [
  { name: "Languages", tools: ["Python", "Java", "C++", "JavaScript", "TypeScript"] },
  {
    name: "AI / ML",
    tools: [
      "PyTorch",
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "CrewAI",
      "ModernBERT",
      "System-1 Routing",
      "RAG Pipelines",
      "Hugging Face",
      "Scikit-learn",
      "DVC & MLflow",
    ],
  },
  { name: "Frontend", tools: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"] },
  { name: "Backend", tools: ["Node.js", "Express.js", "FastAPI", "Flask", "REST APIs"] },
  { name: "Data", tools: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  {
    name: "System design",
    tools: ["JWT Auth", "WebSockets", "Caching", "Rate Limiting", "Distributed Systems"],
  },
  {
    name: "DevOps & cloud",
    tools: ["Docker", "GitHub Actions", "CI/CD", "Git", "AWS (S3, EC2)", "GCP", "Vercel", "Render"],
  },
];

const LAYERS = [
  { layer: "client", tools: "Browser · PWA" },
  { layer: "frontend", tools: "Next.js · React" },
  { layer: "api", tools: "Flask · FastAPI · Node" },
  { layer: "state", tools: "PostgreSQL · Redis" },
  { layer: "models", tools: "PyTorch · scikit-learn" },
];

const ROTS = [-0.8, 0.6, -0.4, 0.9];

export default function SketchStack() {
  const { theme } = useTheme();
  const [selected, setSelected] = useState("Redis");
  const [built, setBuilt] = useState(false);
  const [hoverBuild, setHoverBuild] = useState(false);
  const { play } = useSound();

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
                  Tech Stack
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate max-w-xl font-sans">
                  Deep learning engines, full-stack runtimes &amp; cloud infrastructure. Click any badge to inspect project proofs.
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-slate">
                <span className="p-1 rounded bg-ink border border-trace text-signal">
                  <Cpu size={13} />
                </span>
                <span>20+ Core Technologies</span>
              </div>
            </div>
          </div>
          <SkillsMarquee />
        </div>
      </main>
    );
  }

  const usedIn = USED_IN[selected] ?? [];
  const usedLabel = usedIn.length
    ? `shipped in ${usedIn.length} ${usedIn.length === 1 ? "place:" : "places:"}`
    : "in my toolkit — not in a featured project yet";
  const mascotPose = usedIn.length ? mascotSrc("stars") : mascotSrc("bashful");
  const flowOn = built || hoverBuild;

  return (
    <main>
      {/* Header */}
      <section data-tick className="mx-auto max-w-[1240px] px-6 pb-6 pt-16">
        <motion.div variants={riseIn} initial="hidden" animate="show" custom={PAGE_INTRO.kicker}>
          <Link href="/" className="inline-block py-2 font-mono text-sm text-muted no-underline">
            ← back home
          </Link>
          <p className="m-0 mt-4 font-hand text-[30px] text-note">what I reach for —</p>
        </motion.div>
        <WriteIn delay={PAGE_INTRO.title} className="m-0 text-[clamp(60px,8vw,112px)] font-extrabold leading-none tracking-[-0.03em]">
          Tech stack
        </WriteIn>
        <Scribble width={340} height={24} delay={PAGE_INTRO.underline} className="mt-1.5 block max-w-full" />
        <motion.p variants={riseIn} initial="hidden" animate="show" custom={PAGE_INTRO.lead} className="mt-6 max-w-[760px] text-[22px] leading-relaxed">
          Deep learning engines, full-stack runtimes &amp; cloud infrastructure. <span className="marker">Tap any tool</span> to see where it shipped.
        </motion.p>
      </section>

      {/* Index cards + Sticky note inspector */}
      <section data-tick className="mx-auto flex max-w-[1240px] flex-wrap items-start gap-11 px-6 py-10">
        <div className="grid min-w-0 flex-[999_1_640px] grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-8">
          {GROUPS.map((g, i) => (
            <motion.div
              key={g.name}
              variants={settleIn(ROTS[i % 4])}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ rotate: 0, y: -6 }}
              className="sk-box hatch flex flex-col gap-3.5 bg-card px-[22px] pb-6 pt-[22px]"
            >
              <div className="flex items-baseline justify-between">
                <h2 className="m-0 text-2xl font-extrabold">{g.name}</h2>
                <span className="font-hand text-[22px] text-note">{g.tools.length} tools</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.tools.map((t) => {
                  const isSel = t === selected;
                  const isUsed = !!USED_IN[t];
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={isSel}
                      onMouseEnter={() => play("thock")}
                      onClick={() => {
                        play("graphite");
                        setSelected(t);
                      }}
                      className={`min-h-10 cursor-pointer rounded-full px-3.5 font-mono text-sm transition-all duration-200 hover:-translate-y-0.5 hover:-rotate-2 hover:border-solid hover:border-ink ${
                        isSel
                          ? "border-[1.5px] border-solid border-ink bg-accent text-[var(--on-accent)]"
                          : isUsed
                          ? "border-[1.5px] border-solid border-ink bg-card text-ink"
                          : "border-[1.5px] border-dashed border-muted bg-transparent text-ink"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <aside aria-live="polite" className="mt-16 sm:mt-10 flex-[1_1_300px] lg:sticky lg:top-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 18, delay: 1.0 }}
            className="sk-box-b hatch relative flex flex-col gap-3 bg-[#FFF4C7] px-6 py-[26px] text-[#1F1D1A]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mascotPose}
              alt=""
              aria-hidden
              width={120}
              height={120}
              className="animate-bob absolute -right-4 -top-[86px] block"
            />
            <span className="font-mono text-[13px] text-[#4A463F]">selected</span>
            <span className="text-4xl font-extrabold leading-[1.1]">{selected}</span>
            <span className="font-hand text-[26px] text-[#A84E1E]">{usedLabel}</span>
            {usedIn.length > 0 && (
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {usedIn.map((u) => (
                  <li key={u}>
                    <Link
                      href="/projects"
                      className="text-lg font-bold text-[#1F1D1A] underline decoration-[#C4612A] decoration-wavy underline-offset-[6px]"
                    >
                      {u}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <span className="font-mono text-xs leading-relaxed text-[#4A463F]">
              solid outline = used in a project · dashed = in my toolkit
            </span>
          </motion.div>
        </aside>
      </section>

      {/* The shape of a typical build */}
      <section data-tick className="mx-auto max-w-[1240px] px-6 pb-16 pt-20">
        <motion.div variants={riseIn} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-7">
          <p className="m-0 font-hand text-[28px] text-note">how it usually fits together — hover to sketch it</p>
          <h2 className="mt-1 text-5xl font-extrabold tracking-[-0.02em]">The shape of a typical build</h2>
        </motion.div>

        <div
          tabIndex={0}
          onMouseEnter={() => {
            setHoverBuild(true);
            play("graphite");
            if (!built) setTimeout(() => setBuilt(true), 1400);
          }}
          onMouseLeave={() => setHoverBuild(false)}
          onFocus={() => {
            setHoverBuild(true);
            if (!built) setTimeout(() => setBuilt(true), 1400);
          }}
          onBlur={() => setHoverBuild(false)}
          className="py-2 outline-none"
        >
          <div role="list" aria-label="Typical architecture" className="flex flex-wrap items-center gap-2.5">
            {LAYERS.map((l, i) => (
              <div key={l.layer} role="listitem" className="flex flex-[1_1_190px] items-center gap-2.5">
                <motion.div
                  initial={false}
                  animate={{ opacity: flowOn ? 1 : 0.3, y: flowOn ? 0 : 6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20, delay: flowOn ? i * 0.22 : 0 }}
                  className={`sk-box-b flex min-h-[120px] flex-1 flex-col gap-1.5 bg-card px-4 py-[18px] ${
                    flowOn ? "border-solid" : "border-dashed"
                  }`}
                >
                  <span className="font-mono text-xs text-muted">{l.layer}</span>
                  <span className="text-lg font-extrabold leading-snug">{l.tools}</span>
                </motion.div>
                {i < LAYERS.length - 1 && (
                  <svg width="34" height="24" viewBox="0 0 34 24" aria-hidden className="flex-none">
                    <motion.path
                      d="M2 13 C 10 8, 20 17, 30 11 M24 5 L31 11 L25 18"
                      fill="none"
                      stroke="var(--ink)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={false}
                      animate={{ pathLength: flowOn ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: flowOn ? i * 0.22 + 0.12 : 0 }}
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <div className="sk-box mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-dashed px-5 py-3.5">
            <span className="font-hand text-2xl">wrapped in</span>
            <span className="font-mono text-sm">Docker · GitHub Actions CI/CD · Vercel / Render / AWS / GCP</span>
          </div>
        </div>

        <div className="mt-16 flex justify-end">
          <SketchButton href="/about">next: education &amp; background →</SketchButton>
        </div>
      </section>
    </main>
  );
}

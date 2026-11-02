"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects, type Project } from "@/app/data";
import { PAGE_INTRO, riseIn, settleIn } from "@/lib/motion";
import { MASCOT_LINES } from "@/lib/sketch-data";
import { Mascot, MascotProvider, useMascotHover } from "@/components/sketch/Mascot";
import { RedPenNote } from "@/components/sketch/features";
import { Scribble, SketchButton, WriteIn } from "@/components/sketch/primitives";
import { useSound } from "@/components/sketch/SoundProvider";

function CaseBody({ project, nextProject }: { project: Project; nextProject: Project }) {
  const [built, setBuilt] = useState(false);
  const [hoverFlow, setHoverFlow] = useState(false);
  const { play } = useSound();
  const bashful = useMascotHover("bashful", "looking back on the build…");
  const cs = project.caseStudy;
  const primaryLink = project.links[0];
  const flowOn = built || hoverFlow;

  // Split lead around leadHighlight for the marker highlight
  const highlightIdx = cs.lead.indexOf(cs.leadHighlight);
  const leadBefore = highlightIdx >= 0 ? cs.lead.slice(0, highlightIdx) : cs.lead;
  const leadMark = highlightIdx >= 0 ? cs.leadHighlight : "";
  const leadAfter = highlightIdx >= 0 ? cs.lead.slice(highlightIdx + cs.leadHighlight.length) : "";

  return (
    <main>
      {/* Header */}
      <section data-tick className="mx-auto flex max-w-[1240px] flex-wrap items-end justify-between gap-8 px-6 pb-6 pt-14">
        <div className="min-w-0 flex-[999_1_640px]">
          <motion.div variants={riseIn} initial="hidden" animate="show" custom={PAGE_INTRO.kicker}>
            <Link href="/projects" className="inline-block py-2 font-mono text-sm text-muted no-underline">
              all projects
            </Link>
            <p className="m-0 mt-4 font-mono text-sm text-muted">{cs.subtitle}</p>
          </motion.div>
          <WriteIn delay={PAGE_INTRO.title} className="m-0 mt-1.5 text-[clamp(56px,8vw,116px)] font-extrabold leading-none tracking-[-0.03em]">
            {project.title}
          </WriteIn>
          <Scribble width={420} height={24} delay={PAGE_INTRO.underline} className="mt-1.5 block max-w-full" />
          <motion.p variants={riseIn} initial="hidden" animate="show" custom={PAGE_INTRO.lead} className="mt-6 max-w-[780px] text-[23px] leading-relaxed">
            {leadBefore}
            {leadMark && <span className="marker">{leadMark}</span>}
            {leadAfter}
          </motion.p>
          <motion.div variants={riseIn} initial="hidden" animate="show" custom={PAGE_INTRO.lead + 0.1} className="mt-7 flex flex-wrap items-center gap-4">
            {primaryLink && (
              <SketchButton href={primaryLink.href} external={primaryLink.href.startsWith("http")} accent>
                view the code
              </SketchButton>
            )}
            <span className="font-mono text-sm text-muted">role: {cs.role}</span>
          </motion.div>
        </div>
        <div className="mr-7">
          <Mascot size={140} delay={PAGE_INTRO.mascot} />
        </div>
      </section>

      {/* Taped screenshot + hand-drawn annotations */}
      {project.image && (
        <section className="mx-auto max-w-[1240px] px-6 pb-5 pt-10">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 80, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
          >
            <div className="sk-box hatch bg-card p-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="block h-[340px] sm:h-[540px] w-full border-[1.5px] border-ink object-cover object-top"
              />
            </div>
            <motion.span
              aria-hidden
              className="tape left-[60px] -top-3.5 w-[120px] -rotate-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.1, duration: 0.3 }}
            />
            <motion.span
              aria-hidden
              className="tape right-[70px] -top-3 w-[110px] rotate-[7deg]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.2, duration: 0.3 }}
            />
          </motion.div>
          <motion.div
            variants={riseIn}
            initial="hidden"
            animate="show"
            custom={2.3}
            className="mt-5 flex flex-wrap justify-between gap-4"
          >
            <div className="flex items-start gap-1.5">
              <svg width="54" height="44" viewBox="0 0 54 44" aria-hidden>
                <motion.path
                  d="M48 40 C 30 36, 14 26, 10 6 M4 14 L10 5 L17 12"
                  fill="none"
                  stroke="var(--note)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 2.4 }}
                />
              </svg>
              <p className="m-0 mt-3.5 font-hand text-[26px] text-note">{cs.annotations[0]}</p>
            </div>
            <div className="flex items-start gap-1.5">
              <p className="m-0 mt-3.5 font-hand text-[26px] text-note">{cs.annotations[1]}</p>
              <svg width="54" height="44" viewBox="0 0 54 44" aria-hidden>
                <motion.path
                  d="M6 40 C 24 36, 40 26, 44 6 M37 12 L44 5 L50 14"
                  fill="none"
                  stroke="var(--note)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 2.4 }}
                />
              </svg>
            </div>
          </motion.div>
        </section>
      )}

      {/* Numbers with RedPenNotes */}
      <section aria-label="Numbers" data-tick className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-7 px-6 pb-5 pt-20">
        {cs.numbers.map((n) => (
          <RedPenNote key={n.label} note={n.note} peek={n.peek} className="border-t-2 border-ink pt-4">
            <p className="m-0 text-[52px] font-extrabold tracking-[-0.02em]">{n.value}</p>
            <p className="mt-1.5 font-mono text-sm text-muted">{n.label}</p>
          </RedPenNote>
        ))}
      </section>

      {/* 01 — The problem */}
      <section className="mx-auto flex max-w-[1240px] flex-wrap gap-12 px-6 pb-5 pt-24">
        <motion.div variants={riseIn} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex-[1_1_280px]">
          <p className="m-0 font-hand text-[28px] text-note">01</p>
          <h2 className="mt-1 text-5xl font-extrabold tracking-[-0.02em]">The problem</h2>
        </motion.div>
        <motion.div variants={riseIn} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex-[2_1_520px] text-xl leading-[1.65] text-body">
          <p className="m-0">{cs.problem[0]}</p>
          <p className="m-0 mt-4">{cs.problem[1]}</p>
        </motion.div>
      </section>

      {/* 02 — How it works */}
      <section data-tick className="mx-auto max-w-[1240px] px-6 pb-5 pt-24">
        <motion.div variants={riseIn} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-7">
          <p className="m-0 font-hand text-[28px] text-note">02: hover the diagram to sketch it</p>
          <h2 className="mt-1 text-5xl font-extrabold tracking-[-0.02em]">How it works</h2>
        </motion.div>
        <div
          tabIndex={0}
          onMouseEnter={() => {
            setHoverFlow(true);
            play("graphite");
            if (!built) setTimeout(() => setBuilt(true), 1400);
          }}
          onMouseLeave={() => setHoverFlow(false)}
          onFocus={() => {
            setHoverFlow(true);
            if (!built) setTimeout(() => setBuilt(true), 1400);
          }}
          onBlur={() => setHoverFlow(false)}
          className="py-2.5 outline-none"
        >
          <div role="list" aria-label="System flow" className="flex flex-wrap items-center gap-2.5">
            {cs.howItWorks.map((step, i) => (
              <div key={step.title} role="listitem" className="flex flex-[1_1_240px] items-center gap-2.5">
                <motion.div
                  initial={false}
                  animate={{ opacity: flowOn ? 1 : 0.3, y: flowOn ? 0 : 6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20, delay: flowOn ? i * 0.25 : 0 }}
                  className={`flex min-h-[130px] flex-1 flex-col gap-2 rounded-[16px_8px_18px_8px/8px_18px_8px_16px] border-2 border-ink bg-card px-5 py-5 ${
                    flowOn ? "border-solid" : "border-dashed"
                  }`}
                >
                  <span className="font-mono text-xs text-muted">step {i + 1}</span>
                  <span className="text-xl font-extrabold leading-tight">{step.title}</span>
                  <span className="text-sm leading-snug text-body">{step.body}</span>
                </motion.div>
                {i < cs.howItWorks.length - 1 && (
                  <svg width="40" height="26" viewBox="0 0 40 26" aria-hidden className="flex-none">
                    <motion.path
                      d="M2 14 C 12 9, 24 18, 36 12 M29 6 L37 12 L30 19"
                      fill="none"
                      stroke="var(--ink)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={false}
                      animate={{ pathLength: flowOn ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: flowOn ? i * 0.25 + 0.12 : 0 }}
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — What I built */}
      <section className="mx-auto max-w-[1240px] px-6 pb-5 pt-24">
        <motion.div variants={riseIn} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10">
          <p className="m-0 font-hand text-[28px] text-note">03</p>
          <h2 className="mt-1 text-5xl font-extrabold tracking-[-0.02em]">What I built</h2>
        </motion.div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-9">
          {cs.whatIBuilt.map((f, i) => {
            const rot = [-1, 0.8, -0.6][i % 3];
            return (
              <motion.div
                key={f.title}
                variants={settleIn(rot)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ rotate: 0, y: -6 }}
                className="sk-box hatch flex min-h-[220px] flex-col gap-2.5 bg-card px-6 py-[26px]"
              >
                <span className="font-hand text-[40px] font-bold text-accent">0{i + 1}</span>
                <span className="text-[22px] font-extrabold leading-tight">{f.title}</span>
                <span className="text-base leading-relaxed text-body">{f.body}</span>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          variants={riseIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-11 flex flex-wrap items-center gap-2.5"
        >
          <span className="mr-1.5 font-hand text-[26px]">built with</span>
          {project.stack.map((s) => (
            <span key={s} className="chip text-[13px] px-3 py-1">
              {s}
            </span>
          ))}
        </motion.div>
      </section>

      {/* 04 — looking back */}
      <section data-tick className="mx-auto max-w-[1240px] px-6 pb-14 pt-24">
        <motion.div
          variants={riseIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          {...bashful}
          className="sk-box-b flex flex-wrap gap-x-12 gap-y-6 bg-ink px-9 py-10 text-paper"
        >
          <div className="flex-[1_1_240px]">
            <p className="m-0 font-hand text-[30px] text-accent">04: looking back</p>
          </div>
          <div className="flex-[2_1_480px] text-[19px] leading-relaxed">
            <p className="m-0">{cs.reflection}</p>
          </div>
        </motion.div>
      </section>

      {/* Pager */}
      <nav aria-label="More projects" className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-4 px-6 pb-14 pt-5">
        <SketchButton href="/projects" shape="b">
          all projects
        </SketchButton>
        <SketchButton href={`/projects/${nextProject.slug}`} accent>
          next: {nextProject.title}
        </SketchButton>
      </nav>
    </main>
  );
}

export default function SketchCaseStudy({ slug }: { slug: string }) {
  const idx = projects.findIndex((p) => p.slug === slug);
  const project = idx >= 0 ? projects[idx] : projects[2]; // fallback to RailTrack Pro
  const nextProject = projects[(idx >= 0 ? idx + 1 : 1) % projects.length];

  return (
    <MascotProvider idle={{ mood: "stars", line: MASCOT_LINES.case.idle }}>
      <CaseBody project={project} nextProject={nextProject} />
    </MascotProvider>
  );
}

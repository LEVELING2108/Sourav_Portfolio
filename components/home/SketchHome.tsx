"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { profile, projects } from "@/app/data";
import { INTRO, popIn, riseIn } from "@/lib/motion";
import { MASCOT_LINES, PROJECT_FLOWS, RED_PEN, STICKY } from "@/lib/sketch-data";
import { Mascot, MascotProvider, useMascotHover } from "@/components/sketch/Mascot";
import { PaperPlaneResume, RedPenNote, SketchFlow } from "@/components/sketch/features";
import { Scribble, SketchButton, SketchCard, StickyNote, Ticker, WriteIn } from "@/components/sketch/primitives";
import { SelfDrawingPortrait } from "@/components/sketch/SelfDrawingPortrait";
import { useTheme } from "@/components/sketch/ThemeProvider";
import Hero from "@/components/home/Hero";
import HomePortalGrid from "@/components/home/HomePortalGrid";

const L = MASCOT_LINES.home;

function HeroCtas() {
  const work = useMascotHover("stars", L.stars);
  const resume = useMascotHover("happy", L.happy);
  const gh = useMascotHover("sparkle", L.sparkle);
  return (
    <div className="mt-9 flex flex-wrap items-end gap-[18px]">
      <motion.span variants={popIn} initial="hidden" animate="show" custom={INTRO.ctas[0]} {...work}>
        <SketchButton href="/projects" accent>see my work →</SketchButton>
      </motion.span>
      <motion.span variants={popIn} initial="hidden" animate="show" custom={INTRO.ctas[1]} {...resume}>
        <PaperPlaneResume label="resume" className="min-h-12 px-5 text-[17px]" />
      </motion.span>
      <motion.span variants={popIn} initial="hidden" animate="show" custom={INTRO.ctas[2]} {...gh}>
        <SketchButton href={profile.github} external>github ↗</SketchButton>
      </motion.span>
      <div className="ml-2.5"><Mascot delay={INTRO.mascot} /></div>
    </div>
  );
}

function Stats() {
  const happy = useMascotHover("happy", L.happy);
  const surprised = useMascotHover("surprised", L.surprised);
  return (
    <motion.section data-tick aria-label="Highlights" className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-7 px-6 pb-14 pt-12"
      variants={riseIn} initial="hidden" animate="show" custom={INTRO.stats}>
      <RedPenNote note={RED_PEN.home.stars} peek className="px-2 py-[18px]">
        <p className="m-0 text-[46px] font-extrabold">33k+ ★</p>
        <p className="mt-1.5 font-mono text-sm text-muted">stars on Laya, where 7 of my PRs got merged</p>
      </RedPenNote>
      <div {...happy}>
        <RedPenNote note={RED_PEN.home.shipped} className="px-2 py-[18px]">
          <p className="m-0 text-[46px] font-extrabold">8</p>
          <p className="mt-1.5 font-mono text-sm text-muted">systems shipped — PWAs, ML APIs, enterprise tools</p>
        </RedPenNote>
      </div>
      <div {...surprised}>
        <RedPenNote note={RED_PEN.home.latency} circle className="px-2 py-[18px]">
          <p className="relative m-0 text-[46px] font-extrabold">~33ms</p>
          <p className="relative mt-1.5 font-mono text-sm text-muted">agent routing, per decision</p>
        </RedPenNote>
      </div>
    </motion.section>
  );
}

function HomeContactCta() {
  const happy = useMascotHover("happy", L.happy);
  return (
    <section id="contact" data-tick className="mx-auto max-w-[1240px] px-6 pb-20 pt-28 text-center">
      <motion.div variants={riseIn} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <p className="m-0 font-hand text-[30px] text-note">got a role, a project or a weird bug?</p>
        <h2 className="mt-2.5 text-[clamp(52px,8vw,112px)] font-extrabold leading-none tracking-[-0.03em]">
          Let&apos;s build something.
        </h2>
        <div className="mt-11 flex flex-wrap justify-center gap-[18px]">
          <span {...happy}>
            <SketchButton href={`mailto:${profile.email}`} accent className="min-h-14 px-7 text-[19px]">
              {profile.email}
            </SketchButton>
          </span>
          <SketchButton href={profile.linkedin} external shape="b" className="min-h-14">
            linkedin ↗
          </SketchButton>
          <SketchButton href={profile.github} external className="min-h-14">
            github ↗
          </SketchButton>
        </div>
      </motion.div>
    </section>
  );
}

export default function SketchHome() {
  const { theme } = useTheme();
  if (theme === "classic") {
    return (
      <main className="flex-1">
        <Hero />
        <HomePortalGrid />
      </main>
    );
  }

  // Featured on Home in V2Home.dc.html: Laya, ROADSoS, FraudShield
  const featured = [projects[0], projects[1], projects[3]];
  return (
    <MascotProvider idle={{ mood: "idle", line: L.idle }}>
      <main>
        <section data-tick className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-14 px-6 pb-10 pt-[72px]">
          <div className="min-w-0 flex-[999_1_560px]">
            <motion.p variants={riseIn} initial="hidden" animate="show" custom={INTRO.kicker} className="mb-[18px] font-mono text-sm tracking-wide text-muted">hello, world —</motion.p>
            <WriteIn delay={INTRO.name} className="m-0 text-[clamp(64px,9vw,128px)] font-extrabold leading-[.95] tracking-[-0.03em]">Sourav<br />Suman</WriteIn>
            <Scribble width={360} height={26} delay={INTRO.underline} className="mt-1.5 block max-w-full" />
            <motion.p variants={riseIn} initial="hidden" animate="show" custom={INTRO.tagline} className="mt-6 max-w-[620px] text-[clamp(20px,2vw,26px)] leading-snug">
              I build full-stack products, real-time ML pipelines and <span className="marker">fast agent tooling</span> — and I care about how it feels to use.<span className="caret" aria-hidden="true" />
            </motion.p>
            <motion.p variants={riseIn} initial="hidden" animate="show" custom={INTRO.meta} className="mt-[18px] font-mono text-sm leading-relaxed text-muted">
              pune, india · open to remote<br />B.Tech ECE @ BVDU · B.Sc Data Science @ IIT Madras
            </motion.p>
            <HeroCtas />
          </div>
          <div className="relative flex min-h-[480px] flex-[1_1_320px] justify-center">
            <SelfDrawingPortrait />
          </div>
        </section>

        <Stats />
        <Ticker items={["currently: upstream agent routing on Laya", "real-time ML pipelines under 25ms", "high-concurrency distributed systems", "QR + telemetry engines for rail", "structured JSON extraction with LLMs"]} />

        <section id="work" data-tick className="mx-auto max-w-[1240px] px-6 pb-10 pt-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="m-0 font-hand text-[28px] text-note">things I&apos;ve built —</p>
              <h2 className="mt-1 text-[clamp(40px,5vw,64px)] font-extrabold tracking-tight">Selected work</h2>
            </div>
            <Link href="/projects" className="navlink font-mono text-[15px]">all 8 projects →</Link>
          </div>
          <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-11">
            {featured.map((p, i) => (
              <SketchCard key={p.slug} tilt={[-1.2, 1, -0.6][i]} className="flex flex-col gap-4 px-7 pb-7 pt-[30px]">
                <div className="flex items-baseline justify-between">
                  <span className="font-hand text-[40px] font-bold text-accent">0{i + 1}</span>
                  <span className="font-mono text-[13px] text-muted">{p.tag}</span>
                </div>
                <h3 className="m-0 text-[30px] font-extrabold leading-tight">{p.title}</h3>
                <p className="m-0 leading-relaxed text-body">{p.summary}</p>
                <SketchFlow steps={PROJECT_FLOWS[p.title] ?? p.architecture?.flow ?? []} />
                <p className="m-0 font-hand text-[22px] text-note">{p.win}</p>
                <div className="flex flex-wrap gap-2">{p.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
                <div className="mt-1.5">
                  <SketchButton href={`/projects/${p.slug}`} shape="b" className="min-h-11 px-4 text-[15px]">
                    read the case →
                  </SketchButton>
                </div>
              </SketchCard>
            ))}
          </div>
        </section>

        <section id="explore" data-tick className="mx-auto max-w-[1240px] px-6 pb-10 pt-24">
          <p className="m-0 font-hand text-[28px] text-note">pick a page —</p>
          <h2 className="mt-1 text-[clamp(40px,5vw,64px)] font-extrabold tracking-tight">Keep exploring</h2>
          <div className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-7">
            <StickyNote href="/projects" bg={STICKY.yellow} tilt={-2} badge="8 shipped" title="Projects" blurb="Every system, with the architecture sketched out." />
            <StickyNote href="/oss" bg={STICKY.blue} tilt={1.5} badge="7 merged PRs" title="Open source" blurb="My upstream work on Laya, diff by diff." />
            <StickyNote href="/stack" bg={STICKY.green} tilt={-1} badge="20+ tools" title="Tech stack" blurb="What I reach for, and where it shipped." />
            <StickyNote href="/about" bg={STICKY.pink} tilt={2} badge="ECE × data science" title="About" blurb="Two degrees, one very full calendar." />
            <StickyNote href="/contact" bg={STICKY.purple} tilt={-1.5} badge="open to roles" title="Contact" blurb="Pune or remote. Say hi." />
          </div>
        </section>

        <HomeContactCta />
      </main>
    </MascotProvider>
  );
}

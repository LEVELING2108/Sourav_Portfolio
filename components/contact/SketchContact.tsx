"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mascot, MascotProvider, useMascot } from "@/components/sketch/Mascot";
import {
  SketchButton,
  Scribble,
  WriteIn,
} from "@/components/sketch/primitives";
import { useSound } from "@/components/sketch/SoundProvider";
import { useTheme } from "@/components/sketch/ThemeProvider";
import Contact from "@/components/contact/Contact";
import { ArrowLeft, Mail } from "lucide-react";
import { type Mood } from "@/lib/sketch-data";
import { PAGE_INTRO, riseIn } from "@/lib/motion";

type TopicId = "role" | "project" | "oss" | "hi";
type MoodId = "idle" | "write" | TopicId | "sent";

const MOODS: Record<MoodId, { mood: Mood; line: string }> = {
  idle: { mood: "lookRight", line: "write me something!" },
  write: { mood: "lookDownRight", line: "go on, I’m reading…" },
  role: { mood: "stars", line: "a job?! yes please" },
  project: { mood: "sparkle", line: "ooh, a project" },
  oss: { mood: "happy", line: "open source, my fave" },
  hi: { mood: "bashful", line: "hi back!" },
  sent: { mood: "delighted", line: "yay! it flew!" },
};

const TOPICS: { id: TopicId; label: string }[] = [
  { id: "role", label: "a job / internship" },
  { id: "project", label: "a project" },
  { id: "oss", label: "open source" },
  { id: "hi", label: "just saying hi" },
];

function SketchContactInner() {
  const { play } = useSound();
  const { set: setMascot } = useMascot();
  const [topic, setTopic] = useState<TopicId>("role");
  const [folding, setFolding] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const applyMood = (id: MoodId) => {
    const m = MOODS[id] || MOODS.idle;
    setMascot(m.mood, m.line);
  };

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    play("whoosh");
    setFolding(true);
    applyMood("sent");

    const topicLabel =
      TOPICS.find((t) => t.id === topic)?.label || "Portfolio Inquiry";
    const subject = encodeURIComponent(
      `[${topicLabel}] from ${name || "Portfolio Visitor"}`
    );
    const body = encodeURIComponent(
      `${message}\n\n---\nFrom: ${name || "Visitor"} (${email || "no email provided"})`
    );

    setTimeout(() => {
      setFolding(false);
      setSent(true);
      if (message.trim() || email.trim()) {
        window.location.href = `mailto:sumansourav2108@gmail.com?subject=${subject}&body=${body}`;
      }
    }, 1300);
  };

  const handleReset = () => {
    play("thock");
    setSent(false);
    applyMood(topic);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <main>
      <section className="max-w-[1240px] mx-auto px-6 pt-[60px] pb-20 flex flex-wrap gap-16 items-start">
        {/* LEFT COLUMN — Header + Direct Links */}
        <div className="flex-[1_1_400px] min-w-0">
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
              back home
            </Link>

            <p className="font-hand text-[30px] text-note mt-[18px] mb-0">
              a role, a project, a weird bug? say hi
            </p>
          </motion.div>

          <WriteIn
            delay={PAGE_INTRO.title}
            className="m-0 text-[clamp(64px,8vw,120px)] leading-none font-extrabold tracking-[-0.03em]"
          >
            Contact
          </WriteIn>

          <Scribble
            width={300}
            height={24}
            delay={PAGE_INTRO.underline}
            className="block max-w-full mt-1.5"
          />

          <motion.p
            variants={riseIn}
            initial="hidden"
            animate="show"
            custom={PAGE_INTRO.lead}
            className="mt-6 mb-0 text-[21px] leading-[1.55] max-w-[470px]"
          >
            Direct line for full-stack &amp; AI/ML roles, advisory and
            collaborations. <span className="marker">Replies within a day</span>{" "}
            · Pune / remote.
          </motion.p>

          <motion.div
            variants={riseIn}
            initial="hidden"
            animate="show"
            custom={PAGE_INTRO.lead + 0.15}
            className="mt-9 border-t-2 border-dashed border-muted"
          >
            {[
              {
                kind: "email",
                label: "sumansourav2108@gmail.com",
                href: "mailto:sumansourav2108@gmail.com",
                external: false,
              },
              {
                kind: "linkedin",
                label: "in/sourav-suman-dev",
                href: "https://www.linkedin.com/in/sourav-suman-dev",
                external: true,
              },
              {
                kind: "github",
                label: "LEVELING2108",
                href: "https://github.com/LEVELING2108",
                external: true,
              },
              {
                kind: "leetcode",
                label: "sumansourav2108",
                href: "https://leetcode.com/u/sumansourav2108/",
                external: true,
              },
              {
                kind: "resume",
                label: "download the PDF",
                href: "/resume.pdf",
                external: true,
              },
            ].map((l) => (
              <a
                key={l.kind}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noreferrer" : undefined}
                onMouseEnter={() => play("graphite")}
                className="group flex items-center justify-between gap-4 py-[18px] px-1 border-b-2 border-dashed border-muted no-underline transition-[padding] duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] hover:pl-3.5 hover:text-ink"
              >
                <span className="flex flex-col gap-0.5">
                  <span className="font-mono text-[12px] text-muted">
                    {l.kind}
                  </span>
                  <span className="text-[20px] font-bold">{l.label}</span>
                </span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT COLUMN — Mascot + Notebook Form */}
        <div className="flex-[1_1_480px] min-w-0 relative mt-16 lg:mt-[120px]">
          <div className="lg:absolute lg:left-[-96px] lg:top-[-70px] z-10 mb-4 lg:mb-0">
            <Mascot bubbleSide="right" size={140} delay={PAGE_INTRO.mascot} />
          </div>

          {!sent ? (
            <div className="relative">
              <form
                onSubmit={handleSend}
                className={`sk-box hatch bg-card pt-[52px] px-[34px] pb-[34px] flex flex-col gap-[26px] ${
                  folding ? "folding" : ""
                }`}
              >
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="c-name"
                    className="font-hand text-[26px] font-bold"
                  >
                    your name
                  </label>
                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ada Lovelace"
                    autoComplete="name"
                    onFocus={() => applyMood("write")}
                    onBlur={() => {
                      if (!folding) applyMood(topic);
                    }}
                    className="w-full text-[18px] text-ink bg-transparent border-0 border-b-2 border-ink py-2.5 px-0.5 outline-none transition-colors focus:border-accent focus:border-dashed placeholder:text-muted/80"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="c-email"
                    className="font-hand text-[26px] font-bold"
                  >
                    your email
                  </label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ada@company.com"
                    autoComplete="email"
                    onFocus={() => applyMood("write")}
                    onBlur={() => {
                      if (!folding) applyMood(topic);
                    }}
                    className="w-full text-[18px] text-ink bg-transparent border-0 border-b-2 border-ink py-2.5 px-0.5 outline-none transition-colors focus:border-accent focus:border-dashed placeholder:text-muted/80"
                  />
                </div>

                <fieldset className="border-0 m-0 p-0 flex flex-col gap-3">
                  <legend className="font-hand text-[26px] font-bold p-0 mb-2.5">
                    this is about…
                  </legend>
                  <div className="flex flex-wrap gap-2.5">
                    {TOPICS.map((t) => {
                      const active = t.id === topic;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => {
                            play("thock");
                            setTopic(t.id);
                            applyMood(t.id);
                          }}
                          className={`sk-box-b text-[16px] min-h-[44px] px-4 cursor-pointer transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-0.5 hover:-rotate-[1.5deg] ${
                            active
                              ? "bg-ink text-paper"
                              : "bg-paper text-ink"
                          }`}
                        >
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="c-msg"
                    className="font-hand text-[26px] font-bold"
                  >
                    message
                  </label>
                  <textarea
                    id="c-msg"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me what you're building…"
                    onFocus={() => applyMood("write")}
                    onBlur={() => {
                      if (!folding) applyMood(topic);
                    }}
                    className="w-full text-[18px] text-ink bg-transparent border-0 border-b-2 border-ink py-2.5 px-0.5 outline-none transition-colors focus:border-accent focus:border-dashed placeholder:text-muted/80 resize-y leading-[1.5]"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => play("thock")}
                  className="sk-box hatch self-start inline-flex items-center justify-center gap-2.5 min-h-[54px] px-7 font-bold text-[18px] bg-accent text-[var(--on-accent)] cursor-pointer transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:-rotate-1 active:translate-x-[5px] active:translate-y-[5px]"
                >
                  fold it &amp; send
                </button>
              </form>

              {folding && (
                <svg
                  className="form-plane"
                  width={120}
                  height={90}
                  viewBox="0 0 64 48"
                  aria-hidden="true"
                >
                  <path
                    d="M2 22 L62 2 L40 46 L30 30 Z M30 30 L62 2"
                    fill="var(--card)"
                    stroke="var(--ink)"
                    strokeWidth={2}
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          ) : (
            <div className="min-h-[420px] lg:pt-20">
              <div
                role="status"
                className="sent-card sk-box-b hatch bg-sticky-paper text-sticky-ink p-[40px_36px] flex flex-col gap-3.5"
              >
                <span className="font-hand text-[36px] text-sticky-note">
                  it flew!
                </span>
                <span className="text-[30px] font-extrabold leading-[1.2]">
                  Thanks! I&apos;ll get back to you within a day.
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="sk-box self-start mt-2.5 inline-flex items-center justify-center min-h-[48px] px-[22px] font-bold text-[17px] bg-sticky-card text-sticky-ink cursor-pointer transition-transform duration-300 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:-rotate-1"
                >
                  write another
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Back Home Button */}
      <div className="max-w-[1240px] mx-auto px-6 pb-8 flex justify-end">
        <SketchButton href="/">back to the start</SketchButton>
      </div>
    </main>
  );
}

export default function SketchContact() {
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
                  Contact
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate max-w-xl font-sans">
                  Direct line for full-stack and AI/ML engineering roles, technical advisory &amp; collaborations.
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-slate">
                <span className="p-1 rounded bg-ink border border-trace text-signal">
                  <Mail size={13} />
                </span>
                <span>Open to Roles · Remote / Pune</span>
              </div>
            </div>
          </div>
          <Contact />
        </div>
      </main>
    );
  }

  return (
    <MascotProvider idle={{ mood: "lookRight", line: "write me something!" }}>
      <SketchContactInner />
    </MascotProvider>
  );
}

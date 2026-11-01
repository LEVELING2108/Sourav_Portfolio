"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useSound } from "./SoundProvider";
import { useTheme } from "./ThemeProvider";

/* =====================================================================
   RedPenNote — hover/focus a number to reveal a teacher's red-pen note.
   `peek` keeps it visible (use on the first stat so people discover it).
   ===================================================================== */
export function RedPenNote({ note, peek = false, circle = false, children, className = "" }: { note: string; peek?: boolean; circle?: boolean; children: React.ReactNode; className?: string }) {
  const [on, setOn] = useState(false);
  const show = on || peek;
  return (
    <div tabIndex={0} className={`relative cursor-help outline-none focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-accent ${className}`}
      onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)} onFocus={() => setOn(true)} onBlur={() => setOn(false)}>
      {circle && (
        <svg viewBox="0 0 220 90" aria-hidden className="pointer-events-none absolute -left-2 top-0.5 h-[84px] w-[200px]">
          <motion.path d="M110 6 C 40 4, 6 26, 12 50 C 18 80, 90 88, 150 82 C 205 76, 214 44, 196 26 C 178 8, 128 2, 96 8" fill="none" stroke="var(--red)" strokeWidth={2.5} strokeLinecap="round"
            initial={false} animate={{ pathLength: show ? 1 : 0 }} transition={{ duration: 0.5 }} />
        </svg>
      )}
      <motion.span
        aria-hidden={!show}
        initial={false}
        animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="pointer-events-none absolute -top-12 left-[45%] z-10 flex -rotate-3 items-end gap-0.5 whitespace-nowrap font-hand text-[25px] font-bold text-red-pen"
      >
        <svg width="30" height="34" viewBox="0 0 30 34" aria-hidden>
          <motion.path d="M26 4 C 14 6, 6 16, 6 30 M2 24 L6 31 L11 25" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
            initial={false} animate={{ pathLength: show ? 1 : 0 }} transition={{ duration: 0.45, delay: 0.05 }} />
        </svg>
        {note}
      </motion.span>
      {children}
    </div>
  );
}

/* =====================================================================
   SketchFlow — architecture boxes that sketch themselves on hover.
   Faint + dashed at rest; on hover each box inks in, then the arrow to
   the next one draws. `latch` keeps it drawn after the first hover.
   ===================================================================== */
export function SketchFlow({ steps, latch = false, compact = true, hint = "architecture — hover to sketch it ↓" }: { steps: string[]; latch?: boolean; compact?: boolean; hint?: string }) {
  const [hover, setHover] = useState(false);
  const [built, setBuilt] = useState(false);
  const { play } = useSound();
  const on = hover || built;
  return (
    <div className="relative pt-8" tabIndex={0}
      onMouseEnter={() => { setHover(true); play("graphite"); if (latch) setTimeout(() => setBuilt(true), 1400); }}
      onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)}>
      <motion.span aria-hidden animate={{ opacity: on ? 0 : 1 }} className="absolute left-0 top-0 font-hand text-[21px] text-note">{hint}</motion.span>
      <ol className="m-0 flex list-none items-stretch gap-1 p-0" aria-label="Architecture">
        {steps.map((s, i) => (
          <li key={s} className="flex min-w-0 flex-1 items-center gap-1">
            <motion.span
              initial={false}
              animate={{ opacity: on ? 1 : 0.3, y: on ? 0 : 6 }}
              transition={{ type: "spring", stiffness: 400, damping: 20, delay: on ? i * 0.22 : 0 }}
              className={`sk-box-b min-w-0 flex-1 bg-paper p-2 text-center font-mono leading-snug ${compact ? "text-[11.5px]" : "text-sm"} ${on ? "border-solid" : "border-dashed"}`}
            >
              {s}
            </motion.span>
            {i < steps.length - 1 && (
              <svg width="20" height="16" viewBox="0 0 20 16" aria-hidden className="flex-none">
                <motion.path d="M1 9 C 6 5, 11 11, 17 8 M13 4 L18 8 L13 12" fill="none" stroke="var(--ink)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
                  initial={false} animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: 0.3, delay: on ? i * 0.22 + 0.12 : 0 }} />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* =====================================================================
   PencilRail — a pencil in the left margin draws your scroll progress
   and ticks off each section marked with data-tick.
   ===================================================================== */
export function PencilRail() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const height = useTransform(p, (v) => `${v * 100}%`);
  const [ticks, setTicks] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const measure = () => {
      const H = document.documentElement.scrollHeight, vh = window.innerHeight;
      setTicks([...document.querySelectorAll<HTMLElement>("[data-tick]")].map((el) => {
        const y = el.getBoundingClientRect().top + window.scrollY;
        return H > vh ? Math.min(1, Math.max(0, (y - vh * 0.35) / (H - vh))) : 0;
      }));
    };
    measure();
    const t = setTimeout(measure, 800);
    window.addEventListener("resize", measure);
    const unsub = scrollYProgress.on("change", setProgress);
    return () => { clearTimeout(t); window.removeEventListener("resize", measure); unsub(); };
  }, [scrollYProgress]);

  return (
    <div aria-hidden className="pointer-events-none fixed bottom-12 left-[26px] top-[120px] z-30 hidden w-[26px] min-[1300px]:block">
      <div className="absolute bottom-0 left-3 top-0 border-l-[1.5px] border-dashed border-[var(--hatch)]" />
      <motion.div className="absolute left-[11px] top-0 w-[3px] rounded-sm bg-ink opacity-80" style={{ height }} />
      {ticks.map((f, i) => (
        <span key={i} className="absolute left-[3px] h-[2.5px] rounded-sm transition-all duration-300"
          style={{ top: `${f * 100}%`, width: progress + 0.001 >= f ? 22 : 14, background: progress + 0.001 >= f ? "var(--accent)" : "var(--hatch)" }} />
      ))}
      <motion.div className="absolute -left-px -mt-[62px] h-16 w-7" style={{ top: height }}>
        <svg width="28" height="64" viewBox="0 0 28 64">
          <rect x="8" y="2" width="12" height="9" rx="2" fill="#E9A3A3" stroke="#1F1D1A" strokeWidth="1.5" />
          <rect x="8" y="11" width="12" height="4" fill="#B9B4AA" stroke="#1F1D1A" strokeWidth="1.5" />
          <rect x="8" y="15" width="12" height="30" fill="#F2C14E" stroke="#1F1D1A" strokeWidth="1.5" />
          <path d="M8 45 L20 45 L14 62 Z" fill="#E8C9A0" stroke="#1F1D1A" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 56 L16 56 L14 62 Z" fill="#1F1D1A" />
        </svg>
      </motion.div>
    </div>
  );
}

/* =====================================================================
   PaperPlaneResume — the button folds, a paper plane loops off-screen,
   a toast confirms, then the PDF downloads.
   ===================================================================== */
export function PaperPlaneResume({ href = "/resume.pdf", label = "resume ↓", className = "" }: { href?: string; label?: string; className?: string }) {
  const [flying, setFlying] = useState(0);
  const { play } = useSound();
  const go = (e: React.MouseEvent) => {
    e.preventDefault();
    play("whoosh");
    setFlying((n) => n + 1);
    setTimeout(() => { const a = document.createElement("a"); a.href = href; a.download = ""; a.click(); }, 700);
    setTimeout(() => setFlying(0), 2300);
  };
  return (
    <>
      <motion.a href={href} onClick={go} onMouseEnter={() => play("thock")}
        animate={flying ? { rotateX: [0, 75, 0], scale: [1, 0.6, 1] } : {}} transition={{ duration: 0.55 }}
        whileHover={{ x: -3, y: -3, rotate: -1 }}
        className={`sk-box hatch inline-flex min-h-11 items-center bg-paper px-4 text-[15px] font-bold text-ink no-underline ${className}`}>
        {label}
      </motion.a>
      <AnimatePresence>
        {flying > 0 && (
          <>
            <motion.svg key={`p${flying}`} width="64" height="48" viewBox="0 0 64 48" aria-hidden className="pointer-events-none fixed right-[220px] top-[30px] z-[70]"
              initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.4 }}
              animate={{ opacity: [0, 1, 1, 0], x: [0, -150, -300, 260], y: [0, 90, 170, -240], rotate: [0, -14, -28, 24], scale: [0.4, 1, 1, 0.8] }}
              transition={{ duration: 1.4, times: [0, 0.12, 0.45, 1], ease: "easeInOut" }}>
              <path d="M2 22 L62 2 L40 46 L30 30 Z M30 30 L62 2" fill="var(--card)" stroke="var(--ink)" strokeWidth="2.2" strokeLinejoin="round" />
            </motion.svg>
            <motion.div key={`t${flying}`} role="status" className="sk-box fixed bottom-7 left-1/2 z-[70] -translate-x-1/2 bg-card px-5 py-3 font-hand text-[26px] font-bold text-ink"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
              resume.pdf is on its way ✈
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* =====================================================================
   CommandLine — footer easter egg. `sudo` unlocks root mode, `exit`
   returns to paper, `help` lists commands. (Keep ⌘K for the palette.)
   ===================================================================== */
export function CommandLine() {
  const { setTheme } = useTheme();
  const { play } = useSound();
  const [out, setOut] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const run = (raw: string) => {
    const v = raw.trim().toLowerCase();
    if (!v) return;
    if (v === "help") setOut("try: sudo · blueprint · paper · classic · exit · hire · whoami");
    else if (["sudo", "sudo su", "sudo -s"].includes(v)) { setTheme("root"); setOut("root access granted. type exit to leave."); }
    else if (v === "exit") { setTheme("paper"); setOut("back to paper."); }
    else if (v === "blueprint" || v === "paper" || v === "classic") { setTheme(v); setOut(`switched to ${v}.`); }
    else if (v === "hire" || v === "hire sourav") setOut("great idea → sumansourav2108@gmail.com");
    else if (v === "whoami") setOut("sourav — full-stack & AI/ML engineer, pune");
    else setOut(`command not found: ${v} — try help`);
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="sk-box-b inline-flex min-h-11 items-center gap-2 bg-card px-3.5">
        <span aria-hidden className="font-mono text-accent">&gt;</span>
        <input ref={ref} type="text" aria-label="Type a command" placeholder="type a command (try help)"
          className="min-h-10 w-[230px] border-0 bg-transparent font-mono text-sm text-ink outline-none placeholder:text-muted"
          onKeyDown={(e) => { play("thock"); if (e.key === "Enter") { run(e.currentTarget.value); e.currentTarget.value = ""; } }} />
      </label>
      {out && <p role="status" className="m-0 font-mono text-sm text-note">{out}</p>}
    </div>
  );
}

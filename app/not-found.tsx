"use client";

// The erased 404: an eraser rubs the "404" out, leaving crumbs; the mascot is dizzy.
import { motion } from "framer-motion";
import { StickyNote } from "@/components/sketch/primitives";
import { STICKY } from "@/lib/sketch-data";

const SMUDGES = [
  { left: "6%", top: "18%", w: 130, h: 90, d: 0.8 }, { left: "18%", top: "52%", w: 110, h: 70, d: 1.1 },
  { left: "46%", top: "22%", w: 150, h: 80, d: 1.6 }, { left: "40%", top: "60%", w: 120, h: 70, d: 2.0 },
  { left: "76%", top: "34%", w: 130, h: 90, d: 2.4 },
];
const CRUMBS = [[22, 96, 1.3, 30], [28, 99, 1.4, -20], [55, 97, 2.1, 70], [61, 101, 2.2, 10], [84, 98, 2.7, -50], [89, 102, 2.8, 40]];

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[1240px] px-6 pb-20 pt-10">
      <div className="flex flex-wrap items-center gap-10">
        <div className="min-w-0 flex-[999_1_640px]">
          <div className="relative inline-block">
            <p className="m-0 text-[clamp(180px,26vw,360px)] font-extrabold leading-[.9] tracking-[-0.05em]" aria-label="404">404</p>
            {SMUDGES.map((s, i) => (
              <motion.span key={i} aria-hidden className="absolute rounded-full bg-paper opacity-95 blur-[7px]"
                style={{ left: s.left, top: s.top, width: s.w, height: s.h }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: s.d, duration: 0.5 }} />
            ))}
            <motion.svg aria-hidden viewBox="0 0 120 64" className="absolute left-0 top-0 z-[3] h-16 w-[120px]"
              initial={{ opacity: 0, x: -40, y: 40, rotate: -18 }}
              animate={{ opacity: [0, 1, 1, 1, 1, 1, 1], x: [-40, 140, 60, 420, 330, 660, 760], y: [40, 120, 200, 90, 230, 140, 300], rotate: [-18, -10, -24, -8, -20, -12, 14] }}
              transition={{ duration: 2.6, delay: 0.4, ease: "easeInOut" }}>
              <rect x="4" y="8" width="112" height="48" rx="8" fill="#E9A3A3" stroke="#1F1D1A" strokeWidth="2" />
              <rect x="4" y="8" width="40" height="48" rx="8" fill="#9DB7D9" stroke="#1F1D1A" strokeWidth="2" />
            </motion.svg>
            {CRUMBS.map(([l, t, d, r], i) => (
              <motion.span key={i} aria-hidden className="absolute h-[5px] w-[9px] rounded-[3px] border border-[rgba(31,29,26,.5)] bg-[#E9A3A3]"
                style={{ left: `${l}%`, top: `${t}%` }} initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0, rotate: r }} transition={{ delay: d, duration: 0.6 }} />
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.9 }}>
            <h1 className="mt-7 text-[44px] font-extrabold tracking-tight">This page got erased.</h1>
            <p className="mt-3 max-w-[560px] text-xl leading-relaxed text-body">Whatever was here has been rubbed out — or never got drawn. Try one of these instead:</p>
          </motion.div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/mascot/mascot-dizzy.png" alt="The mascot looking dizzy" width={170} height={170} className="mascot-img animate-bob" />
      </div>
      <nav aria-label="Pages" className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-6">
        <StickyNote href="/" bg={STICKY.yellow} tilt={-2} badge="start over" title="Home" blurb="" />
        <StickyNote href="/projects" bg={STICKY.blue} tilt={1.5} badge="8 shipped" title="Projects" blurb="" />
        <StickyNote href="/oss" bg={STICKY.green} tilt={-1} badge="7 merged PRs" title="Open source" blurb="" />
        <StickyNote href="/contact" bg={STICKY.pink} tilt={2} badge="report the eraser" title="Contact" blurb="" />
      </nav>
    </main>
  );
}

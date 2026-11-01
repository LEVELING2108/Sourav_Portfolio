"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PORTRAIT_PATHS, PORTRAIT_VIEWBOX } from "@/lib/portrait-paths";
import { INTRO, photoDrop, riseIn } from "@/lib/motion";
import { useTheme } from "./ThemeProvider";

/**
 * The polaroid in the hero.
 *  1. drops in and swings (photoDrop), two strips of tape stick on
 *  2. ~205 pencil strokes trace the portrait, top → bottom
 *  3. the line-art fades into the real (grayscale) photo — "developed"
 *  4. hover: the sketch comes back over a faded photo
 */
export function SelfDrawingPortrait({ src = "/photos/portrait-crop.jpg", caption = "me, mid-commit" }: { src?: string; caption?: string }) {
  const reduce = false;
  const { theme } = useTheme();
  const [developed, setDeveloped] = useState(!!reduce);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setDeveloped(true), INTRO.photoDevelops * 1000);
    return () => clearTimeout(t);
  }, [reduce]);

  const showLines = !developed || hover;
  const displayCaption = theme === "root" ? "root@sourav:~$" : caption;

  return (
    <div className="relative flex flex-col items-center pb-14">
      <motion.div className="relative w-[300px]" variants={photoDrop} initial="hidden" animate="show" custom={INTRO.photo}>
        <div className="sk-box hatch bg-card px-3.5 pb-14 pt-3.5" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <div className="relative h-[340px] w-full overflow-hidden bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="Portrait of Sourav Suman" className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.15] brightness-105 transition-opacity duration-[1200ms]"
              style={{ opacity: developed ? (hover ? 0.1 : 1) : 0 }} />
            <svg viewBox={PORTRAIT_VIEWBOX} preserveAspectRatio="xMidYMid slice" aria-hidden
              className="absolute inset-0 h-full w-full transition-opacity duration-1000" style={{ opacity: showLines ? 1 : 0 }}>
              {PORTRAIT_PATHS.map((d, i) => (
                <motion.path key={i} d={d} fill="none" stroke="var(--ink)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: reduce ? 0 : INTRO.portraitLines + i * 0.011 }} />
              ))}
            </svg>
          </div>
          <p className="mt-2.5 text-center font-hand text-[26px] font-bold">{displayCaption}</p>
        </div>
        <motion.span aria-hidden className="tape -left-[18px] -top-3.5 w-[104px] -rotate-[8deg] origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: INTRO.tape, duration: 0.3 }} />
        <motion.span aria-hidden className="tape -right-5 -top-3 w-24 rotate-[10deg] origin-right" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: INTRO.tape + 0.15, duration: 0.3 }} />
      </motion.div>
      <motion.p
        variants={riseIn}
        initial="hidden"
        animate="show"
        custom={4.4}
        className="hero-sketch-note absolute -left-4 bottom-0 m-0 -rotate-6 font-hand text-2xl text-note"
      >
        drawn by code, then developed →<br />(hover to see the sketch)
      </motion.p>
    </div>
  );
}

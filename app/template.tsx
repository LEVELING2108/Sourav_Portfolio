"use client";

// Page-turn transition: on every route change a sheet of paper swings away
// from the left edge (like turning a notebook page), revealing the new page,
// whose title then writes itself in (see PAGE_INTRO in lib/motion.ts).
import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSound } from "@/components/sketch/SoundProvider";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const { play } = useSound();
  useEffect(() => { play("page"); }, [play]);
  return (
    <>
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60] border-r-2 border-ink"
          style={{ transformOrigin: "left center", transformPerspective: 1800, background: "linear-gradient(90deg, var(--paper) 0%, var(--paper) 92%, rgba(0,0,0,.18) 100%)" }}
          initial={{ rotateY: 0, opacity: 1 }}
          animate={{ rotateY: -96, opacity: 0.2, transitionEnd: { display: "none" } }}
          transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
        />
      )}
      {children}
    </>
  );
}

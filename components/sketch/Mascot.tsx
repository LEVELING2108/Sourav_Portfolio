"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { mascotSrc, type Mood } from "@/lib/sketch-data";
import { useSound } from "./SoundProvider";

/**
 * One mascot per page. Anything on the page can change his mood + speech bubble:
 *   const hover = useMascotHover("stars", "ooh, good pick!");
 *   <a {...hover}>see my work</a>
 */
type State = { mood: Mood; line: string };
type Ctx = { state: State; set: (mood: Mood, line: string) => void; reset: () => void };
const MascotCtx = createContext<Ctx | null>(null);

export function MascotProvider({ idle, children }: { idle: State; children: React.ReactNode }) {
  const [state, setState] = useState<State>(idle);
  const set = useCallback((mood: Mood, line: string) => setState({ mood, line }), []);
  const reset = useCallback(() => setState(idle), [idle]);
  return <MascotCtx.Provider value={{ state, set, reset }}>{children}</MascotCtx.Provider>;
}

export function useMascot() {
  const c = useContext(MascotCtx);
  if (!c) throw new Error("useMascot must be used inside <MascotProvider>");
  return c;
}

/** Spread onto any element: hovering/focusing it changes the mascot. */
export function useMascotHover(mood: Mood, line: string) {
  const { set, reset } = useMascot();
  const { play } = useSound();
  return {
    onMouseEnter: () => { set(mood, line); play("graphite"); },
    onMouseLeave: reset,
    onFocus: () => set(mood, line),
    onBlur: reset,
  };
}

export function Mascot({ size = 150, bubbleSide = "left", delay = 2.6 }: { size?: number; bubbleSide?: "left" | "right"; delay?: number }) {
  const { state, set } = useMascot();
  const { play } = useSound();
  return (
    <motion.div
      className="relative inline-flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 18, delay }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={state.line}
          aria-live="polite"
          initial={{ opacity: 0, y: 6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className={`absolute bottom-[calc(100%-8px)] ${bubbleSide === "left" ? "right-[70%] rounded-[18px_22px_4px_18px]" : "left-[55%] rounded-[22px_18px_18px_4px]"} whitespace-nowrap border-2 border-ink bg-card px-3.5 py-1.5 font-hand text-[23px] font-bold text-ink`}
        >
          {state.line}
        </motion.span>
      </AnimatePresence>
      <button
        type="button"
        aria-label="Poke the mascot"
        className="cursor-pointer rounded-full"
        onClick={() => { play("pop"); set(state.mood === "happy" ? "stars" : "happy", state.mood === "happy" ? "ooh, good pick!" : "hehe, hi!"); }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mascotSrc(state.mood)} alt="Pencil sketch of Sourav's mascot" width={size} height={size} className="mascot-img animate-bob block" />
      </button>
    </motion.div>
  );
}

// Shared motion language for the sketch portfolio.
// Rule of thumb: ink OUT (things being drawn/written use `ease.ink`),
// spring IN (things being placed/pinned use `spring.pin`).
import type { Transition, Variants } from "framer-motion";

export const ease = {
  ink: [0.65, 0, 0.35, 1] as const,     // writing, page turns
  out: [0.22, 1, 0.36, 1] as const,     // rises, drops
  overshoot: [0.34, 1.56, 0.64, 1] as const, // pops, hovers
};

export const spring = {
  pin: { type: "spring", stiffness: 400, damping: 18 } as Transition,   // buttons, notes
  soft: { type: "spring", stiffness: 220, damping: 22 } as Transition,  // cards settling
};

/** Home intro choreography (seconds after first paint). Plays once per session. */
export const INTRO = {
  nav: 0.1,
  kicker: 0.25,
  name: 0.35,         // name writes in left→right (1.1s)
  photo: 0.3,         // polaroid drops and swings
  portraitLines: 0.6, // self-drawing portrait strokes start (~3.15s of strokes)
  underline: 0.9,
  tagline: 1.0,
  meta: 1.1,
  tape: 0.7,
  ctas: [1.2, 1.28, 1.36],
  mascot: 1.5,
  stats: 1.4,
  ticker: 1.6,
  photoDevelops: 3.8, // line-art fades into the real photo, once the strokes finish
};

/** Sub-page intro (after the page turn; the sheet clears ~0.5s in). */
export const PAGE_INTRO = { nav: 0.35, kicker: 0.5, title: 0.55, underline: 1.1, lead: 1.0, mascot: 1.3 };

export const writeIn: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  show: (delay = 0) => ({ clipPath: "inset(0 0% 0 0)", transition: { duration: 1.05, ease: ease.ink, delay } }),
};

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out, delay } }),
};

export const dropIn: Variants = {
  hidden: { opacity: 0, y: -26 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out, delay } }),
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -6 },
  show: (delay = 0) => ({ opacity: 1, scale: 1, rotate: 0, transition: { ...spring.pin, delay } }),
};

/** Cards and sticky notes: drop from a steeper tilt and settle at their resting angle. */
export const settleIn = (tilt = 0): Variants => ({
  hidden: { opacity: 0, y: 60, rotate: tilt - 4 },
  show: { opacity: 1, y: 0, rotate: tilt, transition: spring.soft },
});

export const photoDrop: Variants = {
  hidden: { opacity: 0, y: -120, rotate: -18 },
  show: (delay = 0) => ({
    opacity: [0, 1, 1], y: [-120, 8, 0], rotate: [-18, 5, 3],
    transition: { duration: 1, ease: ease.out, times: [0, 0.65, 1], delay },
  }),
};

/** Hover/press for anything that looks like a button. */
export const pressable = {
  whileHover: { x: -3, y: -3, rotate: -1 },
  whileTap: { x: 5, y: 5 },
  transition: spring.pin,
};

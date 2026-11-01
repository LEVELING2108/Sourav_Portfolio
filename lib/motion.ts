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
  nav: 0.15,
  kicker: 0.45,
  name: 0.6,          // name writes in left→right (1.1s)
  photo: 0.5,         // polaroid drops and swings
  portraitLines: 1.0, // self-drawing portrait strokes start
  underline: 1.55,
  tagline: 1.75,
  meta: 1.9,
  tape: 1.2,
  ctas: [2.1, 2.2, 2.3],
  mascot: 2.6,
  stats: 2.5,
  ticker: 2.9,
  photoDevelops: 4.3, // line-art fades into the real photo
};

/** Sub-page intro (after the page turn). */
export const PAGE_INTRO = { nav: 0.45, kicker: 0.65, title: 0.75, underline: 1.55, lead: 1.6, mascot: 1.9 };

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

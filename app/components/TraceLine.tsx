"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * The signature element: a vertical line that draws itself as the visitor
 * scrolls through the project log. It reads as both a PCB copper trace
 * (the hardware side) and a git commit graph (the software side).
 */
export default function TraceLine({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.15,
    restDelta: 0.0001,
  });

  return (
    <div
      className="pointer-events-none absolute left-4 top-0 bottom-0 w-px sm:left-6"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-trace" />
      <motion.div
        style={{ scaleY, originY: 0 }}
        className="absolute inset-0 bg-gradient-to-b from-copper via-copper-bright to-signal"
      />
    </div>
  );
}

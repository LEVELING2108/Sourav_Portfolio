"use client";

import Link from "next/link";
import { Asterisk } from "lucide-react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ease, pressable, settleIn, spring } from "@/lib/motion";
import { useSound } from "./SoundProvider";

/* ---------- SketchButton: wobbly outline + pencil-hatch shadow; lifts on hover, presses on tap ---------- */
type BtnProps = { href?: string; accent?: boolean; shape?: "a" | "b"; className?: string; children: React.ReactNode; onClick?: (e: React.MouseEvent) => void; external?: boolean };
const MotionLink = motion.create(Link);

export function SketchButton({ href, accent, shape = "a", className = "", children, onClick, external }: BtnProps) {
  const { play } = useSound();
  const cls = `${shape === "a" ? "sk-box" : "sk-box-b"} hatch inline-flex min-h-12 items-center gap-2.5 px-5 text-[17px] font-bold no-underline ${accent ? "bg-accent text-[var(--on-accent)] hover:text-[var(--on-accent)]" : "bg-paper text-ink hover:text-ink"} ${className}`;
  const common = { ...pressable, className: cls, onMouseEnter: () => play("thock"), onClick };
  if (href && external) return <motion.a href={href} target="_blank" rel="noopener noreferrer" {...common}>{children}</motion.a>;
  if (href) return <MotionLink href={href} {...common}>{children}</MotionLink>;
  return <motion.button type="button" {...common}>{children}</motion.button>;
}

/* ---------- SketchCard: settles in from a steeper tilt; straightens and lifts on hover ---------- */
export function SketchCard({ tilt = 0, className = "", children, ...rest }: { tilt?: number; className?: string; children: React.ReactNode } & HTMLMotionProps<"article">) {
  return (
    <motion.article
      variants={settleIn(tilt)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ rotate: 0, y: -8, transition: spring.pin }}
      className={`sk-box hatch group bg-card ${className}`}
      {...rest}
    >
      {children}
    </motion.article>
  );
}

/* ---------- Scribble: hand-drawn underline / circle that draws itself ---------- */
const SHAPES = {
  underline: { viewBox: "0 0 360 26", d: "M4 16 C 60 6, 120 22, 180 12 S 300 4, 356 14", w: 5 },
  circle: { viewBox: "0 0 220 90", d: "M110 6 C 40 4, 6 26, 12 50 C 18 80, 90 88, 150 82 C 205 76, 214 44, 196 26 C 178 8, 128 2, 96 8", w: 2.5 },
  arrow: { viewBox: "0 0 30 34", d: "M26 4 C 14 6, 6 16, 6 30 M2 24 L6 31 L11 25", w: 2 },
};
export function Scribble({ shape = "underline", delay = 0, inView = false, color = "var(--accent)", className = "", width, height }: { shape?: keyof typeof SHAPES; delay?: number; inView?: boolean; color?: string; className?: string; width?: number; height?: number }) {
  const s = SHAPES[shape];
  const anim = { pathLength: 1, transition: { duration: shape === "circle" ? 1 : 0.85, ease: "easeOut" as const, delay } };
  return (
    <svg viewBox={s.viewBox} width={width} height={height} aria-hidden className={className}>
      <motion.path d={s.d} fill="none" stroke={color} strokeWidth={s.w} strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} {...(inView ? { whileInView: anim, viewport: { once: true } } : { animate: anim })} />
    </svg>
  );
}

/* ---------- WriteIn: text that writes itself left→right (headings) ---------- */
export function WriteIn({ as = "h1", delay = 0, className = "", children }: { as?: "h1" | "h2" | "span"; delay?: number; className?: string; children: React.ReactNode }) {
  const Tag = motion[as];
  return (
    <Tag className={className} initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 1.05, ease: ease.ink, delay }}>
      {children}
    </Tag>
  );
}

/* ---------- StickyNote: pastel note link that wobbles on hover ---------- */
export function StickyNote({ href, bg, tilt = 0, badge, title, blurb }: { href: string; bg: string; tilt?: number; badge: string; title: string; blurb: string }) {
  const { play } = useSound();
  return (
    <MotionLink
      href={href}
      onMouseEnter={() => play("graphite")}
      variants={settleIn(tilt)} initial="hidden" whileInView="show" viewport={{ once: true }}
      whileHover={{ rotate: [tilt, tilt + 1.6, tilt], y: [0, -4, 0], transition: { duration: 0.6 } }}
      className="hatch flex min-h-[210px] flex-col gap-2.5 rounded-[4px_4px_22px_4px] border-2 border-sticky-ink p-6 text-sticky-ink no-underline hover:text-sticky-ink"
      style={{ background: bg }}
    >
      <span className="font-mono text-[13px] text-sticky-body">{badge}</span>
      <span className="text-[28px] font-extrabold leading-tight">{title}</span>
      <span className="flex-1 text-[15px] leading-relaxed text-sticky-body">{blurb}</span>
      <span className="font-hand text-2xl font-bold">open</span>
    </MotionLink>
  );
}

/* ---------- Ticker: the tilted ink strip (the only looping element besides the star) ---------- */
export function Ticker({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="group -mx-5 -rotate-[1.2deg] overflow-hidden border-y-2 border-ink bg-ink text-paper">
      <div className="animate-marquee flex w-max py-4">
        {loop.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-5 whitespace-nowrap px-5 text-[22px]">{t}<Asterisk aria-hidden className="size-5 text-accent" strokeWidth={2.5} /></span>
        ))}
      </div>
    </div>
  );
}

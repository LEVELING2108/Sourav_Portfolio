"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { profile } from "../data";
import { Shield, Cpu, Wifi } from "lucide-react";

export default function HeroPhotoBadge() {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate motion values (-0.5 to 0.5 normalized)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for 3D card tilt
  const springConfig = { stiffness: 260, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);

  // Dynamic Specular Light Glare Position (% from 0% to 100%)
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative flex justify-center lg:justify-end [perspective:1200px]">
      {/* Outer Ambient Reactive Glow Halo */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.9 : 0.5,
          scale: isHovered ? 1.05 : 0.98,
        }}
        transition={{ duration: 0.5 }}
        className="absolute -inset-3 rounded-[36px] bg-gradient-to-tr from-copper via-copper-bright/40 to-signal blur-xl pointer-events-none"
      />

      {/* Main 3D Tilted Card Badge Container */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="relative w-[240px] h-[330px] sm:w-[270px] sm:h-[370px] lg:w-[290px] lg:h-[390px] rounded-3xl border-2 border-copper/70 bg-ink-raised shadow-[0_24px_60px_rgba(0,0,0,0.65)] overflow-hidden cursor-pointer select-none group"
      >
        {/* Top Lanyard Clip Bracket Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
          <div className="w-12 h-2.5 rounded-full bg-ink/90 border border-copper/60 shadow-inner flex items-center justify-center">
            <div className="w-6 h-1 rounded-full bg-trace" />
          </div>
        </div>

        {/* Top Header Row of the Pass */}
        <div className="absolute top-6 inset-x-0 px-4 z-20 flex items-center justify-between font-mono text-[10px] text-paper/80">
          <div className="flex items-center gap-1.5 text-copper-bright font-semibold">
            <Cpu size={12} />
            <span>SIH-2025 // ENG</span>
          </div>
          <div className="flex items-center gap-1 text-slate">
            <Wifi size={11} className="text-signal animate-pulse" />
            <span>NEMESIS</span>
          </div>
        </div>

        {/* The Portrait Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={profile.avatar}
            alt={`${profile.name} Portrait Pass`}
            fill
            priority
            sizes="(max-width: 640px) 240px, (max-width: 1024px) 270px, 290px"
            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
          />
          {/* Subtle Top & Bottom Vignettes for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/90" />
        </div>

        {/* Specular Light Reflection Glare (Tracks Cursor) */}
        <motion.div
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle 220px at ${gx}% ${gy}%, rgba(255, 255, 255, 0.28) 0%, rgba(217, 154, 95, 0.18) 35%, transparent 70%)`
            ),
          }}
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Holographic Iridescent Foil Sheen Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-tr from-transparent via-signal/15 via-copper-bright/15 to-transparent mix-blend-color-dodge opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Bottom Badge Info Deck */}
        <div className="absolute bottom-3 inset-x-3 z-20 rounded-2xl bg-ink/90 backdrop-blur-md border border-copper/40 p-2.5 font-mono shadow-lg">
          {/* Name & Title */}
          <div className="flex items-center justify-between border-b border-trace/60 pb-1.5">
            <div>
              <p className="text-xs font-bold text-paper tracking-tight">
                {profile.name}
              </p>
              <p className="text-[10px] text-copper-bright font-medium">
                Full-Stack &amp; AI/ML
              </p>
            </div>
            <span className="p-1 rounded-md bg-ink border border-copper/30 text-copper-bright">
              <Shield size={13} />
            </span>
          </div>

          {/* Telemetry Status & Barcode simulation */}
          <div className="mt-1.5 flex items-center justify-between text-[9px] text-slate">
            <span className="flex items-center gap-1 text-signal font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-signal animate-ping" />
              <span>ACTIVE · PUNE, IN</span>
            </span>

            {/* Simulated Micro Barcode */}
            <div className="flex items-center gap-[2px] opacity-70">
              <span className="w-[1px] h-3 bg-paper" />
              <span className="w-[2px] h-3 bg-paper" />
              <span className="w-[1px] h-3 bg-paper" />
              <span className="w-[3px] h-3 bg-paper" />
              <span className="w-[1px] h-3 bg-paper" />
              <span className="w-[2px] h-3 bg-paper" />
              <span className="w-[1px] h-3 bg-paper" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

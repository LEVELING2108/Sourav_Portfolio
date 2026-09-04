"use client";

import { useState } from "react";
import { motion, useSpring, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { profile } from "../data";
import { Cpu, GraduationCap, Award, RotateCw, MapPin, Sparkles } from "lucide-react";

export default function HeroPhotoFlip() {
  const [isFlipped, setIsFlipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Subtle 3D cursor tilt on front card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 24 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || isFlipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative flex justify-center lg:justify-end [perspective:1200px]">
      {/* Ambient Glowing Halo behind the card */}
      <div className="absolute -inset-3 rounded-[38px] bg-gradient-to-tr from-copper/60 via-copper-bright/30 to-signal/50 blur-xl opacity-70 transition-all duration-500 pointer-events-none" />

      {/* Tilt & Flip Container */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={toggleFlip}
        style={{
          rotateX: shouldReduceMotion || isFlipped ? 0 : rotateX,
          rotateY: shouldReduceMotion || isFlipped ? 0 : rotateY,
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="relative w-[250px] h-[340px] sm:w-[280px] sm:h-[380px] lg:w-[300px] lg:h-[400px] rounded-3xl cursor-pointer select-none [transform-style:preserve-3d]"
      >
        {/* Animated 3D Flip Wrapper */}
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full [transform-style:preserve-3d]"
        >
          {/* ================= CARD FRONT: Clean Portrait ================= */}
          <div
            className={`absolute inset-0 w-full h-full rounded-3xl border-2 border-copper/70 bg-ink-raised shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden [backface-visibility:hidden] ${
              isFlipped ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src={profile.avatar}
              alt={`${profile.name} Portrait`}
              fill
              priority
              sizes="(max-width: 640px) 250px, (max-width: 1024px) 280px, 300px"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Bottom ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />

            {/* Floating Top Pill */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-ink/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono text-paper border border-copper/40 shadow-md">
              <Sparkles size={11} className="text-copper-bright" />
              <span>Click to flip</span>
            </div>

            {/* Bottom Status & Flip Prompt */}
            <div className="absolute bottom-3 inset-x-3 z-10 rounded-2xl bg-ink/90 backdrop-blur-md border border-copper/50 p-3 font-mono shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-paper tracking-tight">{profile.name}</p>
                  <p className="text-[10px] text-copper-bright">Full-Stack &amp; AI/ML</p>
                </div>
                <div className="flex items-center gap-1 text-signal text-[10px] font-semibold">
                  <RotateCw size={12} className="animate-spin-slow" />
                  <span>Specs</span>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-trace/60 pt-1.5 text-[10px] text-slate">
                <span className="flex items-center gap-1 text-signal">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal animate-ping" />
                  <span>Available for roles</span>
                </span>
                <span className="text-slate/80">Pune, IN</span>
              </div>
            </div>
          </div>

          {/* ================= CARD BACK: Engineer Spec Sheet ================= */}
          <div
            className={`absolute inset-0 w-full h-full rounded-3xl border-2 border-signal/70 bg-ink-raised/95 backdrop-blur-xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between font-mono [transform:rotateY(180deg)] [backface-visibility:hidden] ${
              !isFlipped ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            {/* Header */}
            <div className="border-b border-trace pb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-ink border border-signal/40 text-signal">
                  <Cpu size={14} />
                </span>
                <div>
                  <p className="text-xs font-bold text-paper">ENGINEER SPECS</p>
                  <p className="text-[9px] text-copper-bright">// hardware + software</p>
                </div>
              </div>
              <span className="text-[10px] text-slate font-semibold flex items-center gap-1">
                <RotateCw size={11} className="text-signal" />
                Flip
              </span>
            </div>

            {/* Spec Attributes List */}
            <div className="space-y-3 my-auto text-xs">
              {/* Dual Degree */}
              <div className="space-y-1">
                <p className="text-[10px] uppercase text-slate tracking-wider flex items-center gap-1">
                  <GraduationCap size={12} className="text-copper-bright" />
                  Dual Degree
                </p>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between bg-ink/70 px-2 py-1 rounded border border-trace/60">
                    <span className="text-paper">BVDU Pune (ECE)</span>
                    <span className="text-signal font-bold">9.1 CGPA</span>
                  </div>
                  <div className="flex justify-between bg-ink/70 px-2 py-1 rounded border border-trace/60">
                    <span className="text-paper">IIT Madras (Data Science)</span>
                    <span className="text-signal font-bold">7.2 CGPA</span>
                  </div>
                </div>
              </div>

              {/* Hackathon Achievement */}
              <div className="space-y-1">
                <p className="text-[10px] uppercase text-slate tracking-wider flex items-center gap-1">
                  <Award size={12} className="text-copper-bright" />
                  Hackathon Track Record
                </p>
                <div className="bg-ink/70 p-2 rounded border border-trace/60 text-[11px] text-paper">
                  <span className="text-copper-bright font-bold">SIH 2025 R2 Cleared</span>
                  <p className="text-[10px] text-slate">Team Nemesis · RailTrack Pro &amp; ROADSoS</p>
                </div>
              </div>

              {/* Core Production Stack */}
              <div className="space-y-1">
                <p className="text-[10px] uppercase text-slate tracking-wider flex items-center gap-1">
                  <MapPin size={12} className="text-copper-bright" />
                  Coordinates &amp; Focus
                </p>
                <div className="flex flex-wrap gap-1 text-[10px]">
                  <span className="rounded bg-ink border border-trace px-1.5 py-0.5 text-paper">Next.js 16</span>
                  <span className="rounded bg-ink border border-trace px-1.5 py-0.5 text-paper">Python</span>
                  <span className="rounded bg-ink border border-trace px-1.5 py-0.5 text-paper">PyTorch</span>
                  <span className="rounded bg-ink border border-trace px-1.5 py-0.5 text-paper">Redis</span>
                  <span className="rounded bg-ink border border-trace px-1.5 py-0.5 text-paper">Docker</span>
                </div>
              </div>
            </div>

            {/* Bottom Flip Back Notice */}
            <div className="border-t border-trace pt-2 flex items-center justify-between text-[10px] text-slate">
              <span className="text-signal font-medium">Click card to flip front</span>
              <span className="text-paper font-semibold">↺ 3D</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

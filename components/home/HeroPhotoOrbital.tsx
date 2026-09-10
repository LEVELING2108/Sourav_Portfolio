"use client";

import { useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { profile } from "@/app/data";
import { PytorchIcon, NextjsIcon } from "@/components/shared/BrandIcons";
import { GraduationCap, Sparkles } from "lucide-react";

export default function HeroPhotoOrbital() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate motion values (-0.5 to 0.5 normalized from card center)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Physical springs for 3D card tilt
  const springConfig = { stiffness: 280, damping: 22 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  // Subtle parallax shifts for floating satellites
  const satX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const satY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center justify-center [perspective:1400px] py-6 select-none"
    >
      {/* Concentric Rotating Orbital Dashed Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
          className="w-[340px] h-[340px] sm:w-[410px] sm:h-[410px] rounded-full border border-dashed border-copper/25 dark:border-copper/20"
        />
        {/* Outer Elliptical Orbit */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
          className="absolute w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] rounded-full border border-dotted border-signal/25 dark:border-signal/15"
        />
        {/* Radial Core Glow */}
        <div className="absolute w-[360px] h-[360px] bg-gradient-to-tr from-copper/20 via-signal/10 to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      {/* SATELLITE 1: Top-Left (PyTorch ML) */}
      <motion.div
        style={{ x: satX, y: satY }}
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.08 }}
        className="absolute -top-3 -left-3 sm:-left-10 z-30 flex items-center gap-2 rounded-full border border-copper/50 bg-ink-raised/95 backdrop-blur-xl px-3.5 py-1.5 font-mono text-[11px] text-paper shadow-lg cursor-pointer transition-all hover:border-copper-bright hover:shadow-copper/20 hover:shadow-xl"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
        </span>
        <PytorchIcon size={14} />
        <span className="font-semibold text-copper-bright">PyTorch</span>
        <span className="text-slate text-[10px] hidden sm:inline">&lt;25ms</span>
      </motion.div>

      {/* SATELLITE 2: Top-Right (Dual-Track Merit) */}
      <motion.div
        style={{ x: satX, y: satY }}
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        whileHover={{ scale: 1.08 }}
        className="absolute top-5 -right-3 sm:-right-8 z-30 flex items-center gap-2 rounded-full border border-signal/50 bg-ink-raised/95 backdrop-blur-xl px-3.5 py-1.5 font-mono text-[11px] text-paper shadow-lg cursor-pointer transition-all hover:border-signal hover:shadow-signal/20 hover:shadow-xl"
      >
        <GraduationCap size={14} className="text-signal" />
        <span className="text-signal font-semibold">9.1 CGPA</span>
        <span className="text-slate text-[10px] hidden sm:inline">BVDU Pune</span>
      </motion.div>

      {/* SATELLITE 3: Bottom-Left (Next.js 16) */}
      <motion.div
        style={{ x: satX, y: satY }}
        animate={{ y: [3, -3, 3] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        whileHover={{ scale: 1.08 }}
        className="absolute bottom-16 -left-3 sm:-left-8 z-30 flex items-center gap-2 rounded-full border border-trace bg-ink-raised/95 backdrop-blur-xl px-3.5 py-1.5 font-mono text-[11px] text-paper shadow-lg cursor-pointer transition-all hover:border-copper/70 hover:shadow-xl"
      >
        <NextjsIcon size={14} />
        <span className="font-medium">Next.js 16</span>
        <span className="text-copper-bright text-[10px] hidden sm:inline">Turbopack</span>
      </motion.div>

      {/* SATELLITE 4: Bottom-Right (Shipped Systems) */}
      <motion.div
        style={{ x: satX, y: satY }}
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        whileHover={{ scale: 1.08 }}
        className="absolute -bottom-2 -right-3 sm:-right-8 z-30 flex items-center gap-2 rounded-full border border-copper/50 bg-ink-raised/95 backdrop-blur-xl px-3.5 py-1.5 font-mono text-[11px] text-paper shadow-lg cursor-pointer transition-all hover:border-copper-bright hover:shadow-copper/20 hover:shadow-xl"
      >
        <Sparkles size={13} className="text-copper-bright" />
        <span className="text-copper-bright font-semibold">7+ Shipped</span>
        <span className="text-slate text-[10px] hidden sm:inline">Production</span>
      </motion.div>

      {/* 3D Tilting Card Container with Clean Photo */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="relative w-[230px] h-[300px] sm:w-[260px] sm:h-[340px] lg:w-[275px] lg:h-[355px] shrink-0 rounded-3xl border border-trace bg-ink-raised overflow-hidden shadow-2xl transition-colors duration-300 hover:border-copper/80 cursor-pointer select-none"
      >
        <Image
          src={profile.avatar}
          alt={`${profile.name} Portrait`}
          fill
          priority
          sizes="(max-width: 640px) 230px, (max-width: 1024px) 260px, 275px"
          className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
        />
      </motion.div>
    </div>
  );
}

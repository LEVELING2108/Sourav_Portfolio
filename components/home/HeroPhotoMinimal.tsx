"use client";

import { useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { profile } from "@/app/data";

export default function HeroPhotoMinimal() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate motion values (-0.5 to 0.5 normalized from card center)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physical spring for 3D card tilt
  const springConfig = { stiffness: 280, damping: 22 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

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
    <div className="relative flex flex-col items-center lg:items-end [perspective:1200px]">
      {/* Ambient background glow behind portrait */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-copper/25 via-copper/10 to-transparent rounded-[36px] blur-2xl pointer-events-none -z-10 opacity-70" />

      {/* 3D Tilting Card Container - Pure clean frame, smooth cursor tilt physics */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="relative w-[240px] h-[310px] sm:w-[270px] sm:h-[350px] lg:w-[290px] lg:h-[370px] shrink-0 rounded-3xl border border-trace bg-ink-raised overflow-hidden shadow-2xl transition-colors duration-300 hover:border-copper/80 cursor-pointer select-none"
      >
        {/* Subtle Sci-Fi reticle corners */}
        <div className="absolute top-3 left-3 text-[11px] font-mono text-copper-bright/60 select-none pointer-events-none z-10">+</div>
        <div className="absolute top-3 right-3 text-[11px] font-mono text-copper-bright/60 select-none pointer-events-none z-10">+</div>
        <div className="absolute bottom-12 left-3 text-[11px] font-mono text-copper-bright/60 select-none pointer-events-none z-10">+</div>
        <div className="absolute bottom-12 right-3 text-[11px] font-mono text-copper-bright/60 select-none pointer-events-none z-10">+</div>

        {/* 100% Crisp, Pure Portrait Photo */}
        <Image
          src={profile.avatar}
          alt={`${profile.name} Portrait`}
          fill
          priority
          sizes="(max-width: 640px) 240px, (max-width: 1024px) 270px, 290px"
          className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
        />

        {/* Minimal Bottom Glass Telemetry Pill */}
        <div className="absolute bottom-2.5 inset-x-2.5 z-10 flex items-center justify-between rounded-xl border border-trace/80 bg-ink/80 backdrop-blur-md px-3 py-1.5 font-mono text-[10px] text-slate">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
            <span className="text-paper font-medium">SOURAV.DEV</span>
          </div>
          <span className="text-copper-bright/90 font-mono">18.52°N 73.85°E</span>
        </div>
      </motion.div>
    </div>
  );
}

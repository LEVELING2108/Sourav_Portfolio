"use client";

import { useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { profile } from "../data";

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
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="relative w-[240px] h-[310px] sm:w-[270px] sm:h-[350px] lg:w-[290px] lg:h-[370px] shrink-0 rounded-3xl border border-trace bg-ink-raised overflow-hidden shadow-md transition-colors duration-300 hover:border-copper/70 cursor-pointer select-none"
      >
        {/* 100% Crisp, Pure Portrait Photo - No overlays, no shadows, no color haze */}
        <Image
          src={profile.avatar}
          alt={`${profile.name} Portrait`}
          fill
          priority
          sizes="(max-width: 640px) 240px, (max-width: 1024px) 270px, 290px"
          className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
        />
      </motion.div>

      {/* Clean Status Line Below */}
      <div className="mt-3 flex items-center gap-2 font-mono text-xs text-slate">
        <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
        <span className="text-paper font-medium">Available for roles</span>
        <span className="text-trace">•</span>
        <span>Pune, IN</span>
      </div>
    </div>
  );
}

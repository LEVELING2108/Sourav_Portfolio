"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { profile } from "../data";
import { MapPin, Sparkles } from "lucide-react";

export default function HeroPhotoMinimal() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position inside card for spotlight and magnetic pull
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useMotionValue(150);
  const spotY = useMotionValue(200);

  const springPhysics = { stiffness: 220, damping: 20 };
  const magneticX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springPhysics);
  const magneticY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), springPhysics);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springPhysics);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springPhysics);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spotX.set(x);
    spotY.set(y);
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative flex justify-center lg:justify-end [perspective:1000px]">
      {/* Ambient Breathing Background Glow */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.75 : 0.4,
          scale: isHovered ? 1.06 : 0.96,
        }}
        transition={{ duration: 0.6 }}
        className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-copper/70 via-copper-bright/30 to-signal/50 blur-2xl pointer-events-none"
      />

      {/* Outer Spotlight Border Wrapper (Illuminates where cursor points) */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          x: magneticX,
          y: magneticY,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative p-[1.5px] rounded-[32px] overflow-hidden group cursor-pointer select-none transition-shadow duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
      >
        {/* Dynamic Cursor Spotlight Border */}
        <motion.div
          style={{
            background: useTransform(
              [spotX, spotY],
              ([x, y]) =>
                `radial-gradient(circle 240px at ${x}px ${y}px, #d97706 0%, rgba(79, 209, 197, 0.4) 40%, rgba(35, 42, 51, 0.3) 80%, transparent 100%)`
            ),
          }}
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-80 group-hover:opacity-100"
        />

        {/* Inner Card Frame */}
        <div className="relative z-10 w-[240px] h-[330px] sm:w-[270px] sm:h-[370px] lg:w-[290px] lg:h-[390px] rounded-[31px] bg-ink-raised overflow-hidden">
          {/* Portrait Image with subtle scale on hover */}
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={profile.avatar}
              alt={`${profile.name} Portrait`}
              fill
              priority
              sizes="(max-width: 640px) 240px, (max-width: 1024px) 270px, 290px"
              className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
            />

            {/* Subtle Gradient Vignette at base for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-90" />

            {/* Top Minimal Corner Chip */}
            <div className="absolute top-3.5 left-3.5 z-20">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-copper/40 bg-ink/80 backdrop-blur-md px-2.5 py-1 font-mono text-[10px] text-paper shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                <span>{profile.name}</span>
              </span>
            </div>

            {/* Bottom Glassmorphism Dock */}
            <div className="absolute bottom-3.5 inset-x-3.5 z-20 rounded-2xl border border-trace/80 bg-ink/85 backdrop-blur-md p-3 font-mono shadow-xl transition-all duration-300 group-hover:border-copper/60">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-paper tracking-tight">Full-Stack &amp; AI/ML</span>
                <Sparkles size={13} className="text-copper-bright" />
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-trace/60 pt-2 text-[10px] text-slate">
                <span className="flex items-center gap-1 text-signal font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal animate-ping" />
                  <span>Available for roles</span>
                </span>
                <span className="flex items-center gap-0.5 text-slate">
                  <MapPin size={10} className="text-copper" />
                  <span>Pune, IN</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

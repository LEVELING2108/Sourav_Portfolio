"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { profile } from "../data";

export default function HeroPhotoMinimal() {
  return (
    <div className="relative flex flex-col items-center lg:items-end">
      {/* Clean Frame Container - No outside glow, no color blobs */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="relative w-[240px] h-[310px] sm:w-[270px] sm:h-[350px] lg:w-[290px] lg:h-[370px] shrink-0 rounded-3xl border border-trace bg-ink-raised overflow-hidden shadow-sm transition-colors duration-300 hover:border-copper/60 select-none"
      >
        {/* Crystal Clear Portrait Photo - No overlays, no shadows, pure clarity */}
        <Image
          src={profile.avatar}
          alt={`${profile.name} Portrait`}
          fill
          priority
          sizes="(max-width: 640px) 240px, (max-width: 1024px) 270px, 290px"
          className="object-cover object-center transition-transform duration-500 ease-out hover:scale-105"
        />
      </motion.div>

      {/* Clean, Understated Status Pill Below Image */}
      <div className="mt-3 flex items-center gap-2 font-mono text-xs text-slate">
        <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
        <span className="text-paper font-medium">Available for roles</span>
        <span className="text-trace">•</span>
        <span>Pune, IN</span>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PreloaderStudio() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = "hidden";

    const duration = 3500; // Extended to 3.5s for comfortable inspection
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      // Eased count progression (fast start, smooth landing at 100)
      const easedProgress = Math.min(100, Math.floor(progress * 100));
      setCount(easedProgress);

      if (progress >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 600);
      }
    }, 20);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearInterval(interval);
        setIsLoading(false);
        document.body.style.overflow = "";
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  const handleSkip = () => {
    setIsLoading(false);
    document.body.style.overflow = "";
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader-studio"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-black p-8 sm:p-14 text-paper font-mono select-none overflow-hidden"
        >
          {/* Top Corner Telemetry */}
          <div className="flex items-center justify-between text-xs text-slate tracking-wider border-b border-white/10 pb-5">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-copper-bright animate-ping" />
              <span className="font-semibold text-paper">SOURAV SUMAN</span>
              <span className="text-slate/60 hidden sm:inline">• PORTFOLIO 2026</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[11px] text-slate hidden sm:inline font-sans">
                ECE &amp; IITM DATA SCIENCE
              </span>
              <button
                onClick={handleSkip}
                className="px-2.5 py-1 rounded border border-white/15 bg-white/5 text-[11px] text-slate hover:text-paper hover:border-copper/60 transition-colors cursor-pointer"
              >
                ESC / Skip
              </button>
            </div>
          </div>

          {/* Center Showcase: Monumental Minimalist Counter & Glowing Energy Trace */}
          <div className="my-auto w-full max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-copper-bright font-semibold">
                  // System Initialization
                </p>
                <h1 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-paper font-sans">
                  Crafting Production Systems &amp; AI
                </h1>
              </div>

              {/* Giant Elegant Monospace Percentage */}
              <div className="flex items-baseline">
                <span className="font-mono text-6xl sm:text-8xl lg:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-paper via-paper to-slate tabular-nums">
                  {count.toString().padStart(2, "0")}
                </span>
                <span className="font-mono text-2xl sm:text-4xl font-bold text-copper-bright ml-1">
                  %
                </span>
              </div>
            </div>

            {/* Glowing Razor-Sharp Copper PCB Trace Line */}
            <div className="relative w-full h-[2px] bg-white/10 overflow-visible rounded-full">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-copper via-copper-bright to-paper rounded-full"
                style={{ width: `${count}%` }}
              >
                {/* Glowing Energy Particle at the tip */}
                <div className="absolute right-0 -top-[3px] h-2 w-2 rounded-full bg-copper-bright shadow-[0_0_14px_4px_rgba(217,154,95,0.9)]" />
              </motion.div>
            </div>

            {/* Dynamic Status Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate font-mono pt-1">
              <div className="flex items-center gap-2">
                <span className="text-signal">●</span>
                <span>
                  {count < 30
                    ? "Mounting runtime architecture..."
                    : count < 65
                    ? "Calibrating PyTorch & Redis queues..."
                    : count < 95
                    ? "Linking Indian Railways & PWA modules..."
                    : "Environment Ready · Launching"}
                </span>
              </div>
              <span className="text-slate/60 text-[11px]">LAT: 18.52° N · LON: 73.85° E</span>
            </div>
          </div>

          {/* Bottom Footer Telemetry */}
          <div className="flex items-center justify-between border-t border-white/10 pt-5 text-xs text-slate/80">
            <div className="flex items-center gap-2">
              <span className="text-copper-bright font-bold">&gt;</span>
              <span>FULL-STACK &amp; APPLIED AI/ML</span>
            </div>
            <span className="text-[11px] text-slate/60">PUNE, IN · OPEN TO ROLES</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

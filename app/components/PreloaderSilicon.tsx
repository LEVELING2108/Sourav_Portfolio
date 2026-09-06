"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Zap, Activity, Radio } from "lucide-react";

export default function PreloaderSilicon() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scrolling while preloader is active
    document.body.style.overflow = "hidden";

    const duration = 3500; // 3.5s comfortable inspection time
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 600);
      }
    }, 25);

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
          key="preloader-silicon"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-black p-6 sm:p-12 text-paper font-mono select-none overflow-hidden"
        >
          {/* Background PCB Grid Matrix */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c1c21_1px,transparent_1px),linear-gradient(to_bottom,#1c1c21_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

          {/* Top Header Telemetry */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 text-xs text-slate">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-signal animate-ping" />
              <span className="text-paper font-semibold tracking-wider">
                SILICON_CORE // ARCHITECTURE INIT
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-copper-bright text-[11px]">
                ECE FOUNDATION × IITM DATA SCIENCE
              </span>
              <button
                onClick={handleSkip}
                className="px-2.5 py-1 rounded border border-white/15 bg-white/5 text-[11px] text-slate hover:text-paper hover:border-copper/60 transition-colors cursor-pointer"
              >
                ESC / Skip
              </button>
            </div>
          </div>

          {/* Center Stage: Glowing Silicon Microprocessor Core & Circuit Reticle */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center space-y-7 max-w-xl mx-auto">
            {/* The Central Silicon Chip Reticle */}
            <div className="relative flex items-center justify-center">
              {/* Outer Rotating HUD Radar Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute h-48 w-48 sm:h-56 sm:w-56 rounded-full border border-dashed border-copper/40"
              />

              {/* Inner Pulsing Radar Ring */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute h-36 w-36 sm:h-44 sm:w-44 rounded-full border border-signal/40 bg-signal/5"
              />

              {/* Radial Circuit Ray Lines Shooting Outward */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 sm:w-80 h-[1px] bg-gradient-to-r from-transparent via-copper/60 to-transparent" />
                <div className="h-64 sm:h-80 w-[1px] bg-gradient-to-b from-transparent via-signal/60 to-transparent absolute" />
              </div>

              {/* The Central Glowing Microprocessor Core */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(184,118,62,0.3)",
                    "0 0 45px rgba(217,154,95,0.7)",
                    "0 0 20px rgba(184,118,62,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-2xl border-2 border-copper bg-gradient-to-b from-[#18120d] via-black to-[#0d1618] z-10"
              >
                {/* Silicon Chip Corner Accents */}
                <span className="absolute -top-1 -left-1 h-2 w-2 border-t-2 border-l-2 border-copper-bright" />
                <span className="absolute -top-1 -right-1 h-2 w-2 border-t-2 border-r-2 border-copper-bright" />
                <span className="absolute -bottom-1 -left-1 h-2 w-2 border-b-2 border-l-2 border-copper-bright" />
                <span className="absolute -bottom-1 -right-1 h-2 w-2 border-b-2 border-r-2 border-copper-bright" />

                <div className="flex flex-col items-center gap-1">
                  <Cpu size={32} className="text-copper-bright animate-pulse" />
                  <span className="text-[9px] font-bold tracking-widest text-signal uppercase">
                    CORE.AI
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Typography: Status & Percentage Display */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs text-slate">
                <Zap size={14} className="text-copper-bright" />
                <span className="font-semibold text-paper tracking-wider">
                  {progress < 25
                    ? "POWERING ON SILICON REGISTERS..."
                    : progress < 50
                    ? "CALIBRATING ECE HARDWARE SIGNALS..."
                    : progress < 80
                    ? "ENGAGING APPLIED AI / ML PIPELINE (<25ms)..."
                    : progress < 100
                    ? "SYNCHRONIZING PRODUCTION ARCHITECTURE..."
                    : "ALL SYSTEMS ONLINE // READY"}
                </span>
              </div>

              {/* High-Resolution Monospace Counter */}
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-mono text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-paper via-paper to-copper-bright tabular-nums">
                  {progress.toString().padStart(2, "0")}
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-signal">
                  %
                </span>
              </div>

              {/* Sleek Dual-Tone Progress Track */}
              <div className="mx-auto w-64 sm:w-80 h-1.5 rounded-full bg-white/10 overflow-hidden p-0.5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-copper via-copper-bright to-signal shadow-[0_0_12px_rgba(79,209,197,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Hardware Telemetry Specs */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 text-[11px] text-slate/70 pt-1">
              <span>VOLTAGE: 1.2V NOMINAL</span>
              <span>•</span>
              <span className="text-signal">INFERENCE: &lt;25ms</span>
              <span>•</span>
              <span>FREQUENCY: 4.8GHz</span>
            </div>
          </div>

          {/* Bottom Footer Telemetry */}
          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate/70">
            <span className="flex items-center gap-1.5">
              <Activity size={13} className="text-signal" />
              <span>SOURAV SUMAN // PORTFOLIO SYSTEM</span>
            </span>
            <span className="text-[11px] text-slate/60">SIH &apos;25 · ROUND 2 CLEARED</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

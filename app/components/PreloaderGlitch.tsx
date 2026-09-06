"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderGlitchText } from "@/components/ui/loader-glitch-text";
import { Terminal, Activity } from "lucide-react";

export default function PreloaderGlitch() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [glitchWord, setGlitchWord] = useState("LOADING");

  useEffect(() => {
    // Lock scrolling while preloader is active
    document.body.style.overflow = "hidden";

    const duration = 3500; // 3.5s comfortable inspection time
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      // Morph glitch text across key phases
      if (pct < 35) {
        setGlitchWord("LOADING");
      } else if (pct < 75) {
        setGlitchWord("SOURAV SUMAN");
      } else if (pct < 98) {
        setGlitchWord("SYSTEM BOOT");
      } else {
        setGlitchWord("ONLINE // 100%");
      }

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 650);
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
          key="preloader-glitch"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-black p-6 sm:p-12 text-paper font-mono select-none overflow-hidden"
        >
          {/* Top Bar Telemetry */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs text-slate">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-copper-bright animate-ping" />
              <span className="text-paper font-semibold tracking-wider">
                PORTFOLIO_OS // 2026
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[11px] text-slate/80 hidden sm:inline">
                DUAL DEGREE: ECE + IITM DATA SCIENCE
              </span>
              <button
                onClick={handleSkip}
                className="px-2.5 py-1 rounded border border-white/15 bg-white/5 text-[11px] text-slate hover:text-paper hover:border-copper/60 transition-colors cursor-pointer"
              >
                ESC / Skip
              </button>
            </div>
          </div>

          {/* Center Stage: Cyberpunk Glitch Text Component */}
          <div className="my-auto max-w-3xl w-full mx-auto text-center space-y-7">
            <div className="flex items-center justify-center gap-2 text-xs text-copper-bright tracking-widest uppercase font-semibold">
              <Terminal size={14} />
              <span>// CYBERPUNK TELEMETRY BOOT</span>
            </div>

            {/* The Integrated LoaderGlitchText Component */}
            <div className="py-4">
              <LoaderGlitchText
                text={glitchWord}
                intensity="heavy"
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-widest text-paper select-none"
              />
            </div>

            {/* Dynamic Status Badges & Subtitle */}
            <div className="space-y-3 max-w-md mx-auto">
              <div className="flex items-center justify-between text-xs font-mono text-slate">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                  <span>
                    {progress < 30
                      ? "Initializing distributed runtime..."
                      : progress < 65
                      ? "Loading <25ms ML inference pipelines..."
                      : progress < 90
                      ? "Verifying Indian Railways SIH '25 module..."
                      : "All systems online · Launching"}
                  </span>
                </span>
                <span className="text-copper-bright font-bold tabular-nums">
                  {progress}%
                </span>
              </div>

              {/* Glowing Dual-Tone Progress Bar */}
              <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden p-0.5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-signal via-copper-bright to-copper shadow-[0_0_14px_rgba(217,154,95,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Footer Telemetry */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate/70">
            <div className="flex items-center gap-2">
              <Activity size={13} className="text-signal animate-pulse" />
              <span>FULL-STACK &amp; APPLIED AI/ML</span>
            </div>
            <span className="text-[11px] text-slate/60">PUNE, IN · OPEN TO ROLES</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

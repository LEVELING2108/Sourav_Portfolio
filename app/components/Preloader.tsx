"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

const BOOT_LOGS = [
  { text: "INITIALIZING KERNEL ENVIRONMENT...", status: "OK", color: "text-signal" },
  { text: "MOUNTING DISTRIBUTED RUNTIME & REDIS MUTEX...", status: "OK", color: "text-signal" },
  { text: "LOADING AI/ML INFERENCE ENGINE (<25ms)...", status: "OK", color: "text-copper-bright" },
  { text: "VERIFYING INDIAN RAILWAYS SIH '25 MODULE...", status: "OK", color: "text-signal" },
  { text: "STARTING SOURAV_SUMAN.SYS...", status: "READY", color: "text-copper-bright" },
];

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<number>(0);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Progress counter animation from 0 to 100 over ~1.6s
    const startTime = Date.now();
    const duration = 1600;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      // Reveal logs based on progress thresholds
      if (pct > 15) setVisibleLogs(1);
      if (pct > 35) setVisibleLogs(2);
      if (pct > 55) setVisibleLogs(3);
      if (pct > 75) setVisibleLogs(4);
      if (pct > 92) setVisibleLogs(5);

      if (pct >= 100) {
        clearInterval(interval);
        // Short pause at 100% before shutter exit
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 300);
      }
    }, 25);

    // Keyboard ESC to skip immediately
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
          key="preloader-terminal"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-black p-6 sm:p-12 text-paper font-mono select-none"
        >
          {/* Top Bar: Diagnostic Telemetry */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs text-slate">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
              <span className="text-paper font-semibold">BOOT_SEQUENCE // v2.6</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-slate/80">LATENCY: &lt;1ms</span>
              <button
                onClick={handleSkip}
                className="px-2 py-0.5 rounded border border-white/15 bg-white/5 text-[11px] text-slate hover:text-paper hover:border-copper/60 transition-colors cursor-pointer"
              >
                ESC to skip
              </button>
            </div>
          </div>

          {/* Center Console: Dynamic Terminal Output */}
          <div className="my-auto max-w-2xl w-full mx-auto space-y-4">
            <div className="flex items-center gap-2 text-copper-bright text-xs sm:text-sm">
              <Terminal size={16} />
              <span>root@sourav-suman:~$ ./initialize_portfolio.sh</span>
            </div>

            {/* Terminal Log Lines */}
            <div className="rounded-xl border border-white/10 bg-[#050505] p-5 sm:p-6 shadow-2xl space-y-2.5 text-xs sm:text-sm min-h-[190px]">
              {BOOT_LOGS.slice(0, visibleLogs).map((log, index) => (
                <motion.div
                  key={log.text}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 truncate text-slate">
                    <span className="text-slate/60 text-[11px]">0{index + 1}</span>
                    <span className="truncate text-paper">{log.text}</span>
                  </div>
                  <span className={`font-bold shrink-0 ${log.color}`}>
                    [{log.status}]
                  </span>
                </motion.div>
              ))}

              {visibleLogs < BOOT_LOGS.length && (
                <div className="flex items-center gap-2 text-slate/60 text-xs pt-1">
                  <span className="inline-block h-3 w-1.5 bg-copper-bright animate-pulse" />
                  <span>Processing subroutines...</span>
                </div>
              )}
            </div>

            {/* Progress Bar & Percentage */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate">SYSTEM LOAD PROGRESS</span>
                <span className="text-copper-bright font-bold text-sm">
                  {progress}%
                </span>
              </div>

              {/* Glowing Track Bar */}
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10 p-0.5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-signal via-copper-bright to-copper shadow-[0_0_12px_rgba(217,154,95,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Footer Telemetry */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4 text-[11px] text-slate/70">
            <span>FULL-STACK &amp; APPLIED AI/ML</span>
            <span className="text-paper/80 font-medium">SOURAV SUMAN // 2026</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type Theme = "paper" | "blueprint" | "root" | "classic";
const KEY = "sk-theme";

type Ctx = { theme: Theme; setTheme: (t: Theme) => void; toggle: () => void };
const ThemeCtx = createContext<Ctx | null>(null);

/** Inline this in <head> (see app/layout.tsx) so the saved theme applies before paint. */
export const themeBootScript = `try{var t=localStorage.getItem('${KEY}');if(t){document.documentElement.dataset.theme=t;if(t==='classic')document.documentElement.classList.add('light')}}catch(e){}`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("paper");
  const [sheet, setSheet] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const t = document.documentElement.dataset.theme as Theme | undefined;
    if (t === "blueprint" || t === "root" || t === "classic") {
      if (t === "classic") document.documentElement.classList.add("light");
      timers.current.push(window.setTimeout(() => setThemeState(t), 0));
    }
    const ts = timers.current;
    return () => ts.forEach(clearTimeout);
  }, []);

  /** A sheet of tracing paper slides down; the theme swaps while it covers the page. */
  const setTheme = useCallback((next: Theme) => {
    setSheet((n) => n + 1);
    timers.current.push(window.setTimeout(() => {
      document.documentElement.dataset.theme = next;
      if (next === "classic") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
      setThemeState(next);
      try { localStorage.setItem(KEY, next); } catch {}
    }, 380));
  }, []);

  const toggle = useCallback(() => setTheme(theme === "blueprint" ? "paper" : "blueprint"), [theme, setTheme]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, toggle }}>
      {children}
      <AnimatePresence>
        {sheet > 0 && (
          <motion.div
            key={sheet}
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[65] border-y-2 border-[#1F1D1A] bg-[rgba(240,236,226,.6)]"
            initial={{ y: "-102%" }}
            animate={{ y: ["-102%", "0%", "0%", "102%"] }}
            transition={{ duration: 0.82, times: [0, 0.45, 0.55, 1], ease: [0.65, 0, 0.35, 1] }}
            onAnimationComplete={() => setSheet(0)}
          />
        )}
      </AnimatePresence>
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  const c = useContext(ThemeCtx);
  if (!c) throw new Error("useTheme must be used inside <ThemeProvider>");
  return c;
}

/** Nav button: "☾ blueprint" ↔ "☀ paper". */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const bp = theme === "blueprint";
  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={bp ? "Switch to paper mode" : "Switch to blueprint mode"}
      whileHover={{ rotate: -3, y: -2 }}
      className="sk-box inline-flex min-h-11 items-center gap-2 bg-card px-3.5 text-[15px] font-bold text-ink cursor-pointer"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
        {bp ? (
          <>
            <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </>
        ) : (
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        )}
      </svg>
      {bp ? "paper" : "blueprint"}
    </motion.button>
  );
}

/** Nav button in Sketchbook mode to switch to the Original White/Light UI. */
export function ClassicToggle() {
  const { setTheme } = useTheme();
  return (
    <motion.button
      type="button"
      onClick={() => setTheme("classic")}
      aria-label="Switch to classic white theme"
      title="Switch to Original Theme (White Mode)"
      whileHover={{ rotate: 2, y: -2 }}
      className="sk-box-b inline-flex min-h-11 items-center gap-1.5 bg-card px-3.5 text-[15px] font-bold text-ink cursor-pointer"
    >
      ✦ classic
    </motion.button>
  );
}

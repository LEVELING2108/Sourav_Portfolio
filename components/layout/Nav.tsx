"use client";

import { useEffect, useState } from "react";
import { profile } from "@/app/data";
import { Sun, Moon, Search, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { label: "projects", href: "/projects" },
  { label: "stack", href: "/stack" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme === "light") {
      setTheme("light");
      document.documentElement.classList.add("light");
    } else {
      setTheme("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  const openSearch = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true })
    );
  };

  return (
    <header className="fixed top-2.5 sm:top-4 inset-x-0 z-50 flex justify-center px-2.5 sm:px-6 pointer-events-none">
      <nav className="pointer-events-auto mx-auto w-full max-w-5xl flex items-center justify-between gap-1.5 sm:gap-4 rounded-full border border-trace bg-ink-raised/85 backdrop-blur-xl px-2.5 sm:px-5 py-1.5 sm:py-2 shadow-[0_12px_36px_rgba(0,0,0,0.4)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.6)] transition-all">
        {/* Left: Brand Identity with Live Pulsing LED */}
        <Link
          href="/"
          className="flex items-center gap-1.5 sm:gap-2 group shrink-0 select-none py-1 pl-1"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
          </span>
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-tight text-paper group-hover:text-copper-bright transition-colors">
            <span className="text-signal">~/</span>
            {/* Show short name on very small screens, full name on sm+ */}
            <span className="hidden xs:inline">{profile.name.toLowerCase()}</span>
            <span className="xs:hidden">ss</span>
          </span>
        </Link>

        {/* Center: Navigation Links with Kinetic Sliding Pill */}
        <ul className="flex items-center gap-0.5 sm:gap-1.5 font-mono text-[11px] sm:text-xs">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <li key={l.href} className="relative">
                <Link
                  href={l.href}
                  className={`relative z-10 block px-2 sm:px-3 py-1 sm:py-1.5 transition-colors ${
                    isActive
                      ? "text-copper-bright font-semibold"
                      : "text-slate hover:text-paper"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="islandNavPill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      className="absolute inset-0 rounded-full bg-copper/15 border border-copper/35 -z-10 shadow-sm"
                    />
                  )}
                  <span>{l.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: Quick Search, Resume & Theme Toggle */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 pr-1">
          {/* Cmd+K Search Trigger Button */}
          <button
            onClick={openSearch}
            aria-label="Search site (Cmd + K)"
            title="Search (Cmd + K)"
            className="flex items-center gap-1.5 rounded-full border border-trace bg-ink/60 px-2 sm:px-2.5 py-1 font-mono text-[11px] text-slate hover:text-paper hover:border-copper/50 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Search size={12} className="text-copper-bright" />
            <span className="hidden md:inline text-[10px] text-slate/70">⌘K</span>
          </button>

          {/* Resume PDF Badge (Visible on screen width >= 480px) */}
          <a
            href={profile.resumeHref}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1 rounded-full border border-copper/60 bg-copper/10 px-3 py-1 font-mono text-[11px] text-copper-bright hover:bg-copper/20 transition-all active:scale-95"
          >
            <span>resume</span>
            <ArrowUpRight size={11} />
          </a>

          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label="Toggle Light/Dark Theme"
              title={
                theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
              className="flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-trace bg-ink-raised text-paper hover:text-copper-bright hover:border-copper/60 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              {theme === "dark" ? (
                <Sun size={13} className="text-copper-bright" />
              ) : (
                <Moon size={13} className="text-signal" />
              )}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

"use client";

import { profile } from "@/app/data";
import { Search, ArrowUpRight, Pencil } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "@/components/sketch/ThemeProvider";

const links = [
  { label: "projects", href: "/projects" },
  { label: "OSS", href: "/oss" },
  { label: "stack", href: "/stack" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  const openSearch = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true })
    );
  };

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-6 lg:px-8 pointer-events-none">
      <nav className="pointer-events-auto mx-auto w-full max-w-5xl lg:max-w-6xl flex items-center justify-between gap-2 sm:gap-4 rounded-full border border-trace/90 bg-ink-raised/90 backdrop-blur-xl px-3 sm:px-6 py-2 sm:py-2.5 shadow-[0_12px_36px_rgba(15,23,42,0.08)] transition-all">
        {/* Left: Brand Identity with Live Pulsing LED */}
        <Link
          href="/"
          className="flex items-center gap-1.5 sm:gap-2 group shrink-0 select-none py-0.5 pl-0.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
          </span>
          <span className="font-mono text-xs sm:text-sm md:text-base font-semibold tracking-tight text-paper group-hover:text-copper-bright transition-colors">
            <span className="text-signal">~/</span>
            <span className="hidden md:inline">{profile.name.toLowerCase()}</span>
            <span className="hidden xs:inline md:hidden">{profile.name.split(" ")[0].toLowerCase()}</span>
            <span className="xs:hidden">ss</span>
          </span>
        </Link>

        {/* Center: Navigation Links with Clean Active Indicator */}
        <ul className="flex items-center gap-0.5 sm:gap-1.5 font-mono text-xs sm:text-sm overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <li key={l.href} className="relative shrink-0">
                <Link
                  href={l.href}
                  className={`relative z-10 block px-2 xs:px-3 sm:px-3.5 py-1 sm:py-1.5 transition-colors whitespace-nowrap ${
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
                      className="absolute inset-0 rounded-full bg-copper/15 border border-copper/40 -z-10 shadow-sm"
                    />
                  )}
                  <span>{l.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: Quick Search, Resume & Switch Back to Sketchbook */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 pr-0.5">
          {/* Cmd+K Search Trigger Button */}
          <button
            onClick={openSearch}
            aria-label="Search site (Cmd + K)"
            title="Search (Cmd + K)"
            className="flex items-center justify-center gap-1.5 h-8 sm:h-9 px-2.5 sm:px-3 rounded-full border border-trace bg-ink/70 font-mono text-xs text-slate hover:text-paper hover:border-copper/50 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Search size={14} className="text-copper-bright" />
            <span className="hidden md:inline text-[11px] text-slate/75">⌘K</span>
          </button>

          {/* Resume PDF Badge */}
          <a
            href={profile.resumeHref}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 h-8 sm:h-9 px-3.5 rounded-full border border-copper/60 bg-copper/10 font-mono text-xs text-copper-bright hover:bg-copper/20 transition-all active:scale-95"
          >
            <span>resume</span>
            <ArrowUpRight size={12} />
          </a>

          {/* Switch Back to Sketchbook Theme */}
          <button
            type="button"
            onClick={() => setTheme("paper")}
            aria-label="Switch to Sketchbook Theme"
            title="Switch to Sketchbook Theme"
            className="inline-flex items-center justify-center gap-1.5 h-8 sm:h-9 px-3 rounded-full border border-copper/60 bg-ink-raised font-mono text-xs font-medium text-paper hover:text-copper-bright hover:border-copper transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Pencil size={13} className="text-copper-bright" />
            <span>sketch</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

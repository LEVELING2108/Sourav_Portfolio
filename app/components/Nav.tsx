"use client";

import { useEffect, useState } from "react";
import { profile } from "../data";
import { Sun, Moon } from "lucide-react";

const links = [
  { label: "log", href: "#projects" },
  { label: "stack", href: "#skills" },
  { label: "about", href: "#about" },
  { label: "contact", href: "#contact" },
];

export default function Nav() {
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

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-trace bg-ink/85 backdrop-blur transition-colors duration-300">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 py-3.5 font-mono text-sm">
        <a href="#top" className="text-paper hover:text-copper-bright transition-colors font-medium">
          <span className="text-signal">~/</span>
          {profile.name.toLowerCase()}
        </a>
        <ul className="flex items-center gap-4 sm:gap-6 text-slate">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-paper transition-colors">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.resumeHref}
              className="rounded border border-copper/60 px-3 py-1.5 text-copper-bright hover:bg-copper/10 transition-colors"
            >
              resume
            </a>
          </li>
          <li>
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle Light/Dark Theme"
                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className="flex items-center justify-center p-2 rounded-lg border border-trace bg-ink-raised text-paper hover:text-copper-bright hover:border-copper/50 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                {theme === "dark" ? (
                  <Sun size={16} className="text-copper-bright animate-pulse" />
                ) : (
                  <Moon size={16} className="text-signal" />
                )}
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}


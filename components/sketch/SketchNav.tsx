"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ClassicToggle, ThemeToggle, useTheme } from "./ThemeProvider";
import { SoundToggle, useSound } from "./SoundProvider";
import { PaperPlaneResume } from "./features";

const LINKS = [
  { href: "/projects", label: "work" },
  { href: "/oss", label: "open source" },
  { href: "/stack", label: "tech stack" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

export default function SketchNav() {
  const path = usePathname();
  const { play } = useSound();
  const { theme, setTheme } = useTheme();
  const [clicks, setClicks] = useState(0);

  const onLogoClick = () => {
    play("thock");
    const next = clicks + 1;
    if (next >= 5) {
      setTheme(theme === "root" ? "paper" : "root");
      setClicks(0);
    } else {
      setClicks(next);
    }
  };

  return (
    <motion.header className="mx-auto w-full max-w-[1240px] px-6 pt-7" initial={{ opacity: 0, y: -26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
      <nav aria-label="Main" className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/" onClick={onLogoClick} className="flex items-center gap-2.5 no-underline">
          <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden className="[animation:bob_4s_ease-in-out_infinite]">
            <path d="M17 3 L20.5 13 L31 13.5 L22.5 20 L25.5 30.5 L17 24.5 L8.5 30.5 L11.5 20 L3 13.5 L13.5 13 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <span className="font-hand text-[30px] font-bold">sourav.</span>
        </Link>
        <ul className="m-0 flex list-none flex-wrap items-center gap-[18px] p-0">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="navlink text-[17px]" aria-current={path?.startsWith(l.href) ? "page" : undefined} onMouseEnter={() => play("thock")}>{l.label}</Link>
            </li>
          ))}
          <li><PaperPlaneResume /></li>
          <li><SoundToggle /></li>
          <li><ThemeToggle /></li>
          <li><ClassicToggle /></li>
        </ul>
      </nav>
    </motion.header>
  );
}

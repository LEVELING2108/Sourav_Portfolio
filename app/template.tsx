"use client";

// Page-turn transition: on every route change a sheet of paper swings away
// from the left edge (like turning a notebook page), revealing the new page,
// whose title then writes itself in (see PAGE_INTRO in lib/motion.ts).
// The sheet is a CSS animation (.page-turn in globals.css) so the server and
// client render the same markup and the page still clears with scripting off.
import { useEffect } from "react";
import { useSound } from "@/components/sketch/SoundProvider";

export default function Template({ children }: { children: React.ReactNode }) {
  const { play } = useSound();
  useEffect(() => { play("page"); }, [play]);
  return (
    <>
      <div aria-hidden className="page-turn" />
      {children}
    </>
  );
}

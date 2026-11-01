"use client";

import { useTheme } from "@/components/sketch/ThemeProvider";
import { PencilRail } from "@/components/sketch/features";
import SketchNav from "@/components/sketch/SketchNav";
import SketchFooter from "@/components/sketch/SketchFooter";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/layout/CommandPalette";

export default function LayoutChrome({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  if (theme === "classic") {
    return (
      <>
        <Nav />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
        <CommandPalette />
      </>
    );
  }

  return (
    <>
      <PencilRail />
      <SketchNav />
      <div className="flex-1">{children}</div>
      <SketchFooter />
      <CommandPalette />
    </>
  );
}

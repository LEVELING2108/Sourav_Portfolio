import About from "@/components/about/About";
import Link from "next/link";
import { ArrowLeft, GraduationCap, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About & Academic Track // Sourav Suman",
  description: "Dual degree in Electronics & Communication (BVDU Pune) and Data Science (IIT Madras), SIH 2025 Round 2 Cleared.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 px-4 sm:px-6 pt-24 sm:pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 space-y-8">
          {/* Breadcrumb & Header */}
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-slate hover:text-copper-bright transition-colors"
            >
              <ArrowLeft size={13} />
              <span>cd ~/portfolio</span>
            </Link>

            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-trace pb-6">
              <div>
                <p className="font-mono text-xs sm:text-sm text-signal">
                  $ cat about.md &amp;&amp; cat education.log
                </p>
                <h1 className="mt-1 font-mono text-3xl sm:text-4xl font-bold text-paper">
                  Background &amp; Dual-Track
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-slate max-w-2xl font-sans">
                  The intersection of hardware systems (ECE) and computational intelligence (IIT Madras Data Science) — engineering software that withstands production stress.
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-slate">
                <span className="p-1 rounded bg-ink border border-trace text-copper-bright">
                  <GraduationCap size={14} />
                </span>
                <span>BVDU Pune × IIT Madras</span>
              </div>
            </div>
          </div>

          {/* About Component */}
          <About />
        </div>
      </main>
  );
}

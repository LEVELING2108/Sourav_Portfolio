import About from "@/components/about/About";
import Link from "next/link";
import { ArrowLeft, GraduationCap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About & Academic Track // Sourav Suman",
  description: "Dual degree in Electronics & Communication (BVDU Pune) and Data Science (IIT Madras), building AI/ML and distributed systems.",
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

            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-trace pb-5">
              <div>
                <h1 className="font-mono text-2xl sm:text-3xl font-bold text-paper">
                  Education &amp; Background
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate max-w-xl font-sans">
                  Dual-degree track across ECE (BVDU Pune · 9.1 CGPA) and Data Science (IIT Madras).
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

import SkillsMarquee from "@/components/stack/SkillsMarquee";
import Link from "next/link";
import { ArrowLeft, Cpu } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Stack & Architecture // Sourav Suman",
  description: "20 authentic brand technologies, distributed systems, PyTorch inference, and cloud infrastructure.",
};

export default function StackPage() {
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
                  $ cat /proc/cpuinfo &amp;&amp; uname -a
                </p>
                <h1 className="mt-1 font-mono text-3xl sm:text-4xl font-bold text-paper">
                  Stack &amp; Architecture
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-slate max-w-2xl font-sans">
                  The runtime layers, distributed frameworks, and AI toolchains used to build scalable production systems. Click any badge to inspect production solves and project proofs.
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-slate">
                <span className="p-1 rounded bg-ink border border-trace text-signal">
                  <Cpu size={13} />
                </span>
                <span>20 Production Technologies</span>
              </div>
            </div>
          </div>

          {/* Interactive Marquee & HUD Inspector */}
          <SkillsMarquee />
        </div>
      </main>
  );
}

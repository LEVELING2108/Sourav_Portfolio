import ProjectsHoloDeck from "@/components/projects/ProjectsHoloDeck";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, GitBranch, Layers } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Systems // Sourav Suman",
  description: "Production-grade systems, real-time ML pipelines, and distributed architectures.",
};

export default function ProjectsPage() {
  return (
    <main className="flex-1 px-4 sm:px-6 pt-24 sm:pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 space-y-12">
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
                $ git log --all --graph --decorate
              </p>
              <h1 className="mt-1 font-mono text-3xl sm:text-4xl font-bold text-paper">
                Systems &amp; Build Log
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate max-w-2xl font-sans">
                Deep technical case studies across real-time ML inference, high-concurrency Redis mutexes, and QR track verification pipelines.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-slate">
              <span className="p-1 rounded bg-ink border border-trace text-copper-bright">
                <Layers size={13} />
              </span>
              <span>Dedicated Systems Gallery</span>
            </div>
          </div>
        </div>

        {/* 3D Holo-Deck Showcase */}
        <ProjectsHoloDeck />

        {/* Upstream OSS Callout Banner */}
        <div className="pt-8 border-t border-trace">
          <div className="rounded-2xl border border-trace bg-ink-raised/80 p-6 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2 font-mono text-xs text-signal">
                <GitBranch size={13} />
                <span>$ git checkout upstream/main</span>
              </div>
              <h3 className="font-mono text-lg font-bold text-paper">
                Open Source Engineering (Laya · 18,000+ ★)
              </h3>
              <p className="text-xs sm:text-sm text-slate font-sans">
                Explore merged pull requests (#229, #257), ~33ms System-1 ModernBERT edge routing, and interactive git diffs in the dedicated OSS portal.
              </p>
            </div>
            <Link
              href="/oss"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-copper/20 border border-copper/40 text-copper-bright hover:bg-copper/30 transition-all font-mono text-xs font-semibold shadow-sm"
            >
              <span>Inspect OSS Diff &amp; Specs</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

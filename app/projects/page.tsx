import ProjectsHoloDeck from "@/components/projects/ProjectsHoloDeck";
import Link from "next/link";
import { ArrowLeft, GitBranch, Layers } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Systems // Sourav Suman",
  description: "Production-grade systems, SIH 2025 Indian Railways tracking, real-time ML pipelines, and distributed architectures.",
};

export default function ProjectsPage() {
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
                  $ git log --all --graph --decorate
                </p>
                <h1 className="mt-1 font-mono text-3xl sm:text-4xl font-bold text-paper">
                  Systems &amp; Build Log
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-slate max-w-2xl font-sans">
                  Deep technical case studies across real-time ML inference, high-concurrency Redis mutexes, QR track verification for Indian Railways (SIH 2025), and deployed PWAs.
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
        </div>
      </main>
  );
}

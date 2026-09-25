import GitDiffInspector from "@/components/projects/GitDiffInspector";
import Link from "next/link";
import { ArrowLeft, GitBranch } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Source Engineering // Sourav Suman",
  description:
    "Core open source contributions to Laya (18,000+ stars), LangChain & LangGraph System-1 non-autoregressive decision engine.",
};

export default function OssPage() {
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
                $ git log --upstream --graph --decorate
              </p>
              <h1 className="mt-1 font-mono text-3xl sm:text-4xl font-bold text-paper">
                Open Source Engineering
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate max-w-2xl font-sans">
                Core contributions to upstream AI frameworks, agentic decision engines, and high-performance inference pipelines. Official LangChain &amp; LangGraph integration in NandhaKishorM/laya.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-slate">
              <span className="p-1 rounded bg-ink border border-trace text-copper-bright">
                <GitBranch size={13} />
              </span>
              <span>18,000+ Stars Ecosystem</span>
            </div>
          </div>
        </div>

        {/* Dedicated Git Diff Inspector Component */}
        <GitDiffInspector />
      </div>
    </main>
  );
}

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, ArrowLeft } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime errors to observability service (e.g. Sentry/Datadog)
    console.error("Runtime exception caught by root ErrorBoundary:", error);
  }, [error]);

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-24">
      <div className="max-w-md w-full p-6 sm:p-8 rounded-2xl border border-red-500/30 bg-ink-raised shadow-xl text-center space-y-5">
        <div className="inline-flex p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
          <AlertTriangle size={28} />
        </div>
        <div className="space-y-2">
          <p className="font-mono text-xs text-red-400">500 // APPLICATION CRASH INTERCEPTED</p>
          <h1 className="font-mono text-2xl font-bold text-paper">
            Kernel Panic
          </h1>
          <p className="font-sans text-xs sm:text-sm text-slate leading-relaxed">
            An unhandled runtime exception occurred during pipeline rendering. State isolation prevented full app failure.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-xs">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-copper/60 bg-copper/10 text-copper-bright hover:bg-copper/20 transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw size={13} />
            <span>Re-execute</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-trace bg-ink text-slate hover:text-paper transition-all active:scale-95"
          >
            <ArrowLeft size={13} />
            <span>cd ~/</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-24">
      <div className="max-w-md w-full p-6 sm:p-8 rounded-2xl border border-trace bg-ink-raised shadow-xl text-center space-y-5">
        <div className="inline-flex p-3 rounded-xl bg-copper/10 border border-copper/30 text-copper-bright">
          <Terminal size={28} />
        </div>
        <div className="space-y-2">
          <p className="font-mono text-xs text-signal">HTTP 404 // ROUTE NOT FOUND</p>
          <h1 className="font-mono text-2xl sm:text-3xl font-bold text-paper">
            Null Reference
          </h1>
          <p className="font-sans text-xs sm:text-sm text-slate leading-relaxed">
            The requested subroute or memory address could not be resolved in this runtime environment.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-copper/60 bg-copper/10 font-mono text-xs text-copper-bright hover:bg-copper/20 transition-all active:scale-95"
          >
            <ArrowLeft size={13} />
            <span>cd ~/portfolio</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

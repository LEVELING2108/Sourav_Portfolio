import { profile } from "@/app/data";

export default function Footer() {
  return (
    <footer className="border-t border-trace px-4 sm:px-6 py-8">
      <div className="mx-auto flex max-w-7xl px-4 sm:px-8 lg:px-12 flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-slate">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </p>
        <p className="text-trace-line">// end of log</p>
      </div>
    </footer>
  );
}

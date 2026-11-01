import { profile } from "@/app/data";

export default function Footer() {
  return (
    <footer className="border-t border-trace bg-ink-raised/60 px-4 sm:px-6 py-6">
      <div className="mx-auto flex max-w-7xl px-4 sm:px-8 lg:px-12 flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-paper/85">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="text-trace">·</span>
          <span className="text-slate hidden sm:inline">Available for SWE &amp; AI roles</span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate hover:text-paper transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate hover:text-paper transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href={profile.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate hover:text-copper-bright transition-colors"
          >
            Resume ↗
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-slate hover:text-signal transition-colors"
          >
            Email
          </a>
          <span className="hidden md:inline text-slate/60 select-none">
            ⌘K
          </span>
        </div>
      </div>
    </footer>
  );
}

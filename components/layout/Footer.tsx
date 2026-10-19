import { profile } from "@/app/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-carbon/40 px-4 sm:px-6 py-6">
      <div className="mx-auto flex max-w-7xl px-4 sm:px-8 lg:px-12 flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-chalk/80">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="text-white/15">·</span>
          <span className="text-slate/70 hidden sm:inline">Available for SWE & AI roles</span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate hover:text-chalk transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate hover:text-chalk transition-colors"
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
            className="text-slate hover:text-cyan transition-colors"
          >
            Email
          </a>
          <span className="hidden md:inline text-slate/40 select-none">
            ⌘K
          </span>
        </div>
      </div>
    </footer>
  );
}


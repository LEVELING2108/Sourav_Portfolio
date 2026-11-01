import Link from "next/link";
import { profile } from "@/app/data";
import { CommandLine } from "./features";

// Footer from your Oct-19 commit, redrawn: availability dot, quick links,
// the `sudo` command line, and the ⌘K hint for your existing CommandPalette.
export default function SketchFooter() {
  return (
    <footer className="mx-auto flex w-full max-w-[1240px] flex-col gap-5 border-t-2 border-dashed border-muted px-6 pb-10 pt-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="inline-flex flex-wrap items-center gap-2.5 text-base">
          <span className="live-dot" aria-hidden />
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="font-hand text-2xl text-note">· available for SWE &amp; AI roles</span>
        </span>
        <CommandLine />
      </div>
      <div className="flex flex-wrap items-center gap-x-[22px] gap-y-1">
        <a className="navlink" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        <a className="navlink" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a className="navlink" href={profile.resumeHref} target="_blank" rel="noopener noreferrer">Resume ↗</a>
        <a className="navlink" href={`mailto:${profile.email}`}>Email</a>
        <Link className="navlink font-mono text-[13px]" href="/erased-page">(a broken link)</Link>
        <span className="flex-1" />
        <span className="inline-flex items-center gap-1.5 font-mono text-[13px] text-muted">press <kbd className="kbd">⌘</kbd><kbd className="kbd">K</kbd> to jump anywhere</span>
      </div>
    </footer>
  );
}

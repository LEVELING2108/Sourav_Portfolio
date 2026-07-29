"use client";

import Image from "next/image";
import { Terminal } from "lucide-react";

interface ProjectPreviewProps {
  image?: string;
  title: string;
  date?: string;
}

export default function ProjectPreview({
  image,
  title,
  date,
}: ProjectPreviewProps) {
  return (
    <div className="relative w-full h-[180px] sm:h-[210px] overflow-hidden rounded-2xl border border-trace/70 bg-ink shadow-inner group">
      {image ? (
        <Image
          src={image}
          alt={`${title} preview`}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 500px, 600px"
          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
        />
      ) : (
        <div className="p-4 font-mono text-xs text-slate h-full flex flex-col justify-between bg-gradient-to-br from-ink via-ink-raised to-ink">
          <div className="flex items-center justify-between text-copper-bright border-b border-trace/40 pb-2">
            <span className="flex items-center gap-1.5 font-medium">
              <Terminal size={14} />
              {title.toLowerCase().replace(/\s+/g, "_")}.config
            </span>
            <span className="text-[11px] text-slate">{date || "Build Log"}</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-1.5 py-4 text-center">
            <span className="text-sm font-semibold text-paper">{title}</span>
            <span className="text-[11px] text-slate font-mono">
              [ High-Res UI System Active ]
            </span>
          </div>
        </div>
      )}

      {/* Subtle Ambient Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

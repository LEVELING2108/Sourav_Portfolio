"use client";

interface ProgressIndicatorProps {
  currentIndex: number;
  total: number;
  onSelect: (index: number) => void;
}

export default function ProgressIndicator({
  currentIndex,
  total,
  onSelect,
}: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-between font-mono text-xs w-full max-w-2xl px-1">
      {/* Interactive Progress Dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIndex
                ? "w-7 bg-copper-bright shadow-[0_0_12px_rgba(184,118,62,0.6)]"
                : "w-2 bg-trace hover:bg-slate"
            }`}
            aria-label={`Jump to project ${idx + 1}`}
            title={`Project ${idx + 1}`}
          />
        ))}
      </div>

      {/* Progress Pill Counter */}
      <div className="rounded-full bg-ink border border-trace px-3 py-1 text-slate text-xs">
        <span className="text-copper-bright font-semibold">{currentIndex + 1}</span>
        <span className="mx-1 text-trace">/</span>
        <span className="text-paper">{total}</span> Projects
      </div>
    </div>
  );
}

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface DeckControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function DeckControls({ onPrev, onNext }: DeckControlsProps) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs">
      <button
        onClick={onPrev}
        aria-label="Previous Project"
        className="flex items-center gap-1.5 rounded-xl border border-trace bg-ink-raised px-4 py-2 text-paper hover:border-copper/60 hover:text-copper-bright transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
      >
        <ChevronLeft size={16} />
        <span>Previous</span>
      </button>

      <button
        onClick={onNext}
        aria-label="Next Project"
        className="flex items-center gap-1.5 rounded-xl bg-copper px-4.5 py-2 font-medium text-ink hover:bg-copper-bright transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
      >
        <span>Next Project</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

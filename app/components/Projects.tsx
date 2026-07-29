"use client";

import { useRef, useState } from "react";
import { projects } from "../data";
import ProjectFlashcard from "./ProjectFlashcard";
import ProjectDeck from "./ProjectDeck";
import TraceLine from "./TraceLine";
import { ChevronLeft, ChevronRight, LayoutGrid, Rows, Layers } from "lucide-react";

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const verticalRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<"deck" | "side-scroller" | "vertical">("deck");
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -460, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 460, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / Math.max(1, clientWidth * 0.8));
      setActiveIndex(Math.min(projects.length - 1, Math.max(0, index)));
    }
  };

  return (
    <section id="projects" className="px-4 sm:px-6 py-24 border-t border-trace">
      <div className="mx-auto max-w-6xl">
        {/* Section Header & Controls */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-sm text-slate">$ git log --oneline</p>
            <h2 className="mt-2 font-mono text-2xl sm:text-3xl font-bold text-paper">
              Build log
            </h2>
          </div>

          {/* View Mode Toggle & Arrow Controls */}
          <div className="flex items-center gap-3 font-mono text-xs">
            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg border border-trace bg-ink p-1">
              <button
                onClick={() => setViewMode("deck")}
                title="Apple 3D Deck Mode"
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 transition-all cursor-pointer ${
                  viewMode === "deck"
                    ? "bg-copper/20 text-copper-bright font-medium border border-copper/40"
                    : "text-slate hover:text-paper"
                }`}
              >
                <Layers size={13} />
                <span>3D Deck</span>
              </button>
              <button
                onClick={() => setViewMode("side-scroller")}
                title="Side Scroller Mode"
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 transition-all cursor-pointer ${
                  viewMode === "side-scroller"
                    ? "bg-copper/20 text-copper-bright font-medium border border-copper/40"
                    : "text-slate hover:text-paper"
                }`}
              >
                <LayoutGrid size={13} />
                <span>Side Scroller</span>
              </button>
              <button
                onClick={() => setViewMode("vertical")}
                title="Vertical Timeline Mode"
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 transition-all cursor-pointer ${
                  viewMode === "vertical"
                    ? "bg-copper/20 text-copper-bright font-medium border border-copper/40"
                    : "text-slate hover:text-paper"
                }`}
              >
                <Rows size={13} />
                <span>Timeline</span>
              </button>
            </div>

            {/* Side Scroller Prev / Next Buttons */}
            {viewMode === "side-scroller" && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleScrollLeft}
                  aria-label="Scroll left"
                  className="flex items-center justify-center p-2 rounded-lg border border-trace bg-ink-raised text-paper hover:border-copper/60 hover:text-copper-bright transition-all active:scale-95 cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleScrollRight}
                  aria-label="Scroll right"
                  className="flex items-center justify-center p-2 rounded-lg border border-trace bg-ink-raised text-paper hover:border-copper/60 hover:text-copper-bright transition-all active:scale-95 cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Render 3D Deck, Side Scroller, or Timeline depending on viewMode */}
        {viewMode === "deck" ? (
          <div className="mt-8">
            <ProjectDeck />
          </div>
        ) : viewMode === "side-scroller" ? (
          <div className="relative mt-8">
            {/* Horizontal Scroll Container */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 scrollbar-thin scrollbar-thumb-trace hover:scrollbar-thumb-copper scrollbar-track-ink transition-all"
            >
              {projects.map((p, idx) => (
                <div
                  key={p.version}
                  className="w-[88vw] sm:w-[580px] lg:w-[640px] shrink-0 snap-center"
                >
                  <div className="relative pt-6">
                    {/* PCB trace node & connector */}
                    <div className="flex items-center gap-2 mb-3 font-mono text-xs">
                      <span
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${
                          idx === activeIndex
                            ? "bg-copper ring-4 ring-copper/20 shadow-[0_0_12px_rgba(184,118,62,0.6)]"
                            : "bg-trace"
                        }`}
                      />
                      <span className="text-copper-bright font-bold">{p.version}</span>
                      <span className="text-trace">•</span>
                      <span className="text-slate">{p.date}</span>
                    </div>

                    <ProjectFlashcard project={p} />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Indicator Dots & Pill */}
            <div className="mt-4 flex items-center justify-between font-mono text-xs text-slate border-t border-trace/40 pt-4">
              <div className="flex items-center gap-2">
                {projects.map((p, idx) => (
                  <button
                    key={p.version}
                    onClick={() => {
                      if (scrollRef.current) {
                        scrollRef.current.scrollTo({
                          left: idx * 520,
                          behavior: "smooth",
                        });
                      }
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === activeIndex
                        ? "w-6 bg-copper-bright"
                        : "w-2 bg-trace hover:bg-slate"
                    }`}
                    title={`Jump to ${p.title}`}
                  />
                ))}
              </div>
              <span className="text-slate text-xs">
                Project <span className="text-paper font-semibold">{activeIndex + 1}</span> of{" "}
                <span className="text-paper font-semibold">{projects.length}</span>
              </span>
            </div>
          </div>
        ) : (
          /* Vertical Timeline Fallback Layout */
          <div ref={verticalRef} className="relative mt-14 pl-8 sm:pl-12">
            <TraceLine containerRef={verticalRef} />
            <ul className="space-y-12">
              {projects.map((p) => (
                <li key={p.version} className="relative">
                  <span
                    className="absolute -left-8 sm:-left-12 top-6 h-3 w-3 rounded-full bg-copper ring-4 ring-ink shadow-[0_0_10px_rgba(184,118,62,0.4)] transition-all duration-300 group-hover:bg-copper-bright"
                    aria-hidden="true"
                  />
                  <ProjectFlashcard project={p} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="font-mono text-sm text-slate">{eyebrow}</p>
      <h2 className="mt-2 font-mono text-2xl sm:text-3xl font-bold text-paper">
        {title}
      </h2>
    </div>
  );
}



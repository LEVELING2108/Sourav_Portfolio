"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { projects } from "../data";
import ProjectCard from "./ProjectCard";
import ProgressIndicator from "./ProgressIndicator";
import DeckControls from "./DeckControls";
import { Layers } from "lucide-react";

export default function ProjectDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalProjects = projects.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  }, [totalProjects]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalProjects - 1 : prev - 1));
  }, [totalProjects]);

  // Keyboard Navigation Listener (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const currentProject = projects[currentIndex];

  return (
    <div className="relative mx-auto w-full max-w-4xl flex flex-col items-center py-4">
      {/* Header Deck Info Bar */}
      <div className="w-full flex items-center justify-between font-mono text-xs text-slate mb-6 px-1">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-ink border border-trace text-copper-bright">
            <Layers size={15} />
          </span>
          <span className="text-paper font-semibold text-sm">Interactive Project Deck</span>
        </div>

        <DeckControls onPrev={handlePrev} onNext={handleNext} />
      </div>

      {/* Single Active 3D Project Card Container */}
      <div className="relative w-full min-h-[480px] sm:min-h-[520px] flex justify-center items-center">
        <AnimatePresence mode="wait">
          <ProjectCard
            key={currentProject.version}
            project={currentProject}
            onSwipeLeft={handleNext}
            onSwipeRight={handlePrev}
          />
        </AnimatePresence>
      </div>

      {/* Progress Indicator Dots & Pill */}
      <div className="mt-8 w-full pt-4 border-t border-trace/40">
        <ProgressIndicator
          currentIndex={currentIndex}
          total={totalProjects}
          onSelect={setCurrentIndex}
        />
      </div>
    </div>
  );
}

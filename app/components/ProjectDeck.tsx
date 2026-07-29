"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  // Visible Stack Subset (Top active card + next 2 depth cards)
  const visibleCards = [];
  for (let i = 0; i < Math.min(3, totalProjects); i++) {
    const projectIdx = (currentIndex + i) % totalProjects;
    visibleCards.push({
      project: projects[projectIdx],
      stackIndex: i,
    });
  }

  return (
    <div className="relative mx-auto w-full max-w-4xl flex flex-col items-center py-4">
      {/* Header Deck Info Bar */}
      <div className="w-full max-w-3xl flex items-center justify-between font-mono text-xs text-slate mb-6 px-1">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-lg bg-ink border border-trace text-copper-bright">
            <Layers size={14} />
          </span>
          <span className="text-paper font-semibold">Interactive Card Deck</span>
        </div>

        <DeckControls onPrev={handlePrev} onNext={handleNext} />
      </div>

      {/* 3D Stacked Card Container */}
      <div className="relative w-full max-w-3xl min-h-[520px] sm:min-h-[550px] flex justify-center items-start">
        <AnimatePresence mode="popLayout">
          {visibleCards.map(({ project, stackIndex }) => (
            <ProjectCard
              key={project.version}
              project={project}
              isTop={stackIndex === 0}
              stackIndex={stackIndex}
              totalCards={visibleCards.length}
              onNext={handleNext}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Progress Indicator Dots & Pill */}
      <div className="mt-8 w-full max-w-3xl pt-4 border-t border-trace/40">
        <ProgressIndicator
          currentIndex={currentIndex}
          total={totalProjects}
          onSelect={setCurrentIndex}
        />
      </div>
    </div>
  );
}

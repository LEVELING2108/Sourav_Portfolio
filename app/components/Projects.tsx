"use client";

import { useRef } from "react";
import { projects } from "../data";
import TraceLine from "./TraceLine";
import ProjectFlashcard from "./ProjectFlashcard";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" className="px-4 sm:px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="$ git log --oneline" title="Build log" />

        <div ref={containerRef} className="relative mt-14 pl-8 sm:pl-12">
          <TraceLine containerRef={containerRef} />

          <ul className="space-y-12">
            {projects.map((p) => (
              <li key={p.version} className="relative">
                {/* PCB trace / Git node marker */}
                <span
                  className="absolute -left-8 sm:-left-12 top-6 h-3 w-3 rounded-full bg-copper ring-4 ring-ink shadow-[0_0_10px_rgba(184,118,62,0.4)] transition-all duration-300 group-hover:bg-copper-bright"
                  aria-hidden="true"
                />
                
                {/* Project Flashcard Card */}
                <ProjectFlashcard project={p} />
              </li>
            ))}
          </ul>
        </div>
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


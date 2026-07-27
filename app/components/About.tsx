"use client";

import { motion } from "framer-motion";
import { education } from "../data";
import { SectionHeading } from "./Projects";

export default function About() {
  return (
    <section id="about" className="px-4 sm:px-6 py-24 border-t border-trace">
      <div className="mx-auto max-w-5xl grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <SectionHeading eyebrow="$ cat about.md" title="About" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mt-6 space-y-4 max-w-xl text-slate leading-relaxed"
          >
            <p>
              I&apos;m an engineer working across two degrees at once — Electronics
              &amp; Communication on one side, Data Science on the other — but my
              strengths and focus sit firmly in software: full-stack development
              and applied AI/ML.
            </p>
            <p>
              I lead{" "}
              <span className="text-paper">TEAM NEMESIS</span> alongside Manish
              Kumar and Aman Kumar, where we&apos;ve shipped hackathon-grade
              projects like ROADSoS. Outside of team projects, I build and ship
              solo — from LLM-powered tools to finance and trading applications.
            </p>
            <p className="text-paper/90">
              200+ LeetCode problems solved. Smart India Hackathon cleared.
              Currently through Stage 3 prep of Amazon ML Summer School 2026.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <p className="font-mono text-xs uppercase tracking-wide text-signal">
            education
          </p>
          {education.map((e) => (
            <div
              key={e.degree}
              className="rounded-lg border border-trace bg-ink-raised p-5"
            >
              <p className="font-mono text-sm text-paper">{e.degree}</p>
              <p className="mt-1 text-sm text-slate">{e.school}</p>
              <p className="mt-2 font-mono text-xs text-copper-bright">
                {e.detail}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

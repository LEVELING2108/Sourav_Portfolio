"use client";

import { motion } from "framer-motion";
import { education } from "../data";
import { SectionHeading } from "./Projects";
import EducationFlashcard from "./EducationFlashcard";

export default function About() {
  return (
    <section id="about" className="px-4 sm:px-6 py-24 border-t border-trace">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <SectionHeading eyebrow="$ cat about.md" title="About" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 space-y-4 max-w-xl text-slate leading-relaxed"
          >
            <p className="font-semibold text-paper text-base sm:text-lg border-l-2 border-copper pl-3 py-0.5">
              Two degrees, one brain, zero chill.
            </p>
            <p>
              Finishing ECE at <span className="text-paper">Bharati Vidyapeeth, Pune</span> while
              running a parallel questline in Data Science at <span className="text-paper">IIT Madras</span>.
              I build software that doesn&apos;t just work — it survives contact with real users, bad inputs, and 3am traffic spikes.
            </p>
            <p>
              Obsessed with the stuff tutorials skip: self-healing ML pipelines (<span className="text-copper-bright font-medium">FraudShield</span>),
              hunting down nasty Redis race conditions (<span className="text-copper-bright font-medium">ROADSoS</span>), and SIH 2025 R2 cleared rail tracking systems (<span className="text-copper-bright font-medium">RailTrack Pro</span>).
            </p>
            <p className="font-mono text-xs sm:text-sm text-copper-bright font-medium pt-2 border-t border-trace/60">
              Open to AI/ML &amp; full-stack roles — bring on the interesting problems.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <p className="font-mono text-xs uppercase tracking-wider text-signal font-semibold">
            // education &amp; academic log
          </p>
          <div className="space-y-4">
            {education.map((e) => (
              <EducationFlashcard key={e.degree} item={e} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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
              I&apos;m finishing up Electronics &amp; Communication Engineering
              at <span className="text-paper">Bharati Vidyapeeth, Pune</span>,
              while simultaneously running a parallel questline in Data Science
              &amp; Applications from <span className="text-paper">IIT Madras</span>.
              Somewhere in the overlap of these two very different syllabi, I
              figured out what actually gets me excited: building things that
              don&apos;t just work — they survive contact with reality, users, bad
              inputs, and 3am traffic spikes.
            </p>
            <p>
              I live at the intersection of AI/ML and full-stack engineering, and I
              have a soft spot for systems that fix themselves when nobody&apos;s
              watching. <span className="text-copper-bright font-medium">FraudShield</span> is a
              fraud-detection platform that self-heals when things go wrong.{" "}
              <span className="text-copper-bright font-medium">ROADSoS</span> involved
              hunting down a genuinely nasty Redis race condition until it stopped being
              nasty. <span className="text-copper-bright font-medium">RailTrack Pro</span> is an
              industrial rail-monitoring platform that cleared the Round 2 internal college hackathon for{" "}
              <span className="text-signal font-medium">Smart India Hackathon 2025</span>.
              The common thread? I&apos;m obsessed with the stuff most tutorials
              skip — observability, graceful failure, staying correct under load —
              because that&apos;s where projects actually live or die.
            </p>
            <p>
              When I step away from the keyboard, I&apos;m usually following
              whatever&apos;s new in the GenAI/agentic AI world, or rebuilding
              this very website for the nth time because I can never leave a good
              design alone.
            </p>
            <p className="font-mono text-xs sm:text-sm text-copper-bright font-medium pt-2 border-t border-trace/60">
              Currently open to opportunities in AI/ML and software engineering —
              bring on the interesting problems.
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
            // education & academic log
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


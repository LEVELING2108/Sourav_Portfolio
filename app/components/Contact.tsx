"use client";

import { motion } from "framer-motion";
import { profile } from "../data";
import { GitBranch, Link2, Mail } from "lucide-react";
import { SectionHeading } from "./Projects";

export default function Contact() {
  return (
    <section id="contact" className="px-4 sm:px-6 py-24 border-t border-trace">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="$ open contact" title="Let's talk" />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-xl text-slate leading-relaxed"
        >
          Open to full-stack and AI/ML roles — {profile.location}. If something
          in the log above is relevant to what you&apos;re building, reach out.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded bg-copper px-5 py-2.5 font-mono text-sm font-medium text-ink hover:bg-copper-bright transition-colors"
          >
            <Mail size={15} />
            Email
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded border border-trace px-5 py-2.5 font-mono text-sm text-paper hover:border-copper/60 transition-colors"
          >
            <GitBranch size={15} />
            GitHub
          </a>
          <a
            href="#" /* TODO: add LinkedIn URL */
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded border border-trace px-5 py-2.5 font-mono text-sm text-paper hover:border-copper/60 transition-colors"
          >
            <Link2 size={15} />
            LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}

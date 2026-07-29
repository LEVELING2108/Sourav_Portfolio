"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../data";
import { GitBranch, Mail, Copy, Check, FileText } from "lucide-react";
import { SectionHeading } from "./Projects";

function LinkedinIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
    </svg>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="relative px-4 sm:px-6 py-24 border-t border-trace">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <SectionHeading eyebrow="$ open contact" title="Let's talk" />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-xl text-slate leading-relaxed"
        >
          Open to full-stack and AI/ML roles — {profile.location}. If something
          in the log above is relevant to what you&apos;re building, reach out directly or copy my email below.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
        >
          {/* Send Email Mailto */}
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center justify-center gap-2 rounded bg-copper px-5 py-2.5 font-mono text-sm font-medium text-ink hover:bg-copper-bright transition-all active:scale-95 shadow-md"
          >
            <Mail size={15} />
            Email Me
          </a>

          {/* Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center justify-center gap-2 rounded border border-copper/60 bg-copper/10 px-5 py-2.5 font-mono text-sm text-copper-bright hover:bg-copper/20 transition-all active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={15} className="text-signal" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={15} />
                <span>Copy Email</span>
              </>
            )}
          </button>

          {/* GitHub Link */}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded border border-trace px-5 py-2.5 font-mono text-sm text-paper hover:border-copper/60 transition-all active:scale-95"
          >
            <GitBranch size={15} />
            GitHub
          </a>

          {/* LinkedIn Link */}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded border border-trace px-5 py-2.5 font-mono text-sm text-paper hover:border-copper/60 transition-all active:scale-95"
          >
            <LinkedinIcon size={15} className="text-signal" />
            LinkedIn
          </a>

          {/* Resume PDF Link */}
          <a
            href={profile.resumeHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded border border-copper/60 bg-copper/10 px-5 py-2.5 font-mono text-sm text-copper-bright hover:bg-copper/20 transition-all active:scale-95"
          >
            <FileText size={15} />
            Resume PDF
          </a>
        </motion.div>
      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-signal/60 bg-ink-raised/95 px-4 py-3 font-mono text-xs text-paper shadow-[0_8px_30px_rgba(79,209,197,0.2)] backdrop-blur"
          >
            <span className="p-1 rounded-full bg-signal/20 text-signal">
              <Check size={14} />
            </span>
            <div>
              <p className="font-semibold text-paper">Email Copied to Clipboard!</p>
              <p className="text-[11px] text-slate">{profile.email}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


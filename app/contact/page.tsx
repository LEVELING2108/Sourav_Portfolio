import Contact from "@/components/contact/Contact";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Collab // Sourav Suman",
  description: "Get in touch with Sourav Suman for full-stack and AI/ML opportunities.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 px-4 sm:px-6 pt-24 sm:pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 space-y-8">
          {/* Breadcrumb & Header */}
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-slate hover:text-copper-bright transition-colors"
            >
              <ArrowLeft size={13} />
              <span>cd ~/portfolio</span>
            </Link>

            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-trace pb-6">
              <div>
                <p className="font-mono text-xs sm:text-sm text-signal">
                  $ ssh -i ~/.ssh/id_rsa sourav@pune
                </p>
                <h1 className="mt-1 font-mono text-3xl sm:text-4xl font-bold text-paper">
                  Initialize Channel
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-slate max-w-2xl font-sans">
                  Available for full-time full-stack and AI/ML engineering roles, high-concurrency systems development, and production challenges.
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-slate">
                <span className="p-1 rounded bg-ink border border-trace text-signal">
                  <Mail size={13} />
                </span>
                <span>Open to Roles · Remote / Pune</span>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <Contact />
        </div>
      </main>
  );
}

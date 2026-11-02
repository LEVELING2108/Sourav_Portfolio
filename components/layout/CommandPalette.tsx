"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { profile, projects } from "@/app/data";
import { useTheme } from "@/components/sketch/ThemeProvider";
import { useSound } from "@/components/sketch/SoundProvider";
import {
  Search,
  Terminal,
  ArrowRight,
  Copy,
  Check,
  GitBranch,
  Code2,
  X,
  Sun,
  Moon,
} from "lucide-react";

type CommandItem = {
  id: string;
  category: "Navigation" | "Theme" | "Action" | "Projects";
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  action: () => void;
};

export default function CommandPalette() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { play } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle on Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setQuery("");
        setSelectedIndex(0);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, []);

  const commandItems = useMemo<CommandItem[]>(() => {
    const items: CommandItem[] = [
      {
        id: "nav-home",
        category: "Navigation",
        title: "Go to Home",
        subtitle: "Back to the sketchbook cover",
        icon: Terminal,
        action: () => {
          router.push("/");
          setIsOpen(false);
        },
      },
      {
        id: "nav-projects",
        category: "Navigation",
        title: "Go to Selected Work",
        subtitle: "View all 8 shipped systems & case studies",
        icon: Terminal,
        action: () => {
          router.push("/projects");
          setIsOpen(false);
        },
      },
      {
        id: "nav-oss",
        category: "Navigation",
        title: "Go to Open Source",
        subtitle: "Laya (33k+ ★) — 9 PRs across LangChain, LlamaIndex, CrewAI & .NET",
        icon: GitBranch,
        action: () => {
          router.push("/oss");
          setIsOpen(false);
        },
      },
      {
        id: "nav-skills",
        category: "Navigation",
        title: "Go to Tech Stack",
        subtitle: "Explore 20+ production tools & system architecture flow",
        icon: Code2,
        action: () => {
          router.push("/stack");
          setIsOpen(false);
        },
      },
      {
        id: "nav-about",
        category: "Navigation",
        title: "Go to Education & About",
        subtitle: "Dual-degree (BVDU Pune · 9.04 CGPA × IIT Madras) & timeline",
        icon: Terminal,
        action: () => {
          router.push("/about");
          setIsOpen(false);
        },
      },
      {
        id: "nav-contact",
        category: "Navigation",
        title: "Go to Contact",
        subtitle: "Fold a paper-plane note or reach out directly",
        icon: Terminal,
        action: () => {
          router.push("/contact");
          setIsOpen(false);
        },
      },
      {
        id: "theme-classic",
        category: "Theme",
        title:
          theme === "classic"
            ? "Switch to Sketchbook Theme ✎"
            : "Switch to Classic White Theme ✦",
        subtitle:
          theme === "classic"
            ? "Return to the hand-drawn notebook portfolio"
            : "Original portfolio design in crisp White / Light mode",
        icon: theme === "classic" ? Moon : Sun,
        action: () => {
          setTheme(theme === "classic" ? "paper" : "classic");
          setIsOpen(false);
        },
      },
      {
        id: "theme-toggle",
        category: "Theme",
        title:
          theme === "blueprint"
            ? "Switch to Paper Mode ☀"
            : "Switch to Blueprint Mode ☾",
        subtitle: "Flip the tracing-paper sheet between warm paper and blueprint",
        icon: theme === "blueprint" ? Sun : Moon,
        action: () => {
          setTheme(theme === "blueprint" ? "paper" : "blueprint");
          setIsOpen(false);
        },
      },
      {
        id: "theme-sudo",
        category: "Theme",
        title:
          theme === "root" ? "exit — Leave Root Mode" : "sudo — Secret Root Mode",
        subtitle: "Phosphor-green terminal override",
        icon: Terminal,
        action: () => {
          setTheme(theme === "root" ? "paper" : "root");
          setIsOpen(false);
        },
      },
      {
        id: "action-copy-email",
        category: "Action",
        title: "Copy Email Address",
        subtitle: profile.email,
        icon: Copy,
        action: () => {
          handleCopyEmail();
        },
      },
      {
        id: "action-github",
        category: "Action",
        title: "Open GitHub Profile",
        subtitle: profile.github,
        icon: GitBranch,
        action: () => {
          window.open(profile.github, "_blank");
          setIsOpen(false);
        },
      },
      {
        id: "action-linkedin",
        category: "Action",
        title: "Open LinkedIn Profile",
        subtitle: profile.linkedin,
        icon: ArrowRight,
        action: () => {
          window.open(profile.linkedin, "_blank");
          setIsOpen(false);
        },
      },
    ];

    // Append Projects to command list with direct Case Study navigation
    projects.forEach((proj) => {
      items.push({
        id: `proj-${proj.slug}`,
        category: "Projects",
        title: `${proj.title} (${proj.version})`,
        subtitle: `Case Study — ${proj.tag} · ${proj.stack.slice(0, 4).join(", ")}`,
        icon: Terminal,
        action: () => {
          router.push(`/projects/${proj.slug}`);
          setIsOpen(false);
        },
      });
    });

    return items;
  }, [handleCopyEmail, router, setTheme, theme]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return commandItems;
    const q = query.toLowerCase();
    return commandItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query, commandItems]);

  const handleKeyDownInput = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? Math.max(0, filteredItems.length - 1) : prev - 1
      );
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      play("thock");
      filteredItems[selectedIndex].action();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-24 px-3 sm:px-4 bg-black/45 backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="sk-box hatch relative w-full max-w-2xl overflow-hidden bg-card text-ink max-h-[85vh] flex flex-col"
          >
            {/* Header Search Bar */}
            <div className="flex items-center border-b-2 border-dashed border-muted px-4 py-3.5 font-mono text-sm shrink-0">
              <Search size={16} className="text-accent mr-3 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDownInput}
                placeholder="Search pages, case studies, commands (try sudo)..."
                className="w-full bg-transparent text-ink placeholder:text-muted focus:outline-none font-mono text-sm"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 text-muted hover:text-ink mr-1 cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="kbd cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Toast message if email copied */}
            {copied && (
              <div className="bg-[var(--accent-soft)] border-b-2 border-dashed border-ink px-4 py-2 font-mono text-xs text-ink flex items-center gap-2">
                <Check size={14} />
                <span>Email copied to clipboard ({profile.email})</span>
              </div>
            )}

            {/* Items List */}
            <div className="max-h-[380px] overflow-y-auto p-3 font-mono text-xs">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-muted">
                  <p className="font-hand text-2xl text-note m-0">
                    nothing in the notebook matches &ldquo;{query}&rdquo;
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {filteredItems.map((item, idx) => {
                    const IconComp = item.icon;
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          play("thock");
                          item.action();
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl transition text-left cursor-pointer border-2 ${
                          isSelected
                            ? "bg-[var(--accent-soft)] border-ink text-ink"
                            : "text-body hover:bg-paper border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`p-1.5 rounded-lg border-[1.5px] border-ink ${
                              isSelected
                                ? "bg-accent text-[var(--on-accent)]"
                                : "bg-paper text-ink"
                            }`}
                          >
                            <IconComp size={14} />
                          </span>
                          <div className="truncate">
                            <p className="font-bold text-ink truncate m-0 text-[13px]">
                              {item.title}
                            </p>
                            {item.subtitle && (
                              <p className="text-[11px] text-muted truncate font-sans mt-0.5 mb-0">
                                {item.subtitle}
                              </p>
                            )}
                          </div>
                        </div>
                        <span className="chip shrink-0 ml-2">
                          {item.category}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Hint */}
            <div className="flex items-center justify-between border-t-2 border-dashed border-muted px-4 py-2.5 font-mono text-[11px] text-muted bg-paper">
              <span className="flex items-center gap-2">
                <span>Use</span>
                <kbd className="kbd">↑</kbd>
                <kbd className="kbd">↓</kbd>
                <span>to navigate</span>
              </span>
              <span className="flex items-center gap-2">
                <kbd className="kbd">↵</kbd>
                <span>to open</span>
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

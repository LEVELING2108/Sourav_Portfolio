"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile, projects } from "../data";
import {
  Search,
  Terminal,
  ArrowRight,
  Copy,
  Check,
  GitBranch,
  Code2,
  X,
} from "lucide-react";

type CommandItem = {
  id: string;
  category: "Navigation" | "Action" | "Projects" | "Stack";
  title: string;
  subtitle?: string;
  icon: any;
  action: () => void;
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle on Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
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
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const commandItems = useMemo<CommandItem[]>(() => {
    const items: CommandItem[] = [
      {
        id: "nav-projects",
        category: "Navigation",
        title: "Go to Build Log ($ git log)",
        subtitle: "View versioned projects v1.0 - v1.6",
        icon: Terminal,
        action: () => {
          window.location.hash = "#projects";
          setIsOpen(false);
        },
      },
      {
        id: "nav-skills",
        category: "Navigation",
        title: "Go to Stack & Architecture",
        subtitle: "Explore skills & 7-axis radar mesh",
        icon: Code2,
        action: () => {
          window.location.hash = "#skills";
          setIsOpen(false);
        },
      },
      {
        id: "nav-about",
        category: "Navigation",
        title: "Go to About Me",
        subtitle: "Read dual-degree & engineering bio",
        icon: Terminal,
        action: () => {
          window.location.hash = "#about";
          setIsOpen(false);
        },
      },
      {
        id: "nav-contact",
        category: "Navigation",
        title: "Go to Contact",
        subtitle: "Reach out for AI/ML & Full-Stack roles",
        icon: Terminal,
        action: () => {
          window.location.hash = "#contact";
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

    // Append Projects to command list
    projects.forEach((proj) => {
      items.push({
        id: `proj-${proj.version}`,
        category: "Projects",
        title: `${proj.title} (${proj.version})`,
        subtitle: `${proj.tag} — ${proj.stack.join(", ")}`,
        icon: Terminal,
        action: () => {
          window.location.hash = "#projects";
          setIsOpen(false);
        },
      });
    });

    return items;
  }, []);

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
      filteredItems[selectedIndex].action();
    }
  };

  return (
    <>
      {/* Fixed Trigger Pill at bottom-left */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-1.5 sm:gap-2 rounded-full border border-trace bg-ink-raised/90 backdrop-blur-md px-2.5 py-1.5 sm:px-3.5 sm:py-2 font-mono text-xs text-paper shadow-lg hover:border-copper/60 hover:text-copper-bright transition-all cursor-pointer group"
      >
        <span className="p-1 rounded-md bg-ink border border-trace text-signal group-hover:text-copper-bright">
          <Terminal size={13} />
        </span>
        <span className="hidden sm:inline">Command Palette</span>
        <kbd className="rounded border border-trace bg-ink px-1.5 py-0.5 text-[10px] text-slate">
          ⌘K
        </kbd>
      </motion.button>

      {/* Modal Backdrop & Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-24 px-3 sm:px-4 bg-ink/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-trace bg-ink-raised shadow-[0_16px_70px_rgba(0,0,0,0.6)] max-h-[85vh] flex flex-col"
            >
              {/* Header Search Bar */}
              <div className="flex items-center border-b border-trace px-4 py-3 font-mono text-sm shrink-0">
                <Search size={16} className="text-signal mr-3 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDownInput}
                  placeholder="Search commands, projects, stack..."
                  className="w-full bg-transparent text-paper placeholder:text-slate focus:outline-none font-mono text-sm"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="p-1 text-slate hover:text-paper mr-1"
                  >
                    <X size={14} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded border border-trace px-2 py-1 text-[11px] text-slate hover:text-paper"
                >
                  ESC
                </button>
              </div>

              {/* Toast message if email copied */}
              {copied && (
                <div className="bg-signal/15 border-b border-signal/40 px-4 py-2 font-mono text-xs text-signal flex items-center gap-2">
                  <Check size={14} />
                  <span>Email copied to clipboard ({profile.email})</span>
                </div>
              )}

              {/* Items List */}
              <div className="max-h-[380px] overflow-y-auto p-2 font-mono text-xs">
                {filteredItems.length === 0 ? (
                  <div className="py-12 text-center text-slate">
                    <p>No matching commands found for &quot;{query}&quot;</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredItems.map((item, idx) => {
                      const IconComp = item.icon;
                      const isSelected = idx === selectedIndex;
                      return (
                        <button
                          key={item.id}
                          onClick={item.action}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-all text-left cursor-pointer ${
                            isSelected
                              ? "bg-copper/15 border border-copper/40 text-paper"
                              : "text-slate hover:bg-ink hover:text-paper border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className={`p-1.5 rounded-md border ${
                                isSelected
                                  ? "bg-copper text-ink border-copper-bright"
                                  : "bg-ink border-trace text-signal"
                              }`}
                            >
                              <IconComp size={14} />
                            </span>
                            <div className="truncate">
                              <p
                                className={`font-medium truncate ${
                                  isSelected ? "text-paper" : "text-paper/90"
                                }`}
                              >
                                {item.title}
                              </p>
                              {item.subtitle && (
                                <p className="text-[11px] text-slate truncate font-sans mt-0.5">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>
                          </div>
                          <span className="text-[10px] rounded border border-trace/60 px-2 py-0.5 text-slate uppercase shrink-0">
                            {item.category}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer Hint */}
              <div className="flex items-center justify-between border-t border-trace px-4 py-2.5 font-mono text-[11px] text-slate bg-ink/50">
                <span className="flex items-center gap-2">
                  <span>Use</span>
                  <kbd className="rounded border border-trace bg-ink px-1 py-0.5 text-[10px]">
                    ↑
                  </kbd>
                  <kbd className="rounded border border-trace bg-ink px-1 py-0.5 text-[10px]">
                    ↓
                  </kbd>
                  <span>to navigate</span>
                </span>
                <span className="flex items-center gap-2">
                  <kbd className="rounded border border-trace bg-ink px-1 py-0.5 text-[10px]">
                    ↵
                  </kbd>
                  <span>to select</span>
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

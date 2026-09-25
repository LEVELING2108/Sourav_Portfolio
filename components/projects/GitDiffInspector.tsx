"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitPullRequest,
  GitMerge,
  ChevronDown,
  ArrowUpRight,
  Code2,
  Terminal,
  FileCode,
  Copy,
  Check,
  ExternalLink,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Network,
} from "lucide-react";

type PatchItem = {
  id: string;
  repo: string;
  prNumber: number;
  releaseVersion: string;
  date: string;
  title: string;
  diffStats: { additions: number; deletions: number; filesChanged: number };
  targetFile: string;
  diffHeader: string;
  hunkHeader: string;
  diffLines: { type: "add" | "del" | "ctx"; text: string; oldLine?: number; newLine?: number }[];
  solveSummary: string;
  prUrl: string;
  repoUrl: string;
  stack: string[];
};

const LAYA_METRICS = [
  {
    label: "Decision Latency",
    value: "~33 ms",
    subtext: "~40x speedup from ~1,500ms autoregressive LLMs",
    icon: Zap,
    highlight: "text-amber-400",
  },
  {
    label: "Inference Nature",
    value: "Zero Hallucination",
    subtext: "Deterministic, non-autoregressive ModernBERT forward pass",
    icon: ShieldCheck,
    highlight: "text-emerald-400",
  },
  {
    label: "Upstream Scale",
    value: "18,000+ ★",
    subtext: "Shipped official LangChain & LangGraph integration",
    icon: Sparkles,
    highlight: "text-copper-bright",
  },
  {
    label: "Code Contribution",
    value: "+911 / -4 lines",
    subtext: "2 merged pull requests into v0.3.8+ release",
    icon: GitMerge,
    highlight: "text-cyan-400",
  },
];

const ARCHITECTURE_HIGHLIGHTS = [
  {
    title: "Sub-35ms Conditional Edge Routing (LayaRouter)",
    desc: "Replaces token-by-token LLM branching in LangGraph state graphs with a single ~33ms classification pass. Implements statistical Shannon-entropy confidence gating with automated fallback routing when decisions are ambiguous.",
    tag: "LangGraph",
  },
  {
    title: "Zero-Latency Prompt Guardrails (LayaGuardrail)",
    desc: "Inline screening pipeline detecting prompt injections, toxic vectors, and jailbreak payloads in real time prior to triggering compute-heavy frontier foundation models.",
    tag: "Security",
  },
  {
    title: "Multi-Label Ticket Triage Node (LayaTriage)",
    desc: "Extracts intent, urgency level, user frustration score, and churn risk simultaneously within a single forward pass, replacing multi-prompt LLM cascades.",
    tag: "Inference",
  },
  {
    title: "Dual-Mode Execution Architecture",
    desc: "Engineered seamless execution across both local in-process GPU/CPU inference and lightweight remote HTTP server calls (laya-serve) with zero external client dependencies.",
    tag: "Systems",
  },
];

const PATCHES: PatchItem[] = [
  {
    id: "patch-pr-229",
    repo: "NandhaKishorM/laya",
    prNumber: 229,
    releaseVersion: "v0.3.8+",
    date: "Feb 2025",
    title: "feat(integrations): add LangChain and LangGraph routing and guardrails",
    diffStats: { additions: 866, deletions: 1, filesChanged: 3 },
    targetFile: "laya/integrations/langchain.py",
    diffHeader: "diff --git a/laya/integrations/langchain.py b/laya/integrations/langchain.py",
    hunkHeader: "@@ -0,0 +1,118 @@ class LayaRouter(RunnableSerializable):",
    solveSummary:
      "Integrated official Laya System-1 decision engine into LangGraph & LangChain: sub-35ms conditional edge routing with Shannon-entropy confidence gating and zero-latency prompt guardrails.",
    prUrl: "https://github.com/NandhaKishorM/laya/pull/229",
    repoUrl: "https://github.com/NandhaKishorM/laya",
    stack: ["Python", "LangGraph", "LangChain", "ModernBERT", "PyTorch"],
    diffLines: [
      { type: "add", text: "+from typing import Any, Dict, List, Optional, Union", newLine: 1 },
      { type: "add", text: "+import torch", newLine: 2 },
      { type: "add", text: "+from langchain_core.runnables import RunnableSerializable, RunnableConfig", newLine: 3 },
      { type: "add", text: "+from laya.engine import LayaEngine, DecisionOutput", newLine: 4 },
      { type: "add", text: "+", newLine: 5 },
      { type: "add", text: "+class LayaRouter(RunnableSerializable[Dict[str, Any], str]):", newLine: 6 },
      { type: "add", text: "+    \"\"\"LangGraph conditional edge router evaluated in a single ~33ms forward pass.\"\"\"", newLine: 7 },
      { type: "add", text: "+    model_name: str = \"laya/modernbert-router-v1\"", newLine: 8 },
      { type: "add", text: "+    routes: List[str]", newLine: 9 },
      { type: "add", text: "+    entropy_threshold: float = 0.85", newLine: 10 },
      { type: "add", text: "+    fallback_route: str = \"human_fallback\"", newLine: 11 },
      { type: "add", text: "+", newLine: 12 },
      { type: "add", text: "+    def invoke(self, state: Dict[str, Any], config: Optional[RunnableConfig] = None) -> str:", newLine: 13 },
      { type: "add", text: "+        prompt = self._extract_state_input(state)", newLine: 14 },
      { type: "add", text: "+        logits = self._engine.forward_logits(prompt)  # ~33ms ModernBERT pass", newLine: 15 },
      { type: "add", text: "+        probs = torch.softmax(logits, dim=-1)", newLine: 16 },
      { type: "add", text: "+        # Shannon-entropy confidence gating to eliminate hallucinations", newLine: 17 },
      { type: "add", text: "+        entropy = -torch.sum(probs * torch.log2(probs + 1e-9)).item()", newLine: 18 },
      { type: "add", text: "+        if entropy > self.entropy_threshold:", newLine: 19 },
      { type: "add", text: "+            logger.warning(f\"High decision entropy ({entropy:.3f}); routing to fallback: {self.fallback_route}\")", newLine: 20 },
      { type: "add", text: "+            return self.fallback_route", newLine: 21 },
      { type: "add", text: "+        return self.routes[int(torch.argmax(logits, dim=-1))]", newLine: 22 },
      { type: "add", text: "+", newLine: 23 },
      { type: "add", text: "+class LayaGuardrail(RunnableSerializable[str, Dict[str, Any]]):", newLine: 24 },
      { type: "add", text: "+    \"\"\"Zero-latency inline prompt screening for jailbreak and injection prevention.\"\"\"", newLine: 25 },
      { type: "add", text: "+    threshold: float = 0.90", newLine: 26 },
      { type: "add", text: "+    def invoke(self, text: str, config: Optional[RunnableConfig] = None) -> Dict[str, Any]:", newLine: 27 },
      { type: "add", text: "+        risk_score = self._engine.classify_security_risk(text)", newLine: 28 },
      { type: "add", text: "+        return {\"allowed\": risk_score < self.threshold, \"risk_score\": risk_score}", newLine: 29 },
    ],
  },
  {
    id: "patch-pr-257",
    repo: "NandhaKishorM/laya",
    prNumber: 257,
    releaseVersion: "v0.3.8+",
    date: "Feb 2025",
    title: "fix(integrations): LangGraph packaging & remote laya-serve client decoupling",
    diffStats: { additions: 45, deletions: 3, filesChanged: 2 },
    targetFile: "pyproject.toml",
    diffHeader: "diff --git a/pyproject.toml b/pyproject.toml",
    hunkHeader: "@@ -42,6 +42,9 @@ dependencies = [",
    solveSummary:
      "Decoupled heavy local PyTorch dependencies from lightweight remote HTTP execution (laya-serve) and standardized optional LangGraph dependency packaging.",
    prUrl: "https://github.com/NandhaKishorM/laya/pull/257",
    repoUrl: "https://github.com/NandhaKishorM/laya",
    stack: ["Python", "Packaging", "REST APIs", "AsyncIO"],
    diffLines: [
      { type: "ctx", text: " [project.optional-dependencies]", oldLine: 42, newLine: 42 },
      { type: "del", text: "-langchain = [\"langchain-core>=0.2.0\"]", oldLine: 43 },
      { type: "add", text: "+langchain = [", newLine: 43 },
      { type: "add", text: "+    \"langchain-core>=0.2.0\",", newLine: 44 },
      { type: "add", text: "+    \"langgraph>=0.2.0\",", newLine: 45 },
      { type: "add", text: "+]", newLine: 46 },
      { type: "add", text: "+remote = [\"httpx>=0.27.0\"]", newLine: 47 },
      { type: "ctx", text: " ", oldLine: 44, newLine: 48 },
      { type: "ctx", text: " # laya/integrations/langchain.py: dual-mode dispatch", oldLine: 45, newLine: 49 },
      { type: "del", text: "-        self._engine = LayaLocalEngine(model=self.model_name)", oldLine: 46 },
      { type: "add", text: "+        if self.remote_endpoint:", newLine: 50 },
      { type: "add", text: "+            self._client = LayaHttpClient(base_url=self.remote_endpoint)", newLine: 51 },
      { type: "add", text: "+        else:", newLine: 52 },
      { type: "add", text: "+            self._engine = LayaLocalEngine(model=self.model_name)", newLine: 53 },
    ],
  },
];

export default function GitDiffInspector() {
  const [activeTab, setActiveTab] = useState<"diff" | "architecture">("diff");
  const [expandedId, setExpandedId] = useState<string | null>("patch-pr-229");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCopyDiff = (patch: PatchItem) => {
    const raw =
      `${patch.diffHeader}\n${patch.hunkHeader}\n` +
      patch.diffLines.map((l) => l.text).join("\n");
    navigator.clipboard.writeText(raw);
    setCopiedId(patch.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 font-mono text-xs text-signal">
          <Terminal size={14} />
          <span>$ git log --graph --stat --author=&quot;LEVELING2108&quot; --repo=&quot;NandhaKishorM/laya&quot;</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-mono text-xl sm:text-2xl font-bold text-paper flex items-center gap-2.5">
              <span>Open Source Engineering</span>
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-copper/15 border border-copper/30 text-copper-bright">
                Core Contributor
              </span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate max-w-3xl">
              Official LangChain &amp; LangGraph System-1 integration shipped to{" "}
              <a
                href="https://github.com/NandhaKishorM/laya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper hover:text-copper-bright underline underline-offset-4 decoration-copper/40"
              >
                NandhaKishorM/laya (18,000+ GitHub Stars)
              </a>
              . Deterministic non-autoregressive decision classification evaluated in ~33ms.
            </p>
          </div>

          {/* Mode Switcher: Git Diff vs Architecture */}
          <div className="flex items-center p-1 rounded-lg bg-ink border border-trace font-mono text-xs">
            <button
              onClick={() => setActiveTab("diff")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activeTab === "diff"
                  ? "bg-copper/20 text-copper-bright border border-copper/40 font-semibold"
                  : "text-slate hover:text-paper"
              }`}
            >
              <Code2 size={13} />
              <span>Git Diff Inspector</span>
            </button>
            <button
              onClick={() => setActiveTab("architecture")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activeTab === "architecture"
                  ? "bg-copper/20 text-copper-bright border border-copper/40 font-semibold"
                  : "text-slate hover:text-paper"
              }`}
            >
              <Network size={13} />
              <span>System-1 Specs</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Telemetry Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
        {LAYA_METRICS.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div
              key={i}
              className="p-3.5 rounded-xl border border-trace bg-ink-raised/60 backdrop-blur-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-slate/70 mb-2">
                <span className="text-[11px] uppercase tracking-wider">{metric.label}</span>
                <Icon size={14} className={metric.highlight} />
              </div>
              <div>
                <div className={`text-base sm:text-lg font-bold ${metric.highlight}`}>
                  {metric.value}
                </div>
                <div className="text-[10px] text-slate/80 leading-tight mt-1">
                  {metric.subtext}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Architecture Highlights Tab */}
      <AnimatePresence mode="wait">
        {activeTab === "architecture" && (
          <motion.div
            key="architecture-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* The Problem & Solution Statement Card */}
            <div className="rounded-2xl border border-trace bg-ink-raised/90 p-5 sm:p-6 backdrop-blur-md space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-2">
                  <span className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider">
                    The Problem
                  </span>
                  <p className="text-xs sm:text-sm text-paper/90 leading-relaxed font-sans">
                    Traditional multi-agent systems built on LangGraph/LangChain waste{" "}
                    <strong className="text-rose-300">1 to 2 seconds</strong> generating tokens just to decide which tool or subagent to branch to, introducing severe latency bottlenecks, non-deterministic branching, and massive LLM API bills.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
                  <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                    The Solution (Laya Integration)
                  </span>
                  <p className="text-xs sm:text-sm text-paper/90 leading-relaxed font-sans">
                    Contributed the official LangChain &amp; LangGraph integration to{" "}
                    <strong className="text-emerald-300">Laya</strong>, an open-source non-autoregressive System-1 decision engine. Evaluates typed decisions (choice, score, noul) in a{" "}
                    <strong className="text-emerald-300">single ~33ms forward pass</strong> with mathematical zero hallucination.
                  </p>
                </div>
              </div>

              {/* 4 Pillars */}
              <div className="pt-2">
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate mb-3">
                  Key Engineering Contributions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ARCHITECTURE_HIGHLIGHTS.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-trace bg-ink/70 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-mono text-xs font-semibold text-paper">
                            {item.title}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-ink border border-trace text-copper-bright">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs text-slate/90 leading-relaxed font-sans">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-trace/70 font-mono text-xs">
                <a
                  href="https://github.com/NandhaKishorM/laya/pull/229"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-copper/20 border border-copper/40 text-copper-bright hover:bg-copper/30 transition-all font-semibold"
                >
                  <GitPullRequest size={13} />
                  <span>Merged PR #229 (+866 lines)</span>
                  <ArrowUpRight size={12} />
                </a>

                <a
                  href="https://github.com/NandhaKishorM/laya/pull/257"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink border border-trace text-paper hover:border-copper/40 transition-all"
                >
                  <GitPullRequest size={13} />
                  <span>Merged PR #257 (+45 lines)</span>
                  <ArrowUpRight size={12} />
                </a>

                <a
                  href="https://github.com/NandhaKishorM/laya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink border border-trace text-slate hover:text-paper transition-all ml-auto"
                >
                  <span>Laya Repository (18,000+ ★)</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Git Graph Stream (Diff Inspector) */}
      <div className="relative rounded-2xl border border-trace bg-ink-raised/90 backdrop-blur-md overflow-hidden shadow-2xl">
        {/* Top Terminal Strip */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-ink border-b border-trace/70 font-mono text-[11px] text-slate">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-slate/70">
              upstream/main · git diff --stat --unified=3
            </span>
          </div>
          <div className="flex items-center gap-2 text-copper-bright text-[10px]">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>2 upstream pull requests merged</span>
          </div>
        </div>

        {/* Patch List Rows */}
        <div className="divide-y divide-trace/60">
          {PATCHES.map((patch) => {
            const isExpanded = expandedId === patch.id;
            const isCopied = copiedId === patch.id;

            return (
              <div key={patch.id} className="transition-colors hover:bg-ink/40">
                {/* Monoline Commit Bar */}
                <div
                  onClick={() => toggleExpand(patch.id)}
                  className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 p-3.5 sm:p-4 cursor-pointer select-none font-mono text-xs transition-all"
                >
                  {/* Left: Graph node & repo */}
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    {/* Git Graph Node Indicator */}
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                    </span>

                    {/* Repository Name */}
                    <span className="text-paper font-semibold hover:text-copper-bright transition-colors shrink-0">
                      {patch.repo}
                    </span>

                    {/* PR Number */}
                    <span className="text-slate/80 text-[11px] shrink-0">
                      #{patch.prNumber}
                    </span>

                    {/* Diff Stat Tag */}
                    <span className="hidden xs:inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded bg-ink border border-trace shrink-0">
                      <span className="text-emerald-400">+{patch.diffStats.additions}</span>
                      <span className="text-rose-400">-{patch.diffStats.deletions}</span>
                    </span>

                    {/* Commit Message / Title (Truncated on small screens) */}
                    <span className="text-slate hidden md:inline truncate max-w-md font-sans text-xs">
                      {patch.title}
                    </span>
                  </div>

                  {/* Right: Date, Stack pill, and Expand Chevron */}
                  <div className="flex items-center gap-2.5 shrink-0 ml-auto font-mono text-xs">
                    <span className="text-slate/70 text-[11px] hidden sm:inline">{patch.releaseVersion}</span>

                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold uppercase">
                      merged
                    </span>

                    <div className="flex items-center gap-1 text-slate group-hover:text-paper text-[11px]">
                      <span className="hidden sm:inline">{isExpanded ? "collapse" : "view diff"}</span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={14} />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Expanded Inline Unified Git Diff Panel */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-trace/70 bg-ink/90"
                    >
                      {/* Diff Header Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-b border-trace/60 bg-ink-raised/60 font-mono text-[11px] text-slate">
                        <div className="flex items-center gap-2 truncate">
                          <FileCode size={13} className="text-copper-bright shrink-0" />
                          <span className="text-paper/90 truncate">{patch.targetFile}</span>
                          <span className="text-slate/50 text-[10px]">
                            ({patch.diffStats.filesChanged} {patch.diffStats.filesChanged === 1 ? "file" : "files"} changed)
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {/* Copy diff button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyDiff(patch);
                            }}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-trace bg-ink text-slate hover:text-paper hover:border-copper/50 transition-all cursor-pointer text-[10px]"
                            title="Copy raw unified diff patch"
                          >
                            {isCopied ? (
                              <>
                                <Check size={11} className="text-emerald-400" />
                                <span className="text-emerald-400">copied patch</span>
                              </>
                            ) : (
                              <>
                                <Copy size={11} />
                                <span>copy diff</span>
                              </>
                            )}
                          </button>

                          {/* Direct PR link */}
                          <a
                            href={patch.prUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-copper/20 border border-copper/40 text-copper-bright hover:bg-copper/30 transition-all text-[10px] font-semibold"
                          >
                            <span>GitHub PR #{patch.prNumber}</span>
                            <ArrowUpRight size={10} />
                          </a>
                        </div>
                      </div>

                      {/* Engineering Solve Brief */}
                      <div className="px-4 py-2 bg-copper/5 border-b border-trace/40 text-xs font-mono text-copper-bright/90 flex items-start gap-2">
                        <Terminal size={12} className="shrink-0 mt-0.5 text-copper" />
                        <span>{patch.solveSummary}</span>
                      </div>

                      {/* Unified Diff Viewport */}
                      <div className="p-3 sm:p-4 overflow-x-auto font-mono text-[11px] sm:text-xs leading-relaxed select-text bg-[#030303] text-paper">
                        <div className="text-slate/60 pb-1 text-[10px]">{patch.diffHeader}</div>
                        <div className="text-cyan-400/80 pb-1.5 font-bold text-[11px]">{patch.hunkHeader}</div>

                        <div className="space-y-0.5">
                          {patch.diffLines.map((line, lIdx) => (
                            <div
                              key={lIdx}
                              className={`flex items-start rounded-xs px-1.5 py-0.5 ${
                                line.type === "add"
                                  ? "bg-emerald-500/15 text-emerald-300 font-medium"
                                  : line.type === "del"
                                  ? "bg-rose-500/15 text-rose-300 font-medium"
                                  : "text-slate/85"
                              }`}
                            >
                              {/* Line numbers */}
                              <span className="w-8 shrink-0 text-slate/40 text-[10px] select-none text-right pr-2">
                                {line.oldLine || ""}
                              </span>
                              <span className="w-8 shrink-0 text-slate/40 text-[10px] select-none text-right pr-3">
                                {line.newLine || ""}
                              </span>
                              {/* Code Text */}
                              <span className="whitespace-pre font-mono">{line.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Diff Footer: Stack Tags */}
                      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-t border-trace/60 bg-ink-raised/50 font-mono text-[11px]">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-slate/60 text-[10px] uppercase">Tech Stack:</span>
                          {patch.stack.map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded bg-ink border border-trace text-slate text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>

                        <a
                          href={patch.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-slate hover:text-copper-bright inline-flex items-center gap-1 text-[11px] transition-colors"
                        >
                          <span>NandhaKishorM/laya (18k+ ★)</span>
                          <ExternalLink size={10} />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

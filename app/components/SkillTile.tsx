"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Terminal,
  Cpu,
  Layers,
  Palette,
  Server,
  Zap,
  Database,
  ShieldCheck,
  Network,
  Activity,
  Box,
  GitBranch,
  Cloud,
  Globe,
  BrainCircuit,
  Sparkles,
  Workflow,
  Bot,
  FileCode,
  Flame,
  Binary,
  Share2,
} from "lucide-react";

// Minimal unified icon mapping
function getSkillIcon(name: string) {
  const n = name.toLowerCase();
  const iconClass = "text-slate group-hover:text-copper-bright transition-colors duration-300";
  
  if (n.includes("python")) return <Terminal className={iconClass} size={14} />;
  if (n.includes("java") && !n.includes("script")) return <FileCode className={iconClass} size={14} />;
  if (n.includes("c++")) return <Binary className={iconClass} size={14} />;
  if (n.includes("typescript") || n.includes("javascript")) return <Code2 className={iconClass} size={14} />;
  
  if (n.includes("react") || n.includes("next")) return <Layers className={iconClass} size={14} />;
  if (n.includes("html") || n.includes("css") || n.includes("tailwind")) return <Palette className={iconClass} size={14} />;

  if (n.includes("node") || n.includes("express") || n.includes("fastapi") || n.includes("flask") || n.includes("rest"))
    return <Server className={iconClass} size={14} />;

  if (n.includes("postgres") || n.includes("mysql") || n.includes("mongo") || n.includes("redis"))
    return <Database className={iconClass} size={14} />;

  if (n.includes("jwt")) return <ShieldCheck className={iconClass} size={14} />;
  if (n.includes("websocket") || n.includes("caching") || n.includes("rate limit") || n.includes("distributed"))
    return <Network className={iconClass} size={14} />;

  if (n.includes("docker") || n.includes("git")) return <Box className={iconClass} size={14} />;
  if (n.includes("aws") || n.includes("gcp") || n.includes("vercel") || n.includes("render") || n.includes("ci/cd"))
    return <Cloud className={iconClass} size={14} />;

  if (n.includes("pytorch") || n.includes("scikit") || n.includes("hugging") || n.includes("rag") || n.includes("lang"))
    return <BrainCircuit className={iconClass} size={14} />;

  return <Sparkles className={iconClass} size={14} />;
}

export default function SkillTile({ skill }: { skill: string }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative flex items-center gap-2 rounded-lg border border-trace bg-ink-raised px-3 py-1.5 font-mono text-xs text-paper/90 transition-all duration-300 hover:border-copper/60 hover:bg-ink-raised/95 hover:text-paper hover:shadow-[0_4px_16px_rgba(184,118,62,0.12)] cursor-pointer select-none"
    >
      <span className="flex items-center justify-center">
        {getSkillIcon(skill)}
      </span>
      <span>{skill}</span>
    </motion.div>
  );
}


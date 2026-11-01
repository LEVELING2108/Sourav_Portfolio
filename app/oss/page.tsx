import type { Metadata } from "next";
import SketchOSS from "@/components/projects/SketchOSS";

export const metadata: Metadata = {
  title: "Open Source",
  description:
    "Core contributions to NandhaKishorM/laya (33k+ stars) — sub-35ms tool calling, agent routing, and runtime patches.",
};

export default function OssPage() {
  return <SketchOSS />;
}

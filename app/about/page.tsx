import type { Metadata } from "next";
import SketchAbout from "@/components/about/SketchAbout";

export const metadata: Metadata = {
  title: "Education & background — Sourav Suman",
  description:
    "Dual-degree track across ECE (BVDU Pune · 9.04 CGPA) and Data Science (IIT Madras), building AI/ML and distributed systems.",
};

export default function AboutPage() {
  return <SketchAbout />;
}

import type { Metadata } from "next";
import SketchProjects from "@/components/projects/SketchProjects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Eight shipped systems across applied AI, real-time ML pipelines, and full-stack web applications.",
};

export default function ProjectsPage() {
  return <SketchProjects />;
}

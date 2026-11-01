import type { Metadata } from "next";
import SketchStack from "@/components/stack/SketchStack";

export const metadata: Metadata = {
  title: "Tech Stack",
  description: "Deep learning engines, full-stack runtimes, and cloud infrastructure.",
};

export default function StackPage() {
  return <SketchStack />;
}

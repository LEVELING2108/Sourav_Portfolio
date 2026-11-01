import type { Metadata } from "next";
import SketchContact from "@/components/contact/SketchContact";

export const metadata: Metadata = {
  title: "Contact — Sourav Suman",
  description:
    "Direct line for full-stack & AI/ML roles, advisory and collaborations. Replies within a day · Pune / remote.",
};

export default function ContactPage() {
  return <SketchContact />;
}

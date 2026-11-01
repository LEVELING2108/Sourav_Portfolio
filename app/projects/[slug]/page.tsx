import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/app/data";
import SketchCaseStudy from "@/components/projects/SketchCaseStudy";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Case Study" };
  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <SketchCaseStudy slug={slug} />;
}

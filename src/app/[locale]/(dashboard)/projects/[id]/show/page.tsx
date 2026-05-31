"use client";

import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { useParams } from "next/navigation";

export default function ShowProjectPage() {
  const { id } = useParams<{ id: string }>();
  return <ProjectCard id={id} />;
}

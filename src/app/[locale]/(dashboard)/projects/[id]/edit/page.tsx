// src/app/[locale]/(dashboard)/projects/[id]/edit/page.tsx
"use client";

import { ProjectForm } from "@/features/projects/components/ProjectForm";
import { useParams } from "next/navigation";

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  return <ProjectForm action="edit" id={id} />;
}

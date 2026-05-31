"use client";

import { TaskForm } from "@/features/tasks/components/TaskForm";
import { useParams } from "next/navigation";

export default function EditTaskPage() {
  const { id } = useParams<{ id: string }>();
  return <TaskForm action="edit" id={id} />;
}

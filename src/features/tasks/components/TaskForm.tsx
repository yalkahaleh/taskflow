"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema, TaskFormValues } from "../schemas/task.schema";
import { HttpError } from "@refinedev/core";
import { useProjects } from "@/features/projects/hooks/useProjects";

interface TaskFormProps {
  action: "create" | "edit";
  id?: string;
}

export function TaskForm({ action, id }: TaskFormProps) {
  const t = useTranslations("tasks");
  const { projects } = useProjects();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    refineCore: { formLoading, onFinish },
  } = useForm<TaskFormValues, HttpError, TaskFormValues>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      project_id: "",
      assignee_id: "",
      due_date: "null",
    },
    refineCoreProps: {
      resource: "tasks",
      action,
      id,
      redirect: "list",
    },
  });

  const buttonLabel = () => {
    if (isSubmitting || formLoading) {
      return action === "create" ? "Creating..." : "Saving...";
    }
    return action === "create" ? t("create") : t("edit");
  };

  return (
    <div className="p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>{action === "create" ? t("create") : t("edit")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onFinish)}
            className="flex flex-col gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Task title"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title?.message as string}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Task description"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description?.message as string}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="project_id">Project</Label>
              <select
                id="project_id"
                {...register("project_id")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              {errors.project_id && (
                <p className="text-sm text-destructive">
                  {errors.project_id?.message as string}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                {...register("status")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              {errors.status && (
                <p className="text-sm text-destructive">
                  {errors.status?.message as string}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                {...register("priority")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {errors.priority && (
                <p className="text-sm text-destructive">
                  {errors.priority?.message as string}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="due_date">Due Date</Label>
              <Input id="due_date" type="date" {...register("due_date")} />
              {errors.due_date && (
                <p className="text-sm text-destructive">
                  {errors.due_date?.message as string}
                </p>
              )}
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || formLoading}>
                {buttonLabel()}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

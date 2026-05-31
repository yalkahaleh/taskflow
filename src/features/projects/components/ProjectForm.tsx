"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema, ProjectFormValues } from "../schemas/project.schema";
import { HttpError } from "@refinedev/core";

interface ProjectFormProps {
  action: "create" | "edit";
  id?: string;
}

export function ProjectForm({ action, id }: ProjectFormProps) {
  const t = useTranslations("projects");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    refineCore: { formLoading, onFinish },
  } = useForm<ProjectFormValues, HttpError, ProjectFormValues>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "active",
    },
    refineCoreProps: {
      resource: "projects",
      action: action,
      redirect: "list",
      id: id,
    },
  });

  return (
    <div className="p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>{t("create")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onFinish)}
            className="flex flex-col gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Project name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name?.message as string}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Project description"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description?.message as string}
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
                <option value="active">Active</option>
                <option value="archived">Archived</option>
                <option value="completed">Completed</option>
              </select>
              {errors.status && (
                <p className="text-sm text-destructive">
                  {errors.status?.message as string}
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
                {isSubmitting || formLoading
                  ? action === "create"
                    ? "Creating..."
                    : "Saving..."
                  : action === "create"
                    ? t("create")
                    : t("edit")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

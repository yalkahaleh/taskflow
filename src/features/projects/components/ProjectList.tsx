"use client";

import { useTranslations } from "next-intl";
import { useProjects } from "../hooks/useProjects";
import { useDeleteProject } from "../hooks/deleteProject";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash, Pencil, Eye, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectList() {
  const t = useTranslations("projects");
  const { projects, isLoading, isError } = useProjects();
  const { handleDelete, isPending } = useDeleteProject();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <Link href="/projects/create">
          <Button>
            <Plus className="size-4 mr-2" />
            {t("create")}
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          No projects yet. Create your first one!
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{project.name}</CardTitle>
                  <Badge>{project.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description || "No description"}
                </p>
                <div className="flex items-center gap-2">
                  <Link href={`/projects/${project.id}/show`}>
                    <Button size="sm" variant="outline">
                      <Eye className="size-4" />
                    </Button>
                  </Link>
                  <Link href={`/projects/${project.id}/edit`}>
                    <Button size="sm" variant="outline">
                      <Pencil className="size-4" />
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isPending}
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

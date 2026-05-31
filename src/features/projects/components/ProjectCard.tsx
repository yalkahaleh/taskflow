"use client";

import { useTranslations } from "next-intl";
import { useProject } from "../hooks/useProject";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { Pencil, ArrowLeft } from "lucide-react";

interface ProjectCardProps {
  id: string;
}

export function ProjectCard({ id }: ProjectCardProps) {
  const t = useTranslations("projects");
  const { project, isLoading, isError } = useProject(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/projects">
          <Button variant="outline" size="sm">
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{project.name}</CardTitle>
            <Badge>{project.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Description
            </p>
            <p className="text-sm mt-1">
              {project.description || "No description"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Created At
            </p>
            <p className="text-sm mt-1">
              {new Date(project.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2 pt-4">
            <Link href={`/projects/${id}/edit`}>
              <Button>
                <Pencil className="size-4 mr-2" />
                {t("edit")}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

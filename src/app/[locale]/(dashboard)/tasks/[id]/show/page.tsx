"use client";

import { useTask } from "@/features/tasks/hooks/useTask";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Pencil } from "lucide-react";

export default function ShowTaskPage() {
  const { id } = useParams<{ id: string }>();
  const { task, isLoading, isError } = useTask(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;
  if (!task) return <div>Task not found</div>;

  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/tasks">
          <Button variant="outline" size="sm">
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{task.title}</CardTitle>
            <Badge>{task.priority}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Description
            </p>
            <p className="text-sm mt-1">
              {task.description || "No description"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <Badge className="mt-1">{task.status}</Badge>
          </div>
          {task.due_date && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Due Date
              </p>
              <p className="text-sm mt-1">
                {new Date(task.due_date).toLocaleDateString()}
              </p>
            </div>
          )}
          <div className="flex gap-2 pt-4">
            <Link href={`/tasks/${id}/edit`}>
              <Button>
                <Pencil className="size-4 mr-2" />
                Edit
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

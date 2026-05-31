"use client";

import { useTranslations } from "next-intl";
import { useTasks } from "../hooks/useTasks";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash, Pencil, Eye, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "../types";

const priorityColors: Record<Task["priority"], string> = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

const statusColors: Record<Task["status"], string> = {
  todo: "bg-gray-100 text-gray-800",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export function TaskList() {
  const t = useTranslations("tasks");
  const { tasks, isLoading, isError } = useTasks();
  const { handleDelete, isPending } = useDeleteTask();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <Link href="/tasks/create">
          <Button>
            <Plus className="size-4 mr-2" />
            {t("create")}
          </Button>
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          No tasks yet. Create your first one!
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{task.title}</CardTitle>
                  <Badge className={priorityColors[task.priority]}>
                    {task.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {task.description || "No description"}
                </p>

                <p className="text-xs text-muted-foreground mt-1 mb-2">
                  Project: {task.projects?.name ?? "No project"}
                </p>
                <Badge className={statusColors[task.status]}>
                  {task.status}
                </Badge>
                {task.due_date && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Due: {new Date(task.due_date).toLocaleDateString()}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-4">
                  <Link href={`/tasks/${task.id}/show`}>
                    <Button size="sm" variant="outline">
                      <Eye className="size-4" />
                    </Button>
                  </Link>
                  <Link href={`/tasks/${task.id}/edit`}>
                    <Button size="sm" variant="outline">
                      <Pencil className="size-4" />
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isPending}
                    onClick={() => handleDelete(task.id)}
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

"use client";

import { useTranslations } from "next-intl";
import { useTasks } from "../hooks/useTasks";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Trash,
  Pencil,
  Eye,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "../types";
import { useCan } from "@refinedev/core";

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
  const { data: canDelete } = useCan({
    resource: "tasks",
    action: "delete",
  });

  const { data: canCreate } = useCan({
    resource: "tasks",
    action: "create",
  });

  const { data: canEdit } = useCan({
    resource: "tasks",
    action: "edit",
  });
  const t = useTranslations("tasks");
  const {
    tasks,
    isLoading,
    isError,
    setFilters,
    setSorters,
    currentPage,
    setCurrentPage,
    pageCount,
  } = useTasks();
  const { handleDelete, isPending } = useDeleteTask();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        {canCreate?.can && (
          <Link href="/tasks/create">
            <Button>
              <Plus className="size-4 mr-2" />
              {t("create")}
            </Button>
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Status Filter */}
        <select
          className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          onChange={(e) => {
            setFilters(
              e.target.value
                ? [{ field: "status", operator: "eq", value: e.target.value }]
                : [],
            );
          }}
        >
          <option value="">All Status</option>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {/* Priority Filter */}
        <select
          className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          onChange={(e) => {
            setFilters(
              e.target.value
                ? [{ field: "priority", operator: "eq", value: e.target.value }]
                : [],
              "merge",
            );
          }}
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Sort */}
        <select
          className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          onChange={(e) => {
            const sorts: Record<
              string,
              { field: string; order: "asc" | "desc" }
            > = {
              newest: { field: "created_at", order: "desc" },
              oldest: { field: "created_at", order: "asc" },
              priority_low: { field: "priority", order: "asc" },
              priority_high: { field: "priority", order: "desc" },
            };
            const selected = sorts[e.target.value];
            if (selected) {
              setSorters([selected]);
            }
          }}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priority_low">Priority (Low-High)</option>
          <option value="priority_high">Priority (High-Low)</option>
        </select>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          No tasks found!
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
                <Badge className={statusColors[task.status]}>
                  {task.status}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  Project: {task.projects?.name ?? "No project"}
                </p>
                {task.due_date && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Due: {new Date(task.due_date).toLocaleDateString()}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-4">
                  <Link href={`/tasks/${task.id}/show`}>
                    <Button size="sm" variant="outline">
                      <Eye className="size-4" />
                    </Button>
                  </Link>
                  {canEdit?.can && (
                    <Link href={`/tasks/${task.id}/edit`}>
                      <Button size="sm" variant="outline">
                        <Pencil className="size-4" />
                      </Button>
                    </Link>
                  )}
                  {canDelete?.can && (
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={isPending}
                      onClick={() => handleDelete(task.id)}
                    >
                      <Trash className="size-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {pageCount}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === pageCount}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

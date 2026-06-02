"use client";

import { useDashboardStats } from "../hooks/useDashboardStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, CheckSquare, Clock, CheckCircle } from "lucide-react";

export function DashboardStats() {
  const { stats, isLoading, isError } = useDashboardStats();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FolderKanban className="size-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {stats?.total_projects ?? 0}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckSquare className="size-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {stats?.total_tasks ?? 0}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {stats?.tasks_by_status?.in_progress ?? 0}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="size-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {stats?.tasks_by_status?.completed ?? 0}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks by Status */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tasks by Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Todo", key: "todo", color: "bg-gray-200" },
              {
                label: "In Progress",
                key: "in_progress",
                color: "bg-blue-200",
              },
              { label: "Completed", key: "completed", color: "bg-green-200" },
              { label: "Cancelled", key: "cancelled", color: "bg-red-200" },
            ].map((item) => {
              const count =
                stats?.tasks_by_status?.[
                  item.key as keyof typeof stats.tasks_by_status
                ] ?? 0;
              const total = stats?.total_tasks ?? 1;
              const percentage = Math.round((count / total) * 100);

              return (
                <div key={item.key} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{item.label}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Tasks by Priority */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tasks by Priority</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "High", key: "high", color: "bg-red-200" },
              { label: "Medium", key: "medium", color: "bg-yellow-200" },
              { label: "Low", key: "low", color: "bg-green-200" },
            ].map((item) => {
              const count =
                stats?.tasks_by_priority?.[
                  item.key as keyof typeof stats.tasks_by_priority
                ] ?? 0;
              const total = stats?.total_tasks ?? 1;
              const percentage = Math.round((count / total) * 100);

              return (
                <div key={item.key} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{item.label}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

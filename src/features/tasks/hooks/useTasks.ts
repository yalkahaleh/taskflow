import { useTable } from "@refinedev/core";
import { Task } from "../types";

export function useTasks(projectId?: string) {
    const {
        tableQuery,
        filters,
        setFilters,
        sorters,
        setSorters,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        pageCount,
    } = useTable<Task>({
        resource: "tasks",
        sorters: {
            initial: [
                {
                    field: "created_at",
                    order: "desc",
                },
            ],
        },
        filters: {
            initial: projectId
                ? [
                    {
                        field: "project_id",
                        operator: "eq",
                        value: projectId,
                    },
                ]
                : [],
        },
        pagination: {
            pageSize: 10,
        },
        meta: {
            select: "*, projects(name)",
        },
    });

    return {
        tasks: (tableQuery.data?.data ?? []) as Task[],
        total: tableQuery.data?.total ?? 0,
        isLoading: tableQuery.isLoading,
        isError: tableQuery.isError,
        filters,
        setFilters,
        sorters,
        setSorters,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        pageCount,
    };
}
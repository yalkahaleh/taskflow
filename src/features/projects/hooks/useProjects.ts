import { useTable } from "@refinedev/core";
import { Project } from "../types";

export function useProjects() {
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
    } = useTable<Project>({
        resource: "projects",
        sorters: {
            initial: [
                {
                    field: "created_at",
                    order: "desc",
                },
            ],
        },
        pagination: {
            pageSize: 10,
        },
    });

    return {
        projects: (tableQuery.data?.data ?? []) as Project[],
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
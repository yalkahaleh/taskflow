import { useCustom } from "@refinedev/core";
import { createClient } from "@/lib/supabase/client";

interface DashboardStats {
    total_projects: number;
    total_tasks: number;
    tasks_by_status: {
        todo?: number;
        in_progress?: number;
        completed?: number;
        cancelled?: number;
    };
    tasks_by_priority: {
        low?: number;
        medium?: number;
        high?: number;
    };
}

export function useDashboardStats() {
    const supabase = createClient();

    const { query } = useCustom<DashboardStats>({
        url: "",
        method: "get",
        queryOptions: {
            queryFn: async () => {
                const { data, error } = await supabase
                    .rpc("get_dashboard_stats");
                if (error) throw error;
                return { data };
            },
        },
    });

    return {
        stats: query.data?.data,
        isLoading: query.isLoading,
        isError: query.isError,
    };
}
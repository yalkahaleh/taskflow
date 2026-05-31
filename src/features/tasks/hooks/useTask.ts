import { useOne } from "@refinedev/core";
import { Task } from "../types";

export function useTask(id: string) {
    const { query } = useOne<Task>({
        resource: "tasks",
        id,
    });

    return {
        task: query.data?.data,
        isLoading: query.isLoading,
        isError: query.isError,
    };
}
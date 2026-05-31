import { useOne } from "@refinedev/core";
import { Project } from "../types";

export function useProject(id: string) {
    const { query } = useOne<Project>({
        resource: "projects",
        id,
    });

    return {
        project: query.data?.data,
        isLoading: query.isLoading,
        isError: query.isError,
    };
}
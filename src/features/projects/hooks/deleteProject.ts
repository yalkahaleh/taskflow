import { useDelete } from "@refinedev/core";

export function useDeleteProject() {
    const { mutate: deleteProject, mutation } = useDelete();

    const handleDelete = (id: string) => {
        deleteProject({
            resource: "projects",
            id,
        });
    };

    return {
        handleDelete,
        isPending: mutation.isPending,
    };
}
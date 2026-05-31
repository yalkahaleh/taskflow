import { useDelete } from "@refinedev/core";

export function useDeleteTask() {
    const { mutate: deleteTask, mutation } = useDelete();

    const handleDelete = (id: string) => {
        deleteTask({
            resource: "tasks",
            id,
        });
    };

    return {
        handleDelete,
        isPending: mutation.isPending,
    };
}
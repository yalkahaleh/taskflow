import { useCreate } from "@refinedev/core";
import { useState } from "react";
import { CreateProjectInput } from "../types";

export function useCreateProject() {
    const { mutate: create, mutation } = useCreate();
    const [error, setError] = useState("");

    const handleCreate = (values: CreateProjectInput) => {
        setError("");
        create(
            {
                resource: "projects",
                values,
            },
            {
                onError: (error) => {
                    setError(error.message);
                },
            }
        );
    };

    return {
        handleCreate,
        isPending: mutation.isPending,
        error,
    };
}
import { useRegister as useRefineRegister } from "@refinedev/core";
import { useState } from "react";

export function useRegister() {
    const { mutate: register, isPending } = useRefineRegister();
    const [error, setError] = useState("");

    const handleRegister = (
        email: string,
        password: string,
        fullName: string
    ) => {
        setError("");
        register(
            { email, password, fullName },
            {
                onSuccess: (data) => {
                    if (data.success === false) {
                        setError(data.error?.message || "Something went wrong")
                    }
                },
                onError: (error) => {
                    setError(error.message);
                },
            }
        );
    };

    return { handleRegister, isPending, error };
}
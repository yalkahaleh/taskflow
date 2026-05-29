import { useLogin as useRefineLogin } from "@refinedev/core";
import { useState } from "react";

export function useLogin() {
    const { mutate: login, isPending } = useRefineLogin();
    const [error, setError] = useState("");

    const handleLogin = (email: string, password: string) => {
        setError("");
        login(
            { email, password },
            {
                onSuccess: (data) => {
                    if (data.success === false) {
                        setError(data.error?.message || "Login failed")
                    }
                },
                onError: (error) => {
                    setError(error.message);
                },

            }
        );
    };

    return { handleLogin, isPending, error };
}
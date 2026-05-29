"use client";

import { AuthProvider } from "@refinedev/core";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const authProvider: AuthProvider = {
    // Login
    login: async ({ email, password }) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return {
                success: false,
                error: {
                    message: error.message,
                    name: "Login Error",
                },
            };
        }

        return {
            success: true,
            redirectTo: "/dashboard",
        };
    },

    // Register
    register: async ({ email, password, fullName }) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) {
            return {
                success: false,
                error: {
                    message: error.message,
                    name: "Register Error",
                },
            };
        }

        return {
            success: true,
            redirectTo: "/dashboard",
        };
    },

    // Logout
    logout: async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            return {
                success: false,
                error: {
                    message: error.message,
                    name: "Logout Error",
                },
            };
        }

        return {
            success: true,
            redirectTo: "/login",
        };
    },

    // Check if user is logged in
    check: async () => {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return {
                authenticated: false,
                redirectTo: "/login",
            };
        }

        return { authenticated: true };
    },

    // Get current user info
    getIdentity: async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return null;

        const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        return {
            id: user.id,
            email: user.email,
            name: profile?.full_name,
            avatar: profile?.avatar_url,
            role: profile?.role,
        };
    },

    // Handle errors (401 → logout)
    onError: async (error) => {
        if (error?.status === 401) {
            return {
                logout: true,
                redirectTo: "login",
            };
        }
        return { error };
    },
};
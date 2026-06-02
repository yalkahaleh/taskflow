import { AccessControlProvider } from "@refinedev/core";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

// Permission matrix
const permissions = {
    admin: {
        projects: ["list", "show", "create", "edit", "delete"],
        tasks: ["list", "show", "create", "edit", "delete"],
        profiles: ["list", "show", "edit"],
    },
    editor: {
        projects: ["list", "show", "create", "edit"],
        tasks: ["list", "show", "create", "edit"],
        profiles: ["list", "show", "edit"],
    },
    viewer: {
        projects: ["list", "show"],
        tasks: ["list", "show"],
        profiles: ["list", "show"],
    },
};

export const accessControlProvider: AccessControlProvider = {
    can: async ({ resource, action }) => {
        // get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { can: false };

        // get user role from profiles
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        const role = profile?.role as keyof typeof permissions;
        if (!role) return { can: false };

        // check permission matrix
        const allowedActions =
            permissions[role]?.[resource as keyof (typeof permissions)[typeof role]] ?? [];

        return {
            can: allowedActions.includes(action),
            reason: allowedActions.includes(action)
                ? undefined
                : `${role} cannot ${action} ${resource}`,
        };
    },
};
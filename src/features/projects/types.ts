export type ProjectStatus = "active" | "archived" | "completed";

export interface Project {
    id: string;
    name: string;
    description: string | null;
    status: ProjectStatus;
    owner_id: string;
    created_at: string;
    updated_at: string;
}

export interface CreateProjectInput {
    name: string;
    description?: string;
    status?: ProjectStatus;
}

export interface UpdateProjectInput {
    name?: string;
    description?: string;
    status?: ProjectStatus;
}
import { z } from "zod";

export const TaskSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    description: z.string().optional(),
    status: z.enum(["todo", "in_progress", "completed", "cancelled"]),
    priority: z.enum(["low", "medium", "high"]),
    project_id: z.string().min(1, "Project is required"),
    assignee_id: z.string().optional(),
    due_date: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof TaskSchema>;
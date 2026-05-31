import { z } from "zod";

export const ProjectSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    description: z.string().optional(),
    status: z.enum(["active", "archived", "completed"]),
});

export type ProjectFormValues = z.infer<typeof ProjectSchema>;
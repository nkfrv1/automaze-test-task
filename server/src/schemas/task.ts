import { z } from "zod";

export const queryParamsSchema = z.object({
    status: z.enum(["done", "undone"]).optional(),
    sortBy: z.enum(["priority"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
});

export const taskCreateSchema = z.object({
    title: z.string().trim().min(2),
    priority: z.number().int().min(1).max(10),
    status: z.enum(["done", "undone"]),
});

export const taskUpdateSchema = z
    .object({
        priority: z.number().int().min(1).max(10).optional(),
        status: z.enum(["done", "undone"]).optional(),
    })
    .strict();

export type TaskCreate = z.infer<typeof taskCreateSchema>;
export type TaskUpdate = z.infer<typeof taskUpdateSchema>;

import * as z from "zod";

export const othersSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
})

export const othersArraySchema = z.array(othersSchema)

export type OthersForm = z.infer<typeof othersSchema>
export type OthersArrayForm = z.infer<typeof othersArraySchema>

import * as z from "zod";

export const experienceSchema = z.object({
    company: z.string().min(1, "Company name is required"),
    position: z.string().min(1, "Position is required"),
    start_date: z.string().min(1, "Start date is required"),
    is_current: z.boolean(),
    end_date: z.string().optional(),
    description: z.string().optional()
})

export const experienceArraySchema = z.array(experienceSchema)

export type ExperienceForm = z.infer<typeof experienceSchema>
export type ExperienceArrayForm = z.infer<typeof experienceArraySchema>

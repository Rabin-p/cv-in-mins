import * as z from "zod";

export const educationSchema = z.object({
    institution: z.string().min(1, "Institution is required"),
    degree: z.string().min(1, "Degree is required"),
    start_date: z.string().min(1, "Start date is required"),
    is_current: z.boolean(),
    end_date: z.string().optional(),
    description: z.string().optional()
})

export const educationArraySchema = z.array(educationSchema).min(1, "At least one education criteria is necessary")

export type EducationForm = z.infer<typeof educationSchema>
export type EducationArrayForm = z.infer<typeof educationArraySchema>
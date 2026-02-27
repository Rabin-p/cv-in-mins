import * as z from "zod";

export const skillSchema = z.object({
  name: z
    .string()
    // trim whitespace early so that entries with only spaces fail validation
    .trim()
    .min(1, "Skill name is required"),
  proficiency: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),
});

export const skillsArraySchema = z
  .array(skillSchema)
  .min(1, "At least one skill is required");

export type SkillForm = z.infer<typeof skillSchema>;
export type SkillsForm = z.infer<typeof skillsArraySchema>;

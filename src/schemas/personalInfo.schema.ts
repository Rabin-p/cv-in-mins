import * as z from "zod";

const optionalString = () => z.string().optional();

export const personalInfoSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),
  address: z.string().min(1, "Address is required"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^[0-9*#+]+$/, "Phone can only contain 0-9, *, #, +"),
  email: z.email("Email is required"),
  socialMedia: z
    .object({
      linkedin: optionalString(),
      github: optionalString(),
      twitter: optionalString(),
      website: optionalString(),
      facebook: optionalString(),
      instagram: optionalString(),
    })
    .optional(),
  photo: optionalString(),
});

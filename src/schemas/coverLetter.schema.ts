import * as z from "zod";

const optionalString = () => z.string().optional();

export const coverLetterSchema = z.object({
  recipientName: optionalString(),
  company: optionalString(),
  position: optionalString(),
  date: optionalString(),
  opening: optionalString(),
  body: optionalString(),
  closing: optionalString(),
  signature: optionalString(),
});

export type CoverLetterForm = z.infer<typeof coverLetterSchema>;

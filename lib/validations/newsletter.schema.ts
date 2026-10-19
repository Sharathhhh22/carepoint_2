import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please provide a valid email address (e.g., name@example.com)"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

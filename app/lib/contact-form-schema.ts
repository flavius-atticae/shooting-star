import * as z from "zod";
import { sanitizeInput } from "~/lib/form-security";

/**
 * Form validation schema using Zod.
 * Name and message are sanitized (HTML tags stripped) before validation
 * to prevent bypassing min-length constraints with HTML padding.
 *
 * Shared between:
 * - Client-side validation (contact-form.tsx via react-hook-form)
 * - Server-side validation (contact route action)
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .transform((val) => sanitizeInput(val))
    .pipe(
      z.string().trim().min(2, {
        message: "Le nom doit contenir au moins 2 caractères.",
      }),
    ),
  email: z.string().email({
    message: "Veuillez entrer une adresse courriel valide.",
  }),
  availability: z.string().optional(),
  message: z
    .string()
    .transform((val) => sanitizeInput(val))
    .pipe(
      z.string().trim().min(10, {
        message: "Le message doit contenir au moins 10 caractères.",
      }),
    ),
});

/**
 * Form data type inferred from schema
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;

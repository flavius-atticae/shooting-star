import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "~/lib/utils";
import {
  isHoneypotFilled,
  isSubmissionTooFast,
  sanitizeInput,
} from "~/lib/form-security";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Select } from "~/components/ui/select";
import { Button } from "~/components/ui/button";

/**
 * Form validation schema using Zod.
 * Name and message are sanitized (HTML tags stripped) before validation
 * to prevent bypassing min-length constraints with HTML padding.
 */
const contactFormSchema = z.object({
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

/**
 * Availability options for the time slot select
 */
const AVAILABILITY_OPTIONS = [
  { value: "", label: "Flexible" },
  { value: "morning", label: "Matin (9h-12h)" },
  { value: "afternoon", label: "Après-midi (12h-17h)" },
  { value: "evening", label: "Soir (17h-20h)" },
] as const;

/**
 * Props for the ContactForm component
 */
export interface ContactFormProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onSubmit"
> {
  /** Callback when form is successfully submitted */
  onSubmit?: (data: ContactFormData) => void | Promise<void>;
  /** Whether the form is in loading state */
  isLoading?: boolean;
  /** Custom className for additional styling */
  className?: string;
}

/**
 * ContactForm Component - Contact form with validation
 *
 * Features:
 * - Name, email, availability, and message fields
 * - Client-side validation with react-hook-form and zod
 * - Accessible form with proper ARIA attributes
 * - Loading state support
 * - Success message display
 * - WCAG 2.1 AA compliant
 *
 * Accessibility:
 * - All fields have associated labels
 * - Error messages with aria-describedby
 * - Keyboard navigation
 * - Focus management
 * - Screen reader announcements
 *
 * Usage:
 * ```tsx
 * <ContactForm onSubmit={(data) => console.log(data)} />
 * ```
 */
export function ContactForm({
  onSubmit,
  isLoading = false,
  className,
  ...props
}: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [error, setError] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [honeypot, setHoneypot] = React.useState("");
  const interactionTimestampRef = React.useRef<number>(0);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      availability: "",
      message: "",
    },
  });

  // Record timestamp on first meaningful user interaction with the form.
  // Handles both focus and change events to cover autofill scenarios
  // where fields may be populated without triggering focus.
  const handleFirstInteraction = React.useCallback(
    (event: React.SyntheticEvent) => {
      if (interactionTimestampRef.current !== 0) return;

      const element = event.target;

      // Ignore submit button focus
      if (element instanceof HTMLButtonElement) return;

      // Ignore honeypot field interaction
      if (
        element instanceof HTMLInputElement &&
        element.name === "website"
      ) {
        return;
      }

      interactionTimestampRef.current = Date.now();
    },
    [],
  );

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Show success message and reset form state for next submission
  const showSuccessAndReset = React.useCallback(() => {
    setError(false);
    setIsSubmitted(true);
    form.reset();
    setHoneypot("");
    interactionTimestampRef.current = 0;

    // Hide success message after 5 seconds
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  }, [form]);

  const handleSubmit = async (data: ContactFormData) => {
    // Silent rejection for bot submissions (no interaction recorded, or too fast)
    const tooFast =
      interactionTimestampRef.current === 0 ||
      isSubmissionTooFast(interactionTimestampRef.current);
    if (isHoneypotFilled(honeypot) || tooFast) {
      showSuccessAndReset();
      return;
    }

    try {
      setError(false);

      // Data is already sanitized by Zod transform, pass through directly
      if (onSubmit) {
        await onSubmit(data);
      }

      showSuccessAndReset();
    } catch (err) {
      setError(true);
      if (import.meta.env.DEV) {
        console.error("Form submission error:", err);
      }
    }
  };

  return (
    <div
      className={cn(
        // Layout
        "flex flex-col gap-6 p-8 md:p-10 lg:p-12",
        // Background - transparent to blend with parent beige background
        "bg-transparent",
        className,
      )}
      {...props}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          onFocusCapture={handleFirstInteraction}
          onChangeCapture={handleFirstInteraction}
          className="space-y-6"
          noValidate
        >
          {/* Honeypot field - invisible to humans, traps bots */}
          <div
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", opacity: 0 }}
          >
            <label htmlFor="website">Site web</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => {
                setHoneypot(e.target.value);
              }}
            />
          </div>

          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary uppercase text-xs font-semibold tracking-wide">
                  NOM
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Appleseed"
                    {...field}
                    disabled={isLoading}
                    className="bg-transparent text-primary border-2 border-primary/30 focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary uppercase text-xs font-semibold tracking-wide">
                  EMAIL
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    {...field}
                    disabled={isLoading}
                    className="bg-transparent text-primary border-2 border-primary/30 focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Availability Field */}
          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary uppercase text-xs font-semibold tracking-wide">
                  PLAGE HORAIRE
                </FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    disabled={isLoading}
                    className="text-primary border-2 border-primary/30 focus:border-primary"
                  >
                    {AVAILABILITY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message Field */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary uppercase text-xs font-semibold tracking-wide">
                  MESSAGE
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Message"
                    {...field}
                    disabled={isLoading}
                    className="bg-transparent text-primary border-2 border-primary/30 focus:border-primary min-h-[120px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full uppercase font-semibold tracking-wide",
              "min-h-[48px] text-base",
              "rounded-full bg-primary text-white hover:bg-primary/90",
            )}
          >
            {isLoading ? "ENVOI EN COURS..." : "ENVOYER"}
          </Button>

          {/* Success Message */}
          {isSubmitted && (
            <div
              role="alert"
              aria-live="polite"
              className={cn(
                "p-4 rounded-md bg-primary/10 border border-primary/20",
                "text-primary font-body text-sm",
              )}
            >
              Merci pour votre message ! Je vous répondrai dans les plus brefs
              délais.
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              aria-live="polite"
              className={cn(
                "p-4 rounded-md bg-destructive/10 border border-destructive/20",
                "text-destructive font-body text-sm",
              )}
            >
              Une erreur s'est produite. Veuillez réessayer.
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}

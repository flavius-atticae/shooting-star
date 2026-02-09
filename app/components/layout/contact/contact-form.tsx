import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "~/lib/utils";
import {
  isHoneypotFilled,
  isSubmissionTooFast,
} from "~/lib/form-security";
import {
  contactFormSchema,
  type ContactFormData,
} from "~/lib/contact-form-schema";
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

// Re-export schema and type for backward compatibility
export { contactFormSchema, type ContactFormData } from "~/lib/contact-form-schema";

/**
 * Type for fetcher data returned by the route action
 */
interface ActionData {
  success?: boolean;
  error?: string;
  errors?: Record<string, string[]>;
}

/**
 * Minimal fetcher interface compatible with React Router's useFetcher.
 * Uses narrow types to satisfy both the real fetcher and test mocks.
 */
interface FetcherLike {
  state: string;
  data?: ActionData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- React Router's Form component uses FetcherFormProps which is not exported; using Record<string, unknown> keeps compatibility
  Form: React.ComponentType<Record<string, unknown>>;
  submit: (
    data: FormData | Record<string, string>,
    options?: { method?: "get" | "post" | "put" | "patch" | "delete"; action?: string },
  ) => void;
}

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
  /** Callback when form is successfully submitted (legacy/Storybook mode) */
  onSubmit?: (data: ContactFormData) => void | Promise<void>;
  /** Whether the form is in loading state */
  isLoading?: boolean;
  /** Fetcher from useFetcher for progressive enhancement */
  fetcher?: FetcherLike;
  /** Custom className for additional styling */
  className?: string;
}

/**
 * ContactForm Component - Contact form with validation
 *
 * Features:
 * - Name, email, availability, and message fields
 * - Client-side validation with react-hook-form and zod
 * - Progressive enhancement via useFetcher (works without JS)
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
 * // With useFetcher (production)
 * const fetcher = useFetcher();
 * <ContactForm fetcher={fetcher} />
 *
 * // With onSubmit (Storybook/tests)
 * <ContactForm onSubmit={(data) => console.log(data)} />
 * ```
 */
export function ContactForm({
  onSubmit,
  isLoading = false,
  fetcher,
  className,
  ...props
}: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [honeypot, setHoneypot] = React.useState("");
  const interactionTimestampRef = React.useRef<number>(0);
  const timestampInputRef = React.useRef<HTMLInputElement>(null);

  const useFetcherMode = !!fetcher;
  const fetcherLoading = fetcher ? fetcher.state !== "idle" : false;
  const loading = isLoading || fetcherLoading;

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
      if (element instanceof HTMLInputElement && element.name === "website") {
        return;
      }

      interactionTimestampRef.current = Date.now();
      // Update the hidden input value directly via DOM ref,
      // since ref changes don't trigger re-renders.
      if (timestampInputRef.current) {
        timestampInputRef.current.value = String(interactionTimestampRef.current);
      }
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
    setError(null);
    setIsSubmitted(true);
    form.reset();
    setHoneypot("");
    interactionTimestampRef.current = 0;
    if (timestampInputRef.current) {
      timestampInputRef.current.value = "";
    }

    // Hide success message after 5 seconds
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  }, [form]);

  // React to fetcher data changes (success/error from server)
  React.useEffect(() => {
    if (!fetcher?.data) return;
    const actionData = fetcher.data;
    if (actionData.success) {
      showSuccessAndReset();
    } else if (actionData.error) {
      setIsSubmitted(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setError(actionData.error);
    } else if (actionData.errors) {
      // Set server-side field errors on the form
      for (const [field, messages] of Object.entries(actionData.errors)) {
        if (messages.length > 0) {
          form.setError(field as keyof ContactFormData, {
            type: "server",
            message: messages[0],
          });
        }
      }
    }
  }, [fetcher?.data, showSuccessAndReset, form]);

  /** Check client-side anti-spam: honeypot filled or submission too fast.
   *  Only apply the time-based check when a timestamp is present (non-zero)
   *  to match the server action behaviour and avoid rejecting legitimate
   *  submissions where onFocusCapture/onChangeCapture didn't fire
   *  (e.g. browser autofill + direct submit click). */
  const isSpamSubmission = React.useCallback((): boolean => {
    const hasInteractionTimestamp = interactionTimestampRef.current > 0;
    const tooFast = hasInteractionTimestamp
      ? isSubmissionTooFast(interactionTimestampRef.current)
      : false;
    return isHoneypotFilled(honeypot) || tooFast;
  }, [honeypot]);

  const handleSubmit = async (data: ContactFormData) => {
    // Silent rejection for bot submissions (both modes)
    if (isSpamSubmission()) {
      showSuccessAndReset();
      return;
    }

    if (fetcher) {
      // Submit via fetcher for progressive enhancement
      const formData = new FormData();
      formData.set("name", data.name);
      formData.set("email", data.email);
      formData.set("availability", data.availability || "");
      formData.set("message", data.message);
      formData.set("website", honeypot);
      formData.set("_timestamp", String(interactionTimestampRef.current));
      fetcher.submit(formData, { method: "post", action: "/contact" });
      return;
    }

    // Legacy mode: onSubmit callback
    try {
      setError(null);

      // Data is already sanitized by Zod transform, pass through directly
      if (onSubmit) {
        await onSubmit(data);
      }

      showSuccessAndReset();
    } catch (err) {
      // Clear any lingering success state to avoid showing both alerts
      setIsSubmitted(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      setError("Une erreur s'est produite. Veuillez réessayer.");
      if (import.meta.env.DEV) {
        console.error("Form submission error:", err);
      }
    }
  };

  // Choose form element: fetcher.Form for progressive enhancement, or standard form
  const FormElement = useFetcherMode ? fetcher.Form : "form";

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
        <FormElement
          {...(useFetcherMode
            ? { method: "post" as const, action: "/contact" }
            : {})}
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

          {/* Hidden timestamp for server-side time check.
              Uses a DOM ref so the value is updated imperatively
              when the user first interacts (ref changes don't re-render).
              For no-JS/SSR, the field is left empty and the server
              skips the time-check, allowing progressive enhancement. */}
          <input
            ref={timestampInputRef}
            type="hidden"
            name="_timestamp"
            defaultValue=""
          />

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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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
            disabled={loading}
            className={cn(
              "w-full uppercase font-semibold tracking-wide",
              "min-h-[48px] text-base",
              "rounded-full bg-primary text-white hover:bg-primary/90",
            )}
          >
            {loading ? "ENVOI EN COURS..." : "ENVOYER"}
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
              {error}
            </div>
          )}
        </FormElement>
      </Form>
    </div>
  );
}

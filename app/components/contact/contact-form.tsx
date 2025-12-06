import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "~/lib/utils";
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
 * Form validation schema using Zod
 */
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse courriel valide.",
  }),
  availability: z.string().optional(),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères.",
  }),
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
export interface ContactFormProps extends React.HTMLAttributes<HTMLDivElement> {
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

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      availability: "",
      message: "",
    },
  });

  const handleSubmit = async (data: ContactFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      }
      
      // Show success message
      setIsSubmitted(true);
      
      // Reset form
      form.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div
      className={cn(
        // Layout
        "flex flex-col gap-6 p-8 md:p-10 lg:p-12",
        // Background - white/cream
        "bg-white",
        className
      )}
      {...props}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral uppercase text-xs font-semibold tracking-wide">
                  NOM
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Appleseed"
                    {...field}
                    disabled={isLoading}
                    className="bg-white"
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
                <FormLabel className="text-neutral uppercase text-xs font-semibold tracking-wide">
                  EMAIL
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    {...field}
                    disabled={isLoading}
                    className="bg-white"
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
                <FormLabel className="text-neutral uppercase text-xs font-semibold tracking-wide">
                  PLAGE HORAIRE
                </FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    disabled={isLoading}
                    className="bg-white"
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
                <FormLabel className="text-neutral uppercase text-xs font-semibold tracking-wide">
                  MESSAGE
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Message"
                    {...field}
                    disabled={isLoading}
                    className="bg-white min-h-[120px]"
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
              "min-h-[48px] text-base"
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
                "text-primary font-body text-sm"
              )}
            >
              Merci pour votre message ! Je vous répondrai dans les plus brefs
              délais.
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}

import * as React from "react";
import { useFetcher } from "react-router";
import { cn } from "~/lib/utils";
import { Section } from "~/components/ui/section";
import { ContactInfo } from "./contact-info";
import { ContactForm, type ContactFormData } from "./contact-form";

/**
 * Props for the ContactSection component
 */
export interface ContactSectionProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "onSubmit"
> {
  /** Callback when form is successfully submitted (legacy/Storybook mode) */
  onSubmit?: (data: ContactFormData) => void | Promise<void>;
  /** Whether the form is in loading state */
  isLoading?: boolean;
  /** Custom section spacing */
  spacing?: "none" | "compact" | "normal" | "spacious";
  /** Custom className for additional styling */
  className?: string;
}

/**
 * ContactSection Component - Two-column layout with contact info and form
 *
 * Features:
 * - Left column: ContactInfo with contact details in sage green text
 * - Right column: ContactForm with form fields using transparent backgrounds that blend with the beige/cream container
 * - Responsive: stacks vertically on mobile, side-by-side on desktop
 * - WCAG 2.1 AA compliant
 *
 * Layout:
 * - Background: Beige/cream accent color
 * - Desktop: 2-column grid with gap
 * - Tablet: 2-column grid with reduced gap
 * - Mobile: Single column stack (info first, then form)
 *
 * Accessibility:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Keyboard navigation
 * - Screen reader friendly
 *
 * Usage:
 * ```tsx
 * <ContactSection onSubmit={(data) => console.log(data)} />
 * ```
 */
export function ContactSection({
  onSubmit,
  isLoading = false,
  spacing = "normal",
  className,
  ...props
}: ContactSectionProps) {
  const fetcher = useFetcher();

  return (
    <Section
      as="section"
      background="white"
      spacing={spacing}
      className={className}
      aria-label="Formulaire de contact"
      insetX="sm"
      {...props}
    >
      {/* Rounded container with beige background */}
      <div
        className={cn(
          // Container with rounded corners and beige background
          "bg-gris rounded-2xl md:rounded-3xl",
          // Padding inside the container
          "p-8 md:p-12 lg:p-16",
          // Max width and centering
          "w-full max-w-6xl mx-auto"
        )}
      >
        {/* Two-column grid layout */}
        <div
          className={cn(
            // Grid setup
            "grid grid-cols-1 md:grid-cols-2",
            // Gap between columns
            "gap-8 md:gap-12 lg:gap-16"
          )}
        >
          {/* Left Column - Contact Info */}
          <ContactInfo />

          {/* Right Column - Contact Form */}
          <ContactForm
            onSubmit={onSubmit}
            isLoading={isLoading}
            fetcher={fetcher}
          />
        </div>
      </div>
    </Section>
  );
}

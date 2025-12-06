import * as React from "react";
import { cn } from "~/lib/utils";
import { Section } from "~/components/ui/section";
import { ContactInfo } from "./contact-info";
import { ContactForm, type ContactFormData } from "./contact-form";

/**
 * Props for the ContactSection component
 */
export interface ContactSectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onSubmit"> {
  /** Callback when form is successfully submitted */
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
 * - Left column: ContactInfo with contact details on sage green background
 * - Right column: ContactForm with form fields on white background
 * - Responsive: stacks vertically on mobile, side-by-side on desktop
 * - WCAG 2.1 AA compliant
 *
 * Layout:
 * - Desktop: 2-column grid (1fr 1fr)
 * - Tablet: 2-column grid (may adjust)
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
  return (
    <Section
      as="section"
      background="primary"
      spacing={spacing}
      className={className}
      aria-label="Formulaire de contact"
      {...props}
    >
      {/* Two-column grid layout */}
      <div
        className={cn(
          // Grid setup
          "grid grid-cols-1 md:grid-cols-2",
          // Remove gaps - components handle their own padding
          "gap-0",
          // Full width
          "w-full",
          // Overflow handling for rounded corners
          "overflow-hidden rounded-lg md:rounded-xl"
        )}
      >
        {/* Left Column - Contact Info */}
        <ContactInfo />

        {/* Right Column - Contact Form */}
        <ContactForm onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </Section>
  );
}

import { Mail, MapPin } from "lucide-react";
import type * as React from "react";
import { CONTACT_INFO } from "~/data/contact";
import { cn } from "~/lib/utils";

/**
 * Props for the ContactInfo component
 */
export interface ContactInfoProps extends React.ComponentProps<"div"> {
  /** Custom className for additional styling */
  className?: string;
}

/**
 * ContactInfo Component - Left column contact information
 *
 * Displays contact details in sage green text on beige/cream background:
 * - Title "Écris-moi"
 * - Introduction text
 * - Location (Montreal)
 * - Email (clickable mailto link)
 * - Personal message
 *
 * Accessibility:
 * - Proper heading hierarchy
 * - Semantic HTML
 * - ARIA labels on links
 * - WCAG 2.1 AA compliant contrast
 *
 * Usage:
 * ```tsx
 * <ContactInfo />
 * ```
 */
export function ContactInfo({ className, ...props }: ContactInfoProps) {
  return (
    <div
      className={cn(
        // Layout
        "flex flex-col gap-6",
        // No background - inherits from parent section
        // Text color - primary green
        "text-primary",
        className,
      )}
      {...props}
    >
      {/* Title */}
      <h2
        className={cn(
          "font-heading font-medium text-4xl sm:text-5xl lg:text-6xl",
          "text-primary mb-4",
        )}
      >
        {CONTACT_INFO.title}
      </h2>

      {/* Introduction */}
      <p className={cn("font-body text-base sm:text-lg leading-relaxed", "text-primary/90 mb-2")}>
        {CONTACT_INFO.intro}
      </p>

      {/* Location */}
      <div className="flex items-start gap-3 mb-2">
        <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-primary" aria-hidden="true" />
        <p className="font-body text-base sm:text-lg text-primary/90">{CONTACT_INFO.location}</p>
      </div>

      {/* Email */}
      <div className="flex items-start gap-3 mb-4">
        <Mail className="w-5 h-5 mt-1 flex-shrink-0 text-primary" aria-hidden="true" />
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className={cn(
            "font-body text-base sm:text-lg text-primary hover:text-primary/80",
            "underline underline-offset-4 transition-all duration-200",
            "outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
            "min-h-[44px] flex items-center",
          )}
          aria-label="Envoyer un courriel à Pauline Roussel"
        >
          {CONTACT_INFO.email}
        </a>
      </div>

      {/* Personal message */}
      <p className={cn("font-heading text-2xl sm:text-3xl italic", "text-primary mt-4")}>
        {CONTACT_INFO.closingMessage}
      </p>
    </div>
  );
}

import * as React from "react";
import { cn } from "~/lib/utils";
import { Mail, MapPin } from "lucide-react";

/**
 * Props for the ContactInfo component
 */
export interface ContactInfoProps extends React.HTMLAttributes<HTMLDivElement> {
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
        className
      )}
      {...props}
    >
      {/* Title */}
      <h2
        className={cn(
          "font-heading text-4xl sm:text-5xl lg:text-6xl",
          "text-primary mb-4"
        )}
      >
        Écris-moi
      </h2>

      {/* Introduction */}
      <p
        className={cn(
          "font-body text-base sm:text-lg leading-relaxed",
          "text-primary/90 mb-2"
        )}
      >
        Contacte-moi pour échanger sur ton parcours, tes besoins et découvrir
        comment je peux te soutenir à chaque étape. Chaque expérience est
        unique, créons-la ensemble !
      </p>

      {/* Location */}
      <div className="flex items-start gap-3 mb-2">
        <MapPin
          className="w-5 h-5 mt-1 flex-shrink-0 text-primary"
          aria-hidden="true"
        />
        <p className="font-body text-base sm:text-lg text-primary/90">
          Grande région de Montréal
        </p>
      </div>

      {/* Email */}
      <div className="flex items-start gap-3 mb-4">
        <Mail
          className="w-5 h-5 mt-1 flex-shrink-0 text-primary"
          aria-hidden="true"
        />
        <a
          href="mailto:pauline.roussel@gmail.com"
          className={cn(
            "font-body text-base sm:text-lg text-primary hover:text-primary/80",
            "underline underline-offset-4 transition-all duration-200",
            // Accessibility - focus states
            "outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
            // Touch target - pregnancy-safe minimum 44px
            "min-h-[44px] flex items-center"
          )}
          aria-label="Envoyer un courriel à Pauline Roussel"
        >
          pauline.roussel@gmail.com
        </a>
      </div>

      {/* Personal message */}
      <p
        className={cn(
          "font-heading text-2xl sm:text-3xl italic",
          "text-primary mt-4"
        )}
      >
        J'ai hâte de faire votre rencontre
      </p>
    </div>
  );
}

import * as React from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Section } from "~/components/ui/section";
import { Container } from "~/components/ui/container";

export interface CTASectionProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  /** Main title text - displayed in Ivyora Display font */
  title: string;
  /** Subtitle text - displayed in Barlow font */
  subtitle: string;
  /** Button text */
  buttonText: string;
  /** Button click handler */
  onButtonClick?: () => void;
  /** Optional custom className for additional styling */
  className?: string;
  /** Button href for link behavior (alternative to onButtonClick) */
  buttonHref?: string;
  /** Button target for link behavior */
  buttonTarget?: "_blank" | "_self" | "_parent" | "_top";
  /** Custom section spacing override */
  spacing?: "compact" | "normal" | "spacious";
  /** Custom container size */
  containerSize?: "sm" | "md" | "lg" | "xl";
  /** Accessibility props */
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

/**
 * CTA Section Component - Section avec call-to-action pregnancy-safe
 *
 * Conçu spécifiquement pour le site de Pauline Roussel avec :
 * - Fond transparent avec padding généreux
 * - Bloc gris arrondi pour douceur visuelle
 * - Typography pregnancy-safe (Ivyora Display + Barlow)
 * - Couleur accent apaisante (#af6868)
 * - Touch targets 48px minimum
 * - Accessibilité WCAG 2.1 AA
 *
 * Usage:
 * ```tsx
 * <CTASection
 *   title="Rejoignez nos ateliers"
 *   subtitle="Accompagnement bienveillant pour votre maternité"
 *   buttonText="Contactez-moi"
 *   onButtonClick={() => navigate('/contact')}
 * />
 * ```
 */
export function CTASection({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  buttonHref,
  buttonTarget = "_self",
  spacing = "normal",
  containerSize = "md",
  className,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: CTASectionProps) {
  return (
    <Section
      background="transparent"
      spacing={spacing}
      className={cn("px-6 sm:px-8 lg:px-12", className)}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      {...props}
    >
      <Container size={containerSize}>
        <div className="bg-gris rounded-xl p-8 sm:p-10 lg:p-12 text-center">
          {/* Title */}
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-accent text-center leading-tight mb-4 sm:mb-6">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-lg sm:text-xl text-accent text-center leading-relaxed mb-6 sm:mb-8">
            {subtitle}
          </p>

          {/* CTA Button */}
          {buttonHref ? (
            <Button variant="cta" size="cta" asChild>
              <a
                href={buttonHref}
                target={buttonTarget}
                rel={
                  buttonTarget === "_blank" ? "noopener noreferrer" : undefined
                }
              >
                {buttonText}
              </a>
            </Button>
          ) : (
            <Button variant="cta" size="cta" onClick={onButtonClick}>
              {buttonText}
            </Button>
          )}
        </div>
      </Container>
    </Section>
  );
}

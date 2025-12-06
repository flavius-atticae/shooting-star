import * as React from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Section } from "~/components/ui/section";
import { Container } from "~/components/ui/container";

export interface CallToActionProps extends Omit<
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
  /** Horizontal inset - creates the "floating card" effect with space from viewport edges */
  insetX?: "none" | "sm" | "md" | "lg";
  /** Vertical inset - creates space above/below the section background */
  insetY?: "none" | "sm" | "md" | "lg";
  /** Accessibility props */
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

/**
 * CallToAction Component - Section avec call-to-action pregnancy-safe
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
 * <CallToAction
 *   title="Rejoignez nos ateliers"
 *   subtitle="Accompagnement bienveillant pour votre maternité"
 *   buttonText="Contactez-moi"
 *   onButtonClick={() => navigate('/contact')}
 * />
 * ```
 */
export function CallToAction({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  buttonHref,
  buttonTarget = "_self",
  spacing = "compact",
  insetX = "sm",
  insetY = "sm",
  className,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: CallToActionProps) {
  return (
    <Section
      background="accent"
      spacing={spacing}
      insetX={insetX}
      insetY={insetY}
      rounded="md"
      className={cn(className)}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      {...props}
    >
      <Container size="xl" className="px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 lg:p-12 text-center">
          {/* Title */}
          <h2 className="font-heading font-medium text-4xl md:text-5xl text-accent text-center leading-tight mb-4 sm:mb-6">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-lg sm:text-xl text-accent text-center leading-relaxed mb-6 sm:mb-8">
            {subtitle}
          </p>

          {/* CTA Button - wrapped in max-width container to prevent overflow */}
          <div className="flex justify-center w-full">
            {(() => {
              const buttonClasses = "max-w-full whitespace-normal sm:whitespace-nowrap px-6 sm:px-8";
              
              return buttonHref ? (
                <Button variant="cta" size="cta" asChild className={buttonClasses}>
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
                <Button 
                  variant="cta" 
                  size="cta" 
                  onClick={onButtonClick}
                  className={buttonClasses}
                >
                  {buttonText}
                </Button>
              );
            })()}
          </div>
        </div>
      </Container>
    </Section>
  );
}

import * as React from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

export interface ServiceItem {
  /** Service identifier for tracking */
  id: string;
  /** Service title in The Seasons font */
  title: string;
  /** Service description in Barlow font */
  description: string;
  /** CTA button text */
  buttonText: string;
  /** Button action - either click handler or link */
  buttonAction?: () => void;
  /** Button href for link navigation */
  buttonHref?: string;
  /** Button target for external links */
  buttonTarget?: '_blank' | '_self' | '_parent' | '_top';
  /** Optional icon or image for service card */
  icon?: React.ReactNode;
  /** Accessibility label for the service */
  'aria-label'?: string;
}

export interface ServiceCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Service data */
  service: ServiceItem;
  /** Custom styling className */
  className?: string;
  /** Card variant for future extensibility */
  variant?: 'default' | 'featured';
}

/**
 * Service Card Component - Carte de service pregnancy-safe
 * 
 * Conçu spécifiquement pour le site de Pauline Roussel avec :
 * - Fond vert (#618462) avec texte blanc
 * - Typography pregnancy-safe (The Seasons + Barlow)
 * - Bouton CTA blanc avec texte vert
 * - Coins arrondis pour douceur visuelle
 * - Touch targets 44px minimum
 * - Accessibilité WCAG 2.1 AA
 * 
 * Usage:
 * ```tsx
 * <ServiceCard
 *   service={{
 *     id: "yoga-prenatal",
 *     title: "Yoga prénatal",
 *     description: "Séances adaptées à chaque trimestre...",
 *     buttonText: "En savoir plus",
 *     buttonHref: "/services/yoga-prenatal"
 *   }}
 * />
 * ```
 */
export function ServiceCard({
  service,
  className,
  variant = 'default',
  'aria-label': ariaLabel,
  ...props
}: ServiceCardProps) {
  return (
    <article
      className={cn(
        "bg-primary text-white rounded-xl p-6 sm:p-8 flex flex-col h-full",
        "transform-gpu motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:translate-y-[-2px] motion-reduce:hover:scale-100",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2",
        className
      )}
      aria-label={ariaLabel || `Service: ${service.title}`}
      {...props}
    >
      {/* Optional Icon */}
      {service.icon && (
        <div className="mb-4 text-white">
          {service.icon}
        </div>
      )}
      
      {/* Title */}
      <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white leading-tight mb-4">
        {service.title}
      </h3>
      
      {/* Description */}
      <p className="font-sans text-base text-white leading-relaxed mb-6 flex-grow">
        {service.description}
      </p>
      
      {/* CTA Button */}
      <div className="mt-auto flex justify-start">
        {service.buttonHref ? (
          <Button
            variant="service-card"
            size="default"
            className="px-6"
            asChild
          >
            <a 
              href={service.buttonHref}
              target={service.buttonTarget || '_self'}
              rel={service.buttonTarget === '_blank' ? 'noopener noreferrer' : undefined}
              aria-label={service['aria-label'] || `${service.buttonText} pour ${service.title}`}
            >
              {service.buttonText}
            </a>
          </Button>
        ) : (
          <Button
            variant="service-card"
            size="default"
            className="px-6"
            onClick={service.buttonAction}
            aria-label={service['aria-label'] || `${service.buttonText} pour ${service.title}`}
          >
            {service.buttonText}
          </Button>
        )}
      </div>
    </article>
  );
}
import * as React from "react";
import { cn } from "~/lib/utils";

export interface FeatureBlockProps {
  /** Block title - displayed in Ivyora Display font */
  title: string;
  /** Block description - displayed in Barlow font */
  description: string;
  /** Image source URL */
  imageSrc?: string;
  /** Image alt text for accessibility */
  imageAlt?: string;
  /** Layout direction - determines text/image position */
  layout?: "text-left" | "text-right";
  /** Custom className for additional styling */
  className?: string;
  /** Accessibility props */
  "aria-labelledby"?: string;
}

/**
 * Feature Block Component - Reusable content block with text and image
 *
 * Designed for Pauline Roussel's website with:
 * - Alternating layouts (text-left/text-right)
 * - Typography: Ivyora Display (title) + Barlow (description)
 * - Responsive design: 2-column desktop → stacked mobile
 * - Image placeholder support
 * - WCAG 2.1 AA compliant
 * - Touch targets ≥ 44px
 *
 * Usage:
 * ```tsx
 * <FeatureBlock
 *   title="Cours privés"
 *   description="Des séances personnalisées adaptées à vos besoins..."
 *   imageSrc="/images/private-yoga.jpg"
 *   imageAlt="Séance de yoga privée"
 *   layout="text-left"
 * />
 * ```
 */
export function FeatureBlock({
  title,
  description,
  imageSrc,
  imageAlt = "",
  layout = "text-left",
  className,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: FeatureBlockProps) {
  // Determine if we should render text on the left or right
  const isTextLeft = layout === "text-left";

  // Image placeholder if no image provided
  const displayImageSrc = imageSrc || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%23dae6ea'/%3E%3C/svg%3E";
  
  return (
    <article
      className={cn(
        "grid gap-6 sm:gap-8 lg:gap-12 items-center",
        // Mobile: always stack vertically
        "grid-cols-1",
        // Desktop: 2 columns with equal width
        "lg:grid-cols-2",
        className
      )}
      aria-labelledby={ariaLabelledBy}
      lang="fr"
      {...props}
    >
      {/* Text Content */}
      <div
        className={cn(
          "space-y-4 sm:space-y-6",
          // Desktop ordering based on layout
          isTextLeft ? "lg:order-1" : "lg:order-2"
        )}
      >
        {/* Title */}
        <h3 className="font-heading font-medium text-3xl sm:text-4xl lg:text-5xl text-secondary leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed">
          {description}
        </p>
      </div>

      {/* Image */}
      <div
        className={cn(
          "relative aspect-[4/3] rounded-xl overflow-hidden",
          // Desktop ordering based on layout
          isTextLeft ? "lg:order-2" : "lg:order-1"
        )}
      >
        <img
          src={displayImageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </article>
  );
}

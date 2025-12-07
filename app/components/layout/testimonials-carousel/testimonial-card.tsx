import * as React from "react";
import { cn } from "~/lib/utils";

export interface Testimonial {
  id: string;
  quote: string;
  author?: string;
  context?: string;
}

export interface TestimonialCardProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  testimonial: Testimonial;
  className?: string;
}

/**
 * Testimonial Card Component - Carte de témoignage
 *
 * Displays a single testimonial with quote, author name, and context.
 * Designed with a soft, elegant style matching the site's aesthetic.
 *
 * Features:
 * - Light background with elegant typography
 * - Quote marks for visual cue
 * - Optional author and context information
 * - Pregnancy-safe: soft colors, rounded corners
 * - Fully accessible
 *
 * Usage:
 * ```tsx
 * <TestimonialCard
 *   testimonial={{
 *     id: "1",
 *     quote: "Une expérience inoubliable...",
 *     author: "Marie",
 *     context: "Maman de 2 enfants"
 *   }}
 * />
 * ```
 */
export function TestimonialCard({
  testimonial,
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "bg-gris rounded-xl p-6 sm:p-8 flex flex-col h-full text-center",
        "transform-gpu motion-safe:transition-transform motion-safe:duration-200",
        "motion-reduce:transition-none",
        className
      )}
      aria-label={
        testimonial.author
          ? `Témoignage de ${testimonial.author}`
          : "Témoignage anonyme"
      }
      {...props}
    >
      {/* Author as title - displayed first */}
      {testimonial.author && (
        <h3 className="font-heading font-medium text-4xl sm:text-5xl md:text-7xl py-2 sm:py-6 md:py-8 text-primary mb-4">
          {testimonial.author}
        </h3>
      )}

      {/* Quote */}
      <blockquote className="flex-grow">
        <p className="font-sans text-base sm:text-lg text-primary leading-relaxed">
          {testimonial.quote}
        </p>
      </blockquote>

      {/* Context info */}
      {testimonial.context && (
        <div className="mt-auto pt-4">
          <p className="font-sans text-sm text-primary/70">
            {testimonial.context}
          </p>
        </div>
      )}
    </article>
  );
}

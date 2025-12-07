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
        "rounded-xl p-6 sm:p-8 flex flex-col h-full",
        "transform-gpu motion-safe:transition-transform motion-safe:duration-200",
        "motion-reduce:transition-none",
        className
      )}
      style={{ backgroundColor: '#af6868' }}
      aria-label={testimonial.author ? `Témoignage de ${testimonial.author}` : "Témoignage anonyme"}
      {...props}
    >
      {/* Quote */}
      <blockquote className="flex-grow">
        <p className="font-sans text-base sm:text-lg text-neutral leading-relaxed mb-4 before:content-['«'] after:content-['»']">
          {testimonial.quote}
        </p>
      </blockquote>

      {/* Author info */}
      {(testimonial.author || testimonial.context) && (
        <div className="mt-auto pt-4">
          {testimonial.author && (
            <cite className="font-heading text-lg sm:text-xl text-primary not-italic block">
              {testimonial.author}
            </cite>
          )}
          {testimonial.context && (
            <p className="font-sans text-sm text-neutral/70 mt-1">
              {testimonial.context}
            </p>
          )}
        </div>
      )}
    </article>
  );
}

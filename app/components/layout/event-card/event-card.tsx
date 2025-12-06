import * as React from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

export interface EventCardProps {
  /** Event unique identifier */
  id: string;
  /** Event title */
  title: string;
  /** Event date in format "DD Mois YYYY" (e.g., "7 Juin 2025") */
  date: string;
  /** Event time in 24h format (e.g., "13:00") */
  time: string;
  /** Event image URL or path */
  imageUrl?: string;
  /** Image alt text for accessibility */
  imageAlt?: string;
  /** Details button click handler */
  onDetailsClick?: () => void;
  /** Details button href for navigation */
  detailsHref?: string;
  /** Custom className for additional styling */
  className?: string;
}

/**
 * EventCard Component - Event card for Féminin Sacré page
 *
 * Displays event information with:
 * - Centered blue/cool colored image box
 * - Decorative horizontal lines on sides
 * - Event title on the left
 * - Date, time, and details button on the right
 * - Vertical layout
 * - WCAG 2.1 AA compliant
 * - Touch targets ≥ 44px
 *
 * Design specs (from mockup):
 * - Centered image box with cool background
 * - Horizontal divider lines extending from image
 * - Title left-aligned
 * - Date/time and button right-aligned
 * - Pregnancy-safe spacing and colors
 *
 * Usage:
 * ```tsx
 * <EventCard
 *   id="event-1"
 *   title="Atelier varié abcde"
 *   date="7 Juin 2025"
 *   time="13:00"
 *   imageUrl="/images/events/event-1.jpg"
 *   detailsHref="/feminin-sacre/events/event-1"
 * />
 * ```
 */
export function EventCard({
  id,
  title,
  date,
  time,
  imageUrl,
  imageAlt,
  onDetailsClick,
  detailsHref,
  className,
  ...props
}: EventCardProps & Omit<React.HTMLAttributes<HTMLDivElement>, "children">) {
  const dateTimeLabel = `${date} - ${time}`;

  return (
    <article
      className={cn(
        "flex flex-col w-full",
        "motion-safe:transition-transform motion-safe:duration-200",
        className
      )}
      aria-labelledby={`event-title-${id}`}
      {...props}
    >
      {/* Top Row: Title on Left, Date/Time on Right (above lines) */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4 px-2">
        {/* Left: Event Title (above left line) */}
        <div className="flex-1">
          <h3
            id={`event-title-${id}`}
            className="font-sans font-normal text-base md:text-lg text-primary leading-tight"
          >
            {title}
          </h3>
        </div>

        {/* Right: Date/Time (above right line) */}
        <div className="flex flex-col items-start md:items-end">
          <time
            dateTime={`${date} ${time}`}
            className="font-sans text-sm text-primary/80"
          >
            {dateTimeLabel}
          </time>
        </div>
      </div>

      {/* Image Box with Horizontal Lines */}
      <div className="relative flex items-center justify-center mb-4">
        {/* Left horizontal line */}
        <div className="flex-1 h-[1px] bg-primary/20" />
        
        {/* Centered Image Box */}
        <div
          className={cn(
            "mx-4 w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden flex-shrink-0",
            "bg-cool", // Fallback background color
            imageUrl ? "" : "flex items-center justify-center"
          )}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt || title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="text-secondary text-sm font-sans">
              {/* Placeholder for event image */}
            </div>
          )}
        </div>

        {/* Right horizontal line */}
        <div className="flex-1 h-[1px] bg-primary/20" />
      </div>

      {/* Bottom Row: Button on Right (below right line) */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-end gap-4 px-2">
        {/* Details Button (below right line) */}
        {detailsHref ? (
          <Button
            variant="default"
            size="default"
            className="bg-primary text-white hover:bg-primary/90 min-h-[44px] px-6 rounded-full"
            asChild
          >
            <a href={detailsHref} aria-label={`Voir les détails de ${title}`}>
              DÉTAILS
            </a>
          </Button>
        ) : (
          <Button
            variant="default"
            size="default"
            className="bg-primary text-white hover:bg-primary/90 min-h-[44px] px-6 rounded-full"
            onClick={onDetailsClick}
            aria-label={`Voir les détails de ${title}`}
          >
            DÉTAILS
          </Button>
        )}
      </div>
    </article>
  );
}

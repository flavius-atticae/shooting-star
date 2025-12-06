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
 * - Event image (with fallback background)
 * - Event title in Barlow Bold
 * - Date and time
 * - Details button (green with white text)
 * - Responsive layout
 * - WCAG 2.1 AA compliant
 * - Touch targets ≥ 44px
 *
 * Design specs:
 * - Image aspect ratio: 16:9 or similar
 * - Text color: --color-primary (green)
 * - Button: green background, white text
 * - Rounded corners for soft feel
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
        "flex flex-col gap-4 w-full",
        "motion-safe:transition-transform motion-safe:duration-200",
        className
      )}
      aria-labelledby={`event-title-${id}`}
      {...props}
    >
      {/* Event Image */}
      <div
        className={cn(
          "w-full aspect-video rounded-xl overflow-hidden",
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

      {/* Event Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-col gap-1">
          {/* Event Title */}
          <h3
            id={`event-title-${id}`}
            className="font-sans font-bold text-base sm:text-lg text-primary leading-tight"
          >
            {title}
          </h3>

          {/* Date and Time */}
          <time
            dateTime={`${date} ${time}`}
            className="font-sans text-sm text-primary/80"
          >
            {dateTimeLabel}
          </time>
        </div>

        {/* Details Button */}
        {detailsHref ? (
          <Button
            variant="default"
            size="default"
            className="bg-primary text-white hover:bg-primary/90 min-h-[44px] px-6 rounded-full self-start sm:self-center"
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
            className="bg-primary text-white hover:bg-primary/90 min-h-[44px] px-6 rounded-full self-start sm:self-center"
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

import * as React from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

const FRENCH_MONTHS: Record<string, string> = {
  janvier: "01",
  février: "02",
  fevrier: "02",
  mars: "03",
  avril: "04",
  mai: "05",
  juin: "06",
  juillet: "07",
  août: "08",
  aout: "08",
  septembre: "09",
  octobre: "10",
  novembre: "11",
  décembre: "12",
  decembre: "12",
};

const MONTH_NORMALIZATION_CACHE = new Map<string, string | null>();

/**
 * Converts a French-formatted date (e.g., "7 Juin 2025") and 24h time (e.g., "13:00")
 * to an ISO 8601 date-time string ("2025-06-07T13:00").
 * Returns null when parsing fails.
 *
 * @param date French date in "DD Mois YYYY" format (month name in French)
 * @param time Time in 24-hour format ("HH:mm" or "HH:mm:ss")
 */
function toIsoDateTime(date: string, time: string): string | null {
  const dateMatch = /^(\d{1,2})\s+([^\s]+)\s+(\d{4})$/u.exec(date);
  if (!dateMatch) return null;

  const [, day, monthName, year] = dateMatch;

  const timeMatch = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(time);
  if (!timeMatch) return null;

  const cachedMonth = MONTH_NORMALIZATION_CACHE.get(monthName);
  if (cachedMonth === null) return null;

  let normalizedMonth = cachedMonth;
  if (!normalizedMonth) {
    const computedMonth = monthName
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase();

    const isValidMonth = Boolean(FRENCH_MONTHS[computedMonth]);
    MONTH_NORMALIZATION_CACHE.set(monthName, isValidMonth ? computedMonth : null);
    if (!isValidMonth) return null;

    normalizedMonth = computedMonth;
  }

  const month = FRENCH_MONTHS[normalizedMonth];
  if (!month) return null;

  const paddedDay = day.padStart(2, "0");
  const [_, hour, minute, second] = timeMatch;
  const paddedHour = hour.padStart(2, "0");
  const paddedMinute = minute.padStart(2, "0");
  const paddedSecond = second ? second.padStart(2, "0") : undefined;

  const normalizedTime = paddedSecond
    ? `${paddedHour}:${paddedMinute}:${paddedSecond}`
    : `${paddedHour}:${paddedMinute}`;

  return `${year}-${month}-${paddedDay}T${normalizedTime}`;
}

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
  const dateTimeValue = toIsoDateTime(date, time) ?? `${date} ${time}`;

  // Warn in development if neither detailsHref nor onDetailsClick is provided
  if (process.env.NODE_ENV === "development") {
    if (!detailsHref && !onDetailsClick) {
      console.warn(
        `EventCard "${title}" (id: ${id}): Neither detailsHref nor onDetailsClick provided. Button will not render.`
      );
    }
  }

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
      {/* Top Row: Title on Left, Date/Time on Right (aligned to bottom, near the line) */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-1 px-2 min-h-[60px]">
        {/* Left: Event Title (aligned to bottom) */}
        <div className="flex-1 flex items-end">
          <h3
            id={`event-title-${id}`}
            className="font-sans font-normal text-base md:text-lg text-primary leading-tight"
          >
            {title}
          </h3>
        </div>

        {/* Right: Date/Time (aligned to bottom) */}
        <div className="flex items-end">
          <time
            dateTime={dateTimeValue}
            className="font-sans text-sm text-primary/80"
          >
            {dateTimeLabel}
          </time>
        </div>
      </div>

      {/* Image Box with Horizontal Lines */}
      <div className="relative flex items-center justify-center mb-1">
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
      {(detailsHref || onDetailsClick) && (
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
      )}
    </article>
  );
}

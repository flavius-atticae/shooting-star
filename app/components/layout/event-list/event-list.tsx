import * as React from "react";
import { Container } from "~/components/ui/container";
import { Section } from "~/components/ui/section";
import { EventCard, type EventCardProps } from "~/components/layout/event-card";

export interface EventListProps {
  /** List of events to display */
  events: EventCardProps[];
  /** Section title */
  title?: string;
  /** Intro text paragraph */
  introText?: string;
  /** Custom className for additional styling */
  className?: string;
  /** Container size */
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
}

/**
 * EventList Component - List of events for Féminin Sacré page
 *
 * Displays a section with:
 * - Title ("Tous les événements" or custom)
 * - Intro paragraph
 * - Vertical list of EventCard components
 * - Single-column layout as per mockup design
 *
 * Design specs:
 * - Title: Ivyora Display, green color
 * - Intro text: Barlow, green color
 * - Vertical stack with generous spacing
 * - Pregnancy-safe spacing and colors
 *
 * Usage:
 * ```tsx
 * <EventList
 *   title="Tous les événements"
 *   introText="Découvrez nos ateliers..."
 *   events={[
 *     {
 *       id: "1",
 *       title: "Atelier varié",
 *       date: "7 Juin 2025",
 *       time: "13:00",
 *       detailsHref: "#"
 *     }
 *   ]}
 * />
 * ```
 */
export function EventList({
  events,
  title = "Tous les événements",
  introText,
  className,
  containerSize = "xl",
  ...props
}: EventListProps & Omit<React.HTMLAttributes<HTMLElement>, "children">) {
  return (
    <Section
      background="white"
      spacing="normal"
      className={className}
      {...props}
    >
      <Container size={containerSize} className="px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="font-heading font-medium text-4xl md:text-5xl lg:text-6xl text-primary mb-6 text-center lg:text-left">
          {title}
        </h2>

        {/* Intro Text */}
        {introText && (
          <p className="font-sans text-base md:text-lg text-primary leading-relaxed mb-12 max-w-4xl mx-auto lg:mx-0 text-center lg:text-left">
            {introText}
          </p>
        )}

        {/* Events List - Vertical layout as per mockup */}
        {events.length > 0 && (
          <div className="flex flex-col gap-12 lg:gap-16">
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {events.length === 0 && (
          <p className="font-sans text-lg text-primary/60 text-center py-12">
            Aucun événement à venir pour le moment.
          </p>
        )}
      </Container>
    </Section>
  );
}

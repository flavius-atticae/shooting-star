import type { Meta, StoryObj } from "@storybook/react";
import { EventCard } from "./event-card";

const meta: Meta<typeof EventCard> = {
  title: "Layout/EventCard",
  component: EventCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Event card component for displaying Féminin Sacré workshop events.

**Features**:
- Event image with fallback background
- Title, date, and time display
- Details button (green background, white text)
- Internal info sections are responsive (stack vertically on mobile, horizontally on desktop); overall card structure remains vertical at all breakpoints
- Touch targets ≥ 44px (WCAG 2.1 AA)
- Pregnancy-safe colors and animations

**Accessibility**:
- Semantic HTML with \`<article>\` and \`<time>\` elements
- ARIA labels for screen readers
- Proper heading hierarchy
- Keyboard navigable
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier for the event",
    },
    title: {
      control: "text",
      description: "Event title",
    },
    date: {
      control: "text",
      description: 'Event date in French format (e.g., "7 Juin 2025")',
    },
    time: {
      control: "text",
      description: 'Event time in 24h format (e.g., "13:00")',
    },
    imageUrl: {
      control: "text",
      description: "URL or path to event image",
    },
    imageAlt: {
      control: "text",
      description: "Alt text for the image",
    },
    detailsHref: {
      control: "text",
      description: "Link URL for the details button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default event card with all properties
 */
export const Default: Story = {
  args: {
    id: "event-1",
    title: "Atelier varié abcde",
    date: "7 Juin 2025",
    time: "13:00",
    // imageUrl omitted - will use placeholder
    imageAlt: "Photo de l'atelier varié",
    detailsHref: "#",
  },
};

/**
 * Event card without image (shows placeholder background)
 */
export const WithoutImage: Story = {
  args: {
    id: "event-2",
    title: "Cercle de femmes",
    date: "14 Juin 2025",
    time: "19:00",
    // imageUrl omitted - will use placeholder
    imageAlt: "",
    detailsHref: "#",
  },
};

/**
 * Event card with long title to test text wrapping
 */
export const LongTitle: Story = {
  args: {
    id: "event-3",
    title:
      "Atelier spécial féminin sacré : célébration de la féminité et rituels de passage",
    date: "21 Juin 2025",
    time: "10:00",
    // imageUrl omitted - will use placeholder
    detailsHref: "#",
  },
};

/**
 * Event card with click handler instead of href
 */
export const WithClickHandler: Story = {
  args: {
    id: "event-4",
    title: "Mama blessing",
    date: "28 Juin 2025",
    time: "15:00",
    onDetailsClick: () => {
      alert("Details clicked!");
    },
  },
};

/**
 * Multiple event cards in a grid layout (for testing responsiveness)
 */
export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <EventCard
        id="event-1"
        title="Atelier varié abcde"
        date="7 Juin 2025"
        time="13:00"
        detailsHref="#"
      />
      <EventCard
        id="event-2"
        title="Cercle de femmes"
        date="14 Juin 2025"
        time="19:00"
        detailsHref="#"
      />
      <EventCard
        id="event-3"
        title="Yoga du féminin sacré"
        date="21 Juin 2025"
        time="10:00"
        detailsHref="#"
      />
    </div>
  ),
};

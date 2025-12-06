import type { Meta, StoryObj } from "@storybook/react";
import { EventList } from "./event-list";
import type { EventCardProps } from "~/components/layout/event-card";

const meta: Meta<typeof EventList> = {
  title: "Layout/EventList",
  component: EventList,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Event list section for displaying Féminin Sacré workshop events.

**Features**:
- Section title (Ivyora Display font)
- Intro paragraph (Barlow font)
- Responsive grid of EventCard components
- Empty state when no events
- Pregnancy-safe spacing and colors

**Layout**:
- 1 column on mobile
- 2 columns on tablet
- 3 columns on desktop

**Accessibility**:
- Semantic HTML with proper heading hierarchy
- WCAG 2.1 AA compliant
- Screen reader friendly
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Section title",
    },
    introText: {
      control: "text",
      description: "Introduction paragraph text",
    },
    containerSize: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Container size",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample events data for stories
const sampleEvents: EventCardProps[] = [
  {
    id: "event-1",
    title: "Atelier varié abcde",
    date: "7 Juin 2025",
    time: "13:00",
    detailsHref: "#",
  },
  {
    id: "event-2",
    title: "Cercle de femmes",
    date: "14 Juin 2025",
    time: "19:00",
    detailsHref: "#",
  },
  {
    id: "event-3",
    title: "Yoga du féminin sacré",
    date: "21 Juin 2025",
    time: "10:00",
    detailsHref: "#",
  },
];

/**
 * Default event list with title, intro text, and 3 events
 */
export const Default: Story = {
  args: {
    title: "Tous les événements",
    introText:
      "Tu ressens l'élan de te reconnecter à ton corps, à ton énergie féminine et à ta puissance intérieure? Les ateliers de Yoga du Féminin Sacré sont un refuge pour toute sa richesse et sa diversité. Dans un espace bienveillant, sacré et sans jugement, tu pourras te déposer, respirer et t'exprimer librement. À travers le mouvement, la méditation et des pratiques inspirées du féminin sacré, ces rencontres te permettront de renouer avec ton cycle, tes émotions et ton intuition profonde. C'est un moment pour toi, pour te redécouvrir et laisser fleurir la beauté unique de ton féminin, soutenue par la sororité et l'énergie du cercle.",
    events: sampleEvents,
    containerSize: "xl",
  },
};

/**
 * Event list without intro text
 */
export const WithoutIntro: Story = {
  args: {
    title: "Tous les événements",
    events: sampleEvents,
    containerSize: "xl",
  },
};

/**
 * Event list with custom title
 */
export const CustomTitle: Story = {
  args: {
    title: "Prochains ateliers",
    introText:
      "Découvrez les prochains événements du féminin sacré organisés par Pauline Roussel.",
    events: sampleEvents,
    containerSize: "xl",
  },
};

/**
 * Empty event list (no events available)
 */
export const EmptyState: Story = {
  args: {
    title: "Tous les événements",
    introText:
      "Les prochains événements seront annoncés bientôt. Revenez régulièrement pour découvrir nos nouveaux ateliers.",
    events: [],
    containerSize: "xl",
  },
};

/**
 * Event list with single event
 */
export const SingleEvent: Story = {
  args: {
    title: "Prochain événement",
    introText: "Ne manquez pas notre prochain atelier du féminin sacré.",
    events: [sampleEvents[0]],
    containerSize: "xl",
  },
};

/**
 * Event list with many events (testing scrolling/pagination)
 */
export const ManyEvents: Story = {
  args: {
    title: "Tous les événements",
    introText: "Découvrez tous nos ateliers et événements à venir.",
    events: [
      ...sampleEvents,
      {
        id: "event-4",
        title: "Mama blessing",
        date: "28 Juin 2025",
        time: "15:00",
        detailsHref: "#",
      },
      {
        id: "event-5",
        title: "Rituel de la nouvelle lune",
        date: "5 Juillet 2025",
        time: "20:00",
        detailsHref: "#",
      },
      {
        id: "event-6",
        title: "Atelier d'ancrage",
        date: "12 Juillet 2025",
        time: "14:00",
        detailsHref: "#",
      },
    ],
    containerSize: "xl",
  },
};

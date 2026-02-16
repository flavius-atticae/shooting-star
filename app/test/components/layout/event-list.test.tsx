import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EventList } from "~/components/layout/event-list";
import type { EventCardProps } from "~/components/layout/event-card";

describe("EventList Component - Pregnancy-Safe Testing", () => {
  const mockEvents: EventCardProps[] = [
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

  const defaultIntroText =
    "Tu ressens l'élan de te reconnecter à ton corps, à ton énergie féminine et à ta puissance intérieure?";

  describe("Basic Rendering", () => {
    it("should render event list with default title", () => {
      render(<EventList events={mockEvents} />);

      expect(
        screen.getByRole("heading", { name: "Tous les événements" }),
      ).toBeInTheDocument();
    });

    it("should render with custom title", () => {
      render(<EventList events={mockEvents} title="Prochains ateliers" />);

      expect(
        screen.getByRole("heading", { name: "Prochains ateliers" }),
      ).toBeInTheDocument();
    });

    it("should render intro text when provided", () => {
      render(<EventList events={mockEvents} introText={defaultIntroText} />);

      expect(screen.getByText(defaultIntroText)).toBeInTheDocument();
    });

    it("should not render intro paragraph when not provided", () => {
      render(<EventList events={mockEvents} />);

      // Should not render the intro paragraph when introText is not provided
      expect(screen.queryByText(defaultIntroText)).not.toBeInTheDocument();
    });

    it("should render all event cards", () => {
      render(<EventList events={mockEvents} />);

      expect(screen.getAllByRole("article")).toHaveLength(3);
      expect(screen.getByText("Atelier varié abcde")).toBeInTheDocument();
      expect(screen.getByText("Cercle de femmes")).toBeInTheDocument();
      expect(screen.getByText("Yoga du féminin sacré")).toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("should display empty state message when no events", () => {
      render(<EventList events={[]} />);

      expect(
        screen.getByText("Aucun événement à venir pour le moment."),
      ).toBeInTheDocument();
    });

    it("should not render event cards in empty state", () => {
      render(<EventList events={[]} />);

      expect(screen.queryAllByRole("article")).toHaveLength(0);
    });

    it("should still render title and intro in empty state", () => {
      render(
        <EventList
          events={[]}
          title="Événements à venir"
          introText="Revenez bientôt pour découvrir nos nouveaux ateliers."
        />,
      );

      expect(
        screen.getByRole("heading", { name: "Événements à venir" }),
      ).toBeInTheDocument();
      expect(screen.getByText(/Revenez bientôt/)).toBeInTheDocument();
    });
  });

  describe("Accessibility - WCAG 2.1 AA", () => {
    it("should have semantic heading with correct level", () => {
      render(<EventList events={mockEvents} />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Tous les événements");
    });

    it("should have proper semantic structure with section", () => {
      render(<EventList events={mockEvents} />);

      // EventList wraps content in a Section component
      const section = screen
        .getByRole("heading", { level: 2 })
        .closest("section");
      expect(section).toBeInTheDocument();
    });

    it("should maintain heading hierarchy", () => {
      render(<EventList events={mockEvents} title="Prochains événements" />);

      const mainHeading = screen.getByRole("heading", { level: 2 });
      expect(mainHeading).toHaveTextContent("Prochains événements");

      // Event cards should have h3 headings
      const eventHeadings = screen.getAllByRole("heading", { level: 3 });
      expect(eventHeadings.length).toBe(3);
    });
  });

  describe("Pregnancy-Safe Design Validation", () => {
    it("should use pregnancy-safe colors (primary green)", () => {
      render(<EventList events={mockEvents} introText={defaultIntroText} />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("text-primary");

      const intro = screen.getByText(defaultIntroText);
      expect(intro).toHaveClass("text-primary");
    });

    it("should use pregnancy-safe typography (Ivyora Display for title)", () => {
      render(<EventList events={mockEvents} />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("font-heading");
    });

    it("should use pregnancy-safe typography (Barlow for intro)", () => {
      render(<EventList events={mockEvents} introText={defaultIntroText} />);

      const intro = screen.getByText(defaultIntroText);
      expect(intro).toHaveClass("font-sans");
    });

    it("should have adequate spacing between elements", () => {
      render(<EventList events={mockEvents} introText={defaultIntroText} />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("mb-6");

      const intro = screen.getByText(defaultIntroText);
      expect(intro).toHaveClass("mb-12");
    });
  });

  describe("Responsive Vertical Layout", () => {
    it("should have vertical flex layout", () => {
      const { container } = render(<EventList events={mockEvents} />);

      const layout = container.querySelector(".flex.flex-col");
      expect(layout).toBeInTheDocument();
    });

    it("should have pregnancy-safe gap spacing", () => {
      const { container } = render(<EventList events={mockEvents} />);

      const layout = container.querySelector(".flex.flex-col");
      expect(layout).toHaveClass("gap-12");
      expect(layout).toHaveClass("lg:gap-16");
    });
  });

  describe("Container Size Support", () => {
    it("should default to xl container size", () => {
      const { container } = render(<EventList events={mockEvents} />);

      const containerDiv = container.querySelector(".max-w-7xl");
      expect(containerDiv).toBeInTheDocument();
    });

    it("should support custom container size", () => {
      const { container } = render(
        <EventList events={mockEvents} containerSize="lg" />,
      );

      const containerDiv = container.querySelector(".max-w-6xl");
      expect(containerDiv).toBeInTheDocument();
    });

    it("should support full width container", () => {
      const { container } = render(
        <EventList events={mockEvents} containerSize="full" />,
      );

      const containerDiv = container.querySelector(".w-full");
      expect(containerDiv).toBeInTheDocument();
    });
  });

  describe("French Content Support (fr-CA)", () => {
    it("should handle French title correctly", () => {
      render(<EventList events={mockEvents} title="Tous les événements" />);

      expect(screen.getByText("Tous les événements")).toBeInTheDocument();
    });

    it("should handle French intro text correctly", () => {
      const frenchIntro =
        "Découvrez nos ateliers du féminin sacré dans un espace bienveillant.";
      render(<EventList events={mockEvents} introText={frenchIntro} />);

      expect(screen.getByText(frenchIntro)).toBeInTheDocument();
    });

    it("should display French empty state message", () => {
      render(<EventList events={[]} />);

      expect(
        screen.getByText("Aucun événement à venir pour le moment."),
      ).toBeInTheDocument();
    });
  });

  describe("Text Alignment", () => {
    it("should center-align title and intro on mobile, left-align on desktop", () => {
      render(<EventList events={mockEvents} introText={defaultIntroText} />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("text-center");
      expect(heading).toHaveClass("lg:text-left");

      const intro = screen.getByText(defaultIntroText);
      expect(intro).toHaveClass("text-center");
      expect(intro).toHaveClass("lg:text-left");
    });

    it("should constrain intro text width with max-width", () => {
      render(<EventList events={mockEvents} introText={defaultIntroText} />);

      const intro = screen.getByText(defaultIntroText);
      expect(intro).toHaveClass("max-w-4xl");
    });

    it("should center intro on mobile, left-align on desktop", () => {
      render(<EventList events={mockEvents} introText={defaultIntroText} />);

      const intro = screen.getByText(defaultIntroText);
      expect(intro).toHaveClass("mx-auto");
      expect(intro).toHaveClass("lg:mx-0");
    });
  });

  describe("Custom Styling", () => {
    it("should accept custom className", () => {
      const { container } = render(
        <EventList events={mockEvents} className="custom-event-list" />,
      );

      const section = container.querySelector(".custom-event-list");
      expect(section).toBeInTheDocument();
    });

    it("should forward additional HTML attributes", () => {
      render(<EventList events={mockEvents} data-testid="custom-list" />);

      const section = screen.getByTestId("custom-list");
      expect(section).toBeInTheDocument();
    });
  });

  describe("Single Event", () => {
    it("should render correctly with single event", () => {
      render(<EventList events={[mockEvents[0]]} />);

      expect(screen.getAllByRole("article")).toHaveLength(1);
      expect(screen.getByText("Atelier varié abcde")).toBeInTheDocument();
    });
  });

  describe("Many Events", () => {
    it("should render correctly with many events", () => {
      const manyEvents = [
        ...mockEvents,
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
      ];

      render(<EventList events={manyEvents} />);

      expect(screen.getAllByRole("article")).toHaveLength(5);
    });
  });
});

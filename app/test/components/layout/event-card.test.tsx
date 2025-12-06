import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EventCard } from "../../../components/layout/event-card";

describe("EventCard Component - Pregnancy-Safe Testing", () => {
  const mockEvent = {
    id: "event-1",
    title: "Atelier varié abcde",
    date: "7 Juin 2025",
    time: "13:00",
  };

  describe("Basic Rendering", () => {
    it("should render event card with all required elements", () => {
      render(<EventCard {...mockEvent} detailsHref="#" />);

      expect(screen.getByText(mockEvent.title)).toBeInTheDocument();
      expect(screen.getByText(`${mockEvent.date} - ${mockEvent.time}`)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /détails/i })).toBeInTheDocument();
    });

    it("should render with placeholder when no image provided", () => {
      render(<EventCard {...mockEvent} detailsHref="#" />);

      const article = screen.getByRole("article");
      expect(article).toBeInTheDocument();
      
      // Should have fallback background color
      const imageContainer = article.querySelector("div");
      expect(imageContainer).toHaveClass("bg-cool");
    });

    it("should render with image when imageUrl provided", () => {
      render(
        <EventCard
          {...mockEvent}
          imageUrl="/images/events/test.jpg"
          imageAlt="Test event"
          detailsHref="#"
        />
      );

      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("src", "/images/events/test.jpg");
      expect(image).toHaveAttribute("alt", "Test event");
    });

    it("should use title as alt text when imageAlt not provided", () => {
      render(
        <EventCard
          {...mockEvent}
          imageUrl="/images/events/test.jpg"
          detailsHref="#"
        />
      );

      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("alt", mockEvent.title);
    });
  });

  describe("Accessibility - WCAG 2.1 AA", () => {
    it("should have semantic article element", () => {
      render(<EventCard {...mockEvent} detailsHref="#" />);

      const article = screen.getByRole("article");
      expect(article).toBeInTheDocument();
      expect(article).toHaveAttribute("aria-labelledby", `event-title-${mockEvent.id}`);
    });

    it("should have proper heading with id for aria-labelledby", () => {
      render(<EventCard {...mockEvent} detailsHref="#" />);

      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toHaveAttribute("id", `event-title-${mockEvent.id}`);
      expect(heading).toHaveTextContent(mockEvent.title);
    });

    it("should have semantic time element with dateTime attribute", () => {
      render(<EventCard {...mockEvent} detailsHref="#" />);

      const timeElement = screen.getByText(`${mockEvent.date} - ${mockEvent.time}`);
      expect(timeElement.tagName).toBe("TIME");
      expect(timeElement).toHaveAttribute("dateTime", `${mockEvent.date} ${mockEvent.time}`);
    });

    it("should have descriptive aria-label for details button", () => {
      render(<EventCard {...mockEvent} detailsHref="#" />);

      const button = screen.getByRole("link", { name: `Voir les détails de ${mockEvent.title}` });
      expect(button).toBeInTheDocument();
    });

    it("should support keyboard navigation with link", () => {
      render(<EventCard {...mockEvent} detailsHref="/event-details" />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/event-details");
    });

    it("should support lazy loading for images", () => {
      render(
        <EventCard
          {...mockEvent}
          imageUrl="/images/events/test.jpg"
          detailsHref="#"
        />
      );

      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("loading", "lazy");
    });
  });

  describe("Button Interactions", () => {
    it("should render button with href as link", () => {
      render(<EventCard {...mockEvent} detailsHref="/event-1" />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/event-1");
      expect(link).toHaveTextContent("DÉTAILS");
    });

    it("should render button with click handler", () => {
      const handleClick = vi.fn();
      render(<EventCard {...mockEvent} onDetailsClick={handleClick} />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("DÉTAILS");
    });

    it("should have minimum touch target size (44px)", () => {
      render(<EventCard {...mockEvent} detailsHref="#" />);

      const button = screen.getByRole("link");
      expect(button).toHaveClass("min-h-[44px]");
    });
  });

  describe("Pregnancy-Safe Design Validation", () => {
    it("should use pregnancy-safe colors (primary green)", () => {
      render(<EventCard {...mockEvent} detailsHref="#" />);

      const heading = screen.getByRole("heading");
      expect(heading).toHaveClass("text-primary");

      const button = screen.getByRole("link");
      expect(button).toHaveClass("bg-primary");
    });

    it("should have rounded corners for soft visual feel", () => {
      render(<EventCard {...mockEvent} detailsHref="#" />);

      const article = screen.getByRole("article");
      const imageContainer = article.querySelector("div");
      
      expect(imageContainer).toHaveClass("rounded-xl");
    });

    it("should support reduced motion for pregnancy-safe animations", () => {
      render(<EventCard {...mockEvent} detailsHref="#" />);

      const article = screen.getByRole("article");
      expect(article).toHaveClass("motion-safe:transition-transform");
    });
  });

  describe("French Content Support (fr-CA)", () => {
    it("should handle French date format correctly", () => {
      const frenchEvent = {
        id: "event-fr",
        title: "Cercle de femmes",
        date: "14 Juin 2025",
        time: "19:00",
      };

      render(<EventCard {...frenchEvent} detailsHref="#" />);

      expect(screen.getByText("Cercle de femmes")).toBeInTheDocument();
      expect(screen.getByText("14 Juin 2025 - 19:00")).toBeInTheDocument();
    });

    it("should display DÉTAILS button in French", () => {
      render(<EventCard {...mockEvent} detailsHref="#" />);

      expect(screen.getByRole("link", { name: /détails/i })).toHaveTextContent("DÉTAILS");
    });
  });

  describe("Responsive Layout", () => {
    it("should have responsive flex layout classes", () => {
      render(<EventCard {...mockEvent} detailsHref="#" />);

      const article = screen.getByRole("article");
      expect(article).toHaveClass("flex", "flex-col");
      
      // Info section should stack on mobile, horizontal on larger screens
      const infoSection = article.querySelectorAll("div")[1];
      expect(infoSection).toHaveClass("sm:flex-row");
    });

    it("should have aspect-video for image container", () => {
      render(<EventCard {...mockEvent} detailsHref="#" />);

      const article = screen.getByRole("article");
      const imageContainer = article.querySelector("div");
      
      expect(imageContainer).toHaveClass("aspect-video");
    });
  });

  describe("Custom Styling", () => {
    it("should accept custom className", () => {
      render(
        <EventCard
          {...mockEvent}
          detailsHref="#"
          className="custom-event-card"
        />
      );

      const article = screen.getByRole("article");
      expect(article).toHaveClass("custom-event-card");
    });

    it("should forward additional HTML attributes", () => {
      render(
        <EventCard
          {...mockEvent}
          detailsHref="#"
          data-testid="custom-event"
          role="article"
        />
      );

      const article = screen.getByTestId("custom-event");
      expect(article).toBeInTheDocument();
    });
  });
});

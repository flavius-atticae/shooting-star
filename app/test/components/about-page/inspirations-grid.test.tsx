import React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { InspirationsGrid } from "~/components/layout/about-page/inspirations-grid";

describe("InspirationsGrid Component", () => {
  describe("Rendering", () => {
    it("should render section title", () => {
      render(<InspirationsGrid />);

      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("Mes inspirations");
    });

    it("should render 3 inspiration cards by default", () => {
      render(<InspirationsGrid />);

      const list = screen.getByRole("list");
      const items = within(list).getAllByRole("listitem");

      expect(items).toHaveLength(3);
    });

    it("should render all default inspiration titles", () => {
      render(<InspirationsGrid />);

      expect(screen.getByText("Holistique")).toBeInTheDocument();
      expect(screen.getByText("Bienveillante")).toBeInTheDocument();
      expect(screen.getByText("Engagée")).toBeInTheDocument();
    });
  });

  describe("Layout and Responsive Grid", () => {
    it("should apply responsive grid classes", () => {
      render(<InspirationsGrid data-testid="grid-section" />);

      const section = screen.getByTestId("grid-section");
      const grid = section.querySelector(".grid");

      expect(grid).toHaveClass("grid-cols-1"); // Mobile
      expect(grid).toHaveClass("md:grid-cols-2"); // Tablet
      expect(grid).toHaveClass("lg:grid-cols-3"); // Desktop
    });

    it("should apply generous spacing between cards", () => {
      render(<InspirationsGrid data-testid="grid-section" />);

      const section = screen.getByTestId("grid-section");
      const grid = section.querySelector(".grid");

      expect(grid).toHaveClass("gap-8", "sm:gap-10", "lg:gap-12");
    });
  });

  describe("Typography and Styling", () => {
    it("should apply Ivyora Display font to section title", () => {
      render(<InspirationsGrid />);

      const title = screen.getByText("Mes inspirations");
      expect(title).toHaveClass("font-heading");
    });

    it("should center section title", () => {
      render(<InspirationsGrid />);

      const title = screen.getByText("Mes inspirations");
      expect(title).toHaveClass("text-center");
    });

    it("should use primary color for section title", () => {
      render(<InspirationsGrid />);

      const title = screen.getByText("Mes inspirations");
      expect(title).toHaveClass("text-primary");
    });

    it("should apply responsive text sizes to title", () => {
      render(<InspirationsGrid />);

      const title = screen.getByText("Mes inspirations");
      expect(title).toHaveClass("text-4xl", "sm:text-5xl", "lg:text-6xl");
    });
  });

  describe("Accessibility (WCAG 2.1 AA)", () => {
    it("should have proper aria-labelledby on section", () => {
      render(<InspirationsGrid />);

      const section = screen.getByRole("region");
      expect(section).toHaveAttribute(
        "aria-labelledby",
        "inspirations-heading"
      );

      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toHaveAttribute("id", "inspirations-heading");
    });

    it("should have French language attribute", () => {
      render(<InspirationsGrid />);

      const section = screen.getByRole("region");
      expect(section).toHaveAttribute("lang", "fr");
    });

    it("should use semantic list structure", () => {
      render(<InspirationsGrid />);

      const list = screen.getByRole("list");
      const items = within(list).getAllByRole("listitem");

      expect(list).toBeInTheDocument();
      expect(items.length).toBeGreaterThan(0);
    });

    it("should have proper heading hierarchy", () => {
      render(<InspirationsGrid />);

      const h2 = screen.getByRole("heading", { level: 2 });
      const h3s = screen.getAllByRole("heading", { level: 3 });

      expect(h2).toBeInTheDocument();
      expect(h3s).toHaveLength(3); // One for each card
    });
  });

  describe("Custom Props", () => {
    it("should accept custom className", () => {
      render(
        <InspirationsGrid className="custom-class" data-testid="custom-grid" />
      );

      const section = screen.getByTestId("custom-grid");
      expect(section).toHaveClass("custom-class");
    });

    it("should accept custom inspirations array", () => {
      const customInspirations = [
        {
          id: "custom-1",
          title: "Custom Title 1",
          description: "Custom description 1",
        },
        {
          id: "custom-2",
          title: "Custom Title 2",
          description: "Custom description 2",
        },
      ];

      render(<InspirationsGrid inspirations={customInspirations} />);

      expect(screen.getByText("Custom Title 1")).toBeInTheDocument();
      expect(screen.getByText("Custom Title 2")).toBeInTheDocument();
      expect(screen.queryByText("Holistique")).not.toBeInTheDocument();
    });

    it("should forward other HTML attributes", () => {
      render(
        <InspirationsGrid
          data-testid="attributed-grid"
          data-category="about-page"
        />
      );

      const section = screen.getByTestId("attributed-grid");
      expect(section).toHaveAttribute("data-category", "about-page");
    });
  });

  describe("Default Content Validation", () => {
    it("should render Holistique card with full content", () => {
      render(<InspirationsGrid />);

      expect(screen.getByText("Holistique")).toBeInTheDocument();
      expect(
        screen.getByText(/Ma méthode considère la Femme dans sa globalité/)
      ).toBeInTheDocument();
    });

    it("should render Bienveillante card with full content", () => {
      render(<InspirationsGrid />);

      expect(screen.getByText("Bienveillante")).toBeInTheDocument();
      expect(
        screen.getByText(/Je crée un espace doux, sécurisant/)
      ).toBeInTheDocument();
    });

    it("should render Engagée card with full content", () => {
      render(<InspirationsGrid />);

      expect(screen.getByText("Engagée")).toBeInTheDocument();
      expect(
        screen.getByText(/Je m'implique pleinement/)
      ).toBeInTheDocument();
    });
  });

  describe("Grid Structure", () => {
    it("should wrap each card in a listitem", () => {
      render(<InspirationsGrid />);

      const list = screen.getByRole("list");
      const items = within(list).getAllByRole("listitem");

      items.forEach((item) => {
        const article = within(item).getByRole("article");
        expect(article).toBeInTheDocument();
      });
    });

    it("should maintain card order", () => {
      render(<InspirationsGrid />);

      const headings = screen.getAllByRole("heading", { level: 3 });
      expect(headings[0]).toHaveTextContent("Holistique");
      expect(headings[1]).toHaveTextContent("Bienveillante");
      expect(headings[2]).toHaveTextContent("Engagée");
    });
  });

  describe("Spacing and Layout", () => {
    it("should have consistent vertical spacing", () => {
      render(<InspirationsGrid data-testid="grid-section" />);

      const section = screen.getByTestId("grid-section");
      expect(section).toHaveClass("space-y-8", "sm:space-y-10", "lg:space-y-12");
    });
  });
});

import React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AboutSection } from "~/components/layout/about-page/about-section";

describe("AboutSection Component", () => {
  describe("Rendering", () => {
    it("should render section title", () => {
      render(<AboutSection />);

      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("À propos de moi");
    });

    it("should render all four subsections", () => {
      render(<AboutSection />);

      expect(
        screen.getByRole("heading", { name: /Qui suis-je\?/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /Mon parcours/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /Ce qui m'inspire/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /Ma méthode/i })
      ).toBeInTheDocument();
    });

    it("should render photo placeholder with caption", () => {
      render(<AboutSection />);

      const photo = screen.getByRole("img");
      expect(photo).toBeInTheDocument();

      const caption = screen.getByText("Pauline Roussel");
      const subtitle = screen.getByText("Doula et professeure de yoga");

      expect(caption).toBeInTheDocument();
      expect(subtitle).toBeInTheDocument();
    });
  });

  describe("Layout and Responsive Grid", () => {
    it("should apply two-column layout on desktop", () => {
      render(<AboutSection data-testid="about-section" />);

      const section = screen.getByTestId("about-section");
      const grid = section.querySelector(".grid");

      expect(grid).toHaveClass("grid-cols-1"); // Mobile
      expect(grid).toHaveClass("lg:grid-cols-3"); // Desktop: 3 columns (2+1)
    });

    it("should have text content span 2 columns on desktop", () => {
      render(<AboutSection data-testid="about-section" />);

      const section = screen.getByTestId("about-section");
      const textColumn = section.querySelector(".lg\\:col-span-2");

      expect(textColumn).toBeInTheDocument();
    });

    it("should have photo span 1 column on desktop", () => {
      render(<AboutSection data-testid="about-section" />);

      const section = screen.getByTestId("about-section");
      const photoColumn = section.querySelector(".lg\\:col-span-1");

      expect(photoColumn).toBeInTheDocument();
    });

    it("should apply generous spacing between sections", () => {
      render(<AboutSection data-testid="about-section" />);

      const section = screen.getByTestId("about-section");
      expect(section).toHaveClass("space-y-8", "sm:space-y-10", "lg:space-y-12");
    });
  });

  describe("Typography and Styling", () => {
    it("should apply Ivyora Display font to section title", () => {
      render(<AboutSection />);

      const title = screen.getByText("À propos de moi");
      expect(title).toHaveClass("font-heading");
    });

    it("should apply Ivyora Display font to subsection titles", () => {
      render(<AboutSection />);

      const quiSuisJe = screen.getByText("Qui suis-je?");
      expect(quiSuisJe).toHaveClass("font-heading");
    });

    it("should apply Barlow font to content paragraphs", () => {
      render(<AboutSection />);

      const content = screen.getByText(/Curieuse et ouverte/);
      expect(content).toHaveClass("font-sans");
    });

    it("should use primary color for text", () => {
      render(<AboutSection />);

      const title = screen.getByText("À propos de moi");
      const content = screen.getByText(/Curieuse et ouverte/);

      expect(title).toHaveClass("text-primary");
      expect(content).toHaveClass("text-primary");
    });

    it("should center section title", () => {
      render(<AboutSection />);

      const title = screen.getByText("À propos de moi");
      expect(title).toHaveClass("text-center");
    });

    it("should apply responsive text sizes", () => {
      render(<AboutSection />);

      const title = screen.getByText("À propos de moi");
      expect(title).toHaveClass("text-4xl", "sm:text-5xl", "lg:text-6xl");
    });
  });

  describe("Accessibility (WCAG 2.1 AA)", () => {
    it("should have proper aria-labelledby on section", () => {
      render(<AboutSection />);

      const section = screen.getByRole("region");
      expect(section).toHaveAttribute(
        "aria-labelledby",
        "about-section-heading"
      );

      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toHaveAttribute("id", "about-section-heading");
    });

    it("should have French language attribute", () => {
      render(<AboutSection />);

      const section = screen.getByRole("region");
      expect(section).toHaveAttribute("lang", "fr");
    });

    it("should have proper heading hierarchy", () => {
      render(<AboutSection />);

      const h2 = screen.getByRole("heading", { level: 2 });
      const h3s = screen.getAllByRole("heading", { level: 3 });

      expect(h2).toBeInTheDocument();
      expect(h3s).toHaveLength(4); // Four subsections
    });

    it("should have proper aria labels for photo", () => {
      render(<AboutSection />);

      const photo = screen.getByRole("img");
      expect(photo).toHaveAttribute("aria-labelledby", "pauline-photo-caption");
      expect(photo).toHaveAttribute(
        "aria-describedby",
        "pauline-photo-description"
      );
    });

    it("should have screen reader description for photo", () => {
      render(<AboutSection />);

      const description = screen.getByText(
        /Photo de Pauline Roussel, doula et professeure/
      );
      expect(description).toHaveClass("sr-only");
    });

    it("should have proper article structure for subsections", () => {
      render(<AboutSection />);

      const articles = screen.getAllByRole("article");
      expect(articles).toHaveLength(4); // Four subsections

      articles.forEach((article) => {
        expect(article).toHaveAttribute("aria-labelledby");
      });
    });
  });

  describe("Content Validation", () => {
    it("should render Qui suis-je content", () => {
      render(<AboutSection />);

      expect(screen.getByText("Qui suis-je?")).toBeInTheDocument();
      expect(
        screen.getByText(/Curieuse et ouverte, j'aime apprendre/)
      ).toBeInTheDocument();
    });

    it("should render Mon parcours content with two paragraphs", () => {
      render(<AboutSection />);

      expect(screen.getByText("Mon parcours")).toBeInTheDocument();
      expect(
        screen.getByText(/Danseuse classique et contemporaine/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Devenir doula s'est imposé/)
      ).toBeInTheDocument();
    });

    it("should render Ce qui m'inspire content", () => {
      render(<AboutSection />);

      expect(screen.getByText("Ce qui m'inspire")).toBeInTheDocument();
      expect(
        screen.getByText(/La puissance et la résilience des femmes/)
      ).toBeInTheDocument();
    });

    it("should render Ma méthode content", () => {
      render(<AboutSection />);

      expect(screen.getByText("Ma méthode")).toBeInTheDocument();
      expect(
        screen.getByText(/Holistique et personnalisée/)
      ).toBeInTheDocument();
    });

    it("should handle French special characters correctly", () => {
      render(<AboutSection />);

      expect(screen.getByText(/s'écouter/)).toBeInTheDocument();
      expect(screen.getByText(/s'épanouir/)).toBeInTheDocument();
    });
  });

  describe("Photo Placeholder", () => {
    it("should have proper aspect ratio", () => {
      render(<AboutSection data-testid="about-section" />);

      const section = screen.getByTestId("about-section");
      const figure = section.querySelector("figure");

      expect(figure).toHaveClass("aspect-[4/5]");
    });

    it("should have rounded corners", () => {
      render(<AboutSection data-testid="about-section" />);

      const section = screen.getByTestId("about-section");
      const figure = section.querySelector("figure");

      expect(figure).toHaveClass("rounded-2xl");
    });

    it("should use primary color background", () => {
      render(<AboutSection data-testid="about-section" />);

      const section = screen.getByTestId("about-section");
      const figure = section.querySelector("figure");

      expect(figure).toHaveClass("bg-primary");
    });

    it("should have white text for caption", () => {
      render(<AboutSection />);

      const caption = screen.getByText("Pauline Roussel");
      expect(caption).toHaveClass("text-white");
    });
  });

  describe("Custom Props", () => {
    it("should accept custom className", () => {
      render(
        <AboutSection className="custom-class" data-testid="custom-section" />
      );

      const section = screen.getByTestId("custom-section");
      expect(section).toHaveClass("custom-class");
    });

    it("should forward other HTML attributes", () => {
      render(
        <AboutSection
          data-testid="attributed-section"
          data-page="about"
        />
      );

      const section = screen.getByTestId("attributed-section");
      expect(section).toHaveAttribute("data-page", "about");
    });
  });

  describe("Responsive Behavior", () => {
    it("should have mobile-first spacing for subsections", () => {
      render(<AboutSection data-testid="about-section" />);

      const section = screen.getByTestId("about-section");
      const textColumn = section.querySelector(".lg\\:col-span-2");

      expect(textColumn).toHaveClass("space-y-8", "sm:space-y-10");
    });

    it("should have minimum height for photo on mobile", () => {
      render(<AboutSection data-testid="about-section" />);

      const section = screen.getByTestId("about-section");
      const figure = section.querySelector("figure");

      expect(figure).toHaveClass("min-h-[350px]", "sm:min-h-[450px]");
    });
  });
});

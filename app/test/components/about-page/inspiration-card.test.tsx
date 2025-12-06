import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { InspirationCard } from "~/components/layout/about-page/inspiration-card";

describe("InspirationCard Component", () => {
  describe("Rendering", () => {
    it("should render with title and description", () => {
      render(
        <InspirationCard
          id="test-card"
          title="Holistique"
          description="Ma méthode considère la Femme dans sa globalité."
        />
      );

      const title = screen.getByText("Holistique");
      const description = screen.getByText(/Ma méthode considère/);

      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    it("should use correct heading level (h3)", () => {
      render(
        <InspirationCard
          id="test-card"
          title="Test Title"
          description="Test description"
        />
      );

      const title = screen.getByRole("heading", { level: 3 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("Test Title");
    });
  });

  describe("Typography and Styling", () => {
    it("should apply Moontime font (script/cursive) to title", () => {
      render(
        <InspirationCard
          id="test-card"
          title="Bienveillante"
          description="Test description"
        />
      );

      const title = screen.getByText("Bienveillante");
      expect(title).toHaveClass("font-accent");
    });

    it("should apply Barlow font to description", () => {
      render(
        <InspirationCard
          id="test-card"
          title="Test"
          description="Test description"
        />
      );

      const description = screen.getByText("Test description");
      expect(description).toHaveClass("font-sans");
    });

    it("should use primary color for text", () => {
      render(
        <InspirationCard
          id="test-card"
          title="Test"
          description="Test description"
        />
      );

      const title = screen.getByText("Test");
      const description = screen.getByText("Test description");

      expect(title).toHaveClass("text-primary");
      expect(description).toHaveClass("text-primary");
    });

    it("should apply responsive text sizes", () => {
      render(
        <InspirationCard
          id="test-card"
          title="Test Title"
          description="Test description"
        />
      );

      const title = screen.getByText("Test Title");
      expect(title).toHaveClass("text-3xl", "sm:text-4xl", "lg:text-5xl");
    });
  });

  describe("Accessibility (WCAG 2.1 AA)", () => {
    it("should have proper aria-labelledby linking title and content", () => {
      render(
        <InspirationCard
          id="holistique"
          title="Holistique"
          description="Test description"
        />
      );

      const article = screen.getByRole("article");
      expect(article).toHaveAttribute(
        "aria-labelledby",
        "inspiration-holistique-title"
      );

      const title = screen.getByRole("heading");
      expect(title).toHaveAttribute("id", "inspiration-holistique-title");
    });

    it("should have French language attribute", () => {
      render(
        <InspirationCard
          id="test-card"
          title="Test"
          description="Test description"
        />
      );

      const article = screen.getByRole("article");
      expect(article).toHaveAttribute("lang", "fr");
    });

    it("should have proper semantic structure", () => {
      render(
        <InspirationCard
          id="test-card"
          title="Engagée"
          description="Je m'implique pleinement."
        />
      );

      const article = screen.getByRole("article");
      const heading = screen.getByRole("heading");

      expect(article).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
    });
  });

  describe("Custom Props", () => {
    it("should accept custom className", () => {
      render(
        <InspirationCard
          id="test-card"
          title="Test"
          description="Test description"
          className="custom-class"
          data-testid="custom-card"
        />
      );

      const article = screen.getByTestId("custom-card");
      expect(article).toHaveClass("custom-class");
    });

    it("should forward other HTML attributes", () => {
      render(
        <InspirationCard
          id="test-card"
          title="Test"
          description="Test description"
          data-testid="test-card"
          data-category="inspiration"
        />
      );

      const article = screen.getByTestId("test-card");
      expect(article).toHaveAttribute("data-category", "inspiration");
    });
  });

  describe("Content Handling", () => {
    it("should handle long descriptions gracefully", () => {
      const longDescription =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(10);

      render(
        <InspirationCard
          id="test-card"
          title="Test"
          description={longDescription}
        />
      );

      const description = screen.getByText(/Lorem ipsum/);
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass("leading-relaxed");
    });

    it("should handle French special characters", () => {
      render(
        <InspirationCard
          id="test-card"
          title="Bienveillante"
          description="Je crée un espace doux, sécurisant et empathique."
        />
      );

      const description = screen.getByText(/Je crée un espace/);
      expect(description).toBeInTheDocument();
    });
  });

  describe("Real Content Examples", () => {
    it("should render Holistique card correctly", () => {
      render(
        <InspirationCard
          id="holistique"
          title="Holistique"
          description="Ma méthode considère la Femme dans sa globalité : corps, mental, émotions et énergie."
        />
      );

      expect(screen.getByText("Holistique")).toBeInTheDocument();
      expect(
        screen.getByText(/Ma méthode considère la Femme/)
      ).toBeInTheDocument();
    });

    it("should render Bienveillante card correctly", () => {
      render(
        <InspirationCard
          id="bienveillante"
          title="Bienveillante"
          description="Je crée un espace doux, sécurisant et empathique."
        />
      );

      expect(screen.getByText("Bienveillante")).toBeInTheDocument();
      expect(screen.getByText(/Je crée un espace doux/)).toBeInTheDocument();
    });

    it("should render Engagée card correctly", () => {
      render(
        <InspirationCard
          id="engagee"
          title="Engagée"
          description="Je m'implique pleinement pour t'accompagner à chaque étape."
        />
      );

      expect(screen.getByText("Engagée")).toBeInTheDocument();
      expect(
        screen.getByText(/Je m'implique pleinement/)
      ).toBeInTheDocument();
    });
  });
});

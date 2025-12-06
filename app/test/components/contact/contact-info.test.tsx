import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ContactInfo } from "../../../components/contact/contact-info";

describe("ContactInfo Component", () => {
  describe("Rendering", () => {
    it("should render the title", () => {
      render(<ContactInfo />);

      expect(
        screen.getByRole("heading", { name: /écris-moi/i })
      ).toBeInTheDocument();
    });

    it("should render the introduction text", () => {
      render(<ContactInfo />);

      expect(
        screen.getByText(/contacte-moi pour échanger sur ton parcours/i)
      ).toBeInTheDocument();
    });

    it("should render the location", () => {
      render(<ContactInfo />);

      expect(
        screen.getByText(/grande région de montréal/i)
      ).toBeInTheDocument();
    });

    it("should render the email as a clickable link", () => {
      render(<ContactInfo />);

      const emailLink = screen.getByRole("link", {
        name: /envoyer un courriel à pauline roussel/i,
      });
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveAttribute(
        "href",
        "mailto:pauline.roussel@gmail.com"
      );
    });

    it("should render the personal message", () => {
      render(<ContactInfo />);

      expect(
        screen.getByText(/j'ai hâte de faire ta rencontre/i)
      ).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should have primary text color", () => {
      const { container } = render(<ContactInfo />);

      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("text-primary");
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading hierarchy", () => {
      render(<ContactInfo />);

      const heading = screen.getByRole("heading", { name: /écris-moi/i });
      expect(heading.tagName).toBe("H2");
    });

    it("should have accessible email link", () => {
      render(<ContactInfo />);

      const emailLink = screen.getByRole("link", {
        name: /envoyer un courriel à pauline roussel/i,
      });
      expect(emailLink).toHaveAccessibleName(
        "Envoyer un courriel à Pauline Roussel"
      );
    });

    it("should hide icon from screen readers", () => {
      const { container } = render(<ContactInfo />);

      const icons = container.querySelectorAll('[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe("French Content", () => {
    it("should display all content in French", () => {
      render(<ContactInfo />);

      expect(screen.getByText(/écris-moi/i)).toBeInTheDocument();
      expect(
        screen.getByText(/contacte-moi pour échanger/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/grande région de montréal/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/j'ai hâte de faire ta rencontre/i)
      ).toBeInTheDocument();
    });
  });

  describe("Pregnancy-Safe Design", () => {
    it("should use calming green text color", () => {
      const { container } = render(<ContactInfo />);

      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("text-primary");
    });

    it("should have adequate spacing for readability", () => {
      const { container } = render(<ContactInfo />);

      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("gap-6");
    });
  });

  describe("Custom Props", () => {
    it("should apply custom className", () => {
      const { container } = render(<ContactInfo className="custom-class" />);

      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("custom-class");
    });

    it("should pass through additional HTML attributes", () => {
      const { container } = render(
        <ContactInfo data-testid="contact-info-test" />
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("data-testid", "contact-info-test");
    });
  });
});

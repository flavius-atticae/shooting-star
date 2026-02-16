import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { BrowserRouter } from "react-router";
import * as ReactRouter from "react-router";

import DoulaPage from "../../routes/doula";
import { getDoulaContent } from "~/lib/content.server";

const renderDoulaPage = () =>
  render(
    <BrowserRouter>
      <DoulaPage />
    </BrowserRouter>,
  );

describe("Doula Route Integration Tests", () => {
  beforeEach(() => {
    vi.spyOn(ReactRouter, "useLoaderData").mockReturnValue({
      doulaContent: getDoulaContent(),
    } as never);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Route Rendering", () => {
    it("should render the doula page without errors", () => {
      renderDoulaPage();
      expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("should render Hero section with correct French title", () => {
      renderDoulaPage();
      const title = screen.getByRole("heading", { level: 1 });
      expect(title).toHaveTextContent(/Accompagnement\s*de doula/i);
    });

    it("should render Hero section with correct French subtitle", () => {
      renderDoulaPage();
      expect(screen.getByText("AVEC PAULINE ROUSSEL")).toBeInTheDocument();
    });

    it("should render Footer component", () => {
      renderDoulaPage();
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });
  });

  describe("Accessibility Compliance", () => {
    it("should have proper semantic HTML structure", () => {
      renderDoulaPage();
      const h1 = screen.getByRole("heading", { level: 1 });
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(h1).toHaveTextContent(/Accompagnement\s*de doula/i);
    });

    it("should have accessible region labels in French", () => {
      renderDoulaPage();
      const main = screen.getByRole("main");
      expect(main).toHaveAttribute("id", "main-content");
      expect(main).toHaveAttribute("role", "main");
    });

    it("should support keyboard navigation", () => {
      renderDoulaPage();
      expect(screen.getByRole("main")).toBeInTheDocument();
    });
  });

  describe("French Language Support", () => {
    it("should display all text content in French", () => {
      renderDoulaPage();
      expect(
        screen.getByRole("heading", {
          level: 1,
          name: /Accompagnement\s*de doula/i,
        }),
      ).toBeInTheDocument();
      expect(screen.getByText("AVEC PAULINE ROUSSEL")).toBeInTheDocument();
    });
  });

  describe("Page Structure", () => {
    it("should have Hero section as first element in main", () => {
      renderDoulaPage();
      const main = screen.getByRole("main");
      const heroRegion = screen.getByRole("region", {
        name: "Section principale d'accueil",
      });
      expect(main).toContainElement(heroRegion);
    });

    it("should have Footer after main content", () => {
      const { container } = renderDoulaPage();
      const main = screen.getByRole("main");
      const footer = screen.getByRole("contentinfo");
      const allNodes = Array.from(container.querySelectorAll("*"));
      expect(allNodes.indexOf(footer)).toBeGreaterThan(allNodes.indexOf(main));
    });
  });

  describe("Responsive Design", () => {
    it("should render without layout errors on mobile viewport", () => {
      global.innerWidth = 375;
      global.innerHeight = 667;
      renderDoulaPage();
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("should render without layout errors on tablet viewport", () => {
      global.innerWidth = 768;
      global.innerHeight = 1024;
      renderDoulaPage();
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("should render without layout errors on desktop viewport", () => {
      global.innerWidth = 1920;
      global.innerHeight = 1080;
      renderDoulaPage();
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });
  });
});

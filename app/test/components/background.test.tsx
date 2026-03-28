import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Background } from "~/components/ui";

describe("Background", () => {
  it("renders children", () => {
    render(
      <Background data-testid="bg">
        <div>content</div>
      </Background>,
    );
    expect(screen.getByTestId("bg")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("renders as a custom element", () => {
    render(
      <Background as="section" data-testid="bg">
        <div />
      </Background>,
    );
    expect(screen.getByTestId("bg").tagName).toBe("SECTION");
  });

  it("applies custom className", () => {
    render(
      <Background className="my-class" data-testid="bg">
        <div />
      </Background>,
    );
    expect(screen.getByTestId("bg")).toHaveClass("my-class");
  });

  it("supports aria-label on wrapper", () => {
    render(
      <Background data-testid="bg">
        <section aria-label="Contenu principal">
          <p>texte</p>
        </section>
      </Background>,
    );
    expect(screen.getByRole("region")).toHaveAttribute("aria-label", "Contenu principal");
  });

  it("renders semantic heading inside", () => {
    render(
      <Background as="main" data-testid="bg">
        <h1>Titre</h1>
      </Background>,
    );
    expect(screen.getByTestId("bg").tagName).toBe("MAIN");
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});

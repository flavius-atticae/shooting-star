import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container } from "~/components/ui";

describe("Container", () => {
  it("renders children", () => {
    render(
      <Container data-testid="c">
        <p>content</p>
      </Container>,
    );
    expect(screen.getByTestId("c")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("renders as a custom element", () => {
    render(
      <Container as="section" data-testid="c">
        <div />
      </Container>,
    );
    expect(screen.getByTestId("c").tagName).toBe("SECTION");
  });

  it("applies custom className", () => {
    render(
      <Container className="my-class" data-testid="c">
        <div />
      </Container>,
    );
    expect(screen.getByTestId("c")).toHaveClass("my-class");
  });

  it("forwards arbitrary HTML attributes", () => {
    render(
      <Container data-testid="c" aria-label="Zone principale">
        <div />
      </Container>,
    );
    expect(screen.getByTestId("c")).toHaveAttribute("aria-label", "Zone principale");
  });

  it("renders semantic heading inside", () => {
    render(
      <Container as="main" data-testid="c">
        <h1>Titre</h1>
      </Container>,
    );
    expect(screen.getByTestId("c").tagName).toBe("MAIN");
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});

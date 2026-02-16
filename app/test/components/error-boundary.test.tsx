import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { ErrorBoundary } from "~/root";

/**
 * ErrorBoundary localization tests
 *
 * Verifies that the ErrorBoundary component in root.tsx
 * displays French (fr-CA) messages for the Quebec audience.
 */

// Helper to build a mock RouteErrorResponse
function createRouteErrorResponse(status: number, statusText?: string) {
  return {
    status,
    statusText: statusText ?? "",
    data: null,
    internal: true,
  };
}

describe("ErrorBoundary — French localization", () => {
  it("should display a generic error message in French for unknown errors", () => {
    render(<ErrorBoundary error={new Error("something broke")} params={{}} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Oups!",
    );
    expect(screen.getByText("something broke")).toBeInTheDocument();
  });

  it("should display the 404 message in French", () => {
    const error = createRouteErrorResponse(404);

    render(<ErrorBoundary error={error} params={{}} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("404");
    expect(
      screen.getByText("La page demandée est introuvable."),
    ).toBeInTheDocument();
  });

  it("should display a generic route error heading in French for non-404 HTTP errors", () => {
    const error = createRouteErrorResponse(500, "Internal Server Error");

    render(<ErrorBoundary error={error} params={{}} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Erreur",
    );
    expect(screen.getByText("Internal Server Error")).toBeInTheDocument();
  });

  it("should not contain any English fallback messages", () => {
    render(<ErrorBoundary error={new Error("boom")} params={{}} />);

    expect(screen.queryByText(/Oops!/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText("An unexpected error occurred."),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("The requested page could not be found."),
    ).not.toBeInTheDocument();
  });
});

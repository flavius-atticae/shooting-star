import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";
import { vi } from "vitest";

// Configure React Testing Library defaults
configure({
  // Allow extra time for async operations in component tests
  asyncUtilTimeout: 3000,
  // Ensure we test in a way that reflects real user interaction
  testIdAttribute: "data-testid",
});

// Mock IntersectionObserver for components that use it
class MockIntersectionObserver {
  disconnect = vi.fn();
  observe = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock ResizeObserver for responsive components (e.g. embla-carousel calls `new ResizeObserver()`)
class MockResizeObserver {
  disconnect = vi.fn();
  observe = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
});

Object.defineProperty(global, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
});

// Mock window.scrollTo for components that control scroll behavior
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: vi.fn(),
});

// Quebec/French locale considerations for testing
Object.defineProperty(navigator, "language", {
  writable: true,
  value: "fr-CA",
});

Object.defineProperty(navigator, "languages", {
  writable: true,
  value: ["fr-CA", "fr", "en-CA", "en"],
});

// Mock Intl for consistent date/currency formatting in tests
// Must use class syntax — Biome converts function expressions to arrow functions,
// and arrow functions cannot be used as constructors (called with `new`)
class MockDateTimeFormat {
  private _locale: string;
  constructor(locale: string, _options?: Intl.DateTimeFormatOptions) {
    this._locale = locale;
  }
  format(date: Date): string {
    if (this._locale?.includes("fr")) {
      return date.toLocaleDateString("fr-CA");
    }
    return date.toLocaleDateString("en-CA");
  }
  formatToParts = vi.fn();
  resolvedOptions = vi.fn();
}

class MockNumberFormat {
  private _locale: string;
  private _options: Intl.NumberFormatOptions;
  constructor(locale: string, options?: Intl.NumberFormatOptions) {
    this._locale = locale;
    this._options = options ?? {};
  }
  format(number: number): string {
    if (this._options?.style === "currency") {
      return `${number.toFixed(2)} $ CAD`;
    }
    return number.toLocaleString(this._locale);
  }
  formatToParts = vi.fn();
  resolvedOptions = vi.fn(() => this._options);
}

global.Intl = {
  ...global.Intl,
  DateTimeFormat: MockDateTimeFormat as unknown as typeof Intl.DateTimeFormat,
  NumberFormat: MockNumberFormat as unknown as typeof Intl.NumberFormat,
};

// Mock window.matchMedia for responsive/dark mode testing
// Default to reduced motion to match accessibility best practices
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => {
    const reducedMotion = query.includes("prefers-reduced-motion");
    return {
      matches: reducedMotion ? true : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  }),
});

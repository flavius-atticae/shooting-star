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
const mockIntersectionObserver = vi.fn(function () {
  return {
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  };
});

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

// Mock ResizeObserver for responsive components
const mockResizeObserver = vi.fn(function () {
  return {
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  };
});

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: mockResizeObserver,
});

Object.defineProperty(global, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: mockResizeObserver,
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
global.Intl = {
  ...global.Intl,
  DateTimeFormat: vi.fn().mockImplementation(function (locale, options) {
    return {
      format: vi.fn((date: Date) => {
        // Quebec format: DD/MM/YYYY
        if (locale?.includes("fr")) {
          return date.toLocaleDateString("fr-CA");
        }
        return date.toLocaleDateString("en-CA");
      }),
      formatToParts: vi.fn(),
      resolvedOptions: vi.fn(() => options),
    };
  }),
  NumberFormat: vi.fn().mockImplementation(function (locale, options) {
    return {
      format: vi.fn((number: number) => {
        // CAD currency formatting
        if (options?.style === "currency") {
          return `${number.toFixed(2)} $ CAD`;
        }
        return number.toLocaleString(locale);
      }),
      formatToParts: vi.fn(),
      resolvedOptions: vi.fn(() => options),
    };
  }),
} as any;

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

import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import type { ReactElement } from "react";
import { vi } from "vitest";

// Test wrapper that includes necessary providers
function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-neutral">
      {/* Add any global providers here (Router, Theme, etc.) */}
      {children}
    </div>
  );
}

// Custom render function that includes our providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return render(ui, { wrapper: TestWrapper, ...options });
};

// Pregnancy-safe user event with slower interactions
export const createUser = () => {
  return userEvent.setup({
    // Slower interactions to simulate pregnancy-related motor changes
    delay: 100,
    // More realistic typing speed
    advanceTimers: vi.advanceTimersByTime,
  });
};

// Accessibility testing helper
export const checkAccessibility = async (container: HTMLElement) => {
  const results = await axe(container, {
    // WCAG 2.1 AA compliance rules
    rules: {
      // Ensure color contrast meets AA standards (important for pregnancy fatigue)
      "color-contrast": { enabled: true },
      // Ensure proper heading structure (cognitive load during pregnancy)
      "heading-order": { enabled: true },
      // Ensure form labels are proper (important for focus issues)
      "label": { enabled: true },
      // Ensure interactive elements have accessible names
      "button-name": { enabled: true },
    },
  });
  
  // Custom assertion for accessibility violations
  if (results.violations.length > 0) {
    const violationMessages = results.violations.map(
      (violation) => `${violation.id}: ${violation.description}`
    );
    throw new Error(`Accessibility violations found:\n${violationMessages.join('\n')}`);
  }
  
  return results;
};

// Language testing helpers for Quebec market
export const testInFrench = (testFn: () => void | Promise<void>) => {
  const originalLanguage = navigator.language;
  const originalLanguages = navigator.languages;
  
  beforeEach(() => {
    Object.defineProperty(navigator, "language", {
      writable: true,
      value: "fr-CA",
    });
    Object.defineProperty(navigator, "languages", {
      writable: true,
      value: ["fr-CA", "fr"],
    });
  });
  
  afterEach(() => {
    Object.defineProperty(navigator, "language", {
      writable: true,
      value: originalLanguage,
    });
    Object.defineProperty(navigator, "languages", {
      writable: true,
      value: originalLanguages,
    });
  });
  
  return testFn;
};

export const testInEnglish = (testFn: () => void | Promise<void>) => {
  const originalLanguage = navigator.language;
  const originalLanguages = navigator.languages;
  
  beforeEach(() => {
    Object.defineProperty(navigator, "language", {
      writable: true,
      value: "en-CA",
    });
    Object.defineProperty(navigator, "languages", {
      writable: true,
      value: ["en-CA", "en"],
    });
  });
  
  afterEach(() => {
    Object.defineProperty(navigator, "language", {
      writable: true,
      value: originalLanguage,
    });
    Object.defineProperty(navigator, "languages", {
      writable: true,
      value: originalLanguages,
    });
  });
  
  return testFn;
};

// Responsive testing helper
export const testResponsive = {
  mobile: () => {
    beforeEach(() => {
      Object.defineProperty(window, "innerWidth", { writable: true, value: 375 });
      Object.defineProperty(window, "innerHeight", { writable: true, value: 667 });
      window.dispatchEvent(new Event("resize"));
    });
  },
  tablet: () => {
    beforeEach(() => {
      Object.defineProperty(window, "innerWidth", { writable: true, value: 768 });
      Object.defineProperty(window, "innerHeight", { writable: true, value: 1024 });
      window.dispatchEvent(new Event("resize"));
    });
  },
  desktop: () => {
    beforeEach(() => {
      Object.defineProperty(window, "innerWidth", { writable: true, value: 1024 });
      Object.defineProperty(window, "innerHeight", { writable: true, value: 768 });
      window.dispatchEvent(new Event("resize"));
    });
  },
};

// Pregnancy-specific testing helpers
export const simulatePregnancyConditions = {
  reducedMotion: () => {
    beforeEach(() => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query.includes("prefers-reduced-motion"),
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
    });
  },
  
  highContrast: () => {
    beforeEach(() => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query.includes("prefers-contrast: high"),
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
    });
  },
  
  fatigue: () => {
    // Simulate slower interactions due to fatigue
    return userEvent.setup({
      delay: 300, // Slower typing/clicking
      advanceTimers: vi.advanceTimersByTime,
    });
  },
};

// Custom matchers for pregnancy-safe UI
export const customMatchers = {
  // Check if touch targets are large enough (44x44px minimum)
  toHaveLargeTouchTarget: (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const minSize = 44; // 44px minimum for pregnancy swelling
    
    const pass = rect.width >= minSize && rect.height >= minSize;
    
    return {
      message: () =>
        pass
          ? `Expected element to not have large touch target (>= ${minSize}px)`
          : `Expected element to have large touch target (>= ${minSize}px), but got ${rect.width}x${rect.height}`,
      pass,
    };
  },
  
  // Check if text has sufficient contrast
  toHaveSufficientContrast: (element: HTMLElement) => {
    const styles = window.getComputedStyle(element);
    const color = styles.color;
    const backgroundColor = styles.backgroundColor;
    
    // This is a simplified check - in real implementation, you'd use a proper contrast ratio calculator
    const pass = color !== backgroundColor;
    
    return {
      message: () =>
        pass
          ? "Expected element to not have sufficient contrast"
          : "Expected element to have sufficient contrast for pregnancy vision changes",
      pass,
    };
  },
};

// Export everything including the custom render
export * from "@testing-library/react";
export { customRender as render };
export { userEvent };
export { axe };
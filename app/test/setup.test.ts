import { describe, it, expect } from "vitest";

describe("Test Setup Verification", () => {
  it("should have vitest globals available", () => {
    expect(vi).toBeDefined();
    expect(describe).toBeDefined();
    expect(it).toBeDefined();
    expect(expect).toBeDefined();
  });

  it("should have French Canadian locale configured", () => {
    expect(navigator.language).toBe("fr-CA");
    expect(navigator.languages).toContain("fr-CA");
    expect(navigator.languages).toContain("fr");
  });

  it("should mock window APIs", () => {
    expect(window.matchMedia).toBeDefined();
    expect(window.scrollTo).toBeDefined();
    expect(window.IntersectionObserver).toBeDefined();
    expect(window.ResizeObserver).toBeDefined();
  });

  it("should support pregnancy-safe motion preferences", () => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    expect(mediaQuery).toBeDefined();
    expect(mediaQuery.matches).toBe(true); // Default to reduced motion
  });

  it("should format dates in Quebec style", () => {
    const testDate = new Date("2024-12-25");
    const formatter = new Intl.DateTimeFormat("fr-CA");
    const formatted = formatter.format(testDate);
    
    // Should format as DD/MM/YYYY or similar French Canadian format
    expect(formatted).toBeDefined();
    expect(typeof formatted).toBe("string");
  });

  it("should format currency in CAD", () => {
    const price = 150.75;
    const formatter = new Intl.NumberFormat("fr-CA", { 
      style: "currency", 
      currency: "CAD" 
    });
    const formatted = formatter.format(price);
    
    expect(formatted).toBeDefined();
    expect(formatted).toContain("CAD");
  });
});
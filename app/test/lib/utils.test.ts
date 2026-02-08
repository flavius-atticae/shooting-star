import { describe, it, expect } from "vitest";
import { cn, prefersReducedMotion } from "~/lib";
import {
  CORE_WEB_VITALS,
  PREGNANCY_PERFORMANCE,
  PERFORMANCE_THRESHOLDS,
} from "~/lib/performance-thresholds";

describe("lib/utils", () => {
  describe("cn (className utility)", () => {
    it("should merge class names correctly", () => {
      expect(cn("px-4", "py-2")).toBe("px-4 py-2");
    });

    it("should handle conditional classes", () => {
      const condition = true;
      expect(cn("base", condition && "active")).toBe("base active");
    });

    it("should handle false conditions", () => {
      const condition = false;
      expect(cn("base", condition && "active")).toBe("base");
    });

    it("should merge tailwind classes correctly", () => {
      // tailwind-merge should resolve conflicting classes
      expect(cn("px-4", "px-6")).toBe("px-6");
    });

    it("should handle empty inputs", () => {
      expect(cn()).toBe("");
    });

    it("should handle arrays", () => {
      expect(cn(["px-4", "py-2"])).toBe("px-4 py-2");
    });
  });
});

describe("lib/browser-support", () => {
  describe("prefersReducedMotion", () => {
    it("should return a boolean", () => {
      const result = prefersReducedMotion();
      expect(typeof result).toBe("boolean");
    });
  });
});

describe("lib/performance-thresholds", () => {
  describe("CORE_WEB_VITALS", () => {
    it("should have all Core Web Vitals thresholds", () => {
      expect(CORE_WEB_VITALS.LCP_THRESHOLD).toBe(2500);
      expect(CORE_WEB_VITALS.FID_THRESHOLD).toBe(100);
      expect(CORE_WEB_VITALS.CLS_THRESHOLD).toBe(0.1);
      expect(CORE_WEB_VITALS.LIGHTHOUSE_SCORE).toBe(90);
    });

    it("should have reasonable threshold values", () => {
      // LCP should be between 1-5 seconds
      expect(CORE_WEB_VITALS.LCP_THRESHOLD).toBeGreaterThan(1000);
      expect(CORE_WEB_VITALS.LCP_THRESHOLD).toBeLessThan(5000);

      // FID should be between 50-200ms
      expect(CORE_WEB_VITALS.FID_THRESHOLD).toBeGreaterThan(50);
      expect(CORE_WEB_VITALS.FID_THRESHOLD).toBeLessThan(200);

      // CLS should be between 0-0.5
      expect(CORE_WEB_VITALS.CLS_THRESHOLD).toBeGreaterThanOrEqual(0);
      expect(CORE_WEB_VITALS.CLS_THRESHOLD).toBeLessThan(0.5);
    });
  });

  describe("PREGNANCY_PERFORMANCE", () => {
    it("should have pregnancy-specific metrics", () => {
      expect(PREGNANCY_PERFORMANCE.TIME_TO_INTERACTIVE).toBe(3500);
      expect(PREGNANCY_PERFORMANCE.BUNDLE_SIZE_LIMIT).toBe(200);
      expect(PREGNANCY_PERFORMANCE.IMAGE_OPTIMIZATION).toEqual({
        maxSize: 500,
        formats: ["webp", "avif"],
        lazy: true,
      });
    });

    it("should have more lenient TIME_TO_INTERACTIVE than standard", () => {
      // Pregnancy performance should be more lenient (3.5s vs typical 3s)
      expect(PREGNANCY_PERFORMANCE.TIME_TO_INTERACTIVE).toBeGreaterThanOrEqual(
        3000
      );
    });
  });

  describe("PERFORMANCE_THRESHOLDS (combined)", () => {
    it("should contain all Core Web Vitals", () => {
      expect(PERFORMANCE_THRESHOLDS.LCP_THRESHOLD).toBe(
        CORE_WEB_VITALS.LCP_THRESHOLD
      );
      expect(PERFORMANCE_THRESHOLDS.FID_THRESHOLD).toBe(
        CORE_WEB_VITALS.FID_THRESHOLD
      );
      expect(PERFORMANCE_THRESHOLDS.CLS_THRESHOLD).toBe(
        CORE_WEB_VITALS.CLS_THRESHOLD
      );
    });

    it("should have TARGET aliases for backward compatibility", () => {
      expect(PERFORMANCE_THRESHOLDS.LCP_TARGET).toBe(
        PERFORMANCE_THRESHOLDS.LCP_THRESHOLD
      );
      expect(PERFORMANCE_THRESHOLDS.FID_TARGET).toBe(
        PERFORMANCE_THRESHOLDS.FID_THRESHOLD
      );
      expect(PERFORMANCE_THRESHOLDS.CLS_TARGET).toBe(
        PERFORMANCE_THRESHOLDS.CLS_THRESHOLD
      );
    });

    it("should contain pregnancy-specific metrics", () => {
      expect(PERFORMANCE_THRESHOLDS.TIME_TO_INTERACTIVE).toBe(
        PREGNANCY_PERFORMANCE.TIME_TO_INTERACTIVE
      );
      expect(PERFORMANCE_THRESHOLDS.BUNDLE_SIZE_LIMIT).toBe(
        PREGNANCY_PERFORMANCE.BUNDLE_SIZE_LIMIT
      );
      expect(PERFORMANCE_THRESHOLDS.IMAGE_OPTIMIZATION).toEqual(
        PREGNANCY_PERFORMANCE.IMAGE_OPTIMIZATION
      );
    });
  });
});

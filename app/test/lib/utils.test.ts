import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  cn,
  browserSupport,
  getFeatureSupport,
  clearFeatureCache,
  classifyBrowserCapability,
  BROWSER_TEST_MATRIX,
} from "~/lib";
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
  let originalWindow: typeof window;
  let originalCSS: typeof CSS;
  let originalDocument: typeof document;

  beforeEach(() => {
    clearFeatureCache();
    // Store originals (in test environment, these may not exist)
    originalWindow = globalThis.window;
    originalCSS = globalThis.CSS;
    originalDocument = globalThis.document;
  });

  afterEach(() => {
    clearFeatureCache();
  });

  describe("browserSupport detection functions", () => {
    it("should have all expected feature detection functions", () => {
      expect(typeof browserSupport.containerQueries).toBe("function");
      expect(typeof browserSupport.intersectionObserver).toBe("function");
      expect(typeof browserSupport.scrollBehavior).toBe("function");
      expect(typeof browserSupport.cssGrid).toBe("function");
      expect(typeof browserSupport.flexbox).toBe("function");
      expect(typeof browserSupport.focusVisible).toBe("function");
      expect(typeof browserSupport.backdropFilter).toBe("function");
      expect(typeof browserSupport.aspectRatio).toBe("function");
      expect(typeof browserSupport.webAnimations).toBe("function");
      expect(typeof browserSupport.prefersReducedMotion).toBe("function");
    });

    it("should return boolean values from all detection functions", () => {
      Object.values(browserSupport).forEach((detector) => {
        const result = detector();
        expect(typeof result).toBe("boolean");
      });
    });
  });

  describe("getFeatureSupport", () => {
    it("should return an object with all feature flags", () => {
      const features = getFeatureSupport();
      expect(typeof features).toBe("object");

      // Check that all keys are present
      const expectedKeys = Object.keys(browserSupport);
      expectedKeys.forEach((key) => {
        expect(features).toHaveProperty(key);
      });
    });

    it("should cache results on subsequent calls", () => {
      const features1 = getFeatureSupport();
      const features2 = getFeatureSupport();

      // Results should be the same (cached)
      expect(features1).toEqual(features2);
    });
  });

  describe("clearFeatureCache", () => {
    it("should clear the cache allowing fresh detection", () => {
      // First call to populate cache
      getFeatureSupport();

      // Clear cache
      clearFeatureCache();

      // Second call should work without errors
      const features2 = getFeatureSupport();

      // Should still return valid results
      expect(typeof features2).toBe("object");
    });
  });

  describe("classifyBrowserCapability", () => {
    it("should return a valid capability object", () => {
      const capability = classifyBrowserCapability();

      expect(capability).toHaveProperty("tier");
      expect(["modern", "legacy", "minimal"]).toContain(capability.tier);

      expect(capability).toHaveProperty("supportedFeatures");
      expect(Array.isArray(capability.supportedFeatures)).toBe(true);

      expect(capability).toHaveProperty("missingCriticalFeatures");
      expect(Array.isArray(capability.missingCriticalFeatures)).toBe(true);

      expect(capability).toHaveProperty("hasAccessibilitySupport");
      expect(typeof capability.hasAccessibilitySupport).toBe("boolean");
    });

    it("should mark browser as accessible when focusVisible and prefersReducedMotion are supported", () => {
      vi.spyOn(browserSupport, "focusVisible").mockReturnValue(true);
      vi.spyOn(browserSupport, "prefersReducedMotion").mockReturnValue(true);
      clearFeatureCache();

      const capability = classifyBrowserCapability();
      expect(capability.hasAccessibilitySupport).toBe(true);

      vi.restoreAllMocks();
    });

    it("should mark browser as not accessible when focusVisible is not supported", () => {
      vi.spyOn(browserSupport, "focusVisible").mockReturnValue(false);
      vi.spyOn(browserSupport, "prefersReducedMotion").mockReturnValue(true);
      clearFeatureCache();

      const capability = classifyBrowserCapability();
      expect(capability.hasAccessibilitySupport).toBe(false);

      vi.restoreAllMocks();
    });

    it("should mark browser as not accessible when prefersReducedMotion is not supported", () => {
      vi.spyOn(browserSupport, "focusVisible").mockReturnValue(true);
      vi.spyOn(browserSupport, "prefersReducedMotion").mockReturnValue(false);
      clearFeatureCache();

      const capability = classifyBrowserCapability();
      expect(capability.hasAccessibilitySupport).toBe(false);

      vi.restoreAllMocks();
    });

    it("should mark browser as not accessible when neither feature is supported", () => {
      vi.spyOn(browserSupport, "focusVisible").mockReturnValue(false);
      vi.spyOn(browserSupport, "prefersReducedMotion").mockReturnValue(false);
      clearFeatureCache();

      const capability = classifyBrowserCapability();
      expect(capability.hasAccessibilitySupport).toBe(false);

      vi.restoreAllMocks();
    });
  });

  describe("BROWSER_TEST_MATRIX", () => {
    it("should have priority browsers defined", () => {
      expect(Array.isArray(BROWSER_TEST_MATRIX.priority)).toBe(true);
      expect(BROWSER_TEST_MATRIX.priority.length).toBeGreaterThan(0);

      // Check structure of priority items
      BROWSER_TEST_MATRIX.priority.forEach((browser) => {
        expect(browser).toHaveProperty("name");
        expect(browser).toHaveProperty("versions");
        expect(browser).toHaveProperty("notes");
      });
    });

    it("should have critical features defined", () => {
      expect(Array.isArray(BROWSER_TEST_MATRIX.criticalFeatures)).toBe(true);
      expect(BROWSER_TEST_MATRIX.criticalFeatures.length).toBeGreaterThan(0);
    });

    it("should have enhanced features defined", () => {
      expect(Array.isArray(BROWSER_TEST_MATRIX.enhancedFeatures)).toBe(true);
    });

    it("should have accessibility features defined", () => {
      expect(Array.isArray(BROWSER_TEST_MATRIX.accessibilityFeatures)).toBe(
        true
      );
      expect(BROWSER_TEST_MATRIX.accessibilityFeatures.length).toBeGreaterThan(
        0
      );
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

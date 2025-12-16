import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  useBrowserFeature,
  useBrowserFeatures,
  useBrowserCapabilities,
  useContainerQueries,
  useContainerQuerySupport,
  useMotionPreferences,
  useProgressiveEnhancement,
} from "~/hooks";
import { clearFeatureCache } from "~/lib/browser-support";

describe("hooks/use-browser-support", () => {
  beforeEach(() => {
    clearFeatureCache();
  });

  afterEach(() => {
    clearFeatureCache();
  });

  describe("useBrowserFeature", () => {
    it("should return a boolean value", () => {
      const { result } = renderHook(() =>
        useBrowserFeature("containerQueries")
      );
      expect(typeof result.current).toBe("boolean");
    });

    it("should detect different features", () => {
      const features = [
        "containerQueries",
        "cssGrid",
        "flexbox",
        "intersectionObserver",
      ] as const;

      features.forEach((feature) => {
        const { result } = renderHook(() => useBrowserFeature(feature));
        expect(typeof result.current).toBe("boolean");
      });
    });
  });

  describe("useBrowserFeatures", () => {
    it("should return an object with all feature flags", () => {
      const { result } = renderHook(() => useBrowserFeatures());

      expect(typeof result.current).toBe("object");
      expect(result.current).toHaveProperty("containerQueries");
      expect(result.current).toHaveProperty("cssGrid");
      expect(result.current).toHaveProperty("flexbox");
      expect(result.current).toHaveProperty("prefersReducedMotion");
    });

    it("should have boolean values for all features", () => {
      const { result } = renderHook(() => useBrowserFeatures());

      Object.values(result.current).forEach((value) => {
        expect(typeof value).toBe("boolean");
      });
    });
  });

  describe("useBrowserCapabilities", () => {
    it("should return a capability object", () => {
      const { result } = renderHook(() => useBrowserCapabilities());

      expect(result.current).toHaveProperty("tier");
      expect(["modern", "legacy", "minimal"]).toContain(result.current.tier);
      expect(result.current).toHaveProperty("supportedFeatures");
      expect(result.current).toHaveProperty("missingCriticalFeatures");
      expect(result.current).toHaveProperty("hasAccessibilitySupport");
    });
  });

  describe("useContainerQueries", () => {
    it("should return hasSupport and helper functions", () => {
      const { result } = renderHook(() => useContainerQueries());

      expect(typeof result.current.hasSupport).toBe("boolean");
      expect(typeof result.current.getContainerClass).toBe("function");
      expect(typeof result.current.getGridClass).toBe("function");
    });

    it("getContainerClass should return appropriate class", () => {
      const { result } = renderHook(() => useContainerQueries());

      const containerClass = result.current.getContainerClass(true);
      expect(typeof containerClass).toBe("string");

      const disabledClass = result.current.getContainerClass(false);
      expect(disabledClass).toBe("");
    });

    it("getGridClass should return appropriate classes for column counts", () => {
      const { result } = renderHook(() => useContainerQueries());

      const twoColClass = result.current.getGridClass(2);
      const threeColClass = result.current.getGridClass(3);

      expect(typeof twoColClass).toBe("string");
      expect(typeof threeColClass).toBe("string");
      expect(twoColClass).not.toBe(threeColClass);
    });
  });

  describe("useContainerQuerySupport", () => {
    it("should return a boolean", () => {
      const { result } = renderHook(() => useContainerQuerySupport());
      expect(typeof result.current).toBe("boolean");
    });

    it("should return the same value as useContainerQueries().hasSupport", () => {
      const { result: supportResult } = renderHook(() =>
        useContainerQuerySupport()
      );
      const { result: queriesResult } = renderHook(() => useContainerQueries());

      expect(supportResult.current).toBe(queriesResult.current.hasSupport);
    });
  });

  describe("useMotionPreferences", () => {
    it("should return motion preference and helper functions", () => {
      const { result } = renderHook(() => useMotionPreferences());

      expect(typeof result.current.prefersReduced).toBe("boolean");
      expect(typeof result.current.shouldAnimate).toBe("boolean");
      expect(typeof result.current.getAnimationClass).toBe("function");
      expect(typeof result.current.getTransitionDuration).toBe("function");
    });

    it("shouldAnimate should be opposite of prefersReduced", () => {
      const { result } = renderHook(() => useMotionPreferences());

      expect(result.current.shouldAnimate).toBe(!result.current.prefersReduced);
    });

    it("getAnimationClass should return appropriate class", () => {
      const { result } = renderHook(() => useMotionPreferences());

      const animationClass = "animate-fadeIn";
      const fallbackClass = "opacity-100";

      const resultClass = result.current.getAnimationClass(
        animationClass,
        fallbackClass
      );

      // Should return one of the two classes
      expect([animationClass, fallbackClass]).toContain(resultClass);
    });

    it("getTransitionDuration should return appropriate duration class", () => {
      const { result } = renderHook(() => useMotionPreferences());

      const normalDuration = "duration-300";
      const reducedDuration = "duration-150";

      const resultDuration = result.current.getTransitionDuration(
        normalDuration,
        reducedDuration
      );

      expect([normalDuration, reducedDuration]).toContain(resultDuration);
    });
  });

  describe("useProgressiveEnhancement", () => {
    it("should return enhancement strategies", () => {
      const { result } = renderHook(() => useProgressiveEnhancement());

      expect(typeof result.current.useModernLayout).toBe("boolean");
      expect(typeof result.current.useAdvancedEffects).toBe("boolean");
      expect(typeof result.current.useSmoothScrolling).toBe("boolean");
      expect(typeof result.current.useLazyLoading).toBe("boolean");
      expect(typeof result.current.getComponentStrategy).toBe("function");
    });

    it("should include capabilities and features", () => {
      const { result } = renderHook(() => useProgressiveEnhancement());

      expect(result.current.capabilities).toBeDefined();
      expect(result.current.features).toBeDefined();
    });

    it("getComponentStrategy should return 'enhanced' or 'fallback'", () => {
      const { result } = renderHook(() => useProgressiveEnhancement());

      const strategy = result.current.getComponentStrategy("cssGrid");
      expect(["enhanced", "fallback"]).toContain(strategy);
    });
  });
});

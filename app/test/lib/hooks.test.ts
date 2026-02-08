import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useMotionPreferences } from "~/hooks";

describe("hooks/use-browser-support", () => {
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
});

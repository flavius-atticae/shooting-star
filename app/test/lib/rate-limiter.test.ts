import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { isRateLimited, resetRateLimiter } from "~/lib/rate-limiter";

describe("lib/rate-limiter", () => {
  beforeEach(() => {
    resetRateLimiter();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    resetRateLimiter();
  });

  describe("isRateLimited", () => {
    it("should allow the first request from an IP", () => {
      expect(isRateLimited("192.168.1.1")).toBe(false);
    });

    it("should allow up to maxRequests within the window", () => {
      expect(isRateLimited("10.0.0.1")).toBe(false);
      expect(isRateLimited("10.0.0.1")).toBe(false);
      expect(isRateLimited("10.0.0.1")).toBe(false);
    });

    it("should block after maxRequests are exceeded", () => {
      // Default is 3 requests
      expect(isRateLimited("10.0.0.2")).toBe(false); // 1
      expect(isRateLimited("10.0.0.2")).toBe(false); // 2
      expect(isRateLimited("10.0.0.2")).toBe(false); // 3
      expect(isRateLimited("10.0.0.2")).toBe(true);  // 4 — blocked
    });

    it("should track IPs independently", () => {
      // Exhaust IP A
      isRateLimited("ip-a");
      isRateLimited("ip-a");
      isRateLimited("ip-a");
      expect(isRateLimited("ip-a")).toBe(true);

      // IP B should still be allowed
      expect(isRateLimited("ip-b")).toBe(false);
    });

    it("should reset after the window expires", () => {
      const baseTime = 1000000;
      const dateSpy = vi.spyOn(Date, "now").mockReturnValue(baseTime);

      // Exhaust the limit
      isRateLimited("10.0.0.3");
      isRateLimited("10.0.0.3");
      isRateLimited("10.0.0.3");
      expect(isRateLimited("10.0.0.3")).toBe(true);

      // Move time past the window (default 15 minutes)
      dateSpy.mockReturnValue(baseTime + 15 * 60 * 1000);

      // Should be allowed again
      expect(isRateLimited("10.0.0.3")).toBe(false);
    });

    it("should support custom maxRequests", () => {
      expect(isRateLimited("10.0.0.4", 1)).toBe(false); // 1 allowed
      expect(isRateLimited("10.0.0.4", 1)).toBe(true);  // 2 blocked
    });

    it("should handle 'unknown' IP", () => {
      expect(isRateLimited("unknown")).toBe(false);
      isRateLimited("unknown");
      isRateLimited("unknown");
      expect(isRateLimited("unknown")).toBe(true);
    });
  });

  describe("resetRateLimiter", () => {
    it("should clear all entries", () => {
      isRateLimited("10.0.0.6");
      isRateLimited("10.0.0.6");
      isRateLimited("10.0.0.6");
      expect(isRateLimited("10.0.0.6")).toBe(true);

      resetRateLimiter();

      // Should be allowed again after reset
      expect(isRateLimited("10.0.0.6")).toBe(false);
    });
  });
});

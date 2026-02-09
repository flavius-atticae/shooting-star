import { describe, it, expect, vi, afterEach } from "vitest";
import {
  sanitizeInput,
  isHoneypotFilled,
  isSubmissionTooFast,
} from "~/lib/form-security";

describe("lib/form-security", () => {
  describe("sanitizeInput", () => {
    it("should strip HTML tags from input", () => {
      expect(sanitizeInput("<script>alert('xss')</script>")).toBe(
        "alert('xss')"
      );
    });

    it("should strip angle brackets that are not part of tags", () => {
      expect(sanitizeInput("a < b > c")).toBe("a  b  c");
    });

    it("should return plain text unchanged", () => {
      expect(sanitizeInput("Hello World")).toBe("Hello World");
    });

    it("should handle empty string", () => {
      expect(sanitizeInput("")).toBe("");
    });

    it("should strip nested HTML tags", () => {
      expect(sanitizeInput("<div><b>bold</b></div>")).toBe("bold");
    });

    it("should strip self-closing tags", () => {
      expect(sanitizeInput("before<br/>after")).toBe("beforeafter");
    });

    it("should handle input with only tags", () => {
      expect(sanitizeInput("<div></div>")).toBe("");
    });

    it("should handle nested/broken tag constructs", () => {
      expect(sanitizeInput("<scr<script>ipt>alert('xss')</scr</script>ipt>")).toBe(
        "alert('xss')"
      );
    });
  });

  describe("isHoneypotFilled", () => {
    it("should return true when value is a non-empty string", () => {
      expect(isHoneypotFilled("spam content")).toBe(true);
    });

    it("should return false when value is an empty string", () => {
      expect(isHoneypotFilled("")).toBe(false);
    });

    it("should return false when value is undefined", () => {
      expect(isHoneypotFilled(undefined)).toBe(false);
    });

    it("should return false when value is null", () => {
      expect(isHoneypotFilled(null)).toBe(false);
    });

    it("should return true for whitespace-only string", () => {
      expect(isHoneypotFilled("   ")).toBe(true);
    });
  });

  describe("isSubmissionTooFast", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should return true when submission is under 3 seconds", () => {
      const now = Date.now();
      vi.spyOn(Date, "now").mockReturnValue(now + 1000);
      expect(isSubmissionTooFast(now)).toBe(true);
    });

    it("should return false when submission takes more than 3 seconds", () => {
      const now = Date.now();
      vi.spyOn(Date, "now").mockReturnValue(now + 5000);
      expect(isSubmissionTooFast(now)).toBe(false);
    });

    it("should return false when exactly at threshold", () => {
      const now = Date.now();
      vi.spyOn(Date, "now").mockReturnValue(now + 3000);
      expect(isSubmissionTooFast(now)).toBe(false);
    });

    it("should support custom minimum time", () => {
      const now = Date.now();
      vi.spyOn(Date, "now").mockReturnValue(now + 4000);
      expect(isSubmissionTooFast(now, 5000)).toBe(true);
    });

    it("should return false with custom minimum when enough time passed", () => {
      const now = Date.now();
      vi.spyOn(Date, "now").mockReturnValue(now + 6000);
      expect(isSubmissionTooFast(now, 5000)).toBe(false);
    });

    it("should return true for immediate submission (0ms elapsed)", () => {
      const now = Date.now();
      vi.spyOn(Date, "now").mockReturnValue(now);
      expect(isSubmissionTooFast(now)).toBe(true);
    });
  });
});

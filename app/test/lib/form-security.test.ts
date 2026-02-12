import { describe, it, expect } from "vitest";
import { sanitizeInput } from "~/lib/form-security";

describe("lib/form-security", () => {
  describe("sanitizeInput", () => {
    it("should strip HTML tags from input", () => {
      expect(sanitizeInput("<script>alert('xss')</script>")).toBe(
        "alert('xss')",
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
      // Split-tag obfuscation leaves harmless text fragments ("ipt")
      // but all tags and angle brackets are removed — no XSS risk.
      expect(
        sanitizeInput("<scr<script>ipt>alert('xss')</scr</script>ipt>"),
      ).toBe("iptalert('xss')ipt");
    });
  });
});

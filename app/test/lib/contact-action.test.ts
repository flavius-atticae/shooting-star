import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { action } from "~/routes/contact";
import { resetRateLimiter } from "~/lib/rate-limiter";

/**
 * Helper to create a mock Request with FormData and headers.
 */
function createFormRequest(
  fields: Record<string, string>,
  headers: Record<string, string> = {},
): Request {
  const formData = new URLSearchParams();
  for (const [key, value] of Object.entries(fields)) {
    formData.append(key, value);
  }

  return new Request("http://localhost/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers,
    },
    body: formData.toString(),
  });
}

/**
 * React Router's data() returns a DataWithResponseInit object,
 * not a standard Response. Extract data and status from it.
 */
function getActionResult(result: any): { data: any; status?: number } {
  // DataWithResponseInit shape: { type, data, init }
  return {
    data: result.data,
    status: result.init?.status,
  };
}

describe("contact route action", () => {
  beforeEach(() => {
    resetRateLimiter();
  });

  afterEach(() => {
    resetRateLimiter();
  });

  describe("happy path", () => {
    it("should return success for valid form data", async () => {
      const request = createFormRequest({
        name: "Marie Tremblay",
        email: "marie@example.com",
        availability: "morning",
        message: "Je suis intéressée par le yoga prénatal",
      });

      const result = await action({
        request,
        params: {},
        context: {},
      } as any);

      const { data } = getActionResult(result);
      expect(data.success).toBe(true);
    });

    it("should return success without availability field", async () => {
      const request = createFormRequest({
        name: "Sophie Dubois",
        email: "sophie@example.com",
        message: "Je souhaite en savoir plus sur vos services",
      });

      const result = await action({
        request,
        params: {},
        context: {},
      } as any);

      const { data } = getActionResult(result);
      expect(data.success).toBe(true);
    });
  });

  describe("honeypot rejection", () => {
    it("should silently reject when honeypot is filled", async () => {
      const request = createFormRequest({
        name: "Spam Bot",
        email: "bot@spam.com",
        message: "Buy products now!!!!",
        name__confirm: "http://spam.com",
      });

      const result = await action({
        request,
        params: {},
        context: {},
      } as any);

      const { data } = getActionResult(result);
      // Should return success (silent rejection)
      expect(data.success).toBe(true);
    });
  });

  describe("rate limiting", () => {
    it("should block after 3 submissions from the same IP", async () => {
      const makeRequest = () =>
        createFormRequest(
          {
            name: "Marie Tremblay",
            email: "marie@example.com",
            message: "Un message suffisamment long pour passer la validation",
          },
          { "x-forwarded-for": "192.168.1.100" },
        );

      // First 3 requests should succeed
      for (let i = 0; i < 3; i++) {
        const result = await action({
          request: makeRequest(),
          params: {},
          context: {},
        } as any);
        const { data } = getActionResult(result);
        expect(data.success).toBe(true);
      }

      // 4th request should be rate limited
      const result = await action({
        request: makeRequest(),
        params: {},
        context: {},
      } as any);

      const { data, status } = getActionResult(result);
      expect(status).toBe(429);
      expect(data.error).toContain("Trop de messages");
    });
  });

  describe("validation errors", () => {
    it("should return field errors for invalid name", async () => {
      const request = createFormRequest({
        name: "A",
        email: "marie@example.com",
        message: "Un message suffisamment long pour passer",
      });

      const result = await action({
        request,
        params: {},
        context: {},
      } as any);

      const { data, status } = getActionResult(result);
      expect(status).toBe(400);
      expect(data.errors).toBeDefined();
      expect(data.errors.name).toBeDefined();
      expect(data.errors.name[0]).toContain("2 caractères");
    });

    it("should return field errors for invalid email", async () => {
      const request = createFormRequest({
        name: "Marie Tremblay",
        email: "not-an-email",
        message: "Un message suffisamment long pour passer",
      });

      const result = await action({
        request,
        params: {},
        context: {},
      } as any);

      const { data, status } = getActionResult(result);
      expect(status).toBe(400);
      expect(data.errors.email).toBeDefined();
      expect(data.errors.email[0]).toContain("courriel valide");
    });

    it("should return field errors for short message", async () => {
      const request = createFormRequest({
        name: "Marie Tremblay",
        email: "marie@example.com",
        message: "Court",
      });

      const result = await action({
        request,
        params: {},
        context: {},
      } as any);

      const { data, status } = getActionResult(result);
      expect(status).toBe(400);
      expect(data.errors.message).toBeDefined();
      expect(data.errors.message[0]).toContain("10 caractères");
    });

    it("should sanitize HTML from inputs before validation", async () => {
      const request = createFormRequest({
        name: "Marie <script>alert</script> Tremblay",
        email: "marie@example.com",
        message: "Un message <b>important</b> suffisamment long",
      });

      const result = await action({
        request,
        params: {},
        context: {},
      } as any);

      const { data } = getActionResult(result);
      // Should succeed — HTML is stripped by the Zod transform
      expect(data.success).toBe(true);
    });
  });
});

import { describe, expect, it } from "vitest";
import { toIsoDateTime } from "~/lib/date-utils";

describe("toIsoDateTime", () => {
  it("converts French month with accent to ISO", () => {
    expect(toIsoDateTime("7 Février 2025", "13:00")).toBe("2025-02-07T13:00");
  });

  it("converts without accent and pads single-digit day", () => {
    expect(toIsoDateTime("3 juin 2025", "09:05")).toBe("2025-06-03T09:05");
  });

  it("supports seconds in time", () => {
    expect(toIsoDateTime("14 juillet 2025", "21:30:15")).toBe("2025-07-14T21:30:15");
  });

  it("returns null for invalid day range", () => {
    expect(toIsoDateTime("32 Juin 2025", "10:00")).toBeNull();
  });

  it("returns null for invalid time range", () => {
    expect(toIsoDateTime("7 Juin 2025", "25:61")).toBeNull();
  });

  it("returns null for unknown month name", () => {
    expect(toIsoDateTime("7 Foo 2025", "10:00")).toBeNull();
  });
});

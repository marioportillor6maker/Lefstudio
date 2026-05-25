// @vitest-environment node
import { describe, it, expect } from "vitest";
import { formatDate, formatDateTime } from "@/lib/formatDate";

describe("formatDate", () => {
  it("returns YYYY/MM/DD for a given date", () => {
    expect(formatDate(new Date(2024, 3, 12))).toBe("2024/04/12"); // April 12
  });

  it("pads month with leading zero", () => {
    expect(formatDate(new Date(2024, 0, 5))).toBe("2024/01/05"); // January 5
  });

  it("pads day with leading zero", () => {
    expect(formatDate(new Date(2024, 11, 3))).toBe("2024/12/03"); // December 3
  });

  it("accepts a string date", () => {
    expect(formatDate("2024-06-15")).toBe("2024/06/15");
  });

  it("returns 4-digit year", () => {
    const result = formatDate(new Date(2026, 5, 25));
    expect(result.split("/")[0]).toHaveLength(4);
  });

  it("uses / as separator (not - or .)", () => {
    const result = formatDate(new Date(2024, 3, 12));
    expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2}$/);
  });

  it("does NOT produce DD/MM/YYYY format", () => {
    const result = formatDate(new Date(2024, 3, 12));
    expect(result).not.toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });
});

describe("formatDateTime", () => {
  it("starts with YYYY/MM/DD", () => {
    const result = formatDateTime(new Date(2024, 3, 12, 9, 5));
    expect(result.startsWith("2024/04/12")).toBe(true);
  });

  it("appends HH:mm after date", () => {
    const result = formatDateTime(new Date(2024, 3, 12, 9, 5));
    expect(result).toBe("2024/04/12 09:05");
  });

  it("pads hours and minutes", () => {
    const result = formatDateTime(new Date(2024, 0, 1, 0, 0));
    expect(result).toBe("2024/01/01 00:00");
  });

  it("accepts string date", () => {
    // Note: string to Date parsing is environment-dependent for time portion;
    // test only the date portion here
    const result = formatDateTime("2024-06-15");
    expect(result.startsWith("2024/06/15")).toBe(true);
  });
});

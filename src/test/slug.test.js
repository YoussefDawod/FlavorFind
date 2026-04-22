import { describe, it, expect } from "vitest";
import { toSlug, toSlugId, parseIdFromSlug } from "../utils/slug";

describe("toSlug", () => {
  it("returns empty string for nullish", () => {
    expect(toSlug(null)).toBe("");
    expect(toSlug(undefined)).toBe("");
    expect(toSlug("")).toBe("");
  });

  it("lowercases and replaces spaces with hyphens", () => {
    expect(toSlug("Spaghetti Carbonara")).toBe("spaghetti-carbonara");
  });

  it("removes diacritics", () => {
    expect(toSlug("Crème Brûlée")).toBe("creme-brulee");
  });

  it("replaces & with 'und'", () => {
    expect(toSlug("Fish & Chips")).toBe("fish-und-chips");
  });

  it("trims leading/trailing hyphens", () => {
    expect(toSlug("  hello  ")).toBe("hello");
  });

  it("caps length at 80 characters", () => {
    const long = "a".repeat(200);
    expect(toSlug(long).length).toBeLessThanOrEqual(80);
  });
});

describe("toSlugId", () => {
  it("combines slug with id", () => {
    expect(toSlugId("Pizza Margherita", 42)).toBe("pizza-margherita-42");
  });

  it("returns id string only when title empty", () => {
    expect(toSlugId("", 99)).toBe("99");
  });

  it("returns slug only when id missing", () => {
    expect(toSlugId("Test", null)).toBe("test");
  });
});

describe("parseIdFromSlug", () => {
  it("extracts numeric suffix", () => {
    expect(parseIdFromSlug("pizza-margherita-42")).toBe(42);
  });

  it("returns null for non-numeric", () => {
    expect(parseIdFromSlug("pizza-margherita")).toBeNull();
  });

  it("returns null for empty", () => {
    expect(parseIdFromSlug("")).toBeNull();
    expect(parseIdFromSlug(null)).toBeNull();
  });

  it("takes the last number group", () => {
    expect(parseIdFromSlug("recipe-2024-123")).toBe(123);
  });
});

import { describe, it, expect } from "vitest";
import {
  formatMinutes,
  formatAmount,
  scaleAmount,
  stripHtml,
} from "../utils/formatters";

describe("formatMinutes", () => {
  it("returns em dash for invalid", () => {
    expect(formatMinutes(0)).toBe("—");
    expect(formatMinutes(-5)).toBe("—");
    expect(formatMinutes(Number.NaN)).toBe("—");
  });

  it("formats sub-hour values with 'Min'", () => {
    expect(formatMinutes(45)).toBe("45 Min");
  });

  it("formats whole hours with 'Std'", () => {
    expect(formatMinutes(120)).toBe("2 Std");
  });

  it("formats hours + minutes", () => {
    expect(formatMinutes(95)).toBe("1 Std 35 Min");
  });
});

describe("formatAmount", () => {
  it("returns empty for invalid", () => {
    expect(formatAmount(Number.NaN)).toBe("");
    expect(formatAmount("foo")).toBe("");
  });

  it("formats integers without decimals", () => {
    expect(formatAmount(2)).toBe("2");
  });

  it("formats fractions with German comma", () => {
    expect(formatAmount(1.5)).toBe("1,5");
  });

  it("rounds to one decimal", () => {
    expect(formatAmount(0.333)).toBe("0,3");
  });
});

describe("scaleAmount", () => {
  it("scales proportionally", () => {
    expect(scaleAmount(100, 2, 4)).toBe(200);
    expect(scaleAmount(100, 4, 2)).toBe(50);
  });

  it("returns original if invalid servings", () => {
    expect(scaleAmount(100, 0, 4)).toBe(100);
    expect(scaleAmount(100, 2, -1)).toBe(100);
  });

  it("passes through non-finite amount", () => {
    expect(scaleAmount(Number.NaN, 2, 4)).toBeNaN();
  });
});

describe("stripHtml", () => {
  it("removes tags", () => {
    expect(stripHtml("<p>Hello <b>world</b></p>")).toBe("Hello world");
  });

  it("collapses whitespace", () => {
    expect(stripHtml("foo   \n  bar")).toBe("foo bar");
  });

  it("returns empty for nullish", () => {
    expect(stripHtml(null)).toBe("");
    expect(stripHtml(undefined)).toBe("");
  });
});

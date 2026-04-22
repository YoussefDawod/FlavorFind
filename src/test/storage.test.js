import { describe, it, expect, beforeEach } from "vitest";
import {
  readStorage,
  writeStorage,
  removeStorage,
  readCached,
  writeCached,
} from "../utils/storage";

beforeEach(() => {
  window.localStorage.clear();
});

describe("storage read/write", () => {
  it("returns fallback when key missing", () => {
    expect(readStorage("missing", "default")).toBe("default");
  });

  it("serializes and deserializes objects", () => {
    writeStorage("obj", { a: 1, b: [2, 3] });
    expect(readStorage("obj")).toEqual({ a: 1, b: [2, 3] });
  });

  it("returns fallback on invalid JSON", () => {
    window.localStorage.setItem("broken", "{not-json");
    expect(readStorage("broken", [])).toEqual([]);
  });

  it("removes keys", () => {
    writeStorage("k", 1);
    removeStorage("k");
    expect(readStorage("k", null)).toBeNull();
  });
});

describe("ttl cache", () => {
  it("returns null for missing", () => {
    expect(readCached("x")).toBeNull();
  });

  it("roundtrips value within TTL", () => {
    writeCached("fresh", { data: 1 }, 60_000);
    expect(readCached("fresh")).toEqual({ data: 1 });
  });

  it("expires stale entries", () => {
    writeStorage("stale", { value: "old", expiresAt: Date.now() - 1000 });
    expect(readCached("stale")).toBeNull();
  });

  it("rejects invalid TTL", () => {
    expect(writeCached("bad", 1, 0)).toBe(false);
    expect(writeCached("bad", 1, -5)).toBe(false);
  });
});

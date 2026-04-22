import { describe, it, expect } from "vitest";
import { cn } from "../utils/cn";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("skips falsy values", () => {
    expect(cn("a", false, null, undefined, "", "b")).toBe("a b");
  });

  it("resolves Tailwind conflicts via twMerge", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("honors conditional syntax", () => {
    const active = true;
    expect(cn("base", active && "active")).toBe("base active");
  });

  it("accepts nested arrays", () => {
    expect(cn(["a", ["b", "c"]])).toContain("a");
  });
});

import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "../hooks/useDebounce";

describe("useDebounce", () => {
  it("returns the initial value synchronously", () => {
    const { result } = renderHook(() => useDebounce("hello", 100));
    expect(result.current).toBe("hello");
  });

  it("debounces rapid changes", async () => {
    const { result, rerender } = renderHook(
      ({ v }) => useDebounce(v, 50),
      { initialProps: { v: "a" } },
    );
    rerender({ v: "b" });
    rerender({ v: "c" });
    // Still initial value immediately after change
    expect(result.current).toBe("a");
    await act(async () => {
      await new Promise((r) => setTimeout(r, 80));
    });
    expect(result.current).toBe("c");
  });
});

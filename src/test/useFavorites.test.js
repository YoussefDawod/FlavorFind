import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFavorites } from "../hooks/useFavorites";

beforeEach(() => {
  window.localStorage.clear();
});

const recipe = (id, title = "Pizza") => ({ id, title, image: null, readyInMinutes: 30 });

describe("useFavorites", () => {
  it("starts empty", () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.count).toBe(0);
    expect(result.current.favorites).toEqual([]);
  });

  it("adds a favorite", () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.addFavorite(recipe(1)));
    expect(result.current.count).toBe(1);
    expect(result.current.isFavorite(1)).toBe(true);
  });

  it("ignores duplicates", () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.addFavorite(recipe(1)));
    act(() => result.current.addFavorite(recipe(1)));
    expect(result.current.count).toBe(1);
  });

  it("removes a favorite", () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.addFavorite(recipe(1)));
    act(() => result.current.removeFavorite(1));
    expect(result.current.count).toBe(0);
    expect(result.current.isFavorite(1)).toBe(false);
  });

  it("toggleFavorite returns new state", () => {
    const { result } = renderHook(() => useFavorites());
    let state;
    act(() => {
      state = result.current.toggleFavorite(recipe(5));
    });
    expect(state).toBe(true);
    expect(result.current.isFavorite(5)).toBe(true);
    act(() => {
      state = result.current.toggleFavorite(recipe(5));
    });
    expect(state).toBe(false);
    expect(result.current.isFavorite(5)).toBe(false);
  });

  it("rejects invalid recipe", () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.addFavorite(null));
    act(() => result.current.addFavorite({ id: "nope" }));
    expect(result.current.count).toBe(0);
  });

  it("persists to localStorage", () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.addFavorite(recipe(7, "Sushi")));
    const raw = window.localStorage.getItem("flavorfind:favorites");
    expect(raw).toContain("Sushi");
  });
});

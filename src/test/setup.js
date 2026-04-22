import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// In-Memory localStorage-Stub (manche jsdom-Versionen liefern non-functional Storage)
function createMemoryStorage() {
  const store = new Map();
  return {
    get length() {
      return store.size;
    },
    key(i) {
      return Array.from(store.keys())[i] ?? null;
    },
    getItem(k) {
      return store.has(k) ? store.get(k) : null;
    },
    setItem(k, v) {
      store.set(String(k), String(v));
    },
    removeItem(k) {
      store.delete(k);
    },
    clear() {
      store.clear();
    },
  };
}

Object.defineProperty(window, "localStorage", {
  configurable: true,
  value: createMemoryStorage(),
});
Object.defineProperty(window, "sessionStorage", {
  configurable: true,
  value: createMemoryStorage(),
});

// matchMedia-Stub für Komponenten, die prefers-reduced-motion o.Ä. abfragen
if (typeof window.matchMedia !== "function") {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  window.sessionStorage.clear();
});

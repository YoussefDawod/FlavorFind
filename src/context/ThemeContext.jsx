import { useCallback, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS, THEMES } from "../utils/constants";
import { ThemeContext } from "./theme-context";

/**
 * Liest die initiale Theme-Präferenz:
 * 1. localStorage (User-Entscheidung gewinnt)
 * 2. System-Präferenz (prefers-color-scheme)
 * 3. Fallback: dark (unser Design-Default)
 */
function getInitialTheme() {
  if (typeof window === "undefined") return THEMES.dark;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEYS.theme);
    if (stored === THEMES.dark || stored === THEMES.light) return stored;
  } catch {
    // localStorage kann im Private-Mode werfen
  }

  const prefersLight = window.matchMedia?.(
    "(prefers-color-scheme: light)",
  ).matches;
  return prefersLight ? THEMES.light : THEMES.dark;
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  // Wende Theme auf <html> an + persistiere
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);

    // theme-color Meta für iOS-Safari dynamisch updaten
    const metaDark = document.querySelector(
      'meta[name="theme-color"][media*="dark"]',
    );
    const metaLight = document.querySelector(
      'meta[name="theme-color"][media*="light"]',
    );
    if (metaDark && metaLight) {
      // Beide Varianten bleiben drin; OS entscheidet.
      // Aber wir setzen zusätzlich ein generisches Tag für iOS-PWA-Standalone:
      let generic = document.querySelector(
        'meta[name="theme-color"]:not([media])',
      );
      if (!generic) {
        generic = document.createElement("meta");
        generic.name = "theme-color";
        document.head.appendChild(generic);
      }
      generic.setAttribute(
        "content",
        theme === THEMES.dark ? "#0F0A08" : "#FAF5EC",
      );
    }

    try {
      window.localStorage.setItem(STORAGE_KEYS.theme, theme);
    } catch {
      // silent
    }
  }, [theme]);

  // System-Präferenz beobachten, solange User nichts aktiv gewählt hat
  useEffect(() => {
    const media = window.matchMedia?.("(prefers-color-scheme: light)");
    if (!media) return;

    const handler = (event) => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEYS.theme);
        if (stored) return; // User-Wahl hat Vorrang
      } catch {
        // ignore
      }
      setThemeState(event.matches ? THEMES.light : THEMES.dark);
    };

    media.addEventListener?.("change", handler);
    return () => media.removeEventListener?.("change", handler);
  }, []);

  const setTheme = useCallback((next) => {
    if (next === THEMES.dark || next === THEMES.light) {
      setThemeState(next);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) =>
      prev === THEMES.dark ? THEMES.light : THEMES.dark,
    );
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === THEMES.dark,
      isLight: theme === THEMES.light,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

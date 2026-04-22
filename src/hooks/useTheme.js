import { useContext } from "react";
import { ThemeContext } from "../context/theme-context";

/**
 * useTheme — Zugriff auf aktuellen Theme-Status.
 * Wirft, wenn ausserhalb eines <ThemeProvider> benutzt.
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error(
      "useTheme muss innerhalb eines <ThemeProvider> genutzt werden.",
    );
  }
  return ctx;
}

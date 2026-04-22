import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

/**
 * Separate Vitest-Config — verhindert Konflikte mit vite-plugin-pwa
 * und Tailwind-v4-Plugins im Test-Lauf.
 */
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
    css: false,
    include: ["src/**/*.{test,spec}.{js,jsx}"],
    coverage: {
      reporter: ["text", "html"],
      include: ["src/**/*.{js,jsx}"],
      exclude: [
        "src/**/*.{test,spec}.{js,jsx}",
        "src/test/**",
        "src/mocks/**",
        "src/main.jsx",
      ],
    },
  },
});

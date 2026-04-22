import { Loader2 } from "lucide-react";

/**
 * PageLoader — Fallback für React.Suspense beim Lazy-Loading von Pages.
 * Gedämpfter Spinner in Gold, zentriert.
 */
export default function PageLoader() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Seite wird geladen …</span>
      <Loader2
        size={28}
        strokeWidth={1.5}
        className="animate-spin text-[var(--color-accent)]"
        aria-hidden="true"
      />
    </div>
  );
}

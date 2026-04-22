/**
 * SkipLink — „Zum Inhalt springen" für Tastatur-/Screen-Reader-Nutzer.
 * Wird nur bei :focus-visible sichtbar.
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-lg focus-visible:bg-[var(--color-accent)] focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-[var(--color-bg)] focus-visible:shadow-lg"
    >
      Zum Inhalt springen
    </a>
  );
}

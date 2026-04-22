import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { ROUTES } from "../utils/routes";

export default function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <span className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/25">
        <Compass size={28} strokeWidth={1.5} />
      </span>

      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
        404 · Seite nicht gefunden
      </p>
      <h1
        className="text-5xl font-semibold leading-[1.05] sm:text-6xl"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Dieses Rezept existiert (noch) nicht.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-[var(--color-text-secondary)]">
        Keine Sorge — der Weg zurück zur Küche ist nicht weit.
      </p>

      <Link
        to={ROUTES.home}
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-bg)] shadow-[var(--shadow-glow)] transition-all hover:bg-[var(--color-accent-hover)] hover:shadow-[0_0_40px_rgba(212,165,116,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
      >
        Zur Startseite
        <ArrowRight size={16} strokeWidth={2} />
      </Link>
    </section>
  );
}

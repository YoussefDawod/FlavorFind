import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "../utils/routes";

/**
 * CookModePage — Vollbild-Experience ohne Layout-Chrome (Header/Footer).
 * Die Ausbaustufe mit Schritten, Timer und Wake-Lock folgt in Phase 6.
 */
export default function CookModePage() {
  const { slugId } = useParams();

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
      <header className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
        <Link
          to={ROUTES.recipe(slugId)}
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
        >
          <ArrowLeft size={16} strokeWidth={1.75} />
          Rezept verlassen
        </Link>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
          Koch-Modus
        </p>
      </header>

      <div className="flex flex-1 items-center justify-center px-6 text-center">
        <div className="max-w-xl space-y-4">
          <h1
            className="text-4xl font-semibold sm:text-5xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Vollbild-Koch-Modus
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            Schritt-für-Schritt-Navigation, Timer mit Audio-Ping, Wake-Lock und
            Konfetti-Finish folgen in Phase 6.
          </p>
        </div>
      </div>
    </div>
  );
}

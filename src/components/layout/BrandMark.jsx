import { Link } from "react-router-dom";
import { ChefHat } from "lucide-react";
import { ROUTES } from "../../utils/routes";
import { cn } from "../../utils/cn";

/**
 * BrandMark — Logo-Einheit aus ChefHat-Icon + FlavorFind-Wortmarke.
 * Gleiches Layout im Header, Footer und auf der Impressum-Seite.
 */
export default function BrandMark({ className, compact = false }) {
  return (
    <Link
      to={ROUTES.home}
      className={cn(
        "group inline-flex items-center gap-2.5 text-[var(--color-text)]",
        "transition-opacity hover:opacity-90 focus-visible:outline-none",
        className,
      )}
      aria-label="FlavorFind — zur Startseite"
    >
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/25 transition-all group-hover:ring-[var(--color-accent)]/60 group-hover:shadow-[0_0_20px_rgba(212,165,116,0.35)]">
        <ChefHat size={20} strokeWidth={1.75} />
      </span>
      {!compact && (
        <span
          className="text-xl font-semibold tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          FlavorFind
        </span>
      )}
    </Link>
  );
}

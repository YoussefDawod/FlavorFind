import { cn } from "../../utils/cn";

/**
 * PageShell — einheitlicher Container für Placeholder-Pages in Phase 1.
 * Wird in späteren Phasen durch echte Seiten-Layouts ersetzt.
 */
export default function PageShell({
  eyebrow,
  title,
  intro,
  children,
  className,
}) {
  return (
    <section
      className={cn("mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8", className)}
    >
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
            {eyebrow}
          </p>
        )}
        <h1
          className="text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
            {intro}
          </p>
        )}
      </div>
      {children && <div className="mt-12">{children}</div>}
    </section>
  );
}

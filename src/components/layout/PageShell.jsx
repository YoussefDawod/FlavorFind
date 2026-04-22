import { cn } from "../../utils/cn";

/**
 * PageShell — einheitlicher Container mit Eyebrow, Titel, Intro, optionalen
 * Header-Actions und frei befüllbarem Content-Slot.
 */
export default function PageShell({
  eyebrow,
  title,
  intro,
  actions,
  children,
  className,
  contentClassName,
}) {
  return (
    <section
      className={cn(
        "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8",
        className,
      )}
    >
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-serif text-4xl leading-[1.05] text-text sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {intro ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              {intro}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex flex-wrap items-center gap-3">{actions}</div>
        ) : null}
      </header>
      {children ? (
        <div className={cn("mt-10 sm:mt-12", contentClassName)}>{children}</div>
      ) : null}
    </section>
  );
}

import { cn } from "../../utils/cn";

/**
 * Minimaler Skeleton-Baustein mit subtilem Puls-Effekt.
 * Die verfeinerte Variante mit Shimmer-Gradient folgt in Phase 3.
 */
export function Skeleton({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-lg bg-[color:var(--color-surface-elevated)]/80",
        className,
      )}
    />
  );
}

export function RecipeCardSkeleton() {
  return (
    <div className="space-y-3 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/40 p-4">
      <Skeleton className="aspect-[4/3] w-full" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

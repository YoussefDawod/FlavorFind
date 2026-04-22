import { cn } from "../../utils/cn";

/**
 * Skeleton-Baustein mit Shimmer-Overlay (Dark-Luxury Anmutung).
 */
export function Skeleton({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden rounded-lg bg-surface-elevated/70",
        className,
      )}
    >
      <span className="absolute inset-0 animate-shimmer" aria-hidden="true" />
    </div>
  );
}

export function RecipeCardSkeleton() {
  return (
    <div className="space-y-3 rounded-2xl border border-border bg-surface/40 p-4">
      <Skeleton className="aspect-[4/3] w-full" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

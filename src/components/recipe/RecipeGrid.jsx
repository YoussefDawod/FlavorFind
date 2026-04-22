import RecipeCard from "./RecipeCard";
import { RecipeCardSkeleton } from "../feedback/Skeleton";
import { cn } from "../../utils/cn";

/**
 * Responsives Grid-Layout für Rezept-Karten. Zeigt Skeletons während des Ladens.
 */
export default function RecipeGrid({
  recipes = [],
  isLoading = false,
  skeletonCount = 8,
  className,
  cardClassName,
  priorityFirst = false,
}) {
  const showSkeletons = isLoading && recipes.length === 0;

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {showSkeletons
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <RecipeCardSkeleton key={i} />
          ))
        : recipes.map((r, i) => (
            <RecipeCard
              key={r.id}
              recipe={r}
              priority={priorityFirst && i < 4}
              className={cardClassName}
            />
          ))}
    </div>
  );
}

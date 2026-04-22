import { Link } from "react-router-dom";
import { Clock, Users } from "lucide-react";
import { ROUTES } from "../../utils/routes";
import { toSlugId } from "../../utils/slug";
import { formatMinutes, stripHtml } from "../../utils/formatters";
import { cn } from "../../utils/cn";
import FavoriteButton from "./FavoriteButton";

/**
 * Kompakte Rezept-Karte — im Grid auf Home, Search, Favorites verwendbar.
 */
export default function RecipeCard({ recipe, priority = false, className }) {
  if (!recipe?.id) return null;
  const href = ROUTES.recipe(toSlugId(recipe.title, recipe.id));
  const summary = recipe.summary ? stripHtml(recipe.summary).slice(0, 120) : "";
  const cuisines = (recipe.cuisines ?? []).slice(0, 2);

  return (
    <article className={cn("group relative", className)}>
      <Link
        to={href}
        className="group block overflow-hidden rounded-2xl border border-border bg-surface/60 shadow-soft backdrop-blur transition duration-300 ease-out hover:-translate-y-1 hover:border-accent hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-accent"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-elevated">
          {recipe.image ? (
            <img
              src={recipe.image}
              alt=""
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              className="size-full object-cover transition duration-[700ms] ease-out group-hover:scale-[1.06]"
            />
          ) : null}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
          {Number.isFinite(recipe.readyInMinutes) && recipe.readyInMinutes > 0 ? (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-overlay px-2.5 py-1 text-xs font-medium text-text backdrop-blur">
              <Clock className="size-3" aria-hidden="true" />
              {formatMinutes(recipe.readyInMinutes)}
            </span>
          ) : null}
        </div>
        <div className="flex flex-col gap-2 p-4">
          <h3 className="font-serif text-lg leading-tight text-text transition-colors group-hover:text-accent">
            {recipe.title}
          </h3>
          {summary ? (
            <p className="line-clamp-2 text-sm text-text-secondary">
              {summary}
              {summary.length >= 120 ? "…" : null}
            </p>
          ) : null}
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted">
            {Number.isFinite(recipe.servings) && recipe.servings > 0 ? (
              <span className="inline-flex items-center gap-1">
                <Users className="size-3.5" aria-hidden="true" />
                {recipe.servings} Port.
              </span>
            ) : null}
            {cuisines.map((c) => (
              <span
                key={c}
                className="rounded-full border border-border px-2 py-0.5 uppercase tracking-wider"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <FavoriteButton
        recipe={recipe}
        size="sm"
        className="absolute right-3 top-3 z-10"
      />
    </article>
  );
}

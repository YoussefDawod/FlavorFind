import { Link } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import { ErrorState } from "../components/feedback/ErrorState";
import { RecipeCardSkeleton } from "../components/feedback/Skeleton";
import { useRandomRecipes } from "../hooks/useRecipes";
import { ROUTES } from "../utils/routes";
import { toSlugId } from "../utils/slug";
import { formatMinutes, stripHtml } from "../utils/formatters";
import { shouldUseMocks } from "../utils/api/client";

export default function HomePage() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useRandomRecipes({ number: 8 });

  return (
    <PageShell
      eyebrow="Entdecken"
      title={
        <>
          Cook like it{" "}
          <em className="italic text-[var(--color-accent)]">matters.</em>
        </>
      }
      intro="Acht Rezepte, zufällig kuratiert — einfach zum Stöbern. Hero, Filter und Kategorien folgen in Phase 4."
    >
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest">
        <span className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/50 px-3 py-1 font-mono text-[color:var(--color-accent)]">
          Phase 2 · API
        </span>
        {shouldUseMocks() ? (
          <span className="rounded-full bg-[color:var(--color-secondary-soft)] px-3 py-1 font-mono text-[color:var(--color-secondary)]">
            Demo-Modus
          </span>
        ) : (
          <span className="rounded-full bg-[color:var(--color-accent-soft)] px-3 py-1 font-mono text-[color:var(--color-accent)]">
            Live-API
          </span>
        )}
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="ml-auto rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface-elevated)] px-4 py-1.5 font-sans text-xs normal-case tracking-normal text-[color:var(--color-text)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isFetching ? "Lädt …" : "Neu mischen"}
        </button>
      </div>

      <div className="mt-8">
        {isError ? (
          <ErrorState error={error} onRetry={() => refetch()} />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <RecipeCardSkeleton key={i} />
                ))
              : (data ?? []).map((recipe) => (
                  <RecipePreviewCard key={recipe.id} recipe={recipe} />
                ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}

function RecipePreviewCard({ recipe }) {
  const slugId = toSlugId(recipe.title, recipe.id);
  const href = ROUTES.recipe(slugId);
  const summary = stripHtml(recipe.summary).slice(0, 120);

  return (
    <Link
      to={href}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/60 shadow-[var(--shadow-soft)] backdrop-blur transition hover:-translate-y-1 hover:border-[color:var(--color-accent)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--color-surface-elevated)]">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt=""
            loading="lazy"
            className="size-full object-cover transition duration-[600ms] ease-out group-hover:scale-[1.06]"
          />
        ) : null}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[color:var(--color-bg)] via-[color:var(--color-bg)]/60 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-[color:var(--color-overlay)] px-2.5 py-1 text-xs font-medium text-[color:var(--color-text)] backdrop-blur">
          {formatMinutes(recipe.readyInMinutes)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-[family-name:var(--font-serif)] text-lg leading-tight text-[color:var(--color-text)] group-hover:text-[color:var(--color-accent)]">
          {recipe.title}
        </h3>
        {summary ? (
          <p className="line-clamp-2 text-sm text-[color:var(--color-text-secondary)]">
            {summary}
            {summary.length >= 120 ? "…" : null}
          </p>
        ) : null}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {(recipe.cuisines ?? []).slice(0, 2).map((c) => (
            <span
              key={c}
              className="rounded-full border border-[color:var(--color-border)] px-2 py-0.5 text-[11px] uppercase tracking-wider text-[color:var(--color-text-muted)]"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

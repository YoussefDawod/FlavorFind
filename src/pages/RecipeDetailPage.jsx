import { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChefHat,
  Clock,
  ExternalLink,
  Flame,
  Leaf,
  Share2,
  Users,
} from "lucide-react";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { Skeleton } from "../components/feedback/Skeleton";
import { ErrorState } from "../components/feedback/ErrorState";
import FavoriteButton from "../components/recipe/FavoriteButton";
import RecipeGrid from "../components/recipe/RecipeGrid";
import { useRecipeDetail, useSimilarRecipes } from "../hooks/useRecipes";
import { useToast } from "../hooks/useToast";
import { parseIdFromSlug, toSlugId } from "../utils/slug";
import { formatAmount, formatMinutes, stripHtml } from "../utils/formatters";
import { ROUTES } from "../utils/routes";

export default function RecipeDetailPage() {
  const { slugId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const id = useMemo(() => parseIdFromSlug(slugId), [slugId]);

  const {
    data: recipe,
    isLoading,
    isError,
    error,
    refetch,
  } = useRecipeDetail(id);
  const { data: similar = [] } = useSimilarRecipes(id, { number: 4 });

  useEffect(() => {
    if (recipe?.title) {
      document.title = `${recipe.title} – FlavorFind`;
    }
  }, [recipe?.title]);

  if (!id) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <ErrorState
          error={new Error("Ungültiger Rezept-Link.")}
          onRetry={() => navigate(ROUTES.home)}
        />
      </div>
    );
  }

  if (isLoading) return <DetailSkeleton />;
  if (isError) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <ErrorState error={error} onRetry={() => refetch()} />
      </div>
    );
  }
  if (!recipe) return null;

  const summary = recipe.summary ? stripHtml(recipe.summary) : "";
  const ingredients = recipe.extendedIngredients ?? [];
  const steps = recipe.analyzedInstructions?.[0]?.steps ?? [];
  const badges = [
    recipe.vegetarian && { label: "Vegetarisch", icon: Leaf },
    recipe.vegan && { label: "Vegan", icon: Leaf },
    recipe.glutenFree && { label: "Glutenfrei" },
    recipe.dairyFree && { label: "Laktosefrei" },
    recipe.veryHealthy && { label: "Sehr gesund" },
  ].filter(Boolean);

  const nutrients = recipe.nutrition?.nutrients ?? [];
  const mainNutrients = ["Calories", "Protein", "Carbohydrates", "Fat"]
    .map((name) => nutrients.find((n) => n.name === name))
    .filter(Boolean);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: recipe.title, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        toast({
          variant: "success",
          title: "Link kopiert",
          description: "Der Rezept-Link ist in deiner Zwischenablage.",
        });
      }
    } catch {
      /* Nutzer:in hat abgebrochen — still */
    }
  }

  return (
    <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <nav className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="size-4" aria-hidden="true" />}
          onClick={() => navigate(-1)}
        >
          Zurück
        </Button>
      </nav>

      <header className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-surface-elevated shadow-soft">
          {recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="size-full object-cover"
            />
          ) : null}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg/70 to-transparent" />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            {(recipe.cuisines ?? []).slice(0, 3).map((c) => (
              <Badge key={c} variant="outline" size="sm">
                {c}
              </Badge>
            ))}
            {badges.map((b) => (
              <Badge key={b.label} variant="accent" size="sm">
                {b.label}
              </Badge>
            ))}
          </div>
          <h1 className="font-serif text-4xl leading-[1.05] text-text sm:text-5xl">
            {recipe.title}
          </h1>
          {summary ? (
            <p className="text-base leading-relaxed text-text-secondary">
              {summary.slice(0, 260)}
              {summary.length > 260 ? "…" : ""}
            </p>
          ) : null}
          <dl className="grid grid-cols-3 gap-3 rounded-2xl border border-border bg-surface/50 p-4 text-sm">
            <MetaCell
              icon={Clock}
              label="Zeit"
              value={formatMinutes(recipe.readyInMinutes)}
            />
            <MetaCell
              icon={Users}
              label="Portionen"
              value={recipe.servings ?? "—"}
            />
            <MetaCell
              icon={Flame}
              label="Health"
              value={
                Number.isFinite(recipe.healthScore)
                  ? `${Math.round(recipe.healthScore)}`
                  : "—"
              }
            />
          </dl>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<ChefHat className="size-4" aria-hidden="true" />}
              onClick={() =>
                navigate(ROUTES.cookMode(toSlugId(recipe.title, recipe.id)))
              }
            >
              Koch-Modus starten
            </Button>
            <FavoriteButton recipe={recipe} size="lg" />
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Share2 className="size-4" aria-hidden="true" />}
              onClick={handleShare}
            >
              Teilen
            </Button>
          </div>
        </div>
      </header>

      <section className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <aside>
          <h2 className="font-serif text-2xl text-text">Zutaten</h2>
          <p className="mt-1 text-xs uppercase tracking-widest text-text-muted">
            Für {recipe.servings ?? "—"} Portion
            {recipe.servings === 1 ? "" : "en"}
          </p>
          <ul className="mt-5 space-y-2">
            {ingredients.map((ing, i) => (
              <li
                key={`${ing.id ?? ing.name}-${i}`}
                className="flex items-baseline justify-between gap-4 border-b border-border py-2 text-sm"
              >
                <span className="text-text">{ing.name}</span>
                <span className="font-mono text-text-secondary">
                  {Number.isFinite(ing.amount) && ing.amount > 0
                    ? `${formatAmount(ing.amount)} ${ing.unit ?? ""}`.trim()
                    : (ing.original ?? "")}
                </span>
              </li>
            ))}
            {ingredients.length === 0 ? (
              <li className="text-sm text-text-muted">
                Keine Zutatenliste verfügbar.
              </li>
            ) : null}
          </ul>

          {mainNutrients.length > 0 ? (
            <div className="mt-8 rounded-2xl border border-border bg-surface/50 p-4">
              <h3 className="text-xs font-medium uppercase tracking-widest text-text-secondary">
                Nährwerte pro Portion
              </h3>
              <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                {mainNutrients.map((n) => (
                  <div key={n.name} className="flex justify-between">
                    <dt className="text-text-muted">{n.name}</dt>
                    <dd className="font-mono text-text">
                      {Math.round(n.amount)} {n.unit}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </aside>

        <div>
          <h2 className="font-serif text-2xl text-text">Zubereitung</h2>
          {steps.length > 0 ? (
            <ol className="mt-5 space-y-5">
              {steps.map((s) => (
                <li
                  key={s.number}
                  className="flex gap-4 rounded-2xl border border-border bg-surface/40 p-4"
                >
                  <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-sm text-accent">
                    {s.number}
                  </span>
                  <p className="text-sm leading-relaxed text-text">{s.step}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-4 text-sm text-text-muted">
              Keine strukturierte Anleitung verfügbar.
              {recipe.sourceUrl ? (
                <>
                  {" "}
                  Die Originalquelle findest du{" "}
                  <a
                    href={recipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-accent hover:underline"
                  >
                    hier
                    <ExternalLink className="size-3" aria-hidden="true" />
                  </a>
                  .
                </>
              ) : null}
            </p>
          )}
        </div>
      </section>

      {similar.length > 0 ? (
        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-serif text-2xl text-text">Ähnliche Rezepte</h2>
            <Link
              to={ROUTES.search}
              className="text-xs uppercase tracking-widest text-accent hover:underline"
            >
              Weiter stöbern
            </Link>
          </div>
          <RecipeGrid recipes={similar} />
        </section>
      ) : null}
    </article>
  );
}

function MetaCell({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <Icon className="size-4 text-accent" aria-hidden="true" />
      <dt className="text-[10px] uppercase tracking-widest text-text-muted">
        {label}
      </dt>
      <dd className="font-medium text-text">{value}</dd>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <Skeleton className="aspect-[4/3] w-full rounded-3xl" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-16 w-full" />
          <div className="flex gap-3">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-12" />
            <Skeleton className="h-12 w-28" />
          </div>
        </div>
      </div>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-3">
          <Skeleton className="h-6 w-24" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>
        <div className="space-y-3">
          <Skeleton className="h-6 w-32" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

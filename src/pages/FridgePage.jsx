import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Carrot, ChefHat, Plus, Refrigerator, Trash2 } from "lucide-react";
import PageShell from "../components/layout/PageShell";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Chip from "../components/ui/Chip";
import EmptyState from "../components/ui/EmptyState";
import { Skeleton } from "../components/feedback/Skeleton";
import { ErrorState } from "../components/feedback/ErrorState";
import FavoriteButton from "../components/recipe/FavoriteButton";
import { useFridgeIngredients } from "../hooks/useFridgeIngredients";
import { useRecipesByIngredients } from "../hooks/useRecipes";
import { useToast } from "../hooks/useToast";
import { ROUTES } from "../utils/routes";
import { toSlugId } from "../utils/slug";
import { formatMinutes } from "../utils/formatters";
import { cn } from "../utils/cn";

const SUGGESTIONS = [
  "Tomate",
  "Zwiebel",
  "Knoblauch",
  "Olivenöl",
  "Pasta",
  "Eier",
  "Parmesan",
  "Hähnchen",
  "Reis",
  "Spinat",
  "Zitrone",
  "Chili",
];

export default function FridgePage() {
  const { toast } = useToast();
  const { ingredients, add, remove, clear, has, count } =
    useFridgeIngredients();
  const [draft, setDraft] = useState("");

  const {
    data = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useRecipesByIngredients(ingredients, {
    number: 12,
    ranking: 1,
    enabled: ingredients.length > 0,
  });

  const results = useMemo(() => data ?? [], [data]);

  function handleAdd(e) {
    e?.preventDefault?.();
    const value = draft.trim();
    if (!value) return;
    const added = add(value);
    if (!added) {
      toast({ variant: "info", title: "Zutat bereits vorhanden" });
    }
    setDraft("");
  }

  function handleClear() {
    if (!count) return;
    clear();
    toast({ variant: "info", title: "Kühlschrank geleert" });
  }

  return (
    <PageShell
      eyebrow="Kühlschrank-Modus"
      title="Was habe ich — was kann ich kochen?"
      intro="Trag ein, was bei dir zu Hause liegt. Wir finden Rezepte mit möglichst wenig fehlenden Zutaten."
      actions={
        count > 0 ? (
          <Button
            variant="ghost"
            size="md"
            leftIcon={<Trash2 className="size-4" aria-hidden="true" />}
            onClick={handleClear}
          >
            Alles löschen
          </Button>
        ) : null
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <aside className="flex flex-col gap-6">
          <form onSubmit={handleAdd} className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder="Zutat hinzufügen …"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              leftIcon={<Carrot className="size-4" aria-hidden="true" />}
              size="lg"
              label="Deine Zutaten"
              helperText="Enter drücken zum Hinzufügen."
            />
            <Button
              type="submit"
              variant="primary"
              leftIcon={<Plus className="size-4" aria-hidden="true" />}
              disabled={!draft.trim()}
            >
              Hinzufügen
            </Button>
          </form>

          {count > 0 ? (
            <div>
              <span className="text-xs font-medium uppercase tracking-widest text-text-secondary">
                Im Kühlschrank ({count})
              </span>
              <ul className="mt-3 flex flex-wrap gap-2">
                {ingredients.map((ing) => (
                  <li key={ing}>
                    <Chip onRemove={() => remove(ing)}>{ing}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-text-secondary">
              Vorschläge
            </span>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SUGGESTIONS.filter((s) => !has(s)).map((s) => (
                <li key={s}>
                  <Chip onClick={() => add(s)}>{s}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section>
          {count === 0 ? (
            <EmptyState
              icon={Refrigerator}
              title="Dein Kühlschrank ist leer"
              description="Füge mindestens eine Zutat hinzu, um Rezeptvorschläge zu erhalten."
            />
          ) : isError ? (
            <ErrorState error={error} onRetry={() => refetch()} />
          ) : isLoading ? (
            <ResultsSkeleton />
          ) : results.length === 0 ? (
            <EmptyState
              icon={ChefHat}
              title="Keine passenden Rezepte"
              description="Versuche, eine häufige Grundzutat wie Pasta, Reis oder Eier hinzuzufügen."
            />
          ) : (
            <ResultList results={results} isFetching={isFetching} />
          )}
        </section>
      </div>
    </PageShell>
  );
}

function ResultList({ results, isFetching }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-text">Vorschläge</h2>
        <span className="text-xs uppercase tracking-widest text-text-muted">
          {isFetching ? "Lädt …" : `${results.length} Treffer`}
        </span>
      </div>
      <ul className="flex flex-col gap-4">
        {results.map((r) => (
          <MatchCard key={r.id} recipe={r} />
        ))}
      </ul>
    </div>
  );
}

function MatchCard({ recipe }) {
  const used = recipe.usedIngredientCount ?? 0;
  const missed = recipe.missedIngredientCount ?? 0;
  const total = used + missed;
  const pct = total > 0 ? Math.round((used / total) * 100) : 0;
  const missedList = (recipe.missedIngredients ?? []).slice(0, 4);

  return (
    <li className="relative overflow-hidden rounded-2xl border border-border bg-surface/60 shadow-soft transition hover:-translate-y-0.5 hover:border-accent hover:shadow-glow">
      <Link
        to={ROUTES.recipe(toSlugId(recipe.title, recipe.id))}
        className="flex gap-4 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div className="relative size-28 shrink-0 overflow-hidden rounded-xl bg-surface-elevated sm:size-32">
          {recipe.image ? (
            <img
              src={recipe.image}
              alt=""
              loading="lazy"
              className="size-full object-cover"
            />
          ) : null}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h3 className="font-serif text-lg leading-tight text-text">
            {recipe.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
            {Number.isFinite(recipe.readyInMinutes) ? (
              <span>{formatMinutes(recipe.readyInMinutes)}</span>
            ) : null}
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono",
                pct >= 80
                  ? "bg-accent-soft text-accent"
                  : pct >= 50
                    ? "bg-secondary-soft text-secondary"
                    : "bg-surface-elevated text-text-secondary",
              )}
            >
              {used}/{total} • {pct}%
            </span>
          </div>
          {missedList.length > 0 ? (
            <p className="text-xs text-text-secondary">
              Fehlt:{" "}
              <span className="text-text">
                {missedList.map((m) => m.name).join(", ")}
                {missed > missedList.length ? " …" : ""}
              </span>
            </p>
          ) : (
            <p className="text-xs text-accent">
              Alle Zutaten vorhanden — los geht’s!
            </p>
          )}
        </div>
      </Link>
      <FavoriteButton
        recipe={recipe}
        size="sm"
        className="absolute right-3 top-3 z-10"
      />
    </li>
  );
}

function ResultsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-32 w-full rounded-2xl" />
      ))}
    </div>
  );
}

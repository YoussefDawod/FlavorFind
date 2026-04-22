import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import PageShell from "../components/layout/PageShell";
import Input from "../components/ui/Input";
import Chip from "../components/ui/Chip";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import RecipeGrid from "../components/recipe/RecipeGrid";
import { ErrorState } from "../components/feedback/ErrorState";
import { useRecipeSearch } from "../hooks/useRecipes";
import { useDebounce } from "../hooks/useDebounce";

const CUISINES = [
  "Italian",
  "Mexican",
  "Asian",
  "Mediterranean",
  "American",
  "Indian",
  "French",
];
const DIETS = [
  { label: "Vegetarisch", value: "vegetarian" },
  { label: "Vegan", value: "vegan" },
  { label: "Glutenfrei", value: "gluten free" },
  { label: "Ketogen", value: "ketogenic" },
];
const TIMES = [
  { label: "≤ 15 Min", value: "15" },
  { label: "≤ 30 Min", value: "30" },
  { label: "≤ 60 Min", value: "60" },
];

function readParam(params, key) {
  const v = params.get(key);
  return v && v.trim() ? v : null;
}

export default function SearchPage() {
  const [params, setParams] = useSearchParams();

  const query = params.get("q") ?? "";
  const cuisine = readParam(params, "cuisine");
  const diet = readParam(params, "diet");
  const maxReadyTime = readParam(params, "time");

  const debouncedQuery = useDebounce(query, 350);

  const filters = useMemo(
    () => ({
      query: debouncedQuery || undefined,
      cuisine: cuisine || undefined,
      diet: diet || undefined,
      maxReadyTime: maxReadyTime ? Number(maxReadyTime) : undefined,
      number: 20,
    }),
    [debouncedQuery, cuisine, diet, maxReadyTime],
  );

  const hasAnyFilter = Boolean(
    debouncedQuery || cuisine || diet || maxReadyTime,
  );

  const { data, isLoading, isFetching, isError, error, refetch } =
    useRecipeSearch(filters, { enabled: hasAnyFilter });

  const results = data?.results ?? [];
  const total = data?.totalResults ?? 0;

  function updateParam(key, value) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value === null || value === "" || value === undefined) {
          next.delete(key);
        } else {
          next.set(key, value);
        }
        return next;
      },
      { replace: true },
    );
  }

  function clearAll() {
    setParams(new URLSearchParams(), { replace: true });
  }

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = query
        ? `„${query}" – FlavorFind`
        : "Rezept-Suche – FlavorFind";
    }
  }, [query]);

  return (
    <PageShell
      eyebrow="Suche"
      title="Finde dein nächstes Rezept."
      intro="Schreib los oder kombiniere Filter. Die URL behält deine Auswahl — teilen erlaubt."
    >
      <div className="flex flex-col gap-6">
        <Input
          type="search"
          placeholder="Rezept, Zutat oder Gericht …"
          value={query}
          onChange={(e) => updateParam("q", e.target.value)}
          leftIcon={<Search className="size-4" aria-hidden="true" />}
          rightSlot={
            query ? (
              <button
                type="button"
                onClick={() => updateParam("q", "")}
                className="text-text-muted hover:text-text"
                aria-label="Suchfeld leeren"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            ) : null
          }
          size="lg"
        />

        <div className="space-y-4">
          <FilterGroup label="Küche">
            <Chip
              active={!cuisine}
              onClick={() => updateParam("cuisine", null)}
            >
              Alle
            </Chip>
            {CUISINES.map((c) => (
              <Chip
                key={c}
                active={cuisine === c}
                onClick={() =>
                  updateParam("cuisine", cuisine === c ? null : c)
                }
              >
                {c}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Ernährung">
            <Chip active={!diet} onClick={() => updateParam("diet", null)}>
              Alle
            </Chip>
            {DIETS.map((d) => (
              <Chip
                key={d.value}
                active={diet === d.value}
                onClick={() =>
                  updateParam("diet", diet === d.value ? null : d.value)
                }
              >
                {d.label}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Zeit">
            <Chip
              active={!maxReadyTime}
              onClick={() => updateParam("time", null)}
            >
              Beliebig
            </Chip>
            {TIMES.map((t) => (
              <Chip
                key={t.value}
                active={maxReadyTime === t.value}
                onClick={() =>
                  updateParam(
                    "time",
                    maxReadyTime === t.value ? null : t.value,
                  )
                }
              >
                {t.label}
              </Chip>
            ))}
          </FilterGroup>

          {hasAnyFilter ? (
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest text-text-muted">
                {isFetching
                  ? "Suche …"
                  : total > 0
                    ? `${total} Treffer`
                    : "Keine Treffer"}
              </p>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<X className="size-4" aria-hidden="true" />}
                onClick={clearAll}
              >
                Filter zurücksetzen
              </Button>
            </div>
          ) : null}
        </div>

        <div>
          {!hasAnyFilter ? (
            <EmptyState
              icon={SlidersHorizontal}
              title="Starte deine Suche"
              description="Tippe einen Suchbegriff oder wähle einen Filter, um Rezepte zu finden."
            />
          ) : isError ? (
            <ErrorState error={error} onRetry={() => refetch()} />
          ) : !isLoading && results.length === 0 ? (
            <EmptyState
              icon={Search}
              title="Keine Rezepte gefunden"
              description="Versuche es mit einem anderen Begriff oder weniger Filtern."
              action={{ label: "Filter zurücksetzen", onClick: clearAll }}
            />
          ) : (
            <RecipeGrid
              recipes={results}
              isLoading={isLoading}
              skeletonCount={8}
            />
          )}
        </div>
      </div>
    </PageShell>
  );
}

function FilterGroup({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-widest text-text-secondary">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

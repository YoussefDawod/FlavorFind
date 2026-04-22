import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChefHat, RefreshCcw, Search, Sparkles } from "lucide-react";
import PageShell from "../components/layout/PageShell";
import RecipeGrid from "../components/recipe/RecipeGrid";
import Button from "../components/ui/Button";
import Chip from "../components/ui/Chip";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";
import { ErrorState } from "../components/feedback/ErrorState";
import { useRandomRecipes } from "../hooks/useRecipes";
import { ROUTES } from "../utils/routes";
import { shouldUseMocks } from "../utils/api/client";

const CATEGORIES = [
  { label: "Alle", value: null },
  { label: "Schnell (≤30 Min)", value: "quick" },
  { label: "Vegetarisch", value: "vegetarian" },
  { label: "Pasta", value: "pasta" },
  { label: "Dessert", value: "dessert" },
  { label: "Salat", value: "salad" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);

  // Für `quick` laden wir mehr Treffer und filtern Client-seitig;
  // alle anderen Tags gehen direkt an Spoonacular.
  const tags = useMemo(() => {
    if (!category || category === "quick") return undefined;
    return [category];
  }, [category]);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useRandomRecipes({ number: 12, tags });

  const recipes = useMemo(() => {
    const list = data ?? [];
    if (category === "quick") {
      return list.filter(
        (r) => Number.isFinite(r.readyInMinutes) && r.readyInMinutes <= 30,
      );
    }
    return list;
  }, [data, category]);

  return (
    <PageShell
      eyebrow="Entdecken"
      title={
        <>
          Cook like it <em className="italic text-accent">matters.</em>
        </>
      }
      intro="Dunkel geröstete Aromen, klare Linien, kompromisslose Zutaten. Entdecke kuratierte Rezepte oder starte direkt mit einer Suche."
      actions={
        <>
          <Badge variant={shouldUseMocks() ? "secondary" : "accent"} size="md">
            {shouldUseMocks() ? "Demo-Modus" : "Live-API"}
          </Badge>
          <Button
            variant="primary"
            size="md"
            leftIcon={<Search className="size-4" aria-hidden="true" />}
            onClick={() => navigate(ROUTES.search)}
          >
            Rezept suchen
          </Button>
          <Button
            variant="outline"
            size="md"
            leftIcon={<Sparkles className="size-4" aria-hidden="true" />}
            onClick={() => navigate(ROUTES.surprise)}
          >
            Überraschen
          </Button>
        </>
      }
    >
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map((cat) => (
          <Chip
            key={cat.label}
            active={category === cat.value}
            onClick={() => setCategory(cat.value)}
          >
            {cat.label}
          </Chip>
        ))}
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<RefreshCcw className="size-4" aria-hidden="true" />}
          onClick={() => refetch()}
          isLoading={isFetching}
          className="ml-auto"
        >
          Neu mischen
        </Button>
      </div>

      <div className="mt-8">
        {isError ? (
          <ErrorState error={error} onRetry={() => refetch()} />
        ) : !isLoading && recipes.length === 0 ? (
          <EmptyState
            icon={ChefHat}
            title="Keine Rezepte in dieser Kategorie"
            description="Versuche eine andere Kategorie oder lass neu mischen."
            action={{
              label: "Alle anzeigen",
              onClick: () => setCategory(null),
            }}
          />
        ) : (
          <RecipeGrid
            recipes={recipes}
            isLoading={isLoading}
            skeletonCount={8}
            priorityFirst
          />
        )}
      </div>
    </PageShell>
  );
}

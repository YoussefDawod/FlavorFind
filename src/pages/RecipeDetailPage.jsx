import { useParams } from "react-router-dom";
import PageShell from "../components/layout/PageShell";

export default function RecipeDetailPage() {
  const { slugId } = useParams();

  return (
    <PageShell
      eyebrow="Rezept"
      title="Rezept-Detailseite"
      intro={`Cineastisches Hero, Zutaten, Schritte, Nährwerte und ähnliche Rezepte folgen in Phase 4. Aktueller Slug: ${slugId}`}
    />
  );
}

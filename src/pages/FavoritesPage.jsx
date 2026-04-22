import { useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Heart, Search, Trash2 } from "lucide-react";

import PageShell from "../components/layout/PageShell";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import Input from "../components/ui/Input";
import { useFavorites } from "../hooks/useFavorites";
import { useToast } from "../hooks/useToast";
import { ROUTES } from "../utils/routes";
import { toSlugId } from "../utils/slug";
import { formatMinutes } from "../utils/formatters";
import { cn } from "../utils/cn";

/**
 * Einzelne Favoriten-Zeile mit Swipe-to-Remove auf Touch-Geräten
 * und klassischem Remove-Button auf Desktop.
 */
function FavoriteRow({ favorite, onRemove }) {
  const x = useMotionValue(0);
  // Roter Hintergrund blendet sich über den ersten -80px Swipe ein.
  const deleteOpacity = useTransform(x, [-140, -40, 0], [1, 0.4, 0]);

  const handleDragEnd = (_, info) => {
    const shouldRemove = info.offset.x < -120 || info.velocity.x < -500;
    if (shouldRemove) {
      onRemove(favorite);
    } else {
      x.set(0);
    }
  };

  const href = ROUTES.recipe(toSlugId(favorite.title, favorite.id));

  return (
    <li className="relative overflow-hidden rounded-2xl">
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-end rounded-2xl bg-danger/20 px-6 text-danger"
        style={{ opacity: deleteOpacity }}
        aria-hidden="true"
      >
        <Trash2 className="size-5" />
        <span className="ml-2 text-sm font-medium">Entfernen</span>
      </motion.div>

      <motion.article
        drag="x"
        dragConstraints={{ left: -200, right: 0 }}
        dragElastic={0.15}
        style={{ x }}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
        className="relative flex items-stretch gap-4 rounded-2xl border border-border bg-surface/80 p-3 shadow-soft backdrop-blur"
      >
        <Link
          to={href}
          className="flex flex-1 items-center gap-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-surface-elevated sm:size-24">
            {favorite.image ? (
              <img
                src={favorite.image}
                alt=""
                loading="lazy"
                className="size-full object-cover"
                draggable={false}
              />
            ) : (
              <div className="flex size-full items-center justify-center text-text-secondary">
                <Heart className="size-6" aria-hidden="true" />
              </div>
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1 py-1">
            <h3 className="line-clamp-2 font-serif text-base text-text sm:text-lg">
              {favorite.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted">
              {Number.isFinite(favorite.readyInMinutes) &&
              favorite.readyInMinutes > 0 ? (
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3.5" aria-hidden="true" />
                  {formatMinutes(favorite.readyInMinutes)}
                </span>
              ) : null}
              <span className="hidden sm:inline text-text-secondary">
                Wische nach links zum Entfernen
              </span>
            </div>
          </div>
        </Link>
        <button
          type="button"
          onClick={() => onRemove(favorite)}
          className="hidden shrink-0 items-center justify-center self-center rounded-full border border-border-strong px-3 py-2 text-xs text-text-secondary transition hover:border-danger hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:inline-flex"
          aria-label={`${favorite.title} aus Favoriten entfernen`}
        >
          <Trash2 className="size-4" aria-hidden="true" />
        </button>
      </motion.article>
    </li>
  );
}

export default function FavoritesPage() {
  const { favorites, removeFavorite, count } = useFavorites();
  const { toast } = useToast();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return favorites;
    return favorites.filter((f) => f.title.toLowerCase().includes(q));
  }, [favorites, query]);

  const handleRemove = (favorite) => {
    removeFavorite(favorite.id);
    toast({
      title: "Aus Favoriten entfernt",
      description: favorite.title,
      variant: "info",
    });
  };

  return (
    <PageShell
      eyebrow="Favoriten"
      title="Deine gespeicherten Rezepte."
      intro="Lokal gespeichert, sofort wieder zur Hand. Auf dem Smartphone einfach nach links wischen, um ein Rezept aus der Liste zu entfernen."
      actions={
        count > 0 ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-elevated px-3 py-1.5 text-xs text-text-secondary">
            <Heart className="size-3.5 text-accent" aria-hidden="true" />
            {count} Rezept{count === 1 ? "" : "e"}
          </span>
        ) : null
      }
    >
      {count === 0 ? (
        <EmptyState
          icon={Heart}
          title="Noch keine Favoriten."
          description="Markiere Rezepte mit dem Herz, um sie hier für den schnellen Zugriff zu sammeln."
          action={{
            label: "Rezepte entdecken",
            onClick: () => {
              window.location.href = ROUTES.search;
            },
            icon: Search,
          }}
        />
      ) : (
        <div className="space-y-6">
          <Input
            type="search"
            placeholder="In deinen Favoriten suchen …"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leftIcon={<Search className="size-4" />}
            className="max-w-md"
          />

          {filtered.length === 0 ? (
            <p className="text-sm text-text-secondary">
              Keine Treffer für &bdquo;{query}&ldquo;.
            </p>
          ) : (
            <ul className={cn("space-y-3")}>
              <AnimatePresence initial={false}>
                {filtered.map((fav) => (
                  <motion.div
                    key={fav.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -320, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.25 }}
                  >
                    <FavoriteRow favorite={fav} onRemove={handleRemove} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </ul>
          )}

          <div className="flex justify-end pt-4">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={Trash2}
              onClick={() => {
                if (
                  window.confirm(
                    "Wirklich alle Favoriten unwiderruflich löschen?",
                  )
                ) {
                  favorites.forEach((f) => removeFavorite(f.id));
                }
              }}
            >
              Alle löschen
            </Button>
          </div>
        </div>
      )}
    </PageShell>
  );
}

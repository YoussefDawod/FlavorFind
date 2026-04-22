import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { useQueries } from "@tanstack/react-query";
import {
  CalendarDays,
  Heart,
  ShoppingBasket,
  Trash2,
  X,
} from "lucide-react";

import PageShell from "../components/layout/PageShell";
import Button from "../components/ui/Button";
import IconButton from "../components/ui/IconButton";
import EmptyState from "../components/ui/EmptyState";
import { useFavorites } from "../hooks/useFavorites";
import { useWeekPlan } from "../hooks/useWeekPlan";
import { recipeKeys } from "../hooks/useRecipes";
import { getRecipeById } from "../utils/api/recipes";
import { WEEK_DAYS, WEEK_SLOTS } from "../utils/constants";
import { cn } from "../utils/cn";

/* ----------------------------- Drag sources ----------------------------- */

function FavoriteDragCard({ favorite }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `fav:${favorite.id}`,
    data: { kind: "favorite", recipe: favorite },
  });

  return (
    <button
      ref={setNodeRef}
      type="button"
      {...listeners}
      {...attributes}
      className={cn(
        "group flex w-44 shrink-0 flex-col gap-2 rounded-2xl border border-border-strong bg-surface-elevated p-2 text-left transition",
        "hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        isDragging && "opacity-40",
      )}
      aria-label={`${favorite.title} per Drag & Drop in einen Slot ziehen`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-surface">
        {favorite.image ? (
          <img
            src={favorite.image}
            alt=""
            className="size-full object-cover"
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div className="flex size-full items-center justify-center text-text-secondary">
            <Heart className="size-6" />
          </div>
        )}
      </div>
      <p className="line-clamp-2 px-1 text-sm font-medium text-text">
        {favorite.title}
      </p>
    </button>
  );
}

function PlannedRecipe({ day, slotId, recipe, onClear }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `plan:${day}:${slotId}`,
    data: { kind: "planned", fromDay: day, fromSlot: slotId, recipe },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative flex size-full flex-col gap-1 rounded-xl bg-surface-elevated p-2 text-left",
        isDragging && "opacity-40",
      )}
    >
      <button
        type="button"
        {...listeners}
        {...attributes}
        className="flex grow flex-col gap-1.5 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={`${recipe.title} verschieben`}
      >
        {recipe.image ? (
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface">
            <img
              src={recipe.image}
              alt=""
              className="size-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>
        ) : null}
        <p className="line-clamp-2 px-0.5 text-xs font-medium text-text">
          {recipe.title}
        </p>
      </button>
      <button
        type="button"
        onClick={() => onClear(day, slotId)}
        className="absolute right-1 top-1 inline-flex size-6 items-center justify-center rounded-full bg-bg/80 text-text-secondary transition hover:bg-danger/80 hover:text-[#F5EFE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={`${recipe.title} aus Slot entfernen`}
      >
        <X className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}

/* ------------------------------- Drop zone ------------------------------ */

function SlotCell({ day, slot, recipe, onClear }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `drop:${day}:${slot.id}`,
    data: { kind: "slot", day, slotId: slot.id },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex min-h-[120px] flex-col rounded-2xl border-2 border-dashed border-border/60 bg-surface/30 p-1.5 transition",
        isOver && "border-accent bg-accent-soft/60",
      )}
    >
      {recipe ? (
        <PlannedRecipe
          day={day}
          slotId={slot.id}
          recipe={recipe}
          onClear={onClear}
        />
      ) : (
        <div className="flex size-full min-h-[108px] items-center justify-center px-2 text-center text-[11px] leading-snug text-text-secondary">
          {slot.label} ziehen
        </div>
      )}
    </div>
  );
}

/* --------------------------- Shopping list panel ------------------------ */

function useShoppingIngredients(plannedIds) {
  const results = useQueries({
    queries: plannedIds.map((id) => ({
      queryKey: recipeKeys.detail(id),
      queryFn: ({ signal }) => getRecipeById(id, { signal }),
      staleTime: 5 * 60 * 1000,
    })),
  });

  const isLoading = results.some((r) => r.isLoading);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const r of results) {
      const recipe = r.data;
      if (!recipe?.extendedIngredients) continue;
      for (const ing of recipe.extendedIngredients) {
        const name = String(ing.name ?? "").trim();
        if (!name) continue;
        const key = `${name.toLowerCase()}|${ing.unit ?? ""}`;
        const existing = map.get(key);
        const amount = Number(ing.amount) || 0;
        if (existing) {
          existing.amount += amount;
          existing.sources.push(recipe.title);
        } else {
          map.set(key, {
            key,
            name,
            unit: ing.unit ?? "",
            aisle: ing.aisle ?? "Sonstiges",
            amount,
            sources: [recipe.title],
          });
        }
      }
    }
    const byAisle = new Map();
    for (const item of map.values()) {
      const aisle = item.aisle || "Sonstiges";
      if (!byAisle.has(aisle)) byAisle.set(aisle, []);
      byAisle.get(aisle).push(item);
    }
    return [...byAisle.entries()]
      .map(([aisle, items]) => ({
        aisle,
        items: items.sort((a, b) => a.name.localeCompare(b.name, "de")),
      }))
      .sort((a, b) => a.aisle.localeCompare(b.aisle, "de"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results.map((r) => r.dataUpdatedAt).join("|")]);

  return { grouped, isLoading };
}

function ShoppingListPanel({ plannedIds }) {
  const { grouped, isLoading } = useShoppingIngredients(plannedIds);
  const [checked, setChecked] = useState(() => new Set());

  const toggle = (key) => {
    setChecked((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  if (plannedIds.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBasket}
        title="Noch leer."
        description="Plane zuerst Rezepte, dann fassen wir die Zutaten hier zusammen."
      />
    );
  }

  if (isLoading && grouped.length === 0) {
    return (
      <p className="text-sm text-text-secondary">Zutaten werden geladen …</p>
    );
  }

  return (
    <div className="space-y-6">
      {grouped.map((group) => (
        <section
          key={group.aisle}
          className="rounded-2xl border border-border/60 bg-surface/40 p-4"
        >
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {group.aisle}
          </h3>
          <ul className="space-y-2">
            {group.items.map((item) => {
              const isChecked = checked.has(item.key);
              return (
                <li key={item.key}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-1.5 transition hover:bg-surface-elevated">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggle(item.key)}
                      className="mt-1 size-4 accent-accent"
                    />
                    <span className="flex-1">
                      <span
                        className={cn(
                          "block text-sm text-text",
                          isChecked && "line-through opacity-60",
                        )}
                      >
                        {item.amount > 0
                          ? `${Math.round(item.amount * 10) / 10} ${item.unit} `
                          : ""}
                        {item.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-text-secondary">
                        für {item.sources.join(", ")}
                      </span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

/* --------------------------------- Page --------------------------------- */

function WeekRow({ slot, plan, onClear }) {
  return (
    <>
      <div className="flex items-center rounded-xl bg-surface-elevated px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">
        {slot.label}
      </div>
      {WEEK_DAYS.map((_, day) => (
        <SlotCell
          key={day}
          day={day}
          slot={slot}
          recipe={plan[day]?.[slot.id] ?? null}
          onClear={onClear}
        />
      ))}
    </>
  );
}

export default function WeekPlanPage() {
  const { favorites } = useFavorites();
  const { plan, plannedIds, count, assign, clearSlot, moveSlot, clearAll } =
    useWeekPlan();
  const [activeDrag, setActiveDrag] = useState(null);
  const [showShoppingList, setShowShoppingList] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 8 },
    }),
    useSensor(KeyboardSensor),
  );

  const handleDragStart = (event) => {
    setActiveDrag(event.active?.data?.current ?? null);
  };

  const handleDragEnd = (event) => {
    setActiveDrag(null);
    const { active, over } = event;
    if (!over) return;
    const activeData = active.data?.current;
    const overData = over.data?.current;
    if (!activeData || overData?.kind !== "slot") return;

    if (activeData.kind === "favorite") {
      assign(overData.day, overData.slotId, activeData.recipe);
    } else if (activeData.kind === "planned") {
      if (
        activeData.fromDay === overData.day &&
        activeData.fromSlot === overData.slotId
      ) {
        return;
      }
      moveSlot(
        activeData.fromDay,
        activeData.fromSlot,
        overData.day,
        overData.slotId,
      );
    }
  };

  const handleDragCancel = () => setActiveDrag(null);
  const overlayRecipe = activeDrag?.recipe ?? null;

  return (
    <PageShell
      eyebrow="Wochenplan"
      title="Plane deine Woche."
      intro="Ziehe Favoriten per Drag & Drop in die 7×3-Matrix und generiere daraus deine Einkaufsliste."
      actions={
        <>
          <Button
            variant="outline"
            size="sm"
            leftIcon={ShoppingBasket}
            onClick={() => setShowShoppingList((v) => !v)}
          >
            {showShoppingList ? "Liste ausblenden" : "Einkaufsliste"}
          </Button>
          {count > 0 ? (
            <Button
              variant="ghost"
              size="sm"
              leftIcon={Trash2}
              onClick={() => {
                if (
                  window.confirm("Wirklich den kompletten Wochenplan leeren?")
                ) {
                  clearAll();
                }
              }}
            >
              Leeren
            </Button>
          ) : null}
        </>
      }
    >
      {favorites.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Keine Favoriten zum Planen."
          description="Markiere zuerst Rezepte als Favorit — dann kannst du sie hier in deinen Wochenplan ziehen."
        />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <section
            aria-label="Favoriten"
            className="mb-8 rounded-2xl border border-border/60 bg-surface/40 p-4"
          >
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              <Heart className="size-4" aria-hidden="true" />
              Favoriten ({favorites.length})
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]">
              {favorites.map((fav) => (
                <FavoriteDragCard key={fav.id} favorite={fav} />
              ))}
            </div>
          </section>

          <section aria-label="Wochenplan" className="overflow-x-auto">
            <div className="min-w-[860px]">
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: `120px repeat(${WEEK_DAYS.length}, minmax(0, 1fr))`,
                }}
              >
                <div aria-hidden="true" />
                {WEEK_DAYS.map((day) => (
                  <div
                    key={day}
                    className="flex items-center justify-center rounded-xl bg-surface-elevated px-2 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text"
                  >
                    {day.slice(0, 2)}
                  </div>
                ))}

                {WEEK_SLOTS.map((slot) => (
                  <WeekRow
                    key={slot.id}
                    slot={slot}
                    plan={plan}
                    onClear={clearSlot}
                  />
                ))}
              </div>
            </div>
          </section>

          <DragOverlay dropAnimation={null}>
            {overlayRecipe ? (
              <div className="w-44 rounded-2xl border border-accent bg-surface-elevated p-2 shadow-glow">
                {overlayRecipe.image ? (
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl">
                    <img
                      src={overlayRecipe.image}
                      alt=""
                      className="size-full object-cover"
                    />
                  </div>
                ) : null}
                <p className="mt-2 line-clamp-2 px-1 text-sm font-medium text-text">
                  {overlayRecipe.title}
                </p>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}

      {showShoppingList ? (
        <section
          aria-label="Einkaufsliste"
          className="mt-10 rounded-3xl border border-border/60 bg-surface/30 p-5 sm:p-6"
        >
          <header className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                <ShoppingBasket className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-serif text-2xl text-text">Einkaufsliste</h2>
                <p className="text-xs text-text-secondary">
                  {count} Rezept{count === 1 ? "" : "e"} aggregiert
                </p>
              </div>
            </div>
            <IconButton
              variant="subtle"
              size="sm"
              aria-label="Einkaufsliste schließen"
              onClick={() => setShowShoppingList(false)}
            >
              <X className="size-4" aria-hidden="true" />
            </IconButton>
          </header>
          <ShoppingListPanel plannedIds={plannedIds} />
        </section>
      ) : null}

      {count === 0 && favorites.length > 0 ? (
        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-text-secondary">
          <CalendarDays className="size-4" aria-hidden="true" />
          Noch kein Slot belegt — zieh ein Favoriten-Rezept in einen Tag.
        </p>
      ) : null}
    </PageShell>
  );
}

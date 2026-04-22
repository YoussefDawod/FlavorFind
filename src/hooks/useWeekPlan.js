import { useCallback, useEffect, useMemo, useState } from "react";
import { readStorage, writeStorage } from "../utils/storage";
import { STORAGE_KEYS, WEEK_DAYS, WEEK_SLOTS } from "../utils/constants";

/**
 * Reduzierter Rezept-Snapshot, identisch zum Favoriten-Format,
 * damit localStorage schlank bleibt.
 */
function toPlanSnapshot(recipe) {
  if (!recipe || typeof recipe !== "object") return null;
  const id = Number(recipe.id);
  if (!Number.isFinite(id)) return null;
  return {
    id,
    title: recipe.title ?? "",
    image: recipe.image ?? null,
    readyInMinutes: Number.isFinite(recipe.readyInMinutes)
      ? recipe.readyInMinutes
      : null,
  };
}

function emptyPlan() {
  const plan = {};
  for (let day = 0; day < WEEK_DAYS.length; day += 1) {
    const slots = {};
    for (const slot of WEEK_SLOTS) slots[slot.id] = null;
    plan[day] = slots;
  }
  return plan;
}

function sanitize(raw) {
  const base = emptyPlan();
  if (!raw || typeof raw !== "object") return base;
  for (let day = 0; day < WEEK_DAYS.length; day += 1) {
    const incoming = raw[day];
    if (!incoming || typeof incoming !== "object") continue;
    for (const slot of WEEK_SLOTS) {
      const snap = toPlanSnapshot(incoming[slot.id]);
      if (snap) base[day][slot.id] = snap;
    }
  }
  return base;
}

function loadPlan() {
  return sanitize(readStorage(STORAGE_KEYS.weekPlan, null));
}

/**
 * Hook für den Wochenplan (7 Tage × 3 Slots) mit localStorage-Persistenz.
 */
export function useWeekPlan() {
  const [plan, setPlan] = useState(() => loadPlan());

  useEffect(() => {
    writeStorage(STORAGE_KEYS.weekPlan, plan);
  }, [plan]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onStorage = (event) => {
      if (event.key !== STORAGE_KEYS.weekPlan) return;
      setPlan(loadPlan());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const assign = useCallback((day, slotId, recipe) => {
    const snap = toPlanSnapshot(recipe);
    if (!snap) return;
    setPlan((current) => ({
      ...current,
      [day]: { ...current[day], [slotId]: snap },
    }));
  }, []);

  const clearSlot = useCallback((day, slotId) => {
    setPlan((current) => ({
      ...current,
      [day]: { ...current[day], [slotId]: null },
    }));
  }, []);

  const moveSlot = useCallback((fromDay, fromSlot, toDay, toSlot) => {
    setPlan((current) => {
      const source = current[fromDay]?.[fromSlot];
      if (!source) return current;
      const target = current[toDay]?.[toSlot] ?? null;
      const next = { ...current };
      next[fromDay] = { ...current[fromDay], [fromSlot]: target };
      next[toDay] = { ...next[toDay], [toSlot]: source };
      return next;
    });
  }, []);

  const clearAll = useCallback(() => setPlan(emptyPlan()), []);

  const plannedIds = useMemo(() => {
    const ids = new Set();
    for (let day = 0; day < WEEK_DAYS.length; day += 1) {
      for (const slot of WEEK_SLOTS) {
        const entry = plan[day]?.[slot.id];
        if (entry?.id) ids.add(entry.id);
      }
    }
    return [...ids];
  }, [plan]);

  const count = plannedIds.length;

  return { plan, plannedIds, count, assign, clearSlot, moveSlot, clearAll };
}

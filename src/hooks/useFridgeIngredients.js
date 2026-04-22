import { useCallback, useEffect, useMemo, useState } from "react";
import { readStorage, writeStorage } from "../utils/storage";
import { STORAGE_KEYS } from "../utils/constants";

function normalize(name) {
  return String(name ?? "")
    .trim()
    .toLowerCase();
}

function loadIngredients() {
  const raw = readStorage(STORAGE_KEYS.fridgeIngredients, []);
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => (typeof item === "string" ? item : item?.name))
    .filter(Boolean)
    .map((name) => String(name).trim())
    .filter(Boolean);
}

/**
 * Hook für den Kühlschrank-Modus: hält eine Liste vorhandener Zutaten
 * persistent im localStorage und synchronisiert zwischen Tabs.
 */
export function useFridgeIngredients() {
  const [ingredients, setIngredients] = useState(() => loadIngredients());

  useEffect(() => {
    writeStorage(STORAGE_KEYS.fridgeIngredients, ingredients);
  }, [ingredients]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onStorage = (event) => {
      if (event.key !== STORAGE_KEYS.fridgeIngredients) return;
      setIngredients(loadIngredients());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = useCallback((raw) => {
    const value = String(raw ?? "").trim();
    if (!value) return false;
    const key = normalize(value);
    setIngredients((list) =>
      list.some((i) => normalize(i) === key) ? list : [...list, value],
    );
    return true;
  }, []);

  const addMany = useCallback((list) => {
    if (!Array.isArray(list)) return;
    setIngredients((current) => {
      const next = [...current];
      list.forEach((raw) => {
        const value = String(raw ?? "").trim();
        if (!value) return;
        const key = normalize(value);
        if (!next.some((i) => normalize(i) === key)) next.push(value);
      });
      return next;
    });
  }, []);

  const remove = useCallback((name) => {
    const key = normalize(name);
    setIngredients((list) => list.filter((i) => normalize(i) !== key));
  }, []);

  const clear = useCallback(() => setIngredients([]), []);

  const has = useCallback(
    (name) => {
      const key = normalize(name);
      return ingredients.some((i) => normalize(i) === key);
    },
    [ingredients],
  );

  const keys = useMemo(
    () => new Set(ingredients.map((i) => normalize(i))),
    [ingredients],
  );

  return {
    ingredients,
    add,
    addMany,
    remove,
    clear,
    has,
    keys,
    count: ingredients.length,
  };
}

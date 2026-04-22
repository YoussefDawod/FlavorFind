import { useCallback, useEffect, useMemo, useState } from "react";
import { readStorage, writeStorage } from "../utils/storage";
import { STORAGE_KEYS } from "../utils/constants";

/**
 * Shape eines Favoriten-Eintrags: schlanker Snapshot (keine kompletten Detail-Objekte),
 * damit der localStorage klein bleibt.
 */
function toFavoriteSnapshot(recipe) {
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
    addedAt: Date.now(),
  };
}

function loadFavorites() {
  const raw = readStorage(STORAGE_KEYS.favorites, []);
  if (!Array.isArray(raw)) return [];
  return raw.filter((item) => item && Number.isFinite(Number(item.id)));
}

/**
 * Favoriten-Hook mit Persistenz in localStorage.
 * Synchronisiert sich zwischen Tabs via `storage`-Event.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(() => loadFavorites());

  useEffect(() => {
    writeStorage(STORAGE_KEYS.favorites, favorites);
  }, [favorites]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onStorage = (event) => {
      if (event.key !== STORAGE_KEYS.favorites) return;
      setFavorites(loadFavorites());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const ids = useMemo(() => new Set(favorites.map((f) => f.id)), [favorites]);

  const isFavorite = useCallback((id) => ids.has(Number(id)), [ids]);

  const addFavorite = useCallback((recipe) => {
    const snap = toFavoriteSnapshot(recipe);
    if (!snap) return;
    setFavorites((list) =>
      list.some((f) => f.id === snap.id) ? list : [snap, ...list],
    );
  }, []);

  const removeFavorite = useCallback((id) => {
    const numeric = Number(id);
    setFavorites((list) => list.filter((f) => f.id !== numeric));
  }, []);

  const toggleFavorite = useCallback(
    (recipe) => {
      const id = Number(recipe?.id);
      if (!Number.isFinite(id)) return false;
      if (ids.has(id)) {
        removeFavorite(id);
        return false;
      }
      addFavorite(recipe);
      return true;
    },
    [ids, addFavorite, removeFavorite],
  );

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    count: favorites.length,
  };
}

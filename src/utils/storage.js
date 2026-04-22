/**
 * Safe-Wrapper um localStorage — fängt Quota-/Private-Mode-Fehler ab
 * und serialisiert JSON automatisch.
 */

function getStore() {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readStorage(key, fallback = null) {
  const store = getStore();
  if (!store) return fallback;
  try {
    const raw = store.getItem(key);
    if (raw === null || raw === undefined) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  const store = getStore();
  if (!store) return false;
  try {
    store.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStorage(key) {
  const store = getStore();
  if (!store) return;
  try {
    store.removeItem(key);
  } catch {
    /* no-op */
  }
}

/**
 * Einfacher TTL-Cache via localStorage.
 * Schreibt `{ value, expiresAt }` unter dem Key und liefert `null`, wenn abgelaufen.
 */
export function readCached(key) {
  const entry = readStorage(key, null);
  if (!entry || typeof entry !== "object") return null;
  if (typeof entry.expiresAt !== "number") return null;
  if (Date.now() > entry.expiresAt) {
    removeStorage(key);
    return null;
  }
  return entry.value ?? null;
}

export function writeCached(key, value, ttlMs) {
  if (!Number.isFinite(ttlMs) || ttlMs <= 0) return false;
  return writeStorage(key, { value, expiresAt: Date.now() + ttlMs });
}

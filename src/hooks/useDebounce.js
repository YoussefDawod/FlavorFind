import { useEffect, useState } from "react";

/**
 * Liefert den Wert erst nach `delay` ms ohne neue Änderung zurück.
 * Hilfreich zum Entkoppeln teurer Effekte (API-Suche, Filter) von Eingaben.
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handle);
  }, [value, delay]);

  return debounced;
}

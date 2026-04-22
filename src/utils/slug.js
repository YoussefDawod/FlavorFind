/**
 * URL-freundlicher Slug aus einem Rezept-Titel.
 * Entfernt Diakritika, Nicht-Alphanumerika und begrenzt die Länge.
 */
export function toSlug(value) {
  if (!value) return "";
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " und ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * Kombiniert Titel und ID zu einer lesbaren URL-Komponente.
 * Beispiel: `spaghetti-carbonara-12345`
 */
export function toSlugId(title, id) {
  const slug = toSlug(title);
  if (!id) return slug;
  return slug ? `${slug}-${id}` : String(id);
}

/**
 * Extrahiert die numerische ID aus einem Slug-Id-Parameter.
 * Liefert `null`, wenn keine Ziffern am Ende gefunden werden.
 */
export function parseIdFromSlug(slugId) {
  if (!slugId) return null;
  const match = String(slugId).match(/(\d+)(?!.*\d)/);
  if (!match) return null;
  const id = Number.parseInt(match[1], 10);
  return Number.isFinite(id) ? id : null;
}

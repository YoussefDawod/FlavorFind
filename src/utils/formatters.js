/**
 * Formatiert Zubereitungszeit (Minuten) in lesbare deutsche Form.
 */
export function formatMinutes(minutes) {
  if (!Number.isFinite(minutes) || minutes <= 0) return "—";
  if (minutes < 60) return `${Math.round(minutes)} Min`;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (m === 0) return `${h} Std`;
  return `${h} Std ${m} Min`;
}

/**
 * Rundet Zutaten-Mengen auf eine sinnvolle Stelle (max. 1 Nachkomma).
 */
export function formatAmount(amount) {
  if (!Number.isFinite(amount)) return "";
  const rounded = Math.round(amount * 10) / 10;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toFixed(1).replace(".", ",");
}

/**
 * Passt eine Menge an eine neue Portionszahl an.
 */
export function scaleAmount(amount, originalServings, newServings) {
  if (!Number.isFinite(amount)) return amount;
  if (!Number.isFinite(originalServings) || originalServings <= 0)
    return amount;
  if (!Number.isFinite(newServings) || newServings <= 0) return amount;
  return (amount * newServings) / originalServings;
}

/**
 * Entfernt HTML-Tags aus Spoonacular-Summaries für sichere Anzeige.
 */
export function stripHtml(value) {
  if (!value) return "";
  return String(value)
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

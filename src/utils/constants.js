/**
 * App-weite Konstanten (keine Magic-Strings, keine Magic-Numbers).
 */

export const STORAGE_KEYS = {
  theme: "flavorfind:theme",
  favorites: "flavorfind:favorites",
  mealPlan: "flavorfind:mealplan",
  weekPlan: "flavorfind:week-plan",
  shoppingList: "flavorfind:shopping-list",
  fridgeIngredients: "flavorfind:fridge",
  randomCacheTimestamp: "flavorfind:random-ts",
};

/** Wochentage (Montag-first) und Slots für den Wochenplan */
export const WEEK_DAYS = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
];

export const WEEK_SLOTS = [
  { id: "breakfast", label: "Frühstück" },
  { id: "lunch", label: "Mittag" },
  { id: "dinner", label: "Abend" },
];

export const THEMES = {
  dark: "dark",
  light: "light",
};

/** Typografie-Easings (CSS `cubic-bezier`) */
export const EASINGS = {
  outExpo: [0.16, 1, 0.3, 1],
  back: [0.34, 1.56, 0.64, 1],
};

/** Standard-Dauer für Page-Transitions (Sekunden) */
export const PAGE_TRANSITION_DURATION = 0.35;

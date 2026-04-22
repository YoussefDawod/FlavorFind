/**
 * App-weite Konstanten (keine Magic-Strings, keine Magic-Numbers).
 */

export const STORAGE_KEYS = {
  theme: "flavorfind:theme",
  favorites: "flavorfind:favorites",
  mealPlan: "flavorfind:mealplan",
  fridgeIngredients: "flavorfind:fridge",
  randomCacheTimestamp: "flavorfind:random-ts",
};

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

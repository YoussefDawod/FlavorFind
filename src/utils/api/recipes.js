import { apiGet, shouldUseMocks } from "./client";
import {
  mockFindByIngredients,
  mockRandomRecipes,
  mockRecipeDetail,
  mockRecipeSearch,
  mockSimilar,
} from "../../mocks/recipes";

const DEFAULT_RANDOM_NUMBER = 8;
const DEFAULT_SEARCH_NUMBER = 12;

/**
 * Zufällige Rezepte für die Startseite.
 */
export async function getRandomRecipes(
  { number = DEFAULT_RANDOM_NUMBER, tags } = {},
  options = {},
) {
  if (shouldUseMocks()) return mockRandomRecipes({ number, tags });
  const data = await apiGet(
    "/recipes/random",
    { number, tags: tags?.length ? tags.join(",") : undefined },
    options,
  );
  return data?.recipes ?? [];
}

/**
 * Komplexe Rezeptsuche.
 */
export async function searchRecipes(
  {
    query,
    cuisine,
    diet,
    intolerances,
    type,
    maxReadyTime,
    number = DEFAULT_SEARCH_NUMBER,
    offset = 0,
    sort,
  } = {},
  options = {},
) {
  if (shouldUseMocks()) {
    return mockRecipeSearch({ query, cuisine, diet, number, offset });
  }
  const data = await apiGet(
    "/recipes/complexSearch",
    {
      query,
      cuisine,
      diet,
      intolerances,
      type,
      maxReadyTime,
      number,
      offset,
      sort,
      addRecipeInformation: true,
      fillIngredients: true,
      instructionsRequired: true,
    },
    options,
  );
  return {
    results: data?.results ?? [],
    totalResults: data?.totalResults ?? 0,
    offset: data?.offset ?? offset,
    number: data?.number ?? number,
  };
}

/**
 * Detailinfos eines Rezepts (inkl. Nährwerte und Anleitung).
 */
export async function getRecipeById(id, options = {}) {
  if (shouldUseMocks()) return mockRecipeDetail(id);
  return apiGet(
    `/recipes/${encodeURIComponent(id)}/information`,
    { includeNutrition: true },
    options,
  );
}

/**
 * Rezepte auf Basis vorhandener Zutaten (Kühlschrank-Modus).
 */
export async function findRecipesByIngredients(
  {
    ingredients,
    number = DEFAULT_SEARCH_NUMBER,
    ranking = 1,
    ignorePantry = true,
  } = {},
  options = {},
) {
  if (!ingredients || ingredients.length === 0) return [];
  if (shouldUseMocks()) return mockFindByIngredients({ ingredients, number });
  const data = await apiGet(
    "/recipes/findByIngredients",
    {
      ingredients: ingredients.join(","),
      number,
      ranking,
      ignorePantry,
    },
    options,
  );
  return Array.isArray(data) ? data : [];
}

/**
 * Ähnliche Rezepte auf der Detailseite.
 */
export async function getSimilarRecipes(id, { number = 4 } = {}, options = {}) {
  if (shouldUseMocks()) return mockSimilar(id, { number });
  const data = await apiGet(
    `/recipes/${encodeURIComponent(id)}/similar`,
    { number },
    options,
  );
  return Array.isArray(data) ? data : [];
}

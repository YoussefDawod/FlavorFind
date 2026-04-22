import { apiGet, enableRuntimeMocks, shouldUseMocks } from "./client";
import { QuotaExceededError, ApiError } from "./errors";
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
 * Wrapper: schaltet bei Quota-/Auth-Fehlern auf Mocks um und ruft den
 * entsprechenden Mock-Generator als Fallback auf.
 */
async function withMockFallback(apiCall, mockFn) {
  try {
    return await apiCall();
  } catch (err) {
    const isQuota = err instanceof QuotaExceededError;
    const isAuth =
      err instanceof ApiError && (err.status === 401 || err.status === 403);
    if (isQuota || isAuth) {
      enableRuntimeMocks(isQuota ? "quota" : "unauthorized");
      return mockFn();
    }
    throw err;
  }
}

/**
 * Zufällige Rezepte für die Startseite.
 */
export async function getRandomRecipes(
  { number = DEFAULT_RANDOM_NUMBER, tags } = {},
  options = {},
) {
  if (shouldUseMocks()) return mockRandomRecipes({ number, tags });
  return withMockFallback(
    async () => {
      const data = await apiGet(
        "/recipes/random",
        { number, tags: tags?.length ? tags.join(",") : undefined },
        options,
      );
      return data?.recipes ?? [];
    },
    () => mockRandomRecipes({ number, tags }),
  );
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
  return withMockFallback(
    async () => {
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
    },
    () => mockRecipeSearch({ query, cuisine, diet, number, offset }),
  );
}

/**
 * Detailinfos eines Rezepts (inkl. Nährwerte und Anleitung).
 */
export async function getRecipeById(id, options = {}) {
  if (shouldUseMocks()) return mockRecipeDetail(id);
  return withMockFallback(
    () =>
      apiGet(
        `/recipes/${encodeURIComponent(id)}/information`,
        { includeNutrition: true },
        options,
      ),
    () => mockRecipeDetail(id),
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
  return withMockFallback(
    async () => {
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
    },
    () => mockFindByIngredients({ ingredients, number }),
  );
}

/**
 * Ähnliche Rezepte auf der Detailseite.
 */
export async function getSimilarRecipes(id, { number = 4 } = {}, options = {}) {
  if (shouldUseMocks()) return mockSimilar(id, { number });
  return withMockFallback(
    async () => {
      const data = await apiGet(
        `/recipes/${encodeURIComponent(id)}/similar`,
        { number },
        options,
      );
      return Array.isArray(data) ? data : [];
    },
    () => mockSimilar(id, { number }),
  );
}

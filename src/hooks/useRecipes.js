import { useQuery } from "@tanstack/react-query";
import {
  findRecipesByIngredients,
  getRandomRecipes,
  getRecipeById,
  getSimilarRecipes,
  searchRecipes,
} from "../utils/api/recipes";

export const recipeKeys = {
  all: ["recipes"],
  random: (filters) => [...recipeKeys.all, "random", filters ?? {}],
  search: (filters) => [...recipeKeys.all, "search", filters ?? {}],
  detail: (id) => [...recipeKeys.all, "detail", id],
  similar: (id) => [...recipeKeys.all, "similar", id],
  byIngredients: (ingredients) => [
    ...recipeKeys.all,
    "by-ingredients",
    [...ingredients].sort().join(","),
  ],
};

export function useRandomRecipes({ number = 8, tags } = {}) {
  return useQuery({
    queryKey: recipeKeys.random({ number, tags }),
    queryFn: ({ signal }) => getRandomRecipes({ number, tags }, { signal }),
  });
}

export function useRecipeSearch(filters, { enabled = true } = {}) {
  return useQuery({
    queryKey: recipeKeys.search(filters),
    queryFn: ({ signal }) => searchRecipes(filters, { signal }),
    enabled,
    placeholderData: (previous) => previous,
  });
}

export function useRecipeDetail(id) {
  return useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: ({ signal }) => getRecipeById(id, { signal }),
    enabled: Number.isFinite(id) && id > 0,
  });
}

export function useSimilarRecipes(id, { number = 4 } = {}) {
  return useQuery({
    queryKey: recipeKeys.similar(id),
    queryFn: ({ signal }) => getSimilarRecipes(id, { number }, { signal }),
    enabled: Number.isFinite(id) && id > 0,
  });
}

export function useRecipesByIngredients(
  ingredients,
  { number = 12, ranking = 1, enabled = true } = {},
) {
  const list = Array.isArray(ingredients) ? ingredients.filter(Boolean) : [];
  return useQuery({
    queryKey: recipeKeys.byIngredients(list),
    queryFn: ({ signal }) =>
      findRecipesByIngredients(
        { ingredients: list, number, ranking },
        { signal },
      ),
    enabled: enabled && list.length > 0,
  });
}

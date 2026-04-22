import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import PageLoader from "./components/layout/PageLoader";
import { ROUTES } from "./utils/routes";

// Lazy-Loaded Pages → kleinere Initial-Bundles
const HomePage = lazy(() => import("./pages/HomePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const RecipeDetailPage = lazy(() => import("./pages/RecipeDetailPage"));
const CookModePage = lazy(() => import("./pages/CookModePage"));
const FridgePage = lazy(() => import("./pages/FridgePage"));
const WeekPlanPage = lazy(() => import("./pages/WeekPlanPage"));
const SurprisePage = lazy(() => import("./pages/SurprisePage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const ImprintPage = lazy(() => import("./pages/ImprintPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Koch-Modus: Vollbild ohne Header/Footer */}
        <Route path={ROUTES.cookMode()} element={<CookModePage />} />

        {/* Alle anderen Routen mit App-Shell */}
        <Route element={<Layout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.search} element={<SearchPage />} />
          <Route path={ROUTES.recipe()} element={<RecipeDetailPage />} />
          <Route path={ROUTES.fridge} element={<FridgePage />} />
          <Route path={ROUTES.weekPlan} element={<WeekPlanPage />} />
          <Route path={ROUTES.surprise} element={<SurprisePage />} />
          <Route path={ROUTES.favorites} element={<FavoritesPage />} />
          <Route path={ROUTES.imprint} element={<ImprintPage />} />
          <Route path={ROUTES.privacy} element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

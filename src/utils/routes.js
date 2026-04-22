/**
 * Zentrale Routen-Definition.
 * Single Source of Truth für Navigation + Header-Links.
 */
export const ROUTES = {
  home: "/",
  search: "/suche",
  fridge: "/kuehlschrank",
  weekPlan: "/wochenplan",
  surprise: "/ueberraschung",
  favorites: "/favoriten",
  recipe: (slugId = ":slugId") => `/rezept/${slugId}`,
  cookMode: (slugId = ":slugId") => `/rezept/${slugId}/kochen`,
  imprint: "/impressum",
  privacy: "/datenschutz",
};

/** Primär-Navigation (Header Desktop + Drawer) */
export const PRIMARY_NAV = [
  { label: "Entdecken", to: ROUTES.home },
  { label: "Suche", to: ROUTES.search },
  { label: "Kühlschrank", to: ROUTES.fridge },
  { label: "Wochenplan", to: ROUTES.weekPlan },
  { label: "Überraschung", to: ROUTES.surprise },
  { label: "Favoriten", to: ROUTES.favorites },
];

/** Footer-Legal-Links */
export const LEGAL_NAV = [
  { label: "Impressum", to: ROUTES.imprint },
  { label: "Datenschutz", to: ROUTES.privacy },
];

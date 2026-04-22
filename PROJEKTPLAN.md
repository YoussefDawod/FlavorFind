# FlavorFind — Projektplan

## 1. Projekt-Identität

| | |
|---|---|
| **Name** | FlavorFind |
| **Tagline** | *Cook like it matters.* |
| **Kurzbeschreibung** | Entdecke Rezepte cineastisch, koche mit geführtem Modus, plane deine Woche. |
| **Zielgruppe** | Hobby-Köch:innen, 25–45, designaffin, die Rezepte nicht nur lesen, sondern erleben wollen |
| **Sprache** | Deutsch (UI + eigene Texte) — Rezeptinhalte englisch (API-Original), klar gekennzeichnet |
| **Plattform** | Progressive Web App — Desktop + Mobile, installierbar, offline-fähig |

---

## 2. Design-DNA: *Dark Luxury meets Cozy Warmth*

### 2.1 Design-Philosophie

Kein weiteres sauberes weißes Minimal-Design. FlavorFind fühlt sich an wie das **gedimmte Licht über einem Esstisch bei Kerzenschein** — tiefe, warme Dunkelheit mit Terracotta-, Gold- und Creme-Akzenten. Rezeptbilder wirken cineastisch, fast wie Stillleben. Typografie mischt eine klassische Serif für Poesie und Sans-Serif für Struktur. Das ist ein Produkt, das man **anschauen will**, nicht nur benutzen.

### 2.2 Farbsystem (Light & Dark)

```css
/* Dark Mode ist die Default-Erfahrung — wo das Design glänzt */
:root, [data-theme="dark"] {
  /* Hintergründe — warm-tief statt kalt-schwarz */
  --color-bg:              #0F0A08;   /* Midnight Espresso */
  --color-surface:         #1A1311;   /* Roasted Cocoa */
  --color-surface-elevated:#251B18;   /* Toasted Walnut */
  --color-overlay:         rgba(15,10,8,0.72);

  /* Text */
  --color-text:            #F5EFE6;   /* Cream */
  --color-text-secondary:  #C7B8A8;   /* Warm Sand */
  --color-text-muted:      #8A7C6F;   /* Ashen Taupe */

  /* Akzente */
  --color-accent:          #D4A574;   /* Burnished Gold */
  --color-accent-hover:    #E4B885;
  --color-accent-soft:     rgba(212,165,116,0.12);
  --color-secondary:       #C2410C;   /* Terracotta */
  --color-secondary-soft:  rgba(194,65,12,0.15);

  /* Status */
  --color-success:         #84A98C;   /* Sage */
  --color-danger:          #BC4B51;   /* Brick */
  --color-warning:         #E4A76E;

  /* Borders */
  --color-border:          rgba(245,239,230,0.08);
  --color-border-strong:   rgba(245,239,230,0.16);
}

[data-theme="light"] {
  --color-bg:              #FAF5EC;   /* Candle Cream */
  --color-surface:          #FFFFFF;
  --color-surface-elevated:#F3ECDF;   /* Warm Paper */
  --color-overlay:         rgba(23,17,15,0.5);

  --color-text:            #1F1410;   /* Dark Espresso */
  --color-text-secondary:  #5A4A3F;
  --color-text-muted:      #8F7F70;

  --color-accent:          #B38550;   /* Deeper Gold on Light */
  --color-accent-hover:    #94683B;
  --color-accent-soft:     rgba(179,133,80,0.10);
  --color-secondary:       #A53A0A;
  --color-secondary-soft:  rgba(165,58,10,0.10);

  --color-success:         #5C7F66;
  --color-danger:          #A3383E;

  --color-border:          rgba(31,20,16,0.08);
  --color-border-strong:   rgba(31,20,16,0.18);
}
```

### 2.3 Typografie

**Doppel-Schrift-System** für den editorialen Charakter:

```css
--font-serif:  "Fraunces", "Playfair Display", Georgia, serif;   /* H1, Hero, Zitate */
--font-sans:   "Inter", system-ui, sans-serif;                    /* UI, Body */
--font-mono:   "JetBrains Mono", ui-monospace, monospace;         /* Timer, Zahlen */

--text-xs:     0.75rem;
--text-sm:     0.875rem;
--text-base:   1rem;
--text-lg:     1.125rem;
--text-xl:     1.25rem;
--text-2xl:    1.5rem;
--text-3xl:    1.875rem;
--text-display: clamp(2.5rem, 6vw + 1rem, 5.5rem);  /* Hero-Titel */

--tracking-tight: -0.025em;
--tracking-wide:  0.05em;
```

**Fraunces** (variable Google-Font) für Hero-Titel und Rezeptnamen — warm, optisch spannend, leicht retro. **Inter** für alles UI. **JetBrains Mono** für den Koch-Modus-Timer.

### 2.4 Spacing, Radii & Elevation

```css
/* 4px-Basis */
--space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem; --space-4: 1rem;
--space-5: 1.25rem; --space-6: 1.5rem; --space-8: 2rem; --space-10: 2.5rem;
--space-12: 3rem; --space-16: 4rem; --space-20: 5rem; --space-24: 6rem;

--radius-sm:   0.5rem;
--radius-md:   0.875rem;
--radius-lg:   1.25rem;
--radius-xl:   1.75rem;
--radius-2xl:  2.5rem;   /* Hero-Karten */
--radius-full: 9999px;

/* Warme Schatten statt kalter graue Schatten */
--shadow-sm:    0 1px 2px rgba(15,10,8,0.3);
--shadow-md:    0 4px 12px rgba(15,10,8,0.4), 0 2px 4px rgba(15,10,8,0.25);
--shadow-lg:    0 16px 40px rgba(15,10,8,0.5), 0 6px 12px rgba(15,10,8,0.3);
--shadow-glow:  0 0 32px rgba(212,165,116,0.25);
--shadow-inset: inset 0 1px 0 rgba(245,239,230,0.04);
```

### 2.5 Visuelle Besonderheiten

| Element | Umsetzung |
|---|---|
| **Film-Grain-Overlay** | Feine SVG-Noise-Textur `fixed` über dem Hintergrund, `opacity: 0.03` — bricht die digitale Flächigkeit |
| **Warmer Gradient-Glow** | Hinter dem Hero ein `radial-gradient` aus Terracotta zu transparent |
| **Gold-Kontur** | CTA-Buttons haben eine 1px-Gold-Kontur + Soft-Glow bei Hover |
| **Cineastische Bilder** | Alle Rezeptbilder mit `aspect-ratio: 4/5` (Portrait) oder `16/9` (Hero) + Vignetten-Overlay |
| **Emoji-Verbot** | Nur Lucide-Icons (stilisiert, konsistent) — keine Emojis für Kategorien |
| **Smooth Scroll** | `scroll-behavior: smooth` + CSS Scroll-Snap für Kategorie-Leisten |
| **Theme Color** | `meta theme-color` passt sich dem Theme an (für iOS Safari & Android) |

### 2.6 Mobile-First-Prinzipien

- Alle Layouts starten bei 360px und wachsen nach oben
- Tap-Targets mindestens 44×44px
- Horizontales Scrollen für Kategorien & ähnliche Rezepte (native Mobile-Paradigmen)
- Bottom-Sheet-Pattern für Filter auf Mobile (statt Dropdown)
- Floating Action Button (FAB) für "Kühlschrank-Modus" auf Mobile
- Swipe-Gesten auf Favoriten-Karten (swipe-to-remove)
- `@media (hover: hover)` — Hover-Effekte nur auf Geräten mit echtem Zeiger

---

## 3. API: Spoonacular

### 3.1 Key Facts

| Eigenschaft | Detail |
|---|---|
| URL | `https://api.spoonacular.com` |
| Kosten | Kostenlos — 150 Punkte/Tag (1 Point ≈ 1 simple Request) |
| Auth | API-Key als Query-Parameter |
| ENV-Variable | `VITE_SPOONACULAR_KEY` |

### 3.2 Genutzte Endpoints

| Endpoint | Zweck | Kosten |
|---|---|---|
| `GET /recipes/complexSearch` | Suchseite mit Filtern (Küche, Diät, Intoleranzen, Zeit, Kalorien) | 1 |
| `GET /recipes/{id}/information` | Detailseite mit Nährwerten, Schritten, Zutaten | 1 |
| `GET /recipes/random` | Startseite: 6–12 zufällige Rezepte | 1 |
| `GET /recipes/findByIngredients` | **Kühlschrank-Modus** — Rezepte aus vorhandenen Zutaten | 1 |
| `GET /recipes/autocomplete` | Suchvorschläge beim Tippen (Debounced) | 1 |
| `GET /recipes/{id}/similar` | Ähnliche Rezepte auf Detailseite | 1 |

### 3.3 Request-Sparen-Strategie

Weil nur 150/Tag:

- **TanStack Query** cached aggressive: `staleTime: 15 Minuten`, `gcTime: 1 Stunde`
- **Random-Rezepte** werden auf Startseite nur alle 6 Stunden neu geholt (per `localStorage`-Timestamp)
- **Autocomplete** erst ab 3 Zeichen + 400ms Debounce
- **LocalStorage-Cache** für Detail-Antworten (24h) — reduziert wiederholte Aufrufe bei Navigation
- **Dev/Demo-Fallback**: Statische Mock-Daten in `src/mocks/` (wird in der Demo-Version verwendet wenn Limit erreicht)

### 3.4 API-Client-Architektur

```
utils/api/
  client.js          ← fetch-Wrapper mit Error-Handling, Timeout, Key-Injection
  recipes.js         ← Alle Rezept-Funktionen (searchRecipes, getRecipeById, …)
  errors.js          ← Eigene Error-Klassen (ApiError, QuotaExceededError, NetworkError)
```

Graceful Degradation: Wenn Quota erreicht → freundliche UI-Meldung + Fallback auf Cache.

---

## 4. Feature-Set

### 4.1 Kernseiten

| Route | Seite | Beschreibung |
|---|---|---|
| `/` | **Entdecken** | Hero + Kategorien + kuratierte Rezepte + Feature-Highlights |
| `/suche` | **Suche** | Komplexe Filter + Ergebnisraster (Filter in URL → shareable) |
| `/rezept/:slug-id` | **Rezeptdetail** | Cineastisches Hero + Zutaten + Schritte + Nährwerte + Ähnliche |
| `/rezept/:slug-id/kochen` | **Koch-Modus** | Vollbild, Schritt-für-Schritt, Timer, Wake-Lock |
| `/kuehlschrank` | **Kühlschrank-Modus** | Zutaten eingeben → passende Rezepte finden |
| `/wochenplan` | **Wochenplan** | 7 Tage × 3 Mahlzeiten-Grid, Drag & Drop, Einkaufsliste generieren |
| `/ueberraschung` | **Zufalls-Inspiration** | Einzel-Rezept-Slot mit Wheel-of-Fortune-Animation |
| `/favoriten` | **Favoriten** | Gespeicherte Rezepte (localStorage) |
| `/impressum` | **Impressum** | §5 TMG |
| `/datenschutz` | **Datenschutz** | DSGVO Art. 13 |
| `*` | **404** | Kreative Leerseite mit CTA |

### 4.2 Die 6 Unique-Features im Detail

#### a) Kühlschrank-Modus (`/kuehlschrank`)

Das Signature-Feature. "Was habe ich da — was kann ich kochen?"

- **Input**: Zutaten-Chips — Nutzer tippt "Tomaten, Mozzarella, Basilikum" → jeder Eintrag wird Chip
- **Autocomplete** für Zutaten (Spoonacular `/food/ingredients/autocomplete` — optional)
- **"Strict Mode"-Toggle**: Nur Rezepte anzeigen, die genau diese Zutaten brauchen (wenig Missing Ingredients)
- **Ergebnis-Karten** zeigen "3 von 4 Zutaten hast du" + welche fehlen
- **Leerer Zustand**: Illustrierte Empty-State mit Beispiel-Zutaten-Presets ("🥚 Frühstück-Basics", "🍅 Italienisch-Basics")

#### b) Portionsrechner (Detailseite)

Jedes Rezept zeigt "Für 4 Personen". Nutzer ändert auf 2 oder 6 → alle Zutatenmengen rechnen sich **live** um, animiert.

- Stepper-Komponente (−/+) direkt über der Zutatenliste
- Zahl rollt beim Ändern (Framer Motion `number interpolation`)
- `Math.round(menge * (neu / original) * 10) / 10` für saubere Zahlen

#### c) Koch-Modus mit Timer (`/rezept/:id/kochen`)

Vollbild-Experience wenn Nutzer "Jetzt kochen" klickt.

- **Swipe/Pfeil** zwischen Schritten (keine Scroll-Distraktion)
- **Schritt-Anzeige** gross (Schritt 3 von 8)
- **Timer-Integration**: Wenn Text "Für 20 Minuten köcheln lassen" enthält → Button "⏲ 20 Min starten" erscheint daneben, startet Overlay-Timer
- **Wake Lock API** (`navigator.wakeLock.request('screen')`) — Bildschirm bleibt an
- **Zutaten-Referenz**: Swipe nach unten zeigt Zutatenliste als Bottom-Sheet
- **Audio-Ping** am Timer-Ende (generierter Ton via Web Audio API)
- **"Fertig!"-Screen** mit Konfetti-Animation am Ende

#### d) Filter-Permalinks

Jede Filter-Kombination ergibt eine teilbare URL:

```
/suche?q=pasta&cuisine=italian&diet=vegetarian&maxReadyTime=30
```

- Nutzer stellt Filter ein → URL aktualisiert sich (via `useSearchParams`)
- Teilen per Copy-Button oder Web Share API
- Beim Laden der URL → Filter werden rekonstruiert

#### e) Wochenplan (`/wochenplan`)

Rezepte auf Wochentage × Mahlzeitenart zuweisen.

- **Grid**: 7 Tage × 3 Mahlzeiten (Frühstück, Mittag, Abend)
- **Drag & Drop** via `@dnd-kit/core` — Rezept aus Favoriten in Slot ziehen
- **Alternativ**: Slot klicken → Modal mit Favoriten-Auswahl
- **Einkaufsliste generieren**: Button "🛒 Einkaufsliste" → aggregiert alle Zutaten der Woche, entfernt Duplikate, zeigt Summe pro Zutat, Copy/PDF-Export
- **Persistenz** in localStorage
- **Wochen-Navigation**: Pfeile für KW+1, KW-1

#### f) Zufalls-Inspiration (`/ueberraschung`)

Spielerische Entdeckungsseite.

- **Slot-Machine-Animation**: Bei Klick rotieren 3 Rezeptbilder wie an einer Slotmaschine, stoppen nacheinander, eines bleibt stehen
- **"Nochmal"-Button**: Erneutes Rollen
- **"Das ist perfekt!"-Button**: Öffnet Detailseite des gezogenen Rezepts
- **Fun-Detail**: Zufällige Koch-Zitate werden im Loading-Zustand angezeigt

### 4.3 Übergreifende Features

| Feature | Detail |
|---|---|
| **Dark/Light Mode** | Dark = Default, System-Präferenz respektiert, manueller Toggle persistent |
| **Theme-Transition** | Smoother Wechsel (0.4s CSS-Transition auf Body) — nicht ruckartig |
| **Favoriten** | localStorage via Context, Herz-Animation beim Toggle |
| **Teilen** | Web Share API (Mobile) / Clipboard-Copy (Desktop) + Toast-Notification |
| **Page Transitions** | Framer Motion AnimatePresence zwischen Routen |
| **Skeleton Loading** | Cineastische Shimmer-Effekte, keine kalten grauen Boxen |
| **Optimistic UI** | Favorit-Toggle sofort sichtbar, kein Spinner |
| **Error Boundary** | Gestaltetes Fehler-UI statt weisser Screen |
| **Offline-Modus** | PWA cached besuchte Rezepte, zeigt Offline-Banner |
| **Install-Prompt** | Custom Install-Banner (nicht das hässliche Browser-Default) |
| **Scroll-to-Top** | Floating Button nach 400px Scroll |
| **Toast-System** | Eigene Toasts für "Favorit gespeichert", "Link kopiert", "Offline" |

---

## 5. Tech-Stack

| Kategorie | Entscheidung | Begründung |
|---|---|---|
| Framework | **React 19** | Neueste Version, Suspense/Transitions nativ |
| Build Tool | **Vite 6** | Bereits da, schnellster Dev-Server |
| Styling | **Tailwind CSS v4** | `@theme`-Block für Design-Tokens, CSS-native Config, keine `tailwind.config.js` |
| Variants | **CVA** (`class-variance-authority`) | Saubere Button/Badge/Card-Varianten |
| Utilities | **tailwind-merge + clsx** | Konfliktfreie Class-Kombination |
| Routing | **React Router v7** | Data API, `useSearchParams` für Filter-Permalinks |
| Server-State | **TanStack Query v5** | Caching, Retry, Stale-While-Revalidate |
| Client-State | **Context + useReducer** | Theme, Favoriten, Toast, Wochenplan |
| Animation | **Framer Motion 11** | Page-Transitions, Micro-Interactions, Number-Interpolation |
| Icons | **Lucide React** | Modern, tree-shakable, konsistent |
| Drag & Drop | **@dnd-kit/core** | Wochenplan-Feature, accessible |
| SEO | **React Helmet Async** | Dynamische Meta-Tags |
| PWA | **vite-plugin-pwa** | Service Worker, Manifest, Offline |
| HTTP | **Native `fetch`** | Kein Axios — reduziert Bundle |
| Lint | **ESLint 9 (Flat)** | Bereits da |
| Format | **Prettier** | Konsistenz, keine Lint-Streits |
| Tests | **Vitest + RTL + jsdom** | Utils, Hooks, Kernkomponenten |
| CI | **GitHub Actions** | Lint + Test + Build auf jedem Push |
| Deploy | **Render** (Static, Frankfurt) | DSGVO-konform, Security-Header via `render.yaml` |

---

## 6. Projektstruktur

### 6.1 Komponenten-Pattern

Jede Komponente hat **einen eigenen Ordner** mit Barrel-Export:

```
ComponentName/
  ComponentName.jsx
  index.js            ← export { default } from "./ComponentName";
```

Stylesheets nicht separat — Tailwind-Klassen inline. Bei komplexen Komponenten optional eine `variants.js` mit CVA-Definitionen.

### 6.2 Kompletter Baum

```
src/
  assets/
    logo.svg
    grain.svg                      ← Film-Grain-Overlay
    empty-fridge.svg
    empty-favorites.svg
  components/
    layout/
      Header/
      Footer/
      Layout/                      ← Outlet-Wrapper mit Header + Footer
      MobileNav/                   ← Hamburger + Drawer
      ScrollToTop/
    ui/
      Button/                      ← CVA-Variants
      IconButton/
      Card/
      Badge/
      Chip/
      Input/
      SearchInput/                 ← Input + Autocomplete-Dropdown
      Stepper/                     ← Portionsrechner
      Toggle/
      Toast/
      Modal/
      BottomSheet/                 ← Mobile-Filter
      Skeleton/
      EmptyState/
      Spinner/
      ThemeToggle/
      GrainOverlay/                ← Fixed Film-Grain
    recipe/
      RecipeCard/
      RecipeCardCompact/
      RecipeGrid/
      RecipeHero/
      IngredientList/
      NutritionPanel/
      InstructionSteps/
      SimilarRecipes/
      FilterBar/
      FilterSheet/                 ← Mobile-Variante
      FavoriteButton/
      ShareButton/
    cook/
      CookMode/                    ← Vollbild-Koch-Experience
      StepNavigator/
      CookTimer/
      WakeLockIndicator/
      FinishScreen/
    fridge/
      IngredientInput/
      IngredientChip/
      FridgeResults/
    plan/
      WeekGrid/
      MealSlot/
      ShoppingList/
      WeekNavigator/
    surprise/
      SlotMachine/
      RollButton/
  context/
    ThemeContext.jsx
    FavoritesContext.jsx
    ToastContext.jsx
    MealPlanContext.jsx
  hooks/
    useRecipes.js                  ← TanStack Query Hooks
    useDebounce.js
    useLocalStorage.js
    useMediaQuery.js
    useWakeLock.js
    useDocumentTitle.js
    useShare.js
    useCountdown.js                ← Koch-Timer
    useScrollPosition.js
  utils/
    api/
      client.js
      recipes.js
      errors.js
    constants.js                   ← CUISINES, DIETS, MEALS, API_BASE
    formatters.js                  ← Zeit, Mengen, Slugs
    storage.js                     ← localStorage-Abstraktion mit try/catch
    classNames.js                  ← cn = tailwind-merge + clsx
    slug.js                        ← Slug-Generation für URLs
  pages/
    HomePage/
    SearchPage/
    RecipeDetailPage/
    CookModePage/
    FridgePage/
    WeekPlanPage/
    SurprisePage/
    FavoritesPage/
    ImpressumPage/
    DatenschutzPage/
    NotFoundPage/
  mocks/
    recipes.json                   ← Demo-Fallback-Daten
  styles/
    tailwind.css                   ← @import "tailwindcss" + @theme-Block
  test/
    setup.js
  App.jsx                          ← Router + Provider-Kette
  main.jsx                         ← Entry Point
```

### 6.3 `tailwind.css` — der Herzschlag des Design-Systems

```css
@import "tailwindcss";

@theme {
  /* Tokens hier werden zu Tailwind-Utilities:
     bg-bg, text-accent, border-border-strong, etc. */

  --color-bg: #0F0A08;
  --color-surface: #1A1311;
  --color-surface-elevated: #251B18;
  --color-text: #F5EFE6;
  --color-text-secondary: #C7B8A8;
  --color-text-muted: #8A7C6F;
  --color-accent: #D4A574;
  --color-accent-hover: #E4B885;
  --color-secondary: #C2410C;
  --color-success: #84A98C;
  --color-danger: #BC4B51;
  --color-border: rgb(245 239 230 / 0.08);
  --color-border-strong: rgb(245 239 230 / 0.16);

  --font-serif: "Fraunces", Georgia, serif;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --text-display: clamp(2.5rem, 6vw + 1rem, 5.5rem);

  --radius-2xl: 2.5rem;

  --shadow-glow: 0 0 32px rgb(212 165 116 / 0.25);
  --shadow-warm: 0 16px 40px rgb(15 10 8 / 0.5);
}

/* Theme-Override per data-attribute */
[data-theme="light"] {
  --color-bg: #FAF5EC;
  --color-surface: #FFFFFF;
  /* … */
}

/* Globale Basis */
@layer base {
  html { scroll-behavior: smooth; }
  body {
    font-family: var(--font-sans);
    color: var(--color-text);
    background: var(--color-bg);
    transition: background-color 0.4s ease, color 0.4s ease;
  }
  h1, h2, h3 { font-family: var(--font-serif); letter-spacing: -0.02em; }
  ::selection { background: var(--color-accent); color: var(--color-bg); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. State- & Provider-Architektur

### 7.1 Provider-Kette (Reihenfolge)

```jsx
// main.jsx
<ThemeProvider>
  <QueryClientProvider client={queryClient}>
    <FavoritesProvider>
      <MealPlanProvider>
        <ToastProvider>
          <BrowserRouter>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </BrowserRouter>
        </ToastProvider>
      </MealPlanProvider>
    </FavoritesProvider>
  </QueryClientProvider>
</ThemeProvider>
```

### 7.2 Context-Regel

Jeder Context exportiert **Provider + custom Hook**. Custom Hook wirft Fehler ausserhalb Provider:

```jsx
export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
```

### 7.3 Server-State (TanStack Query)

Default-Config:

```js
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15 * 60 * 1000,   // 15min
      gcTime: 60 * 60 * 1000,      // 1h
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

---

## 8. Routing

```jsx
const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/suche", element: <SearchPage /> },
  { path: "/rezept/:slugId", element: <RecipeDetailPage /> },
  { path: "/rezept/:slugId/kochen", element: <CookModePage />, noLayout: true },
  { path: "/kuehlschrank", element: <FridgePage /> },
  { path: "/wochenplan", element: <WeekPlanPage /> },
  { path: "/ueberraschung", element: <SurprisePage /> },
  { path: "/favoriten", element: <FavoritesPage /> },
  { path: "/impressum", element: <ImpressumPage /> },
  { path: "/datenschutz", element: <DatenschutzPage /> },
  { path: "*", element: <NotFoundPage /> },
];
```

- Alle Pages per `React.lazy()` + `<Suspense fallback={<PageLoader />}>`
- **Koch-Modus** nutzt `noLayout` → kein Header/Footer (Vollbild)
- Page-Transitions via `AnimatePresence` mit `key={location.pathname}`
- Slug-URLs: `/rezept/spaghetti-carbonara-12345` — SEO + lesbar

---

## 9. Animationen (Choreografie)

| Element | Animation | Tool |
|---|---|---|
| Seitenwechsel | Fade + leichtes y-Slide (0.35s) | Framer Motion AnimatePresence |
| Hero-Titel | Gradient-Text + Schimmer beim Mount | Tailwind `animate-shimmer` (custom) |
| Karten-Grid | Staggered Fade-Up (60ms zwischen Karten) | Framer Motion `staggerChildren` |
| Karten-Hover | Scale 1.03 + Gold-Glow + Bild-Zoom 1.08 | Tailwind group-hover |
| Favorit-Toggle | Herz pulsiert + Konfetti-Burst | Framer Motion `scale: [1, 1.4, 1]` + Partikel |
| Portionsrechner | Zahlen rollen beim Ändern | Framer Motion `animate` mit value-interpolation |
| Filter-Chip Aktiv | Gold-Fill + leichtes Bounce | CSS transition |
| Slot-Machine | 3-Walzen-Rotation mit Easing | Framer Motion keyframes |
| Koch-Timer-Ring | SVG-`stroke-dashoffset` Countdown | CSS / direkter Wert |
| Finish-Screen | Konfetti + Skalier-Titel | Framer Motion + Canvas |
| Scroll-to-Top | Fade-in + leichter Bounce | Framer Motion |
| Toast | Slide-in von oben + auto-dismiss | Framer Motion AnimatePresence |
| Film-Grain | Subtile Rauschen-Bewegung (8s loop) | CSS animation |
| Theme-Switch | Farben crossfaden (0.4s) | CSS transition on body |
| Skeleton-Shimmer | Gradient-Sweep links→rechts | Tailwind `animate-shimmer` |

**Grundsatz**: `prefers-reduced-motion` schaltet alles ab. Keine Animation dauert länger als 0.5s (ausser Slot-Machine). Easings: `cubic-bezier(0.16, 1, 0.3, 1)` (out-expo) für Seitenwechsel, `cubic-bezier(0.34, 1.56, 0.64, 1)` (back) für Hover.

---

## 10. SEO & Social

### 10.1 `index.html` Meta-Tags

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="description" content="FlavorFind — Entdecke Rezepte cineastisch, koche mit geführtem Modus, plane deine Woche." />
<meta name="theme-color" content="#0F0A08" media="(prefers-color-scheme: dark)" />
<meta name="theme-color" content="#FAF5EC" media="(prefers-color-scheme: light)" />
<meta name="color-scheme" content="dark light" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="FlavorFind" />
<meta property="og:title" content="FlavorFind — Cook like it matters." />
<meta property="og:description" content="…" />
<meta property="og:image" content="/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://flavorfind.onrender.com" />
<meta property="og:locale" content="de_DE" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="FlavorFind — Cook like it matters." />
<meta name="twitter:description" content="…" />
<meta name="twitter:image" content="/og-image.jpg" />

<!-- Icons -->
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
<link rel="manifest" href="/manifest.webmanifest" />

<!-- Fonts (Preconnect + Swap) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet" />

<title>FlavorFind — Cook like it matters.</title>
```

### 10.2 Dynamische Titel pro Seite

| Seite | `<title>` |
|---|---|
| Home | FlavorFind — Cook like it matters. |
| Suche | Suche: {query} — FlavorFind |
| Detail | {Rezeptname} — FlavorFind |
| Koch-Modus | Kochen: {Rezeptname} — FlavorFind |
| Kühlschrank | Was kann ich kochen? — FlavorFind |
| Wochenplan | Wochenplan — FlavorFind |
| Überraschung | Zufalls-Rezept — FlavorFind |
| Favoriten | Deine Favoriten — FlavorFind |

### 10.3 Strukturierte Daten

Detailseite bekommt **JSON-LD** `Recipe`-Schema (Google Rich Results):

```js
{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": "Spaghetti Carbonara",
  "image": "…",
  "recipeIngredient": ["…"],
  "recipeInstructions": [{ "@type": "HowToStep", "text": "…" }],
  "totalTime": "PT30M",
  "nutrition": { "@type": "NutritionInformation", "calories": "620 kcal" }
}
```

### 10.4 `robots.txt` + `sitemap.xml`

Beide in `public/`, sitemap mit den Haupt-Routen.

---

## 11. Accessibility

| Anforderung | Umsetzung |
|---|---|
| Semantik | `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>` |
| Skip-Link | "Zum Inhalt springen", erscheint bei Tab-Focus |
| ARIA | `aria-label`, `aria-live` für Toasts, `aria-expanded` für Drawer |
| Focus | `:focus-visible` mit 2px Gold-Ring, **nie** `outline: none` ohne Ersatz |
| Kontrast | WCAG AA minimum, AAA wo möglich — getestet mit axe DevTools |
| Tastatur | Alle Features ohne Maus bedienbar, Enter/Space funktionieren |
| Formular | `<label htmlFor>` + `id`, `name`, `autoComplete` |
| Bilder | Alle mit `alt` — bei dekorativ `alt=""` + `aria-hidden` |
| Modal/Sheet | Fokusfalle (Focus-Trap), `Escape` schliesst, Body scroll-lock |
| Reduced-Motion | CSS-Override + JS-Fallback für Framer Motion |
| `.sr-only` | Helper-Klasse für Screen-Reader-Only-Text |

---

## 12. Performance

| Maßnahme | Detail |
|---|---|
| Code-Splitting | `React.lazy()` für alle Pages + heavy Komponenten (SlotMachine, WeekGrid) |
| manualChunks | `react`, `router`, `query`, `motion`, `dnd-kit` jeweils eigene Chunks |
| Images | `loading="lazy"`, `decoding="async"`, `aspect-ratio` gegen CLS |
| Query-Caching | staleTime 15min, localStorage-Mirror für Details (24h) |
| Debouncing | 400ms auf Autocomplete, 300ms auf Suche |
| Font-Loading | `display: swap`, Preconnect, nur 3 benötigte Weights |
| Icon-Tree-Shaking | Lucide — nur `import { Heart } from "lucide-react"` |
| CSS | Tailwind purge automatisch, kein ungenutztes CSS |
| Prefetch | On hover über Rezeptkarte → `queryClient.prefetchQuery` für Detail |
| Service Worker | Pre-Cache App-Shell, Runtime-Cache für API (NetworkFirst) |

**Ziel**: Lighthouse ≥ 95 (Performance, Accessibility, Best Practices, SEO), PWA-Score 100.

---

## 13. PWA

### Manifest

```json
{
  "name": "FlavorFind — Cook like it matters.",
  "short_name": "FlavorFind",
  "description": "Entdecke Rezepte, plane deine Woche, koche mit geführtem Modus.",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "theme_color": "#0F0A08",
  "background_color": "#0F0A08",
  "categories": ["food", "lifestyle", "utilities"],
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "shortcuts": [
    { "name": "Kühlschrank-Modus", "url": "/kuehlschrank", "icons": [{ "src": "/icons/fridge-96.png", "sizes": "96x96" }] },
    { "name": "Überraschung", "url": "/ueberraschung", "icons": [{ "src": "/icons/dice-96.png", "sizes": "96x96" }] }
  ]
}
```

### Caching-Strategie (Workbox)

| Asset-Typ | Strategie | Dauer |
|---|---|---|
| App-Shell (JS/CSS/HTML) | Precache | always |
| Google Fonts | CacheFirst | 1 Jahr |
| Bilder | CacheFirst | 30 Tage |
| API-Calls | NetworkFirst | 15 Min Fallback |

`registerType: "autoUpdate"` + Update-Toast: "Neue Version verfügbar" wenn relevant.

---

## 14. Tests (Vitest)

### Separate `vitest.config.js` (wegen PWA-Konflikt)

Fokus:

| Kategorie | Beispiele |
|---|---|
| **Utils** | `formatters.test.js`, `slug.test.js`, `storage.test.js` |
| **Hooks** | `useDebounce`, `useLocalStorage`, `useCountdown`, `useFavorites` |
| **UI-Komponenten** | `Button`, `Badge`, `Stepper`, `Chip` — Rendering, Varianten, Events |
| **Smoke-Tests** | Jede Page rendert ohne Crash (mock Provider) |

**Ziel**: ≥ 40 Tests, alle Kernlogik abgedeckt. Coverage ≥ 70% auf Utils/Hooks.

---

## 15. CI/CD

### `.github/workflows/ci.yml`

```
install → lint → format-check → test → build
```

Alle Steps müssen grün sein. Prettier-Check blockiert Merges.

### Deploy (Render — `render.yaml`)

- Region: **Frankfurt**
- Static Site aus `dist/`
- SPA-Rewrite: `/* → /index.html`
- Security-Header: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy`
- Cache-Control: `assets/*` immutable, `sw.js` no-cache, `index.html` no-cache
- Pull-Request-Previews aktiviert
- Custom Domain-ready (CNAME)

---

## 16. Coding-Regeln (konzentriert)

1. **Keine Magic Numbers** — alles in `utils/constants.js`
2. **Keine Inline-Styles** — alles über Tailwind oder CSS Variables
3. **Keine hardcodierten Farben** — nur Tailwind-Tokens (`bg-accent` statt `bg-[#D4A574]`)
4. **Kein `console.log`** im finalen Code
5. **`useEffect` immer mit Cleanup** bei Event-Listeners, Timeouts, Observers
6. **Komponente > 100 Zeilen → aufteilen**
7. **Business-Logic in Hooks**, nie in JSX
8. **Externe Links**: `target="_blank" rel="noopener noreferrer"`
9. **Keine `dangerouslySetInnerHTML`** mit ungefilterten API-Daten
10. **Named Exports** für Utilities, Default für Komponenten
11. **Imports sortiert**: React → extern → Context → Komponenten → Utils → Types → Styles

### Namenskonventionen

| Was | Konvention |
|---|---|
| Komponenten | PascalCase (`RecipeCard`) |
| Hooks | `use` + camelCase (`useRecipes`) |
| Context | PascalCase + `Context` / `Provider` |
| Konstanten | UPPER_SNAKE_CASE |
| Event-Handler | `handle` + Aktion |
| Boolean Props | `is…` / `has…` / `can…` |

---

## 17. DSGVO / Legal

- **Impressum** — `/impressum` mit allen Pflichtangaben (§5 TMG)
- **Datenschutzerklärung** — `/datenschutz`: Google Fonts (extern), Spoonacular API (extern, kein PII gesendet), localStorage (Favoriten, Theme, Wochenplan — **keine Cookies nötig**, kein Consent-Banner)
- **Keine Tracker** — keine Analytics, kein Facebook-Pixel
- **Externe Links** alle mit `rel="noopener noreferrer"`
- **CSP Header** in `render.yaml`

---

## 18. Umsetzungsphasen

| Phase | Inhalt | Abnahme-Kriterium |
|---|---|---|
| **0** | Cleanup (alte Dateien löschen), Dependencies installieren, Ordnerstruktur, `tailwind.css` mit `@theme`, `index.html` mit Meta-Tags, Fonts, Basis-Provider | `npm run dev` startet mit Dark-Theme, Fraunces-Font sichtbar |
| **1** | Layout (Header, Footer, Mobile-Drawer), Theme-Toggle, Routing, AnimatePresence, `GrainOverlay` | Alle Routen navigierbar, Theme-Switch smooth, Grain sichtbar |
| **2** | API-Client (`utils/api/*`), Query-Hooks, Storage-Utility, Fehler-UI, Mock-Fallback | Demo-Recipes auf `/` laden, Errors werden gefangen |
| **3** | UI-Primitives (Button, Card, Badge, Chip, Input, Stepper, Toggle, Skeleton, Toast, Modal, BottomSheet, EmptyState) mit CVA | Alle Komponenten rendern, CVA-Variants funktionieren |
| **4** | Home + Search + Detail — Kernfluss | Suchen → Detail öffnen → Favorit hinzufügen |
| **5** | Kühlschrank-Modus + Portionsrechner + Filter-Permalinks | URL-Filter teilbar, Portionen rechnen live um |
| **6** | Koch-Modus (Steps, Timer, Wake-Lock) + Zufalls-Inspiration (SlotMachine) | Koch-Flow end-to-end, Timer piept korrekt |
| **7** | Wochenplan + Einkaufsliste (dnd-kit) | Drag & Drop funktioniert auf Mobile + Desktop |
| **8** | Favoriten-Seite, Impressum, Datenschutz, 404 | Rechtliche Seiten komplett, Favoriten swipe-to-remove |
| **9** | PWA (Manifest, Icons, Workbox), Install-Banner, Offline-Test | Lighthouse PWA 100, Offline-Modus zeigt Cache-Banner |
| **10** | Tests (Vitest-Setup, Utils/Hooks/UI-Tests), CI-Workflow | `npm test` ≥ 40 Tests grün, GitHub Actions grün |
| **11** | Polish: Skeleton-States überall, Error-Boundary, Accessibility-Audit (axe), Reduced-Motion-Check, Performance-Audit, OG-Image erstellen | Lighthouse 95+ in allen Kategorien |
| **12** | Deployment: `render.yaml`, Security-Header, Custom Domain optional, README, Screenshots | Live-URL funktioniert, Smoke-Test-Checkliste grün |

Nach jeder Phase: **Git commit** mit klarer Message. Lint + Build immer grün vor nächster Phase.

---

## 19. Smoke-Test-Checkliste (vor Release)

- [ ] Alle Routen laden direkt per URL (keine 404 bei Refresh)
- [ ] Theme-Toggle persistiert über Reload
- [ ] Favorit hinzufügen/entfernen in localStorage sichtbar
- [ ] Suche mit Filter → URL teilbar → URL öffnen reproduziert Filter
- [ ] Portionsrechner ändert alle Zutaten live
- [ ] Koch-Modus: Wake-Lock aktiv (Screen bleibt an), Timer piept
- [ ] Kühlschrank-Modus zeigt "X von Y Zutaten hast du"
- [ ] Wochenplan Drag & Drop funktioniert auf Touch-Screen
- [ ] SlotMachine rollt smooth, endet auf gültigem Rezept
- [ ] Offline: Zuvor besuchtes Rezept lädt aus Cache
- [ ] PWA-Install-Prompt funktioniert
- [ ] Lighthouse ≥ 95 in allen Kategorien
- [ ] axe DevTools: 0 schwere Accessibility-Verstösse
- [ ] `prefers-reduced-motion` deaktiviert Animationen
- [ ] Screen-Reader-Test: Navigation + Suche + Favorit bedienbar
- [ ] OG-Card rendert korrekt (metatags.io oder opengraph.xyz)
- [ ] Security-Header via securityheaders.com: A oder A+

---

## 20. Was dieses Projekt beweist

Für Recruiter und Agenturen sichtbar:

- **Design-Kompetenz** — Eigenständige Design-DNA, nicht Bootstrap-Look
- **Architektur-Reife** — Saubere Provider-Kette, Server/Client-State-Trennung
- **Tailwind-Mastery** — `@theme`-Tokens, CVA, Custom-Utilities
- **State-Management-Tiefe** — TanStack Query + Context + useReducer sinnvoll kombiniert
- **API-Verständnis** — Quota-Management, Caching-Strategien, Graceful Degradation
- **Moderne Web-APIs** — Wake-Lock, Web-Share, Service Worker, localStorage, History API
- **Real-World-Features** — Drag & Drop, Countdown-Timer, Slot-Machine, Portionsrechner
- **Accessibility-Ernstnahme** — WCAG AA, Focus-Management, `prefers-reduced-motion`
- **Performance-Denken** — Code-Splitting, Prefetching, Image-Optimization, CLS-Vermeidung
- **Production-Readiness** — CI, Security-Header, DSGVO, PWA, Error-Boundaries
- **Polish & Detail-Liebe** — Film-Grain, warme Schatten, Zahl-Rollungen, Konfetti-Finish

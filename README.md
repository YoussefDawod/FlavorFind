# FlavorFind 🍽️

> **Cook like it matters.**
> Entdecke Rezepte cineastisch, koche mit geführtem Modus, plane deine Woche.

FlavorFind ist eine installierbare, offline-fähige Progressive Web App für Hobby-Köchinnen und -Köche. Warm-dunkles *Dark Luxury*-Design mit Gold- und Terracotta-Akzenten, Spoonacular-API für über 5 000 Rezepte, Wake-Lock im Koch-Modus, Drag-&-Drop-Wochenplan und persistente Favoriten.

![FlavorFind](public/og-image.jpg)

---

## ✨ Features

| Bereich | Was du bekommst |
|---|---|
| 🏠 **Entdecken** | Kuratierte Random-Rezepte, Hero-Stage mit Ambient-Glow, Quick-Filter-Chips |
| 🔎 **Suche** | Volltextsuche über Spoonacular + teilbare Filter-Permalinks in der URL |
| 🧊 **Kühlschrank** | „Was kann ich mit diesen Zutaten kochen?" inkl. *X von Y*-Abdeckung |
| 📅 **Wochenplan** | 7 × 3 Matrix mit @dnd-kit Drag & Drop, automatisch generierte Einkaufsliste |
| 🎰 **Überraschung** | Slot-Machine-Animation für zufällige Inspiration |
| ❤️ **Favoriten** | Persistiert in `localStorage`, Swipe-to-Remove auf Mobile |
| 👨‍🍳 **Koch-Modus** | Vollbild, Step-by-Step, Timer mit Sound, Wake-Lock hält das Display an |
| 🌗 **Theme** | OLED True Black Dark-Mode + warmer Light-Mode, persistent |
| 📲 **PWA** | Installierbar, Offline-fähig, Update-Prompt, Workbox-Cache |
| ♿ **A11y** | Skip-Link, ARIA-Labels, `prefers-reduced-motion`, Tastatur-Navigation |

---

## 🧰 Stack

- **React 19** + **Vite 6** + **Tailwind v4** (`@theme`-Tokens)
- **React Router 7** mit Lazy-Loaded Pages
- **TanStack Query 5** für Daten-Caching + Stale-Time
- **Framer Motion 11** für Page-Transitions + Mikro-Animationen
- **@dnd-kit** für Wochenplan-Drag-&-Drop
- **Lucide React** Icons
- **class-variance-authority** + **tailwind-merge** für UI-Varianten
- **vite-plugin-pwa** + Workbox Runtime-Caching
- **Vitest** + **React Testing Library** (69 Tests)
- **Spoonacular API** (optional — ohne Key Demo-Modus mit Mock-Rezepten)

---

## 🚀 Quickstart

```bash
git clone https://github.com/YoussefDawod/FlavorFind.git
cd FlavorFind
npm install
cp .env.example .env.local
# API-Key eintragen (optional — ohne Key läuft Demo-Modus)
npm run dev
```

Die App läuft auf <http://localhost:5173>.

### Environment-Variablen

| Variable | Default | Beschreibung |
|---|---|---|
| `VITE_SPOONACULAR_KEY` | – | API-Key von [spoonacular.com](https://spoonacular.com/food-api) |
| `VITE_USE_MOCKS` | `false` | `true` erzwingt Demo-Modus auch mit Key |

Ohne `VITE_SPOONACULAR_KEY` startet die App automatisch im Demo-Modus mit lokalen Mock-Rezepten und sichtbarem Banner.

---

## 📜 Scripts

| Befehl | Zweck |
|---|---|
| `npm run dev` | Dev-Server mit HMR |
| `npm run build` | Produktions-Build (generiert SW + Manifest) |
| `npm run preview` | Build lokal servieren (inkl. PWA-Test) |
| `npm run lint` | ESLint über alle JS/JSX |
| `npm run lint:fix` | Auto-Fix |
| `npm run format` | Prettier |
| `npm test` | Vitest Run-Mode |
| `npm run test:watch` | Vitest Watch |
| `npm run test:ui` | Vitest UI |
| `npm run gen:icons` | PWA-Icons neu generieren (sharp) |
| `npm run gen:og` | OG-Card neu generieren (1200 × 630) |

---

## 📂 Projekt-Struktur

```
src/
├── components/
│   ├── feedback/          # ErrorBoundary, ErrorState, Skeleton
│   ├── layout/            # Header, Footer, PageShell, Banner
│   ├── recipe/            # RecipeCard, RecipeGrid, FavoriteButton
│   └── ui/                # CVA-Primitives (Button, Card, Chip, Modal …)
├── context/               # ThemeContext, ToastContext
├── hooks/                 # useFavorites, useWeekPlan, useWakeLock …
├── mocks/                 # Demo-Rezepte (Offline-Fallback)
├── pages/                 # Home, Search, Fridge, WeekPlan, Cook …
├── styles/tailwind.css    # Design-Tokens via @theme
├── test/                  # Vitest Suites + Setup
└── utils/                 # api, storage, cn, slug, formatters
```

---

## 🎨 Design-System

**Dark Luxury meets Cozy Warmth** — warm-tief statt kalt-schwarz.
Design-Tokens leben in [`src/styles/tailwind.css`](src/styles/tailwind.css) via Tailwind-v4-`@theme`:

- **Hintergrund**: `#000000` (OLED True Black)
- **Surfaces**: `#0b0b0c` / `#15151a`
- **Accent**: `#D4A574` Burnished Gold
- **Secondary**: `#C2410C` Terracotta
- **Serif**: Fraunces / Playfair Display
- **Sans**: Inter

---

## 🧪 Tests

```bash
npm test
```

- **69 Tests** in 10 Files — Utils, Hooks, UI-Primitives
- Jsdom-Env mit In-Memory `localStorage`-Stub ([`src/test/setup.js`](src/test/setup.js))
- Separate [`vitest.config.js`](vitest.config.js) (vermeidet PWA-Plugin-Konflikt)

---

## 🛡️ CI

GitHub Actions Workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml):

1. `npm ci`
2. `npm run lint` — 0 Errors
3. `npm test` — 69 Tests grün
4. `npm run build` — Build + SW-Generierung

Läuft auf Push zu `main` und in jedem Pull-Request.

---

## ☁️ Deployment

FlavorFind deployt auf **Render.com** als Static Site. Die vollständige Deploy-Anleitung (Blueprint, Security-Header, Custom Domain, Smoke-Tests) liegt lokal unter `docs/DEPLOY.md` (nicht versioniert).

Kurzform — One-Click via Blueprint:

```
https://render.com/deploy?repo=https://github.com/YoussefDawod/FlavorFind
```

---

## 📦 PWA

- **Manifest**: [`vite.config.js`](vite.config.js) via `vite-plugin-pwa`
- **Icons**: 192 / 512 / maskable / apple-touch (generiert via [`scripts/generate-pwa-icons.mjs`](scripts/generate-pwa-icons.mjs))
- **Workbox-Caching**:
  - Google Fonts: StaleWhileRevalidate / CacheFirst (365 d)
  - Spoonacular-Images: CacheFirst (30 d)
  - Spoonacular-API: NetworkFirst mit 5 s Timeout (24 h)
  - App-Shell: Precache aller Build-Assets
- **Navigate-Fallback**: `/index.html` für Offline-SPA-Navigation

---

## 📄 Lizenz & Credits

- Rezeptdaten: [Spoonacular API](https://spoonacular.com/food-api) — Rezepte bleiben Eigentum von Spoonacular, die App zeigt sie unverändert mit Quellenangabe.
- Icons: [Lucide](https://lucide.dev) (ISC).
- Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces) + [Inter](https://fonts.google.com/specimen/Inter) (SIL OFL).
- Code: eigene Arbeit, MIT-Lizenz.

---

## 👋 Autor

**Youssef Dawod** · [GitHub](https://github.com/YoussefDawod) · [LinkedIn](https://www.linkedin.com/in/youssef-dawod-203273215/)
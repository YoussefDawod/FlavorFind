# Deployment-Anleitung — Render.com

FlavorFind ist eine statische Vite-PWA — Deploy über [Render Static Sites](https://render.com/docs/static-sites). Diese Anleitung deckt alle Schritte vom Fork bis zur Live-URL ab.

---

## 1. Voraussetzungen

- [Render-Konto](https://dashboard.render.com/register) (kostenlos, GitHub-OAuth möglich)
- Repository-Fork / Clone von FlavorFind auf GitHub
- Optional: [Spoonacular-API-Key](https://spoonacular.com/food-api/console) (ohne Key läuft die App im Demo-Modus)

---

## 2. One-Click via Blueprint

Die einfachste Variante — Render liest `render.yaml` und richtet alles automatisch ein.

1. Öffne im Browser:
   ```
   https://render.com/deploy?repo=https://github.com/YoussefDawod/FlavorFind
   ```
2. Render authentifiziert GitHub, klont das Repo und schlägt den Blueprint vor.
3. Klick **Apply** → Render erstellt den Static Site Service mit Build-Command, Publish-Path, Headern und Rewrite-Regel.
4. Nach Erstabschluss siehst du die Live-URL: `https://flavorfind-XXXX.onrender.com`.

---

## 3. Manuell (ohne Blueprint)

Falls Blueprint nicht genutzt werden soll:

### 3.1 Service anlegen

1. Render-Dashboard → **New +** → **Static Site**.
2. GitHub-Repository verbinden und FlavorFind wählen.
3. Konfiguration:
   - **Name**: `flavorfind`
   - **Branch**: `main`
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `dist`
4. **Create Static Site**.

### 3.2 Redirect/Rewrite-Regel (SPA-Fallback)

Ohne Rewrite liefert Render bei `/rezept/123` einen 404 — React-Router braucht immer `index.html`:

- Tab **Redirects/Rewrites** → **Add Rule**
- **Source**: `/*`
- **Destination**: `/index.html`
- **Action**: `Rewrite`

### 3.3 Environment-Variablen

Tab **Environment** → **Add Environment Variable**:

| Key | Value | Secret |
|---|---|---|
| `NODE_VERSION` | `20` | nein |
| `VITE_SPOONACULAR_KEY` | `<dein-key>` | **ja** |
| `VITE_USE_MOCKS` | `false` | nein |

Ohne `VITE_SPOONACULAR_KEY` fällt die App automatisch in den Demo-Modus (lokale Mock-Rezepte, Banner sichtbar).

### 3.4 Security-Header

Tab **Headers** — empfohlene Minimalkonfiguration (siehe [`render.yaml`](./render.yaml) für CSP-Details):

| Path | Header | Value |
|---|---|---|
| `/*` | `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `/*` | `X-Content-Type-Options` | `nosniff` |
| `/*` | `X-Frame-Options` | `DENY` |
| `/*` | `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `/*` | `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` |
| `/assets/*` | `Cache-Control` | `public, max-age=31536000, immutable` |
| `/sw.js` | `Cache-Control` | `public, max-age=0, must-revalidate` |

---

## 4. Custom Domain (optional)

1. Tab **Settings** → **Custom Domains** → **Add Custom Domain**.
2. Domain eintragen (z. B. `flavorfind.dev`).
3. Bei deinem DNS-Anbieter folgende Records setzen:
   - **A-Record** `@` → `216.24.57.1` (Render liefert die aktuelle IP im Dashboard)
   - **CNAME** `www` → `flavorfind-XXXX.onrender.com`
4. Render stellt TLS automatisch via Let's Encrypt aus — nach Propagation wird `https://flavorfind.dev` grün.

---

## 5. Build-Verifikation

Nach dem Deploy prüfen:

- **Live-URL lädt**: Home-Screen + Rezept-Grid sichtbar
- **Direkter Deep-Link**: `/rezept/123` direkt aufrufen → kein 404
- **PWA**: Chrome DevTools → Application → Manifest zeigt `name`, Icons, `display: standalone`
- **Service Worker**: Application → Service Workers zeigt `sw.js` aktiv
- **Offline**: DevTools → Network → `Offline` → Seite neu laden → App funktioniert, Offline-Banner sichtbar
- **Lighthouse** (Mobile + Desktop, incognito): PWA 100, Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- **Security-Header**: [securityheaders.com](https://securityheaders.com) → Rating **A** oder **A+**

---

## 6. Smoke-Test-Checkliste (Release-Gate)

- [ ] Alle Routen laden direkt per URL (keine 404 bei Refresh)
- [ ] Theme-Toggle persistiert über Reload
- [ ] Favorit hinzufügen/entfernen in `localStorage` sichtbar
- [ ] Suche mit Filter → URL teilbar → URL öffnen reproduziert Filter
- [ ] Portionsrechner ändert alle Zutaten live
- [ ] Koch-Modus: Wake-Lock aktiv, Timer piept
- [ ] Kühlschrank-Modus zeigt „X von Y Zutaten hast du"
- [ ] Wochenplan Drag & Drop funktioniert auf Touch
- [ ] SlotMachine rollt smooth und endet auf gültigem Rezept
- [ ] Offline: zuvor besuchtes Rezept lädt aus Cache
- [ ] PWA-Install-Prompt erscheint (≥ 8 s nach Load, wenn nicht installiert)
- [ ] Lighthouse ≥ 95 in allen Kategorien
- [ ] axe DevTools: 0 schwere Accessibility-Verstöße
- [ ] `prefers-reduced-motion` deaktiviert Animationen
- [ ] Screen-Reader-Test: Navigation + Suche + Favorit bedienbar
- [ ] OG-Card rendert (Test via [opengraph.xyz](https://www.opengraph.xyz/))
- [ ] Security-Header via [securityheaders.com](https://securityheaders.com) ≥ A

---

## 7. Troubleshooting

### Build schlägt fehl mit „EACCES" oder „sharp" Fehlern
Render cacht Node-Modules bei Version-Mismatch. Lösung:
- Environment-Variable `NODE_VERSION=20` setzen
- Im Dashboard **Manual Deploy** → **Clear build cache & deploy**

### 404 bei direktem Route-Aufruf
Rewrite-Regel fehlt. Siehe [3.2](#32-redirectrewrite-regel-spa-fallback).

### API-Calls scheitern mit CSP-Error
Die CSP-Policy erlaubt nur `api.spoonacular.com`. Bei eigener API-Domain `connect-src` in `render.yaml` erweitern.

### Service-Worker zeigt alte Version
Workbox cleanup läuft automatisch bei Version-Change. Nutzer sieht dann den *Update verfügbar*-Prompt. Manuell: DevTools → Application → Service Workers → **Unregister** + Hard-Reload.

### Lighthouse PWA-Score < 100
Prüfen:
- HTTPS aktiv (Render automatisch)
- Manifest-Icons erreichbar (192, 512, maskable)
- `start_url` lädt offline (Workbox `navigateFallback: /index.html`)

---

## 8. Rollback

Render speichert jede Deploy-Revision:

1. Tab **Events** → ältere Revision → **Rollback**.
2. Oder via `git revert <commit>` + Push → Auto-Deploy triggert neuen Build.

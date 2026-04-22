# Mitwirken an FlavorFind

Danke für dein Interesse. Dieses Projekt ist klein gehalten — Beiträge sind willkommen, solange sie zur Vision „cineastische, werbefreie Rezept-PWA" passen.

## Entwicklung lokal

```bash
git clone https://github.com/YoussefDawod/FlavorFind.git
cd FlavorFind
npm install
cp .env.example .env.local
npm run dev
```

## Vor jedem Commit

Husky + lint-staged laufen automatisch. Manuell prüfen geht so:

```bash
npm run lint        # 0 Fehler erwartet
npm run format      # Prettier über alle Dateien
npm test            # 69 Tests grün
npm run build       # Produktions-Build
```

## Commit-Konvention

Wir nutzen [Conventional Commits](https://www.conventionalcommits.org/de/):

```
feat(scope):  neue Funktion
fix(scope):   Bugfix
docs(scope):  Doku
refactor:     Umstrukturierung ohne Verhaltensänderung
test:         Tests hinzufügen/ändern
chore:        Build / CI / Dependencies
```

## Pull-Requests

1. Branch von `main` erstellen: `feat/deine-idee` oder `fix/kurzer-name`
2. Änderungen committen (Conventional Commits)
3. PR öffnen, CI muss grün sein
4. Kurze Beschreibung: **Was** + **Warum**, Screenshots bei UI-Änderungen

## Stil

- React-Funktionskomponenten, keine Klassen (außer ErrorBoundary)
- Tailwind v4 via `@theme`-Tokens — keine Hex-Werte hardcoden
- Deutsche UI-Texte, englische Code-Bezeichner
- A11y-Pflicht: ARIA-Labels für interaktive Elemente, Keyboard-Navigation testen
- Neue Komponenten brauchen Tests (Vitest + RTL)

## Fragen?

[Issue öffnen](https://github.com/YoussefDawod/FlavorFind/issues) oder Mail an dawod@yellowdeveloper.de.

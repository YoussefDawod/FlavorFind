export default function App() {
  return (
    <main className="relative min-h-dvh flex items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-6">
        <p
          className="text-sm uppercase tracking-[0.3em] text-[var(--color-accent)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          FlavorFind
        </p>
        <h1
          className="font-[600]"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--text-display)",
            lineHeight: 1.05,
          }}
        >
          Cook like it <em className="italic">matters.</em>
        </h1>
        <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
          Entdecke Rezepte cineastisch, koche mit geführtem Modus, plane deine
          Woche.
        </p>
        <p
          className="text-xs mt-12"
          style={{ color: "var(--color-text-muted)" }}
        >
          Phase 0 · Setup erfolgreich · Dark Theme · Fraunces geladen
        </p>
      </div>
    </main>
  );
}

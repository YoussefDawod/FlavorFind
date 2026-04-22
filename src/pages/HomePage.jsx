import PageShell from "../components/layout/PageShell";

export default function HomePage() {
  return (
    <PageShell
      eyebrow="Entdecken"
      title={
        <>
          Cook like it{" "}
          <em className="italic text-[var(--color-accent)]">matters.</em>
        </>
      }
      intro="Entdecke Rezepte cineastisch, koche mit geführtem Modus, plane deine Woche. Der echte Home-Screen mit Hero, Kategorien und kuratierten Rezepten folgt in Phase 4."
    >
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 p-6 text-sm text-[var(--color-text-muted)] backdrop-blur">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
          Phase 1 · Layout
        </p>
        <p className="mt-2">
          Header, Footer, Theme-Toggle, Mobile-Drawer, Page-Transitions und
          Grain-Overlay sind live. Probier den Theme-Toggle oben rechts und die
          Navigation aus.
        </p>
      </div>
    </PageShell>
  );
}

import PageShell from "../components/layout/PageShell";

export default function ImprintPage() {
  return (
    <PageShell
      eyebrow="Impressum"
      title="Impressum"
      intro="Angaben gemäß § 5 TMG und Verantwortlicher im Sinne des § 18 Abs. 2 MStV."
    >
      <div className="prose prose-invert max-w-none space-y-8 text-text-secondary">
        <section>
          <h2 className="font-serif text-2xl text-text">Angaben gemäß § 5 TMG</h2>
          <address className="not-italic leading-relaxed">
            Youssef Dawod
            <br />
            Bahnhofstr. 1
            <br />
            29614 Soltau
            <br />
            Deutschland
          </address>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-text">Kontakt</h2>
          <p className="leading-relaxed">
            E-Mail:{" "}
            <a
              href="mailto:dawod@yellowdeveloper.de"
              className="text-accent hover:underline"
            >
              dawod@yellowdeveloper.de
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-text">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p className="leading-relaxed">
            Youssef Dawod, Anschrift wie oben.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-text">Haftungsausschluss</h2>
          <h3 className="mt-4 font-serif text-lg text-text">
            Haftung für Inhalte
          </h3>
          <p className="leading-relaxed">
            Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für
            die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann
            jedoch keine Gewähr übernommen werden. Als Diensteanbieter sind wir
            gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich.
          </p>
          <h3 className="mt-4 font-serif text-lg text-text">
            Haftung für Links
          </h3>
          <p className="leading-relaxed">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
            der Seiten verantwortlich.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-text">Urheberrecht</h2>
          <p className="leading-relaxed">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Rezept- und
            Bildinhalte werden über die Spoonacular-API bezogen und bleiben
            Eigentum der jeweiligen Rechteinhaber.
          </p>
        </section>

        <p className="text-xs text-text-muted">
          Stand: {new Date().toLocaleDateString("de-DE")}
        </p>
      </div>
    </PageShell>
  );
}

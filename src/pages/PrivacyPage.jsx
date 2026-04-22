import PageShell from "../components/layout/PageShell";

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Datenschutz"
      title="Datenschutzerklärung"
      intro="Informationen zur Verarbeitung personenbezogener Daten gemäß Art. 13 DSGVO."
    >
      <div className="prose prose-invert max-w-none space-y-8 text-text-secondary">
        <section>
          <h2 className="font-serif text-2xl text-text">1. Überblick</h2>
          <p className="leading-relaxed">
            FlavorFind ist eine clientseitige Rezept-Anwendung. Wir legen Wert
            auf Datensparsamkeit: Es werden keine Nutzerkonten angelegt, keine
            Tracking-Cookies gesetzt und keine Daten an Drittanbieter zu
            Werbezwecken weitergegeben.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-text">
            2. Verantwortlicher
          </h2>
          <address className="not-italic leading-relaxed">
            Youssef Dawod
            <br />
            Bahnhofstr. 1
            <br />
            29614 Soltau
            <br />
            Deutschland
            <br />
            E-Mail:{" "}
            <a
              href="mailto:dawod@yellowdeveloper.de"
              className="text-accent hover:underline"
            >
              dawod@yellowdeveloper.de
            </a>
          </address>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-text">
            3. Lokale Datenspeicherung (localStorage)
          </h2>
          <p className="leading-relaxed">
            Favoriten, Wochenplan, Kühlschrank-Zutaten und Theme-Einstellung
            werden ausschließlich im <strong>localStorage</strong> deines
            Browsers gespeichert. Diese Daten verlassen dein Gerät nicht und
            werden nicht an unsere Server übertragen. Du kannst sie jederzeit
            über die Browser-Einstellungen löschen.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-sm">
            <li>
              <code className="rounded bg-surface-elevated px-1">
                flavorfind:favorites
              </code>{" "}
              — deine gespeicherten Rezepte
            </li>
            <li>
              <code className="rounded bg-surface-elevated px-1">
                flavorfind:week-plan
              </code>{" "}
              — dein Wochenplan
            </li>
            <li>
              <code className="rounded bg-surface-elevated px-1">
                flavorfind:fridge
              </code>{" "}
              — Zutaten im Kühlschrank-Modus
            </li>
            <li>
              <code className="rounded bg-surface-elevated px-1">
                flavorfind:theme
              </code>{" "}
              — dein Farbschema (hell/dunkel)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-text">
            4. Server-Logs beim Hosting
          </h2>
          <p className="leading-relaxed">
            Beim Abruf der Anwendung protokolliert unser Hosting-Anbieter
            automatisch IP-Adresse, Zeitstempel und User-Agent. Rechtsgrundlage
            ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem
            sicheren Betrieb). Diese Logs werden nach 7 Tagen gelöscht und
            nicht mit anderen Daten zusammengeführt.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-text">
            5. Drittanbieter: Spoonacular-API
          </h2>
          <p className="leading-relaxed">
            Rezeptdaten werden über die Spoonacular-API (spoonacular.com)
            bezogen. Bei jeder Suche wird die Anfrage (z. B. Suchbegriff oder
            Zutatenliste) an die Spoonacular-Server in den USA übertragen. Es
            besteht ein angemessenes Datenschutzniveau auf Grundlage des
            EU-US Data Privacy Framework. Details:{" "}
            <a
              href="https://spoonacular.com/food-api/privacy-policy"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              Spoonacular Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-text">6. Deine Rechte</h2>
          <p className="leading-relaxed">
            Du hast nach DSGVO das Recht auf Auskunft (Art. 15), Berichtigung
            (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung
            (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21)
            sowie das Recht auf Beschwerde bei einer Aufsichtsbehörde.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-text">7. Cookies</h2>
          <p className="leading-relaxed">
            Diese Anwendung setzt <strong>keine Cookies</strong>. Die genannten
            Einstellungen werden ausschließlich über die localStorage-API
            gespeichert.
          </p>
        </section>

        <p className="text-xs text-text-muted">
          Stand: {new Date().toLocaleDateString("de-DE")}
        </p>
      </div>
    </PageShell>
  );
}

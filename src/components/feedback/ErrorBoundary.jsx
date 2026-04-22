import { Component } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

/**
 * App-weite Error-Boundary — fängt Render-Fehler und zeigt ein freundliches Fallback-UI.
 * Sollte im Layout-Root um den Outlet gelegt werden.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info);
  }

  handleReset = () => {
    this.setState({ error: null });
  };

  handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div
        role="alert"
        className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-6 px-6 py-16 text-center"
      >
        <span className="inline-flex size-16 items-center justify-center rounded-full bg-[color:var(--color-secondary-soft)] text-[color:var(--color-secondary)]">
          <AlertTriangle className="size-7" aria-hidden="true" />
        </span>
        <div className="space-y-2">
          <h1 className="font-[family-name:var(--font-serif)] text-3xl text-[color:var(--color-text)]">
            Etwas ist schiefgelaufen
          </h1>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            Ein unerwarteter Fehler hat die Ansicht unterbrochen. Bitte lade die
            Seite neu oder kehre zur Startseite zurück.
          </p>
          {import.meta.env.DEV && this.state.error?.message ? (
            <pre className="mt-4 overflow-x-auto rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-3 text-left text-xs text-[color:var(--color-text-muted)]">
              {String(this.state.error.message)}
            </pre>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={this.handleReload}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[color:var(--color-bg)] shadow-[var(--shadow-soft)] transition hover:bg-[color:var(--color-accent-hover)]"
          >
            <RefreshCcw className="size-4" aria-hidden="true" />
            Seite neu laden
          </button>
          <a
            href="/"
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface-elevated)] px-5 py-2.5 text-sm font-medium text-[color:var(--color-text)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
          >
            <Home className="size-4" aria-hidden="true" />
            Zur Startseite
          </a>
        </div>
      </div>
    );
  }
}

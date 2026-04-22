import { AlertTriangle, RefreshCcw } from "lucide-react";
import {
  MissingApiKeyError,
  NotFoundError,
  QuotaExceededError,
  TimeoutError,
} from "../../utils/api/errors";
import { cn } from "../../utils/cn";

function resolveCopy(error) {
  if (error instanceof QuotaExceededError) {
    return {
      title: "Tageslimit erreicht",
      description:
        "Das API-Tageslimit ist aufgebraucht. In ein paar Stunden geht’s weiter — oder wechsle in den Demo-Modus.",
    };
  }
  if (error instanceof NotFoundError) {
    return {
      title: "Nicht gefunden",
      description: "Dieses Rezept existiert nicht mehr oder wurde entfernt.",
    };
  }
  if (error instanceof MissingApiKeyError) {
    return {
      title: "API-Key fehlt",
      description:
        "Trage VITE_SPOONACULAR_KEY in .env.local ein oder setze VITE_USE_MOCKS=true.",
    };
  }
  if (error instanceof TimeoutError) {
    return {
      title: "Zeitüberschreitung",
      description: "Die Anfrage hat zu lange gedauert. Bitte erneut versuchen.",
    };
  }
  return {
    title: "Etwas ist schiefgelaufen",
    description:
      error?.message ??
      "Wir konnten die Daten nicht laden. Bitte versuche es erneut.",
  };
}

export function ErrorState({ error, onRetry, className }) {
  const { title, description } = resolveCopy(error);
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-start gap-4 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/60 p-6 shadow-[var(--shadow-soft)] backdrop-blur",
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-[color:var(--color-secondary-soft)] text-[color:var(--color-secondary)]">
        <AlertTriangle className="size-6" aria-hidden="true" />
      </span>
      <div className="space-y-1.5">
        <h3 className="font-[family-name:var(--font-serif)] text-xl text-[color:var(--color-text)]">
          {title}
        </h3>
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          {description}
        </p>
      </div>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface-elevated)] px-4 py-2 text-sm font-medium text-[color:var(--color-text)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
        >
          <RefreshCcw className="size-4" aria-hidden="true" />
          Erneut versuchen
        </button>
      ) : null}
    </div>
  );
}

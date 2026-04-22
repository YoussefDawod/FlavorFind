/**
 * Eigene Error-Klassen für den API-Client.
 * Ermöglicht granulare UI-Reaktionen (Quota-Hinweis vs. Netzwerkfehler vs. 404).
 */

export class ApiError extends Error {
  constructor(message, { status, code, cause } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status ?? null;
    this.code = code ?? "api_error";
    if (cause) this.cause = cause;
  }
}

export class NetworkError extends ApiError {
  constructor(message = "Keine Verbindung zum Server.", options = {}) {
    super(message, { ...options, code: "network_error" });
    this.name = "NetworkError";
  }
}

export class TimeoutError extends ApiError {
  constructor(message = "Die Anfrage hat zu lange gedauert.", options = {}) {
    super(message, { ...options, code: "timeout" });
    this.name = "TimeoutError";
  }
}

export class QuotaExceededError extends ApiError {
  constructor(
    message = "Das Tageslimit der Rezept-API ist erreicht. Bitte morgen erneut versuchen.",
    options = {},
  ) {
    super(message, { ...options, status: 402, code: "quota_exceeded" });
    this.name = "QuotaExceededError";
  }
}

export class NotFoundError extends ApiError {
  constructor(
    message = "Das gewünschte Rezept wurde nicht gefunden.",
    options = {},
  ) {
    super(message, { ...options, status: 404, code: "not_found" });
    this.name = "NotFoundError";
  }
}

export class MissingApiKeyError extends ApiError {
  constructor(
    message = "API-Schlüssel fehlt. Bitte VITE_SPOONACULAR_KEY in .env.local setzen.",
  ) {
    super(message, { code: "missing_api_key" });
    this.name = "MissingApiKeyError";
  }
}

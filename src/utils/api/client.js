import {
  ApiError,
  MissingApiKeyError,
  NetworkError,
  NotFoundError,
  QuotaExceededError,
  TimeoutError,
} from "./errors";

export const API_BASE = "https://api.spoonacular.com";
const DEFAULT_TIMEOUT = 12_000;

function getApiKey() {
  const key = import.meta.env.VITE_SPOONACULAR_KEY;
  if (!key || typeof key !== "string" || key.trim() === "") {
    throw new MissingApiKeyError();
  }
  return key.trim();
}

/**
 * Erkennt, ob Mock-Daten statt echter API-Aufrufe genutzt werden sollen.
 * Aktiv, wenn VITE_USE_MOCKS=true gesetzt ist ODER kein API-Key vorhanden ist
 * ODER zur Laufzeit (`enableRuntimeMocks`) aktiviert wurde, z. B. weil die
 * API mit 402/429 oder 401/403 geantwortet hat.
 */
let runtimeMocks = false;

export function shouldUseMocks() {
  if (runtimeMocks) return true;
  const flag = import.meta.env.VITE_USE_MOCKS;
  if (flag === "true" || flag === "1") return true;
  const key = import.meta.env.VITE_SPOONACULAR_KEY;
  return !key || typeof key !== "string" || key.trim() === "";
}

/**
 * Aktiviert für den Rest der Session den Mock-Fallback. Emittiert ein
 * `flavorfind:mocks-enabled` Event, damit UI-Komponenten ein Banner zeigen
 * können.
 */
export function enableRuntimeMocks(reason = "quota") {
  if (runtimeMocks) return;
  runtimeMocks = true;
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(
        new CustomEvent("flavorfind:mocks-enabled", { detail: { reason } }),
      );
    } catch {
      /* ignore */
    }
  }
  // eslint-disable-next-line no-console
  console.info(
    `[FlavorFind] API-Fallback aktiv (${reason}) — weitere Aufrufe nutzen Demo-Daten.`,
  );
}

export function isRuntimeMocksEnabled() {
  return runtimeMocks;
}

function buildUrl(path, params = {}) {
  const url = new URL(path.startsWith("http") ? path : `${API_BASE}${path}`);
  url.searchParams.set("apiKey", getApiKey());
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      url.searchParams.set(key, value.join(","));
    } else {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

function redactUrl(urlString) {
  try {
    const url = new URL(urlString);
    if (url.searchParams.has("apiKey")) url.searchParams.set("apiKey", "***");
    return url.toString();
  } catch {
    return urlString;
  }
}

async function parseJsonSafe(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function mapHttpError(status, payload, url) {
  const message =
    (payload && typeof payload === "object" && payload.message) ||
    (typeof payload === "string" && payload) ||
    `Anfrage fehlgeschlagen (${status})`;

  if (status === 401 || status === 403) {
    return new ApiError("Zugriff verweigert — bitte API-Key prüfen.", {
      status,
      code: "unauthorized",
      cause: { url, payload },
    });
  }
  if (status === 402 || status === 429) {
    return new QuotaExceededError(undefined, { cause: { url, payload } });
  }
  if (status === 404) {
    return new NotFoundError(undefined, { cause: { url, payload } });
  }
  return new ApiError(message, {
    status,
    code: "http_error",
    cause: { url, payload },
  });
}

/**
 * Low-Level GET-Request an Spoonacular mit einheitlichem Error-Mapping.
 *
 * @param {string} path — Pfad ab `/`, z. B. `/recipes/random`
 * @param {object} [params] — Query-Parameter
 * @param {object} [options]
 * @param {AbortSignal} [options.signal]
 * @param {number} [options.timeout]
 * @returns {Promise<any>} Antwort-Body als JSON (oder Text-Fallback)
 */
export async function apiGet(path, params = {}, options = {}) {
  const { signal, timeout = DEFAULT_TIMEOUT } = options;
  const url = buildUrl(path, params);

  const controller = new AbortController();
  const abortByExternal = () =>
    controller.abort(
      signal?.reason ?? new DOMException("aborted", "AbortError"),
    );
  if (signal) {
    if (signal.aborted) abortByExternal();
    else signal.addEventListener("abort", abortByExternal, { once: true });
  }
  const timer = setTimeout(() => controller.abort(new TimeoutError()), timeout);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    if (!response.ok) {
      const payload = await parseJsonSafe(response);
      throw mapHttpError(response.status, payload, redactUrl(url));
    }
    return await parseJsonSafe(response);
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err?.name === "AbortError") {
      if (controller.signal.reason instanceof TimeoutError) {
        throw controller.signal.reason;
      }
      throw err; // externer Abort — weiterreichen
    }
    throw new NetworkError(undefined, { cause: err });
  } finally {
    clearTimeout(timer);
    if (signal) signal.removeEventListener("abort", abortByExternal);
  }
}

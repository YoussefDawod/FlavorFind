import { QueryClient } from "@tanstack/react-query";
import {
  MissingApiKeyError,
  NotFoundError,
  QuotaExceededError,
} from "./api/errors";

/**
 * Fehler, bei denen weitere Retries sinnlos sind.
 */
function isTerminalError(error) {
  return (
    error instanceof QuotaExceededError ||
    error instanceof NotFoundError ||
    error instanceof MissingApiKeyError
  );
}

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 15 * 60 * 1000, // 15 Minuten
        gcTime: 60 * 60 * 1000, // 1 Stunde
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (isTerminalError(error)) return false;
          return failureCount < 1;
        },
      },
    },
  });
}

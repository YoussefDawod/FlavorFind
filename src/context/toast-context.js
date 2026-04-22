import { createContext } from "react";

/**
 * Toast-Context — Nutzung über `useToast()` Hook.
 * Signatur des Providers: { toast: (opts) => id, dismiss: (id) => void }
 */
export const ToastContext = createContext(null);

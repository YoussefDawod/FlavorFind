import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { registerSW } from "virtual:pwa-register";
import Button from "../ui/Button";

/**
 * Registriert den Service-Worker und zeigt einen Reload-Banner,
 * wenn eine neue Version bereitsteht.
 */
export default function PwaUpdatePrompt() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [updateFn, setUpdateFn] = useState(null);

  useEffect(() => {
    const update = registerSW({
      immediate: true,
      onNeedRefresh() {
        setNeedRefresh(true);
      },
      onOfflineReady() {
        // Silent — OfflineBanner informiert im Fehlerfall.
      },
      onRegisterError(error) {
        console.warn("[SW] Register error:", error);
      },
    });
    setUpdateFn(() => update);
  }, []);

  const reload = async () => {
    if (updateFn) await updateFn(true);
  };

  return (
    <AnimatePresence>
      {needRefresh ? (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-accent/40 bg-surface-elevated/95 px-4 py-3 text-sm shadow-glow backdrop-blur sm:inset-x-auto sm:left-6"
        >
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <RefreshCw className="size-4" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <p className="font-medium text-text">Update verfügbar</p>
            <p className="text-xs text-text-secondary">
              Neue Version bereit — Reload für die neuesten Rezepte.
            </p>
          </div>
          <Button size="sm" onClick={reload}>
            Reload
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

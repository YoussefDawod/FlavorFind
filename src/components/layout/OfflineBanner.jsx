import { AnimatePresence, motion } from "framer-motion";
import { WifiOff } from "lucide-react";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";

/**
 * Zeigt einen sticky Banner, sobald `navigator.onLine === false`.
 * Service-Worker-Cache übernimmt den Inhalt — der Banner erklärt nur den Kontext.
 */
export default function OfflineBanner() {
  const isOnline = useOnlineStatus();

  return (
    <AnimatePresence>
      {!isOnline ? (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="sticky top-0 z-40 flex items-center justify-center gap-2 border-b border-warning/30 bg-warning/15 px-4 py-2 text-xs font-medium text-warning backdrop-blur"
        >
          <WifiOff className="size-4" aria-hidden="true" />
          <span>
            Offline — du siehst zwischengespeicherte Inhalte. Neue Suchen sind
            nicht möglich, bis du wieder online bist.
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

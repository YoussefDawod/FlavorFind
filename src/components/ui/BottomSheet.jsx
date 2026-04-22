import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";

/**
 * Mobile Bottom-Sheet — rutscht von unten ein, mit Drag-to-Dismiss.
 */
export default function BottomSheet({
  open,
  onClose,
  title,
  children,
  className,
}) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[95] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Schließen"
            onClick={onClose}
            className="absolute inset-0 bg-overlay backdrop-blur-sm"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "sheet-title" : undefined}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) onClose?.();
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative z-10 w-full max-w-xl rounded-t-3xl border-t border-border-strong bg-surface-elevated shadow-soft",
              className,
            )}
          >
            <div className="flex justify-center pt-3 pb-1">
              <span className="h-1.5 w-12 rounded-full bg-border-strong" />
            </div>
            {title ? (
              <div className="border-b border-border px-6 pb-4">
                <h2 id="sheet-title" className="font-serif text-xl text-text">
                  {title}
                </h2>
              </div>
            ) : null}
            <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
              {children}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

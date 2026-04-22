import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../utils/cn";

/**
 * Theme-Toggle — Button mit sanftem Icon-Crossfade.
 * Schaltet zwischen Dark & Light um; Wahl wird persistiert.
 */
export default function ThemeToggle({ className }) {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark ? "Zu hellem Modus wechseln" : "Zu dunklem Modus wechseln"
      }
      aria-pressed={isDark}
      className={cn(
        "group relative inline-flex h-10 w-10 items-center justify-center rounded-full",
        "border border-[var(--color-border)] bg-[var(--color-surface)]/60 backdrop-blur",
        "transition-colors duration-300 hover:border-[var(--color-accent)]/60 hover:bg-[var(--color-accent-soft)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center text-[var(--color-accent)]"
        >
          {isDark ? (
            <Moon size={18} strokeWidth={1.75} />
          ) : (
            <Sun size={18} strokeWidth={1.75} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

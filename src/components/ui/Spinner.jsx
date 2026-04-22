import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

/**
 * Einfacher Spinner auf Basis von Lucide `Loader2`.
 */
export default function Spinner({ size = "md", className, label = "Lädt" }) {
  const sizes = { sm: "size-4", md: "size-5", lg: "size-8" };
  return (
    <span
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center gap-2 text-text-muted", className)}
    >
      <Loader2
        className={cn("animate-spin text-accent", sizes[size] ?? sizes.md)}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}

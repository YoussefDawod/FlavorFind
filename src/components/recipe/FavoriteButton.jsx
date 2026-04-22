import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useFavorites } from "../../hooks/useFavorites";
import { useToast } from "../../hooks/useToast";
import { cn } from "../../utils/cn";

/**
 * Herz-Button — toggelt Rezept in Favoriten-Liste, mit kurzer Motion-Reaktion
 * und Toast-Feedback.
 */
export default function FavoriteButton({
  recipe,
  size = "md",
  className,
  onToggle,
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { toast } = useToast();
  const active = isFavorite(recipe?.id);

  const sizes = {
    sm: "size-8",
    md: "size-10",
    lg: "size-12",
  };
  const iconSize = size === "sm" ? "size-4" : size === "lg" ? "size-6" : "size-5";

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const added = toggleFavorite(recipe);
    onToggle?.(added);
    toast({
      variant: added ? "success" : "info",
      title: added ? "Favorit gespeichert" : "Favorit entfernt",
      description: recipe?.title,
      duration: 2400,
    });
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? "Favorit entfernen" : "Als Favorit speichern"}
      whileTap={{ scale: 0.88 }}
      className={cn(
        "inline-flex items-center justify-center rounded-full border backdrop-blur transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-accent",
        active
          ? "border-accent/70 bg-accent/20 text-accent"
          : "border-border-strong bg-surface-elevated/70 text-text hover:border-accent hover:text-accent",
        sizes[size] ?? sizes.md,
        className,
      )}
    >
      <Heart
        className={cn(iconSize, active && "fill-current")}
        aria-hidden="true"
      />
    </motion.button>
  );
}

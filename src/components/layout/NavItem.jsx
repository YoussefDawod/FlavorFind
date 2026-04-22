import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";

/**
 * Einzelner Nav-Link mit aktiver Unterstrich-Animation.
 * Wird in Header (horizontal) + MobileDrawer (vertikal) verwendet.
 */
export default function NavItem({
  to,
  children,
  onClick,
  variant = "horizontal",
}) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "group relative inline-flex items-center font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] rounded-md",
          variant === "horizontal" && "px-3 py-2 text-sm",
          variant === "vertical" && "w-full px-2 py-3 text-lg",
          isActive
            ? "text-[var(--color-accent)]"
            : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",
        )
      }
    >
      {({ isActive }) => (
        <>
          <span>{children}</span>
          {variant === "horizontal" && (
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-[var(--color-accent)] transition-transform duration-300 ease-out",
                isActive ? "scale-x-100" : "group-hover:scale-x-100",
              )}
            />
          )}
        </>
      )}
    </NavLink>
  );
}

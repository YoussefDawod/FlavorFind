import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

export const iconButtonVariants = cva(
  "relative inline-flex items-center justify-center rounded-full transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid:
          "bg-accent text-[#1F1410] shadow-soft hover:bg-accent-hover hover:shadow-glow active:translate-y-px",
        subtle:
          "bg-surface-elevated text-text hover:text-accent hover:bg-surface-elevated",
        ghost:
          "text-text-secondary hover:text-text hover:bg-surface-elevated",
        outline:
          "border border-border-strong text-text hover:border-accent hover:text-accent",
      },
      size: {
        sm: "size-8",
        md: "size-10",
        lg: "size-12",
      },
    },
    defaultVariants: { variant: "subtle", size: "md" },
  },
);

const IconButton = forwardRef(function IconButton(
  {
    className,
    variant,
    size,
    isLoading = false,
    "aria-label": ariaLabel,
    children,
    type = "button",
    disabled,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      aria-busy={isLoading || undefined}
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        children
      )}
    </button>
  );
});

export default IconButton;

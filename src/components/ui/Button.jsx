import { cva } from "class-variance-authority";
import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-[#1F1410] shadow-soft hover:bg-accent-hover hover:shadow-glow active:translate-y-px",
        secondary:
          "bg-surface-elevated text-text border border-border-strong hover:border-accent hover:text-accent",
        outline:
          "border border-accent text-accent hover:bg-accent-soft",
        ghost:
          "text-text-secondary hover:text-text hover:bg-surface-elevated",
        danger:
          "bg-danger/90 text-[#F5EFE6] hover:bg-danger",
        link:
          "text-accent underline-offset-4 hover:underline px-0 py-0 h-auto",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "size-10 p-0",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const Button = forwardRef(function Button(
  {
    className,
    variant,
    size,
    fullWidth,
    isLoading = false,
    leftIcon,
    rightIcon,
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
      aria-busy={isLoading || undefined}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : leftIcon ? (
        <span className="inline-flex size-4 items-center justify-center" aria-hidden="true">
          {leftIcon}
        </span>
      ) : null}
      {children}
      {!isLoading && rightIcon ? (
        <span className="inline-flex size-4 items-center justify-center" aria-hidden="true">
          {rightIcon}
        </span>
      ) : null}
    </button>
  );
});

export default Button;

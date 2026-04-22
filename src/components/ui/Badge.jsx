import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        neutral: "bg-surface-elevated text-text-secondary",
        accent: "bg-accent-soft text-accent",
        secondary: "bg-secondary-soft text-secondary",
        success: "bg-success/15 text-success",
        danger: "bg-danger/15 text-danger",
        outline: "border border-border-strong text-text-secondary",
      },
      size: {
        sm: "px-2 py-0.5 text-[11px] uppercase tracking-wider",
        md: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: { variant: "neutral", size: "md" },
  },
);

export default function Badge({ className, variant, size, children, ...props }) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </span>
  );
}

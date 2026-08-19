import { type HTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva("inline-flex items-center justify-center rounded-sm shrink-0", {
  variants: {
    size: {
      xs: "px-xs py-3xs text-xs",
      sm: "px-xs py-3xs text-xs leading-[150%]",
      md: "px-xs py-3xs text-xs leading-[150%]",
    },
    weight: {
      bold: "font-bold",
      medium: "font-medium",
    },
    variant: {
      info: "bg-info-subtle text-foreground",
      success: "bg-positive-subtle text-foreground",
      warning: "bg-warning-tertiary text-foreground",
      danger: "bg-destructive-subtle text-foreground",
      accent: "border border-primary text-primary bg-transparent",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "bold",
  },
});

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    bg?: string;
    color?: string;
    children: ReactNode;
  };

export function Badge({
  className,
  size,
  weight,
  variant,
  bg,
  color,
  style,
  children,
  ...props
}: BadgeProps) {
  const hasCustomColors = bg != null || color != null;

  return (
    <span
      className={cn(
        badgeVariants({ size, weight, variant: hasCustomColors ? undefined : variant }),
        className,
      )}
      style={{
        ...(hasCustomColors ? { background: bg, color } : undefined),
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}

export { badgeVariants };

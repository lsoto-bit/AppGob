import { type HTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva("inline-flex items-center justify-center rounded-[4px] shrink-0", {
  variants: {
    size: {
      xs: "px-2 py-[2px] text-[8px] leading-[12px]",
      sm: "px-2 py-0.5 text-[12px] leading-[150%]",
      md: "px-2 py-[2px] text-[12px] leading-[150%]",
    },
    weight: {
      bold: "font-bold",
      medium: "font-medium",
    },
    variant: {
      info: "bg-[#e3f2fd] text-[#0d47a1]",
      success: "bg-[#E8F5E9] text-[#1B5E20]",
      accent: "bg-[#e7ecff] text-[#0046a8]",
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

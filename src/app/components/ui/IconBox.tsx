import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const iconBoxVariants = cva(
  "flex items-center justify-center shrink-0 bg-muted rounded-md",
  {
    variants: {
      size: {
        md: "w-[42px] h-[42px]",
        lg: "w-16 h-16",
        auto: "p-xs",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type IconBoxProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof iconBoxVariants>;

export function IconBox({ className, size, ...props }: IconBoxProps) {
  return <div className={cn(iconBoxVariants({ size }), className)} {...props} />;
}

export { iconBoxVariants };

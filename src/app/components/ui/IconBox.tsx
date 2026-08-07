import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const iconBoxVariants = cva(
  "flex items-center justify-center shrink-0 bg-[#f2f2f2] rounded-[8px]",
  {
    variants: {
      size: {
        md: "w-8 h-8",
        lg: "w-16 h-16",
        auto: "p-2",
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

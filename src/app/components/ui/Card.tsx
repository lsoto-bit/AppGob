import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const cardVariants = cva("bg-white", {
  variants: {
    variant: {
      default: "rounded-[16px] border border-[#ccc]",
      elevated: "rounded-[8px] border-0 shadow-[0_1px_2px_rgba(0,0,0,0.2)]",
    },
    divided: {
      true: "divide-y divide-[#ccc]",
      false: "",
    },
    padding: {
      none: "",
      sm: "px-4",
      md: "px-4 py-4",
    },
    overflow: {
      visible: "",
      hidden: "overflow-hidden",
      auto: "overflow-y-auto",
    },
    shadow: {
      none: "",
      md: "shadow-md",
    },
    fullWidth: {
      true: "w-full",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    divided: false,
    padding: "none",
    overflow: "visible",
    shadow: "none",
    fullWidth: false,
  },
});

export type CardProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, divided, padding, overflow, shadow, fullWidth, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, divided, padding, overflow, shadow, fullWidth }), className)}
      {...props}
    />
  ),
);

Card.displayName = "Card";

export { cardVariants };

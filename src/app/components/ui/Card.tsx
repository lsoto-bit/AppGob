import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const cardVariants = cva("rounded-2xl border border-[#ccc] bg-white", {
  variants: {
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
    divided: false,
    padding: "none",
    overflow: "visible",
    shadow: "none",
    fullWidth: false,
  },
});

export type CardProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, divided, padding, overflow, shadow, fullWidth, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ divided, padding, overflow, shadow, fullWidth }), className)}
      {...props}
    />
  ),
);

Card.displayName = "Card";

export { cardVariants };

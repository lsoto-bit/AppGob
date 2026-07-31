import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-30",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground rounded-full active:opacity-80 font-bold",
        secondary:
          "border border-primary text-primary rounded-full active:bg-blue-50 font-bold",
        ghost:
          "border border-border text-muted-foreground rounded-full active:bg-muted font-bold",
        destructive:
          "border border-destructive text-destructive rounded-full active:bg-red-50 font-medium",
        link: "text-[#1d70b8] active:opacity-70 font-normal bg-transparent",
        icon: "rounded-full active:bg-gray-100 text-muted-foreground shrink-0 bg-transparent",
        "icon-muted":
          "active:bg-muted shrink-0 bg-transparent text-foreground",
        "nav-back":
          "text-primary active:bg-blue-50 rounded-full gap-2 p-1 -ml-1 font-normal bg-transparent",
        chip: "rounded-full border border-border bg-white text-foreground active:bg-gray-50 font-normal",
        card: "rounded-2xl border border-border bg-white active:bg-gray-50 font-bold text-left justify-start w-full",
        select:
          "w-full text-left border transition-colors font-normal bg-transparent",
        utility:
          "bg-white text-black border border-black rounded-[2px] font-normal active:opacity-70 shrink-0",
        "list-row":
          "w-full text-left active:bg-muted transition-colors font-normal bg-transparent justify-start",
      },
      size: {
        sm: "text-[11px] tracking-[1.1px] px-4 py-2 gap-1.5",
        md: "text-[13px] px-4 py-3 gap-2",
        lg: "text-[16px] px-4 py-3 gap-2",
        xl: "text-[13px] px-5 py-4 gap-2",
        compact: "text-[12px] px-3 py-1.5 gap-1.5",
        submit: "text-[14px] tracking-[1.4px] h-[49px] px-4 font-semibold",
        icon: "p-1",
        "icon-md": "p-1.5",
        "icon-lg": "size-11",
        "icon-circle": "size-8",
        utility: "px-1.5 py-1.5 text-[9px]",
        none: "",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      selected: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { variant: "primary", size: "sm", class: "py-2.5" },
      { variant: "primary", size: "md", class: "font-medium" },
      { variant: "primary", size: "xl", class: "font-medium" },
      { variant: "secondary", size: "sm", class: "py-2" },
      { variant: "secondary", size: "md", class: "text-[12px] tracking-normal font-medium py-2.5" },
      { variant: "secondary", size: "lg", class: "px-5 py-2.5 text-[11px] tracking-[1.1px]" },
      { variant: "ghost", size: "sm", class: "tracking-widest py-2.5" },
      { variant: "ghost", size: "md", class: "text-[12px] tracking-widest py-3.5" },
      { variant: "ghost", size: "compact", class: "text-[11px] tracking-widest py-2.5" },
      { variant: "destructive", size: "sm", class: "py-2" },
      { variant: "destructive", size: "md", class: "text-[12px] py-2.5" },
      { variant: "link", size: "sm", class: "text-[10px] tracking-widest px-0 py-0" },
      { variant: "link", size: "md", class: "text-[11px] underline px-0 py-0" },
      { variant: "link", size: "none", class: "text-[10px] tracking-widest px-0 py-0" },
      { variant: "nav-back", class: "text-[12px] tracking-widest" },
      { variant: "nav-back", size: "compact", class: "text-[12px] tracking-widest px-3 py-1.5 border border-border ml-0" },
      { variant: "chip", size: "sm", class: "text-[10px] px-2.5 py-1 gap-1" },
      { variant: "chip", size: "md", class: "text-[11px] tracking-widest py-3" },
      { variant: "card", size: "md", class: "px-4 py-3.5 gap-4 text-[13px] text-foreground" },
      { variant: "secondary", size: "compact", class: "text-[11px] tracking-widest font-bold px-3 py-1.5" },
      {
        variant: "select",
        selected: true,
        class: "border-primary bg-primary text-primary-foreground rounded-2xl",
      },
      {
        variant: "select",
        selected: false,
        class: "border-border bg-card active:bg-muted rounded-2xl",
      },
      { variant: "select", size: "md", class: "px-4 py-3.5 gap-3" },
      { variant: "select", size: "sm", class: "px-4 py-3 gap-3 rounded" },
      { variant: "icon", size: "icon-circle", class: "border border-border bg-white text-primary active:bg-muted" },
      { variant: "utility", size: "utility", class: "" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      selected: false,
    },
  },
);

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, selected, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size, fullWidth, selected }), className)}
      {...props}
    />
  ),
);

Button.displayName = "Button";

export { buttonVariants };

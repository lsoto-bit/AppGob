import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center tracking-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary-hover active:bg-primary-pressed disabled:bg-disabled disabled:text-disabled-foreground",
        secondary:
          "border border-primary bg-background text-primary rounded-full font-bold hover:bg-muted hover:text-primary-hover active:bg-background active:text-primary-pressed disabled:border-disabled disabled:text-disabled-foreground",
        ghost:
          "text-primary rounded-full font-bold bg-transparent hover:bg-muted active:bg-transparent disabled:text-disabled-foreground",
        destructive:
          "border border-destructive text-destructive rounded-full hover:bg-muted font-medium disabled:border-disabled disabled:text-disabled-foreground",
        link: "text-primary active:opacity-70 font-normal bg-transparent disabled:text-disabled-foreground",
        icon: "rounded-full active:bg-muted text-muted-foreground shrink-0 bg-transparent",
        "icon-muted":
          "active:bg-muted shrink-0 bg-transparent text-foreground",
        "nav-back":
          "text-primary active:bg-muted rounded-full gap-xs p-2xs -ml-2xs font-normal bg-transparent",
        chip: "rounded-full border border-border bg-white text-foreground active:bg-muted font-normal",
        "filter-chip":
          "rounded-sm border border-primary bg-white text-primary hover:bg-muted font-bold",
        card: "rounded-lg border border-border-muted bg-white active:bg-muted font-bold text-left justify-start w-full",
        select:
          "w-full text-left justify-start items-start border transition-colors font-normal bg-transparent",
        utility:
          "bg-white text-black border border-black rounded-sm font-normal active:opacity-70 shrink-0",
        "list-row":
          "w-full text-left active:bg-muted transition-colors font-normal bg-transparent justify-start",
        "inline-cta":
          "inline-flex items-center gap-2xs text-xs text-primary font-medium bg-transparent justify-start active:opacity-70 px-0 py-0",
      },
      size: {
        sm: "text-sm leading-5 font-medium h-[36px] px-s gap-xs",
        md: "text-sm leading-5 font-medium h-[52px] px-m gap-xs",
        lg: "text-base leading-6 font-medium h-[56px] px-m gap-xs",
        xl: "text-base leading-6 font-medium h-[56px] px-m gap-xs",
        compact: "text-xs min-h-[36px] px-xs gap-2xs",
        submit: "text-base leading-6 font-medium h-[56px] px-m gap-xs",
        icon: "p-2xs",
        "icon-md": "p-xs",
        "icon-lg": "size-11",
        "icon-circle": "size-8",
        utility: "px-2xs py-2xs text-xs",
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
      { variant: "ghost", size: "compact", class: "text-xs" },
      { variant: "link", size: "sm", class: "text-xs px-0 py-0 h-auto min-h-0" },
      { variant: "link", size: "md", class: "text-xs underline px-0 py-0 h-auto min-h-0" },
      { variant: "link", size: "none", class: "text-xs px-0 py-0" },
      { variant: "inline-cta", size: "none", class: "pt-3xs" },
      { variant: "nav-back", class: "text-xs" },
      { variant: "nav-back", size: "compact", class: "text-xs px-xs py-xs border border-border ml-0 h-auto min-h-[36px]" },
      { variant: "chip", size: "sm", class: "text-xs px-xs py-2xs gap-2xs h-auto min-h-[36px]" },
      { variant: "chip", size: "md", class: "text-xs h-auto min-h-[36px]" },
      {
        variant: "filter-chip",
        size: "sm",
        class: "text-sm leading-[1.5] px-xs py-2xs gap-xs h-auto min-h-0",
      },
      { variant: "card", size: "md", class: "px-s py-s gap-s text-xs text-foreground h-auto min-h-0" },
      { variant: "secondary", size: "compact", class: "text-xs font-bold px-xs py-xs" },
      {
        variant: "select",
        selected: true,
        class: "border-primary bg-primary text-primary-foreground rounded-sm",
      },
      {
        variant: "select",
        selected: false,
        class: "border-border bg-card active:bg-muted rounded-sm",
      },
      { variant: "select", size: "md", class: "px-s py-s gap-s h-auto min-h-0" },
      { variant: "select", size: "sm", class: "px-s py-xs gap-s rounded-sm h-auto min-h-0" },
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

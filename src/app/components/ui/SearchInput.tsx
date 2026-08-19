import { forwardRef, type InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Icon } from "./Icon";
import { Button } from "./Button";

const inputVariants = cva(
  "text-foreground placeholder:text-muted-foreground outline-none transition-colors",
  {
    variants: {
      layout: {
        field:
          "w-full pl-10 py-xs rounded-xl border border-foreground bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary",
        inline: "flex-1 min-w-0 bg-transparent text-xs placeholder:text-muted-foreground focus:outline-none",
      },
      padding: {
        md: "pr-xs",
        lg: "pr-s",
      },
    },
    compoundVariants: [
      { layout: "inline", class: "pr-0 py-0 border-0 rounded-none focus:ring-0" },
    ],
    defaultVariants: {
      layout: "field",
      padding: "md",
    },
  },
);

const wrapperVariants = cva("", {
  variants: {
    layout: {
      field: "relative",
      inline:
        "flex items-center gap-xs border border-foreground bg-card px-xs py-xs rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary",
    },
  },
  defaultVariants: {
    layout: "field",
  },
});

export type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> &
  VariantProps<typeof inputVariants> & {
    wrapperClassName?: string;
    onClear?: () => void;
    clearLabel?: string;
  };

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      wrapperClassName,
      layout,
      padding,
      onClear,
      clearLabel,
      value,
      ...props
    },
    ref,
  ) => {
    const showClear = Boolean(onClear && value);

    return (
      <div className={cn(wrapperVariants({ layout }), wrapperClassName)}>
        <Icon
          name="search"
          size={24}
          className={cn(
            "text-foreground shrink-0",
            layout === "inline"
              ? ""
              : "absolute left-xs top-1/2 -translate-y-1/2 pointer-events-none",
          )}
        />
        <input
          ref={ref}
          type="text"
          value={value}
          className={cn(
            inputVariants({ layout, padding }),
            showClear && layout !== "inline" && (clearLabel ? "pr-24" : "pr-10"),
            className,
          )}
          {...props}
        />
        {showClear && (
          <Button
            type="button"
            onClick={onClear}
            variant="icon-muted"
            size="none"
            className={cn(
              "flex items-center gap-2xs text-muted-foreground active:text-foreground",
              layout === "inline" ? "shrink-0" : "absolute right-xs top-1/2 -translate-y-1/2",
            )}
            aria-label={clearLabel ?? "Limpiar búsqueda"}
          >
            <Icon name="close" size={12} />
            {clearLabel && <span className="text-xs">{clearLabel}</span>}
          </Button>
        )}
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";

export { inputVariants as searchInputVariants, wrapperVariants as searchInputWrapperVariants };

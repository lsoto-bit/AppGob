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
          "w-full pl-10 py-3 rounded-[24px] border border-[#333] bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary",
        inline: "flex-1 min-w-0 bg-transparent text-[12px] placeholder:text-muted-foreground focus:outline-none",
      },
      padding: {
        md: "pr-3",
        lg: "pr-4",
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
        "flex items-center gap-2 border border-[#000000] bg-card px-3 py-2 rounded-[24px] focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary",
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
            "text-[#333] shrink-0",
            layout === "inline"
              ? ""
              : "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none",
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
              "flex items-center gap-1 text-muted-foreground active:text-foreground",
              layout === "inline" ? "shrink-0" : "absolute right-3 top-1/2 -translate-y-1/2",
            )}
            aria-label={clearLabel ?? "Limpiar búsqueda"}
          >
            <Icon name="close" size={12} />
            {clearLabel && <span className="text-[12px]">{clearLabel}</span>}
          </Button>
        )}
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";

export { inputVariants as searchInputVariants, wrapperVariants as searchInputWrapperVariants };

import { motion, useReducedMotion } from "motion/react";
import { Button, Icon, IconBox, type IconName } from "./ui";
import { cn } from "../lib/utils";
import { accordionExpandTransition } from "../motion/tokens";

type NavCardRowProps = {
  icon: IconName;
  title: string;
  subtitle?: string;
  onClick: () => void;
  className?: string;
} & (
  | { trailing?: "nav" | "none" }
  | { trailing: "expand"; open: boolean }
);

export function NavCardRow({
  icon,
  title,
  subtitle,
  onClick,
  className,
  ...trailingProps
}: NavCardRowProps) {
  const trailing = trailingProps.trailing ?? "nav";
  const reduceMotion = useReducedMotion();
  const expandTransition = reduceMotion ? { duration: 0 } : accordionExpandTransition;

  return (
    <Button
      type="button"
      onClick={onClick}
      variant="list-row"
      size="none"
      fullWidth
      className={cn(
        "flex items-center gap-4 px-4 pt-[14px] pb-4 active:bg-muted",
        className,
      )}
    >
      <IconBox>
        <Icon name={icon} size={24} className="text-primary" />
      </IconBox>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-base font-medium leading-6 text-foreground">{title}</p>
        {subtitle && (
          <p className="mt-0.5 text-xs font-normal leading-4 text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {trailing === "nav" ? (
        <Icon name="chevron_right" size={20} className="text-primary shrink-0" />
      ) : trailing === "expand" ? (
        <motion.span
          animate={{ rotate: trailingProps.open ? 180 : 0 }}
          transition={expandTransition}
          className="inline-flex shrink-0"
        >
          <Icon name="expand_more" size={20} className="text-primary" />
        </motion.span>
      ) : null}
    </Button>
  );
}

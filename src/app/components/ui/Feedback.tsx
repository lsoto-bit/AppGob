import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Icon } from "./Icon";

const VARIANT_STYLES = {
  warning: {
    container: "bg-warning-tertiary",
    text: "text-warning",
    icon: "warning" as const,
    iconClass: "text-warning-icon",
  },
  info: {
    container: "bg-info-subtle",
    text: "text-info",
    icon: "info" as const,
    iconClass: "text-info",
  },
  success: {
    container: "bg-positive-subtle",
    text: "text-positive",
    icon: "check_circle" as const,
    iconClass: "text-positive",
  },
  danger: {
    container: "bg-destructive-subtle",
    text: "text-destructive",
    icon: "warning" as const,
    iconClass: "text-destructive",
  },
};

type FeedbackVariant = keyof typeof VARIANT_STYLES;

type FeedbackProps = {
  children: ReactNode;
  variant?: FeedbackVariant;
  className?: string;
};

export function Feedback({ children, variant = "warning", className }: FeedbackProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div
      role="note"
      className={cn(
        "flex w-full items-start gap-xs rounded-md px-xs py-xs",
        styles.container,
        className,
      )}
    >
      <Icon name={styles.icon} size={16} className={cn("shrink-0", styles.iconClass)} />
      <p className={cn("text-xs leading-4", styles.text)}>{children}</p>
    </div>
  );
}

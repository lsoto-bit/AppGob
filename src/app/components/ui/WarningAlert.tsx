import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Icon } from "./Icon";

type WarningAlertProps = {
  children: ReactNode;
  className?: string;
};

/** Inline warning banner — matches Figma Alert (Alerta) / warning variant. */
export function WarningAlert({ children, className }: WarningAlertProps) {
  return (
    <div
      role="note"
      className={cn(
        "w-full flex items-start gap-xs rounded-md bg-warning-tertiary px-s py-xs",
        className,
      )}
    >
      <Icon name="warning" size={16} className="shrink-0 text-warning-icon" />
      <p className="text-xs text-foreground leading-normal">{children}</p>
    </div>
  );
}

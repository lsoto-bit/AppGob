import type { ReactNode } from "react";
import { cn } from "../lib/utils";
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
        "w-full flex items-start gap-2 rounded-[8px] bg-warning-tertiary px-4 py-3",
        className,
      )}
    >
      <Icon name="warning" size={16} className="shrink-0 text-warning-icon" />
      <p className="text-[12px] text-foreground leading-normal">{children}</p>
    </div>
  );
}

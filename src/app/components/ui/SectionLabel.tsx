import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("type-label-section text-muted-foreground", className)}>
      {children}
    </p>
  );
}

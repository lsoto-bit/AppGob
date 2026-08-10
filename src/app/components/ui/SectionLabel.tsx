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
    <p className={cn("text-[12px] text-[#666] tracking-[1px]", className)}>
      {children}
    </p>
  );
}

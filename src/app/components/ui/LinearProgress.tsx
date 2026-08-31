import { cn } from "../../lib/utils";

export function LinearProgress({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("relative h-[29px] w-full", className)}>
      <div className="absolute inset-x-0 top-0 h-[2px] bg-border" />
      <div
        className="absolute left-0 top-0 h-[2px] bg-primary"
        style={{ width: `${clamped}%` }}
      />
      <p className="absolute left-0 top-[18.5px] -translate-y-1/2 text-sm font-medium leading-6 text-muted-foreground">
        {clamped}%
      </p>
    </div>
  );
}

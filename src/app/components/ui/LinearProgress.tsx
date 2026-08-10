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
      <div className="absolute inset-x-0 top-0 h-[2px] bg-[#b3b3b3]" />
      <div
        className="absolute left-0 top-0 h-[2px] bg-[#0f5ac4]"
        style={{ width: `${clamped}%` }}
      />
      <p className="absolute left-0 top-[18.5px] -translate-y-1/2 text-[14px] font-bold leading-[1.5] text-[#666]">
        {clamped}%
      </p>
    </div>
  );
}

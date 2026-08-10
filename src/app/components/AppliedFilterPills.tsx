import { Icon, Button } from "./ui";
import { cn } from "../lib/utils";

export type AppliedFilter = {
  id: string;
  label: string;
  onRemove: () => void;
};

export function AppliedFilterPills({
  filters,
  className,
}: {
  filters: AppliedFilter[];
  className?: string;
}) {
  if (filters.length === 0) return null;

  return (
    <div
      className={cn(
        "shrink-0 px-4 py-2",
        className ?? "border-b border-border bg-card",
      )}
    >
      <div className="flex flex-wrap gap-2">
        {filters.map(({ id, label, onRemove }) => (
          <Button
            key={id}
            type="button"
            onClick={onRemove}
            variant="chip"
            size="sm"
            className="gap-1 border-[#ccc] text-[#333]"
          >
            {label}
            <Icon name="close" size={12} className="text-muted-foreground" />
          </Button>
        ))}
      </div>
    </div>
  );
}

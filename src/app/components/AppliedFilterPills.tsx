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
            variant="filter-chip"
            size="sm"
          >
            {label}
            <Icon name="close" size={16} className="text-[#00268d]" />
          </Button>
        ))}
      </div>
    </div>
  );
}

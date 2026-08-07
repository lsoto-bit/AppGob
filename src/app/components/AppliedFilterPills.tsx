import { Icon, Button } from "./ui";

export type AppliedFilter = {
  id: string;
  label: string;
  onRemove: () => void;
};

export function AppliedFilterPills({ filters }: { filters: AppliedFilter[] }) {
  if (filters.length === 0) return null;

  return (
    <div className="px-4 py-2 border-b border-border bg-card shrink-0">
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

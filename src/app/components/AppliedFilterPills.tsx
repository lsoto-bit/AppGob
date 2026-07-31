import { Icon } from "./Icon";

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
          <button
            key={id}
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#ccc] bg-white text-[10px] text-[#333] active:bg-gray-50"
          >
            {label}
            <Icon name="close" size={12} className="text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}

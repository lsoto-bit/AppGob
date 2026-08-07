import { Button, Icon, IconBox, type IconName } from "./ui";
import { cn } from "../lib/utils";

type NavCardRowProps = {
  icon: IconName;
  title: string;
  subtitle?: string;
  onClick: () => void;
  className?: string;
} & (
  | { trailing?: "nav" }
  | { trailing: "expand"; open: boolean }
);

export function NavCardRow({
  icon,
  title,
  subtitle,
  onClick,
  className,
  ...trailingProps
}: NavCardRowProps) {
  const trailing = trailingProps.trailing ?? "nav";

  return (
    <Button
      type="button"
      onClick={onClick}
      variant="list-row"
      size="none"
      fullWidth
      className={cn(
        "flex items-center gap-4 px-4 py-3.5 active:bg-gray-50",
        className,
      )}
    >
      <IconBox>
        <Icon name={icon} size={16} className="text-[#0f5ac4]" />
      </IconBox>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-[13px] text-[#333]">{title}</p>
        {subtitle && (
          <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      {trailing === "nav" ? (
        <Icon name="chevron_right" size={14} className="text-[#0f5ac4] shrink-0" />
      ) : trailingProps.open ? (
        <Icon name="expand_less" size={14} className="text-[#0f5ac4] shrink-0" />
      ) : (
        <Icon name="expand_more" size={14} className="text-muted-foreground shrink-0" />
      )}
    </Button>
  );
}

import { Icon, Button, Badge } from "./ui";
import { isBenefitAviso, type Notification } from "../notificationsData";
import { AVISO_CATEGORY_BADGE, AVISO_CATEGORY_LABEL } from "../notificationCategories";
import { cn } from "../lib/utils";

export function AvisoItem({
  notif,
  onOpen,
  compact = false,
  grouped = false,
  isFirst = false,
  isLast = false,
}: {
  notif: Notification;
  onOpen: () => void;
  compact?: boolean;
  grouped?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  const isBenefit = isBenefitAviso(notif);
  const categoryBadge = AVISO_CATEGORY_BADGE[notif.category];
  const isUnread = !notif.read;

  const content = (
    <div className="flex w-full flex-col gap-2 px-4 py-4">
      <div className="flex w-full items-center gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <p className="type-critical-micro shrink-0 leading-[18px]">{notif.date}</p>
          <Badge size="sm" bg={categoryBadge.bg} color={categoryBadge.color}>
            {AVISO_CATEGORY_LABEL[notif.category]}
          </Badge>
        </div>
        {isUnread && (
          <span className="shrink-0 text-[12px] font-bold tracking-[0.9px] text-[#0046a8]">
            ● No leído
          </span>
        )}
      </div>

      <p
        className={cn(
          compact ? "text-[12px] leading-[1.2]" : "text-[16px] leading-[1.5]",
          "text-[#333]",
          isUnread ? "font-bold" : "font-normal",
        )}
      >
        {notif.title}
      </p>

      {!compact && (
        <p className="line-clamp-2 text-[12px] leading-[1.5] text-[#808080]">{notif.body}</p>
      )}

      {!compact && (
        <Button
          type="button"
          onClick={onOpen}
          variant="inline-cta"
          size="none"
          className="self-start pt-0.5 text-[11px]"
        >
          {isBenefit ? "Conoce tu beneficio" : "Ver más detalles"}
          <Icon name="chevron_right" size={14} />
        </Button>
      )}
    </div>
  );

  const accentWrapper = (
    <div
      className={cn(
        "w-full overflow-hidden bg-white",
        isUnread ? "border-l-4 border-l-[#0046a8]" : "border-l border-l-[#e6e6e6] pl-px",
        grouped && isFirst && "rounded-t-[8px]",
        grouped && isLast && "rounded-b-[8px]",
      )}
    >
      {content}
    </div>
  );

  if (compact && grouped) {
    return (
      <Button
        type="button"
        onClick={onOpen}
        variant="list-row"
        size="none"
        fullWidth
        className={cn(
          "rounded-none border-0 bg-transparent p-0 active:bg-gray-50",
          !isLast && "border-b border-[#ccc]",
        )}
      >
        {accentWrapper}
      </Button>
    );
  }

  if (grouped) {
    return (
      <div className={cn("w-full", !isLast && "border-b border-[#ccc]")}>{accentWrapper}</div>
    );
  }

  const standaloneCard = (
    <div
      className={cn(
        "w-full overflow-hidden rounded-[8px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2)]",
        isUnread ? "border-l-4 border-l-[#0046a8]" : "border-l border-l-[#e6e6e6] pl-px",
      )}
    >
      {content}
    </div>
  );

  if (compact) {
    return (
      <Button
        type="button"
        onClick={onOpen}
        variant="list-row"
        size="none"
        fullWidth
        className="rounded-none p-0 active:bg-transparent active:opacity-90"
      >
        {standaloneCard}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      onClick={onOpen}
      variant="list-row"
      size="none"
      fullWidth
      className="rounded-none p-0 active:bg-gray-50"
    >
      {standaloneCard}
    </Button>
  );
}

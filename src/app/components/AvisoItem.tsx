import { Icon, Button, Badge } from "./ui";
import { isBenefitAviso, type Notification } from "../notificationsData";
import { AVISO_CATEGORY_BADGE, AVISO_CATEGORY_LABEL } from "../notificationCategories";

export function AvisoItem({
  notif,
  onOpen,
  compact = false,
}: {
  notif: Notification;
  onOpen: () => void;
  compact?: boolean;
}) {
  const isBenefit = isBenefitAviso(notif);
  const categoryBadge = AVISO_CATEGORY_BADGE[notif.category];
  const isUnread = !notif.read;

  const card = (
    <div
      className={`w-full bg-white flex flex-col overflow-hidden rounded-[4px] ${
        isUnread
          ? "border-l-4 border-l-[#0046a8] pl-0"
          : "border-l border-l-[#e6e6e6] pl-px"
      }`}
    >
      <div className="border border-[#e6e6e6] border-l-0 rounded-br-[4px] rounded-tr-[4px]">
        <div className="flex flex-col pl-4 pr-4 py-4 gap-2">
          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-1 min-w-0 items-center gap-2">
              <p className="type-critical-micro leading-6 shrink-0">
                {notif.date}
              </p>
              <Badge
                size="xs"
                bg={categoryBadge.bg}
                color={categoryBadge.color}
              >
                {AVISO_CATEGORY_LABEL[notif.category]}
              </Badge>
            </div>
            {isUnread && (
              <span className="text-[12px] tracking-[0.9px] text-[#0046a8] font-bold shrink-0">
                ● No leído
              </span>
            )}
          </div>

          <p
            className={`text-[13px] text-[#333] leading-[17.875px] ${
              isUnread ? "font-bold" : "font-normal"
            }`}
          >
            {notif.title}
          </p>

          {!compact && (
            <p className="text-[11px] text-[#808080] leading-[17.875px] line-clamp-2">
              {notif.body}
            </p>
          )}

          {!compact && (
            <Button
              type="button"
              onClick={onOpen}
              variant="inline-cta"
              size="none"
              className="self-start"
            >
              {isBenefit ? "Conoce tu beneficio" : "Ver más detalles"}
              <Icon name="chevron_right" size={14} />
            </Button>
          )}
        </div>
      </div>
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
        className="active:opacity-90 active:bg-transparent"
      >
        {card}
      </Button>
    );
  }

  return card;
}

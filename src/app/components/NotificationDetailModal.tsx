import { useEffect, useState } from "react";
import { BottomSheet } from "./BottomSheet";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { NOTIF_TYPE_BADGE, NOTIF_TYPE_LABEL } from "../notificationCategories";
import type { Notification } from "../notificationsData";

export function NotificationDetailModal({
  open,
  notif,
  onClose,
  badgeLabel,
  badgeStyle,
  primaryActionLabel,
  onPrimaryAction,
  showTypeBadge = true,
}: {
  open: boolean;
  notif: Notification | null;
  onClose: () => void;
  badgeLabel?: string;
  badgeStyle?: { bg: string; color: string };
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  showTypeBadge?: boolean;
}) {
  const [displayNotif, setDisplayNotif] = useState<Notification | null>(notif);

  useEffect(() => {
    if (notif) setDisplayNotif(notif);
  }, [notif]);

  if (!displayNotif) return null;

  const badge = badgeStyle ?? NOTIF_TYPE_BADGE[displayNotif.type];
  const label = badgeLabel ?? NOTIF_TYPE_LABEL[displayNotif.type];

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      onExitComplete={() => setDisplayNotif(null)}
      zIndexClassName="z-[210]"
      backdropClassName="bg-[rgba(51,51,51,0.4)]"
      panelClassName="max-h-[85vh] bg-white rounded-t-2xl border-t border-[#ccc] flex flex-col"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e6e6e6] shrink-0">
        {showTypeBadge ? (
          <span
            className="rounded-[4px] px-2 py-[2px] text-[10px] font-bold leading-[150%]"
            style={{ background: badge.bg, color: badge.color }}
          >
            {label}
          </span>
        ) : (
          <span className="text-[10px] text-[#808080]">Notificación oficial</span>
        )}
        <Button onClick={onClose} variant="icon-muted" size="icon" aria-label="Cerrar">
          <Icon name="close" size={15} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        <div>
          <p className="text-[10px] text-[#808080]">{displayNotif.date}</p>
          <h2
            className="text-[#333] text-[18px] leading-[27px] mt-1"
            style={{ fontFamily: "'Roboto Slab', sans-serif" }}
          >
            {displayNotif.title}
          </h2>
        </div>

        <p className="text-[13px] text-[#333] leading-relaxed">{displayNotif.body}</p>

        <div className="flex flex-col gap-3">
          {displayNotif.detail.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-[12px] text-[#666] leading-[19.5px]">
              {paragraph}
            </p>
          ))}
        </div>

        {onPrimaryAction ? (
          <Button
            onClick={onPrimaryAction}
            variant="secondary"
            size="md"
            fullWidth
            className="justify-between text-left font-bold"
          >
            <span className="text-[12px] leading-snug">
              {primaryActionLabel ?? displayNotif.moreInfo.label}
            </span>
            <Icon name="open_in_new" size={16} className="shrink-0" />
          </Button>
        ) : (
          <a
            href={displayNotif.moreInfo.url}
            onClick={(e) => e.preventDefault()}
            className="flex items-center justify-between gap-3 px-4 py-3 border border-primary rounded-full text-primary active:bg-blue-50 transition-colors"
          >
            <span className="text-[12px] font-bold leading-snug">{displayNotif.moreInfo.label}</span>
            <Icon name="open_in_new" size={16} className="shrink-0" />
          </a>
        )}
      </div>

      <div className="px-4 py-4 border-t border-[#e6e6e6] shrink-0">
        <Button onClick={onClose} variant="primary" size="md" fullWidth className="text-[14px]">
          Cerrar
        </Button>
      </div>
    </BottomSheet>
  );
}

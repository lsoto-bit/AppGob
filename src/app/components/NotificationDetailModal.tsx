import { useEffect, useState } from "react";
import { BottomSheet } from "./BottomSheet";
import { Icon, Button, Badge } from "./ui";
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
  secondaryActionLabel,
  onSecondaryAction,
  tertiaryActionLabel,
  onTertiaryAction,
  showTypeBadge = true,
}: {
  open: boolean;
  notif: Notification | null;
  onClose: () => void;
  badgeLabel?: string;
  badgeStyle?: { bg: string; color: string };
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  tertiaryActionLabel?: string;
  onTertiaryAction?: () => void;
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
      panelClassName="max-h-[85vh] bg-white rounded-t-2xl border-t border-border flex flex-col"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-muted shrink-0">
        {showTypeBadge ? (
          <Badge size="md" bg={badge.bg} color={badge.color}>
            {label}
          </Badge>
        ) : (
          <span className="text-xs text-muted-foreground">Notificación oficial</span>
        )}
        <Button onClick={onClose} variant="icon-muted" size="icon" aria-label="Cerrar">
          <Icon name="close" size={15} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        <div>
          <p className="type-critical-micro">{displayNotif.date}</p>
          <h2
            className="text-foreground text-xl leading-[28px] mt-1"
            style={{ fontFamily: "'Roboto Slab', sans-serif" }}
          >
            {displayNotif.title}
          </h2>
        </div>

        <p className="text-xs text-foreground leading-relaxed">{displayNotif.body}</p>

        <div className="flex flex-col gap-3">
          {displayNotif.detail.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-xs text-muted-foreground leading-[20px]">
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
            className="justify-between text-left"
          >
            <span className="text-xs leading-snug">
              {primaryActionLabel ?? displayNotif.moreInfo.label}
            </span>
            <Icon name="open_in_new" size={16} className="shrink-0" />
          </Button>
        ) : (
          <a
            href={displayNotif.moreInfo.url}
            onClick={(e) => e.preventDefault()}
            className="flex items-center justify-between gap-3 px-4 py-3 border border-primary rounded-full text-primary active:bg-muted transition-colors"
          >
            <span className="text-xs font-medium leading-snug">{displayNotif.moreInfo.label}</span>
            <Icon name="open_in_new" size={16} className="shrink-0" />
          </a>
        )}

        {onSecondaryAction && (
          <Button
            onClick={onSecondaryAction}
            variant="inline-cta"
            size="none"
            className="self-start gap-1 py-0"
          >
            {secondaryActionLabel ?? "Ver en Mis beneficios"}
            <Icon name="chevron_right" size={14} />
          </Button>
        )}

        {onTertiaryAction && (
          <Button
            onClick={onTertiaryAction}
            variant="inline-cta"
            size="none"
            className="self-start gap-1 py-0"
          >
            {tertiaryActionLabel ?? "Ver en Notificaciones"}
            <Icon name="chevron_right" size={14} />
          </Button>
        )}
      </div>

      <div className="px-4 py-4 border-t border-border-muted shrink-0">
        <Button onClick={onClose} variant="primary" size="md" fullWidth>
          Cerrar
        </Button>
      </div>
    </BottomSheet>
  );
}

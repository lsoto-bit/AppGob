import { X, ExternalLink } from "lucide-react";
import { NOTIF_TYPE_BADGE, NOTIF_TYPE_LABEL } from "../notificationCategories";
import type { Notification } from "../notificationsData";

export function NotificationDetailModal({
  notif,
  onClose,
  badgeLabel,
  badgeStyle,
  primaryActionLabel,
  onPrimaryAction,
  showTypeBadge = true,
}: {
  notif: Notification;
  onClose: () => void;
  badgeLabel?: string;
  badgeStyle?: { bg: string; color: string };
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  showTypeBadge?: boolean;
}) {
  const badge = badgeStyle ?? NOTIF_TYPE_BADGE[notif.type];
  const label = badgeLabel ?? NOTIF_TYPE_LABEL[notif.type];

  return (
    <div
      className="fixed inset-0 z-[210] flex items-end justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[rgba(51,51,51,0.4)]" />
      <div
        className="relative w-full max-w-[390px] max-h-[85vh] bg-white rounded-t-2xl border-t border-[#ccc] flex flex-col"
        onClick={(e) => e.stopPropagation()}
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
          <button
            onClick={onClose}
            className="p-1.5 text-[#808080] active:bg-gray-100 rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
          <div>
            <p className="text-[10px] text-[#808080]">{notif.date}</p>
            <h2
              className="text-[#333] text-[18px] leading-[27px] mt-1"
              style={{ fontFamily: "'Roboto Slab', sans-serif" }}
            >
              {notif.title}
            </h2>
          </div>

          <p className="text-[13px] text-[#333] leading-relaxed">{notif.body}</p>

          <div className="flex flex-col gap-3">
            {notif.detail.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-[12px] text-[#666] leading-[19.5px]">
                {paragraph}
              </p>
            ))}
          </div>

          {onPrimaryAction ? (
            <button
              onClick={onPrimaryAction}
              className="flex items-center justify-between gap-3 px-4 py-3 border border-[#0046a8] rounded-full text-[#0046a8] active:bg-blue-50 transition-colors w-full text-left"
            >
              <span className="text-[12px] font-bold leading-snug">
                {primaryActionLabel ?? notif.moreInfo.label}
              </span>
              <ExternalLink size={16} strokeWidth={1.5} className="shrink-0" />
            </button>
          ) : (
            <a
              href={notif.moreInfo.url}
              onClick={(e) => e.preventDefault()}
              className="flex items-center justify-between gap-3 px-4 py-3 border border-[#0046a8] rounded-full text-[#0046a8] active:bg-blue-50 transition-colors"
            >
              <span className="text-[12px] font-bold leading-snug">{notif.moreInfo.label}</span>
              <ExternalLink size={16} strokeWidth={1.5} className="shrink-0" />
            </a>
          )}
        </div>

        <div className="px-4 py-4 border-t border-[#e6e6e6] shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#0046a8] text-white rounded-full text-[14px] font-bold active:opacity-80 transition-opacity"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

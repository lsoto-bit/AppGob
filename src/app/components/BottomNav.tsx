import { useState } from "react";
import { Icon, type IconName } from "./Icon";
import { BottomSheet } from "./BottomSheet";
import { BUZN_NOTIFICATIONS, hasUnreadBuzon } from "../notificationsData";

export type Page =
  | "home"
  | "notifications"
  | "alerts"
  | "assistance"
  | "documents"
  | "profile"
  | "lugares"
  | "pago-deudas"
  | "settings"
  | "autorizaciones";

export type BottomNavTab = "home" | "notifications" | "documents" | "profile" | "more";

type NavItem =
  | {
      kind: "page";
      icon: IconName;
      label: string;
      tab: BottomNavTab;
      page: Page;
      showDotBadge?: boolean;
    }
  | {
      kind: "more";
      icon: IconName;
      label: string;
      tab: BottomNavTab;
    };

const NAV_ITEMS: NavItem[] = [
  { kind: "page", icon: "home", label: "Inicio", tab: "home", page: "home" },
  {
    kind: "page",
    icon: "mail",
    label: "Notificaciones",
    tab: "notifications",
    page: "notifications",
    showDotBadge: true,
  },
  { kind: "page", icon: "description", label: "Documentos", tab: "documents", page: "documents" },
  { kind: "page", icon: "person", label: "Mi perfil", tab: "profile", page: "profile" },
  { kind: "more", icon: "more_horiz", label: "Más", tab: "more" },
];

const MORE_MENU_ITEMS: { icon: IconName; label: string; page: Page }[] = [
  { icon: "domain", label: "Lugares de atención del Estado", page: "lugares" },
  { icon: "account_balance", label: "Pago de deudas con el Estado", page: "pago-deudas" },
  { icon: "verified_user", label: "Mi actividad ClaveÚnica", page: "autorizaciones" },
  { icon: "support_agent", label: "Asistencia", page: "assistance" },
];

function MoreMenuSheet({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
}) {
  return (
    <BottomSheet open={open} onClose={onClose} panelClassName="rounded-t-[16px] bg-white">
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b border-[#ccc] px-4 pb-[13px] pt-3">
          <span className="text-[10px] text-[#808080]">Más</span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-[37px] w-[30px] items-center justify-center rounded-full text-[#0046a8]"
            aria-label="Cerrar"
          >
            <Icon name="close" size={18} className="text-[#0046a8]" />
          </button>
        </div>
        <div className="flex flex-col pb-6">
          {MORE_MENU_ITEMS.map(({ icon, label, page }) => (
            <button
              key={page}
              type="button"
              onClick={() => {
                onNavigate(page);
                onClose();
              }}
              className="flex w-full items-center gap-4 border-b border-[#ccc] px-4 pb-[15px] pt-[14px] text-left"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#f2f2f2]">
                <Icon name={icon} size={16} className="text-[#0f5ac4]" />
              </div>
              <span className="text-[13px] font-bold leading-6 text-[#333]">{label}</span>
              <span className="ml-auto flex shrink-0 items-center">
                <Icon name="chevron_right" size={14} className="text-[#0f5ac4]" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}

export function BottomNav({
  active,
  onNavigate,
  buzonHasUnread = hasUnreadBuzon(BUZN_NOTIFICATIONS),
}: {
  active: BottomNavTab;
  onNavigate: (page: Page) => void;
  buzonHasUnread?: boolean;
}) {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <nav
        data-bottom-nav
        className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-[390px] -translate-x-1/2 items-center rounded-t-[8px] border-t border-[#e6e6e6] bg-[#0046a8]"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.tab;

          return (
            <button
              key={item.tab}
              type="button"
              onClick={() => {
                if (item.kind === "more") {
                  setMoreOpen(true);
                  return;
                }
                onNavigate(item.page);
              }}
              className="relative flex min-w-0 flex-1 flex-col items-center gap-1 py-3 text-[10px] tracking-[0.9px] text-white"
            >
              <Icon name={item.icon} size={24} filled={isActive} className="text-white" />
              <span className={`text-center leading-tight ${isActive ? "font-medium" : "font-normal"}`}>
                {item.label}
              </span>
              <span
                className={`h-1 w-5 rounded-[24px] ${isActive ? "bg-white" : "bg-transparent"}`}
                aria-hidden
              />
              {item.kind === "page" && item.showDotBadge && buzonHasUnread && (
                <span
                  className="absolute left-1/2 top-[10px] ml-2 size-2 rounded-full bg-[#fdc700]"
                  aria-label="Notificación nueva sin leer"
                />
              )}
            </button>
          );
        })}
      </nav>

      <MoreMenuSheet
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
}

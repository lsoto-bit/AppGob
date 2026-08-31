import { useState } from "react";
import { Icon, type IconName, Button, IconBox } from "./ui";
import { BottomSheet } from "./BottomSheet";
import { BUZN_NOTIFICATIONS, hasUnreadBuzon } from "../notificationsData";

export type Page =
  | "home"
  | "notifications"
  | "alerts"
  | "assistance"
  | "documents"
  | "profile"
  | "beneficios"
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
      tourId?: string;
    }
  | {
      kind: "more";
      icon: IconName;
      label: string;
      tab: BottomNavTab;
      tourId?: string;
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
    tourId: "tour-nav-notifications",
  },
  {
    kind: "page",
    icon: "wallet",
    label: "Documentos",
    tab: "documents",
    page: "documents",
    tourId: "tour-nav-documents",
  },
  { kind: "page", icon: "person", label: "Mi perfil", tab: "profile", page: "profile", tourId: "tour-nav-profile" },
  { kind: "more", icon: "more_horiz", label: "Más", tab: "more", tourId: "tour-nav-more" },
];

const MORE_MENU_ITEMS: { icon: IconName; label: string; page: Page }[] = [
  { icon: "redeem", label: "Mis beneficios", page: "beneficios" },
  { icon: "domain", label: "Sucursales de atención", page: "lugares" },
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
        <div className="flex items-center justify-between border-b border-border px-4 pb-[12px] pt-3">
          <span className="text-xs text-muted-foreground">Más</span>
          <Button
            type="button"
            onClick={onClose}
            variant="icon"
            size="none"
            className="flex h-[38px] w-[30px] items-center justify-center rounded-full text-primary bg-transparent"
            aria-label="Cerrar"
          >
            <Icon name="close" size={18} className="text-primary" />
          </Button>
        </div>
        <div className="flex flex-col pb-6">
          {MORE_MENU_ITEMS.map(({ icon, label, page }) => (
            <Button
              key={page}
              type="button"
              onClick={() => {
                onNavigate(page);
                onClose();
              }}
              variant="list-row"
              size="none"
              fullWidth
              className="flex items-center gap-4 border-b border-border px-4 pb-[16px] pt-[14px]"
            >
              <IconBox>
                <Icon name={icon} size={24} className="text-primary" />
              </IconBox>
              <span className="text-base font-medium leading-6 text-foreground">{label}</span>
              <span className="ml-auto flex shrink-0 items-center">
                <Icon name="chevron_right" size={20} className="text-primary shrink-0" />
              </span>
            </Button>
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
        className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-[390px] -translate-x-1/2 items-center border-t border-border-muted bg-primary"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.tab;

          return (
            <button
              key={item.tab}
              type="button"
              data-tour-id={item.tourId}
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
                className={`h-1 w-5 rounded-[24px] ${isActive ? "bg-primary-foreground" : "bg-transparent"}`}
                aria-hidden
              />
              {item.kind === "page" && item.showDotBadge && buzonHasUnread && (
                <span
                  className="absolute left-1/2 top-[10px] ml-2 size-2 rounded-full bg-notice"
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

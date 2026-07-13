import { Home, Building2, Headphones, FileText, Mail, User } from "lucide-react";

export const NOTIFICATION_BADGE_COUNT = 7;

export type Page =
  | "home"
  | "notifications"
  | "notification-settings"
  | "assistance"
  | "documents"
  | "profile"
  | "lugares"
  | "pago-deudas"
  | "settings"
  | "autorizaciones";

const NAV_ITEMS: {
  icon: React.ElementType;
  label: string;
  page: Page;
  showBadge?: boolean;
}[] = [
  { icon: Home, label: "Inicio", page: "home" },
  { icon: FileText, label: "Mis docs", page: "documents" },
  { icon: Building2, label: "Lugares", page: "lugares" },
  { icon: Mail, label: "Buzón", page: "notifications", showBadge: true },
  { icon: Headphones, label: "Asistencia", page: "assistance" },
  { icon: User, label: "Mi perfil", page: "profile" },
];

export function BottomNav({
  active,
  onNavigate,
  notificationCount = NOTIFICATION_BADGE_COUNT,
}: {
  active: Page;
  onNavigate: (page: Page) => void;
  notificationCount?: number;
}) {
  return (
    <nav className="border-t border-[#e6e6e6] bg-white flex items-center sticky bottom-0 shrink-0">
      {NAV_ITEMS.map(({ icon: Icon, label, page, showBadge }, index) => {
        const isActive = active === page;
        return (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={`relative flex flex-col items-center gap-1 text-[9px] tracking-[0.9px] font-bold transition-colors ${
              index === 0 ? "shrink-0 w-[65px]" : "flex-1 min-w-0"
            } ${
              isActive
                ? "text-[#0046a8] border-t-[2px] border-[#0046a8] pt-[14px] pb-3 -mt-px"
                : "text-[#808080] py-3"
            }`}
          >
            <Icon size={18} strokeWidth={1.5} />
            <span className="text-center leading-tight px-0.5">{label}</span>
            {showBadge && notificationCount > 0 && (
              <span className="absolute top-[9px] left-1/2 ml-2 w-4 h-4 bg-[#fdc700] text-[#101828] text-[9px] font-bold rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

import { Home, Building2, Headphones, FileText, Mail, User } from "lucide-react";
import { BUZN_NOTIFICATIONS, hasUnreadBuzon } from "../notificationsData";

export type Page =
  | "home"
  | "notifications"
  | "alerts"
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
  showDotBadge?: boolean;
}[] = [
  { icon: Home, label: "Inicio", page: "home" },
  { icon: FileText, label: "Mis docs", page: "documents" },
  { icon: Building2, label: "Lugares", page: "lugares" },
  { icon: Mail, label: "Buzón", page: "notifications", showDotBadge: true },
  { icon: Headphones, label: "Asistencia", page: "assistance" },
  { icon: User, label: "Mi perfil", page: "profile" },
];

export function BottomNav({
  active,
  onNavigate,
  buzonHasUnread = hasUnreadBuzon(BUZN_NOTIFICATIONS),
}: {
  active: Page;
  onNavigate: (page: Page) => void;
  buzonHasUnread?: boolean;
}) {
  return (
    <nav className="border-t border-[#e6e6e6] bg-white flex items-center sticky bottom-0 shrink-0">
      {NAV_ITEMS.map(({ icon: Icon, label, page, showDotBadge }, index) => {
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
            {showDotBadge && buzonHasUnread && (
              <span
                className="absolute top-[9px] left-1/2 ml-2 w-2 h-2 bg-[#fdc700] rounded-full"
                aria-label="Novedad en el buzón"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}

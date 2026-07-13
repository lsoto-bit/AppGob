import { Home, Building2, LayoutGrid, Headphones, FileText } from "lucide-react";

export type Page =
  | "home"
  | "notifications"
  | "notification-settings"
  | "assistance"
  | "documents"
  | "profile"
  | "lugares"
  | "servicios"
  | "autorizaciones";

const NAV_ITEMS: { icon: React.ElementType; label: string; page: Page }[] = [
  { icon: Home, label: "Inicio", page: "home" },
  { icon: FileText, label: "Mis docs", page: "documents" },
  { icon: Building2, label: "Lugares", page: "lugares" },
  { icon: LayoutGrid, label: "Servicios", page: "servicios" },
  { icon: Headphones, label: "Asistencia", page: "assistance" },
];

export function BottomNav({
  active,
  onNavigate,
}: {
  active: Page;
  onNavigate: (page: Page) => void;
}) {
  return (
    <nav className="border-t border-[#e6e6e6] bg-white grid grid-cols-5 sticky bottom-0 shrink-0">
      {NAV_ITEMS.map(({ icon: Icon, label, page }) => {
        const isActive = active === page;
        return (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={`flex flex-col items-center gap-1 py-3 text-[9px] tracking-widest transition-colors ${
              isActive
                ? "text-primary border-t-2 border-primary -mt-px"
                : "text-muted-foreground"
            }`}
          >
            <Icon size={18} strokeWidth={1.5} />
            <span className="text-center leading-tight px-0.5">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

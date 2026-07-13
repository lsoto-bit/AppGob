import { useState } from "react";
import {
  ArrowLeft,
  Search,
  Settings2,
  SlidersHorizontal,
  X,
  Landmark,
  MessageCircle,
} from "lucide-react";
import { BottomNav, Page } from "./BottomNav";

export type NotifType = "oficial" | "aviso";

export interface Notification {
  id: number;
  type: NotifType;
  title: string;
  body: string;
  date: string;
  read: boolean;
}

const ALL_NOTIFICATIONS: Notification[] = [
  {
    id: 11,
    type: "oficial",
    title: "Beneficio disponible: Cupón de Gas Licuado",
    body: "Según tu perfil socioeconómico, puedes acceder al Cupón de Gas Licuado del mes de julio. Revisa los requisitos y solicítalo antes del 31 de julio.",
    date: "14 jun 2026",
    read: false,
  },
  {
    id: 12,
    type: "oficial",
    title: "Beneficio disponible: Bono Invierno 2026",
    body: "El Bono Invierno 2026 está disponible para tu hogar según tu Registro Social de Hogares. Accede desde la sección de beneficios para revisar el monto y condiciones.",
    date: "13 jun 2026",
    read: false,
  },
  {
    id: 1,
    type: "oficial",
    title: "Resolución N° 4821/2026",
    body: "Se notifica la resolución de habilitación comercial correspondiente al expediente 2026-HB-0034.",
    date: "12 jun 2026",
    read: false,
  },
  {
    id: 2,
    type: "oficial",
    title: "Citación judicial — 3.° Juzgado Civil de Santiago",
    body: "Se le cita a comparecer el 20 de junio de 2026 a las 09:00 hrs en Av. Libertador Bernardo O'Higgins 1449.",
    date: "11 jun 2026",
    read: false,
  },
  {
    id: 3,
    type: "oficial",
    title: "Multa de tránsito — Expediente 7743",
    body: "Se registró una infracción de tránsito el 08/06/2026. Tiene 15 días hábiles para impugnar.",
    date: "10 jun 2026",
    read: true,
  },
  {
    id: 4,
    type: "aviso",
    title: "Trámite aprobado",
    body: "Su solicitud de certificado de residencia (Exp. 2026-CR-0091) fue aprobada y está disponible para descarga.",
    date: "10 jun 2026",
    read: false,
  },
  {
    id: 5,
    type: "aviso",
    title: "Documentación incompleta",
    body: "Su trámite de renovación de licencia de conducir requiere adjuntar el certificado médico actualizado.",
    date: "05 jun 2026",
    read: true,
  },
  {
    id: 6,
    type: "aviso",
    title: "Turno asignado",
    body: "Se le asignó una hora para el martes 14 de junio de 2026 a las 10:00 hrs en la Municipalidad de Santiago.",
    date: "04 jun 2026",
    read: true,
  },
  {
    id: 7,
    type: "aviso",
    title: "Licencia de conducir digital próxima a vencer",
    body: "Su licencia de conducir digital (N.° 8823041) vence el 31 de agosto de 2026. Recuerde solicitar su renovación en el Registro Civil con anticipación.",
    date: "08 jun 2026",
    read: false,
  },
  {
    id: 8,
    type: "aviso",
    title: "Pasaporte próximo a vencer",
    body: "Su pasaporte (N.° C12345678) vence el 06 de septiembre de 2026. Solicite su renovación con anticipación en el Registro Civil.",
    date: "06 jun 2026",
    read: true,
  },
  {
    id: 9,
    type: "aviso",
    title: "Cédula de identidad próxima a vencer",
    body: "Su Cédula de Identidad (RUN 14.582.301-K) vence el 15 de agosto de 2026. Solicite su renovación con anticipación en el Registro Civil.",
    date: "01 jun 2026",
    read: false,
  },
  {
    id: 10,
    type: "aviso",
    title: "Licencia de conducir — vencimiento en 60 días",
    body: "Su licencia de conducir vence el 12 de agosto de 2026. Solicite hora de renovación en el Registro Civil.",
    date: "28 may 2026",
    read: true,
  },
];

const FILTER_OPTIONS: { key: NotifType | "all"; label: string; icon: React.ElementType }[] = [
  { key: "all", label: "Todas", icon: SlidersHorizontal },
  { key: "oficial", label: "Oficial", icon: Landmark },
  { key: "aviso", label: "Aviso", icon: MessageCircle },
];

const TYPE_LABEL: Record<NotifType, string> = {
  oficial: "Oficial",
  aviso: "Aviso",
};

const TYPE_BADGE: Record<NotifType, { bg: string; color: string }> = {
  oficial: { bg: "#e3f2fd", color: "#0d47a1" },
  aviso:   { bg: "#FFFBEB", color: "#522504" },
};


export function NotificationsPage({
  onBack,
  onSettings,
  onNavigate,
}: {
  onBack: () => void;
  onSettings: () => void;
  onNavigate: (page: Page) => void;
}) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<NotifType | "all">("all");
  const [showFilterSheet, setShowFilterSheet] = useState(false);

  const filtered = ALL_NOTIFICATIONS.filter((n) => {
    const matchesType = activeFilter === "all" || n.type === activeFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q || n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });

  const unreadCount = ALL_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 p-1 -ml-1 text-[#0046a8] active:bg-blue-50 rounded-full transition-colors"
            aria-label="Volver"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
            <span className="text-[12px] tracking-widest">Inicio</span>
          </button>
          <button
            onClick={onSettings}
            className="flex items-center gap-2 px-3 py-1.5 border border-[#ccc] text-[#0046a8] active:bg-blue-50 rounded-full transition-colors"
            aria-label="Configurar notificaciones"
          >
            <Settings2 size={14} strokeWidth={1.5} />
            <span className="text-[11px] tracking-widest">Configurar</span>
          </button>
        </div>
        <div className="mt-4 mb-1 flex items-baseline gap-3">
          <h1 className="text-[#333]">Notificaciones</h1>
          {unreadCount > 0 && (
            <span className="text-[10px] tracking-widest text-[#808080]">
              {unreadCount} sin leer
            </span>
          )}
        </div>
      </header>

      {/* Search + filter */}
      <div className="px-4 py-3 bg-card border-b border-border flex gap-2">
        <div className="relative flex-1">
          <Search size={13} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar notificaciones..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-[24px] border border-[#333] bg-white text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>
        <button
          onClick={() => setShowFilterSheet(true)}
          className={`flex items-center gap-1.5  px-3 py-2 text-[10px] tracking-widest transition-colors shrink-0 ${
            activeFilter !== "all"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground active:bg-muted"
          }`}
        >
          <SlidersHorizontal size={12} strokeWidth={1.5} />
          {activeFilter !== "all"
            ? FILTER_OPTIONS.find((f) => f.key === activeFilter)?.label
            : "Filtrar"}
        </button>
      </div>

      {/* Active filter pill */}
      {(activeFilter !== "all" || search) && (
        <div className="px-4 py-2 border-b border-border bg-background shrink-0">
          <p className="text-[10px] tracking-widest text-muted-foreground">
            {filtered.length} notificación{filtered.length !== 1 ? "es" : ""}
          </p>
        </div>
      )}

      {/* Filter sheet */}
      {showFilterSheet && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center" onClick={() => setShowFilterSheet(false)}>
          <div className="absolute inset-0 bg-foreground/40" />
          <div
            className="relative w-full max-w-[390px] bg-card border-t border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <p className="text-[11px] tracking-widest">Filtrar notificaciones</p>
              <button onClick={() => setShowFilterSheet(false)} className="p-1 active:bg-muted transition-colors">
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>
            <div className="px-4 py-4 flex flex-col gap-1">
              {FILTER_OPTIONS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => { setActiveFilter(key); setShowFilterSheet(false); }}
                  className={`flex items-center justify-between px-4 py-3 border transition-colors ${
                    activeFilter === key
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground active:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={14} strokeWidth={1.5} />
                    <span className="text-[12px]">{label}</span>
                  </div>
                  {activeFilter === key && <span className="text-[9px] tracking-widest">Activo</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-[12px] text-muted-foreground">Sin notificaciones para los filtros aplicados.</p>
          </div>
        ) : (
          filtered.map((n) => (
            <NotifItem key={n.id} notif={n} />
          ))
        )}
      </div>

      <BottomNav active="notifications" onNavigate={onNavigate} />
    </div>
  );
}

function NotifItem({ notif }: { notif: Notification }) {
  return (
    <div className={`flex flex-col gap-2 rounded-2xl border ${!notif.read ? "bg-white border-[#ccc] border-l-4 border-l-primary" : "bg-white border-[#ccc]"}`}>
      <div className="px-4 py-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="rounded-[4px] px-2 py-[2px] text-[10px] font-bold leading-[150%]"
            style={{ background: TYPE_BADGE[notif.type].bg, color: TYPE_BADGE[notif.type].color }}
          >
            {TYPE_LABEL[notif.type]}
          </span>
          {!notif.read && (
            <span className="text-[9px] tracking-widest text-foreground">● Sin leer</span>
          )}
        </div>
        <span className="text-[10px] text-muted-foreground shrink-0">{notif.date}</span>
      </div>

      <p className="text-[13px] leading-snug">{notif.title}</p>
      <p className="text-[11px] text-muted-foreground leading-relaxed">{notif.body}</p>

      </div>
    </div>
  );
}

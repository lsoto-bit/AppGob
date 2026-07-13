import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  Search,
  Settings2,
  SlidersHorizontal,
  X,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { BottomNav, Page } from "./BottomNav";
import {
  NOTIF_FILTER_OPTIONS,
  NOTIF_TYPE_BADGE,
  NOTIF_TYPE_LABEL,
  type NotifType,
} from "../notificationCategories";
import { ALL_NOTIFICATIONS, type Notification } from "../notificationsData";
import {
  DeviceHomescreenOverlay,
  PUSH_NOTIFICATION_ID,
} from "./DeviceHomescreenOverlay";
import { ExitAppFloatingButton } from "./ExitAppFloatingButton";

export type { NotifType } from "../notificationCategories";
export type { Notification } from "../notificationsData";

function NotificationDetailModal({
  notif,
  onClose,
}: {
  notif: Notification;
  onClose: () => void;
}) {
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
          <span
            className="rounded-[4px] px-2 py-[2px] text-[10px] font-bold leading-[150%]"
            style={{
              background: NOTIF_TYPE_BADGE[notif.type].bg,
              color: NOTIF_TYPE_BADGE[notif.type].color,
            }}
          >
            {NOTIF_TYPE_LABEL[notif.type]}
          </span>
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

          <a
            href={notif.moreInfo.url}
            onClick={(e) => e.preventDefault()}
            className="flex items-center justify-between gap-3 px-4 py-3 border border-[#0046a8] rounded-full text-[#0046a8] active:bg-blue-50 transition-colors"
          >
            <span className="text-[12px] font-bold leading-snug">{notif.moreInfo.label}</span>
            <ExternalLink size={16} strokeWidth={1.5} className="shrink-0" />
          </a>
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


export function NotificationsPage({
  onBack,
  onSettings,
  onNavigate,
  initialSelectedId = null,
  onInitialSelectedConsumed,
}: {
  onBack: () => void;
  onSettings: () => void;
  onNavigate: (page: Page) => void;
  initialSelectedId?: number | null;
  onInitialSelectedConsumed?: () => void;
}) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<NotifType | "all">("all");
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [notifications, setNotifications] = useState(ALL_NOTIFICATIONS);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showDeviceHomescreen, setShowDeviceHomescreen] = useState(false);
  const [showDevicePushNotification, setShowDevicePushNotification] = useState(false);

  const filtered = notifications.filter((n) => {
    const matchesType = activeFilter === "all" || n.type === activeFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      n.title.toLowerCase().includes(q) ||
      n.body.toLowerCase().includes(q) ||
      n.detail.toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;
  const selectedNotif = selectedId !== null
    ? notifications.find((n) => n.id === selectedId) ?? null
    : null;

  function openNotification(id: number) {
    setSelectedId(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }

  function handleExitApp() {
    setShowDeviceHomescreen(true);
    setShowDevicePushNotification(false);
  }

  function handleDevicePushClick() {
    setShowDeviceHomescreen(false);
    setShowDevicePushNotification(false);
    openNotification(PUSH_NOTIFICATION_ID);
  }

  useEffect(() => {
    if (!showDeviceHomescreen) return;
    const timer = setTimeout(() => setShowDevicePushNotification(true), 1400);
    return () => clearTimeout(timer);
  }, [showDeviceHomescreen]);

  useEffect(() => {
    if (initialSelectedId == null) return;
    setSelectedId(initialSelectedId);
    setNotifications((prev) =>
      prev.map((n) => (n.id === initialSelectedId ? { ...n, read: true } : n)),
    );
    onInitialSelectedConsumed?.();
  }, [initialSelectedId, onInitialSelectedConsumed]);

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-background flex flex-col relative">
      <ExitAppFloatingButton onClick={handleExitApp} />

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
            ? NOTIF_FILTER_OPTIONS.find((f) => f.key === activeFilter)?.label
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
              {NOTIF_FILTER_OPTIONS.map(({ key, label, icon: Icon }) => (
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
            <NotifItem key={n.id} notif={n} onOpen={() => openNotification(n.id)} />
          ))
        )}
      </div>

      {selectedNotif && (
        <NotificationDetailModal
          notif={selectedNotif}
          onClose={() => setSelectedId(null)}
        />
      )}

      {showDeviceHomescreen &&
        createPortal(
          <DeviceHomescreenOverlay
            showPushNotification={showDevicePushNotification}
            onPushNotificationClick={handleDevicePushClick}
          />,
          document.body,
        )}

      <BottomNav active="notifications" onNavigate={onNavigate} />
    </div>
  );
}

function NotifItem({ notif, onOpen }: { notif: Notification; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`flex flex-col gap-2 rounded-2xl border text-left w-full active:bg-gray-50 transition-colors ${!notif.read ? "bg-white border-[#ccc] border-l-4 border-l-primary" : "bg-white border-[#ccc]"}`}
    >
      <div className="px-4 py-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="rounded-[4px] px-2 py-[2px] text-[10px] font-bold leading-[150%]"
            style={{ background: NOTIF_TYPE_BADGE[notif.type].bg, color: NOTIF_TYPE_BADGE[notif.type].color }}
          >
            {NOTIF_TYPE_LABEL[notif.type]}
          </span>
          {!notif.read && (
            <span className="text-[9px] tracking-widest text-foreground">● Sin leer</span>
          )}
        </div>
        <span className="text-[10px] text-muted-foreground shrink-0">{notif.date}</span>
      </div>

      <p className="text-[13px] leading-snug">{notif.title}</p>
      <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{notif.body}</p>

      <span className="flex items-center gap-1 text-[11px] text-[#0046a8] font-medium pt-0.5">
        Ver más detalles
        <ChevronRight size={14} strokeWidth={1.5} />
      </span>

      </div>
    </button>
  );
}

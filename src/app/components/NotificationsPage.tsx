import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, Search, Settings2, ChevronRight } from "lucide-react";
import { BottomNav, Page } from "./BottomNav";
import { GobFranja } from "./GobFranja";
import { getBuzonNotifications, type Notification } from "../notificationsData";
import {
  DeviceHomescreenOverlay,
  PUSH_NOTIFICATION_ID,
} from "./DeviceHomescreenOverlay";
import { ExitAppFloatingButton } from "./ExitAppFloatingButton";
import { ReturnToAppSplash } from "./ReturnToAppSplash";
import { NotificationDetailModal } from "./NotificationDetailModal";

export type { Notification } from "../notificationsData";

export function NotificationsPage({
  onBack,
  onSettings,
  onNavigate,
  initialSelectedId = null,
  onInitialSelectedConsumed,
  buzonHasUnread = false,
}: {
  onBack: () => void;
  onSettings: () => void;
  onNavigate: (page: Page) => void;
  initialSelectedId?: number | null;
  onInitialSelectedConsumed?: () => void;
  buzonHasUnread?: boolean;
}) {
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState(getBuzonNotifications);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showDeviceHomescreen, setShowDeviceHomescreen] = useState(false);
  const [showDevicePushNotification, setShowDevicePushNotification] = useState(false);
  const [showReturnSplash, setShowReturnSplash] = useState(false);

  const filtered = notifications.filter((n) => {
    const q = search.toLowerCase();
    return (
      !q ||
      n.title.toLowerCase().includes(q) ||
      n.body.toLowerCase().includes(q) ||
      n.detail.toLowerCase().includes(q)
    );
  });

  const unreadCount = notifications.filter((n) => !n.read).length;
  const selectedNotif =
    selectedId !== null ? notifications.find((n) => n.id === selectedId) ?? null : null;

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
    setShowReturnSplash(true);
    setShowDeviceHomescreen(false);
    setShowDevicePushNotification(false);
  }

  function handleReturnSplashFinish() {
    setShowReturnSplash(false);
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

      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3 relative">
        <GobFranja />
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
          <h1 className="text-[#333]">Buzón oficial</h1>
          {unreadCount > 0 && (
            <span className="text-[10px] tracking-widest text-[#808080]">
              {unreadCount} sin leer
            </span>
          )}
        </div>
        <p className="text-[11px] text-[#666] leading-relaxed">
          Notificaciones oficiales del Estado.
        </p>
      </header>

      <div className="px-4 py-3 bg-card border-b border-border">
        <div className="relative">
          <Search
            size={13}
            strokeWidth={1.5}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Buscar en el buzón..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-[24px] border border-[#333] bg-white text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>
      </div>

      {search && (
        <div className="px-4 py-2 border-b border-border bg-background shrink-0">
          <p className="text-[10px] tracking-widest text-muted-foreground">
            {filtered.length} notificación{filtered.length !== 1 ? "es" : ""}
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-[12px] text-muted-foreground">
              Sin notificaciones para la búsqueda realizada.
            </p>
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
          showTypeBadge={false}
        />
      )}

      {showReturnSplash &&
        createPortal(
          <ReturnToAppSplash onFinish={handleReturnSplashFinish} />,
          document.body,
        )}

      {showDeviceHomescreen &&
        createPortal(
          <DeviceHomescreenOverlay
            showPushNotification={showDevicePushNotification}
            onPushNotificationClick={handleDevicePushClick}
          />,
          document.body,
        )}

      <BottomNav
        active="notifications"
        onNavigate={onNavigate}
        buzonHasUnread={buzonHasUnread}
      />
    </div>
  );
}

function NotifItem({ notif, onOpen }: { notif: Notification; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`flex flex-col gap-2 rounded-2xl border text-left w-full active:bg-gray-50 transition-colors ${
        !notif.read
          ? "bg-white border-[#ccc] border-l-4 border-l-primary"
          : "bg-white border-[#ccc]"
      }`}
    >
      <div className="px-4 py-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {!notif.read && (
              <span className="text-[9px] tracking-widest text-foreground">● Sin leer</span>
            )}
          </div>
          <span className="text-[10px] text-muted-foreground shrink-0">{notif.date}</span>
        </div>

        <p className="text-[13px] leading-snug">{notif.title}</p>
        <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
          {notif.body}
        </p>

        <span className="flex items-center gap-1 text-[11px] text-[#0046a8] font-medium pt-0.5">
          Ver más detalles
          <ChevronRight size={14} strokeWidth={1.5} />
        </span>
      </div>
    </button>
  );
}

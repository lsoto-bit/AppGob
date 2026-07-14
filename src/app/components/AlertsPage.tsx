import { useState } from "react";
import { ArrowLeft, Bell } from "lucide-react";
import { BottomNav, Page } from "./BottomNav";
import { GobFranja } from "./GobFranja";
import {
  ALERT_PERIOD_LABELS,
  formatAlertRelativeTime,
  getAlerts,
  groupAlertsByPeriod,
  type Alert,
} from "../notificationsData";

export function AlertsPage({
  onBack,
  onNavigate,
  onOpenBuzonNotification,
  onOpenDocument,
}: {
  onBack: () => void;
  onNavigate: (page: Page) => void;
  onOpenBuzonNotification: (buzonId: number) => void;
  onOpenDocument: (documentId: number) => void;
}) {
  const [alerts, setAlerts] = useState(getAlerts);

  const unreadCount = alerts.filter((a) => !a.read).length;
  const grouped = groupAlertsByPeriod(alerts);

  function markRead(id: number) {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
  }

  function handleLink(alert: Alert) {
    if (!alert.link) return;
    markRead(alert.id);
    if (alert.link.type === "buzon") {
      onOpenBuzonNotification(alert.link.buzonId);
    } else if (alert.link.type === "document") {
      onOpenDocument(alert.link.documentId);
    } else {
      onNavigate("autorizaciones");
    }
  }

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-background flex flex-col relative">
      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3 relative">
        <GobFranja />
        <button
          onClick={onBack}
          className="flex items-center gap-2 p-1 -ml-1 text-[#0046a8] active:bg-blue-50 rounded-full transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="text-[12px] tracking-widest">Inicio</span>
        </button>
        <div className="mt-4 flex items-baseline gap-3">
          <h1 className="text-[#333]">Alertas</h1>
          {unreadCount > 0 && (
            <span className="text-[10px] tracking-widest text-[#808080]">
              {unreadCount} sin leer
            </span>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {grouped.length === 0 ? (
          <div className="py-16 text-center px-4">
            <Bell size={24} strokeWidth={1.5} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-[12px] text-muted-foreground">No tienes alertas por ahora.</p>
          </div>
        ) : (
          grouped.map(({ period, items }) => (
            <section key={period}>
              <p className="px-4 pt-4 pb-1 text-[10px] tracking-widest text-[#808080]">
                {ALERT_PERIOD_LABELS[period]}
              </p>
              <div className="bg-white">
                {items.map((alert) => (
                  <AlertRow key={alert.id} alert={alert} onLink={() => handleLink(alert)} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      <BottomNav active="alerts" onNavigate={onNavigate} />
    </div>
  );
}

function AlertRow({ alert, onLink }: { alert: Alert; onLink: () => void }) {
  const relativeTime = formatAlertRelativeTime(alert.receivedAt);

  return (
    <div
      className={`px-4 py-2.5 rounded border border-[#e6e6e6] mb-1 ${
        !alert.read ? "bg-[#fffbeb]/40" : ""
      }`}
    >
      <div className="flex gap-2 items-start">
        {!alert.read && (
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#fdc700] mt-[5px] shrink-0"
            aria-hidden
          />
        )}
        <div className={`flex-1 min-w-0 ${alert.read ? "pl-3.5" : ""}`}>
          <div className="flex items-start justify-between gap-2">
            <p className="text-[12px] text-[#333] leading-[18px] flex-1 min-w-0">
              {alert.message}
            </p>
            <span className="text-[10px] text-[#808080] shrink-0 pt-0.5">{relativeTime}</span>
          </div>
          {alert.link && (
            <button
              type="button"
              onClick={onLink}
              className="text-[11px] text-[#0046a8] font-medium mt-0.5 active:opacity-70"
            >
              {alert.link.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

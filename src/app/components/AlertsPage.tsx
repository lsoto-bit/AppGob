import { useState } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Page } from "./BottomNav";
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
        <Button onClick={onBack} variant="nav-back" size="none" aria-label="Volver">
          <Icon name="arrow_back" size={18} />
          <span className="text-[12px] tracking-widest">Inicio</span>
        </Button>
        <div className="mt-4 flex items-baseline gap-3">
          <h1 className="text-[#333]">Alertas</h1>
          {unreadCount > 0 && (
            <span className="text-[10px] tracking-widest text-[#808080]">
              {unreadCount} no leído
            </span>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {grouped.length === 0 ? (
          <div className="py-16 text-center px-4">
            <Icon name="notifications" size={24} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-[12px] text-muted-foreground">No tienes alertas por ahora.</p>
          </div>
        ) : (
          grouped.map(({ period, items }) => (
            <section key={period}>
              <p className="px-4 pt-4 pb-1 text-[10px] tracking-widest text-[#808080]">
                {ALERT_PERIOD_LABELS[period]}
              </p>
              <div className="bg-white px-4">
                {items.map((alert, index) => (
                  <div key={alert.id} className={index > 0 ? "pt-1" : ""}>
                    <AlertRow alert={alert} onLink={() => handleLink(alert)} />
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}

function AlertRow({ alert, onLink }: { alert: Alert; onLink: () => void }) {
  const relativeTime = formatAlertRelativeTime(alert.receivedAt);
  const isUnread = !alert.read;

  const card = (
    <div className="border border-[#e6e6e6] rounded-[4px] px-[17px] py-[11px] w-full">
      <div className="flex items-center justify-between pb-1 gap-2">
        <p
          className={`text-[10px] text-[#808080] leading-[15px] ${
            isUnread ? "font-bold" : ""
          }`}
        >
          {relativeTime}
        </p>
        {isUnread && (
          <span className="text-[9px] tracking-[0.9px] text-[#0046a8] font-bold whitespace-nowrap">
            ● No leído
          </span>
        )}
      </div>
      <p
        className={`text-[12px] text-[#333] leading-[18px] ${
          isUnread ? "font-bold" : ""
        }`}
      >
        {alert.message}
      </p>
      {alert.link && (
        <Button
          type="button"
          onClick={onLink}
          variant="link"
          size="none"
          className="text-[11px] font-medium mt-1.5"
        >
          {alert.link.label}
        </Button>
      )}
    </div>
  );

  if (isUnread) {
    return <div className="border-l-2 border-[#0046a8] rounded-[4px] w-full">{card}</div>;
  }

  return card;
}

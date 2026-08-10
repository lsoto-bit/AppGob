import { useState } from "react";
import { Button, Icon } from "./ui";
import { Page } from "./BottomNav";
import { InteriorPageBody, InteriorPageLayout } from "./InteriorPageLayout";
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
  onOpenBenefit,
}: {
  onBack: () => void;
  onNavigate: (page: Page) => void;
  onOpenBuzonNotification: (buzonId: number) => void;
  onOpenDocument: (documentId: number) => void;
  onOpenBenefit?: (benefitId: string) => void;
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
    } else if (alert.link.type === "beneficio") {
      onOpenBenefit?.(alert.link.benefitId);
    } else if (alert.link.type === "document") {
      onOpenDocument(alert.link.documentId);
    } else {
      onNavigate("autorizaciones");
    }
  }

  return (
    <InteriorPageLayout
      onBack={onBack}
      title="Alertas"
      titleExtra={
        unreadCount > 0 ? (
          <span className="shrink-0 text-[12px] font-bold tracking-[1.2px] text-[#388e3c]">
            {unreadCount} no leído
          </span>
        ) : undefined
      }
    >
      <InteriorPageBody className="gap-2 pt-2">
        {grouped.length === 0 ? (
          <div className="px-4 py-16 text-center">
            <Icon name="notifications" size={24} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-[12px] text-muted-foreground">No tienes alertas por ahora.</p>
          </div>
        ) : (
          grouped.map(({ period, items }) => (
            <section key={period}>
              <p className="pb-2 pt-2 text-[12px] tracking-[1px] text-[#666]">
                {ALERT_PERIOD_LABELS[period]}
              </p>
              <div className="flex flex-col gap-2">
                {items.map((alert) => (
                  <AlertRow key={alert.id} alert={alert} onLink={() => handleLink(alert)} />
                ))}
              </div>
            </section>
          ))
        )}
      </InteriorPageBody>
    </InteriorPageLayout>
  );
}

function AlertRow({ alert, onLink }: { alert: Alert; onLink: () => void }) {
  const relativeTime = formatAlertRelativeTime(alert.receivedAt);
  const isUnread = !alert.read;

  return (
    <div
      className={`w-full overflow-hidden rounded-[8px] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.2)]${
        isUnread ? " border-l-4 border-l-[#388e3c]" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2 pb-1">
        <p className="text-[12px] font-medium leading-[20px] text-foreground">{relativeTime}</p>
        {isUnread && (
          <span className="whitespace-nowrap text-[12px] font-bold tracking-[0.9px] text-[#388e3c]">
            ● No leído
          </span>
        )}
      </div>
      <p className="text-[12px] leading-[20px] text-[#333]">{alert.message}</p>
      {alert.link && (
        <Button
          type="button"
          onClick={onLink}
          variant="inline-cta"
          size="none"
          className="mt-1.5 text-[11px]"
        >
          {alert.link.label}
          <Icon name="chevron_right" size={14} />
        </Button>
      )}
    </div>
  );
}

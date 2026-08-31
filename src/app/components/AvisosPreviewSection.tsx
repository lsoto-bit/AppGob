import { AvisoItem } from "./AvisoItem";
import { Button, Card, SectionLabel } from "./ui";
import { getHomeNotifications } from "../notificationsData";
import type { Page } from "./BottomNav";

export function AvisosPreviewSection({
  onNavigate,
  onOpenNotification,
}: {
  onNavigate: (page: Page) => void;
  onOpenNotification: (id: number) => void;
}) {
  const notifications = getHomeNotifications();

  return (
    <section className="flex flex-col gap-2 px-4 pb-2 pt-2">
      <SectionLabel className="pb-2 pt-2">Últimas notificaciones del Estado</SectionLabel>
      <Card variant="elevated" overflow="hidden" className="w-full">
        {notifications.map((n, index) => (
          <AvisoItem
            key={n.id}
            notif={n}
            compact
            grouped
            isFirst={index === 0}
            isLast={index === notifications.length - 1}
            onOpen={() => onOpenNotification(n.id)}
          />
        ))}
      </Card>
      <Button
        onClick={() => onNavigate("notifications")}
        variant="secondary"
        size="md"
        fullWidth
        className="mt-1"
      >
        Ver todas mis notificaciones
      </Button>
    </section>
  );
}

import { AvisoItem } from "./AvisoItem";
import { Button } from "./ui";
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
    <section className="px-4 pt-5 pb-6">
      <p className="text-[10px] tracking-widest text-muted-foreground mb-3">
        Últimas notificaciones del Estado
      </p>
      <div className="flex flex-col gap-2">
        {notifications.map((n) => (
          <AvisoItem key={n.id} notif={n} compact onOpen={() => onOpenNotification(n.id)} />
        ))}
      </div>
      <Button
        onClick={() => onNavigate("notifications")}
        variant="secondary"
        size="md"
        fullWidth
        className="mt-3"
      >
        Ver todas mis notificaciones
      </Button>
    </section>
  );
}

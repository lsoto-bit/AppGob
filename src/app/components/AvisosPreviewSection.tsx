import { AvisoItem } from "./AvisoItem";
import { Button } from "./Button";
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
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] tracking-widest text-muted-foreground">Últimas notificaciones del Estado</p>
        <Button
          onClick={() => onNavigate("notifications")}
          variant="link"
          size="sm"
        >
          Ver todas mis notificaciones
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {notifications.map((n) => (
          <AvisoItem key={n.id} notif={n} compact onOpen={() => onOpenNotification(n.id)} />
        ))}
      </div>
      <Button
        onClick={() => onNavigate("notifications")}
        variant="card"
        size="md"
        fullWidth
        className="mt-3 justify-center border-[#ccc] font-normal text-[11px] tracking-widest text-muted-foreground py-3"
      >
        Ver todas mis notificaciones
      </Button>
    </section>
  );
}

import { useEffect, useMemo, useState } from "react";
import { BottomSheet } from "../BottomSheet";
import { Icon, Button, SearchInput } from "../ui";
import { InteriorPageBody, InteriorPageLayout } from "../InteriorPageLayout";
import { BenefitListItem } from "./BenefitListItem";
import { NotificationDetailModal } from "../NotificationDetailModal";
import { AvisoItem } from "../AvisoItem";
import {
  filterBenefits,
  getBenefitsSorted,
  isNewBenefit,
} from "../../benefitsData";
import {
  getNotificationById,
  getNotificationsForBenefit,
  type Notification,
} from "../../notificationsData";
import { AVISO_CATEGORY_BADGE, AVISO_CATEGORY_LABEL } from "../../notificationCategories";

export function BeneficiosPage({
  onBack,
  initialBenefitId = null,
  initialNotificationId = null,
  onInitialTargetsConsumed,
  onOpenNotification,
}: {
  onBack: () => void;
  initialBenefitId?: string | null;
  initialNotificationId?: number | null;
  onInitialTargetsConsumed?: () => void;
  onOpenNotification?: (notificationId: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [communicationsBenefitId, setCommunicationsBenefitId] = useState<string | null>(null);
  const [selectedNotificationId, setSelectedNotificationId] = useState<number | null>(null);

  const sortedBenefits = getBenefitsSorted();
  const filteredBenefits = useMemo(
    () => filterBenefits(sortedBenefits, search),
    [sortedBenefits, search],
  );

  const communications = communicationsBenefitId
    ? getNotificationsForBenefit(communicationsBenefitId)
    : [];

  const selectedNotification: Notification | null =
    selectedNotificationId != null
      ? getNotificationById(selectedNotificationId) ?? null
      : null;

  useEffect(() => {
    if (initialBenefitId == null && initialNotificationId == null) return;

    if (initialNotificationId != null) {
      setSelectedNotificationId(initialNotificationId);
    }

    const scrollTimer = window.setTimeout(() => {
      if (initialBenefitId) {
        document.getElementById(`benefit-${initialBenefitId}`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      onInitialTargetsConsumed?.();
    }, 150);

    return () => window.clearTimeout(scrollTimer);
  }, [initialBenefitId, initialNotificationId, onInitialTargetsConsumed]);

  return (
    <>
      <InteriorPageLayout
        onBack={onBack}
        title="Mis beneficios"
        description="Beneficios y subsidios activos en tu perfil. Gestiona cupones, bonos y ayudas del Estado."
        toolbar={
          <SearchInput
            wrapperClassName="min-w-0 flex-1"
            placeholder="Buscar beneficios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-[50px] py-3"
          />
        }
      >
        {search.trim() && (
          <div className="shrink-0 bg-muted px-4 pb-2 pt-1">
            <p className="type-label-section text-muted-foreground">
              {filteredBenefits.length} beneficio{filteredBenefits.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        <InteriorPageBody className="gap-3 pt-2">
          {filteredBenefits.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <p className="text-xs leading-[18px] text-muted-foreground">
                {search.trim()
                  ? "Sin beneficios para tu búsqueda."
                  : "Aún no tienes beneficios registrados. Revisa tus Notificaciones para avisos del Estado."}
              </p>
            </div>
          ) : (
            filteredBenefits.map((benefit) => (
              <BenefitListItem
                key={benefit.id}
                benefit={benefit}
                isNew={isNewBenefit(benefit.id)}
                onOpenCommunications={setCommunicationsBenefitId}
              />
            ))
          )}
        </InteriorPageBody>
      </InteriorPageLayout>

      <BottomSheet
        open={communicationsBenefitId != null}
        onClose={() => setCommunicationsBenefitId(null)}
        panelClassName="max-h-[75vh] flex flex-col"
      >
        <div className="flex items-center justify-between border-b border-border-muted px-4 py-3 shrink-0">
          <div className="min-w-0">
            <p className="type-label-section text-muted-foreground">Notificaciones oficiales</p>
            <p className="text-base leading-6 text-foreground">
              {sortedBenefits.find((b) => b.id === communicationsBenefitId)?.title}
            </p>
          </div>
          <Button
            onClick={() => setCommunicationsBenefitId(null)}
            variant="icon-muted"
            size="icon"
            aria-label="Cerrar"
          >
            <Icon name="close" size={15} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto bg-muted px-4 py-2">
          {communications.length === 0 ? (
            <p className="py-8 text-center text-xs leading-[18px] text-muted-foreground">
              Sin notificaciones oficiales registradas para este beneficio.
            </p>
          ) : (
            <div className="flex flex-col gap-2 pb-4">
              {communications.map((notif) => (
                <AvisoItem
                  key={notif.id}
                  notif={notif}
                  compact
                  onOpen={() => {
                    setCommunicationsBenefitId(null);
                    setSelectedNotificationId(notif.id);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </BottomSheet>

      <NotificationDetailModal
        open={selectedNotificationId !== null}
        notif={selectedNotification}
        onClose={() => setSelectedNotificationId(null)}
        showTypeBadge
        badgeLabel={
          selectedNotification ? AVISO_CATEGORY_LABEL[selectedNotification.category] : undefined
        }
        badgeStyle={
          selectedNotification ? AVISO_CATEGORY_BADGE[selectedNotification.category] : undefined
        }
        secondaryActionLabel="Ver en Mis beneficios"
        onSecondaryAction={
          selectedNotification?.relatedBenefitId
            ? () => {
                const benefitId = selectedNotification.relatedBenefitId!;
                setSelectedNotificationId(null);
                document.getElementById(`benefit-${benefitId}`)?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            : undefined
        }
        tertiaryActionLabel="Ver en Notificaciones"
        onTertiaryAction={
          selectedNotification && onOpenNotification
            ? () => {
                const id = selectedNotification.id;
                setSelectedNotificationId(null);
                onOpenNotification(id);
              }
            : undefined
        }
      />
    </>
  );
}

import { Icon, SectionLabel } from "../ui";
import { NavCardRow } from "../NavCardRow";
import { getUnreadBenefitCampaignNotifications } from "../../notificationsData";
import { getBenefits } from "../../benefitsData";

export function BenefitHomeBanner({
  onNavigate,
  unreadNotifications = getUnreadBenefitCampaignNotifications(),
}: {
  onNavigate: () => void;
  unreadNotifications?: ReturnType<typeof getUnreadBenefitCampaignNotifications>;
}) {
  const benefitsCount = getBenefits().length;
  const hasUnread = unreadNotifications.length > 0;
  const subtitle = `${benefitsCount} beneficio${benefitsCount === 1 ? "" : "s"} disponible${benefitsCount === 1 ? "" : "s"}`;

  return (
    <section className="px-4 py-2" data-tour-id="tour-benefits-banner">
      <SectionLabel className="pb-2 pt-2">Mis beneficios</SectionLabel>

      {hasUnread ? (
        <div className="w-full overflow-hidden rounded-md bg-positive shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
          <div className="flex items-center justify-center gap-2 px-4 py-2">
            <Icon name="redeem" size={20} className="shrink-0 text-white" />
            <p className="type-label-section font-bold leading-4 text-white">
              ¡Tienes nuevos beneficios disponibles!
            </p>
          </div>

          <div className="overflow-hidden rounded-md bg-white shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
            <NavCardRow
              icon="redeem"
              title="Ver mis beneficios"
              subtitle={subtitle}
              onClick={onNavigate}
            />
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-md bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
          <NavCardRow
            icon="redeem"
            title="Ver mis beneficios"
            subtitle={subtitle}
            onClick={onNavigate}
          />
        </div>
      )}
    </section>
  );
}

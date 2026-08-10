import { Icon, Button, Badge } from "../ui";
import {
  BENEFIT_STATUS_LABEL,
  type Benefit,
  type BenefitStatus,
} from "../../benefitsData";
import { getNotificationsForBenefit } from "../../notificationsData";

function BenefitStatusBadge({ status }: { status: BenefitStatus }) {
  const label = BENEFIT_STATUS_LABEL[status];

  if (status === "disponible") {
    return (
      <Badge size="sm" variant="info" className="self-start">
        {label}
      </Badge>
    );
  }

  if (status === "vigente") {
    return (
      <Badge size="sm" variant="success" className="self-start">
        {label}
      </Badge>
    );
  }

  const customColors =
    status === "postulado"
      ? { bg: "#fff3e0", color: "#e65100" }
      : { bg: "#f3e5f5", color: "#4a148c" };

  return (
    <Badge size="sm" bg={customColors.bg} color={customColors.color} className="self-start">
      {label}
    </Badge>
  );
}

export function BenefitListItem({
  benefit,
  onOpenCommunications,
  isNew = false,
}: {
  benefit: Benefit;
  onOpenCommunications?: (benefitId: string) => void;
  isNew?: boolean;
}) {
  const commCount = getNotificationsForBenefit(benefit.id).length;

  return (
    <div
      id={`benefit-${benefit.id}`}
      className={`scroll-mt-24 overflow-hidden rounded-[8px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] ${
        isNew ? "border-l-4 border-l-[#388e3c]" : "border-l border-l-[#e6e6e6] pl-px"
      }`}
    >
      <div className="flex items-start border-b border-[#ccc] px-3 py-2">
        <div className="flex min-w-0 flex-1 flex-col gap-2 pr-2">
          <BenefitStatusBadge status={benefit.status} />

          <div className="flex flex-col gap-1">
            <p className="text-[16px] leading-[19.5px] text-[#333]">{benefit.title}</p>
            <p className="text-[12px] leading-[18px] text-[#666]">{benefit.source}</p>
          </div>

          <p className="text-[12px] font-medium leading-[18px] text-[#333]">
            Desde: {benefit.since}
          </p>
        </div>

        {isNew && (
          <span className="shrink-0 text-[12px] font-bold leading-[18px] tracking-[0.9px] text-[#388e3c]">
            ● Nuevo
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <a
          href={benefit.externalUrl}
          onClick={(e) => e.preventDefault()}
          className="flex w-full items-center justify-between gap-3 rounded-full border border-primary px-4 py-3 text-primary transition-colors active:bg-blue-50"
        >
          <span className="text-[12px] font-bold leading-[16.5px]">{benefit.externalLabel}</span>
          <Icon name="open_in_new" size={16} className="shrink-0" />
        </a>

        {commCount > 0 && onOpenCommunications && (
          <Button
            type="button"
            onClick={() => onOpenCommunications(benefit.id)}
            variant="inline-cta"
            size="none"
            className="self-start py-2 font-medium"
          >
            Ver notificaciones oficiales ({commCount})
            <Icon name="chevron_right" size={14} />
          </Button>
        )}
      </div>
    </div>
  );
}

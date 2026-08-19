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
      ? { bg: "#ffe17d", color: "#1c1f27" }
      : { bg: "#e4ddff", color: "#1c1f27" };

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
        isNew ? "border-l-4 border-l-positive" : "border-l border-l-border-muted pl-px"
      }`}
    >
      <div className="flex items-start border-b border-border px-3 py-2">
        <div className="flex min-w-0 flex-1 flex-col gap-2 pr-2">
          <BenefitStatusBadge status={benefit.status} />

          <div className="flex flex-col gap-1">
            <p className="text-base leading-[19.5px] text-foreground">{benefit.title}</p>
            <p className="text-xs leading-[18px] text-muted-foreground">{benefit.source}</p>
          </div>

          <p className="text-xs font-medium leading-[18px] text-foreground">
            Desde: {benefit.since}
          </p>
        </div>

        {isNew && (
          <span className="shrink-0 text-xs font-bold leading-[18px] tracking-[0.9px] text-positive">
            ● Nuevo
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <a
          href={benefit.externalUrl}
          onClick={(e) => e.preventDefault()}
          className="flex w-full items-center justify-between gap-3 rounded-full border border-primary px-4 py-3 text-primary transition-colors active:bg-muted"
        >
          <span className="text-xs font-bold leading-[16.5px]">{benefit.externalLabel}</span>
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

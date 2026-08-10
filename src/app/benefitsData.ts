export type BenefitStatus = "disponible" | "vigente" | "postulado" | "pagado";

export interface Benefit {
  id: string;
  title: string;
  status: BenefitStatus;
  /** Fecha desde la cual el beneficio está activo para la persona. */
  since: string;
  /** ISO date (YYYY-MM-DD) para ordenar y detectar el más reciente. */
  sinceDate: string;
  source: string;
  externalUrl: string;
  externalLabel: string;
}

export const BENEFIT_STATUS_LABEL: Record<BenefitStatus, string> = {
  disponible: "Disponible",
  vigente: "Vigente",
  postulado: "Postulado",
  pagado: "Pagado",
};

const BENEFITS: Benefit[] = [
  {
    id: "cupon-gas-licuado",
    title: "Cupón de Gas Licuado",
    status: "vigente",
    since: "14 jul 2026",
    sinceDate: "2026-07-14",
    source: "Ministerio de Energía",
    externalUrl: "https://www.chileatiende.gob.cl",
    externalLabel: "Consultar en ChileAtiende",
  },
  {
    id: "bono-invierno-2026",
    title: "Bono Invierno 2026",
    status: "vigente",
    since: "13 jul 2026",
    sinceDate: "2026-07-13",
    source: "Ministerio de Desarrollo Social y Familia",
    externalUrl: "https://www.chileatiende.gob.cl",
    externalLabel: "Ver requisitos en ChileAtiende",
  },
  {
    id: "pagos-por-cobrar",
    title: "Pagos por Cobrar",
    status: "disponible",
    since: "13 jun 2026",
    sinceDate: "2026-06-13",
    source: "Instituto de Previsión Social",
    externalUrl: "https://www.ips.gob.cl",
    externalLabel: "Gestionar en el Instituto de Previsión Social",
  },
  {
    id: "pase-cultural",
    title: "Pase Cultural",
    status: "vigente",
    since: "01 ene 2026",
    sinceDate: "2026-01-01",
    source: "Ministerio de las Culturas, las Artes y el Patrimonio",
    externalUrl: "https://www.chileatiende.gob.cl",
    externalLabel: "Consultar en ChileAtiende",
  },
];

export function getBenefits(): Benefit[] {
  return BENEFITS;
}

export function getBenefitsSorted(): Benefit[] {
  return [...BENEFITS].sort((a, b) => b.sinceDate.localeCompare(a.sinceDate));
}

export function getNewBenefitId(): string {
  return "cupon-gas-licuado";
}

export function isNewBenefit(id: string): boolean {
  return id === getNewBenefitId();
}

export function filterBenefits(benefits: Benefit[], query: string): Benefit[] {
  const q = query.trim().toLowerCase();
  if (!q) return benefits;

  return benefits.filter(
    (benefit) =>
      benefit.title.toLowerCase().includes(q) ||
      benefit.source.toLowerCase().includes(q) ||
      BENEFIT_STATUS_LABEL[benefit.status].toLowerCase().includes(q) ||
      benefit.since.toLowerCase().includes(q),
  );
}

export function getBenefitById(id: string): Benefit | undefined {
  return BENEFITS.find((b) => b.id === id);
}

export function stripBenefitTitlePrefix(title: string): string {
  return title.replace(/^Beneficio disponible:\s*/i, "").trim();
}

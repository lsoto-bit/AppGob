import type { IconName } from "./components/ui";

export type NotifType = "oficial" | "tramite" | "recordatorio";

export const NOTIF_CATEGORIES: {
  key: NotifType;
  label: string;
  shortLabel: string;
  description: string;
  icon: IconName;
}[] = [
  {
    key: "oficial",
    label: "Notificaciones del Estado",
    shortLabel: "Oficial",
    description: "Notificaciones oficiales del Estado",
    icon: "account_balance",
  },
  {
    key: "recordatorio",
    label: "Recordatorios",
    shortLabel: "Recordatorio",
    description: "Plazos, pagos y vencimiento de documentos personales",
    icon: "schedule",
  },
];

export const NOTIF_TYPE_LABEL: Record<NotifType, string> = {
  oficial: "Oficial",
  tramite: "Trámite",
  recordatorio: "Recordatorio",
};

export const NOTIF_TYPE_BADGE: Record<NotifType, { bg: string; color: string }> = {
  oficial: { bg: "var(--info-subtle)", color: "var(--info)" },
  tramite: { bg: "var(--positive-subtle)", color: "var(--positive)" },
  recordatorio: { bg: "var(--warning-tertiary)", color: "var(--warning)" },
};

export const BENEFIT_BADGE = { bg: "var(--positive-subtle)", color: "var(--positive)" };
export const BENEFIT_LABEL = "Beneficio";

export type AvisoCategory = "oficial" | "beneficio" | "tramite" | "cobranza" | "judicial";

export type AvisoReadFilter = "all" | "unread" | "read";

export const AVISO_FILTER_CATEGORIES: { key: AvisoCategory; label: string }[] = [
  { key: "beneficio", label: "Beneficios" },
  { key: "tramite", label: "Trámites" },
  { key: "cobranza", label: "Cobranza" },
  { key: "judicial", label: "Judicial" },
  { key: "oficial", label: "Oficial" },
];

export const AVISO_READ_FILTERS: { key: AvisoReadFilter; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "unread", label: "No leídos" },
  { key: "read", label: "Leídos" },
];

export const AVISO_CATEGORY_LABEL: Record<AvisoCategory, string> = {
  oficial: "Oficial",
  beneficio: "Beneficio",
  tramite: "Trámite",
  cobranza: "Cobranza",
  judicial: "Judicial",
};

export const AVISO_CATEGORY_BADGE: Record<AvisoCategory, { bg: string; color: string }> = {
  oficial: { bg: "var(--info-subtle)", color: "var(--info)" },
  beneficio: { bg: "var(--positive-subtle)", color: "var(--positive)" },
  tramite: { bg: "var(--violet-200)", color: "var(--foreground)" },
  cobranza: { bg: "var(--destructive-subtle)", color: "var(--destructive)" },
  judicial: { bg: "var(--warning-tertiary)", color: "var(--warning)" },
};

export type AlertPushCategory = "recordatorio" | "autorizacion";

export type PushNotifCategory = AvisoCategory | AlertPushCategory;

export const PUSH_AVISO_CATEGORIES: {
  key: AvisoCategory;
  label: string;
  description: string;
  icon: IconName;
}[] = [
  {
    key: "beneficio",
    label: "Beneficios",
    description: "Bonos, subsidios y pagos del Estado",
    icon: "redeem",
  },
  {
    key: "tramite",
    label: "Trámites",
    description: "Estado de solicitudes y trámites en curso",
    icon: "description",
  },
  {
    key: "cobranza",
    label: "Cobranza",
    description: "Multas, deudas y cobranza administrativa",
    icon: "credit_card",
  },
  {
    key: "judicial",
    label: "Judicial",
    description: "Citaciones y notificaciones judiciales",
    icon: "warning",
  },
  {
    key: "oficial",
    label: "Oficial",
    description: "Notificaciones oficiales del Estado",
    icon: "account_balance",
  },
];

export const PUSH_ALERT_CATEGORIES: {
  key: AlertPushCategory;
  label: string;
  description: string;
  icon: IconName;
}[] = [
  {
    key: "recordatorio",
    label: "Recordatorios",
    description: "Vencimientos de documentos y plazos personales",
    icon: "schedule",
  },
  {
    key: "autorizacion",
    label: "Autorizaciones",
    description: "Solicitudes pendientes con ClaveÚnica",
    icon: "verified_user",
  },
];

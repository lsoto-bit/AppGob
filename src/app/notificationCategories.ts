import type { IconName } from "./components/Icon";

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
  oficial: { bg: "#e3f2fd", color: "#0d47a1" },
  tramite: { bg: "#e8f5e9", color: "#1b5e20" },
  recordatorio: { bg: "#FFFBEB", color: "#522504" },
};

export const BENEFIT_BADGE = { bg: "#e8f5e9", color: "#1b5e20" };
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
  oficial: { bg: "#e3f2fd", color: "#0d47a1" },
  beneficio: { bg: "#e8f5e9", color: "#1b5e20" },
  tramite: { bg: "#f3e5f5", color: "#4a148c" },
  cobranza: { bg: "#ffebee", color: "#b71c1c" },
  judicial: { bg: "#fff3e0", color: "#e65100" },
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
    icon: "payments",
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
    description: "Comunicaciones generales del Estado",
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

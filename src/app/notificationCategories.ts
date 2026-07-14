import { Clock, Landmark } from "lucide-react";

export type NotifType = "oficial" | "tramite" | "recordatorio";

export const NOTIF_CATEGORIES: {
  key: NotifType;
  label: string;
  shortLabel: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    key: "oficial",
    label: "Buzón oficial",
    shortLabel: "Oficial",
    description: "Notificaciones oficiales del Estado",
    icon: Landmark,
  },
  {
    key: "recordatorio",
    label: "Recordatorios",
    shortLabel: "Recordatorio",
    description: "Plazos, pagos y vencimiento de documentos personales",
    icon: Clock,
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

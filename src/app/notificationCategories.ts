import { ClipboardList, Clock, Landmark, SlidersHorizontal } from "lucide-react";

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
    label: "Oficiales del Estado",
    shortLabel: "Oficial",
    description: "Resoluciones, citaciones y multas",
    icon: Landmark,
  },
  {
    key: "tramite",
    label: "Avance de trámites",
    shortLabel: "Trámite",
    description: "Estado y actualizaciones de expedientes",
    icon: ClipboardList,
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

export const NOTIF_FILTER_OPTIONS: { key: NotifType | "all"; label: string; icon: React.ElementType }[] = [
  { key: "all", label: "Todas", icon: SlidersHorizontal },
  ...NOTIF_CATEGORIES.map(({ key, label, icon }) => ({ key, label, icon })),
];

export type TourPlacement = "top" | "bottom";

export interface TourStep {
  id: string;
  targetId: string;
  title: string;
  body: string;
  placement: TourPlacement;
  /** Ensure user is on home before highlighting home-only targets */
  requiresHome?: boolean;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: "alerts",
    targetId: "tour-alerts",
    title: "Alertas y recordatorios",
    body: "Aquí verás avisos urgentes y novedades sobre tus trámites. Es distinto al buzón de notificaciones oficiales.",
    placement: "bottom",
    requiresHome: true,
  },
  {
    id: "search",
    targetId: "tour-search",
    title: "Busca en toda la app",
    body: "Encuentra trámites, documentos, notificaciones y secciones de tu perfil escribiendo aquí.",
    placement: "bottom",
    requiresHome: true,
  },
  {
    id: "documents-shortcut",
    targetId: "tour-documents-shortcut",
    title: "Tus documentos digitales",
    body: "Accede rápido a tu cédula, credenciales y otros documentos oficiales desde el inicio.",
    placement: "bottom",
    requiresHome: true,
  },
  {
    id: "nav-notifications",
    targetId: "tour-nav-notifications",
    title: "Notificaciones del Estado",
    body: "Revisa el buzón con comunicaciones oficiales de los servicios públicos.",
    placement: "top",
  },
  {
    id: "nav-documents",
    targetId: "tour-nav-documents",
    title: "Mis documentos",
    body: "Consulta y descarga tus documentos digitales en cualquier momento.",
    placement: "top",
  },
  {
    id: "nav-profile",
    targetId: "tour-nav-profile",
    title: "Tu espacio ciudadano",
    body: "Revisa tus beneficios, datos personales, ajustes de la app y cierra sesión cuando lo necesites.",
    placement: "top",
  },
  {
    id: "nav-more",
    targetId: "tour-nav-more",
    title: "Más servicios",
    body: "Sucursales, pagos al Estado, ClaveÚnica y asistencia están en este menú.",
    placement: "top",
  },
];

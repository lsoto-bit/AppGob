import type { Page } from "./components/BottomNav";
import { DOCUMENTS } from "./components/DocumentsPage";
import { TRAMITES, OFICINAS } from "./components/TramitesServiciosPage";
import { DEUDAS } from "./components/PagoDeudasPage";
import { BUZN_NOTIFICATIONS } from "./notificationsData";
import { AVISO_CATEGORY_LABEL } from "./notificationCategories";
import {
  PROFILE_SECTION_IDS,
  type ProfileSectionId,
} from "./components/ProfilePage";

export interface GlobalSearchResult {
  id: string;
  type: string;
  label: string;
  sub?: string;
  keywords?: string;
  page: Page;
  notificationId?: number;
  documentId?: number;
  profileSectionId?: ProfileSectionId;
  profileHighlight?: string;
}

function entry(
  partial: Omit<GlobalSearchResult, "id"> & { id?: string },
): GlobalSearchResult {
  return {
    id: partial.id ?? `${partial.type}-${partial.page}-${partial.label}`,
    ...partial,
  };
}

export function buildGlobalSearchIndex(): GlobalSearchResult[] {
  const index: GlobalSearchResult[] = [];

  for (const doc of DOCUMENTS) {
    index.push(
      entry({
        type: "Documento",
        label: doc.name,
        sub: `${doc.number} · ${doc.status}`,
        keywords: [doc.sub, doc.category, doc.expiry].filter(Boolean).join(" "),
        page: "documents",
        documentId: doc.id,
      }),
    );
  }

  for (const tramite of TRAMITES) {
    const modalidad = tramite.modalidad
      .map((m) => (m === "online" ? "En línea" : "En oficina"))
      .join(" / ");
    index.push(
      entry({
        type: "Trámite",
        label: tramite.nombre,
        sub: `${tramite.categoria} · ${modalidad}`,
        keywords: tramite.descripcion,
        page: "lugares",
      }),
    );
  }

  for (const oficina of OFICINAS) {
    index.push(
      entry({
        type: "Lugar",
        label: oficina.nombre,
        sub: `${oficina.direccion} · ${oficina.distancia} km`,
        keywords: [oficina.telefono, oficina.horario].join(" "),
        page: "lugares",
      }),
    );
  }

  for (const notif of BUZN_NOTIFICATIONS) {
    index.push(
      entry({
        type: "Aviso",
        label: notif.title,
        sub: `${AVISO_CATEGORY_LABEL[notif.category]} · ${notif.date}`,
        keywords: [notif.body, notif.detail, notif.moreInfo.label].join(" "),
        page: "notifications",
        notificationId: notif.id,
      }),
    );
  }

  for (const deuda of DEUDAS) {
    index.push(
      entry({
        type: "Deuda",
        label: deuda.concepto,
        sub: `${deuda.organismo} · ${deuda.monto} · ${deuda.estado}`,
        keywords: deuda.vencimiento,
        page: "pago-deudas",
      }),
    );
  }

  const profileSections: {
    label: string;
    sub: string;
    keywords?: string;
    profileSectionId: ProfileSectionId;
    profileHighlight?: string;
  }[] = [
    {
      label: "Datos personales",
      sub: "María Andrea Valenzuela Rojas · RUT 14.582.301-K",
      keywords: "nombres apellidos fecha de nacimiento maria.valenzuela@correo.cl",
      profileSectionId: PROFILE_SECTION_IDS.datosPersonales,
    },
    {
      label: "Mi Registro Social de Hogares",
      sub: "Caracterización socioeconómica del hogar",
      keywords: "Registro Social de Hogares RSH tramo 40% subsidios prioritarios FONASA tramo B",
      profileSectionId: PROFILE_SECTION_IDS.rsh,
    },
    {
      label: "Calificación socioeconómica",
      sub: "Tramo 40% — Acceso a subsidios prioritarios",
      keywords: "Registro Social de Hogares RSH",
      profileSectionId: PROFILE_SECTION_IDS.rsh,
      profileHighlight: "Calificación socioeconómica",
    },
    {
      label: "Mis pagos de beneficios sociales",
      sub: "Aportes, bonos y beneficios recibidos",
      keywords: "Instituto de Previsión Social IPS",
      profileSectionId: PROFILE_SECTION_IDS.beneficios,
    },
    {
      label: "Aporte Familiar Permanente",
      sub: "$22.690 · Pagado 15/05/2026",
      profileSectionId: PROFILE_SECTION_IDS.beneficios,
      profileHighlight: "Aporte Familiar Permanente",
    },
    {
      label: "Bono Logro Escolar",
      sub: "$50.000 · Pagado 20/03/2026",
      profileSectionId: PROFILE_SECTION_IDS.beneficios,
      profileHighlight: "Bono Logro Escolar",
    },
    {
      label: "Bono por Hijo",
      sub: "$15.000 · Pagado 15/05/2026",
      profileSectionId: PROFILE_SECTION_IDS.beneficios,
      profileHighlight: "Bono por Hijo",
    },
    {
      label: "Pase Cultural",
      sub: "$50.000 · Vigente",
      profileSectionId: PROFILE_SECTION_IDS.beneficios,
      profileHighlight: "Pase Cultural",
    },
    {
      label: "Mi información previsional",
      sub: "AFP, mutualidad y caja de compensación",
      keywords: "AFP Habitat Fondos B y C mutualidad ACHS Los Andes",
      profileSectionId: PROFILE_SECTION_IDS.previsional,
    },
    {
      label: "AFP Habitat",
      sub: "Fondo C 60% · Fondo B 40%",
      profileSectionId: PROFILE_SECTION_IDS.previsional,
      profileHighlight: "AFP Habitat",
    },
    {
      label: "Mutualidad ACHS",
      sub: "Asociación Chilena de Seguridad",
      profileSectionId: PROFILE_SECTION_IDS.previsional,
      profileHighlight: "Mutualidad ACHS",
    },
    {
      label: "Caja de compensación Los Andes",
      sub: "Prestaciones sociales complementarias",
      profileSectionId: PROFILE_SECTION_IDS.previsional,
      profileHighlight: "Caja de compensación Los Andes",
    },
    {
      label: "Mi Seguro Social",
      sub: "Cotizaciones al sistema integrado",
      keywords: "Empresa Ejemplo SpA cotizaciones mensuales",
      profileSectionId: PROFILE_SECTION_IDS.seguroSocial,
    },
  ];

  for (const section of profileSections) {
    index.push(
      entry({
        type: "Mi perfil",
        label: section.label,
        sub: section.sub,
        keywords: section.keywords,
        page: "profile",
        profileSectionId: section.profileSectionId,
        profileHighlight: section.profileHighlight,
      }),
    );
  }

  const sections: { label: string; sub: string; page: Page; keywords?: string }[] = [
    { label: "Mis avisos", sub: "Notificaciones oficiales del Estado", page: "notifications" },
    { label: "Mis documentos", sub: "Cédula, licencia y credencial digital", page: "documents" },
    { label: "Lugares de atención del Estado", sub: "Trámites, servicios y oficinas cercanas", page: "lugares" },
    { label: "Asistencia y soporte", sub: "Contacto y reportar problemas", page: "assistance" },
    {
      label: "Configuración",
      sub: "Notificaciones push, seguridad y ajustes de la app",
      page: "settings",
      keywords: "notificaciones push email SMS biometría fuente",
    },
    {
      label: "Pago de deudas con el Estado",
      sub: "TGR — Obligaciones pendientes",
      page: "pago-deudas",
      keywords: "TGR tesorería obligaciones",
    },
    {
      label: "Ver introducción a la aplicación",
      sub: "Tutorial de funciones de MiGob",
      page: "assistance",
    },
  ];

  for (const section of sections) {
    index.push(
      entry({
        type: "Sección",
        label: section.label,
        sub: section.sub,
        keywords: section.keywords,
        page: section.page,
      }),
    );
  }

  index.push(
    entry({
      type: "Contacto",
      label: "Teléfono ChileAtiende",
      sub: "800-400-000 · Lun–Vie 8:00–20:00",
      page: "assistance",
    }),
    entry({
      type: "Contacto",
      label: "Correo atencion@gob.cl",
      sub: "Respuesta en 48 horas hábiles",
      page: "assistance",
    }),
    entry({
      type: "Asistencia",
      label: "Reportar un problema",
      sub: "Envíenos un reporte de error en la aplicación",
      page: "assistance",
    }),
  );

  return index;
}

const SEARCH_INDEX = buildGlobalSearchIndex();

function normalizeForSearch(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function scoreResult(result: GlobalSearchResult, query: string): number {
  const q = normalizeForSearch(query);
  const label = normalizeForSearch(result.label);
  const sub = normalizeForSearch(result.sub ?? "");
  const keywords = normalizeForSearch(result.keywords ?? "");

  if (label.startsWith(q)) return 100;
  if (label.includes(q)) return 80;
  if (sub.includes(q)) return 60;
  if (keywords.includes(q)) return 40;
  return 0;
}

export function searchGlobalIndex(query: string, limit = 15): GlobalSearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  return SEARCH_INDEX.filter((result) => scoreResult(result, trimmed) > 0)
    .sort((a, b) => scoreResult(b, trimmed) - scoreResult(a, trimmed) || a.label.localeCompare(b.label, "es"))
    .slice(0, limit);
}

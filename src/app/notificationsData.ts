import type { AvisoCategory, NotifType } from "./notificationCategories";

export type NotifChannel = "buzon" | "alerta";

export interface Notification {
  id: number;
  channel: NotifChannel;
  type: NotifType;
  category: AvisoCategory;
  title: string;
  body: string;
  date: string;
  read: boolean;
  detail: string;
  moreInfo: {
    label: string;
    url: string;
  };
}

export type AlertPeriodKey = "hoy" | "ayer" | "ultimos_7_dias" | "anteriores";

export const ALERT_PERIOD_LABELS: Record<AlertPeriodKey, string> = {
  hoy: "Hoy",
  ayer: "Ayer",
  ultimos_7_dias: "Últimos 7 días",
  anteriores: "Anteriores",
};

export type AlertLink =
  | { type: "buzon"; buzonId: number; label: string }
  | { type: "document"; documentId: number; label: string }
  | { type: "autorizacion"; label: string };

export interface Alert {
  id: number;
  message: string;
  receivedAt: string;
  read: boolean;
  link?: AlertLink;
}

/** Momento de referencia del prototipo (14 jul 2026, 14:38). */
export const APP_NOW = new Date(2026, 6, 14, 14, 38, 0);

const APP_TODAY = new Date(APP_NOW.getFullYear(), APP_NOW.getMonth(), APP_NOW.getDate());

/** Orden de visualización compartido entre home y buzón (más reciente primero). */
export const BUZN_DISPLAY_ORDER = [14, 15, 13, 11, 12, 2, 3, 16, 19, 17, 18] as const;

export const HOME_NOTIFICATION_IDS = [
  BUZN_DISPLAY_ORDER[0],
  BUZN_DISPLAY_ORDER[1],
  BUZN_DISPLAY_ORDER[2],
] as const;

export const HOME_NOTIFICATION_TIMES: Record<number, string> = {
  14: "Hace 10 min",
  15: "Ayer",
  13: "Hace 1 mes",
};

const BUZN_ITEMS: Notification[] = [
  {
    id: 13,
    channel: "buzon",
    type: "oficial",
    category: "tramite",
    title: "Devolución por pagos dobles de contribuciones",
    body: "Tu solicitud de devolución por pagos duplicados fue resuelta favorablemente. La devolución estará disponible a partir del 20/06/2026.",
    date: "14 jun 2026",
    read: false,
    detail:
      "María Valenzuela:\n\nTenemos el agrado de confirmar que la resolución de tu solicitud N° 2026-PD-0847, de fecha 28 de mayo de 2026, ha sido resuelta favorablemente.\n\nTras revisar los pagos asociados a los Roles 12345-678 y 54321-987, se verificó la existencia de pagos duplicados correspondientes a la cuota N° 2 del año 2025 y la cuota N° 1 del año 2026.\n\nPor lo tanto, tu devolución por pagos duplicados estará disponible a partir del día 20/06/2026.\n\nPuedes consultar el estado de tu devolución, obtener certificados de deuda y cupones de pago de contribuciones en las oficinas de ChileAtiende, o acceder a los servicios en línea disponibles las 24 horas en www.tgr.cl.",
    moreInfo: { label: "Consultar estado de devolución en TGR", url: "https://www.tgr.cl" },
  },
  {
    id: 14,
    channel: "buzon",
    type: "oficial",
    category: "oficial",
    title: "Entrega de resultados de la prueba censal SIMCE",
    body: "La Agencia de Calidad de la Educación informa que los resultados de la prueba censal SIMCE 2025 de tu establecimiento educativo ya están disponibles.",
    date: "14 jul 2026",
    read: true,
    detail:
      "María Valenzuela:\n\nLa Agencia de Calidad de la Educación (ACE) te comunica que los resultados de la prueba censal SIMCE correspondientes al establecimiento educativo asociado a tu representación legal ya se encuentran disponibles.\n\nPuedes revisar los informes de desempeño, los resultados por asignatura y los reportes de contexto del establecimiento a través del portal oficial de la Agencia.\n\nEsta información es de carácter oficial y puede ser utilizada para el seguimiento del proceso educativo y la participación en instancias de rendición de cuentas del establecimiento.",
    moreInfo: { label: "Consultar resultados SIMCE en ACE", url: "https://www.agenciaeducacion.cl" },
  },
  {
    id: 15,
    channel: "buzon",
    type: "oficial",
    category: "beneficio",
    title: "Solicitud de Pago de Beneficios Previsionales No Cobrados",
    body: 'El Instituto de Previsión Social te informa que registra beneficios previsionales no cobrados ("Pagos por Cobrar") a tu nombre. Revisa el detalle y gestiona tu solicitud de pago.',
    date: "13 jul 2026",
    read: true,
    detail:
      "María Valenzuela:\n\nEl Instituto de Previsión Social (IPS) te comunica que, tras cruzar información con las instituciones de previsión y organismos competentes, se detectaron uno o más beneficios previsionales no cobrados asociados a tu RUN.\n\nEl programa Pagos por Cobrar permite solicitar el pago de montos adeudados por conceptos como pensiones no percibidas, devoluciones de cotizaciones u otros beneficios reconocidos por ley que no fueron cobrados en su oportunidad.\n\nPara iniciar la gestión, revisa el detalle de los montos disponibles, confirma tus datos de contacto y completa la solicitud en el portal del IPS. El plazo de respuesta dependerá del tipo de beneficio y de la documentación requerida.",
    moreInfo: { label: "Conoce tu beneficio", url: "https://www.ips.gob.cl" },
  },
  {
    id: 11,
    channel: "buzon",
    type: "oficial",
    category: "beneficio",
    title: "Beneficio disponible: Cupón de Gas Licuado",
    body: "Según tu perfil socioeconómico, puedes acceder al Cupón de Gas Licuado del mes de julio. Revisa los requisitos y solicítalo antes del 31 de julio.",
    date: "14 jun 2026",
    read: false,
    detail:
      "El Ministerio de Energía confirma que tu hogar cumple los criterios del Registro Social de Hogares para acceder al subsidio de gas licuado de julio 2026.\n\nEl cupón corresponde a un aporte estatal para hogares vulnerables que utilizan cilindros de gas licuado. El monto se acredita según el tamaño del cilindro autorizado y la comuna de residencia.\n\nPlazo de solicitud: hasta el 31 de julio de 2026. Si no postulas dentro del plazo, deberás esperar la apertura del siguiente período.",
    moreInfo: { label: "Conoce tu beneficio", url: "#" },
  },
  {
    id: 12,
    channel: "buzon",
    type: "oficial",
    category: "beneficio",
    title: "Beneficio disponible: Bono Invierno 2026",
    body: "El Bono Invierno 2026 está disponible para tu hogar según tu Registro Social de Hogares. Presiona «Ver requisitos y montos del Bono Invierno 2026» para revisar el monto y las condiciones.",
    date: "13 jun 2026",
    read: false,
    detail:
      "El Bono Invierno es un beneficio del Ministerio de Desarrollo Social y Familia orientado a hogares en situación de vulnerabilidad socioeconómica durante los meses de mayor consumo energético.\n\nSegún la caracterización de tu hogar en el Registro Social de Hogares, cumples los requisitos para recibir el pago correspondiente al período 2026.\n\nEl monto y la fecha de pago dependen de tu tramo de calificación y del número de integrantes del hogar. Revisa las condiciones completas antes de postular.",
    moreInfo: { label: "Conoce tu beneficio", url: "#" },
  },
  {
    id: 16,
    channel: "buzon",
    type: "oficial",
    category: "cobranza",
    title: "Cobranza administrativa — Municipalidad de Renca",
    body: "Se registró una infracción de tránsito vinculada a un vehículo de tu propiedad. Contravención al artículo 114° de la Ley de Tránsito N.º 18.290.",
    date: "08 jun 2026",
    read: false,
    detail:
      "María Valenzuela:\n\nLa Ilustre Municipalidad de Renca te comunica que se ha registrado una infracción de tránsito vinculada a un vehículo de tu propiedad.\n\nEsta falta constituye una contravención formal al artículo 114° de la Ley de Tránsito N.º 18.290, la cual sanciona el transitar en autopistas concesionadas sin el dispositivo electrónico correspondiente (Televía/TAG), con dicho aparato inhabilitado, o por haber efectuado el pago del Pase Diario fuera del plazo legal.\n\nPara regularizar esta situación puedes hacerlo accediendo al sitio web de la municipalidad, sección de Trámites y luego accediendo a TAG.",
    moreInfo: { label: "Ver detalle de la cobranza", url: "#" },
  },
  {
    id: 17,
    channel: "buzon",
    type: "oficial",
    category: "tramite",
    title: "Resultado de Admisibilidad — Convocatoria 2026",
    body: "La Subsecretaría de las Culturas y las Artes informa que tu postulación cumple los requisitos de admisibilidad.",
    date: "15 abr 2026",
    read: false,
    detail:
      "María Valenzuela:\n\nLa Subsecretaría de las Culturas y las Artes te comunica que tu postulación a la Convocatoria 2026 ha sido revisada y cumple los requisitos de admisibilidad.\n\nPuedes consultar el detalle del resultado y los próximos pasos del proceso en la plataforma de la convocatoria.",
    moreInfo: { label: "Ver detalle de admisibilidad", url: "#" },
  },
  {
    id: 18,
    channel: "buzon",
    type: "oficial",
    category: "tramite",
    title: "Resultados Becas Municipales — Municipalidad de Curanilahue",
    body: "La Municipalidad de Curanilahue informa el resultado de las Becas Municipales.",
    date: "16 mar 2026",
    read: true,
    detail:
      "María Valenzuela:\n\nLa Municipalidad de Curanilahue te informa el resultado de las Becas Municipales correspondientes al período en curso.\n\nPuedes revisar el detalle de la resolución y las instrucciones para los próximos pasos del proceso.",
    moreInfo: { label: "Ver detalle del resultado", url: "#" },
  },
  {
    id: 19,
    channel: "buzon",
    type: "oficial",
    category: "tramite",
    title: "Resultados Evaluación Administrativa — Convocatoria Ayudas Técnicas",
    body: "SENADIS informa los resultados de la evaluación administrativa de tu solicitud. Tu catre clínico eléctrico se encuentra con ayuda técnica observada.",
    date: "05 may 2026",
    read: false,
    detail:
      "María Valenzuela:\n\nEl Servicio Nacional de la Discapacidad (SENADIS) te informa los resultados de la etapa de Evaluación Administrativa de las solicitudes a la Convocatoria año 2026 para el financiamiento de Ayudas Técnicas y Tecnologías de Apoyo.\n\nTu solicitud de catre clínico eléctrico se encuentra en estado «Ayuda Técnica observada», lo que significa que requiere rectificación de antecedentes dentro del plazo indicado.\n\nRevisa el detalle de las observaciones y las instrucciones para subsanar la información antes del vencimiento del plazo.",
    moreInfo: { label: "Ver detalle de la evaluación", url: "#" },
  },
  {
    id: 2,
    channel: "buzon",
    type: "oficial",
    category: "judicial",
    title: "Citación judicial — 3.° Juzgado Civil de Santiago",
    body: "Te citamos a comparecer el 20 de junio de 2026 a las 09:00 hrs en Av. Libertador Bernardo O'Higgins 1449.",
    date: "11 jun 2026",
    read: false,
    detail:
      "El 3.° Juzgado Civil de Santiago te cita a comparecer personalmente el 20 de junio de 2026 a las 09:00 hrs, en Av. Libertador Bernardo O'Higgins 1449, piso 6, sala 602.\n\nDebes presentarte con cédula de identidad vigente. El no comparecencia sin causa justificada puede acarrear las sanciones previstas en el Código de Procedimiento Civil.\n\nSi necesitas asistencia jurídica, puedes consultar la Defensoría Penal Pública o los consultorios jurídicos de tu comuna.",
    moreInfo: { label: "Ver detalle de la citación", url: "#" },
  },
  {
    id: 3,
    channel: "buzon",
    type: "oficial",
    category: "cobranza",
    title: "Multa de tránsito — Expediente 7743",
    body: "Se registró una infracción de tránsito el 08/06/2026. Tienes 15 días hábiles para impugnar.",
    date: "10 jun 2026",
    read: true,
    detail:
      "Se registró una infracción de tránsito asociada al expediente 7743, con fecha 08/06/2026. El monto de la multa y el tipo de infracción están disponibles en el detalle del expediente.\n\nTienes 15 días hábiles desde la notificación para impugnar ante el tribunal competente o pagar con descuento según la normativa del Juzgado de Policía Local correspondiente.\n\nEl pago o la impugnación fuera de plazo puede generar intereses y costas adicionales.",
    moreInfo: { label: "Ver expediente y opciones de pago", url: "#" },
  },
];

export const ALERTS: Alert[] = [
  // —— Hoy ——
  {
    id: 108,
    message: "Nueva notificación del Estado: resultados de la prueba censal SIMCE.",
    receivedAt: "2026-07-14T14:32:00",
    read: false,
    link: { type: "buzon", buzonId: 14, label: "Ver notificación" },
  },
  {
    id: 107,
    message: "Solicitud pendiente de autorización con ClaveÚnica: acceso a datos de salud.",
    receivedAt: "2026-07-14T13:20:00",
    read: false,
    link: { type: "autorizacion", label: "Revisar solicitud" },
  },
  {
    id: 104,
    message: "Tu receta electrónica del 14 jun 2026 vence el 14 de julio de 2026.",
    receivedAt: "2026-07-14T09:00:00",
    read: false,
    link: { type: "document", documentId: 6, label: "Ver receta electrónica" },
  },
  // —— Ayer ——
  {
    id: 109,
    message: "Nueva notificación del Estado: Pagos por Cobrar del Instituto de Previsión Social.",
    receivedAt: "2026-07-13T11:20:00",
    read: false,
    link: { type: "buzon", buzonId: 15, label: "Ver notificación" },
  },
  // —— Últimos 7 días ——
  {
    id: 9,
    message: "Tu cédula de identidad vence el 15 de agosto de 2026.",
    receivedAt: "2026-07-10T08:00:00",
    read: true,
    link: { type: "document", documentId: 1, label: "Ver cédula de identidad" },
  },
  // —— Anteriores (puentes al buzón sin leer) ——
  {
    id: 101,
    message: "Nueva notificación del Estado: devolución por pagos dobles de contribuciones.",
    receivedAt: "2026-06-14T10:15:00",
    read: true,
    link: { type: "buzon", buzonId: 13, label: "Ver notificación" },
  },
  {
    id: 102,
    message: "Nueva notificación del Estado: Cupón de Gas Licuado disponible.",
    receivedAt: "2026-06-14T11:38:00",
    read: true,
    link: { type: "buzon", buzonId: 11, label: "Ver notificación" },
  },
  {
    id: 103,
    message: "Nueva notificación del Estado: Bono Invierno 2026 disponible.",
    receivedAt: "2026-06-13T09:15:00",
    read: true,
    link: { type: "buzon", buzonId: 12, label: "Ver notificación" },
  },
  {
    id: 111,
    message: "Nueva notificación del Estado: citación judicial del 3.° Juzgado Civil de Santiago.",
    receivedAt: "2026-06-11T14:00:00",
    read: true,
    link: { type: "buzon", buzonId: 2, label: "Ver notificación" },
  },
  {
    id: 110,
    message: "Nueva notificación del Estado: cobranza administrativa de la Municipalidad de Renca.",
    receivedAt: "2026-06-08T09:12:00",
    read: true,
    link: { type: "buzon", buzonId: 16, label: "Ver notificación" },
  },
  {
    id: 112,
    message: "Nueva notificación del Estado: evaluación administrativa SENADIS — Ayudas Técnicas.",
    receivedAt: "2026-05-05T15:23:00",
    read: true,
    link: { type: "buzon", buzonId: 19, label: "Ver notificación" },
  },
  {
    id: 113,
    message: "Nueva notificación del Estado: resultado de admisibilidad — Convocatoria 2026.",
    receivedAt: "2026-04-15T10:41:00",
    read: true,
    link: { type: "buzon", buzonId: 17, label: "Ver notificación" },
  },
];

export const ALL_NOTIFICATIONS: Notification[] = BUZN_ITEMS;

export const BUZN_NOTIFICATIONS: Notification[] = BUZN_ITEMS;

export function isBenefitAviso(notif: Pick<Notification, "category" | "title">): boolean {
  if (notif.category === "beneficio") return true;
  return (
    notif.title.startsWith("Beneficio disponible:") ||
    /beneficio/i.test(notif.title)
  );
}

export function getBuzonNotifications() {
  const byId = new Map(BUZN_ITEMS.map((n) => [n.id, n]));
  return BUZN_DISPLAY_ORDER.map((id) => {
    const notif = byId.get(id);
    if (!notif) throw new Error(`Notification ${id} not found`);
    return notif;
  });
}

export function getAlerts() {
  return ALERTS;
}

export function getHomeNotifications() {
  return HOME_NOTIFICATION_IDS.map((id) => {
    const notif = getBuzonNotifications().find((n) => n.id === id);
    if (!notif) throw new Error(`Notification ${id} not found`);
    return { ...notif, homeTime: HOME_NOTIFICATION_TIMES[id] };
  });
}

export function getAlertPeriod(
  receivedAt: string,
  today: Date = APP_TODAY,
): AlertPeriodKey {
  const date = new Date(receivedAt);
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const dateStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round(
    (todayStart.getTime() - dateStart.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) return "hoy";
  if (diffDays === 1) return "ayer";
  if (diffDays >= 2 && diffDays <= 7) return "ultimos_7_dias";
  return "anteriores";
}

export function formatAlertRelativeTime(
  receivedAt: string,
  now: Date = APP_NOW,
): string {
  const then = new Date(receivedAt);
  const diffMs = Math.max(0, now.getTime() - then.getTime());
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);

  if (diffMin < 1) return "Hace un momento";
  if (diffMin === 1) return "Hace 1 minuto";
  if (diffMin < 60) return `Hace ${diffMin} minutos`;
  if (diffHr === 1) return "Hace 1 hora";
  if (diffHr < 24) return `Hace ${diffHr} horas`;
  if (diffDay === 1) return "Hace 1 día";
  if (diffDay < 7) return `Hace ${diffDay} días`;
  if (diffWeek === 1) return "Hace 1 semana";
  if (diffWeek < 5) return `Hace ${diffWeek} semanas`;
  if (diffMonth === 1) return "Hace 1 mes";
  return `Hace ${diffMonth} meses`;
}

export function groupAlertsByPeriod(alerts: Alert[]) {
  const order: AlertPeriodKey[] = ["hoy", "ayer", "ultimos_7_dias", "anteriores"];
  const sorted = [...alerts].sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
  const groups = new Map<AlertPeriodKey, Alert[]>();

  for (const alert of sorted) {
    const period = getAlertPeriod(alert.receivedAt);
    const bucket = groups.get(period) ?? [];
    bucket.push(alert);
    groups.set(period, bucket);
  }

  return order
    .filter((period) => groups.has(period))
    .map((period) => ({ period, items: groups.get(period)! }));
}

export function countUnreadBuzon(notifications: Notification[]) {
  return notifications.filter((n) => n.channel === "buzon" && !n.read).length;
}

export function countUnreadAlerts(alerts: Alert[]) {
  return alerts.filter((a) => !a.read).length;
}

export function hasUnreadBuzon(notifications: Notification[]) {
  return countUnreadBuzon(notifications) > 0;
}

/** @deprecated Use ALERTS and getAlerts() instead. */
export const ALERT_NOTIFICATIONS = ALERTS;

/** @deprecated Use getAlerts() instead. */
export function getAlertNotifications() {
  return ALERTS;
}

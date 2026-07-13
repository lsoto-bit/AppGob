import type { NotifType } from "./notificationCategories";

export interface Notification {
  id: number;
  type: NotifType;
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

export const HOME_NOTIFICATION_IDS = [13, 11, 12, 9] as const;

export const HOME_NOTIFICATION_TIMES: Record<number, string> = {
  13: "Ahora",
  11: "Hace 1h",
  12: "Hace 3h",
  9: "Ayer",
};

export const ALL_NOTIFICATIONS: Notification[] = [
  {
    id: 13,
    type: "oficial",
    title: "Devolución por pagos dobles de contribuciones",
    body: "Su solicitud de devolución por pagos duplicados fue resuelta favorablemente. La devolución estará disponible a partir del 20/06/2026.",
    date: "14 jun 2026",
    read: false,
    detail:
      "Estimada María Valenzuela:\n\nTenemos el agrado de confirmar que la resolución de su solicitud N° 2026-PD-0847, de fecha 28 de mayo de 2026, ha sido resuelta favorablemente.\n\nTras revisar los pagos asociados a los Roles 12345-678 y 54321-987, se verificó la existencia de pagos duplicados correspondientes a la cuota N° 2 del año 2025 y la cuota N° 1 del año 2026.\n\nPor lo tanto, su devolución por pagos duplicados estará disponible a partir del día 20/06/2026.\n\nPuede consultar el estado de su devolución, obtener certificados de deuda y cupones de pago de contribuciones en las oficinas de ChileAtiende, o acceder a los servicios en línea disponibles las 24 horas en www.tgr.cl.",
    moreInfo: { label: "Consultar estado de devolución en TGR", url: "https://www.tgr.cl" },
  },
  {
    id: 11,
    type: "oficial",
    title: "Beneficio disponible: Cupón de Gas Licuado",
    body: "Según tu perfil socioeconómico, puedes acceder al Cupón de Gas Licuado del mes de julio. Revisa los requisitos y solicítalo antes del 31 de julio.",
    date: "14 jun 2026",
    read: false,
    detail:
      "El Ministerio de Energía confirma que tu hogar cumple los criterios del Registro Social de Hogares para acceder al subsidio de gas licuado de julio 2026.\n\nEl cupón corresponde a un aporte estatal para hogares vulnerables que utilizan cilindros de gas licuado. El monto se acredita según el tamaño del cilindro autorizado y la comuna de residencia.\n\nPlazo de solicitud: hasta el 31 de julio de 2026. Si no postulas dentro del plazo, deberás esperar la apertura del siguiente período.",
    moreInfo: { label: "Ver requisitos del Cupón de Gas Licuado", url: "#" },
  },
  {
    id: 12,
    type: "oficial",
    title: "Beneficio disponible: Bono Invierno 2026",
    body: "El Bono Invierno 2026 está disponible para tu hogar según tu Registro Social de Hogares. Presiona «Ver requisitos y montos del Bono Invierno 2026» para revisar el monto y las condiciones.",
    date: "13 jun 2026",
    read: false,
    detail:
      "El Bono Invierno es un beneficio del Ministerio de Desarrollo Social y Familia orientado a hogares en situación de vulnerabilidad socioeconómica durante los meses de mayor consumo energético.\n\nSegún la caracterización de tu hogar en el Registro Social de Hogares, cumples los requisitos para recibir el pago correspondiente al período 2026.\n\nEl monto y la fecha de pago dependen de tu tramo de calificación y del número de integrantes del hogar. Revisa las condiciones completas antes de postular.",
    moreInfo: { label: "Ver requisitos y montos del Bono Invierno 2026", url: "#" },
  },
  {
    id: 1,
    type: "oficial",
    title: "Resolución N° 4821/2026",
    body: "Se notifica la resolución de habilitación comercial correspondiente al expediente 2026-HB-0034.",
    date: "12 jun 2026",
    read: false,
    detail:
      "La Municipalidad de Santiago ha emitido la Resolución N° 4821/2026, que aprueba la habilitación comercial del local ubicado en Av. Providencia 1234, comuna de Providencia, correspondiente al expediente 2026-HB-0034.\n\nLa resolución tiene efecto a partir del 12 de junio de 2026 y debe exhibirse en el local conforme a la normativa vigente. Ante observaciones o reclamos, puede interponer los recursos administrativos dentro del plazo legal.",
    moreInfo: { label: "Ver resolución completa", url: "#" },
  },
  {
    id: 2,
    type: "oficial",
    title: "Citación judicial — 3.° Juzgado Civil de Santiago",
    body: "Se le cita a comparecer el 20 de junio de 2026 a las 09:00 hrs en Av. Libertador Bernardo O'Higgins 1449.",
    date: "11 jun 2026",
    read: false,
    detail:
      "El 3.° Juzgado Civil de Santiago le cita a comparecer personalmente el 20 de junio de 2026 a las 09:00 hrs, en Av. Libertador Bernardo O'Higgins 1449, piso 6, sala 602.\n\nDebe presentarse con cédula de identidad vigente. El no comparecencia sin causa justificada puede acarrear las sanciones previstas en el Código de Procedimiento Civil.\n\nSi requiere asistencia jurídica, puede consultar la Defensoría Penal Pública o los consultorios jurídicos de su comuna.",
    moreInfo: { label: "Ver detalle de la citación", url: "#" },
  },
  {
    id: 3,
    type: "oficial",
    title: "Multa de tránsito — Expediente 7743",
    body: "Se registró una infracción de tránsito el 08/06/2026. Tiene 15 días hábiles para impugnar.",
    date: "10 jun 2026",
    read: true,
    detail:
      "Se registró una infracción de tránsito asociada al expediente 7743, con fecha 08/06/2026. El monto de la multa y el tipo de infracción están disponibles en el detalle del expediente.\n\nTiene 15 días hábiles desde la notificación para impugnar ante el tribunal competente o pagar con descuento según la normativa del Juzgado de Policía Local correspondiente.\n\nEl pago o la impugnación fuera de plazo puede generar intereses y costas adicionales.",
    moreInfo: { label: "Ver expediente y opciones de pago", url: "#" },
  },
  {
    id: 4,
    type: "tramite",
    title: "Trámite aprobado",
    body: "Su solicitud de certificado de residencia (Exp. 2026-CR-0091) fue aprobada y está disponible para descarga.",
    date: "10 jun 2026",
    read: false,
    detail:
      "Su solicitud de certificado de residencia, expediente 2026-CR-0091, fue aprobada el 10 de junio de 2026.\n\nEl documento digital ya está disponible para descarga desde la sección Mis documentos. Tiene validez oficial y puede utilizarse en trámites ante organismos públicos y privados que lo requieran.\n\nSi detecta un error en los datos, puede solicitar una rectificación dentro de los 5 días hábiles siguientes a la emisión.",
    moreInfo: { label: "Descargar certificado", url: "#" },
  },
  {
    id: 5,
    type: "tramite",
    title: "Documentación incompleta",
    body: "Su trámite de renovación de licencia de conducir requiere adjuntar el certificado médico actualizado.",
    date: "05 jun 2026",
    read: true,
    detail:
      "El expediente de renovación de licencia de conducir se encuentra en estado «Documentación incompleta». Para continuar con la evaluación, debe adjuntar un certificado médico vigente emitido por un profesional autorizado.\n\nEl certificado no debe tener una antigüedad superior a 30 días al momento de la carga. Sin este documento, el trámite permanecerá suspendido y la hora agendada podría anularse automáticamente.",
    moreInfo: { label: "Ver documentos requeridos", url: "#" },
  },
  {
    id: 6,
    type: "tramite",
    title: "Turno asignado",
    body: "Se le asignó una hora para el martes 14 de junio de 2026 a las 10:00 hrs en la Municipalidad de Santiago.",
    date: "04 jun 2026",
    read: true,
    detail:
      "Se confirmó su hora de atención presencial para el martes 14 de junio de 2026 a las 10:00 hrs en la Municipalidad de Santiago, oficina de Atención Ciudadana, piso 1.\n\nRecuerde presentarse con cédula de identidad vigente y los antecedentes indicados al momento de la solicitud. Se recomienda llegar con 15 minutos de anticipación.\n\nSi no puede asistir, cancele o reprograme su hora con al menos 24 horas de anticipación.",
    moreInfo: { label: "Gestionar mi hora", url: "#" },
  },
  {
    id: 7,
    type: "recordatorio",
    title: "Licencia de conducir digital próxima a vencer",
    body: "Su licencia de conducir digital (N.° 8823041) vence el 31 de agosto de 2026. Recuerde solicitar su renovación en el Registro Civil con anticipación.",
    date: "08 jun 2026",
    read: false,
    detail:
      "Su licencia de conducir digital N.° 8823041 vence el 31 de agosto de 2026. Conducir con licencia vencida puede constituir infracción gravísima según la Ley de Tránsito.\n\nLa renovación puede realizarse en línea si cumple los requisitos médicos y no tiene licencia suspendida. De lo contrario, deberá concurrir a una sucursal del Registro Civil con hora previa.\n\nSe recomienda iniciar el trámite con al menos 30 días de anticipación.",
    moreInfo: { label: "Renovar licencia de conducir", url: "#" },
  },
  {
    id: 8,
    type: "recordatorio",
    title: "Pasaporte próximo a vencer",
    body: "Su pasaporte (N.° C12345678) vence el 06 de septiembre de 2026. Solicite su renovación con anticipación en el Registro Civil.",
    date: "06 jun 2026",
    read: true,
    detail:
      "Su pasaporte N.° C12345678 vence el 06 de septiembre de 2026. Muchos países exigen una vigencia mínima de 6 meses para el ingreso, por lo que conviene renovar con anticipación si tiene viajes programados.\n\nLa renovación requiere cédula de identidad vigente, comprobante de pago y hora en el Registro Civil. El plazo de entrega habitual es de 5 a 10 días hábiles.",
    moreInfo: { label: "Solicitar renovación de pasaporte", url: "#" },
  },
  {
    id: 9,
    type: "recordatorio",
    title: "Cédula de identidad próxima a vencer",
    body: "Su Cédula de Identidad (RUN 14.582.301-K) vence el 15 de agosto de 2026. Solicite su renovación con anticipación en el Registro Civil.",
    date: "01 jun 2026",
    read: false,
    detail:
      "Su Cédula de Identidad, RUN 14.582.301-K, vence el 15 de agosto de 2026. Una cédula vencida puede impedir la realización de trámites con el Estado, apertura de cuentas bancarias y controles de identidad.\n\nPuede solicitar la renovación en línea con ClaveÚnica o presencialmente en el Registro Civil. Se recomienda tramitarla con al menos 60 días de anticipación para evitar inconvenientes.",
    moreInfo: { label: "Renovar cédula de identidad", url: "#" },
  },
  {
    id: 10,
    type: "recordatorio",
    title: "Licencia de conducir — vencimiento en 60 días",
    body: "Su licencia de conducir vence el 12 de agosto de 2026. Solicite hora de renovación en el Registro Civil.",
    date: "28 may 2026",
    read: true,
    detail:
      "Su licencia de conducir vence el 12 de agosto de 2026. Este recordatorio se envía 60 días antes del vencimiento para que pueda planificar la renovación con tiempo.\n\nVerifique si requiere examen médico o curso de actualización según su edad y clase de licencia. La hora puede agendarse en el sitio del Registro Civil o en ChileAtiende.",
    moreInfo: { label: "Agendar hora de renovación", url: "#" },
  },
];

export function getHomeNotifications() {
  return HOME_NOTIFICATION_IDS.map((id) => {
    const notif = ALL_NOTIFICATIONS.find((n) => n.id === id);
    if (!notif) throw new Error(`Notification ${id} not found`);
    return { ...notif, homeTime: HOME_NOTIFICATION_TIMES[id] };
  });
}

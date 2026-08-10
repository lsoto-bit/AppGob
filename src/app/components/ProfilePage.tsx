import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { accordionExpandTransition } from "../motion/tokens";
import { Icon, type IconName, Button, Card, Badge, LinearProgress } from "./ui";
import { NavCardRow } from "./NavCardRow";
import {
  InteriorPageBody,
  InteriorPageLayout,
  InteriorPageSection,
} from "./InteriorPageLayout";
import { Page } from "./BottomNav";
import { DOCUMENTS, STATUS_BADGE } from "./DocumentsPage";
import { DocumentPhotoPlaceholder } from "./documents/DocumentAssets";

const IDENTIFICATION_DOCUMENTS = DOCUMENTS.filter(
  (doc) => doc.category === "identificacion",
);

export const PROFILE_SECTION_IDS = {
  datosPersonales: "datos-personales",
  rsh: "rsh",
  beneficios: "beneficios",
  previsional: "previsional",
  seguroSocial: "seguro-social",
} as const;

export type ProfileSectionId =
  (typeof PROFILE_SECTION_IDS)[keyof typeof PROFILE_SECTION_IDS];

export function profileHighlightId(label: string) {
  return `profile-highlight-${label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

function DataRow({
  label,
  value,
  highlightId,
}: {
  label: string;
  value: string;
  highlightId?: string;
}) {
  return (
    <div
      id={highlightId}
      className="flex flex-col gap-0.5 border-b border-[#ccc] py-3 last:border-b-0 scroll-mt-24"
    >
      <p className="text-[12px] tracking-[1px] text-[#666]">{label}</p>
      <p className="text-[16px] text-[#333]">{value}</p>
    </div>
  );
}

function SectionBlock({
  title,
  children,
  highlightId,
}: {
  title: string;
  children: React.ReactNode;
  highlightId?: string;
}) {
  return (
    <div className="mb-4" id={highlightId}>
      <p className="mb-2 text-[12px] tracking-[1px] text-[#666]">{title}</p>
      <Card variant="default" padding="sm" className="overflow-hidden rounded-[8px]">
        {children}
      </Card>
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <Badge variant="success" size="sm" weight="medium" className="tracking-widest">
      {text}
    </Badge>
  );
}

function IdentificationDocumentRow({
  name,
  status,
  onOpen,
  isLast = false,
}: {
  name: string;
  status: keyof typeof STATUS_BADGE;
  onOpen: () => void;
  isLast?: boolean;
}) {
  return (
    <Button
      onClick={onOpen}
      variant="list-row"
      size="none"
      className={`flex min-h-[40px] items-center justify-between px-4 py-4 active:bg-gray-50 ${
        !isLast ? "border-b border-[#ccc]" : ""
      }`}
    >
      <p className="min-w-0 flex-1 truncate text-[16px] leading-[19.5px] text-[#333]">{name}</p>
      <div className="ml-2 flex shrink-0 items-center gap-1 pl-2">
        <Badge
          size="sm"
          weight="bold"
          bg={STATUS_BADGE[status].bg}
          color={STATUS_BADGE[status].color}
          className="py-[2px] leading-[18px]"
        >
          {status}
        </Badge>
        <Icon name="chevron_right" size={20} className="text-[#0f5ac4] shrink-0" />
      </div>
    </Button>
  );
}

// ── Accordion section ─────────────────────────────────────────────────────────

function AccordionSection({
  sectionId,
  icon,
  title,
  sub,
  source,
  open,
  onToggle,
  children,
}: {
  sectionId: string;
  icon: IconName;
  title: string;
  sub: string;
  source?: string | null;
  open: boolean;
  onToggle: (sectionId: string) => void;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : accordionExpandTransition;

  return (
    <Card
      id={`profile-section-${sectionId}`}
      variant="elevated"
      overflow="hidden"
      className="scroll-mt-24 overflow-hidden rounded-[8px]"
    >
      <NavCardRow
        icon={icon}
        title={title}
        subtitle={sub}
        trailing="expand"
        open={open}
        onClick={() => onToggle(sectionId)}
      />
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="accordion-content"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transition}
            className="overflow-hidden border-t border-[#ccc] bg-white"
          >
            {source && (
              <div className="border-b border-[#ccc] bg-[#e7eff7] px-4 py-2.5">
                <p className="text-[12px] text-[#666]">
                  <span className="tracking-[1px]">Fuente — </span>
                  {source}
                </p>
              </div>
            )}
            <div className="px-4 py-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

// ── Section content ───────────────────────────────────────────────────────────

function DatosPersonales() {
  return (
    <div className="px-0">
      <DataRow label="Nombres" value="María Andrea" />
      <DataRow label="Primer apellido" value="Valenzuela" />
      <DataRow label="Segundo apellido" value="Rojas" />
      <DataRow label="Fecha de nacimiento" value="12/04/1985" />
      <DataRow label="RUT" value="14.582.301-K" />
    </div>
  );
}

function RegistroSocialHogares() {
  return (
    <div>
      <SectionBlock title="Información del hogar">
        <DataRow
          label="Integrantes del hogar"
          value="3 personas"
        />
        <DataRow
          label="Composición"
          value="Jefa de hogar, 1 hijo (12 años), 1 adulto mayor (68 años)"
        />
        <DataRow
          label="Fecha de ingreso al sistema"
          value="14/03/2018"
        />
        <DataRow
          label="Fecha de última actualización"
          value="07/11/2023"
        />
      </SectionBlock>
      <SectionBlock title="Calificación socioeconómica" highlightId={profileHighlightId("Calificación socioeconómica")}>
        <DataRow
          label="Tramo"
          value="40% — Acceso a subsidios prioritarios"
        />
      </SectionBlock>
      <SectionBlock title="Cobertura y afiliaciones">
        <DataRow
          label="Seguro de salud"
          value="FONASA — Tramo B"
        />
        <DataRow
          label="Cotizaciones en AFP"
          value="AFP Habitat — Al día"
        />
        <DataRow
          label="Seguro de cesantía"
          value="AFC Chile — Al día"
        />
        <DataRow
          label="Caja de compensación"
          value="Los Andes"
        />
      </SectionBlock>
    </div>
  );
}

function BeneficiosSociales() {
  const beneficios = [
    {
      nombre: "Aporte Familiar Permanente",
      monto: "$22.690",
      fecha: "15/05/2026",
      estado: "Pagado",
    },
    {
      nombre: "Bono Logro Escolar",
      monto: "$50.000",
      fecha: "20/03/2026",
      estado: "Pagado",
    },
    {
      nombre: "Bono por Hijo",
      monto: "$15.000",
      fecha: "15/05/2026",
      estado: "Pagado",
    },
    {
      nombre: "Pase Cultural",
      monto: "$50.000",
      fecha: "01/01/2026",
      estado: "Vigente",
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      {beneficios.map((b) => (
        <div
          key={b.nombre}
          id={profileHighlightId(b.nombre)}
          className="scroll-mt-24 overflow-hidden rounded-[8px] border border-[#ccc] bg-white"
        >
          <div className="flex items-center justify-between border-b border-[#ccc] px-3 py-2">
            <p className="text-[16px] text-[#333]">{b.nombre}</p>
            <Tag text={b.estado} />
          </div>
          <div className="grid grid-cols-2 divide-x divide-[#ccc]">
            <div className="px-3 py-2">
              <p className="text-[8px] tracking-[1px] text-[#666]">Monto</p>
              <p className="mt-0.5 text-[12px] text-[#333]">{b.monto}</p>
            </div>
            <div className="px-3 py-2">
              <p className="text-[8px] tracking-[1px] text-[#666]">Fecha de pago</p>
              <p className="mt-0.5 text-[12px] text-[#333]">{b.fecha}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function InformacionPrevisional() {
  const fondos = [
    { tipo: "Fondo C", porcentaje: "60%" },
    { tipo: "Fondo B", porcentaje: "40%" },
  ];
  return (
    <div>
      <SectionBlock title="AFP" highlightId={profileHighlightId("AFP Habitat")}>
        <DataRow
          label="Fecha afiliación al sistema previsional"
          value="02/08/2004"
        />
        <DataRow label="AFP actual" value="AFP Habitat" />
        <DataRow
          label="Fecha incorporación a AFP actual"
          value="15/03/2019"
        />
        <div className="py-3">
          <p className="mb-2 text-[12px] tracking-[1px] text-[#666]">Distribución de fondos</p>
          <div className="flex flex-col gap-1.5">
            {fondos.map((f, index) => (
              <div
                key={f.tipo}
                className={`flex items-center justify-between px-3 py-2 ${
                  index < fondos.length - 1 ? "border-b border-[#ccc]" : ""
                }`}
              >
                <p className="text-[12px] text-[#333]">{f.tipo}</p>
                <LinearProgress
                  value={parseInt(f.porcentaje, 10)}
                  className="w-[104px] shrink-0"
                />
              </div>
            ))}
          </div>
        </div>
      </SectionBlock>
      <SectionBlock title="Seguridad laboral">
        <DataRow
          label="Mutualidad"
          value="ACHS — Asociación Chilena de Seguridad"
          highlightId={profileHighlightId("Mutualidad ACHS")}
        />
        <DataRow
          label="Caja de compensación"
          value="Los Andes"
          highlightId={profileHighlightId("Caja de compensación Los Andes")}
        />
      </SectionBlock>
    </div>
  );
}

function SeguroSocial() {
  const cotizaciones = [
    {
      periodo: "May 2026",
      empleador: "Empresa Ejemplo SpA",
      monto: "$187.400",
      estado: "Pagada",
    },
    {
      periodo: "Abr 2026",
      empleador: "Empresa Ejemplo SpA",
      monto: "$187.400",
      estado: "Pagada",
    },
    {
      periodo: "Mar 2026",
      empleador: "Empresa Ejemplo SpA",
      monto: "$182.900",
      estado: "Pagada",
    },
    {
      periodo: "Feb 2026",
      empleador: "Empresa Ejemplo SpA",
      monto: "$182.900",
      estado: "Pagada",
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      {cotizaciones.map((c) => (
        <div
          key={c.periodo}
          className="overflow-hidden rounded-[8px] border border-[#ccc] bg-white"
        >
          <div className="flex items-center justify-between border-b border-[#ccc] px-3 py-2">
            <p className="text-[16px] text-[#333]">{c.periodo}</p>
            <Tag text={c.estado} />
          </div>
          <div className="px-3 py-2">
            <p className="text-[12px] text-[#666]">{c.empleador}</p>
            <p className="mt-0.5 text-[12px] text-[#333]">{c.monto}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

const DATA_SECTIONS: {
  sectionId: ProfileSectionId;
  icon: IconName;
  title: string;
  sub: string;
  source: string | null;
  content: React.ReactNode;
}[] = [
  {
    sectionId: PROFILE_SECTION_IDS.datosPersonales,
    icon: "person",
    title: "Datos personales",
    sub: "Nombres, apellidos, RUT, fecha de nacimiento",
    source: null,
    content: <DatosPersonales />,
  },
  {
    sectionId: PROFILE_SECTION_IDS.rsh,
    icon: "home",
    title: "Mi Registro Social de Hogares",
    sub: "Caracterización socioeconómica del hogar",
    source: "Ministerio de Desarrollo Social y Familia",
    content: <RegistroSocialHogares />,
  },
  {
    sectionId: PROFILE_SECTION_IDS.beneficios,
    icon: "payments",
    title: "Mis pagos de beneficios sociales",
    sub: "Aportes, bonos y beneficios recibidos",
    source: "Instituto de Previsión Social",
    content: <BeneficiosSociales />,
  },
  {
    sectionId: PROFILE_SECTION_IDS.previsional,
    icon: "verified_user",
    title: "Mi información previsional",
    sub: "AFP, mutualidad y caja de compensación",
    source:
      "Revisa los datos que tu Administradora de Fondos de Pensiones (AFP) tiene registrados.",
    content: <InformacionPrevisional />,
  },
  {
    sectionId: PROFILE_SECTION_IDS.seguroSocial,
    icon: "favorite",
    title: "Mi Seguro Social",
    sub: "Cotizaciones al sistema integrado",
    source: "Instituto de Previsión Social",
    content: <SeguroSocial />,
  },
];

export function ProfilePage({
  onBack,
  onLogout,
  onNavigate,
  onOpenDocument,
  initialProfileSectionId = null,
  initialProfileHighlight = null,
  onInitialProfileTargetConsumed,
}: {
  onBack: () => void;
  onLogout?: () => void;
  onNavigate: (page: Page) => void;
  onOpenDocument?: (documentId: number) => void;
  initialProfileSectionId?: ProfileSectionId | null;
  initialProfileHighlight?: string | null;
  onInitialProfileTargetConsumed?: () => void;
}) {
  const [openSectionId, setOpenSectionId] = useState<ProfileSectionId | null>(null);

  useEffect(() => {
    if (initialProfileSectionId == null) return;

    setOpenSectionId(initialProfileSectionId);

    const scrollTimer = window.setTimeout(() => {
      const targetId = initialProfileHighlight
        ? profileHighlightId(initialProfileHighlight)
        : `profile-section-${initialProfileSectionId}`;
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      onInitialProfileTargetConsumed?.();
    }, 150);

    return () => window.clearTimeout(scrollTimer);
  }, [initialProfileSectionId, initialProfileHighlight, onInitialProfileTargetConsumed]);

  function handleToggle(sectionId: string) {
    setOpenSectionId((current) =>
      current === sectionId ? null : (sectionId as ProfileSectionId),
    );
  }
  return (
    <InteriorPageLayout
      onBack={onBack}
      title="Mi perfil"
      backRowExtra={
        <Button
          onClick={() => onNavigate("settings")}
          variant="nav-back"
          size="compact"
          className="ml-0 min-h-11 shrink-0 gap-1 border-0 px-2 py-2"
          aria-label="Configuración"
        >
          <span className="text-[8px] font-bold leading-none tracking-[0.9px]">Configuración</span>
          <Icon name="settings" size={24} className="inline-flex items-center justify-center" />
        </Button>
      }
    >
      <InteriorPageBody className="gap-4 pt-4">
        <InteriorPageSection label="Identificación" className="gap-2.5">
          <Card variant="elevated" overflow="hidden" className="overflow-hidden rounded-[8px]">
            <div className="flex items-center gap-4 px-4 py-5">
              <DocumentPhotoPlaceholder className="block h-[104px] w-[80px] shrink-0" />
              <div className="min-w-0">
                <p className="text-[16px] leading-6 text-[#333]">María Andrea Valenzuela Rojas</p>
                <p className="pt-0.5 text-[12px] leading-[18px] text-[#666]">RUT 14.582.301-K</p>
                <p className="text-[12px] leading-[18px] text-[#666]">maria.valenzuela@correo.cl</p>
              </div>
            </div>

            <div className="border-t border-[#ccc]">
              {IDENTIFICATION_DOCUMENTS.map((doc, index) => (
                <IdentificationDocumentRow
                  key={doc.id}
                  name={doc.name}
                  status={doc.status}
                  isLast={index === IDENTIFICATION_DOCUMENTS.length - 1}
                  onOpen={() => onOpenDocument?.(doc.id)}
                />
              ))}
            </div>
          </Card>
        </InteriorPageSection>

        <InteriorPageSection label="Datos del Estado">
          <div className="flex flex-col gap-2">
            {DATA_SECTIONS.map(({ sectionId, icon, title, sub, source, content }) => (
              <AccordionSection
                key={sectionId}
                sectionId={sectionId}
                icon={icon}
                title={title}
                sub={sub}
                source={source}
                open={openSectionId === sectionId}
                onToggle={handleToggle}
              >
                {content}
              </AccordionSection>
            ))}
          </div>
        </InteriorPageSection>

        <Button
          onClick={onLogout}
          variant="destructive"
          size="md"
          fullWidth
          className="mb-2 mt-6"
        >
          Cerrar sesión
        </Button>
      </InteriorPageBody>
    </InteriorPageLayout>
  );
}
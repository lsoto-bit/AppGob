import { useEffect, useState } from "react";
import { Icon, type IconName } from "./Icon";
import { Button } from "./Button";
import { GobFranja } from "./GobFranja";
import { Page } from "./BottomNav";
import { DOCUMENTS, STATUS_BADGE } from "./DocumentsPage";

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
      className="flex flex-col gap-0.5 py-3 border-b border-border last:border-b-0 scroll-mt-24"
    >
      <p className="text-[10px] tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="text-[13px]">{value}</p>
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
      <p className="text-[10px] tracking-widest text-muted-foreground mb-2">
        {title}
      </p>
      <div className="rounded-2xl border border-[#ccc] bg-white px-4">
        {children}
      </div>
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span className="bg-[#E8F5E9]  px-2 py-0.5 text-[10px] font-medium rounded-[4px] tracking-widest text-[#1B5E20]" >
      {text}
    </span>
  );
}

function DocumentThumbnail() {
  return (
    <div className="w-9 h-6 border-2 border-border flex flex-col items-center justify-end pb-1.5 shrink-0 relative px-0.5 pt-0.5">
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-b-2 border-l-2 border-border bg-background" />
      <div className="w-5 h-px bg-muted mb-0.5" />
      <div className="w-5 h-px bg-muted mb-0.5" />
      <div className="w-3 h-px bg-muted" />
    </div>
  );
}

function IdentificationDocumentRow({
  name,
  status,
  onOpen,
}: {
  name: string;
  status: keyof typeof STATUS_BADGE;
  onOpen: () => void;
}) {
  return (
    <Button
      onClick={onOpen}
      variant="list-row"
      size="none"
      className="flex items-center justify-between px-4 py-4 min-h-10"
    >
      <div className="flex items-center gap-2 min-w-0">
        <DocumentThumbnail />
        <p className="text-[13px] truncate">{name}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0 ml-2">
        <span
          className="rounded-[4px] px-2 py-0.5 text-[10px] font-bold text-center leading-[150%]"
          style={{
            background: STATUS_BADGE[status].bg,
            color: STATUS_BADGE[status].color,
          }}
        >
          {status}
        </span>
        <Icon name="chevron_right" size={16} className="text-[#0f5ac4]" />
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
  return (
    <div id={`profile-section-${sectionId}`} className="rounded-2xl border border-[#ccc] bg-white scroll-mt-24">
      <Button
        onClick={() => onToggle(sectionId)}
        variant="list-row"
        size="none"
        className="flex items-center justify-between px-4 py-3.5"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#f2f2f2] rounded-[8px] flex items-center justify-center shrink-0">
            <Icon
              name={icon}
              size={16}
              className="text-[#0f5ac4]"
            />
          </div>
          <div>
            <p className="text-[13px]">{title}</p>
            <p className="text-[10px] text-muted-foreground">
              {sub}
            </p>
          </div>
        </div>
        {open ? (
          <Icon
            name="expand_less"
            size={14}
            className="text-[#0f5ac4] shrink-0"
          />
        ) : (
          <Icon
            name="expand_more"
            size={14}
            className="text-muted-foreground shrink-0"
          />
        )}
      </Button>
      {open && (
        <div className="border-t border-border">
          {source && (
            <div className="px-4 py-2.5 border-b border-border bg-muted">
              <p className="text-[10px] text-muted-foreground">
                <span className="tracking-widest">
                  Fuente —{" "}
                </span>
                {source}
              </p>
            </div>
          )}
          <div className="px-4 py-4">{children}</div>
        </div>
      )}
    </div>
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
    <div className="flex flex-col gap-3 rounded-2xl ">
      {beneficios.map((b) => (
        <div
          key={b.nombre}
          id={profileHighlightId(b.nombre)}
          className="border border-border bg-background rounded-[16px] scroll-mt-24"
        >
          <div className="px-3 py-2 border-b border-border flex items-center justify-between">
            <p className="text-[12px]">{b.nombre}</p>
            <Tag text={b.estado} />
          </div>
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="px-3 py-2">
              <p className="text-[9px] tracking-widest text-muted-foreground">
                Monto
              </p>
              <p className="text-[12px] mt-0.5">{b.monto}</p>
            </div>
            <div className="px-3 py-2">
              <p className="text-[9px] tracking-widest text-muted-foreground">
                Fecha de pago
              </p>
              <p className="text-[12px] mt-0.5">{b.fecha}</p>
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
          <p className="text-[10px] tracking-widest text-muted-foreground mb-2">
            Distribución de fondos
          </p>
          <div className="flex flex-col gap-1.5">
            {fondos.map((f) => (
              <div
                key={f.tipo}
                className="flex items-center justify-between border border-border px-3 py-2"
              >
                <p className="text-[12px]">{f.tipo}</p>
                <div className="flex items-center gap-3">
                  {/* Mini bar */}
                  <div className="w-20 h-1.5 bg-muted relative">
                    <div
                      className="absolute left-0 top-0 h-full bg-primary"
                      style={{ width: f.porcentaje }}
                    />
                  </div>
                  <p className="text-[12px] w-8 text-right">
                    {f.porcentaje}
                  </p>
                </div>
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
          className="border border-border bg-background rounded-[16px]"
        >
          <div className="px-3 py-2 border-b border-border flex items-center justify-between">
            <p className="text-[12px]">{c.periodo}</p>
            <Tag text={c.estado} />
          </div>
          <div className="px-3 py-2">
            <p className="text-[10px] text-muted-foreground">
              {c.empleador}
            </p>
            <p className="text-[13px] mt-0.5">{c.monto}</p>
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
    <div className="w-full max-w-[390px] min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3 relative">
        <GobFranja />
        <div className="flex items-center justify-between mb-4">
          <Button onClick={onBack} variant="nav-back" size="none" aria-label="Volver">
            <Icon name="arrow_back" size={18} />
            <span className="text-[12px] tracking-widest">
              Inicio
            </span>
          </Button>
          <Button
            onClick={() => onNavigate("settings")}
            variant="nav-back"
            size="compact"
            className="min-h-11 px-2 py-2 gap-1 border-0 ml-0 shrink-0"
            aria-label="Configuración"
          >
            <span className="text-[9px] font-bold tracking-[0.9px] leading-none">Configuración</span>
            <Icon name="settings" size={24} className="inline-flex items-center justify-center" />
          </Button>
        </div>
        <h1 className="text-[#333]">Mi perfil</h1>
      </header>

      {/* Identity card */}
      <div className="mx-4 mt-5 rounded-2xl border border-[#ccc] bg-white overflow-hidden">
        <div className="flex items-center gap-4 px-4 py-5">
          <div className="w-14 h-14 border-2 border-border flex items-center justify-center shrink-0">
            <Icon
              name="person"
              size={24}
              className="text-muted-foreground"
            />
          </div>
          <div>
            <p className="text-[15px]">
              María Andrea Valenzuela Rojas
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              RUT 14.582.301-K
            </p>
            <p className="text-[11px] text-muted-foreground">
              maria.valenzuela@correo.cl
            </p>
          </div>
        </div>

        <div className="border-t border-[#ccc]">
          <p className="text-[10px] tracking-widest text-muted-foreground text-left pt-2 px-4">
            Documentos de identificación
          </p>
          <div className="divide-y divide-[#ccc]">
            {IDENTIFICATION_DOCUMENTS.map((doc) => (
              <IdentificationDocumentRow
                key={doc.id}
                name={doc.name}
                status={doc.status}
                onOpen={() => onOpenDocument?.(doc.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Data sections */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-6 flex flex-col gap-2">
        <p className="text-[10px] tracking-widest text-muted-foreground mb-1">
          Datos del Estado
        </p>
        {DATA_SECTIONS.map(
          ({ sectionId, icon, title, sub, source, content }) => (
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
          ),
        )}

        {/* Sign out */}
        <Button
          onClick={onLogout}
          variant="destructive"
          size="md"
          fullWidth
          className="mt-10 mb-4"
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}
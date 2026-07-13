import { useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  User,
  Home,
  Banknote,
  ShieldCheck,
  Heart,
  LogOut,
} from "lucide-react";

// ── Primitives ────────────────────────────────────────────────────────────────

function DataRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 py-3 border-b border-border last:border-b-0">
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
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
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

// ── Accordion section ─────────────────────────────────────────────────────────

function AccordionSection({
  icon: Icon,
  title,
  sub,
  source,
  children,
}: {
  icon: React.ElementType;
  title: string;
  sub: string;
  source?: string | null;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-[#ccc] bg-white">
      <button 
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3.5 active:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <Icon
            size={15}
            strokeWidth={1.5}
            className="text-[#0f5ac4] shrink-0"
          />
          <div>
            <p className="text-[13px]">{title}</p>
            <p className="text-[10px] text-muted-foreground">
              {sub}
            </p>
          </div>
        </div>
        {open ? (
          <ChevronUp
            size={14}
            strokeWidth={1.5}
            className="text-[#0f5ac4] shrink-0"
          />
        ) : (
          <ChevronDown
            size={14}
            strokeWidth={1.5}
            className="text-muted-foreground shrink-0"
          />
        )}
      </button>
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
      <SectionBlock title="Calificación socioeconómica">
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
          className="border border-border bg-background rounded-[16px]"
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
      <SectionBlock title="AFP">
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
        />
        <DataRow
          label="Caja de compensación"
          value="Los Andes"
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

const DATA_SECTIONS = [
  {
    icon: User,
    title: "Datos personales",
    sub: "Nombres, apellidos, RUT, fecha de nacimiento",
    source: null,
    content: <DatosPersonales />,
  },
  {
    icon: Home,
    title: "Mi Registro Social de Hogares",
    sub: "Caracterización socioeconómica del hogar",
    source: "Ministerio de Desarrollo Social y Familia",
    content: <RegistroSocialHogares />,
  },
  {
    icon: Banknote,
    title: "Mis pagos de beneficios sociales",
    sub: "Aportes, bonos y beneficios recibidos",
    source: "Instituto de Previsión Social",
    content: <BeneficiosSociales />,
  },
  {
    icon: ShieldCheck,
    title: "Mi información previsional",
    sub: "AFP, mutualidad y caja de compensación",
    source:
      "Revisa los datos que tu Administradora de Fondos de Pensiones (AFP) tiene registrados.",
    content: <InformacionPrevisional />,
  },
  {
    icon: Heart,
    title: "Mi Seguro Social",
    sub: "Cotizaciones al sistema integrado",
    source: "Instituto de Previsión Social",
    content: <SeguroSocial />,
  },
];

import { BottomNav, Page } from "./BottomNav";

export function ProfilePage({
  onBack,
  onLogout,
  onNavigate,
}: {
  onBack: () => void;
  onLogout?: () => void;
  onNavigate: (page: Page) => void;
}) {
  return (
    <div className="w-full max-w-[390px] min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 p-1 -ml-1 text-[#0046a8] active:bg-blue-50 rounded-full transition-colors mb-4"
          aria-label="Volver"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="text-[12px] tracking-widest">
            Inicio
          </span>
        </button>
        <h1 className="text-[#333]">Mi perfil</h1>
      </header>

      {/* Identity card */}
      <div className="mx-4 mt-5 rounded-2xl border border-[#ccc] bg-white">
        <div className="flex items-center gap-4 px-4 py-5 ">
          <div className="w-14 h-14 border-2 border-border flex items-center justify-center shrink-0">
            <User
              size={24}
              strokeWidth={1.5}
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
      </div>

      {/* Data sections */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-6 flex flex-col gap-2">
        <p className="text-[10px] tracking-widest text-muted-foreground mb-1">
          Datos del Estado
        </p>
        {DATA_SECTIONS.map(
          ({ icon, title, sub, source, content }) => (
            <AccordionSection
              key={title}
              icon={icon}
              title={title}
              sub={sub}
              source={source}
            >
              {content}
            </AccordionSection>
          ),
        )}

        {/* Sign out */}
        <div className="rounded-2xl border border-[#ccc] bg-white mt-2 mb-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-gray-50 text-left transition-colors"
          >
            <LogOut
              size={15}
              strokeWidth={1.5}
              className="text-muted-foreground shrink-0"
            />
            <p className="text-[13px]">Cerrar sesión</p>
          </button>
        </div>
      </div>
      <BottomNav active="profile" onNavigate={onNavigate} />
    </div>
  );
}
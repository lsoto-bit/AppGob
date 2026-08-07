import { useState } from "react";
import { BottomSheet } from "./BottomSheet";
import { Icon, type IconName, Button, Card, SearchInput, IconBox } from "./ui";
import { AppIntroCarouselCard } from "./AppIntroCarousel";
import { DialogOverlay } from "./ScreenOverlay";
import { GobFranja } from "./GobFranja";
import { useOnboarding } from "../context/OnboardingContext";
import { Page } from "./BottomNav";

// ── Glossary ──────────────────────────────────────────────────────────────────

export const GLOSSARY = [
  {
    term: "2FA / Segundo factor",
    def: "Verificación en dos pasos. Además de la contraseña, se solicita un código adicional para confirmar tu identidad.",
  },
  {
    term: "AFP",
    def: "Administradora de Fondos de Pensiones. Empresa privada que administra los ahorros previsionales de los trabajadores.",
  },
  {
    term: "Notificación del Estado",
    def: "Comunicación oficial que un servicio público te envía por MiGob (antes llamada «aviso del Estado»). Puede ser un beneficio, una citación, una cobranza o un resultado de trámite. No es un documento de identidad.",
  },
  {
    term: "Beneficio social",
    def: "Aporte económico o servicio que el Estado entrega a personas o familias según la situación socioeconómica del hogar.",
  },
  {
    term: "Certificado digital",
    def: "Documento oficial emitido electrónicamente por un organismo público con validez legal.",
  },
  {
    term: "ChileAtiende",
    def: "Red de atención del Estado que permite realizar trámites de distintos servicios públicos en un mismo lugar.",
  },
  {
    term: "ClaveÚnica",
    def: "Contraseña única emitida por el Registro Civil que permite identificarse digitalmente ante el Estado de Chile.",
  },
  {
    term: "Documento vigente",
    def: "Documento cuya fecha de vencimiento no ha expirado y tiene validez legal al momento de ser presentado.",
  },
  {
    term: "FONASA",
    def: "Fondo Nacional de Salud. Institución pública que otorga cobertura de salud a los afiliados al sistema público.",
  },
  {
    term: "Notificación inmediata",
    def: "Aviso que la aplicación envía directamente a tu celular, incluso cuando la app no está abierta.",
  },
  {
    term: "Registro Social de Hogares",
    def: "Base de datos del Estado que caracteriza la situación socioeconómica de los hogares para asignar beneficios.",
  },
  {
    term: "RUN",
    def: "Rol Único Nacional. Número de identificación que el Estado asigna a cada persona natural en Chile.",
  },
  {
    term: "SENCE",
    def: "Servicio Nacional de Capacitación y Empleo. Organismo que financia cursos de formación laboral para trabajadores.",
  },
  {
    term: "SENADIS",
    def: "Servicio Nacional de la Discapacidad. Organismo que promueve los derechos de las personas con discapacidad.",
  },
  {
    term: "SMS",
    def: "Mensaje de texto enviado a tu teléfono celular. Se usa para enviar códigos de verificación o alertas.",
  },
  {
    term: "Trámite en línea",
    def: "Gestión o solicitud que puede realizarse completamente por internet, sin necesidad de asistir a una oficina.",
  },
];

function Glossary() {
  const [query, setQuery] = useState("");
  const filtered = GLOSSARY.filter(
    ({ term, def }) =>
      term.toLowerCase().includes(query.toLowerCase()) ||
      def.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="hidden">
      <p className="text-[10px] tracking-widest text-muted-foreground mb-3">Glosario</p>
      <SearchInput
        layout="inline"
        wrapperClassName="mb-3"
        placeholder="Buscar en el glosario…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClear={() => setQuery("")}
      />
      {filtered.length === 0 ? (
        <p className="text-[11px] text-muted-foreground px-1">No se encontraron términos.</p>
      ) : (
        <Card divided>
          {filtered.map(({ term, def }) => (
            <div key={term} className="px-4 py-3">
              <p className="text-[12px] mb-0.5">{term}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{def}</p>
            </div>
          ))}
        </Card>
      )}
    </section>
  );
}

// ── Contact methods ────────────────────────────────────────────────────────────

const CONTACT_METHODS: {
  icon: IconName;
  label: string;
  value: string;
  sub: string;
  href: string;
}[] = [
  {
    icon: "call",
    label: "Teléfono",
    value: "800-400-000 (ChileAtiende)",
    sub: "Lunes a viernes, 8:00 a 20:00 · Gratuito",
    href: "tel:800400000",
  },
  {
    icon: "mail",
    label: "Correo electrónico",
    value: "atencion@gob.cl",
    sub: "Respuesta en 48 horas hábiles",
    href: "mailto:atencion@gob.cl",
  },
];

function ContactMethods() {
  return (
    <section>
      <p className="text-[10px] tracking-widest text-muted-foreground mb-3">
        Métodos de contacto
      </p>
      <Card divided>
        {CONTACT_METHODS.map(({ icon, label, value, sub, href }) => (
          <a
            key={label}
            href={href}
            className="flex items-start gap-3 px-4 py-3.5 active:bg-muted transition-colors"
          >
            <IconBox className="mt-0.5">
              <Icon name={icon} size={14} className="text-[#0f5ac4]" />
            </IconBox>
            <div className="min-w-0">
              <p className="text-[10px] tracking-widest text-muted-foreground">{label}</p>
              <p className="text-[13px] mt-0.5">{value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
            </div>
          </a>
        ))}
      </Card>
    </section>
  );
}

// ── Report problem ─────────────────────────────────────────────────────────────

function ReportProblemModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");
  const [type, setType] = useState("");

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      panelClassName="bg-card border-t border-border"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="warning" size={14} className="text-muted-foreground" />
          <p className="text-[13px] tracking-widest">Reportar un problema</p>
        </div>
        <Button onClick={onClose} variant="icon-muted" size="icon" aria-label="Cerrar">
          <Icon name="close" size={15} />
        </Button>
      </div>

      {sent ? (
        <div className="px-4 py-8 text-center">
          <p className="text-[13px]">Reporte enviado</p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Gracias por informar el problema. Lo revisaremos a la brevedad.
          </p>
          <Button onClick={onClose} variant="ghost" size="sm" className="mt-5">
            Cerrar
          </Button>
        </div>
      ) : (
        <div className="px-4 pt-4 pb-6 flex flex-col gap-3">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-border bg-input-background px-3 py-2 text-[12px] text-foreground outline-none focus:border-primary"
          >
            <option value="">Tipo de problema…</option>
            <option>Error al cargar una pantalla</option>
            <option>Botón o función que no responde</option>
            <option>Información incorrecta</option>
            <option>Problema con mi cuenta o sesión</option>
            <option>Otro</option>
          </select>
          <textarea
            rows={4}
            placeholder="Describa brevemente el problema encontrado..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-border bg-input-background px-3 py-2 text-[12px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary resize-none"
          />
          <Button
            onClick={() => (text.trim() && type) && setSent(true)}
            disabled={!text.trim() || !type}
            variant="primary"
            size="md"
            fullWidth
          >
            Enviar reporte
          </Button>
        </div>
      )}
    </BottomSheet>
  );
}

function ReportProblem() {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <p className="text-[10px] tracking-widest text-muted-foreground mb-3">
        Reportar un problema
      </p>
      <Button onClick={() => setOpen(true)} variant="card" size="md" fullWidth>
        <IconBox>
          <Icon name="warning" size={14} className="text-[#0f5ac4]" />
        </IconBox>
        <div>
          <p className="text-[13px]">¿Encontró un error en la aplicación?</p>
          <p className="text-[10px] text-muted-foreground">Envíanos un reporte</p>
        </div>
      </Button>
      <ReportProblemModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

// ── Onboarding ─────────────────────────────────────────────────────────────────

function OnboardingModal({ onClose }: { onClose: () => void }) {
  return (
    <DialogOverlay onBackdropClick={onClose} zIndex={200}>
      <div className="relative w-full max-w-[342px] mx-auto">
        <Button
          type="button"
          onClick={onClose}
          variant="icon"
          size="icon-circle"
          className="absolute -top-10 right-0 shadow-sm text-[#333] z-10"
          aria-label="Cerrar introducción"
        >
          <Icon name="close" size={15} />
        </Button>
        <AppIntroCarouselCard />
      </div>
    </DialogOverlay>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

export function AssistancePage({ onBack, onNavigate }: { onBack: () => void; onNavigate: (page: Page) => void }) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { replaySetup, replayTour } = useOnboarding();

  function handleReplayTour() {
    onNavigate("home");
    replayTour();
  }

  function handleReplaySetup() {
    onNavigate("home");
    replaySetup();
  }

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-background flex flex-col">
      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3 relative">
        <GobFranja />
        <Button onClick={onBack} variant="nav-back" size="none" className="mb-4" aria-label="Volver">
          <Icon name="arrow_back" size={18} />
          Inicio
        </Button>
        <h1 className="text-[#333]">Asistencia y soporte</h1>
        <p className="text-[11px] text-[#808080] mt-1">
          Encuentre respuestas o comuníquese con el Estado.
        </p>
      </header>

      <div className="px-4 pt-4 flex flex-col gap-3">
        <Button
          onClick={() => setShowOnboarding(true)}
          variant="card"
          size="md"
          fullWidth
        >
          <div className="flex items-center gap-3">
            <IconBox>
              <Icon name="replay" size={14} className="text-[#0f5ac4]" />
            </IconBox>
            <div className="text-left">
              <p className="text-[13px]">Ver introducción a la aplicación</p>
              <p className="text-[10px] text-muted-foreground">Repase las funcionalidades principales</p>
            </div>
          </div>
        </Button>

        <Button
          onClick={handleReplaySetup}
          variant="card"
          size="md"
          fullWidth
          className="justify-between"
        >
          <div className="flex items-center gap-3">
            <IconBox>
              <Icon name="tune" size={14} className="text-[#0f5ac4]" />
            </IconBox>
            <div className="text-left">
              <p className="text-[13px]">Repetir configuración inicial</p>
              <p className="text-[10px] text-muted-foreground">Notificaciones y ubicación</p>
            </div>
          </div>
        </Button>

        <Button
          onClick={handleReplayTour}
          variant="card"
          size="md"
          fullWidth
          className="justify-between"
        >
          <div className="flex items-center gap-3">
            <IconBox>
              <Icon name="support_agent" size={14} className="text-[#0f5ac4]" />
            </IconBox>
            <div className="text-left">
              <p className="text-[13px]">Recorrido por la interfaz</p>
              <p className="text-[10px] text-muted-foreground">Descubre dónde está cada función</p>
            </div>
          </div>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-10 flex flex-col gap-6">
        <ContactMethods />
        <Glossary />
        <ReportProblem />
      </div>

      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
    </div>
  );
}

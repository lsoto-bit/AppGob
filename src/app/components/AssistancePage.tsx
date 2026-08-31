import { useState } from "react";
import { BottomSheet } from "./BottomSheet";
import { Icon, type IconName, Button, Card, SearchInput, IconBox } from "./ui";
import { NavCardRow } from "./NavCardRow";
import { AppIntroCarouselCard } from "./AppIntroCarousel";
import { DialogOverlay } from "./ScreenOverlay";
import {
  InteriorPageBody,
  InteriorPageLayout,
  InteriorPageSection,
} from "./InteriorPageLayout";
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
      <InteriorPageSection label="Glosario">
        <SearchInput
          layout="inline"
          wrapperClassName="mb-3"
          placeholder="Buscar en el glosario…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => setQuery("")}
        />
        {filtered.length === 0 ? (
          <p className="px-1 text-xs text-muted-foreground">No se encontraron términos.</p>
        ) : (
          <Card variant="elevated" divided overflow="hidden">
            {filtered.map(({ term, def }) => (
              <div key={term} className="px-4 py-3">
                <p className="mb-0.5 text-xs">{term}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{def}</p>
              </div>
            ))}
          </Card>
        )}
      </InteriorPageSection>
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
    <InteriorPageSection label="Métodos de contacto">
      <Card variant="elevated" divided overflow="hidden">
        {CONTACT_METHODS.map(({ icon, label, value, sub, href }) => (
          <a
            key={label}
            href={href}
            className="flex items-start gap-3 px-4 py-[14px] transition-colors active:bg-muted"
          >
            <IconBox className="mt-0.5">
              <Icon name={icon} size={16} width={20} height={24} className="text-primary" />
            </IconBox>
            <div className="min-w-0">
              <p className="type-label-section text-muted-foreground">{label}</p>
              <p className="mt-0.5 text-xs font-normal">{value}</p>
              <p className="mt-0.5 text-xs font-normal text-muted-foreground">{sub}</p>
            </div>
          </a>
        ))}
      </Card>
    </InteriorPageSection>
  );
}

// ── Report problem ─────────────────────────────────────────────────────────────

function ReportProblemModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");
  const [type, setType] = useState("");

  const fieldClassName =
    "w-full border border-foreground rounded bg-white px-3 py-2 text-base text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      panelClassName="bg-white border-t border-border"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="warning" size={14} className="text-primary" />
          <p className="text-xs tracking-[1.3px] text-foreground font-normal">
            Reportar un problema
          </p>
        </div>
        <Button onClick={onClose} variant="icon-muted" size="icon" aria-label="Cerrar">
          <Icon name="close" size={15} />
        </Button>
      </div>

      {sent ? (
        <div className="px-4 py-8 text-center">
          <p className="text-xs">Reporte enviado</p>
          <p className="text-xs text-muted-foreground mt-1">
            Gracias por informar el problema. Lo revisaremos a la brevedad.
          </p>
          <Button onClick={onClose} variant="ghost" size="sm" className="mt-5">
            Cerrar
          </Button>
        </div>
      ) : (
        <div className="px-4 pt-4 pb-6 flex flex-col gap-3">
          <div className="relative">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={`${fieldClassName} appearance-none pr-10`}
            >
              <option value="">Tipo de problema...</option>
              <option>Error al cargar una pantalla</option>
              <option>Botón o función que no responde</option>
              <option>Información incorrecta</option>
              <option>Problema con mi cuenta o sesión</option>
              <option>Otro</option>
            </select>
            <Icon
              name="expand_more"
              size={24}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-foreground"
            />
          </div>
          <textarea
            rows={4}
            placeholder="Describa brevemente el problema encontrado..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`${fieldClassName} h-[110px] placeholder:text-muted-foreground resize-none`}
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
    <InteriorPageSection label="Reportar un problema">
      <Card variant="elevated" overflow="hidden">
        <NavCardRow
          icon="warning"
          title="¿Encontró un error en la aplicación?"
          subtitle="Envíanos un reporte"
          trailing="none"
          onClick={() => setOpen(true)}
        />
      </Card>
      <ReportProblemModal open={open} onClose={() => setOpen(false)} />
    </InteriorPageSection>
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
          className="absolute -top-10 right-0 shadow-sm text-foreground z-10"
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
    <InteriorPageLayout
      onBack={onBack}
      title="Asistencia y soporte"
      description="Encuentre respuestas o comuníquese con el Estado."
    >
      <InteriorPageBody className="gap-6 pt-4">
        <InteriorPageSection label="Acciones rápidas" className="gap-3">
          <Card variant="elevated" overflow="hidden">
            <NavCardRow
              icon="replay"
              title="Ver introducción a la aplicación"
              subtitle="Repase las funcionalidades principales"
              trailing="none"
              onClick={() => setShowOnboarding(true)}
            />
          </Card>

          <Card variant="elevated" overflow="hidden">
            <NavCardRow
              icon="tune"
              title="Repetir configuración inicial"
              subtitle="Notificaciones y ubicación"
              trailing="none"
              onClick={handleReplaySetup}
            />
          </Card>

          <Card variant="elevated" overflow="hidden">
            <NavCardRow
              icon="support_agent"
              title="Recorrido por la interfaz"
              subtitle="Descubre dónde está cada función"
              trailing="none"
              onClick={handleReplayTour}
            />
          </Card>
        </InteriorPageSection>

        <ContactMethods />
        <Glossary />
        <ReportProblem />
      </InteriorPageBody>

      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
    </InteriorPageLayout>
  );
}

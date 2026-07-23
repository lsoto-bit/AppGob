import { useState } from "react";
import { BottomSheet } from "./BottomSheet";
import { Button } from "./Button";
import { Icon, type IconName } from "./Icon";
import { AppIntroCarouselCard } from "./AppIntroCarousel";
import { DialogOverlay } from "./ScreenOverlay";
import { GobFranja } from "./GobFranja";

// ── Glossary ──────────────────────────────────────────────────────────────────

export const GLOSSARY = [
  {
    term: "2FA / Segundo factor",
    def: "Verificación en dos pasos. Además de la contraseña, se solicita un código adicional para confirmar su identidad.",
  },
  {
    term: "AFP",
    def: "Administradora de Fondos de Pensiones. Empresa privada que administra los ahorros previsionales de los trabajadores.",
  },
  {
    term: "Aviso del Estado",
    def: "Comunicación oficial que un servicio público le envía por MiGob. Puede ser un beneficio, una citación, una cobranza o un resultado de trámite. No es un documento de identidad.",
  },
  {
    term: "Beneficio social",
    def: "Aporte económico o servicio que el Estado entrega a personas o familias según su situación socioeconómica.",
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
    term: "Notificación push",
    def: "Mensaje que la aplicación envía directamente a su celular, incluso cuando la app no está abierta.",
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
    def: "Mensaje de texto enviado a su teléfono celular. Se usa para enviar códigos de verificación o alertas.",
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
      <div className="flex items-center gap-2 border border-border bg-card px-3 py-2 mb-3 border-[#000000] rounded-[24px] focus:ring-2 focus:ring-primary/20 focus:border-primary">
        <Icon name="search" size={24} className="text-[#333] shrink-0" />
        <input
          type="text"
          placeholder="Buscar en el glosario…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-[12px] outline-none placeholder-muted-foreground"
        />
        {query && (
          <Button
            onClick={() => setQuery("")}
            variant="icon-muted"
            size="none"
            className="text-muted-foreground active:text-foreground"
          >
            <Icon name="close" size={12} />
          </Button>
        )}
      </div>
      {filtered.length === 0 ? (
        <p className="text-[11px] text-muted-foreground px-1">No se encontraron términos.</p>
      ) : (
        <div className="rounded-2xl border border-[#ccc] divide-y divide-[#ccc] bg-white">
          {filtered.map(({ term, def }) => (
            <div key={term} className="px-4 py-3">
              <p className="text-[12px] mb-0.5">{term}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{def}</p>
            </div>
          ))}
        </div>
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
      <div className="rounded-2xl border border-[#ccc] divide-y divide-[#ccc] bg-white">
        {CONTACT_METHODS.map(({ icon, label, value, sub, href }) => (
          <a
            key={label}
            href={href}
            className="flex items-start gap-3 px-4 py-3.5 active:bg-muted transition-colors"
          >
            <div className="w-8 h-8 bg-[#f2f2f2] rounded-[8px] flex items-center justify-center shrink-0 mt-0.5">
              <Icon name={icon} size={14} className="text-[#0f5ac4]" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] tracking-widest text-muted-foreground">{label}</p>
              <p className="text-[13px] mt-0.5">{value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
            </div>
          </a>
        ))}
      </div>
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
        <Icon name="warning" size={15} className="text-muted-foreground shrink-0" />
        <div>
          <p className="text-[13px]">¿Encontró un error en la aplicación?</p>
          <p className="text-[10px] text-muted-foreground">Envíenos un reporte</p>
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

import { Page } from "./BottomNav";

export function AssistancePage({ onBack, onNavigate }: { onBack: () => void; onNavigate: (page: Page) => void }) {
  const [showOnboarding, setShowOnboarding] = useState(false);

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

      <div className="px-4 pt-4">
        <Button
          onClick={() => setShowOnboarding(true)}
          variant="card"
          size="md"
          fullWidth
          className="justify-between"
        >
          <div className="flex items-center gap-3">
            <Icon name="replay" size={15} className="text-muted-foreground" />
            <div className="text-left">
              <p className="text-[13px]">Ver introducción a la aplicación</p>
              <p className="text-[10px] text-muted-foreground">Repase cómo funciona la aplicación</p>
            </div>
          </div>
          <span className="text-[10px] tracking-widest border border-border px-2 py-0.5 text-muted-foreground">
            Tutorial
          </span>
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

import { useState } from "react";
import {
  ArrowLeft,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  AlertTriangle,
  X,
  Search,
} from "lucide-react";
import { WELCOME_FEATURES, WelcomeCarouselSlide } from "./WelcomePage";
import { GobFranja } from "./GobFranja";

// ── Glossary ──────────────────────────────────────────────────────────────────

const GLOSSARY = [
  {
    term: "2FA / Segundo factor",
    def: "Verificación en dos pasos. Además de la contraseña, se solicita un código adicional para confirmar su identidad.",
  },
  {
    term: "AFP",
    def: "Administradora de Fondos de Pensiones. Empresa privada que administra los ahorros previsionales de los trabajadores.",
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
        <Search size={13} strokeWidth={1.5} className="text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Buscar en el glosario…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-[12px] outline-none placeholder-muted-foreground"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-muted-foreground active:text-foreground">
            <X size={12} strokeWidth={1.5} />
          </button>
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

const CONTACT_METHODS = [
  {
    icon: Phone,
    label: "Teléfono",
    value: "800-400-000 (ChileAtiende)",
    sub: "Lunes a viernes, 8:00 a 20:00 · Gratuito",
    href: "tel:800400000",
  },
  {
    icon: Mail,
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
        {CONTACT_METHODS.map(({ icon: Icon, label, value, sub, href }) => (
          <a
            key={label}
            href={href}
            className="flex items-start gap-3 px-4 py-3.5 active:bg-muted transition-colors"
          >
            <div className="w-8 h-8 bg-[#f2f2f2] rounded-[8px] flex items-center justify-center shrink-0 mt-0.5">
              <Icon size={14} strokeWidth={1.5} className="text-[#0f5ac4]" />
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

function ReportProblemModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");
  const [type, setType] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/30" />
      <div
        className="relative w-full max-w-[390px] bg-card border-t border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <AlertTriangle size={14} strokeWidth={1.5} className="text-muted-foreground" />
            <p className="text-[13px] tracking-widest">Reportar un problema</p>
          </div>
          <button onClick={onClose} className="p-1 active:bg-muted transition-colors">
            <X size={15} strokeWidth={1.5} />
          </button>
        </div>

        {sent ? (
          <div className="px-4 py-8 text-center">
            <p className="text-[13px]">Reporte enviado</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Gracias por informar el problema. Lo revisaremos a la brevedad.
            </p>
            <button
              onClick={onClose}
              className="mt-5 text-[10px] tracking-widest border border-border px-4 py-2 active:bg-muted transition-colors rounded-full"
            >
              Cerrar
            </button>
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
            <button
              onClick={() => (text.trim() && type) && setSent(true)}
              disabled={!text.trim() || !type}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-full disabled:opacity-30 active:opacity-80 transition-opacity"
            >
              Enviar reporte
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ReportProblem() {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <p className="text-[10px] tracking-widest text-muted-foreground mb-3">
        Reportar un problema
      </p>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl border border-[#ccc] bg-white flex items-center gap-3 px-4 py-3.5 active:bg-gray-50 transition-colors text-left"
      >
        <AlertTriangle size={15} strokeWidth={1.5} className="text-muted-foreground shrink-0" />
        <div>
          <p className="text-[13px]">¿Encontró un error en la aplicación?</p>
          <p className="text-[10px] text-muted-foreground">Envíenos un reporte</p>
        </div>
      </button>
      {open && <ReportProblemModal onClose={() => setOpen(false)} />}
    </section>
  );
}

// ── Onboarding ─────────────────────────────────────────────────────────────────

function OnboardingModal({ onClose }: { onClose: () => void }) {
  const [slide, setSlide] = useState(0);
  const isLast = slide === WELCOME_FEATURES.length - 1;
  const { icon: Icon, title, desc } = WELCOME_FEATURES[slide];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[rgba(51,51,51,0.4)]" />
      <div
        className="relative w-full max-w-[342px] rounded-2xl border border-[#ccc] bg-white flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <WelcomeCarouselSlide
          icon={Icon}
          title={title}
          desc={desc}
          contentClassName="w-full max-w-[320px]"
        />

        <div className="flex items-center justify-center gap-3 px-5 py-4 border-t border-[#ccc]">
          <button
            onClick={() => setSlide((s) => Math.max(0, s - 1))}
            disabled={slide === 0}
            className="flex items-center gap-1.5 border border-[#0046a8] rounded-full px-4 py-2 text-[11px] tracking-[1.1px] text-[#0046a8] font-bold disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={13} strokeWidth={1.5} />
            Anterior
          </button>

          <div className="flex gap-1.5">
            {WELCOME_FEATURES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === slide ? "bg-[#0046a8]" : "bg-[#ccc]"}`}
                aria-label={`Ir a slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => (isLast ? onClose() : setSlide((s) => s + 1))}
            className="flex items-center gap-1.5 border border-[#0046a8] rounded-full px-4 py-2 text-[11px] tracking-[1.1px] text-[#0046a8] font-bold transition-colors"
          >
            {isLast ? "Finalizar" : "Siguiente"}
            <ChevronRight size={13} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

import { BottomNav, Page } from "./BottomNav";

export function AssistancePage({ onBack, onNavigate }: { onBack: () => void; onNavigate: (page: Page) => void }) {
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-background flex flex-col">
      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3 relative">
        <GobFranja />
        <button
          onClick={onBack}
          className="flex items-center gap-2 p-1 -ml-1 text-[#0046a8] active:bg-blue-50 rounded-full transition-colors mb-4"
          aria-label="Volver"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="text-[12px] tracking-widest">Inicio</span>
        </button>
        <h1 className="text-[#333]">Asistencia y soporte</h1>
        <p className="text-[11px] text-[#808080] mt-1">
          Encuentre respuestas o comuníquese con el Estado.
        </p>
      </header>

      <div className="px-4 pt-4">
        <button
          onClick={() => setShowOnboarding(true)}
          className="w-full flex items-center justify-between rounded-2xl border border-[#ccc] bg-white px-4 py-3 active:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <RotateCcw size={15} strokeWidth={1.5} className="text-muted-foreground" />
            <div className="text-left">
              <p className="text-[13px]">Ver introducción a la aplicación</p>
              <p className="text-[10px] text-muted-foreground">Repase cómo funciona la aplicación</p>
            </div>
          </div>
          <span className="text-[10px] tracking-widest border border-border px-2 py-0.5 text-muted-foreground">
            Tutorial
          </span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-10 flex flex-col gap-6">
        <ContactMethods />
        <Glossary />
        <ReportProblem />
      </div>

      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
      <BottomNav active="assistance" onNavigate={onNavigate} />
    </div>
  );
}

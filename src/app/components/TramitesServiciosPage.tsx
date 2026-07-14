import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Globe,
  Building2,
  ChevronRight,
  X,
  ExternalLink,
  Clock,
  FileText,
  Navigation,
  Search,
  SlidersHorizontal,
  LocateFixed,
} from "lucide-react";
import { GobFranja } from "./GobFranja";

export interface Oficina {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  distancia: number; // km
  horario: string;
}

export interface Tramite {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  modalidad: ("online" | "oficina")[];
  oficinasIds: number[];
  preview: PreviewStep[] | null;
}

interface PreviewStep {
  paso: number;
  titulo: string;
  descripcion: string;
}

const OFICINAS: Oficina[] = [
  {
    id: 1,
    nombre: "Registro Civil — Santiago Centro",
    direccion: "Huérfanos 1570, Santiago",
    telefono: "+56 2 2600 7100",
    distancia: 0.4,
    horario: "Lun–Vie 8:30–14:00",
  },
  {
    id: 2,
    nombre: "ChileAtiende — Providencia",
    direccion: "Av. Providencia 1234, Providencia",
    telefono: "800 400 000",
    distancia: 1.2,
    horario: "Lun–Vie 9:00–14:00",
  },
  {
    id: 3,
    nombre: "Municipalidad de Santiago",
    direccion: "Plaza de Armas s/n, Santiago",
    telefono: "+56 2 2386 1000",
    distancia: 0.7,
    horario: "Lun–Vie 8:00–14:00",
  },
  {
    id: 4,
    nombre: "SII — Dirección Regional Metropolitana",
    direccion: "Teatinos 120, Santiago",
    telefono: "+56 2 2395 1000",
    distancia: 0.6,
    horario: "Lun–Vie 9:00–14:00",
  },
  {
    id: 5,
    nombre: "ChileAtiende — Ñuñoa",
    direccion: "Av. Irarrázaval 4285, Ñuñoa",
    telefono: "800 400 000",
    distancia: 3.8,
    horario: "Lun–Vie 9:00–14:00",
  },
  {
    id: 6,
    nombre: "COMPIN Metropolitana",
    direccion: "Monjitas 665, Santiago",
    telefono: "+56 2 2574 0100",
    distancia: 0.9,
    horario: "Lun–Vie 8:00–14:00",
  },
];

const TRAMITES: Tramite[] = [
  {
    id: 1,
    nombre: "Renovación de cédula de identidad",
    categoria: "Identidad",
    descripcion: "Solicite la renovación de su cédula de identidad chilena por vencimiento, deterioro o cambio de datos.",
    modalidad: ["online", "oficina"],
    oficinasIds: [1, 2],
    preview: [
      { paso: 1, titulo: "Agendar hora", descripcion: "Ingrese a registrocivil.cl o ChileAtiende y seleccione una hora disponible en su oficina más cercana." },
      { paso: 2, titulo: "Preparar documentos", descripcion: "Cédula anterior (o denuncia por extravío), comprobante de domicilio y fotografía reciente." },
      { paso: 3, titulo: "Asistir a la oficina", descripcion: "Preséntese en la fecha y hora agendada con los documentos requeridos." },
      { paso: 4, titulo: "Pago de arancel", descripcion: "Cancele el arancel correspondiente ($3.560 para mayores de 18 años). Exentos: personas en situación de discapacidad." },
      { paso: 5, titulo: "Retiro del documento", descripcion: "La cédula estará lista en un plazo de 7 días hábiles para retiro en la misma oficina." },
    ],
  },
  {
    id: 2,
    nombre: "Certificado de nacimiento",
    categoria: "Identidad",
    descripcion: "Obtenga un certificado oficial de nacimiento para uso en trámites civiles, laborales o escolares.",
    modalidad: ["online"],
    oficinasIds: [1, 2],
    preview: [
      { paso: 1, titulo: "Ingresar al portal", descripcion: "Acceda a registrocivil.cl con su RUN y ClaveÚnica." },
      { paso: 2, titulo: "Seleccionar tipo de certificado", descripcion: "Elija si es para uso general, con o sin subinscripciones." },
      { paso: 3, titulo: "Descarga inmediata", descripcion: "El certificado se genera en formato PDF con firma electrónica avanzada, válido ante organismos públicos y privados." },
    ],
  },
  {
    id: 3,
    nombre: "Pago de patente vehicular",
    categoria: "Transporte",
    descripcion: "Pague el permiso de circulación semestral o anual de su vehículo motorizado ante la municipalidad correspondiente.",
    modalidad: ["online", "oficina"],
    oficinasIds: [3],
    preview: [
      { paso: 1, titulo: "Verificar deuda", descripcion: "Consulte el monto a pagar en municipalidadsantiago.cl o en la municipalidad de su domicilio." },
      { paso: 2, titulo: "Elegir modalidad de pago", descripcion: "Puede pagar en línea con tarjeta, en la municipalidad o en sucursales bancarias autorizadas." },
      { paso: 3, titulo: "Obtener permiso de circulación", descripcion: "Una vez pagado, descargue o retire el sticker de permiso de circulación para adherirlo al parabrisas." },
    ],
  },
  {
    id: 4,
    nombre: "Declaración de impuesto a la renta",
    categoria: "Tributario",
    descripcion: "Presente su declaración anual de renta ante el Servicio de Impuestos Internos (SII) para determinar si tiene devolución o pago pendiente.",
    modalidad: ["online"],
    oficinasIds: [4],
    preview: [
      { paso: 1, titulo: "Ingresar al SII", descripcion: "Acceda a sii.cl con su RUN y clave tributaria en el período habilitado (abril de cada año)." },
      { paso: 2, titulo: "Revisar propuesta del SII", descripcion: "El SII genera una propuesta automática con sus datos de empleadores y retenciones. Verifique y ajuste si es necesario." },
      { paso: 3, titulo: "Enviar declaración", descripcion: "Acepte o corrija la propuesta y envíe. Si tiene devolución, se deposita en hasta 30 días hábiles." },
    ],
  },
  {
    id: 5,
    nombre: "Solicitud de bono FONASA",
    categoria: "Salud",
    descripcion: "Solicite el bono de atención médica del Fondo Nacional de Salud para consultas con médicos de libre elección.",
    modalidad: ["online", "oficina"],
    oficinasIds: [2, 6],
    preview: [
      { paso: 1, titulo: "Verificar afiliación", descripcion: "Confirme que está afiliado a FONASA y su tramo de salud en fonasa.cl." },
      { paso: 2, titulo: "Solicitar el bono", descripcion: "En fonasa.cl o en sucursales ChileAtiende, seleccione el tipo de atención y especialidad requerida." },
      { paso: 3, titulo: "Usar el bono", descripcion: "Presente el bono en el centro médico de su elección. El copago varía según su tramo de FONASA." },
    ],
  },
  {
    id: 6,
    nombre: "Subsidio habitacional DS49",
    categoria: "Vivienda",
    descripcion: "Postule al subsidio de vivienda para familias sin casa propia con ingresos medios o bajos del Ministerio de Vivienda.",
    modalidad: ["oficina"],
    oficinasIds: [2, 3],
    preview: null,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const CATEGORIA_LABEL: Record<string, string> = {
  Identidad: "Identidad",
  Transporte: "Transporte",
  Tributario: "Tributario",
  Salud: "Salud",
  Vivienda: "Vivienda",
};

function sortOficinas(oficinas: Oficina[], byDistance: boolean) {
  return [...oficinas].sort((a, b) =>
    byDistance
      ? a.distancia - b.distancia
      : a.nombre.localeCompare(b.nombre, "es"),
  );
}

// ── Location permission modal ───────────────────────────────────────────────────

function LocationPermissionModal({
  onClose,
  onActivate,
}: {
  onClose: () => void;
  onActivate: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-[rgba(51,51,51,0.4)]" />
      <div
        className="relative w-full max-w-[390px] bg-white border-t border-[#ccc] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-8 py-6 text-center min-h-[180px] flex flex-col justify-center items-center gap-4">
          <div className="bg-[#f2f2f2] rounded-[8px] p-2 flex items-center justify-center">
            <LocateFixed size={36} strokeWidth={1.5} className="text-[#0f5ac4]" />
          </div>
          <div className="flex flex-col gap-1.5 w-full max-w-[320px]">
            <h2
              className="text-[#333] font-normal text-[20px] leading-[30px]"
              style={{ fontFamily: "'Roboto Slab', sans-serif" }}
            >
              Tu ubicación actual
            </h2>
            <p className="text-[12px] text-[#808080] leading-[19.5px]">
              Por favor, activa los permisos de ubicación para que podamos mostrarte las oficinas más cercanas.
            </p>
          </div>
        </div>

        <div className="flex gap-6 items-start px-4 pb-4">
          <button
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 border border-[#ccc] rounded-full px-4 py-2.5 text-[11px] font-bold tracking-[1.1px] text-[#333] active:bg-gray-50 transition-colors"
          >
            Cancelar
            <X size={13} strokeWidth={1.5} />
          </button>
          <button
            onClick={onActivate}
            className="flex-1 flex items-center justify-center bg-[#0046a8] rounded-full px-4 py-3 text-[11px] font-bold tracking-[1.1px] text-white active:opacity-80 transition-opacity"
          >
            Activar ahora
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Oficina detail sheet ───────────────────────────────────────────────────────

function OficinaSheet({
  oficina,
  locationEnabled,
  onClose,
}: {
  oficina: Oficina;
  locationEnabled: boolean;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/30" />
      <div
        className="relative w-full max-w-[390px] bg-card border-t border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <p className="text-[13px] tracking-widest">Lugar de atención</p>
          <button onClick={onClose} className="p-1 active:bg-muted">
            <X size={15} strokeWidth={1.5} />
          </button>
        </div>
        <div className="px-4 py-5 flex flex-col gap-4">
          <div>
            <p className="text-[15px]">{oficina.nombre}</p>
            {locationEnabled && (
              <p className="text-[11px] text-muted-foreground mt-0.5">{oficina.distancia} km de distancia</p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <MapPin size={14} strokeWidth={1.5} className="text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-[12px]">{oficina.direccion}</p>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={14} strokeWidth={1.5} className="text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-[12px]">{oficina.telefono}</p>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={14} strokeWidth={1.5} className="text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-[12px]">{oficina.horario}</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 border border-border py-2.5 text-[11px] tracking-widest active:bg-muted transition-colors rounded-full">Cómo llegar <Navigation size={13} strokeWidth={1.5} /></button>
        </div>
      </div>
    </div>
  );
}

// ── Tramite detail page ────────────────────────────────────────────────────────

function PreviewModal({ tramite, onClose }: { tramite: Tramite; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/40" />
      <div
        className="relative w-full max-w-[390px] bg-card border-t border-border max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
          <p className="text-[13px] tracking-widest">Vista previa del proceso</p>
          <button onClick={onClose} className="p-1 active:bg-muted transition-colors">
            <X size={15} strokeWidth={1.5} />
          </button>
        </div>
        <div className="overflow-y-auto px-4 py-5 flex flex-col gap-0">
          {tramite.preview!.map((step, i) => (
            <div key={step.paso} className="flex gap-3">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-6 h-6 border-2 border-primary flex items-center justify-center">
                  <span className="text-[9px]">{step.paso}</span>
                </div>
                {i < tramite.preview!.length - 1 && (
                  <div className="w-px flex-1 bg-border mt-1 mb-1 min-h-[16px]" />
                )}
              </div>
              <div className="pb-4 flex-1">
                <p className="text-[12px] font-medium">{step.titulo}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{step.descripcion}</p>
              </div>
            </div>
          ))}
          <div className="mt-1 border border-dashed border-border px-4 py-3">
            <p className="text-[10px] text-muted-foreground">
              Resumen orientativo. Los pasos exactos pueden variar según su situación particular.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TramiteDetail({
  tramite,
  onBack,
  onVerOficina,
}: {
  tramite: Tramite;
  onBack: () => void;
  onVerOficina: (o: Oficina) => void;
}) {
  const [showPreview, setShowPreview] = useState(false);
  const oficinas = OFICINAS.filter((o) => tramite.oficinasIds.includes(o.id)).sort(
    (a, b) => a.distancia - b.distancia
  );

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col w-full max-w-[390px] mx-auto">
      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3 relative">
        <GobFranja />
        <button
          onClick={onBack}
          className="flex items-center gap-2 p-1 -ml-1 text-[#0046a8] active:bg-blue-50 rounded-full transition-colors mb-4"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="text-[12px] tracking-widest">Volver</span>
        </button>
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-[16px] leading-snug text-[#333]">{tramite.nombre}</h1>
          <span className="text-[10px] font-bold bg-[#e3f2fd] text-[#0d47a1] rounded-[4px] px-2 py-[2px] leading-[150%] shrink-0 mt-0.5">
            {CATEGORIA_LABEL[tramite.categoria]}
          </span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-10 flex flex-col gap-6">

        {/* Description */}
        <section>
          <p className="text-[10px] tracking-widest text-muted-foreground mb-2">Descripción</p>
          <p className="text-[13px] leading-relaxed text-foreground">{tramite.descripcion}</p>
        </section>

        {/* Modalidad */}
        <section>
          <p className="text-[10px] tracking-widest text-muted-foreground mb-2">Dónde realizarlo</p>
          <div className="flex gap-2">
            {tramite.modalidad.includes("online") && (
              <div className="flex items-center gap-1.5 rounded-[4px] bg-[#e7ecff] text-[#0046a8] px-3 py-[2px]">
                <Globe size={13} strokeWidth={1.5} />
                <span className="text-[10px] font-bold">En línea</span>
              </div>
            )}
            {tramite.modalidad.includes("oficina") && (
              <div className="flex items-center gap-1.5 rounded-[4px] bg-[#e7ecff] text-[#0046a8] px-3 py-[2px]">
                <Building2 size={13} strokeWidth={1.5} />
                <span className="text-[10px] font-bold">En oficina</span>
              </div>
            )}
          </div>
          {tramite.modalidad.includes("online") && (
            <button className="mt-3 flex items-center gap-1.5 text-[11px] tracking-widest text-muted-foreground border border-border px-3 py-2 active:bg-muted transition-colors rounded-full">
              <ExternalLink size={12} strokeWidth={1.5} />
              Ver trámite en ChileAtiende
            </button>
          )}
        </section>

        {/* Preview button */}
        <section>
          <p className="text-[10px] tracking-widest text-muted-foreground mb-2">
            Vista previa del proceso
          </p>
          {tramite.preview ? (
            <button
              onClick={() => setShowPreview(true)}
              className="w-full rounded-2xl border border-[#ccc] bg-white flex items-center justify-between px-4 py-3.5 active:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <FileText size={14} strokeWidth={1.5} className="text-muted-foreground shrink-0" />
                <div>
                  <p className="text-[13px]">Ver pasos del trámite</p>
                  <p className="text-[10px] text-muted-foreground">{tramite.preview.length} pasos</p>
                </div>
              </div>
              <ChevronRight size={14} strokeWidth={1.5} className="text-muted-foreground shrink-0" />
            </button>
          ) : (
            <div className="rounded-2xl border border-[#ccc] bg-white px-4 py-4 flex items-start gap-3">
              <FileText size={14} strokeWidth={1.5} className="text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                La vista previa de este trámite no está disponible aún. Consulte los requisitos directamente en el organismo correspondiente.
              </p>
            </div>
          )}
        </section>

        {/* Oficinas */}
        {tramite.modalidad.includes("oficina") && oficinas.length > 0 && (
          <section>
            <p className="text-[10px] tracking-widest text-muted-foreground mb-3">
              Lugares de atención
            </p>
            <div className="rounded-2xl border border-[#ccc] divide-y divide-[#ccc] bg-white">
              {oficinas.map((o, i) => (
                <button
                  key={o.id}
                  onClick={() => onVerOficina(o)}
                  className="w-full flex items-center justify-between px-4 py-3.5 active:bg-gray-50 text-left transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <MapPin size={13} strokeWidth={1.5} className="text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[12px]">{o.nombre}</p>
                        {i === 0 && (
                          <span className="rounded-[4px] px-2 py-[2px] text-[10px] font-bold leading-[150%] bg-[#e3f2fd] text-[#0d47a1] shrink-0">
                            Más cercana
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{o.distancia} km · {o.horario}</p>
                    </div>
                  </div>
                  <ChevronRight size={13} strokeWidth={1.5} className="text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
          </section>
        )}
      </div>

      {showPreview && tramite.preview && (
        <PreviewModal tramite={tramite} onClose={() => setShowPreview(false)} />
      )}
    </div>
  );
}

// ── Tab: Trámites y Servicios ──────────────────────────────────────────────────

const CATEGORIAS = ["Identidad", "Transporte", "Tributario", "Salud", "Vivienda"];
const MODALIDADES = ["En línea", "En oficina"];

function FilterSheet({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/30" />
      <div
        className="relative w-full max-w-[390px] bg-card border-t border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <p className="text-[13px] tracking-widest">{title}</p>
          <button onClick={onClose} className="p-1 active:bg-muted transition-colors">
            <X size={15} strokeWidth={1.5} />
          </button>
        </div>
        <div className="px-4 py-4 flex flex-col gap-5">{children}</div>
        <div className="px-4 pb-6">
          <button
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-full active:opacity-80 transition-opacity"
          >
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between py-2.5 border-b border-border last:border-b-0 w-full text-left active:bg-muted transition-colors"
    >
      <span className="text-[13px]">{label}</span>
      <div className={`w-4 h-4 border-2 flex items-center justify-center shrink-0 ${checked ? "border-primary bg-primary" : "border-border"}`}>
        {checked && <span className="text-primary-foreground text-[9px]">✓</span>}
      </div>
    </button>
  );
}

function TabTramites({ onSelect }: { onSelect: (t: Tramite) => void }) {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [cats, setCats] = useState<Set<string>>(new Set());
  const [mods, setMods] = useState<Set<string>>(new Set());

  const activeCount = cats.size + mods.size;

  const filtered = TRAMITES.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch = !q || t.nombre.toLowerCase().includes(q) || t.descripcion.toLowerCase().includes(q);
    const matchCat = cats.size === 0 || cats.has(t.categoria);
    const matchMod =
      mods.size === 0 ||
      (mods.has("En línea") && t.modalidad.includes("online")) ||
      (mods.has("En oficina") && t.modalidad.includes("oficina"));
    return matchSearch && matchCat && matchMod;
  });

  function toggleSet(set: Set<string>, setFn: (s: Set<string>) => void, val: string) {
    const next = new Set(set);
    next.has(val) ? next.delete(val) : next.add(val);
    setFn(next);
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Search + filter bar */}
      <div className="px-4 py-3 border-b border-border bg-card flex gap-2 shrink-0">
        <div className="relative flex-1">
          <Search size={13} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar trámites y servicios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-3 rounded-[24px] border border-[#333] bg-white text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <button
          onClick={() => setShowFilters(true)}
          className={`flex items-center gap-1.5 border px-3 py-2 text-[10px] tracking-widest transition-colors shrink-0 ${
            activeCount > 0 ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground active:bg-muted"
          }`}
        >
          <SlidersHorizontal size={12} strokeWidth={1.5} />
          {activeCount > 0 ? `Filtros (${activeCount})` : "Filtrar"}
        </button>
      </div>

      {/* Results count */}
      {(search || activeCount > 0) && (
        <div className="px-4 py-2 border-b border-border bg-background shrink-0">
          <p className="text-[10px] tracking-widest text-muted-foreground">
            {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
        {filtered.length === 0 ? (
          <p className="text-[12px] text-muted-foreground text-center py-10">Sin resultados para los filtros aplicados.</p>
        ) : (
          filtered.map((tramite) => {
            const cercana = OFICINAS.filter((o) => tramite.oficinasIds.includes(o.id))
              .sort((a, b) => a.distancia - b.distancia)[0];
            return (
              <button
                key={tramite.id}
                onClick={() => onSelect(tramite)}
                className="w-full rounded-2xl border border-[#ccc] bg-white text-left active:bg-gray-50 transition-colors"
              >
                <div className="px-4 py-3 border-b border-[#ccc] flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[13px] leading-snug">{tramite.nombre}</p>
                    <span className="text-[9px] tracking-widest text-muted-foreground">{tramite.categoria}</span>
                  </div>
                  <ChevronRight size={14} strokeWidth={1.5} className="text-muted-foreground shrink-0 mt-0.5" />
                </div>
                <div className="px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {tramite.modalidad.includes("online") && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Globe size={11} strokeWidth={1.5} />
                        <span className="text-[10px]">En línea</span>
                      </div>
                    )}
                    {tramite.modalidad.includes("oficina") && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Building2 size={11} strokeWidth={1.5} />
                        <span className="text-[10px]">Oficina</span>
                      </div>
                    )}
                  </div>
                  {cercana && tramite.modalidad.includes("oficina") && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin size={10} strokeWidth={1.5} />
                      <span className="text-[10px]">{cercana.distancia} km</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>

      {showFilters && (
        <FilterSheet title="Filtrar trámites" onClose={() => setShowFilters(false)}>
          <div>
            <p className="text-[10px] tracking-widest text-muted-foreground mb-2">Categoría</p>
            <div className="rounded-2xl border border-[#ccc] bg-white px-4">
              {CATEGORIAS.map((c) => (
                <CheckRow
                  key={c}
                  label={c}
                  checked={cats.has(c)}
                  onChange={() => toggleSet(cats, setCats, c)}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] tracking-widest text-muted-foreground mb-2">Modalidad</p>
            <div className="rounded-2xl border border-[#ccc] bg-white px-4">
              {MODALIDADES.map((m) => (
                <CheckRow
                  key={m}
                  label={m}
                  checked={mods.has(m)}
                  onChange={() => toggleSet(mods, setMods, m)}
                />
              ))}
            </div>
          </div>
          {(cats.size > 0 || mods.size > 0) && (
            <button
              onClick={() => { setCats(new Set()); setMods(new Set()); }}
              className="text-[10px] tracking-widest text-muted-foreground underline self-start"
            >
              Limpiar filtros
            </button>
          )}
        </FilterSheet>
      )}
    </div>
  );
}

// ── Tab: Lugares de atención ───────────────────────────────────────────────────

const TIPOS_LUGAR = ["Registro Civil", "ChileAtiende", "Municipalidad", "SII", "COMPIN"];
const DISTANCIAS = ["Menos de 1 km", "Menos de 2 km", "Menos de 5 km"];

function TabLugares({
  onSelect,
  locationEnabled,
  onLocationEnabled,
  variant = "app",
}: {
  onSelect: (o: Oficina) => void;
  locationEnabled: boolean;
  onLocationEnabled: (enabled: boolean) => void;
  variant?: "app" | "guest";
}) {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [tipos, setTipos] = useState<Set<string>>(new Set());
  const [distancia, setDistancia] = useState<string | null>(null);

  const activeCount = tipos.size + (distancia ? 1 : 0);

  const distMax = distancia === "Menos de 1 km" ? 1 : distancia === "Menos de 2 km" ? 2 : distancia === "Menos de 5 km" ? 5 : Infinity;

  const filtered = sortOficinas(
    OFICINAS.filter((o) => {
      const q = search.toLowerCase();
      const matchSearch = !q || o.nombre.toLowerCase().includes(q) || o.direccion.toLowerCase().includes(q);
      const matchTipo = tipos.size === 0 || [...tipos].some((t) => o.nombre.includes(t));
      const matchDist = o.distancia <= distMax;
      return matchSearch && matchTipo && matchDist;
    }),
    locationEnabled,
  );

  const closestId = locationEnabled ? filtered[0]?.id : undefined;

  function toggleTipo(t: string) {
    const next = new Set(tipos);
    next.has(t) ? next.delete(t) : next.add(t);
    setTipos(next);
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Search + filter bar */}
      <div className="px-4 py-3 border-b border-border bg-card flex gap-2 shrink-0">
        <div className="relative flex-1">
          <Search size={13} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nombre o dirección..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-3 rounded-[24px] border border-[#333] bg-white text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <button
          onClick={() => setShowFilters(true)}
          className={`flex items-center gap-1.5 px-3 py-2 text-[10px] tracking-widest transition-colors shrink-0 ${
            activeCount > 0 ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground active:bg-muted"
          }`}
        >
          <SlidersHorizontal size={12} strokeWidth={1.5} />
          {activeCount > 0 ? `Filtros (${activeCount})` : "Filtrar"}
        </button>
      </div>

      <div className="px-4 py-3 border-b border-[#ccc] bg-white shrink-0">
        <button
          onClick={() => setShowLocationModal(true)}
          className="w-full flex items-center justify-center gap-2 border border-[#0046a8] rounded-full px-4 py-2.5 text-[13px] font-medium text-[#0046a8] active:bg-blue-50 transition-colors"
        >
          <LocateFixed size={14} strokeWidth={1.5} />
          Usar mi ubicación actual
        </button>
      </div>

      {/* Results count */}
      {(search || activeCount > 0) && (
        <div className="px-4 py-2 border-b border-border bg-background shrink-0">
          <p className="text-[10px] tracking-widest text-muted-foreground">
            {filtered.length} lugar{filtered.length !== 1 ? "es" : ""}
          </p>
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
        {filtered.length === 0 ? (
          <p className="text-[12px] text-muted-foreground text-center py-10">Sin lugares para los filtros aplicados.</p>
        ) : (
          filtered.map((oficina) => {
            const isClosest = locationEnabled && oficina.id === closestId;
            return (
              <button
                key={oficina.id}
                onClick={() => onSelect(oficina)}
                className={`w-full rounded-2xl border text-left active:bg-gray-50 transition-colors ${
                  isClosest ? "border-[#ccc] bg-white border-l-4 border-l-primary" : "border-[#ccc] bg-white"
                }`}
              >
                <div className="px-4 py-3 border-b border-[#ccc] flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-[13px] font-bold">{oficina.nombre}</p>
                    {isClosest && (
                      <span className="rounded-[4px] px-2 py-[2px] text-[10px] font-bold leading-[150%] bg-[#e3f2fd] text-[#0d47a1] shrink-0">
                        Más cercana
                      </span>
                    )}
                  </div>
                  <ChevronRight size={14} strokeWidth={1.5} className="text-muted-foreground shrink-0 mt-0.5" />
                </div>
                <div className="px-4 py-2.5 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={11} strokeWidth={1.5} className="shrink-0" />
                    <span className="text-[11px] font-bold">{oficina.direccion}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={11} strokeWidth={1.5} className="shrink-0" />
                    <span className="text-[11px] font-bold">{oficina.telefono}</span>
                  </div>
                  {locationEnabled && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Navigation size={11} strokeWidth={1.5} className="shrink-0" />
                      <span className="text-[11px]">{oficina.distancia} km de distancia</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock size={11} strokeWidth={1.5} className="shrink-0" />
                    <span className="text-[11px] font-bold">{oficina.horario}</span>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      {showLocationModal && (
        <LocationPermissionModal
          onClose={() => setShowLocationModal(false)}
          onActivate={() => {
            onLocationEnabled(true);
            setShowLocationModal(false);
          }}
        />
      )}

      {showFilters && (
        <FilterSheet title="Filtrar lugares" onClose={() => setShowFilters(false)}>
          <div>
            <p className="text-[10px] tracking-widest text-muted-foreground mb-2">Instituciones</p>
            <div className="rounded-2xl border border-[#ccc] bg-white px-4">
              {TIPOS_LUGAR.map((t) => (
                <CheckRow key={t} label={t} checked={tipos.has(t)} onChange={() => toggleTipo(t)} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] tracking-widest text-muted-foreground mb-2">Distancia máxima</p>
            <div className="rounded-2xl border border-[#ccc] bg-white px-4">
              {DISTANCIAS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDistancia(distancia === d ? null : d)}
                  className="flex items-center justify-between py-2.5 border-b border-border last:border-b-0 w-full text-left active:bg-muted transition-colors"
                >
                  <span className="text-[13px]">{d}</span>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${distancia === d ? "border-primary" : "border-border"}`}>
                    {distancia === d && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
          {(tipos.size > 0 || distancia) && (
            <button
              onClick={() => { setTipos(new Set()); setDistancia(null); }}
              className="text-[10px] tracking-widest text-muted-foreground underline self-start"
            >
              Limpiar filtros
            </button>
          )}
        </FilterSheet>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

import { BottomNav, Page } from "./BottomNav";

export function TramitesServiciosPage({
  onBack,
  onNavigate,
  variant = "app",
}: {
  onBack: () => void;
  onNavigate?: (page: Page) => void;
  variant?: "app" | "guest";
}) {
  const [selectedOficina, setSelectedOficina] = useState<Oficina | null>(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const isGuest = variant === "guest";

  return (
    <>
      <div className="w-full max-w-[390px] min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className={`bg-white border-b border-[#e6e6e6] px-4 pb-3 shrink-0 relative ${isGuest ? "pt-6" : "pt-10"}`}>
          {!isGuest && <GobFranja />}
          <button
            onClick={onBack}
            className="flex items-center gap-2 p-1 -ml-1 text-[#0046a8] active:bg-blue-50 rounded-full transition-colors mb-4"
            aria-label="Volver"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
            <span className="text-[12px] tracking-widest font-bold">{isGuest ? "Volver" : "Inicio"}</span>
          </button>
          <h1
            className="text-[#333] text-[24px] leading-9"
            style={{ fontFamily: "'Roboto Slab', sans-serif" }}
          >
            Lugares de atención
          </h1>
        </header>

        <TabLugares
          onSelect={setSelectedOficina}
          locationEnabled={locationEnabled}
          onLocationEnabled={setLocationEnabled}
          variant={variant}
        />

        {!isGuest && onNavigate && <BottomNav active="lugares" onNavigate={onNavigate} />}
      </div>

      {selectedOficina && (
        <OficinaSheet
          oficina={selectedOficina}
          locationEnabled={locationEnabled}
          onClose={() => setSelectedOficina(null)}
        />
      )}
    </>
  );
}

import { useState, useEffect } from "react";
import { BottomSheet } from "./BottomSheet";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { AppliedFilterPills } from "./AppliedFilterPills";
import { ScreenOverlay } from "./ScreenOverlay";
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

export const OFICINAS: Oficina[] = [
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

export const TRAMITES: Tramite[] = [
  {
    id: 1,
    nombre: "Renovación de cédula de identidad",
    categoria: "Identidad",
    descripcion: "Solicita la renovación de tu cédula de identidad chilena por vencimiento, deterioro o cambio de datos.",
    modalidad: ["online", "oficina"],
    oficinasIds: [1, 2],
    preview: [
      { paso: 1, titulo: "Agendar hora", descripcion: "Ingresa a registrocivil.cl o ChileAtiende y selecciona una hora disponible en la oficina más cercana." },
      { paso: 2, titulo: "Preparar documentos", descripcion: "Cédula anterior (o denuncia por extravío), comprobante de domicilio y fotografía reciente." },
      { paso: 3, titulo: "Asistir a la oficina", descripcion: "Preséntate en la fecha y hora agendada con los documentos requeridos." },
      { paso: 4, titulo: "Pago de arancel", descripcion: "Cancele el arancel correspondiente ($3.560 para mayores de 18 años). Exentos: personas en situación de discapacidad." },
      { paso: 5, titulo: "Retiro del documento", descripcion: "La cédula estará lista en un plazo de 7 días hábiles para retiro en la misma oficina." },
    ],
  },
  {
    id: 2,
    nombre: "Certificado de nacimiento",
    categoria: "Identidad",
    descripcion: "Obtén un certificado oficial de nacimiento para uso en trámites civiles, laborales o escolares.",
    modalidad: ["online"],
    oficinasIds: [1, 2],
    preview: [
      { paso: 1, titulo: "Ingresar al portal", descripcion: "Accede a registrocivil.cl con tu RUN y ClaveÚnica." },
      { paso: 2, titulo: "Seleccionar tipo de certificado", descripcion: "Elige si es para uso general, con o sin subinscripciones." },
      { paso: 3, titulo: "Descarga inmediata", descripcion: "El certificado se genera en formato PDF con firma electrónica avanzada, válido ante organismos públicos y privados." },
    ],
  },
  {
    id: 3,
    nombre: "Pago de patente vehicular",
    categoria: "Transporte",
    descripcion: "Paga el permiso de circulación semestral o anual de tu vehículo motorizado ante la municipalidad correspondiente.",
    modalidad: ["online", "oficina"],
    oficinasIds: [3],
    preview: [
      { paso: 1, titulo: "Verificar deuda", descripcion: "Consulta el monto a pagar en municipalidadsantiago.cl o en la municipalidad de tu domicilio." },
      { paso: 2, titulo: "Elegir modalidad de pago", descripcion: "Puedes pagar en línea con tarjeta, en la municipalidad o en sucursales bancarias autorizadas." },
      { paso: 3, titulo: "Obtener permiso de circulación", descripcion: "Una vez pagado, descarga o retira el sticker de permiso de circulación para adherirlo al parabrisas." },
    ],
  },
  {
    id: 4,
    nombre: "Declaración de impuesto a la renta",
    categoria: "Tributario",
    descripcion: "Presenta tu declaración anual de renta ante el Servicio de Impuestos Internos (SII) para determinar si tienes devolución o pago pendiente.",
    modalidad: ["online"],
    oficinasIds: [4],
    preview: [
      { paso: 1, titulo: "Ingresar al SII", descripcion: "Accede a sii.cl con tu RUN y clave tributaria en el período habilitado (abril de cada año)." },
      { paso: 2, titulo: "Revisar propuesta del SII", descripcion: "El SII genera una propuesta automática con tus datos de empleadores y retenciones. Verifica y ajusta si es necesario." },
      { paso: 3, titulo: "Enviar declaración", descripcion: "Acepta o corrige la propuesta y envíala. Si tienes devolución, se deposita en hasta 30 días hábiles." },
    ],
  },
  {
    id: 5,
    nombre: "Solicitud de bono FONASA",
    categoria: "Salud",
    descripcion: "Solicita el bono de atención médica del Fondo Nacional de Salud para consultas con médicos de libre elección.",
    modalidad: ["online", "oficina"],
    oficinasIds: [2, 6],
    preview: [
      { paso: 1, titulo: "Verificar afiliación", descripcion: "Confirma que estás afiliado a FONASA y tu tramo de salud en fonasa.cl." },
      { paso: 2, titulo: "Solicitar el bono", descripcion: "En fonasa.cl o en sucursales ChileAtiende, selecciona el tipo de atención y especialidad requerida." },
      { paso: 3, titulo: "Usar el bono", descripcion: "Presenta el bono en el centro médico de tu elección. El copago varía según tu tramo de FONASA." },
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
  open,
  onClose,
  onActivate,
}: {
  open: boolean;
  onClose: () => void;
  onActivate: () => void;
}) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      zIndexClassName="z-[200]"
      backdropClassName="bg-[rgba(51,51,51,0.4)]"
      panelClassName="bg-white border-t border-[#ccc] flex flex-col"
    >
      <div className="px-8 py-6 text-center min-h-[180px] flex flex-col justify-center items-center gap-4">
        <div className="bg-[#f2f2f2] rounded-[8px] p-2 flex items-center justify-center">
          <Icon name="my_location" size={36} className="text-[#0f5ac4]" />
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
        <Button onClick={onClose} variant="ghost" size="md" className="flex-1">
          Cancelar
          <Icon name="close" size={13} />
        </Button>
        <Button onClick={onActivate} variant="primary" size="md" className="flex-1">
          Activar ahora
        </Button>
      </div>
    </BottomSheet>
  );
}

// ── Oficina detail sheet ───────────────────────────────────────────────────────

function OficinaSheet({
  open,
  oficina,
  locationEnabled,
  onClose,
}: {
  open: boolean;
  oficina: Oficina | null;
  locationEnabled: boolean;
  onClose: () => void;
}) {
  const [displayOficina, setDisplayOficina] = useState<Oficina | null>(oficina);

  useEffect(() => {
    if (oficina) setDisplayOficina(oficina);
  }, [oficina]);

  if (!displayOficina) return null;

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      onExitComplete={() => setDisplayOficina(null)}
      panelClassName="bg-card border-t border-border"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <p className="text-[13px] tracking-widest">Lugar de atención</p>
        <Button onClick={onClose} variant="icon-muted" size="icon" aria-label="Cerrar">
          <Icon name="close" size={15} />
        </Button>
      </div>
      <div className="px-4 py-5 flex flex-col gap-4">
        <div>
          <p className="text-[15px]">{displayOficina.nombre}</p>
          {locationEnabled && (
            <p className="text-[11px] text-muted-foreground mt-0.5">{displayOficina.distancia} km de distancia</p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <Icon name="location_on" size={14} className="text-primary shrink-0 mt-0.5" />
            <p className="text-[12px]">{displayOficina.direccion}</p>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="call" size={14} className="text-primary shrink-0 mt-0.5" />
            <p className="text-[12px]">{displayOficina.telefono}</p>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="schedule" size={14} className="text-primary shrink-0 mt-0.5" />
            <p className="text-[12px]">{displayOficina.horario}</p>
          </div>
        </div>
        <Button variant="ghost" size="compact" fullWidth className="font-normal gap-2">
          Cómo llegar <Icon name="directions" size={13} />
        </Button>
      </div>
    </BottomSheet>
  );
}

// ── Tramite detail page ────────────────────────────────────────────────────────

function PreviewModal({
  open,
  tramite,
  onClose,
}: {
  open: boolean;
  tramite: Tramite;
  onClose: () => void;
}) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      zIndexClassName="z-[60]"
      backdropClassName="bg-foreground/40"
      panelClassName="bg-card border-t border-border max-h-[80vh] flex flex-col"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <p className="text-[13px] tracking-widest">Vista previa del proceso</p>
        <Button onClick={onClose} variant="icon-muted" size="icon" aria-label="Cerrar">
          <Icon name="close" size={15} />
        </Button>
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
            Resumen orientativo. Los pasos exactos pueden variar según tu situación particular.
          </p>
        </div>
      </div>
    </BottomSheet>
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
    <ScreenOverlay>
      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3 relative">
        <GobFranja />
        <Button onClick={onBack} variant="nav-back" size="none" className="mb-4">
          <Icon name="arrow_back" size={18} />
          <span className="text-[12px] tracking-widest">Volver</span>
        </Button>
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
                <Icon name="language" size={13} />
                <span className="text-[10px] font-bold">En línea</span>
              </div>
            )}
            {tramite.modalidad.includes("oficina") && (
              <div className="flex items-center gap-1.5 rounded-[4px] bg-[#e7ecff] text-[#0046a8] px-3 py-[2px]">
                <Icon name="domain" size={13} />
                <span className="text-[10px] font-bold">En oficina</span>
              </div>
            )}
          </div>
          {tramite.modalidad.includes("online") && (
            <Button variant="ghost" size="compact" className="mt-3 font-normal gap-1.5">
              <Icon name="open_in_new" size={12} />
              Ver trámite en ChileAtiende
            </Button>
          )}
        </section>

        {/* Preview button */}
        <section>
          <p className="text-[10px] tracking-widest text-muted-foreground mb-2">
            Vista previa del proceso
          </p>
          {tramite.preview ? (
            <Button
              onClick={() => setShowPreview(true)}
              variant="card"
              size="md"
              fullWidth
              className="justify-between border-[#ccc]"
            >
              <div className="flex items-center gap-3">
                <Icon name="description" size={14} className="text-muted-foreground shrink-0" />
                <div>
                  <p className="text-[13px]">Ver pasos del trámite</p>
                  <p className="text-[10px] text-muted-foreground">{tramite.preview.length} pasos</p>
                </div>
              </div>
              <Icon name="chevron_right" size={14} className="text-muted-foreground shrink-0" />
            </Button>
          ) : (
            <div className="rounded-2xl border border-[#ccc] bg-white px-4 py-4 flex items-start gap-3">
              <Icon name="description" size={14} className="text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                La vista previa de este trámite no está disponible aún. Consulta los requisitos directamente en el organismo correspondiente.
              </p>
            </div>
          )}
        </section>

        {/* Oficinas */}
        {tramite.modalidad.includes("oficina") && oficinas.length > 0 && (
          <section>
            <p className="text-[10px] tracking-widest text-muted-foreground mb-3">
              Lugares de atención del Estado
            </p>
            <div className="rounded-2xl border border-[#ccc] divide-y divide-[#ccc] bg-white">
              {oficinas.map((o, i) => (
                <Button
                  key={o.id}
                  onClick={() => onVerOficina(o)}
                  variant="list-row"
                  size="none"
                  className="flex items-center justify-between px-4 py-3.5"
                >
                  <div className="flex items-start gap-3">
                    <Icon name="location_on" size={13} className="text-primary shrink-0 mt-0.5" />
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
                  <Icon name="chevron_right" size={13} className="text-primary shrink-0" />
                </Button>
              ))}
            </div>
          </section>
        )}
      </div>

      <PreviewModal
        open={showPreview && !!tramite.preview}
        tramite={tramite}
        onClose={() => setShowPreview(false)}
      />
    </ScreenOverlay>
  );
}

// ── Tab: Trámites y Servicios ──────────────────────────────────────────────────

const CATEGORIAS = ["Identidad", "Transporte", "Tributario", "Salud", "Vivienda"];
const MODALIDADES = ["En línea", "En oficina"];

function FilterSheet({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      panelClassName="bg-card border-t border-border"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <p className="text-[13px] tracking-widest">{title}</p>
        <Button onClick={onClose} variant="icon-muted" size="icon" aria-label="Cerrar">
          <Icon name="close" size={15} />
        </Button>
      </div>
      <div className="px-4 py-4 flex flex-col gap-5">{children}</div>
      <div className="px-4 pb-6">
        <Button onClick={onClose} variant="primary" size="md" fullWidth>
          Aplicar filtros
        </Button>
      </div>
    </BottomSheet>
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
    <Button
      onClick={() => onChange(!checked)}
      variant="list-row"
      size="none"
      className="flex items-center justify-between py-2.5 border-b border-border last:border-b-0 w-full"
    >
      <span className="text-[13px]">{label}</span>
      <div className={`w-4 h-4 border-2 flex items-center justify-center shrink-0 ${checked ? "border-primary bg-primary" : "border-border"}`}>
        {checked && <span className="text-primary-foreground text-[9px]">✓</span>}
      </div>
    </Button>
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
          <Icon name="search" size={24} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#333]" />
          <input
            type="text"
            placeholder="Buscar trámites y servicios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-3 rounded-[24px] border border-[#333] bg-white text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowFilters(true)}
          className={`inline-flex items-center gap-1.5 shrink-0 px-3 py-2.5 rounded-full text-[10px] tracking-widest transition-colors ${
            activeCount > 0
              ? "bg-primary text-primary-foreground"
              : "bg-white text-[#333] active:bg-gray-50"
          }`}
        >
          <Icon name="tune" size={12} />
          {activeCount > 0 ? `Filtros (${activeCount})` : "Filtrar"}
        </button>
      </div>

      <AppliedFilterPills
        filters={[
          ...[...cats].map((c) => ({
            id: `cat-${c}`,
            label: c,
            onRemove: () => toggleSet(cats, setCats, c),
          })),
          ...[...mods].map((m) => ({
            id: `mod-${m}`,
            label: m,
            onRemove: () => toggleSet(mods, setMods, m),
          })),
        ]}
      />

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
              <Button
                key={tramite.id}
                onClick={() => onSelect(tramite)}
                variant="card"
                size="md"
                fullWidth
                className="border-[#ccc] flex-col items-stretch p-0 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-[#ccc] flex items-start justify-between gap-3 w-full">
                  <div>
                    <p className="text-[13px] leading-snug">{tramite.nombre}</p>
                    <span className="text-[9px] tracking-widest text-muted-foreground">{tramite.categoria}</span>
                  </div>
                  <Icon name="chevron_right" size={14} className="text-muted-foreground shrink-0 mt-0.5" />
                </div>
                <div className="px-4 py-2.5 flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    {tramite.modalidad.includes("online") && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Icon name="language" size={11} />
                        <span className="text-[10px]">En línea</span>
                      </div>
                    )}
                    {tramite.modalidad.includes("oficina") && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Icon name="domain" size={11} />
                        <span className="text-[10px]">Oficina</span>
                      </div>
                    )}
                  </div>
                  {cercana && tramite.modalidad.includes("oficina") && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="location_on" size={10} className="text-primary" />
                      <span className="text-[10px]">{cercana.distancia} km</span>
                    </div>
                  )}
                </div>
              </Button>
            );
          })
        )}
      </div>

      <FilterSheet
        open={showFilters}
        title="Filtrar trámites"
        onClose={() => setShowFilters(false)}
      >
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
            <Button
              onClick={() => { setCats(new Set()); setMods(new Set()); }}
              variant="link"
              size="none"
              className="self-start text-muted-foreground"
            >
              Limpiar filtros
            </Button>
          )}
        </FilterSheet>
    </div>
  );
}

// ── Tab: Lugares de atención del Estado ───────────────────────────────────────────────────

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
          <Icon name="search" size={24} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#333]" />
          <input
            type="text"
            placeholder="Buscar por nombre o dirección..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-3 rounded-[24px] border border-[#333] bg-white text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowFilters(true)}
          className={`inline-flex items-center gap-1.5 shrink-0 px-3 py-2.5 rounded-full text-[10px] tracking-widest transition-colors ${
            activeCount > 0
              ? "bg-primary text-primary-foreground"
              : "bg-white text-[#333] active:bg-gray-50"
          }`}
        >
          <Icon name="tune" size={12} />
          {activeCount > 0 ? `Filtros (${activeCount})` : "Filtrar"}
        </button>
      </div>

      <AppliedFilterPills
        filters={[
          ...[...tipos].map((t) => ({
            id: `tipo-${t}`,
            label: t,
            onRemove: () => toggleTipo(t),
          })),
          ...(distancia
            ? [{
                id: "distancia",
                label: distancia,
                onRemove: () => setDistancia(null),
              }]
            : []),
        ]}
      />

      <div className="px-4 py-3 border-b border-[#ccc] bg-white shrink-0">
        <Button onClick={() => setShowLocationModal(true)} variant="secondary" size="md" fullWidth>
          <Icon name="my_location" size={14} />
          Usar mi ubicación actual
        </Button>
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
                type="button"
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
                  <Icon name="chevron_right" size={14} className="text-primary shrink-0 mt-0.5" />
                </div>
                <div className="px-4 py-2.5 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="location_on" size={11} className="shrink-0 text-primary" />
                    <span className="text-[11px] font-bold">{oficina.direccion}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="call" size={11} className="shrink-0 text-primary" />
                    <span className="text-[11px] font-bold">{oficina.telefono}</span>
                  </div>
                  {locationEnabled && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="directions" size={11} className="shrink-0 text-primary" />
                      <span className="text-[11px]">{oficina.distancia} km de distancia</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="schedule" size={11} className="shrink-0 text-primary" />
                    <span className="text-[11px] font-bold">{oficina.horario}</span>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      <LocationPermissionModal
        open={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onActivate={() => {
          onLocationEnabled(true);
          setShowLocationModal(false);
        }}
      />

      <FilterSheet
        open={showFilters}
        title="Filtrar lugares"
        onClose={() => setShowFilters(false)}
      >
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
                <Button
                  key={d}
                  onClick={() => setDistancia(distancia === d ? null : d)}
                  variant="list-row"
                  size="none"
                  className="flex items-center justify-between py-2.5 border-b border-border last:border-b-0 w-full"
                >
                  <span className="text-[13px]">{d}</span>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${distancia === d ? "border-primary" : "border-border"}`}>
                    {distancia === d && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                </Button>
              ))}
            </div>
          </div>
          {(tipos.size > 0 || distancia) && (
            <Button
              onClick={() => { setTipos(new Set()); setDistancia(null); }}
              variant="link"
              size="none"
              className="self-start text-muted-foreground"
            >
              Limpiar filtros
            </Button>
          )}
        </FilterSheet>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

import { Page } from "./BottomNav";

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
          <Button
            onClick={onBack}
            variant="nav-back"
            size="none"
            className="mb-4"
            aria-label="Volver"
          >
            <Icon name="arrow_back" size={18} />
            <span className="text-[12px] tracking-widest font-bold">{isGuest ? "Volver" : "Inicio"}</span>
          </Button>
          <h1
            className="text-[#333] text-[24px] leading-9"
            style={{ fontFamily: "'Roboto Slab', sans-serif" }}
          >
            Lugares de atención del Estado
          </h1>
        </header>

        <TabLugares
          onSelect={setSelectedOficina}
          locationEnabled={locationEnabled}
          onLocationEnabled={setLocationEnabled}
          variant={variant}
        />

      </div>

      <OficinaSheet
        open={selectedOficina !== null}
        oficina={selectedOficina}
        locationEnabled={locationEnabled}
        onClose={() => setSelectedOficina(null)}
      />
    </>
  );
}

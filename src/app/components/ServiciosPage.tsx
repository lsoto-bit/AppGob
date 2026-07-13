import { useState } from "react";
import { ArrowLeft, Search, ChevronRight, X, Landmark, CheckCircle2, AlertTriangle } from "lucide-react";
import { BottomNav, Page } from "./BottomNav";

// ── Data ──────────────────────────────────────────────────────────────────────

interface Servicio {
  id: string;
  icon: React.ElementType;
  nombre: string;
  organismo: string;
  desc: string;
}

const SERVICIOS: Servicio[] = [
  {
    id: "pago-tgr",
    icon: Landmark,
    nombre: "Pago de deudas con el Estado",
    organismo: "TGR — Tesorería General de la República",
    desc: "Paga obligaciones con el Estado: servicios, multas, impuestos, permisos y derechos directamente desde la app.",
  },
];

// ── Servicio: Pago TGR ────────────────────────────────────────────────────────

type TGRStep = "lista" | "detalle" | "pago" | "confirmacion";

const DEUDA_BADGE: Record<string, { bg: string; color: string }> = {
  "Por vencer": { bg: "#FFFBEB", color: "#522504" },
  "Pendiente":  { bg: "#FFFBEB", color: "#522504" },
};

function PagoTGR({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<TGRStep>("lista");
  const [selected, setSelected] = useState<typeof DEUDAS[0] | null>(null);
  const [medioPago, setMedioPago] = useState<string | null>(null);
  const [folio] = useState(`TGR-${Date.now().toString().slice(-8)}`);

  const DEUDAS = [
    { id: 1, concepto: "Permiso de circulación — vehículo BCZF-41", organismo: "Municipalidad de Santiago", monto: "$38.200", vencimiento: "31 Jul 2026", estado: "Por vencer" },
    { id: 2, concepto: "Multa de tránsito — infracción Ley 18.290", organismo: "Juzgado de Policía Local", monto: "$14.000", vencimiento: "15 Ago 2026", estado: "Pendiente" },
  ];

  if (step === "lista") return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col w-full max-w-[390px] mx-auto">
      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3 shrink-0">
        <button onClick={onBack} className="flex items-center gap-2 p-1 -ml-1 text-[#0046a8] active:bg-blue-50 rounded-full transition-colors mb-4">
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="text-[12px] tracking-widest">Servicios</span>
        </button>
        <h1 className="text-[#333]">Pago de deudas con el Estado</h1>
        <p className="text-[11px] text-[#808080] mt-1">TGR — Tesorería General de la República</p>
      </header>
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-10 flex flex-col gap-4">
        <p className="text-[10px] tracking-widest text-muted-foreground">Obligaciones pendientes</p>
        <div className="rounded-2xl border border-[#ccc] bg-white divide-y divide-[#ccc]">
          {DEUDAS.map((d) => (
            <button
              key={d.id}
              onClick={() => { setSelected(d); setStep("detalle"); }}
              className="w-full flex items-center justify-between px-4 py-4 active:bg-muted text-left transition-colors"
            >
              <div className="flex-1 min-w-0 pr-3">
                <p className="text-[13px] leading-snug">{d.concepto}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{d.organismo}</p>
                <p className="text-[10px] text-muted-foreground">Vence: {d.vencimiento}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-[13px]">{d.monto}</span>
                <span
                  className="rounded-[4px] px-2 py-[2px] text-[10px] font-bold leading-[150%]"
                  style={{
                    background: DEUDA_BADGE[d.estado]?.bg ?? "#e3f2fd",
                    color: DEUDA_BADGE[d.estado]?.color ?? "#0d47a1"
                  }}
                >
                  {d.estado}
                </span>
              </div>
            </button>
          ))}
        </div>
        <div className="border border-border bg-card px-4 py-3 flex items-start gap-2">
          <AlertTriangle size={13} strokeWidth={1.5} className="shrink-0 mt-0.5 text-muted-foreground" />
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Considera el pago de obligaciones con el Estado directamente desde la app, incluyendo servicios, multas, impuestos, permisos y derechos, cuando el organismo lo habilite.
          </p>
        </div>
      </div>
    </div>
  );

  if (step === "detalle" && selected) return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col w-full max-w-[390px] mx-auto">
      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3 shrink-0">
        <button onClick={() => setStep("lista")} className="flex items-center gap-2 p-1 -ml-1 text-[#0046a8] active:bg-blue-50 rounded-full transition-colors mb-4">
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="text-[12px] tracking-widest">Volver</span>
        </button>
        <h1 className="text-[#333]">Detalle de obligación</h1>
      </header>
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-6 flex flex-col gap-4">
        <div className="rounded-2xl border border-[#ccc] bg-white divide-y divide-[#ccc]">
          {[
            { label: "Concepto", value: selected.concepto },
            { label: "Organismo", value: selected.organismo },
            { label: "Monto", value: selected.monto },
            { label: "Vencimiento", value: selected.vencimiento },
            { label: "Estado", value: selected.estado },
          ].map(({ label, value }) => (
            <div key={label} className="px-4 py-3">
              <p className="text-[10px] tracking-widest text-muted-foreground">{label}</p>
              <p className="text-[13px] mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 pb-6 pt-4 border-t border-border bg-card shrink-0">
        <button onClick={() => setStep("pago")} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-full active:opacity-80 transition-opacity">
          Pagar {selected.monto}
        </button>
      </div>
    </div>
  );

  if (step === "pago" && selected) return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col w-full max-w-[390px] mx-auto">
      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3 shrink-0">
        <button onClick={() => setStep("detalle")} className="flex items-center gap-2 p-1 -ml-1 text-[#0046a8] active:bg-blue-50 rounded-full transition-colors mb-4">
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="text-[12px] tracking-widest">Volver</span>
        </button>
        <h1 className="text-[#333]">Método de pago</h1>
      </header>
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-6 flex flex-col gap-4">
        <div className="rounded-2xl border border-[#ccc] bg-white divide-y divide-[#ccc]">
          <div className="px-4 py-3 flex justify-between">
            <p className="text-[12px] text-muted-foreground">{selected.concepto}</p>
            <p className="text-[13px]">{selected.monto}</p>
          </div>
          <div className="px-4 py-3 flex justify-between">
            <p className="text-[12px]">Total</p>
            <p className="text-[15px]">{selected.monto}</p>
          </div>
        </div>
        <p className="text-[10px] tracking-widest text-muted-foreground">Seleccione medio de pago</p>
        {["Webpay (débito / crédito)", "Transferencia bancaria"].map((mp) => (
          <button
            key={mp}
            onClick={() => setMedioPago(mp)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 border text-left transition-colors ${
              medioPago === mp ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card active:bg-muted"
            }`}
          >
            <span className="text-[13px]">{mp}</span>
          </button>
        ))}
      </div>
      <div className="px-4 pb-6 pt-4 border-t border-border bg-card shrink-0">
        <button
          onClick={() => medioPago && setStep("confirmacion")}
          disabled={!medioPago}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-full disabled:opacity-30 active:opacity-80 transition-opacity"
        >
          Confirmar pago
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col w-full max-w-[390px] mx-auto">
      <div className="px-4 pt-10 pb-3 border-b border-border bg-card shrink-0 flex items-center justify-between">
        <p className="text-[11px] tracking-widest text-muted-foreground">Pago completado</p>
        <button onClick={onBack} className="p-1 active:bg-muted transition-colors"><X size={16} strokeWidth={1.5} /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-10 pb-10 flex flex-col items-center gap-6">
        <CheckCircle2 size={40} strokeWidth={1} className="text-foreground" />
        <div className="text-center">
          <h2 className="mb-1">Pago realizado</h2>
          <p className="text-[12px] text-muted-foreground leading-relaxed">La obligación fue pagada correctamente.</p>
        </div>
        <div className="w-full rounded-2xl border border-[#ccc] bg-white divide-y divide-[#ccc]">
          {[
            { label: "Folio de pago", value: folio },
            { label: "Concepto", value: selected?.concepto ?? "" },
            { label: "Organismo", value: selected?.organismo ?? "" },
            { label: "Monto pagado", value: selected?.monto ?? "" },
          ].map(({ label, value }) => (
            <div key={label} className="px-4 py-3">
              <p className="text-[10px] tracking-widest text-muted-foreground">{label}</p>
              <p className="text-[13px] mt-0.5">{value}</p>
            </div>
          ))}
        </div>
        <button onClick={onBack} className="w-full border border-border py-3.5 text-[12px] tracking-widest text-muted-foreground active:bg-muted transition-colors rounded-full">
          Volver a Servicios
        </button>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function ServiciosPage({
  onBack,
  onNavigate,
}: {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}) {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState<string | null>(null);

  const filtered = SERVICIOS.filter(
    (s) =>
      s.nombre.toLowerCase().includes(search.toLowerCase()) ||
      s.organismo.toLowerCase().includes(search.toLowerCase()) ||
      s.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="w-full max-w-[390px] min-h-screen bg-background flex flex-col">
        <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3 shrink-0">
          <button onClick={onBack} className="flex items-center gap-2 p-1 -ml-1 text-[#0046a8] active:bg-blue-50 rounded-full transition-colors mb-4">
            <ArrowLeft size={18} strokeWidth={1.5} />
            <span className="text-[12px] tracking-widest">Inicio</span>
          </button>
          <h1 className="text-[#333]">Servicios</h1>
          <p className="text-[11px] text-[#808080] mt-1">Servicios del Estado disponibles en la app</p>
        </header>

        <div className="px-4 py-3 bg-card border-b border-border shrink-0">
          <div className="relative">
            <Search size={13} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar servicios..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-[24px] border border-[#333] bg-white text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-5 pb-6 flex flex-col gap-2">
          {filtered.length === 0 ? (
            <p className="text-[12px] text-muted-foreground text-center py-10">Sin servicios para la búsqueda realizada.</p>
          ) : (
            filtered.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl border border-[#ccc] bg-white active:bg-gray-50 text-left transition-colors"
              >
                <div className="w-8 h-8 bg-[#f2f2f2] rounded-[8px] flex items-center justify-center shrink-0">
                  <s.icon size={18} strokeWidth={1.5} className="text-[#0f5ac4]"/>
                </div>


                
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] leading-snug">{s.nombre}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{s.organismo}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{s.desc}</p>
                </div>
                <ChevronRight size={14} strokeWidth={1.5} className="text-muted-foreground shrink-0" />
              </button>
            ))
          )}
        </div>

        <BottomNav active="servicios" onNavigate={onNavigate} />
      </div>

      {active === "pago-tgr" && <PagoTGR onBack={() => setActive(null)} />}
    </>
  );
}

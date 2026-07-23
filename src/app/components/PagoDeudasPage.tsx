import { useState } from "react";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { Page } from "./BottomNav";
import { GobFranja } from "./GobFranja";
import { WarningAlert } from "./WarningAlert";

type TGRStep = "lista" | "detalle" | "pago" | "confirmacion";

const DEUDA_BADGE: Record<string, { bg: string; color: string }> = {
  "Por vencer": { bg: "#FFFBEB", color: "#522504" },
  Pendiente: { bg: "#FFFBEB", color: "#522504" },
};

export const DEUDAS = [
  {
    id: 1,
    concepto: "Permiso de circulación — vehículo BCZF-41",
    organismo: "Municipalidad de Santiago",
    monto: "$38.200",
    vencimiento: "31 Jul 2026",
    estado: "Por vencer",
  },
  {
    id: 2,
    concepto: "Multa de tránsito — infracción Ley 18.290",
    organismo: "Juzgado de Policía Local",
    monto: "$14.000",
    vencimiento: "15 Ago 2026",
    estado: "Pendiente",
  },
];

function NavBackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <Button onClick={onClick} variant="nav-back" size="none" className="mb-4">
      <Icon name="arrow_back" size={18} />
      {label}
    </Button>
  );
}

export function PagoDeudasPage({
  onBack,
  onNavigate,
}: {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}) {
  const [step, setStep] = useState<TGRStep>("lista");
  const [selected, setSelected] = useState<(typeof DEUDAS)[0] | null>(null);
  const [medioPago, setMedioPago] = useState<string | null>(null);
  const [folio] = useState(`TGR-${Date.now().toString().slice(-8)}`);

  if (step === "detalle" && selected) {
    return (
      <div className="w-full max-w-[390px] min-h-screen bg-background flex flex-col mx-auto">
        <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3 shrink-0 relative">
          <GobFranja />
          <NavBackButton onClick={() => setStep("lista")} label="Volver" />
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
          <Button onClick={() => setStep("pago")} variant="primary" size="md" fullWidth>
            Pagar {selected.monto}
          </Button>
        </div>
      </div>
    );
  }

  if (step === "pago" && selected) {
    return (
      <div className="w-full max-w-[390px] min-h-screen bg-background flex flex-col mx-auto">
        <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3 shrink-0 relative">
          <GobFranja />
          <NavBackButton onClick={() => setStep("detalle")} label="Volver" />
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
          <p className="text-[10px] tracking-widest text-muted-foreground">Selecciona medio de pago</p>
          {["Webpay (débito / crédito)", "Transferencia bancaria"].map((mp) => (
            <Button
              key={mp}
              onClick={() => setMedioPago(mp)}
              variant="select"
              size="md"
              selected={medioPago === mp}
              fullWidth
            >
              <span className="text-[13px]">{mp}</span>
            </Button>
          ))}
        </div>
        <div className="px-4 pb-6 pt-4 border-t border-border bg-card shrink-0">
          <Button
            onClick={() => medioPago && setStep("confirmacion")}
            disabled={!medioPago}
            variant="primary"
            size="md"
            fullWidth
          >
            Confirmar pago
          </Button>
        </div>
      </div>
    );
  }

  if (step === "confirmacion") {
    return (
      <div className="w-full max-w-[390px] min-h-screen bg-background flex flex-col mx-auto">
        <div className="px-4 pt-10 pb-3 border-b border-border bg-card shrink-0 flex items-center justify-between relative">
          <GobFranja />
          <p className="text-[11px] tracking-widest text-muted-foreground">Pago completado</p>
          <Button onClick={onBack} variant="icon-muted" size="icon" aria-label="Cerrar">
            <Icon name="close" size={15} />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pt-10 pb-10 flex flex-col items-center gap-6">
          <Icon name="check_circle" size={40} weight={100} className="text-foreground" />
          <div className="text-center">
            <h2 className="mb-1">Pago realizado</h2>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              La obligación fue pagada correctamente.
            </p>
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
          <Button onClick={onBack} variant="ghost" size="md" fullWidth>
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-background flex flex-col">
      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3 shrink-0 relative">
        <GobFranja />
        <NavBackButton onClick={onBack} label="Inicio" />
        <h1
          className="text-[#333] text-[24px] leading-9"
          style={{ fontFamily: "'Roboto Slab', sans-serif" }}
        >
          Pago de deudas con el Estado
        </h1>
        <p className="text-[11px] text-[#808080] mt-1">TGR — Tesorería General de la República</p>
      </header>
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-6 flex flex-col gap-4">
        <p className="text-[10px] tracking-widest text-muted-foreground">Obligaciones pendientes</p>
        <div className="rounded-2xl border border-[#ccc] bg-white divide-y divide-[#ccc]">
          {DEUDAS.map((d) => (
            <Button
              key={d.id}
              onClick={() => {
                setSelected(d);
                setStep("detalle");
              }}
              variant="list-row"
              size="none"
              className="flex items-center justify-between px-4 py-4"
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
                    color: DEUDA_BADGE[d.estado]?.color ?? "#0d47a1",
                  }}
                >
                  {d.estado}
                </span>
              </div>
            </Button>
          ))}
        </div>
        <WarningAlert>
          Considera el pago de obligaciones con el Estado directamente desde la app, incluyendo
          servicios, multas, impuestos, permisos y derechos, cuando el organismo lo habilite.
        </WarningAlert>
      </div>
    </div>
  );
}

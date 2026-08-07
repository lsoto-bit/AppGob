import { useMemo, useState } from "react";
import { Icon, Button, Card, Badge, WarningAlert } from "./ui";
import { Page } from "./BottomNav";
import { GobFranja } from "./GobFranja";
import { ScreenOverlay } from "./ScreenOverlay";
import { PaymentReceiptPanel } from "./PaymentReceiptPanel";
import {
  createPaymentFolio,
  createPaymentReceipt,
  type PaymentReceipt,
} from "../paymentReceipt";

type TGRStep = "lista" | "detalle" | "pago" | "confirmacion" | "comprobante";

export type ObligacionEstado = "Por vencer" | "Pendiente" | "Pagada";

export interface Obligacion {
  id: number;
  concepto: string;
  organismo: string;
  monto: string;
  vencimiento: string;
  estado: ObligacionEstado;
  comprobante?: PaymentReceipt;
}

const DEUDA_BADGE: Record<string, { bg: string; color: string }> = {
  "Por vencer": { bg: "#FFFBEB", color: "#522504" },
  Pendiente: { bg: "#FFFBEB", color: "#522504" },
  Pagada: { bg: "#E8F5E9", color: "#1B5E20" },
};

export const DEUDAS_PENDIENTES: Obligacion[] = [
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

export const DEUDAS_PAGADAS: Obligacion[] = [
  {
    id: 101,
    concepto: "Contribuciones bienes raíces — Rol 12345-678",
    organismo: "TGR — Tesorería General de la República",
    monto: "$142.350",
    vencimiento: "30 Abr 2026",
    estado: "Pagada",
    comprobante: createPaymentReceipt({
      folio: "TGR-20260418-8841",
      concepto: "Contribuciones bienes raíces — Rol 12345-678",
      organismo: "TGR — Tesorería General de la República",
      monto: "$142.350",
      medioPago: "Webpay (débito / crédito)",
      fechaPago: "18 abr 2026",
      horaPago: "10:42",
    }),
  },
  {
    id: 102,
    concepto: "Patente municipal — comercio local",
    organismo: "Municipalidad de Providencia",
    monto: "$67.800",
    vencimiento: "15 Mar 2026",
    estado: "Pagada",
    comprobante: createPaymentReceipt({
      folio: "TGR-20260315-5520",
      concepto: "Patente municipal — comercio local",
      organismo: "Municipalidad de Providencia",
      monto: "$67.800",
      medioPago: "Transferencia bancaria",
      fechaPago: "15 mar 2026",
      horaPago: "16:18",
    }),
  },
];

/** @deprecated Use DEUDAS_PENDIENTES */
export const DEUDAS = DEUDAS_PENDIENTES;

function NavBackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <Button onClick={onClick} variant="nav-back" size="none" className="mb-4">
      <Icon name="arrow_back" size={18} />
      {label}
    </Button>
  );
}

function ObligacionRow({
  obligacion,
  onClick,
}: {
  obligacion: Obligacion;
  onClick: () => void;
}) {
  const isPaid = obligacion.estado === "Pagada";
  const isPending =
    obligacion.estado === "Por vencer" || obligacion.estado === "Pendiente";
  const badgeStyle = DEUDA_BADGE[obligacion.estado] ?? { bg: "#e3f2fd", color: "#0d47a1" };

  return (
    <Button
      onClick={onClick}
      variant="list-row"
      size="none"
      className="flex flex-col items-start gap-2 px-4 py-4 w-full text-left"
    >
      <div className="flex items-start justify-between w-full gap-3">
        <Badge size="md" bg={badgeStyle.bg} color={badgeStyle.color}>
          {obligacion.estado}
        </Badge>
        <span className="text-[13px] font-bold text-[#333] shrink-0">{obligacion.monto}</span>
      </div>

      <div className="flex flex-col gap-1.5 w-full min-w-0">
        <p className="text-[13px] leading-[17.875px] text-[#333]">{obligacion.concepto}</p>
        <p className="text-[12px] leading-[15px] text-[#666]">{obligacion.organismo}</p>

        {isPaid && obligacion.comprobante ? (
          <p className="text-[12px] font-medium leading-[18px] text-[#333]">
            Pagado el {obligacion.comprobante.fechaPago}
          </p>
        ) : (
          <p
            className={`text-[12px] font-medium leading-[18px] ${
              isPending ? "text-[#522504]" : "text-[#333]"
            }`}
          >
            Vence: {obligacion.vencimiento}
          </p>
        )}
      </div>

      {isPaid && obligacion.comprobante && (
        <span className="inline-flex items-center gap-1 pt-0.5 text-[11px] font-medium leading-[16.5px] text-[#0046a8]">
          Ver comprobante
          <Icon name="chevron_right" size={14} className="text-[#0046a8] shrink-0" />
        </span>
      )}
    </Button>
  );
}

export function PagoDeudasPage({
  onBack,
}: {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}) {
  const [step, setStep] = useState<TGRStep>("lista");
  const [selected, setSelected] = useState<Obligacion | null>(null);
  const [medioPago, setMedioPago] = useState<string | null>(null);
  const [paidObligations, setPaidObligations] = useState<Obligacion[]>(DEUDAS_PAGADAS);
  const [pendingObligations, setPendingObligations] = useState<Obligacion[]>(DEUDAS_PENDIENTES);
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);

  const activeReceipt = useMemo(() => {
    if (step === "confirmacion") return receipt;
    if (step === "comprobante" && selected?.comprobante) return selected.comprobante;
    return null;
  }, [receipt, selected, step]);

  function resetFlow() {
    setStep("lista");
    setSelected(null);
    setMedioPago(null);
    setReceipt(null);
  }

  function handleFinish() {
    resetFlow();
    onBack();
  }

  function openPaidReceipt(obligacion: Obligacion) {
    setSelected(obligacion);
    setStep("comprobante");
  }

  function handleConfirmPayment() {
    if (!selected || !medioPago) return;

    const folio = createPaymentFolio();
    const paymentReceipt = createPaymentReceipt({
      folio,
      concepto: selected.concepto,
      organismo: selected.organismo,
      monto: selected.monto,
      medioPago,
    });

    const paidObligation: Obligacion = {
      ...selected,
      estado: "Pagada",
      comprobante: paymentReceipt,
    };

    setReceipt(paymentReceipt);
    setPendingObligations((prev) => prev.filter((item) => item.id !== selected.id));
    setPaidObligations((prev) => [paidObligation, ...prev]);
    setStep("confirmacion");
  }

  return (
    <>
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
          <Card divided>
            {pendingObligations.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Icon name="check_circle" size={24} className="mx-auto text-[#388e3c] mb-2" />
                <p className="text-[13px] text-foreground">No tienes obligaciones pendientes</p>
                <p className="text-[12px] text-muted-foreground mt-1">
                  Todas tus deudas visibles fueron pagadas.
                </p>
              </div>
            ) : (
              pendingObligations.map((d) => (
                <ObligacionRow
                  key={d.id}
                  obligacion={d}
                  onClick={() => {
                    setSelected(d);
                    setMedioPago(null);
                    setStep("detalle");
                  }}
                />
              ))
            )}
          </Card>

          <p className="text-[10px] tracking-widest text-muted-foreground pt-1">Obligaciones pagadas</p>
          <Card divided>
            {paidObligations.map((d) => (
              <ObligacionRow key={d.id} obligacion={d} onClick={() => openPaidReceipt(d)} />
            ))}
          </Card>

          <WarningAlert>
            Al finalizar un pago recibirás un comprobante PDF en tu correo electrónico como respaldo
            imprimible de la transacción.
          </WarningAlert>
        </div>
      </div>

      {step === "detalle" && selected && (
        <ScreenOverlay>
          <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3 shrink-0 relative">
            <GobFranja />
            <NavBackButton onClick={() => setStep("lista")} label="Volver" />
            <h1 className="text-[#333]">Detalle de obligación</h1>
          </header>
          <div className="flex-1 overflow-y-auto px-4 pt-5 pb-6 flex flex-col gap-4">
            <Card divided>
              {[
                { label: "Concepto", value: selected.concepto },
                { label: "Organismo", value: selected.organismo },
                { label: "Monto", value: selected.monto },
                { label: "Vencimiento", value: selected.vencimiento },
                { label: "Estado", value: selected.estado },
              ].map(({ label, value }) => (
                <div key={label} className="px-4 py-3">
                  <p className="text-[10px] tracking-widest text-muted-foreground">{label}</p>
                  <p
                    className={`mt-0.5 ${
                      label === "Vencimiento" || label === "Estado"
                        ? "type-critical-micro"
                        : "text-[13px]"
                    }`}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </Card>
          </div>
          <div className="px-4 pb-6 pt-4 border-t border-border bg-card shrink-0">
            <Button onClick={() => setStep("pago")} variant="primary" size="md" fullWidth>
              Pagar {selected.monto}
            </Button>
          </div>
        </ScreenOverlay>
      )}

      {step === "pago" && selected && (
        <ScreenOverlay>
          <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3 shrink-0 relative">
            <GobFranja />
            <NavBackButton onClick={() => setStep("detalle")} label="Volver" />
            <h1 className="text-[#333]">Método de pago</h1>
          </header>
          <div className="flex-1 overflow-y-auto px-4 pt-5 pb-6 flex flex-col gap-4">
            <Card divided>
              <div className="px-4 py-3 flex justify-between">
                <p className="text-[12px] text-muted-foreground">{selected.concepto}</p>
                <p className="text-[13px]">{selected.monto}</p>
              </div>
              <div className="px-4 py-3 flex justify-between">
                <p className="text-[12px]">Total</p>
                <p className="text-[15px]">{selected.monto}</p>
              </div>
            </Card>
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
            <WarningAlert>
              Al confirmar el pago se generará automáticamente un comprobante PDF y se enviará a tu
              correo electrónico registrado.
            </WarningAlert>
          </div>
          <div className="px-4 pb-6 pt-4 border-t border-border bg-card shrink-0">
            <Button
              onClick={handleConfirmPayment}
              disabled={!medioPago}
              variant="primary"
              size="md"
              fullWidth
            >
              Confirmar pago
            </Button>
          </div>
        </ScreenOverlay>
      )}

      {step === "confirmacion" && activeReceipt && (
        <ScreenOverlay>
          <div className="px-4 pt-10 pb-3 border-b border-border bg-card shrink-0 flex items-center justify-between relative">
            <GobFranja />
            <p className="text-[11px] tracking-widest text-muted-foreground">Pago completado</p>
            <Button onClick={handleFinish} variant="icon-muted" size="icon" aria-label="Cerrar">
              <Icon name="close" size={15} />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 pt-8 pb-10 flex flex-col gap-5 min-w-0">
            <Icon name="check_circle" size={40} weight={100} className="text-foreground self-center" />
            <div className="text-center">
              <h2 className="mb-1">Pago realizado</h2>
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                La obligación fue pagada correctamente. Tu comprobante PDF está listo.
              </p>
            </div>
            <PaymentReceiptPanel receipt={activeReceipt} autoDeliver />
            <Button onClick={resetFlow} variant="ghost" size="md" fullWidth>
              Volver a pago de deudas con el Estado
            </Button>
          </div>
        </ScreenOverlay>
      )}

      {step === "comprobante" && activeReceipt && selected && (
        <ScreenOverlay>
          <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3 shrink-0 relative">
            <GobFranja />
            <NavBackButton onClick={() => setStep("lista")} label="Volver" />
            <h1 className="text-[#333]">Comprobante de pago</h1>
            <p className="text-[11px] text-muted-foreground mt-1">{selected.concepto}</p>
          </header>
          <div className="flex-1 overflow-y-auto px-4 pt-5 pb-10 flex flex-col gap-4">
            <PaymentReceiptPanel receipt={activeReceipt} autoDeliver={false} />
          </div>
        </ScreenOverlay>
      )}
    </>
  );
}

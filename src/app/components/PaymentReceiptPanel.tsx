import { useEffect, useState } from "react";
import { Icon, Button, Card, WarningAlert } from "./ui";
import {
  mockDownloadPaymentReceipt,
  mockPrintPaymentReceipt,
  sendPaymentReceiptEmail,
  type PaymentReceipt,
} from "../paymentReceipt";

type ReceiptPhase = "generating" | "ready";
type MockAction = "download" | "print" | null;

export function PaymentReceiptPanel({
  receipt,
  autoDeliver = true,
  compact = false,
}: {
  receipt: PaymentReceipt;
  autoDeliver?: boolean;
  compact?: boolean;
}) {
  const [phase, setPhase] = useState<ReceiptPhase>(autoDeliver ? "generating" : "ready");
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent">(
    autoDeliver ? "idle" : "sent",
  );
  const [mockAction, setMockAction] = useState<MockAction>(null);

  useEffect(() => {
    if (!autoDeliver) return;

    let cancelled = false;

    async function deliverReceipt() {
      setPhase("generating");
      setEmailStatus("sending");
      await sendPaymentReceiptEmail(receipt);
      if (cancelled) return;
      setPhase("ready");
      setEmailStatus("sent");
    }

    void deliverReceipt();

    return () => {
      cancelled = true;
    };
  }, [autoDeliver, receipt]);

  async function handleResendEmail() {
    setEmailStatus("sending");
    await sendPaymentReceiptEmail(receipt);
    setEmailStatus("sent");
  }

  async function handleMockDownload() {
    setMockAction("download");
    await mockDownloadPaymentReceipt();
    setMockAction(null);
  }

  async function handleMockPrint() {
    setMockAction("print");
    await mockPrintPaymentReceipt();
    setMockAction(null);
  }

  return (
    <div className={`w-full min-w-0 self-stretch flex flex-col ${compact ? "gap-3" : "gap-4"}`}>
      {phase === "generating" && (
        <Card overflow="hidden" className="px-4 py-4 flex items-center gap-3">
          <Icon name="schedule" size={18} className="text-primary shrink-0 animate-pulse" />
          <div>
            <p className="text-[12px] text-foreground">Generando comprobante PDF</p>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Preparando el respaldo imprimible de tu transacción…
            </p>
          </div>
        </Card>
      )}

      {phase === "ready" && (
        <>
          <Card divided fullWidth overflow="hidden">
            <div className="px-4 py-3 bg-[#f8fbff] flex items-start gap-3 min-w-0">
              <div className="w-10 h-12 border border-primary/30 bg-white shrink-0 flex flex-col items-center justify-center gap-1 rounded-[4px]">
                <Icon name="description" size={16} className="text-primary" />
                <span className="text-[8px] tracking-widest text-primary font-bold">PDF</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] text-foreground">Comprobante de pago</p>
                <p className="type-critical-micro mt-0.5 break-all">Folio {receipt.folio}</p>
                <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed break-words">
                  Documento oficial con los datos de la transacción, listo para descargar o imprimir.
                </p>
              </div>
            </div>
            {[
              { label: "Concepto", value: receipt.concepto },
              { label: "Organismo", value: receipt.organismo },
              { label: "Monto pagado", value: receipt.monto },
              { label: "Medio de pago", value: receipt.medioPago },
              { label: "Fecha y hora", value: `${receipt.fechaPago} · ${receipt.horaPago}` },
            ].map(({ label, value }) => (
              <div key={label} className="px-4 py-3 min-w-0">
                <p className="text-[12px] tracking-widest text-muted-foreground">{label}</p>
                <p className="text-[12px] mt-0.5 break-words">{value}</p>
              </div>
            ))}
          </Card>

          <div className="flex flex-col gap-2">
            <Button
              onClick={() => void handleMockDownload()}
              disabled={mockAction !== null}
              variant="primary"
              size="md"
              fullWidth
            >
              <Icon name="download" size={16} />
              {mockAction === "download" ? "Preparando descarga…" : "Descargar comprobante PDF"}
            </Button>
            <Button
              onClick={() => void handleMockPrint()}
              disabled={mockAction !== null}
              variant="secondary"
              size="md"
              fullWidth
            >
              <Icon name="print" size={16} />
              {mockAction === "print" ? "Preparando impresión…" : "Imprimir comprobante"}
            </Button>
          </div>

          <Card overflow="hidden" className="px-4 py-4">
            <div className="flex items-start gap-3">
              <Icon
                name={emailStatus === "sent" ? "check_circle" : "mail"}
                size={18}
                className={emailStatus === "sent" ? "text-[#388e3c] shrink-0" : "text-primary shrink-0"}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[12px] text-foreground">
                  {emailStatus === "sending" ? "Enviando comprobante…" : "Comprobante enviado por correo"}
                </p>
                <p className="type-critical-micro mt-0.5 break-all">{receipt.email}</p>
                {emailStatus === "sent" && (
                  <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">
                    Recibirás el PDF en tu bandeja de entrada como respaldo de la transacción.
                  </p>
                )}
              </div>
            </div>
            {emailStatus === "sent" && (
              <Button
                onClick={() => void handleResendEmail()}
                variant="link"
                size="sm"
                className="mt-3 self-start"
              >
                Reenviar comprobante
              </Button>
            )}
          </Card>

          <WarningAlert>
            Guarda o imprime este comprobante para contar con un respaldo físico de tu pago ante el organismo correspondiente.
          </WarningAlert>
        </>
      )}
    </div>
  );
}

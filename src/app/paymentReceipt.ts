export const PAYMENT_RECEIPT_EMAIL = "m.valenzuela@correo.cl";

export interface PaymentReceipt {
  folio: string;
  concepto: string;
  organismo: string;
  monto: string;
  medioPago: string;
  fechaPago: string;
  horaPago: string;
  email: string;
}

export function createPaymentFolio(prefix = "TGR") {
  const stamp = Date.now().toString().slice(-8);
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `${prefix}-${date}-${stamp}`;
}

export function createPaymentReceipt(input: {
  folio: string;
  concepto: string;
  organismo: string;
  monto: string;
  medioPago: string;
  email?: string;
  fechaPago?: string;
  horaPago?: string;
}): PaymentReceipt {
  const now = new Date();
  const fechaPago =
    input.fechaPago ??
    now.toLocaleDateString("es-CL", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  const horaPago =
    input.horaPago ??
    now.toLocaleTimeString("es-CL", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return {
    folio: input.folio,
    concepto: input.concepto,
    organismo: input.organismo,
    monto: input.monto,
    medioPago: input.medioPago,
    fechaPago,
    horaPago,
    email: input.email ?? PAYMENT_RECEIPT_EMAIL,
  };
}

export async function sendPaymentReceiptEmail(receipt: PaymentReceipt) {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return {
    sent: true,
    email: receipt.email,
    folio: receipt.folio,
  };
}

export async function mockDownloadPaymentReceipt() {
  await new Promise((resolve) => setTimeout(resolve, 700));
}

export async function mockPrintPaymentReceipt() {
  await new Promise((resolve) => setTimeout(resolve, 700));
}

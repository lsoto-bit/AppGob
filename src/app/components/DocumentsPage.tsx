import { useState, useEffect, useMemo } from "react";
import { Icon, type IconName, Button, WarningAlert, Badge, Card, SearchInput } from "./ui";
import {
  InteriorPageBody,
  InteriorPageLayout,
  InteriorPageSection,
} from "./InteriorPageLayout";
import { ScreenOverlay, DialogOverlay } from "./ScreenOverlay";
import { Page } from "./BottomNav";
import { BiometricAuth } from "./BiometricAuth";
import { PaymentReceiptPanel } from "./PaymentReceiptPanel";
import { createPaymentReceipt } from "../paymentReceipt";
import {
  DocumentPreviewLayout,
  DocumentPreviewSection,
} from "./documents/DocumentPreviewLayout";
import { CertificatePreview } from "./documents/CertificatePreview";
import { CedulaPreview } from "./documents/CedulaPreview";
import { RecetaPreview } from "./documents/RecetaPreview";

// ── Document data ──────────────────────────────────────────────────────────────

type WireframeType = "cedula" | "credencial" | "certificate" | "receta";

interface Document {
  id: number;
  name: string;
  category: string;
  status: "Vigente" | "Por vencer" | "Vencido";
  expiry: string;
  number: string;
  sub?: string;
  wireframe: WireframeType;
}

export const DOCUMENT_CATEGORIES: { key: string; label: string; icon: IconName }[] = [
  { key: "identificacion", label: "Documentos de identificación", icon: "badge" },
  { key: "afiliacion", label: "Certificados de afiliación", icon: "health_and_safety" },
  { key: "registro-civil", label: "Certificados del Registro Civil", icon: "article" },
  { key: "receta", label: "Receta médica electrónica", icon: "medication" },
];

export const DOCUMENTS: Document[] = [
  {
    id: 1,
    name: "Cédula de identidad",
    category: "identificacion",
    status: "Por vencer",
    expiry: "15 Ago 2026",
    number: "RUN 14.582.301-K",
    wireframe: "cedula",
  },
  {
    id: 2,
    name: "Credencial de discapacidad digital",
    category: "identificacion",
    status: "Vigente",
    expiry: "Jun 2028",
    number: "N.° CD-2024-00341",
    wireframe: "credencial",
  },
  {
    id: 3,
    name: "Certificado de afiliación FONASA",
    category: "afiliacion",
    status: "Vigente",
    expiry: "Permanente",
    number: "RUN 14.582.301-K · Tramo B",
    sub: "FONASA — Sistema público de salud",
    wireframe: "certificate",
  },
  {
    id: 4,
    name: "Certificado de nacimiento",
    category: "registro-civil",
    status: "Vigente",
    expiry: "Sin vencimiento",
    number: "Folio 2024-00187341",
    sub: "Registro Civil e Identificación",
    wireframe: "certificate",
  },
  {
    id: 5,
    name: "Certificado de matrimonio",
    category: "registro-civil",
    status: "Vigente",
    expiry: "Sin vencimiento",
    number: "Folio 2010-00042198",
    sub: "Registro Civil e Identificación",
    wireframe: "certificate",
  },
  {
    id: 6,
    name: "Receta electrónica — 14 jun 2026",
    category: "receta",
    status: "Vigente",
    expiry: "14 Jul 2026",
    number: "N.° RE-2026-004821",
    sub: "Dr. Rodrigo Soto · CESFAM Lo Barnechea",
    wireframe: "receta",
  },
  {
    id: 7,
    name: "Receta electrónica — 02 may 2026",
    category: "receta",
    status: "Vencido",
    expiry: "02 Jun 2026",
    number: "N.° RE-2026-002103",
    sub: "Dra. Ana Pérez · Clínica Las Condes",
    wireframe: "receta",
  },
];

export const STATUS_BADGE: Record<Document["status"], { bg: string; color: string }> = {
  Vigente:      { bg: "#b8f6b6", color: "#1c1f27" },
  "Por vencer": { bg: "#ffe17d", color: "#1c1f27" },
  Vencido:      { bg: "#ffd8d2", color: "#1c1f27" },
};

// ── Shared field primitive ─────────────────────────────────────────────────────

const CRITICAL_FIELD_LABELS = new Set(["Vencimiento", "Vigencia"]);

function Field({ label, value }: { label: string; value: string }) {
  const isCritical = CRITICAL_FIELD_LABELS.has(label);

  return (
    <div className="min-w-0 border-b border-dashed border-border pb-1">
      <p className="text-xs tracking-widest text-muted-foreground">{label}</p>
      <p className={`mt-0.5 break-words ${isCritical ? "type-critical-micro" : "text-xs"}`}>{value}</p>
    </div>
  );
}

// ── Wireframe: Credencial de discapacidad ─────────────────────────────────────

function CredencialWireframe({ doc }: { doc: Document }) {
  return (
    <div className="w-full min-w-0 max-w-full border border-foreground bg-card select-none rounded-2xl overflow-hidden">
      <div className="bg-primary px-3 py-2 flex items-center justify-between gap-2 min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 border-2 border-primary-foreground rounded-full flex items-center justify-center">
            <div className="w-3.5 h-3.5 border border-primary-foreground rounded-full" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="h-1.5 w-16 bg-primary-foreground opacity-80" />
            <div className="h-1 w-12 bg-primary-foreground opacity-50" />
          </div>
        </div>
        <div className="text-right min-w-0">
          <p className="text-xs tracking-widest text-primary-foreground opacity-80 truncate">Senadis</p>
          <p className="text-xs tracking-widest text-primary-foreground opacity-60 truncate">Credencial Digital</p>
        </div>
      </div>
      <div className="border-b-2 border-foreground px-3 py-1.5">
        <p className="text-xs tracking-widest text-center text-muted-foreground">Credencial Nacional de Discapacidad</p>
      </div>
      <div className="flex gap-3 p-3 min-w-0">
        <div className="shrink-0 flex flex-col gap-2">
          <div className="w-16 h-20 border-2 border-dashed border-muted-foreground flex flex-col items-center justify-center gap-1">
            <div className="w-6 h-6 border border-muted-foreground rounded-full" />
            <div className="w-8 h-4 border border-muted-foreground" style={{ borderRadius: "50% 50% 0 0" }} />
            <span className="text-xs tracking-wider text-muted-foreground">Foto</span>
          </div>
          <div className="w-16 h-8 border border-border flex items-center justify-center gap-1">
            <div className="flex items-end gap-0.5">
              <div className="w-1.5 h-1.5 border border-foreground rounded-full" />
              <div className="w-1 h-3 border border-foreground" />
            </div>
            <span className="text-xs tracking-widest text-muted-foreground">Acceso</span>
          </div>
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <Field label="Nombre completo" value="VALENZUELA ROJAS, MARÍA" />
          <Field label="RUN" value="14.582.301-K" />
          <Field label="N.° credencial" value="CD-2024-00341" />
          <Field label="Tipo de discapacidad" value="Física — Movilidad reducida" />
          <div className="grid grid-cols-2 gap-2 min-w-0">
            <Field label="Emisión" value="Jun 2024" />
            <Field label="Vencimiento" value={doc.expiry} />
          </div>
        </div>
      </div>
      <div className="border-t-2 border-foreground px-3 py-2 flex items-center justify-between gap-2 min-w-0">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="h-1.5 w-24 max-w-full bg-muted" />
          <div className="h-1.5 w-16 max-w-full bg-muted" />
          <p className="text-xs tracking-widest text-muted-foreground mt-0.5">Firma / Director SENADIS</p>
        </div>
        <div className="w-12 h-12 shrink-0 border-2 border-primary grid grid-cols-3 gap-px p-0.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className={`${[0, 2, 4, 6, 8].includes(i) ? "bg-primary" : "bg-background"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Renovación / reimpresión flow ─────────────────────────────────────────────

const MOTIVOS = [
  { key: "vencimiento", label: "Renovación por vencimiento", sub: "El documento está por vencer o ya venció." },
  { key: "cambio-datos", label: "Modificación de datos", sub: "Cambio de nombre, estado civil u otros datos." },
  { key: "deterioro", label: "Deterioro del documento", sub: "El documento físico está dañado o ilegible." },
  { key: "extravio", label: "Extravío o robo", sub: "El documento fue perdido o sustraído." },
];

const SUCURSALES = [
  { id: 1, nombre: "Registro Civil — Santiago Centro", direccion: "Huérfanos 1570, Santiago", distancia: "0.4 km", espera: "~20 min" },
  { id: 2, nombre: "Registro Civil — Providencia", direccion: "Av. Providencia 2140", distancia: "1.8 km", espera: "~35 min" },
  { id: 3, nombre: "ChileAtiende — Estación Central", direccion: "Alameda 3300", distancia: "2.3 km", espera: "~15 min" },
];

const MEDIOS_PAGO = [
  { key: "webpay", label: "Webpay (tarjeta débito / crédito)" },
  { key: "transferencia", label: "Transferencia bancaria" },
];

type RenovStep = "motivo" | "datos" | "sucursal" | "pago" | "confirmacion";

function RenovacionFlow({ doc, onClose }: { doc: Document; onClose: () => void }) {
  const [step, setStep] = useState<RenovStep>("motivo");
  const [motivo, setMotivo] = useState<string | null>(null);
  const [sucursal, setSucursal] = useState<number | null>(null);
  const [medioPago, setMedioPago] = useState<string | null>(null);
  const [folio] = useState(`SOL-${Date.now().toString().slice(-8)}`);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editNombre, setEditNombre] = useState("María Andrea Valenzuela Rojas");
  const [editNacimiento, setEditNacimiento] = useState("12 de abril de 1985");
  const [editNacionalidad, setEditNacionalidad] = useState("Chilena");
  const [editCorreo, setEditCorreo] = useState("m.valenzuela@correo.cl");
  const [editTelefono, setEditTelefono] = useState("+56 9 8812 3456");

  const ARANCEL = doc.wireframe === "cedula" ? "$3.800" : "$2.400";
  const STEPS: RenovStep[] = ["motivo", "datos", "sucursal", "pago", "confirmacion"];
  const stepIdx = STEPS.indexOf(step);
  const medioPagoLabel = MEDIOS_PAGO.find((mp) => mp.key === medioPago)?.label ?? "";
  const paymentReceipt = useMemo(
    () =>
      createPaymentReceipt({
        folio,
        concepto: `Renovación — ${doc.name}`,
        organismo: "Registro Civil e Identificación",
        monto: ARANCEL,
        medioPago: medioPagoLabel || "Webpay (tarjeta débito / crédito)",
      }),
    [ARANCEL, doc.name, folio, medioPagoLabel],
  );

  function StepHeader({ title, sub }: { title: string; sub?: string }) {
    return (
      <div className="px-4 pt-4 pb-3 border-b border-border bg-card shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <Button onClick={onClose} variant="icon-muted" size="icon" className="-ml-1" aria-label="Cerrar">
            <Icon name="close" size={15} />
          </Button>
          <p className="text-xs tracking-widest text-muted-foreground">Solicitud de renovación</p>
        </div>
        {/* Progress bar */}
        <div className="flex gap-1 mb-3">
          {STEPS.filter(s => s !== "confirmacion").map((s, i) => (
            <div key={s} className={`flex-1 h-0.5 transition-colors ${i <= stepIdx - (step === "confirmacion" ? 0 : 0) ? "bg-primary" : "bg-border"}`} />
          ))}
        </div>
        <h2 className="text-base">{title}</h2>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    );
  }

  if (step === "motivo") return (
    <ScreenOverlay>
      <StepHeader title="Motivo de la solicitud" sub={doc.name} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 flex flex-col gap-2">
        {MOTIVOS.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setMotivo(m.key)}
            className={`w-full flex items-start gap-3 px-4 py-3.5 border text-left transition-colors ${
              motivo === m.key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card active:bg-muted"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {motivo === m.key
                ? <Icon name="check_circle" size={15} />
                : <Icon name="radio_button_unchecked" size={15} className="text-muted-foreground" />}
            </div>
            <div>
              <p className="text-xs">{m.label}</p>
              <p className={`text-xs mt-0.5 ${motivo === m.key ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.sub}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="px-4 pb-6 shrink-0 border-t border-border pt-4 bg-card">
        <Button
          onClick={() => motivo && setStep("datos")}
          disabled={!motivo}
          variant="primary"
          size="md"
          fullWidth
        >
          Continuar
        </Button>
      </div>
    </ScreenOverlay>
  );

  if (step === "datos") return (
    <>
      <ScreenOverlay>
        {motivo === "cambio-datos"
          ? <StepHeader title="Cambio de datos del documento" sub="Modifica los datos que necesitas actualizar" />
          : <StepHeader title="Verificar datos personales" sub="Confirma que tus datos sean correctos" />
        }
        <div className="flex-1 overflow-y-auto pb-6 flex flex-col gap-3">
          {motivo === "cambio-datos" ? (
            <div className="px-4 py-3 flex flex-col gap-4">
              {/* RUN - no editable */}
              <div>
                <p className="text-xs tracking-widest text-muted-foreground">RUN</p>
                <p className="text-xs mt-0.5">14.582.301-K</p>
                <p className="text-xs text-muted-foreground mt-0.5">El RUN no puede modificarse</p>
              </div>
              {/* Nombre completo */}
              <div>
                <p className="text-xs tracking-widest text-muted-foreground">Nombre completo</p>
                <input
                  type="text"
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                  className="w-full text-xs text-foreground border-b border-border py-1 outline-none focus:border-primary bg-transparent"
                />
              </div>
              {/* Fecha de nacimiento */}
              <div>
                <p className="text-xs tracking-widest text-muted-foreground">Fecha de nacimiento</p>
                <input
                  type="text"
                  value={editNacimiento}
                  onChange={(e) => setEditNacimiento(e.target.value)}
                  className="w-full text-xs text-foreground border-b border-border py-1 outline-none focus:border-primary bg-transparent"
                />
              </div>
              {/* Nacionalidad */}
              <div>
                <p className="text-xs tracking-widest text-muted-foreground">Nacionalidad</p>
                <input
                  type="text"
                  value={editNacionalidad}
                  onChange={(e) => setEditNacionalidad(e.target.value)}
                  className="w-full text-xs text-foreground border-b border-border py-1 outline-none focus:border-primary bg-transparent"
                />
              </div>
              {/* Correo electrónico */}
              <div>
                <p className="text-xs tracking-widest text-muted-foreground">Correo electrónico</p>
                <input
                  type="text"
                  value={editCorreo}
                  onChange={(e) => setEditCorreo(e.target.value)}
                  className="w-full text-xs text-foreground border-b border-border py-1 outline-none focus:border-primary bg-transparent"
                />
              </div>
              {/* Teléfono de contacto */}
              <div>
                <p className="text-xs tracking-widest text-muted-foreground">Teléfono de contacto</p>
                <input
                  type="text"
                  value={editTelefono}
                  onChange={(e) => setEditTelefono(e.target.value)}
                  className="w-full text-xs text-foreground border-b border-border py-1 outline-none focus:border-primary bg-transparent"
                />
              </div>
            </div>
          ) : (
            <div className="px-4 pt-4 flex flex-col gap-3">
              <div className="rounded-2xl border border-border bg-white divide-y divide-border">
                {[
                  { label: "Nombre completo", value: "María Andrea Valenzuela Rojas" },
                  { label: "RUN", value: "14.582.301-K" },
                  { label: "Fecha de nacimiento", value: "12 de abril de 1985" },
                  { label: "Nacionalidad", value: "Chilena" },
                  { label: "Correo electrónico", value: "m.valenzuela@correo.cl" },
                  { label: "Teléfono de contacto", value: "+56 9 8812 3456" },
                ].map(({ label, value }) => (
                  <div key={label} className="px-4 py-3">
                    <p className="text-xs tracking-widests text-muted-foreground">{label}</p>
                    <p className="text-xs mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
              <WarningAlert>
                Si algún dato es incorrecto, deberá concurrir al Registro Civil para actualizarlo antes de continuar.
              </WarningAlert>
            </div>
          )}
        </div>
        <div className="px-4 pb-6 pt-4 shrink-0 border-t border-border bg-card flex gap-2">
          <button
            type="button"
            onClick={() => setStep("motivo")}
            className="flex-1 border border-border h-[36px] text-xs text-muted-foreground active:bg-muted transition-colors rounded-full"
          >
            Volver
          </button>
          {motivo === "cambio-datos" ? (
            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-full active:opacity-80 transition-opacity text-xs font-medium"
            >
              Enviar solicitud de cambio
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStep("sucursal")}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-full active:opacity-80 transition-opacity"
            >
              Datos correctos
            </button>
          )}
        </div>
      </ScreenOverlay>
      {showConfirmModal && (
        <DialogOverlay onBackdropClick={() => setShowConfirmModal(false)}>
          <div className="bg-white rounded-2xl p-6 flex flex-col gap-4 w-full shadow-xl">
            <div className="flex items-start gap-3">
              <Icon name="warning" size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-medium text-foreground">Confirma el envío de datos</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Asegúrate de que los datos ingresados sean correctos. Los cambios no se verán reflejados de inmediato y deberán pasar por un proceso de evaluación. Una vez aprobados, nos comunicaremos contigo para coordinar los pasos siguientes.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={() => { setShowConfirmModal(false); setStep("sucursal"); }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-full active:opacity-80 transition-opacity text-xs font-medium"
              >
                Confirmar y continuar
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 border border-border text-foreground rounded-full active:bg-muted transition-colors text-xs"
              >
                Revisar datos
              </button>
            </div>
          </div>
        </DialogOverlay>
      )}
    </>
  );

  if (step === "sucursal") return (
    <ScreenOverlay>
      <StepHeader title="Lugar de retiro" sub="Selecciona dónde retirar el documento físico" />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 flex flex-col gap-2">
        <p className="text-xs text-muted-foreground leading-relaxed mb-1">
          El documento se emite en 5 días hábiles. El retiro requiere presencia física con cédula vigente o pasaporte.
        </p>
        {SUCURSALES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSucursal(s.id)}
            className={`w-full flex items-start gap-3 px-4 py-3.5 border rounded text-left transition-colors ${
              sucursal === s.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card active:bg-muted"
            }`}
          >
            <Icon name="location_on" size={14} className={`shrink-0 mt-0.5 ${sucursal === s.id ? "text-primary-foreground" : "text-muted-foreground"}`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs">{s.nombre}</p>
              <p className={`text-xs mt-0.5 ${sucursal === s.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{s.direccion}</p>
              <div className="flex gap-3 mt-1">
                <p className={`text-xs ${sucursal === s.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{s.distancia}</p>
                <p className={`text-xs ${sucursal === s.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>Espera: {s.espera}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="px-4 pb-6 pt-4 shrink-0 border-t border-border bg-card flex gap-2">
        <button
          type="button"
          onClick={() => setStep("datos")}
          className="flex-1 border border-border h-[36px] text-xs text-muted-foreground active:bg-muted transition-colors rounded-full"
        >
          Volver
        </button>
        <button
          type="button"
          onClick={() => sucursal && setStep("pago")}
          disabled={!sucursal}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-full disabled:opacity-30 active:opacity-80 transition-opacity"
        >
          Continuar
        </button>
      </div>
    </ScreenOverlay>
  );

  if (step === "pago") return (
    <ScreenOverlay>
      <StepHeader title="Pago del arancel" sub="El pago se procesa de forma segura" />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 flex flex-col gap-4">
        {/* Resumen */}
        <div className="rounded-2xl border border-border bg-white divide-y divide-border">
          <div className="px-4 py-3 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{doc.name}</p>
            <p className="text-xs">{ARANCEL}</p>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <p className="text-xs">Total a pagar</p>
            <p className="text-base">{ARANCEL}</p>
          </div>
        </div>
        {/* Medio de pago */}
        <div>
          <p className="text-xs tracking-widest text-muted-foreground mb-2">Medio de pago</p>
          <div className="flex flex-col gap-2">
            {MEDIOS_PAGO.map((mp) => (
              <button
                key={mp.key}
                type="button"
                onClick={() => setMedioPago(mp.key)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 border rounded-2xl text-left transition-colors ${
                  medioPago === mp.key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card active:bg-muted"
                }`}
              >
                <Icon name="credit_card" size={14} className={medioPago === mp.key ? "text-primary-foreground" : "text-muted-foreground"} />
                <p className="text-xs">{mp.label}</p>
              </button>
            ))}
          </div>
        </div>
        <WarningAlert>
          Al continuar será redirigido al portal de pago seguro del Registro Civil. Una vez confirmado el pago, recibirá un comprobante por correo electrónico.
        </WarningAlert>
      </div>
      <div className="px-4 pb-6 pt-4 shrink-0 border-t border-border bg-card flex gap-2">
        <button
          type="button"
          onClick={() => setStep("sucursal")}
          className="flex-1 border border-border h-[36px] text-xs text-muted-foreground active:bg-muted transition-colors rounded-full"
        >
          Volver
        </button>
        <button
          type="button"
          onClick={() => medioPago && setStep("confirmacion")}
          disabled={!medioPago}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-full disabled:opacity-30 active:opacity-80 transition-opacity"
        >
          Pagar {ARANCEL}
        </button>
      </div>
    </ScreenOverlay>
  );

  // confirmacion
  const sucursalData = SUCURSALES.find((s) => s.id === sucursal);

  return (
    <ScreenOverlay>
      <div className="px-4 pt-10 pb-3 border-b border-border bg-card shrink-0 flex items-center justify-between">
        <p className="text-xs tracking-widest text-muted-foreground">Solicitud de renovación</p>
        <Button onClick={onClose} variant="icon-muted" size="icon" aria-label="Cerrar">
          <Icon name="close" size={15} />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-8 pb-10 flex flex-col gap-6 min-w-0">
        <Icon name="check_circle" size={40} weight={100} className="text-foreground self-center" />
        <div className="text-center">
          <h2 className="mb-1">Solicitud enviada</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Tu solicitud fue recibida y el pago procesado correctamente.
          </p>
        </div>
        <div className="w-full rounded-2xl border border-border bg-white divide-y divide-border">
          {[
            { label: "Folio de solicitud", value: folio },
            { label: "Documento", value: doc.name },
            { label: "Motivo", value: MOTIVOS.find(m => m.key === motivo)?.label ?? "" },
            { label: "Lugar de retiro", value: sucursalData?.nombre ?? "" },
            { label: "Plazo de emisión", value: "5 días hábiles" },
            { label: "Total pagado", value: ARANCEL },
          ].map(({ label, value }) => (
            <div key={label} className="px-4 py-3">
              <p className="text-xs tracking-widest text-muted-foreground">{label}</p>
              <p className="text-xs mt-0.5">{value}</p>
            </div>
          ))}
        </div>
        <PaymentReceiptPanel receipt={paymentReceipt} />
        <WarningAlert>
          Para retirar el documento debes presentarte con cédula vigente o pasaporte en la sucursal seleccionada.
        </WarningAlert>
        <button
          type="button"
          onClick={onClose}
          className="w-full border border-border h-[36px] text-xs text-muted-foreground active:bg-muted transition-colors rounded-full"
        >
          Volver a Mis documentos
        </button>
      </div>
    </ScreenOverlay>
  );
}

// ── Document preview modal ────────────────────────────────────────────────────

function DocumentPreview({ doc, onClose }: { doc: Document; onClose: () => void }) {
  const [showRenovacion, setShowRenovacion] = useState(false);
  const canRenew = doc.wireframe === "cedula" || doc.wireframe === "credencial";

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: doc.name, text: `${doc.name} — ${doc.number}` }).catch(() => {});
    } else {
      alert("Compartir no disponible en este dispositivo.");
    }
  }

  return (
    <>
      <ScreenOverlay className="bg-white">
        <DocumentPreviewLayout
          onClose={onClose}
          onShare={handleShare}
          title={doc.name}
          subtitle={doc.number}
          statusBadge={{
            label: doc.status,
            bg: STATUS_BADGE[doc.status].bg,
            color: STATUS_BADGE[doc.status].color,
          }}
          renewalAction={
            canRenew ? { onClick: () => setShowRenovacion(true) } : undefined
          }
          trailingContent={
            <WarningAlert>
              Este documento tiene validez legal en formato digital conforme al D.S. N.° 83 del Ministerio Secretaría General de la Presidencia.
            </WarningAlert>
          }
        >
          <DocumentPreviewSection>
            <div className="w-full min-w-0">
              {doc.wireframe === "cedula" && <CedulaPreview doc={doc} />}
              {doc.wireframe === "credencial" && <CredencialWireframe doc={doc} />}
              {doc.wireframe === "certificate" && <CertificatePreview doc={doc} />}
              {doc.wireframe === "receta" && <RecetaPreview doc={doc} />}
            </div>
          </DocumentPreviewSection>
        </DocumentPreviewLayout>
      </ScreenOverlay>
      {showRenovacion && (
        <RenovacionFlow doc={doc} onClose={() => { setShowRenovacion(false); onClose(); }} />
      )}
    </>
  );
}

// ── Doc row ───────────────────────────────────────────────────────────────────

function expiryClass(status?: Document["status"]) {
  if (status === "Vencido") return "type-expiry-danger";
  if (status === "Por vencer") return "type-expiry-warning";
  return "type-expiry";
}

function DocRow({
  doc,
  onOpen,
  isLast = false,
}: {
  doc: Document;
  onOpen: () => void;
  isLast?: boolean;
}) {
  return (
    <Button
      onClick={onOpen}
      variant="list-row"
      size="none"
      className={`flex items-center justify-between px-4 py-4 active:bg-muted ${
        !isLast ? "border-b border-border" : ""
      }`}
    >
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
        <Badge
          size="sm"
          weight="bold"
          bg={STATUS_BADGE[doc.status].bg}
          color={STATUS_BADGE[doc.status].color}
        >
          {doc.status}
        </Badge>
        <p className="text-base leading-[19.5px] text-foreground">{doc.name}</p>
        {doc.sub && <p className="text-xs leading-[18px] text-muted-foreground">{doc.sub}</p>}
        <p className="text-xs leading-[18px] text-muted-foreground">{doc.number}</p>
        <p className={`${expiryClass(doc.status)} text-xs leading-[18px]`}>
          Vence: {doc.expiry}
        </p>
      </div>
      <Icon name="chevron_right" size={20} className="ml-2 shrink-0 text-primary" />
    </Button>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function DocumentsPage({
  onBack,
  onNavigate,
  initialDocumentId = null,
  onInitialDocumentConsumed,
}: {
  onBack: () => void;
  onNavigate: (page: Page) => void;
  initialDocumentId?: number | null;
  onInitialDocumentConsumed?: () => void;
}) {
  const [preview, setPreview] = useState<Document | null>(null);
  const [pendingDoc, setPendingDoc] = useState<Document | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (initialDocumentId == null) return;
    const doc = DOCUMENTS.find((d) => d.id === initialDocumentId);
    if (doc) setPendingDoc(doc);
    onInitialDocumentConsumed?.();
  }, [initialDocumentId, onInitialDocumentConsumed]);

  const filtered = DOCUMENTS.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      (d.sub ?? "").toLowerCase().includes(search.toLowerCase()) ||
      d.number.toLowerCase().includes(search.toLowerCase())
  );

  const categoriesWithDocs = DOCUMENT_CATEGORIES.map((cat) => ({
    ...cat,
    docs: filtered.filter((d) => d.category === cat.key),
  })).filter((cat) => cat.docs.length > 0);

  return (
    <>
      <InteriorPageLayout
        onBack={onBack}
        title="Mis documentos"
        subtitle={`${DOCUMENTS.length} documentos disponibles`}
        toolbar={
          <SearchInput
            placeholder="Buscar documentos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-[48px] py-3"
          />
        }
      >
        {search && (
          <div className="shrink-0 px-4 py-2">
            <p className="text-xs tracking-[1px] text-muted-foreground">
              {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        <InteriorPageBody className="gap-5 pt-2">
          {categoriesWithDocs.length === 0 ? (
            <p className="py-10 text-center text-xs text-muted-foreground">
              Sin documentos para la búsqueda realizada.
            </p>
          ) : (
            categoriesWithDocs.map((cat) => (
              <InteriorPageSection
                key={cat.key}
                label={
                  <div className="flex items-center justify-start gap-1">
                    <Icon
                      name={cat.icon}
                      size={24}
                      width={33}
                      className="shrink-0 text-muted-foreground"
                    />
                    <span>{cat.label}</span>
                  </div>
                }
              >
                <Card variant="elevated" overflow="hidden" className="overflow-hidden rounded-[8px]">
                  {cat.docs.map((doc, index) => (
                    <DocRow
                      key={doc.id}
                      doc={doc}
                      isLast={index === cat.docs.length - 1}
                      onOpen={() => setPendingDoc(doc)}
                    />
                  ))}
                </Card>
              </InteriorPageSection>
            ))
          )}
          <p className="mt-2 px-4 text-center text-xs leading-relaxed text-muted-foreground">
            Los documentos digitales tienen la misma validez legal que la versión física.
          </p>
        </InteriorPageBody>
      </InteriorPageLayout>

      {pendingDoc && (
        <BiometricAuth
          onCancel={() => setPendingDoc(null)}
          onSuccess={() => { setPreview(pendingDoc); setPendingDoc(null); }}
        />
      )}
      {preview && <DocumentPreview doc={preview} onClose={() => setPreview(null)} />}
    </>
  );
}

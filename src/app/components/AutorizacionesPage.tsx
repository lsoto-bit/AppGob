import { useState } from "react";
import { ArrowLeft, CheckCircle2, XCircle, Clock, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import { BottomNav, Page } from "./BottomNav";

type AuthStatus = "pendiente" | "aprobada" | "rechazada";

interface AuthRequest {
  id: number;
  fecha: string;
  hora: string;
  titulo: string;
  descripcion: string;
  origen: string;
  status: AuthStatus;
}

const INITIAL_REQUESTS: AuthRequest[] = [
  {
    id: 1,
    fecha: "07 jul 2026",
    hora: "10:42",
    titulo: "Autorización de acceso a datos de salud",
    descripcion: "Clínica Las Condes solicita autorización para visualizar tus datos de cobertura FONASA para validar tu atención médica de urgencia.",
    origen: "Clínica Las Condes — Portal Salud Digital",
    status: "pendiente",
  },
  {
    id: 2,
    fecha: "07 jul 2026",
    hora: "09:15",
    titulo: "Aprobación de trámite en sucursal",
    descripcion: "Se requiere tu aprobación para continuar con el trámite de renovación de cédula iniciado presencialmente en Registro Civil — Providencia.",
    origen: "Registro Civil — Sucursal Providencia",
    status: "pendiente",
  },
  {
    id: 3,
    fecha: "05 jul 2026",
    hora: "14:30",
    titulo: "Visualización de cédula de identidad",
    descripcion: "Autorización para mostrar tu cédula de identidad digital durante trámite en línea.",
    origen: "Registro Civil — Portal en línea",
    status: "aprobada",
  },
  {
    id: 4,
    fecha: "03 jul 2026",
    hora: "11:08",
    titulo: "Firma de poder notarial",
    descripcion: "Solicitud de segundo factor para autorizar firma electrónica de poder notarial.",
    origen: "Notaría González & Asociados",
    status: "aprobada",
  },
  {
    id: 5,
    fecha: "28 jun 2026",
    hora: "16:22",
    titulo: "Aprobación de solicitud de subsidio habitacional",
    descripcion: "MINVU solicitó verificación de identidad para avanzar en proceso de postulación DS49.",
    origen: "MINVU — Atención presencial Las Condes",
    status: "rechazada",
  },
  {
    id: 6,
    fecha: "20 jun 2026",
    hora: "09:55",
    titulo: "Ingreso a portal SII con ClaveÚnica",
    descripcion: "Autenticación de segundo factor para acceder al portal del Servicio de Impuestos Internos.",
    origen: "SII — Portal Tributario",
    status: "aprobada",
  },
];

const STATUS_CONFIG: Record<AuthStatus, { label: string; iconColor: string; bgBadge: string; colorBadge: string; icon: React.ElementType }> = {
  pendiente: { label: "Pendiente", iconColor: "#522504", bgBadge: "#FFFBEB", colorBadge: "#522504", icon: Clock },
  aprobada:  { label: "Aprobada",  iconColor: "#1B5E20", bgBadge: "#E8F5E9", colorBadge: "#1B5E20", icon: CheckCircle2 },
  rechazada: { label: "Rechazada", iconColor: "#B0020A", bgBadge: "#FFD8D8", colorBadge: "#B0020A", icon: XCircle },
};

function AuthCard({
  req,
  onApprove,
  onReject,
}: {
  req: AuthRequest;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}) {
  const [expanded, setExpanded] = useState(req.status === "pendiente");
  const cfg = STATUS_CONFIG[req.status];
  const StatusIcon = cfg.icon;

  return (
    <div className="rounded-2xl bg-white overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)]" style={{ border: "0.873px solid #ccc" }}>
      {/* Top row — always visible */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-start justify-between p-4 text-left active:bg-gray-50 transition-colors"
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Status icon — color matches badge */}
          <StatusIcon
            size={16}
            strokeWidth={1.5}
            style={{ color: cfg.iconColor }}
            className="shrink-0 mt-[2px]"
          />
          <div className="flex-1 min-w-0">
            {/* Badge */}
            <span
              className="inline-block rounded-[4px] px-2 py-[2px] text-[10px] font-bold text-center leading-[150%] mb-0.5"
              style={{ background: cfg.bgBadge, color: cfg.colorBadge }}
            >
              {cfg.label}
            </span>
            {/* Title */}
            <p className="text-[13px] font-medium text-[#333] leading-[17.875px]">{req.titulo}</p>
            {/* Origin */}
            <p className="text-[10px] font-bold text-[#808080] leading-6">{req.origen}</p>
            {/* Date · time */}
            <p className="text-[10px] font-bold text-[#808080] leading-6">{req.fecha} · {req.hora}</p>
          </div>
        </div>
        {expanded
          ? <ChevronUp size={14} strokeWidth={1.5} className="text-[#808080] shrink-0 ml-2 mt-1" />
          : <ChevronDown size={14} strokeWidth={1.5} className="text-[#808080] shrink-0 ml-2 mt-1" />
        }
      </button>

      {/* Expanded content */}
      {expanded && (
        <div style={{ borderTop: "0.873px solid #e6e6e6" }}>
          {/* Description */}
          <div className="px-4 py-3">
            <p className="text-[12px] text-[#666] leading-[19.5px] w-[325px] max-w-full">{req.descripcion}</p>
          </div>

          {/* Action buttons — only for pending */}
          {req.status === "pendiente" && onApprove && onReject && (
            <div className="px-4 pb-4 flex gap-3">
              <button
                onClick={() => onReject(req.id)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-[10px] text-[#b0020a] rounded-full active:bg-red-50 transition-colors text-[13px] font-medium"
                style={{ border: "0.873px solid #b0020a" }}
              >
                <XCircle size={14} strokeWidth={1.5} />
                Rechazar
              </button>
              <button
                onClick={() => onApprove(req.id)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-[10px] bg-[#0046a8] text-white rounded-full active:opacity-80 transition-opacity text-[13px] font-medium"
              >
                <CheckCircle2 size={14} strokeWidth={1.5} />
                Aprobar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function AutorizacionesPage({
  onBack,
  onNavigate,
}: {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}) {
  const [requests, setRequests] = useState<AuthRequest[]>(INITIAL_REQUESTS);

  const pending = requests.filter((r) => r.status === "pendiente");
  const history = requests.filter((r) => r.status !== "pendiente");

  function approve(id: number) {
    setRequests((rs) =>
      rs.map((r) => (r.id === id ? { ...r, status: "aprobada" as AuthStatus } : r))
    );
  }

  function reject(id: number) {
    setRequests((rs) =>
      rs.map((r) => (r.id === id ? { ...r, status: "rechazada" as AuthStatus } : r))
    );
  }

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-[#ffffff] flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 p-1 -ml-1 text-[#0046a8] active:bg-blue-50 rounded-full transition-colors mb-3"
          aria-label="Volver"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="text-[12px] tracking-widest">Inicio</span>
        </button>
        <div className="flex items-center gap-3">
          
          <div>
            <h1 className="text-[#333]">Autorizaciones</h1>
            <p className="text-[11px] text-[#808080] mt-0.5">
              Segundo factor de autenticación ClaveÚnica
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-10 flex flex-col gap-5">

        {/* Pending */}
        {pending.length > 0 && (
          <section>
            <p className="text-[10px] tracking-widest text-muted-foreground mb-2">
              Solicitudes pendientes · {pending.length}
            </p>
            <div className="flex flex-col gap-2">
              {pending.map((req) => (
                <AuthCard
                  key={req.id}
                  req={req}
                  onApprove={approve}
                  onReject={reject}
                />
              ))}
            </div>
          </section>
        )}

        {pending.length === 0 && (
          <div className="rounded-2xl border border-[#ccc] bg-white px-4 py-6 flex flex-col items-center gap-2 text-center">
            <CheckCircle2 size={24} strokeWidth={1.5} className="text-green-600" />
            <p className="text-[13px] text-[#333]">Sin solicitudes pendientes</p>
            <p className="text-[11px] text-[#808080]">
              Te notificaremos cuando se requiera tu autorización.
            </p>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <section>
            <p className="text-[10px] tracking-widest text-muted-foreground mb-2">Historial</p>
            <div className="flex flex-col gap-2">
              {history.map((req) => (
                <AuthCard key={req.id} req={req} />
              ))}
            </div>
          </section>
        )}

        {/* Info box */}
        <div className="rounded-2xl border border-[#ccc] bg-white px-4 py-4 flex items-start gap-3">
          <ShieldCheck size={16} strokeWidth={1.5} className="text-[#0046a8] shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#666] leading-relaxed">
            Las autorizaciones son solicitudes de segundo factor generadas cuando un servicio externo necesita verificar tu identidad o aprobar una acción en tu nombre con ClaveÚnica.
          </p>
        </div>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}

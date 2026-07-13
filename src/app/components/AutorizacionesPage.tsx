import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ShieldCheck, Copy, Check, ChevronRight, X } from "lucide-react";
import { BottomNav, Page } from "./BottomNav";
import Header from "../../imports/Header/index";
import { ExitAppFloatingButton } from "./ExitAppFloatingButton";
import { ReturnToAppSplash } from "./ReturnToAppSplash";

const CLAVEUNICA_URL =
  "https://accounts.claveunica.gob.cl/accounts/login/?next=/openid/authorize/";

interface HistoryItem {
  id: number;
  fecha: string;
  hora: string;
  titulo: string;
  origen: string;
}

const HISTORY: HistoryItem[] = [
  {
    id: 1,
    fecha: "07 jul 2026",
    hora: "10:42",
    titulo: "Autorización de acceso a datos de salud",
    origen: "Clínica Las Condes — Portal Salud Digital",
  },
  {
    id: 2,
    fecha: "07 jul 2026",
    hora: "09:15",
    titulo: "Aprobación de trámite en sucursal",
    origen: "Registro Civil — Sucursal Providencia",
  },
  {
    id: 3,
    fecha: "05 jul 2026",
    hora: "14:30",
    titulo: "Visualización de cédula de identidad",
    origen: "Registro Civil — Portal en línea",
  },
  {
    id: 4,
    fecha: "03 jul 2026",
    hora: "11:08",
    titulo: "Firma de poder notarial",
    origen: "Notaría González & Asociados",
  },
  {
    id: 5,
    fecha: "28 jun 2026",
    hora: "16:22",
    titulo: "Aprobación de solicitud de subsidio habitacional",
    origen: "MINVU — Atención presencial Las Condes",
  },
  {
    id: 6,
    fecha: "20 jun 2026",
    hora: "09:55",
    titulo: "Ingreso a portal SII con ClaveÚnica",
    origen: "SII — Portal Tributario",
  },
];

function HistoryCard({ item }: { item: HistoryItem }) {
  return (
    <div className="rounded-2xl border border-[#ccc] bg-white overflow-hidden">
      <div className="p-4">
        <p className="text-[13px] font-medium text-[#333] leading-[17.875px]">{item.titulo}</p>
        <p className="text-[10px] font-bold text-[#808080] leading-6">{item.origen}</p>
        <p className="text-[10px] font-bold text-[#808080] leading-6">
          {item.fecha} · {item.hora}
        </p>
      </div>
    </div>
  );
}

function AppCiudadanaIcon({ size = 60 }: { size?: number }) {
  return (
    <div
      className="rounded-[13px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
      style={{ width: size, height: size }}
    >
      <div className="flex h-full">
        <div className="flex-1 bg-[#0f5ac4]" />
        <div className="flex-1 bg-[#ff2930]" />
      </div>
    </div>
  );
}

function PushNotificationBanner({ onClick }: { onClick: () => void }) {
  return (
    <div className="absolute top-[88px] left-0 right-0 z-20 px-3 animate-in slide-in-from-top duration-300">
      <button
        onClick={onClick}
        className="w-full backdrop-blur-xl bg-[rgba(37,37,37,0.75)] rounded-2xl p-2.5 text-left active:opacity-90 transition-opacity shadow-lg"
      >
        <div className="flex gap-2.5 items-center">
          <AppCiudadanaIcon size={38} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[15px] font-semibold text-white leading-5 tracking-tight">
                ¿Quieres aprobar una solicitud de verificación de identidad con ClaveÚnica?
              </p>
              <span className="text-[13px] text-white/60 shrink-0">Ahora</span>
            </div>
            <p className="text-[13px] text-white mt-0.5">Presiona aquí para ver tu código</p>
          </div>
        </div>
      </button>
    </div>
  );
}

function MercadoPublicoBrowserOverlay({
  showNotification,
  showDenied,
  onClose,
  onGenerateCode,
  onNotificationClick,
}: {
  showNotification: boolean;
  showDenied: boolean;
  onClose: () => void;
  onGenerateCode: () => void;
  onNotificationClick: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[200] flex justify-center bg-white">
      <div className="w-full max-w-[390px] min-h-screen bg-white flex flex-col relative">
      {/* Browser chrome */}
      <div className="bg-white border-b border-[#ccc] px-3 pt-10 pb-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 px-1">
            <button
              onClick={onClose}
              className="w-4 h-4 rounded-full bg-[#f2f2f2] border border-[#ccc] flex items-center justify-center active:opacity-70 transition-opacity"
              aria-label="Cerrar navegador"
            >
              <X size={6} strokeWidth={2.5} className="text-[#808080]" />
            </button>
            <div className="w-4 h-4 rounded-full border border-[#ccc]" />
            <div className="w-4 h-4 rounded-full border border-[#ccc]" />
          </div>
          <div className="flex-1 bg-[#f2f2f2] border border-[#ccc] rounded px-3 py-1 flex items-center gap-2 min-w-0">
            <div className="w-2.5 h-2.5 border border-[#808080] rounded-full shrink-0" />
            <span className="text-[10px] text-[#808080] truncate">{CLAVEUNICA_URL}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-[#f2f2f2] flex flex-col items-center justify-center p-5 overflow-y-auto">
        <div className="w-full bg-white border border-[#ccc] rounded-2xl px-6 pb-6 flex flex-col gap-2">
          <div className="px-5 pt-0">
            <Header />
          </div>

          <div className="text-center flex flex-col">
            <h2
              className="text-[32px] leading-[48px] text-[#333] font-normal"
              style={{ fontFamily: "'Roboto Slab', sans-serif" }}
            >
              Mercado Público
            </h2>
            <p
              className="text-[20px] leading-[30px] text-[#333] font-normal"
              style={{ fontFamily: "'Roboto Slab', sans-serif" }}
            >
              ClaveÚnica necesita validar tu identidad
            </p>
          </div>

          <div className="flex flex-col gap-3 items-center py-5">
            <button
              onClick={onGenerateCode}
              className="w-full flex items-center justify-between gap-3 px-5 py-2.5 border border-[#0046a8] rounded-full text-left active:bg-blue-50 transition-colors"
            >
              <span className="text-[11px] font-bold text-[#0046a8] leading-[16.5px] flex-1">
                Generar código App ciudadana para generar código
              </span>
              <ChevronRight size={16} strokeWidth={1.5} className="text-[#0046a8] shrink-0" />
            </button>

            <button
              className="w-full flex items-center justify-between gap-3 px-5 py-2.5 border border-[#0046a8] rounded-full text-left active:bg-blue-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-[#0046a8] leading-[16.5px]">
                  Enviar código a mi correo registrado
                </p>
                <p className="text-[11px] font-normal text-[#0046a8] leading-[16.5px]">
                  m.vale●●●●●@correo.cl
                </p>
              </div>
              <ChevronRight size={16} strokeWidth={1.5} className="text-[#0046a8] shrink-0" />
            </button>
          </div>

          <p className="text-center">
            <a
              href="#"
              className="text-[16px] font-bold text-[#333] underline"
              onClick={(e) => e.preventDefault()}
            >
              ¿Necesitas ayuda?
            </a>
          </p>
        </div>
      </div>

      {showNotification && <PushNotificationBanner onClick={onNotificationClick} />}

      {showDenied && (
        <div className="fixed bottom-8 left-4 right-4 max-w-[358px] mx-auto bg-[#FFD8D8] border border-[#b0020a] rounded-2xl px-4 py-3 flex items-center gap-2 animate-in slide-in-from-bottom duration-300 z-30">
          <ShieldCheck size={16} strokeWidth={1.5} className="text-[#b0020a] shrink-0" />
          <p className="text-[13px] text-[#b0020a] font-medium">
            Acceso denegado. La solicitud fue rechazada correctamente.
          </p>
        </div>
      )}
      </div>
    </div>
  );
}

function CodeGeneratorOverlay({
  code,
  showCopied,
  onCopy,
  onReviewHistory,
  onDeny,
}: {
  code: string;
  showCopied: boolean;
  onCopy: () => void;
  onReviewHistory: () => void;
  onDeny: () => void;
}) {
  const digits = code.split("");

  return (
    <div className="fixed inset-0 z-[210] flex justify-center bg-white">
      <div className="w-full max-w-[390px] min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">
        <div className="w-16 h-16 bg-[#f2f2f2] rounded-lg flex items-center justify-center">
          <ShieldCheck size={28} strokeWidth={1.5} className="text-[#0046a8]" />
        </div>

        <div className="text-center">
          <h2 className="text-[15px] font-medium text-[#333] leading-[22.5px]">
            ¿Quieres aprobar una solicitud de verificación de identidad con ClaveÚnica?
          </h2>
          <p className="text-[12px] text-[#666] mt-1 leading-[19.5px]">
            Copia o ingresa este código en el lugar de solicitud para verificar tu identidad.
          </p>
        </div>

        {/* Code box */}
        <div className="w-full relative">
          <div className="border-2 border-[#0046a8] rounded h-14 flex items-center pl-6 pr-2">
            <div className="flex-1 flex justify-between text-[20px] text-[#333]">
              {digits.map((d, i) => (
                <span key={i} className="flex-1 text-center">
                  {d}
                </span>
              ))}
            </div>
            <div className="relative">
              <button
                onClick={onCopy}
                className="p-2 rounded-full active:bg-gray-100 transition-colors"
                aria-label="Copiar código"
              >
                {showCopied ? (
                  <Check size={22} strokeWidth={1.5} className="text-[#0046a8]" />
                ) : (
                  <Copy size={22} strokeWidth={1.5} className="text-[#0046a8]" />
                )}
              </button>
              {showCopied && (
                <div className="absolute -top-9 right-0 bg-[#333] text-white text-[11px] px-2.5 py-1 rounded whitespace-nowrap">
                  Código copiado
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Review history */}
        <div className="w-full flex flex-col gap-2 pb-2">
          <p className="text-[13px] text-[#808080] text-center">
            ¿Quieres ver tu historial de actividad de ClaveÚnica en tu App Ciudadana?
          </p>
          <button
            onClick={onReviewHistory}
            className="w-full py-2.5 border border-[#ccc] rounded-full text-[11px] font-bold tracking-widest text-[#333] active:bg-gray-50 transition-colors"
          >
            Revisar historial
          </button>
        </div>

        {/* Deny access */}
        <div className="w-full border-t border-[#ccc] pt-6 flex flex-col gap-2">
          <p className="text-[13px] text-[#808080] text-center">
            ¿No has solicitado una aprobación de ingreso con ClaveÚnica?
          </p>
          <button
            onClick={onDeny}
            className="w-full py-2 border border-[#b0020a] rounded-full text-[11px] font-medium text-[#b0020a] active:bg-red-50 transition-colors"
          >
            Denegar acceso
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

function generateCode(): string {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 10).toString()).join("");
}

export function AutorizacionesPage({
  onBack,
  onNavigate,
}: {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}) {
  const [showBrowser, setShowBrowser] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showCodeGenerator, setShowCodeGenerator] = useState(false);
  const [code, setCode] = useState("123456");
  const [showCopied, setShowCopied] = useState(false);
  const [showDenied, setShowDenied] = useState(false);
  const [showReturnSplash, setShowReturnSplash] = useState(false);

  useEffect(() => {
    if (!showCopied) return;
    const t = setTimeout(() => setShowCopied(false), 2000);
    return () => clearTimeout(t);
  }, [showCopied]);

  useEffect(() => {
    if (!showDenied) return;
    const t = setTimeout(() => setShowDenied(false), 3000);
    return () => clearTimeout(t);
  }, [showDenied]);

  function resetExitFlow() {
    setShowBrowser(false);
    setShowNotification(false);
    setShowCodeGenerator(false);
    setShowCopied(false);
    setShowDenied(false);
  }

  function handleExitApp() {
    resetExitFlow();
    setShowBrowser(true);
  }

  function handleGenerateCode() {
    setCode(generateCode());
    setShowNotification(true);
  }

  function handleNotificationClick() {
    setShowCodeGenerator(true);
    setShowNotification(false);
  }

  function handleCopy() {
    navigator.clipboard?.writeText(code).catch(() => {});
    setShowCopied(true);
  }

  function handleReviewHistory() {
    setShowReturnSplash(true);
    resetExitFlow();
  }

  function handleReturnSplashFinish() {
    setShowReturnSplash(false);
  }

  function handleDeny() {
    setShowCopied(false);
    setShowCodeGenerator(false);
    setShowBrowser(true);
    setShowNotification(false);
    setShowDenied(true);
  }

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-[#ffffff] flex flex-col relative">
      <ExitAppFloatingButton onClick={handleExitApp} />

      {/* Header */}
      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-4 relative">
        <div className="flex items-start justify-between gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-2 p-1 -ml-1 text-[#0046a8] active:bg-blue-50 rounded-full transition-colors"
            aria-label="Volver"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
            <span className="text-[12px] tracking-widest">Inicio</span>
          </button>
        </div>
        <div className="mt-3">
          <h1 className="text-[#333] text-[24px]" style={{ fontFamily: "'Roboto Slab', sans-serif" }}>
            Mi Actividad ClaveÚnica
          </h1>
          <p className="text-[11px] text-[#808080] mt-0.5">
            Segundo factor de autenticación ClaveÚnica
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-10 flex flex-col gap-5">
        <section>
          <p className="text-[10px] tracking-widest text-[#808080] mb-2">Historial</p>
          <div className="flex flex-col gap-2">
            {HISTORY.map((item) => (
              <HistoryCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <div className="rounded-2xl border border-[#ccc] bg-white px-4 py-4 flex items-start gap-3">
          <ShieldCheck size={16} strokeWidth={1.5} className="text-[#0046a8] shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#666] leading-relaxed">
            Las autorizaciones son solicitudes de segundo factor generadas cuando un servicio externo necesita verificar tu identidad o aprobar una acción en tu nombre con ClaveÚnica.
          </p>
        </div>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />

      {showReturnSplash &&
        createPortal(
          <ReturnToAppSplash onFinish={handleReturnSplashFinish} />,
          document.body,
        )}

      {showBrowser && !showCodeGenerator &&
        createPortal(
          <MercadoPublicoBrowserOverlay
            showNotification={showNotification}
            showDenied={showDenied}
            onClose={resetExitFlow}
            onGenerateCode={handleGenerateCode}
            onNotificationClick={handleNotificationClick}
          />,
          document.body,
        )}

      {showCodeGenerator &&
        createPortal(
          <CodeGeneratorOverlay
            code={code}
            showCopied={showCopied}
            onCopy={handleCopy}
            onReviewHistory={handleReviewHistory}
            onDeny={handleDeny}
          />,
          document.body,
        )}
    </div>
  );
}

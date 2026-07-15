import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ShieldCheck, Copy, Check, ChevronRight, X, Eye, EyeOff, KeyRound, Share2 } from "lucide-react";
import { BottomNav, Page } from "./BottomNav";
import Header from "../../imports/Header/index";
import { ExitAppFloatingButton } from "./ExitAppFloatingButton";
import { ReturnToAppSplash } from "./ReturnToAppSplash";
import { GobFranja } from "./GobFranja";

const CONOCE_TU_DEUDA_URL =
  "https://conocetudeuda.cmfchile.cl/informe-deudas/629/w4-contents.html";
const CLAVEUNICA_URL =
  "https://accounts.claveunica.gob.cl/accounts/login/?next=/openid/authorize/";

type BrowserStep = "landing" | "login" | "identity";

interface HistoryItem {
  id: number;
  fecha: string;
  hora: string;
  origen: string;
}

const HISTORY: HistoryItem[] = [
  {
    id: 1,
    fecha: "14 jul 2026",
    hora: "15:44",
    origen: "Secretaría de Gobierno Digital",
  },
  {
    id: 2,
    fecha: "14 jul 2026",
    hora: "15:08",
    origen: "Comisión para el Mercado Financiero",
  },
  {
    id: 3,
    fecha: "14 jul 2026",
    hora: "14:53",
    origen: "Superintendencia de Pensiones",
  },
  {
    id: 4,
    fecha: "14 jul 2026",
    hora: "12:36",
    origen: "Secretaría de Gobierno Digital",
  },
  {
    id: 5,
    fecha: "14 jul 2026",
    hora: "12:35",
    origen: "Secretaría de Gobierno Digital",
  },
  {
    id: 6,
    fecha: "14 jul 2026",
    hora: "12:35",
    origen: "Secretaría de Gobierno Digital",
  },
  {
    id: 7,
    fecha: "14 jul 2026",
    hora: "12:35",
    origen: "Secretaría de Gobierno Digital",
  },
  {
    id: 8,
    fecha: "07 jul 2026",
    hora: "19:04",
    origen: "Dirección de Compras y Contratación Pública",
  },
  {
    id: 9,
    fecha: "07 jul 2026",
    hora: "19:03",
    origen: "Dirección de Compras y Contratación Pública",
  },
  {
    id: 10,
    fecha: "07 jul 2026",
    hora: "18:59",
    origen: "Dirección de Compras y Contratación Pública",
  },
];

function HistoryCard({ item }: { item: HistoryItem }) {
  return (
    <div className="rounded-2xl border border-[#ccc] bg-white overflow-hidden">
      <div className="p-4">
        <p className="text-[13px] font-medium text-[#333] leading-[17.875px]">{item.origen}</p>
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

function BrowserChrome({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  return (
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
          <span className="text-[10px] text-[#808080] truncate">{url}</span>
        </div>
      </div>
    </div>
  );
}

function ConoceTuDeudaLandingContent({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#e9f8f8]">
      <div className="bg-white">
        <div className="flex items-center justify-between px-4 py-1">
          <div className="flex items-center gap-1">
            <div className="bg-[#5b2d8e] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">MF</div>
            <span className="text-[8px] text-[#5b2d8e] font-semibold leading-tight max-w-[140px]">
              COMISIÓN PARA EL MERCADO FINANCIERO
            </span>
          </div>
          <span className="text-[11px] text-[#16418c]">Ir al portal CMF</span>
        </div>
        <div className="bg-[#1e9597] flex items-center justify-between px-4 py-3">
          <h1 className="text-white text-[20px] font-semibold">Conoce tu deuda</h1>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border border-white/30 flex items-center justify-center">
              <Share2 size={14} className="text-white" />
            </div>
            <div className="w-8 h-8 border border-white/30 flex items-center justify-center">
              <ShieldCheck size={14} className="text-white" />
            </div>
            <div className="w-[52px] h-[52px] bg-[#16418c] flex flex-col items-center justify-center gap-1">
              <div className="w-5 h-0.5 bg-white" />
              <div className="w-5 h-0.5 bg-white" />
              <div className="w-5 h-0.5 bg-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm px-4 pt-8 pb-6">
        <h2
          className="text-[24px] leading-[33px] text-[#193157] font-bold text-center"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          Te damos la bienvenida a Conoce tu Deuda
        </h2>
      </div>

      <div className="px-4 py-8">
        <div className="bg-white border border-black/10 rounded-lg shadow-md p-5">
          <p className="text-[16px] text-[#112b32] text-center">Si eres ciudadana/o</p>
          <p className="text-[18px] font-semibold text-[#112b32] text-center mt-1">
            Debes iniciar sesión con tu Clave Única
          </p>
          <div className="flex justify-center mt-4">
            <button
              onClick={onLogin}
              className="flex items-center gap-2 bg-[#0f69c4] text-white px-4 py-2.5 active:opacity-90 transition-opacity"
            >
              <KeyRound size={20} strokeWidth={1.5} />
              <span className="text-[16px] font-bold">Iniciar sesión</span>
            </button>
          </div>
          <p className="text-[14px] text-[#16418c] text-center mt-4">
            Más información sobre <span className="font-bold">ClaveÚnica</span>
          </p>
        </div>

        <div className="mt-6 bg-[#d1ecf1] border border-[#bee5eb] rounded-lg p-5">
          <p className="text-[16px] font-bold text-[#112b32]">Importante</p>
          <p className="text-[14px] text-[#112b32] mt-3 leading-relaxed">
            Desde el 15 de diciembre de 2025, el ingreso al portal Conoce tu Deuda con ClaveÚnica
            requiere un segundo factor de autenticación mediante un código, el cual será enviado al
            correo electrónico registrado en el portal de ClaveÚnica.
          </p>
        </div>
      </div>

      <div className="bg-[#16418c] px-4 py-4 mt-4">
        <p className="text-[12px] text-white">Descargo de Responsabilidades</p>
        <p className="text-[12px] text-white mt-2">Política de Privacidad</p>
        <p className="text-[12px] text-white mt-2">Contacto</p>
      </div>
    </div>
  );
}

function ConoceTuDeudaLoginContent({ onIngresa }: { onIngresa: () => void }) {
  const [run, setRun] = useState("");
  const [clave, setClave] = useState("");
  const [showClave, setShowClave] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (run.trim() && clave.trim()) onIngresa();
  }

  return (
    <div className="flex-1 bg-[#f2f2f2] flex flex-col items-center justify-center p-5 overflow-y-auto">
      <div className="w-full bg-white border border-[#ccc] rounded-2xl px-6 pb-6 flex flex-col gap-2">
        <div className="px-5 pt-0">
          <Header />
        </div>

        <h2
          className="text-[32px] leading-[48px] text-[#333] text-center font-normal"
          style={{ fontFamily: "'Roboto Slab', sans-serif" }}
        >
          Conoce tu Deuda
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="run-conoce-deuda" className="text-[16px] font-bold text-[#333] leading-6">
              Ingresa tu RUN
            </label>
            <input
              id="run-conoce-deuda"
              type="text"
              value={run}
              onChange={(e) => setRun(e.target.value)}
              className="w-full border border-[#333] rounded px-3 py-2 text-[16px] text-[#333] outline-none focus:ring-2 focus:ring-primary/20 bg-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="clave-conoce-deuda" className="text-[16px] font-bold text-[#333] leading-6">
              Ingresa tu ClaveÚnica
            </label>
            <div className="relative">
              <input
                id="clave-conoce-deuda"
                type={showClave ? "text" : "password"}
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                className="w-full border border-[#333] rounded px-3 py-2 pr-10 text-[16px] text-[#333] outline-none focus:ring-2 focus:ring-primary/20 bg-white"
              />
              <button
                type="button"
                onClick={() => setShowClave(!showClave)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#333] active:opacity-70 transition-opacity"
                aria-label={showClave ? "Ocultar clave" : "Mostrar clave"}
              >
                {showClave ? <EyeOff size={24} strokeWidth={1.5} /> : <Eye size={24} strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <a
              href="#"
              className="text-[16px] font-bold text-[#1d70b8] underline text-center"
              onClick={(e) => e.preventDefault()}
            >
              Recupera tu ClaveÚnica
            </a>
            <a
              href="#"
              className="text-[16px] font-bold text-[#1d70b8] underline text-center"
              onClick={(e) => e.preventDefault()}
            >
              Solicita tu ClaveÚnica
            </a>
          </div>

          <button
            type="submit"
            className="w-full h-[49px] bg-[#0046a8] text-white rounded-full text-[14px] font-semibold tracking-[1.4px] active:opacity-80 transition-opacity"
          >
            INGRESA
          </button>

          <p className="text-center">
            <a
              href="#"
              className="text-[16px] font-bold text-[#333] underline"
              onClick={(e) => e.preventDefault()}
            >
              ¿Necesitas ayuda?
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

function IdentityValidationContent({
  onGenerateCode,
}: {
  onGenerateCode: () => void;
}) {
  return (
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
            Conoce tu Deuda
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
              Generar código en tu app MiGob
            </span>
            <ChevronRight size={16} strokeWidth={1.5} className="text-[#0046a8] shrink-0" />
          </button>

          <button className="w-full flex items-center justify-between gap-3 px-5 py-2.5 border border-[#0046a8] rounded-full text-left active:bg-blue-50 transition-colors">
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
  );
}

function DeniedToast() {
  return (
    <div className="fixed bottom-8 left-4 right-4 max-w-[358px] mx-auto bg-[#FFD8D8] border border-[#b0020a] rounded-2xl px-4 py-3 flex items-center gap-2 animate-in slide-in-from-bottom duration-300 z-[250]">
      <ShieldCheck size={16} strokeWidth={1.5} className="text-[#b0020a] shrink-0" />
      <p className="text-[13px] text-[#b0020a] font-medium">
        Acceso denegado. La solicitud fue rechazada correctamente.
      </p>
    </div>
  );
}

function CodeGeneratorModal({
  code,
  showCopied,
  hasCopied,
  onCopy,
  onViewActivity,
  onDeny,
}: {
  code: string;
  showCopied: boolean;
  hasCopied: boolean;
  onCopy: () => void;
  onViewActivity: () => void;
  onDeny: () => void;
}) {
  const digits = code.split("");

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-[rgba(0,0,0,0.6)] px-6">
      <div className="w-full max-w-[342px] bg-white rounded-2xl shadow-[0px_20px_12.5px_rgba(0,0,0,0.1),0px_8px_5px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-4">
        <div className="w-16 h-16 bg-[#f2f2f2] rounded-[8px] flex items-center justify-center mx-auto">
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
                {showCopied || hasCopied ? (
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

        <div className="w-full flex flex-col gap-2">
          <p className="text-[12px] text-[#666] text-center leading-[19.5px]">
            Cuando hayas ingresado el código en el sitio de solicitud, puedes volver a tu actividad de
            ClaveÚnica.
          </p>
          <button
            onClick={onViewActivity}
            className="w-full py-2.5 border border-[#0046a8] text-[#0046a8] rounded-full text-[12px] font-medium active:bg-blue-50 transition-colors"
          >
            Ver mi actividad
          </button>
        </div>

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
  );
}

function BrowserFlowOverlay({
  step,
  showNotification,
  onClose,
  onLogin,
  onIngresa,
  onGenerateCode,
  onNotificationClick,
}: {
  step: BrowserStep;
  showNotification: boolean;
  onClose: () => void;
  onLogin: () => void;
  onIngresa: () => void;
  onGenerateCode: () => void;
  onNotificationClick: () => void;
}) {
  const url = step === "landing" ? CONOCE_TU_DEUDA_URL : CLAVEUNICA_URL;

  return (
    <div className="fixed inset-0 z-[200] flex justify-center bg-white">
      <div className="w-full max-w-[390px] min-h-screen bg-white flex flex-col relative">
        <BrowserChrome url={url} onClose={onClose} />

        {step === "landing" && <ConoceTuDeudaLandingContent onLogin={onLogin} />}
        {step === "login" && <ConoceTuDeudaLoginContent onIngresa={onIngresa} />}
        {step === "identity" && <IdentityValidationContent onGenerateCode={onGenerateCode} />}

        {showNotification && <PushNotificationBanner onClick={onNotificationClick} />}
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
  const [browserStep, setBrowserStep] = useState<BrowserStep>("landing");
  const [showNotification, setShowNotification] = useState(false);
  const [code, setCode] = useState("123456");
  const [showCopied, setShowCopied] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [showDenied, setShowDenied] = useState(false);
  const [showReturnSplash, setShowReturnSplash] = useState(false);
  const [showInAppVerificationModal, setShowInAppVerificationModal] = useState(false);

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
    setBrowserStep("landing");
    setShowNotification(false);
    setShowCopied(false);
    setHasCopied(false);
  }

  function handleExitApp() {
    setBrowserStep("landing");
    setShowNotification(false);
    setShowCopied(false);
    setHasCopied(false);
    setShowBrowser(true);
  }

  function handleLogin() {
    setBrowserStep("login");
  }

  function handleIngresa() {
    setBrowserStep("identity");
  }

  function handleGenerateCode() {
    setCode(generateCode());
    setShowNotification(true);
  }

  function handleNotificationClick() {
    setShowReturnSplash(true);
    resetExitFlow();
  }

  function handleCopy() {
    navigator.clipboard?.writeText(code).catch(() => {});
    setShowCopied(true);
    setHasCopied(true);
  }

  function handleReturnSplashFinish() {
    setShowReturnSplash(false);
    setHasCopied(false);
    setShowCopied(false);
    setShowInAppVerificationModal(true);
  }

  function handleViewActivity() {
    setShowCopied(false);
    setHasCopied(false);
    setShowInAppVerificationModal(false);
  }

  function handleInAppDeny() {
    setShowCopied(false);
    setHasCopied(false);
    setShowInAppVerificationModal(false);
    setShowDenied(true);
  }

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-[#ffffff] flex flex-col relative">
      <ExitAppFloatingButton onClick={handleExitApp} />

      {/* Header */}
      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-4 relative">
        <GobFranja />
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
            Te informamos de los últimos movimientos que has realizado con tu ClaveÚnica.
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
            Importante: el registro de actividades solo da cuenta del uso de ClaveÚnica para autenticarse al acceder a plataformas web de las respectivas instituciones. Este registro NO da cuenta de la realización de trámites.
          </p>
        </div>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />

      {showReturnSplash &&
        createPortal(
          <ReturnToAppSplash onFinish={handleReturnSplashFinish} />,
          document.body,
        )}

      {showInAppVerificationModal &&
        createPortal(
          <CodeGeneratorModal
            code={code}
            showCopied={showCopied}
            hasCopied={hasCopied}
            onCopy={handleCopy}
            onViewActivity={handleViewActivity}
            onDeny={handleInAppDeny}
          />,
          document.body,
        )}

      {showDenied && createPortal(<DeniedToast />, document.body)}

      {showBrowser &&
        createPortal(
          <BrowserFlowOverlay
            step={browserStep}
            showNotification={showNotification}
            onClose={resetExitFlow}
            onLogin={handleLogin}
            onIngresa={handleIngresa}
            onGenerateCode={handleGenerateCode}
            onNotificationClick={handleNotificationClick}
          />,
          document.body,
        )}
    </div>
  );
}

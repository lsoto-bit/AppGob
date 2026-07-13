import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import Header from "../../imports/Header/index";

export function ClaveUnicaLoginPage({ onSuccess, onBack }: { onSuccess: () => void; onBack: () => void }) {
  const [run, setRun] = useState("");
  const [clave, setClave] = useState("");
  const [showClave, setShowClave] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (run.trim() && clave.trim()) onSuccess();
  }

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-background flex flex-col">
      {/* Simulated browser chrome */}
      <div className="bg-card border-b border-border px-3 pt-10 pb-2 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 px-1">
            <button
              onClick={onBack}
              className="w-2.5 h-2.5 rounded-full bg-muted border border-border flex items-center justify-center active:opacity-70 transition-opacity"
              aria-label="Cerrar navegador"
            >
              <X size={6} strokeWidth={2.5} className="text-muted-foreground" />
            </button>
            <div className="w-2.5 h-2.5 rounded-full border border-border" />
            <div className="w-2.5 h-2.5 rounded-full border border-border" />
          </div>
          <div className="flex-1 bg-muted border border-border rounded px-3 py-1 flex items-center gap-2">
            <div className="w-2.5 h-2.5 border border-muted-foreground rounded-full shrink-0" />
            <span className="text-[10px] text-muted-foreground truncate">
              claveunica.minsegpres.gob.cl
            </span>
          </div>
        </div>
      </div>

      {/* ClaveÚnica page content */}
      <div className="flex-1 bg-white flex flex-col">
        {/* ClaveÚnica header — Figma import */}
        <div className="border-b border-gray-200 px-5" style={{ height: 80 }}>
          <Header />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col px-6 pt-8 pb-6 gap-5">
          <h2 className="text-[22px] font-bold text-gray-800 leading-tight text-center">
            App ciudadana
          </h2>

          {/* RUN input */}
          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Ingresa tu RUN"
              value={run}
              onChange={(e) => setRun(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 text-[14px] text-gray-800 placeholder-gray-400 outline-none focus:border-gray-500 bg-white"
            />
          </div>

          {/* ClaveÚnica input */}
          <div className="flex flex-col gap-1">
            <div className="flex border border-gray-300">
              <input
                type={showClave ? "text" : "password"}
                placeholder="Ingresa tu ClaveÚnica"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                className="flex-1 px-4 py-3 text-[14px] text-gray-800 placeholder-gray-400 outline-none bg-white"
              />
              <button
                type="button"
                onClick={() => setShowClave(!showClave)}
                className="bg-[#5b9bd5] px-3 flex items-center justify-center"
              >
                {showClave
                  ? <EyeOff size={16} strokeWidth={1.5} className="text-white" />
                  : <Eye size={16} strokeWidth={1.5} className="text-white" />
                }
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-1.5">
            <a href="#" className="text-[13px] text-[#1a6db1] underline" onClick={(e) => e.preventDefault()}>
              Recupera tu ClaveÚnica
            </a>
            <a href="#" className="text-[13px] text-[#1a6db1] underline" onClick={(e) => e.preventDefault()}>
              Solicita tu ClaveÚnica
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#5b9bd5] text-white py-3.5 text-[14px] font-semibold tracking-widest active:opacity-80 transition-opacity"
          >
            INGRESA
          </button>

          {/* Help */}
          <p className="text-center">
            <a href="#" className="text-[13px] text-gray-600 underline" onClick={(e) => e.preventDefault()}>
              ¿Necesitas ayuda?
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef, useCallback } from "react";
import { FileText, Bell, Building2, ShieldCheck, User, ChevronRight, ChevronLeft } from "lucide-react";

const AUTO_ADVANCE_MS = 5000;

export const WELCOME_FEATURES = [
  {
    icon: FileText,
    title: "Documentos digitales",
    desc: "Accede a tu cédula de identidad, credencial de discapacidad y otros documentos oficiales desde tu celular.",
  },
  {
    icon: Building2,
    title: "Lugares de atención",
    desc: "Encuentra las oficinas públicas más cercanas con horarios actualizados.",
  },
  {
    icon: Bell,
    title: "Notificaciones oficiales",
    desc: "Recibe avisos de vencimientos, pagos de beneficios y citaciones del Estado.",
  },
  {
    icon: ShieldCheck,
    title: "Tu información del Estado",
    desc: "Consulta tu Registro Social de Hogares, AFP, FONASA y beneficios sociales.",
  },
  {
    icon: User,
    title: "Tu perfil ciudadano",
    desc: "Gestiona tus datos, autenticación y preferencias de notificación.",
  },
];

function FranjaChile() {
  return (
    <div className="w-[110px] h-2 flex shrink-0">
      <div className="w-[41px] bg-[#0f5ac4]" />
      <div className="flex-1 bg-[#ff2930]" />
    </div>
  );
}

export function WelcomePage({
  onLogin,
  onBiometric,
  onLugares,
}: {
  onLogin: () => void;
  onBiometric?: () => void;
  onLugares?: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isLast = current === WELCOME_FEATURES.length - 1;
  const { icon: Icon, title, desc } = WELCOME_FEATURES[current];

  const scheduleAutoAdvance = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % WELCOME_FEATURES.length);
    }, AUTO_ADVANCE_MS);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrent(index);
      scheduleAutoAdvance();
    },
    [scheduleAutoAdvance],
  );

  const goNext = useCallback(() => {
    setCurrent((c) => Math.min(c + 1, WELCOME_FEATURES.length - 1));
    scheduleAutoAdvance();
  }, [scheduleAutoAdvance]);

  const goPrev = useCallback(() => {
    setCurrent((c) => Math.max(0, c - 1));
    scheduleAutoAdvance();
  }, [scheduleAutoAdvance]);

  useEffect(() => {
    scheduleAutoAdvance();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [scheduleAutoAdvance]);

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-white flex flex-col">
      {/* Flag stripe */}
      <div className="flex justify-center">
        <FranjaChile />
      </div>

      {/* Header */}
      <header className="px-6 pt-10 pb-5 flex flex-col items-center gap-4">
        <div className="w-24 h-24 border-[1.313px] border-dashed border-black/40 flex items-center justify-center">
          <span className="text-[9px] text-black/60 tracking-[0.9px] text-center leading-relaxed px-2">
            Logotipo
          </span>
        </div>
        <div className="text-center w-[336px]">
          <h1
            className="text-[#333] font-medium text-[24px] leading-9"
            style={{ fontFamily: "'Roboto Slab', sans-serif" }}
          >
            Te damos la bienvenida a la App ciudadana
          </h1>
          <p className="text-[12px] text-[#666] leading-[18px] pt-1">
            El Estado de Chile en tu bolsillo
          </p>
        </div>
      </header>

      {/* Carousel card */}
      <div className="px-6">
        <div className="rounded-2xl border border-[#ccc] flex flex-col">
          <div className="px-8 py-6 text-center min-h-[180px] flex flex-col justify-center items-center gap-4">
            <div className="bg-[#f2f2f2] rounded-[8px] p-2 flex items-center justify-center">
              <Icon size={36} strokeWidth={1.5} className="text-[#0f5ac4]" />
            </div>
            <div className="flex flex-col gap-1.5 w-[320px]">
              <h2
                className="text-[#333] font-normal text-[20px] leading-[30px]"
                style={{ fontFamily: "'Roboto Slab', sans-serif" }}
              >
                {title}
              </h2>
              <p className="text-[12px] text-[#808080] leading-[19.5px]">{desc}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 px-5 py-4 border-t border-[#ccc]">
            <button
              onClick={goPrev}
              disabled={current === 0}
              className="flex items-center gap-1.5 border border-[#0046a8] rounded-full px-4 py-2 text-[11px] tracking-[1.1px] text-[#0046a8] font-bold disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={13} strokeWidth={1.5} />
              Anterior
            </button>

            <div className="flex gap-1.5">
              {WELCOME_FEATURES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-[#0046a8]" : "bg-[#ccc]"}`}
                  aria-label={`Ir a slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              disabled={isLast}
              className="flex items-center gap-1.5 border border-[#0046a8] rounded-full px-4 py-2 text-[11px] tracking-[1.1px] text-[#0046a8] font-bold disabled:opacity-30 transition-colors"
            >
              Siguiente
              <ChevronRight size={13} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* CTAs + footer link */}
      <div className="mt-auto flex flex-col">
        <div className="px-5 pt-5 pb-0 flex flex-col gap-3">
          <button
            onClick={onLogin}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#0046a8] text-white rounded-full active:opacity-80 transition-opacity"
          >
            <span className="text-[13px] font-medium">Iniciar sesión con ClaveÚnica</span>
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
          <button
            onClick={onBiometric}
            className="w-full border border-[#0046a8] rounded-full px-5 py-2.5 text-[11px] font-bold text-[#0046a8] tracking-[1.1px] active:opacity-80 transition-opacity"
          >
            Inicia sesión con datos biométricos
          </button>
        </div>

        <div className="px-5 pt-12 pb-6">
          <button
            onClick={onLugares}
            className="w-full rounded-2xl border border-[#ccc] bg-white flex items-center gap-4 px-4 py-3.5 active:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 bg-[#f2f2f2] rounded-[8px] flex items-center justify-center shrink-0">
              <Building2 size={16} strokeWidth={1.5} className="text-[#0f5ac4]" />
            </div>
            <span className="text-[13px] font-bold text-[#333]">Lugares de atención</span>
            <ChevronRight size={14} strokeWidth={1.5} className="text-[#0f5ac4] ml-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { FileText, Bell, Building2, ClipboardList, ShieldCheck, User, ChevronRight, ChevronLeft } from "lucide-react";

export const WELCOME_FEATURES = [
  {
    icon: FileText,
    title: "Documentos digitales",
    desc: "Accede a tu cédula de identidad y credencial de discapacidad desde tu celular.",
  },
  {
    icon: ClipboardList,
    title: "Trámites y servicios",
    desc: "Realiza trámites del Estado en línea o encuentra dónde hacerlos en persona.",
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

export function WelcomePage({ onLogin }: { onLogin: () => void }) {
  const [current, setCurrent] = useState(0);
  const isLast = current === WELCOME_FEATURES.length - 1;
  const { icon: Icon, title, desc } = WELCOME_FEATURES[current];

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-white flex flex-col">

      {/* Flag stripe at very top */}
      <div className="flex justify-center pt-0">
        <FranjaChile />
      </div>

      {/* Header — white, centered */}
      <header className="px-6 pt-10 pb-10 flex flex-col items-center gap-4">
        <div className="w-24 h-24 border-[1.634px] border-dashed border-black/40 flex items-center justify-center">
          <span className="text-[9px] text-black/60 tracking-widest text-center leading-relaxed px-2">
            Logotipo
          </span>
        </div>
        <div className="text-center w-[336px]">
          <h1 className="mb-1 text-[#333] font-['Roboto_Slab',sans-serif] font-medium text-[24px]">
            Te damos la bienvenida a la App ciudadana
          </h1>
          <p className="text-[12px] text-[#666] mt-1">El Estado de Chile en tu bolsillo</p>
        </div>
      </header>

      {/* Carousel card */}
      <div className="px-6">
        <div className="rounded-2xl border border-[#ccc] flex flex-col">
          {/* Slide content */}
          <div className="px-8 py-6 text-center min-h-[180px] flex flex-col justify-center items-center gap-4">
            <div className="bg-[#f2f2f2] rounded-[8px] p-2 flex items-center justify-center">
              <Icon size={36} strokeWidth={1.5} className="text-[#0f5ac4]" />
            </div>
            <div className="flex flex-col gap-1.5 w-[320px]">
              <h2 className="text-[#333] font-['Roboto_Slab',sans-serif] font-normal text-[20px]">{title}</h2>
              <p className="text-[12px] text-[#808080] leading-relaxed">{desc}</p>
            </div>
          </div>

          {/* Navigation row */}
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-[#ccc]">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="flex items-center gap-1.5 border border-[#0046a8] rounded-full px-4 py-2 text-[11px] tracking-widest text-[#0046a8] disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={13} strokeWidth={1.5} />
              Anterior
            </button>

            <div className="flex gap-1.5">
              {WELCOME_FEATURES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-[#0046a8]" : "bg-[#ccc]"}`}
                />
              ))}
            </div>

            <button
              onClick={() => !isLast && setCurrent((c) => c + 1)}
              disabled={isLast}
              className="flex items-center gap-1.5 border border-[#0046a8] rounded-full px-4 py-2 text-[11px] tracking-widest text-[#0046a8] font-bold disabled:opacity-30 transition-colors"
            >
              Siguiente
              <ChevronRight size={13} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 py-6 flex flex-col gap-3 bg-white mt-auto">
        <button
          onClick={onLogin}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#0046a8] text-white rounded-full active:opacity-80 transition-opacity"
        >
          <span className="text-[13px] font-medium">Iniciar sesión con ClaveÚnica</span>
          <ChevronRight size={16} strokeWidth={1.5} />
        </button>
        <p className="text-[10px] text-[#808080] text-center leading-relaxed w-[344px] mx-auto">
          Accede de forma segura con tu RUN y ClaveÚnica otorgada por el Registro Civil.
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import {
  ArrowLeft,
  Fingerprint,
  KeyRound,
  RotateCcw,
  ALargeSmall,
  Circle,
  CheckCircle2,
} from "lucide-react";
import { useFontSize, type FontSize } from "../context/FontSizeContext";
import { GobFranja } from "./GobFranja";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 border shrink-0 rounded-full transition-colors ${
        checked ? "bg-[#0046a8] border-[#0046a8]" : "bg-[#ccc] border-[#ccc]"
      }`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 bg-white border border-[#f2f2f2] rounded-full transition-all ${
          checked ? "left-[calc(100%-1.125rem)]" : "left-0.5"
        }`}
      />
    </button>
  );
}

function SecurityRow({
  icon: Icon,
  label,
  description,
  enabled,
  onToggle,
  configDate,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  enabled: boolean;
  onToggle: (v: boolean) => void;
  configDate?: string;
}) {
  return (
    <div className="px-4 py-4 flex flex-col gap-3 border-b border-[#ccc] last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <Icon size={15} strokeWidth={1.5} className="text-[#0f5ac4] shrink-0 mt-0.5" />
          <div>
            <p className="text-[13px] text-[#333]">{label}</p>
            <p className="text-[10px] text-[#808080] mt-0.5 leading-relaxed">{description}</p>
          </div>
        </div>
        <Toggle checked={enabled} onChange={onToggle} />
      </div>
      {enabled && configDate && (
        <div className="flex items-center justify-between pl-6">
          <div className="flex items-center gap-2">
            <span className="text-[9px] tracking-[0.9px] border border-[#0046a8] text-[#0046a8] px-1.5 py-0.5">
              Activo
            </span>
            <span className="text-[10px] text-[#808080]">Configurado el {configDate}</span>
          </div>
          <button className="flex items-center gap-1 text-[10px] tracking-[1px] font-bold text-[#808080] active:text-[#333] transition-colors">
            <RotateCcw size={10} strokeWidth={1.5} />
            Reconfigurar
          </button>
        </div>
      )}
    </div>
  );
}

const FONT_OPTIONS: { key: FontSize; label: string }[] = [
  { key: "small", label: "Pequeño" },
  { key: "medium", label: "Mediano" },
  { key: "large", label: "Grande" },
];

export function AppSettingsPage({ onBack }: { onBack: () => void }) {
  const { fontSize, setFontSize } = useFontSize();
  const [biometric, setBiometric] = useState(true);
  const [secondFactor, setSecondFactor] = useState(true);
  const [draftFontSize, setDraftFontSize] = useState<FontSize>(fontSize);

  function handleSave() {
    setFontSize(draftFontSize);
    onBack();
  }

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3 relative">
        <GobFranja />
        <button
          onClick={onBack}
          className="flex items-center gap-2 p-1 -ml-1 text-[#0046a8] active:bg-blue-50 rounded-full transition-colors mb-4"
          aria-label="Volver"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="text-[12px] tracking-[1.2px] font-bold">Inicio</span>
        </button>
        <h1
          className="text-[#333] text-[24px] leading-9"
          style={{ fontFamily: "'Roboto Slab', sans-serif" }}
        >
          Configuración de la App
        </h1>
        <p className="text-[11px] text-[#808080] mt-1">
          Configure seguridad del dispositivo, y ajustes
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-6 flex flex-col gap-3">
        <p className="text-[10px] tracking-[1px] text-[#808080] pt-3">Seguridad del dispositivo</p>
        <div className="rounded-2xl border border-[#ccc] bg-white overflow-hidden">
          <SecurityRow
            icon={Fingerprint}
            label="Acceso con datos biométricos"
            description="Habilitación del uso de los datos biométricos del equipo para acceder de forma segura a tu dispositivo de confianza. Para el inicio de sesión y para acceder a documentos sensibles."
            enabled={biometric}
            onToggle={setBiometric}
            configDate="14/02/2024"
          />
          <SecurityRow
            icon={KeyRound}
            label="Segundo factor de autenticación"
            description="Código de verificación con correo · m.valenzuela@correo.cl"
            enabled={secondFactor}
            onToggle={setSecondFactor}
            configDate="03/01/2024"
          />
        </div>

        <p className="text-[10px] tracking-[1px] text-[#808080] pt-1">Ajustes</p>
        <div className="rounded-2xl border border-[#ccc] bg-white">
          <div className="flex items-center gap-3 px-4 pt-3.5 pb-2">
            <ALargeSmall size={15} strokeWidth={1.5} className="text-[#0f5ac4] shrink-0" />
            <p className="text-[13px] font-bold text-[#333]">Tamaño de fuente</p>
          </div>
          <div className="px-4 pb-3.5 pl-[27px] flex flex-col">
            {FONT_OPTIONS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setDraftFontSize(key)}
                className="flex items-center gap-2 py-2.5 text-left active:opacity-70 transition-opacity"
              >
                {draftFontSize === key ? (
                  <CheckCircle2 size={16} strokeWidth={1.5} className="text-[#0046a8] shrink-0" />
                ) : (
                  <Circle size={16} strokeWidth={1.5} className="text-[#ccc] shrink-0" />
                )}
                <span className="text-[13px] font-bold text-[#333]">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pb-10 pt-2 shrink-0">
        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center bg-[#0046a8] text-white rounded-full px-4 py-3 text-[16px] font-bold active:opacity-80 transition-opacity"
        >
          Guardar configuración
        </button>
      </div>
    </div>
  );
}

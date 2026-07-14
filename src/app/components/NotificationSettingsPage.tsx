import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { GobFranja } from "./GobFranja";
import { NOTIF_CATEGORIES } from "../notificationCategories";

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

export function NotificationSettingsPage({ onBack }: { onBack: () => void }) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [typeEnabled, setTypeEnabled] = useState<Record<"oficial" | "recordatorio", boolean>>({
    oficial: true,
    recordatorio: true,
  });

  function toggleType(key: "oficial" | "recordatorio") {
    setTypeEnabled((prev) => ({ ...prev, [key]: !prev[key] }));
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
          <span className="text-[12px] tracking-[1.2px] font-bold">Notificaciones</span>
        </button>
        <h1
          className="text-[#333] text-[24px] leading-9"
          style={{ fontFamily: "'Roboto Slab', sans-serif" }}
        >
          Configuración de notificaciones
        </h1>
        <p className="text-[11px] text-[#808080] mt-1">
          Gestione cómo y cuándo recibe alertas del Estado.
        </p>
      </header>

      <section className="bg-white border-b border-[#ccc] px-4 pt-4 pb-4">
        <p className="text-[10px] tracking-[1px] text-[#808080]">Notificaciones push</p>
        <div className="flex items-center justify-between pt-3">
          <div>
            <p className="text-[13px] text-[#333]">Activar notificaciones push</p>
            <p className="text-[11px] text-[#808080] mt-0.5">
              Permite que la app envíe alertas a este dispositivo
            </p>
          </div>
          <Toggle checked={pushEnabled} onChange={setPushEnabled} />
        </div>
      </section>

      <section className="px-4 pt-5 pb-4">
        <p className="text-[10px] tracking-[1px] text-[#808080]">Por tipo de notificación</p>
        <div className="rounded-2xl border border-[#ccc] divide-y divide-[#ccc] bg-white mt-3">
          {NOTIF_CATEGORIES.map(({ key, label, description, icon: Icon }) => (
            <div key={key} className="px-4 py-3 flex items-center gap-3">
              <Icon size={16} strokeWidth={1.5} className="text-[#808080] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-[#333]">{label}</p>
                <p className="text-[10px] text-[#808080] mt-0.5">{description}</p>
              </div>
              <Toggle
                checked={typeEnabled[key]}
                onChange={() => toggleType(key)}
              />
            </div>
          ))}
        </div>
      </section>

      <div className="px-4 pt-2 pb-10">
        <button
          onClick={onBack}
          className="w-full flex items-center justify-center bg-[#0046a8] text-white rounded-full px-4 py-3 text-[16px] font-bold active:opacity-80 transition-opacity"
        >
          Guardar configuración
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "./Button";
import { Icon, type IconName } from "./Icon";
import { useFontSize, type FontSize } from "../context/FontSizeContext";
import { GobFranja } from "./GobFranja";
import {
  PUSH_ALERT_CATEGORIES,
  PUSH_AVISO_CATEGORIES,
  type AlertPushCategory,
  type AvisoCategory,
  type PushNotifCategory,
} from "../notificationCategories";

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 border shrink-0 rounded-full transition-colors disabled:opacity-40 ${
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
  icon,
  label,
  description,
  enabled,
  onToggle,
  configDate,
}: {
  icon: IconName;
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
          <Icon name={icon} size={15} className="text-[#0f5ac4] shrink-0 mt-0.5" />
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
          <Button
            variant="link"
            size="none"
            className="text-[10px] tracking-[1px] font-bold text-[#808080] active:text-[#333] gap-1"
          >
            <Icon name="replay" size={10} />
            Reconfigurar
          </Button>
        </div>
      )}
    </div>
  );
}

function PushCategoryRow({
  icon,
  label,
  description,
  enabled,
  onToggle,
  disabled,
}: {
  icon: IconName;
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="px-4 py-3 flex items-center gap-3 border-b border-[#ccc] last:border-b-0">
      <Icon name={icon} size={15} className="text-[#0f5ac4] shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-[#333]">{label}</p>
        <p className="text-[10px] text-[#808080] mt-0.5">{description}</p>
      </div>
      <Toggle checked={enabled} onChange={onToggle} disabled={disabled} />
    </div>
  );
}

const FONT_OPTIONS: { key: FontSize; label: string }[] = [
  { key: "small", label: "Pequeño" },
  { key: "medium", label: "Mediano" },
  { key: "large", label: "Grande" },
];

const DEFAULT_PUSH_CATEGORIES: Record<PushNotifCategory, boolean> = {
  beneficio: true,
  tramite: true,
  cobranza: true,
  judicial: true,
  oficial: true,
  recordatorio: true,
  autorizacion: true,
};

export function AppSettingsPage({ onBack }: { onBack: () => void }) {
  const { fontSize, setFontSize } = useFontSize();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [categoryEnabled, setCategoryEnabled] =
    useState<Record<PushNotifCategory, boolean>>(DEFAULT_PUSH_CATEGORIES);
  const [biometric, setBiometric] = useState(true);
  const [secondFactor, setSecondFactor] = useState(true);
  const [draftFontSize, setDraftFontSize] = useState<FontSize>(fontSize);

  function toggleCategory(key: PushNotifCategory) {
    setCategoryEnabled((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleSave() {
    setFontSize(draftFontSize);
    onBack();
  }

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3 relative">
        <GobFranja />
        <Button
          variant="nav-back"
          size="none"
          onClick={onBack}
          className="mb-4 font-bold tracking-[1.2px]"
          aria-label="Volver"
        >
          <Icon name="arrow_back" size={18} />
          <span>Mi perfil</span>
        </Button>
        <h1
          className="text-[#333] text-[24px] leading-9"
          style={{ fontFamily: "'Roboto Slab', sans-serif" }}
        >
          Configuración
        </h1>
        <p className="text-[11px] text-[#808080] mt-1">
          Notificaciones, seguridad del dispositivo y ajustes
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-6 flex flex-col gap-3">
        <p className="text-[10px] tracking-[1px] text-[#808080] pt-3">Notificaciones push</p>
        <div className="rounded-2xl border border-[#ccc] bg-white overflow-hidden">
          <div className="px-4 py-4 flex items-center justify-between gap-3 border-b border-[#ccc]">
            <div className="flex items-start gap-3 min-w-0">
              <Icon name="notifications" size={15} className="text-[#0f5ac4] shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] text-[#333]">Activar notificaciones push</p>
                <p className="text-[11px] text-[#808080] mt-0.5">
                  Permite que la app envíe alertas a este dispositivo
                </p>
              </div>
            </div>
            <Toggle checked={pushEnabled} onChange={setPushEnabled} />
          </div>

          <div className="px-4 pt-3 pb-1">
            <p className="text-[10px] tracking-[1px] text-[#808080]">Notificaciones del Estado</p>
          </div>
          {PUSH_AVISO_CATEGORIES.map(({ key, label, description, icon }) => (
            <PushCategoryRow
              key={key}
              icon={icon}
              label={label}
              description={description}
              enabled={categoryEnabled[key as AvisoCategory]}
              onToggle={() => toggleCategory(key)}
              disabled={!pushEnabled}
            />
          ))}

          <div className="px-4 pt-3 pb-1 border-t border-[#ccc]">
            <p className="text-[10px] tracking-[1px] text-[#808080]">Alertas y recordatorios</p>
          </div>
          {PUSH_ALERT_CATEGORIES.map(({ key, label, description, icon }) => (
            <PushCategoryRow
              key={key}
              icon={icon}
              label={label}
              description={description}
              enabled={categoryEnabled[key as AlertPushCategory]}
              onToggle={() => toggleCategory(key)}
              disabled={!pushEnabled}
            />
          ))}
        </div>

        <p className="text-[10px] tracking-[1px] text-[#808080] pt-1">Seguridad del dispositivo</p>
        <div className="rounded-2xl border border-[#ccc] bg-white overflow-hidden">
          <SecurityRow
            icon="fingerprint"
            label="Acceso con datos biométricos"
            description="Habilitación del uso de los datos biométricos del equipo para acceder de forma segura a tu dispositivo de confianza. Para el inicio de sesión y para acceder a documentos sensibles."
            enabled={biometric}
            onToggle={setBiometric}
            configDate="14/02/2024"
          />
          <SecurityRow
            icon="key"
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
            <Icon name="text_fields" size={15} className="text-[#0f5ac4] shrink-0" />
            <p className="text-[13px] font-bold text-[#333]">Tamaño de fuente</p>
          </div>
          <div className="px-4 pb-3.5 pl-[27px] flex flex-col">
            {FONT_OPTIONS.map(({ key, label }) => (
              <Button
                key={key}
                variant="list-row"
                size="none"
                onClick={() => setDraftFontSize(key)}
                className="flex items-center gap-2 py-2.5 active:opacity-70"
              >
                {draftFontSize === key ? (
                  <Icon name="check_circle" size={16} className="text-[#0046a8] shrink-0" />
                ) : (
                  <Icon name="radio_button_unchecked" size={16} className="text-[#ccc] shrink-0" />
                )}
                <span className="text-[13px] font-bold text-[#333]">{label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pb-10 pt-2 shrink-0">
        <Button variant="primary" size="lg" fullWidth onClick={handleSave}>
          Guardar configuración
        </Button>
      </div>
    </div>
  );
}

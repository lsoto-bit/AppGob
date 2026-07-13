import { useState } from "react";
import { ArrowLeft, Landmark, ClipboardList, Clock, CreditCard } from "lucide-react";

type NotifType = "oficial" | "tramite" | "recordatorio" | "documento";
type Channel = "push" | "email" | "sms";

interface TypeSetting {
  key: NotifType;
  label: string;
  description: string;
  icon: React.ElementType;
}

const TYPE_SETTINGS: TypeSetting[] = [
  {
    key: "oficial",
    label: "Oficiales del Estado",
    description: "Resoluciones, citaciones y multas",
    icon: Landmark,
  },
  {
    key: "tramite",
    label: "Avance de trámites",
    description: "Estado y actualizaciones de expedientes",
    icon: ClipboardList,
  },
  {
    key: "recordatorio",
    label: "Recordatorios",
    description: "Plazos, pagos y vencimientos",
    icon: Clock,
  },
  {
    key: "documento",
    label: "Documentos (Wallet)",
    description: "Vencimiento de documentos personales",
    icon: CreditCard,
  },
];

const CHANNELS: { key: Channel; label: string }[] = [
  { key: "push", label: "Notificación push" },
  { key: "email", label: "Correo electrónico" },
  { key: "sms", label: "SMS" },
];

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
      className={`relative w-10 h-5 border transition-colors shrink-0 ${ checked ? "bg-primary border-primary" : "bg-muted border-border" } px-[2px] py-[0px] rounded-[999px]`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 bg-primary-foreground border transition-all ${ checked ? "left-[calc(100%-1.125rem)] border-muted" : "left-0.5 border-muted-foreground" } rounded-[999px]`}
      />
    </button>
  );
}

export function NotificationSettingsPage({ onBack }: { onBack: () => void }) {
  const [pushEnabled, setPushEnabled] = useState(true);

  const [typeEnabled, setTypeEnabled] = useState<Record<NotifType, boolean>>({
    oficial: true,
    tramite: true,
    recordatorio: true,
    documento: true,
  });

  const [channelEnabled, setChannelEnabled] = useState<
    Record<NotifType, Record<Channel, boolean>>
  >({
    oficial: { push: true, email: true, sms: false },
    tramite: { push: true, email: false, sms: false },
    recordatorio: { push: true, email: true, sms: true },
    documento: { push: true, email: true, sms: false },
  });

  const [expanded, setExpanded] = useState<NotifType | null>(null);

  function toggleType(key: NotifType) {
    setTypeEnabled((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function toggleChannel(type: NotifType, channel: Channel, val: boolean) {
    setChannelEnabled((prev) => ({
      ...prev,
      [type]: { ...prev[type], [channel]: val },
    }));
  }

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 p-1 -ml-1 text-[#0046a8] active:bg-blue-50 rounded-full transition-colors mb-4"
          aria-label="Volver"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="text-[12px] tracking-widest">Notificaciones</span>
        </button>
        <h1 className="text-[#333]">Configuración de notificaciones</h1>
        <p className="text-[11px] text-[#808080] mt-1">
          Gestione cómo y cuándo recibe alertas del Estado.
        </p>
      </header>

      {/* Global push toggle */}
      <section className="bg-card border-b border-border px-4 py-4">
        <p className="text-[10px] tracking-widest text-muted-foreground mb-3">
          Notificaciones push
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px]">Activar notificaciones push</p>
            <p className="text-[11px] text-muted-foreground">
              Permite que la app envíe alertas a este dispositivo
            </p>
          </div>
          <Toggle checked={pushEnabled} onChange={setPushEnabled} />
        </div>
        {!pushEnabled && (
          <p className="mt-3 text-[10px] text-muted-foreground border border-border px-3 py-2">Las notificaciones push están desactivadas.</p>
        )}
      </section>

      {/* Per-type settings */}
      <section className="px-4 pt-5 pb-4">
        <p className="text-[10px] tracking-widest text-muted-foreground mb-3">
          Por tipo de notificación
        </p>
        <div className="rounded-2xl border border-[#ccc] divide-y divide-[#ccc] bg-white">
          {TYPE_SETTINGS.map(({ key, label, description, icon: Icon }) => (
            <div key={key}>
              {/* Type row */}
              <div className="px-4 py-3 flex items-center gap-3">
                <Icon size={16} strokeWidth={1.5} className="text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px]">{label}</p>
                  <p className="text-[10px] text-muted-foreground">{description}</p>
                </div>
                <Toggle
                  checked={typeEnabled[key]}
                  onChange={() => toggleType(key)}
                />
              </div>

              {/* Channel sub-settings — expand on tap */}
              {typeEnabled[key] && (
                <div>
                  

                  {expanded === key && (
                    <div className="divide-y divide-border border-t border-border">
                      {CHANNELS.map(({ key: ch, label: chLabel }) => {
                        const isDisabled = ch === "push" && !pushEnabled;
                        return (
                          <div
                            key={ch}
                            className={`px-6 py-2.5 flex items-center justify-between ${
                              isDisabled ? "opacity-40" : ""
                            }`}
                          >
                            <span className="text-[12px] text-muted-foreground">{chLabel}</span>
                            <Toggle
                              checked={!isDisabled && channelEnabled[key][ch]}
                              onChange={(v) => !isDisabled && toggleChannel(key, ch, v)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Save */}
      <div className="px-4 pb-10 mt-2">
        <button
          onClick={onBack}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-full active:opacity-80 transition-opacity"
        >
          Guardar configuración
        </button>
      </div>
    </div>
  );
}

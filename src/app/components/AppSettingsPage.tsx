import { useState } from "react";
import { Button, Card, Icon, type IconName } from "./ui";
import { useFontSize, type FontSize } from "../context/FontSizeContext";
import {
  InteriorPageBody,
  InteriorPageLayout,
  InteriorPageSection,
} from "./InteriorPageLayout";
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
        checked ? "bg-primary border-primary" : "bg-border border-border"
      }`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 bg-white border border-muted rounded-full transition-all ${
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
    <div className="px-4 py-4 flex flex-col gap-3 border-b border-border last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <Icon name={icon} size={15} className="text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
          </div>
        </div>
        <Toggle checked={enabled} onChange={onToggle} />
      </div>
      {enabled && configDate && (
        <div className="flex items-center justify-between pl-6">
          <div className="flex items-center gap-2">
            <span className="text-xs tracking-[0.9px] border border-primary text-primary px-1.5 py-0.5">
              Activo
            </span>
            <span className="text-xs text-muted-foreground">Configurado el {configDate}</span>
          </div>
          <Button
            variant="link"
            size="none"
            className="text-xs font-medium text-muted-foreground active:text-foreground gap-1"
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
    <div className="px-4 py-3 flex items-center gap-3 border-b border-border last:border-b-0">
      <Icon name={icon} size={15} className="text-primary shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
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
    <InteriorPageLayout
      onBack={onBack}
      backLabel="Mi perfil"
      title="Configuración"
      description="Notificaciones, seguridad del dispositivo y ajustes"
    >
      <InteriorPageBody className="gap-3 pt-4">
        <InteriorPageSection label="Notificaciones inmediatas">
          <Card variant="elevated" overflow="hidden">
          <div className="px-4 py-4 flex items-center justify-between gap-3 border-b border-border">
            <div className="flex items-start gap-3 min-w-0">
              <Icon name="notifications" size={15} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-foreground">Activar notificaciones inmediatas</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Permite que la app envíe alertas a este dispositivo
                </p>
              </div>
            </div>
            <Toggle checked={pushEnabled} onChange={setPushEnabled} />
          </div>

          <div className="px-4 pt-3 pb-1">
            <p className="type-label-section text-muted-foreground">Notificaciones del Estado</p>
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

          <div className="px-4 pt-3 pb-1 border-t border-border">
            <p className="type-label-section text-muted-foreground">Alertas y recordatorios</p>
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
          </Card>
        </InteriorPageSection>

        <InteriorPageSection label="Seguridad del dispositivo">
          <Card variant="elevated" overflow="hidden">
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
          </Card>
        </InteriorPageSection>

        <InteriorPageSection label="Ajustes">
          <Card variant="elevated">
          <div className="flex items-center gap-3 px-4 pb-2 pt-3.5">
            <Icon name="text_fields" size={15} className="shrink-0 text-primary" />
            <p className="text-xs font-medium text-foreground">Tamaño de fuente</p>
          </div>
          <div className="flex flex-col px-4 pb-3.5 pl-[28px]">
            {FONT_OPTIONS.map(({ key, label }) => (
              <Button
                key={key}
                variant="list-row"
                size="none"
                onClick={() => setDraftFontSize(key)}
                className="flex items-center gap-2 py-2.5 active:opacity-70"
              >
                {draftFontSize === key ? (
                  <Icon name="check_circle" size={16} className="shrink-0 text-primary" />
                ) : (
                  <Icon name="radio_button_unchecked" size={16} className="shrink-0 text-border" />
                )}
                <span className="text-xs font-medium text-foreground">{label}</span>
              </Button>
            ))}
          </div>
          </Card>
        </InteriorPageSection>

        <Button variant="primary" size="lg" fullWidth onClick={handleSave} className="mt-2">
          Guardar configuración
        </Button>
      </InteriorPageBody>
    </InteriorPageLayout>
  );
}

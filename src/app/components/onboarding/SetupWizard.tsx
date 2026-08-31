import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button, Feedback, Icon, IconBox } from "../ui";
import { useOnboarding } from "../../context/OnboardingContext";
import { STORAGE_KEYS } from "../../onboarding/constants";
import { ScreenOverlay } from "../ScreenOverlay";
import { AppCiudadanaIcon } from "../DeviceHomescreenOverlay";
import { GobFranja } from "../GobFranja";
import type { IconName } from "../ui";

type SetupStepKind = "intro" | "permission" | "device" | "biometric";

type SetupStep = {
  kind: SetupStepKind;
  title: string;
  body: string;
  icon?: IconName;
  permission?: "notifications" | "location" | "biometric";
  primaryLabel: string;
  secondaryLabel?: string;
};

const SETUP_STEPS: SetupStep[] = [
  {
    kind: "intro",
    title: "Configuremos MiGob",
    body: "En un par de pasos activaremos lo esencial para que aproveches la app desde el primer día.",
    primaryLabel: "Comenzar",
    secondaryLabel: "Configurar después",
  },
  {
    kind: "device",
    icon: "key",
    title: "Registra tu dispositivo",
    body: "Puedes darle un nombre a tu dispositivo para facilitar el reconocimiento de Inicio de sesión de tu App MiGob.",
    primaryLabel: "Continuar",
    secondaryLabel: "Ahora no",
  },
  {
    kind: "biometric",
    icon: "fingerprint",
    title: "Configuración de desbloqueo local",
    body: "La aplicación requiere permisos biométricos para acceder de forma segura a tu dispositivo de confianza. Para el inicio de sesión y para acceder a documentos sensibles.",
    permission: "biometric",
    primaryLabel: "Autorizar ahora",
    secondaryLabel: "Ahora no",
  },
  {
    kind: "permission",
    icon: "notifications",
    title: "Activa las notificaciones",
    body: "Recibe avisos de vencimientos, beneficios y notificaciones oficiales del Estado al instante.",
    permission: "notifications",
    primaryLabel: "Activar notificaciones",
    secondaryLabel: "Ahora no",
  },
  {
    kind: "permission",
    icon: "my_location",
    title: "Comparte tu ubicación",
    body: "Te mostraremos las sucursales y oficinas públicas más cercanas cuando las necesites.",
    permission: "location",
    primaryLabel: "Activar ubicación",
    secondaryLabel: "Ahora no",
  },
];

function SetupWizardHeader({ stepIndex }: { stepIndex: number }) {
  return (
    <header className="relative shrink-0 border-b border-border-muted bg-white px-4 pb-3 pt-8">
      <GobFranja />
      <p className="text-xs tracking-[1.2px] text-muted-foreground">
        Configuración inicial · {stepIndex + 1}/{SETUP_STEPS.length}
      </p>
    </header>
  );
}

function SetupWizardFooter({
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
}: {
  primaryLabel: string;
  secondaryLabel?: string;
  onPrimary: () => void;
  onSecondary?: () => void;
}) {
  return (
    <div className="flex shrink-0 flex-col gap-2 px-5 pb-10">
      <Button type="button" variant="primary" size="lg" fullWidth onClick={onPrimary}>
        {primaryLabel}
      </Button>
      {secondaryLabel && onSecondary && (
        <Button type="button" variant="ghost" size="lg" fullWidth onClick={onSecondary}>
          {secondaryLabel}
        </Button>
      )}
    </div>
  );
}

export function SetupWizard() {
  const {
    setupStep,
    nextSetupStep,
    prevSetupStep,
    skipSetup,
    notificationsEnabled,
    locationEnabled,
    biometricEnabled,
    setNotificationsEnabled,
    setLocationEnabled,
    setBiometricEnabled,
  } = useOnboarding();

  const step = SETUP_STEPS[setupStep];
  const isFirst = setupStep === 0;
  const [deviceName, setDeviceName] = useState(
    () => localStorage.getItem(STORAGE_KEYS.deviceName) ?? "",
  );

  function persistDeviceName(name: string) {
    if (name.trim()) {
      localStorage.setItem(STORAGE_KEYS.deviceName, name.trim());
    }
  }

  function handlePrimary() {
    if (step.permission === "notifications") {
      setNotificationsEnabled(true);
    }
    if (step.permission === "location") {
      setLocationEnabled(true);
    }
    if (step.permission === "biometric") {
      setBiometricEnabled(true);
    }
    if (step.kind === "device") {
      persistDeviceName(deviceName);
    }
    nextSetupStep();
  }

  function handleSecondary() {
    if (step.kind === "intro") {
      skipSetup();
      return;
    }
    if (step.permission === "notifications") {
      setNotificationsEnabled(false);
    }
    if (step.permission === "location") {
      setLocationEnabled(false);
    }
    if (step.permission === "biometric") {
      setBiometricEnabled(false);
    }
    if (step.kind === "device") {
      persistDeviceName(deviceName);
    }
    nextSetupStep();
  }

  return (
    <ScreenOverlay zIndex={250} className="bg-white">
      <div className="flex min-h-0 flex-1 flex-col">
        <SetupWizardHeader stepIndex={setupStep} />

        {!isFirst && (
          <div className="shrink-0 px-3 pt-3">
            <Button
              type="button"
              onClick={prevSetupStep}
              variant="nav-back"
              size="none"
              aria-label="Volver"
              className="gap-xs rounded-full p-2xs"
            >
              <Icon name="arrow_back" size={18} />
              <span className="text-xs">Atrás</span>
            </Button>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={setupStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-8 pb-6 pt-6 text-center"
          >
            {step.kind === "intro" ? (
              <div className="mb-6">
                <AppCiudadanaIcon size={80} />
              </div>
            ) : step.kind === "device" ? (
              <IconBox size="auto" className="mb-6 p-xs">
                <Icon name={step.icon!} size={36} className="text-primary" />
              </IconBox>
            ) : step.kind === "biometric" ? (
              <IconBox size="auto" className="mb-6 p-xs">
                <Icon name={step.icon!} size={24} className="text-primary" />
              </IconBox>
            ) : (
              <IconBox size="auto" className="mb-6 p-xs">
                <Icon name={step.icon!} size={36} className="text-primary" />
              </IconBox>
            )}

            <h2
              className="max-w-[300px] text-2xl leading-9 text-foreground"
              style={{ fontFamily: "'Roboto Slab', sans-serif" }}
            >
              {step.title}
            </h2>

            <p
              className={`mt-3 max-w-[300px] text-muted-foreground ${
                step.kind === "device" || step.kind === "biometric"
                  ? "text-base leading-6"
                  : "text-xs leading-4"
              }`}
            >
              {step.body}
            </p>

            {step.kind === "device" && (
              <div className="mt-6 flex w-full max-w-[300px] flex-col gap-4 text-left">
                <div className="flex flex-col gap-2">
                  <label htmlFor="device-name" className="text-base font-bold leading-6 text-foreground">
                    Nombre del dispositivo
                  </label>
                  <input
                    id="device-name"
                    type="text"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    className="h-[42px] w-full rounded-sm border border-foreground bg-white px-3 text-base text-foreground outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <Feedback variant="warning">
                  Atención que solo puedes iniciar sesión en un dispositivo a la vez
                </Feedback>
                <Feedback variant="info">
                  Puedes visitar el portal App MiGob para configurar el dispositivo registrado,
                  bloquear, desbloquear o conocer otros aspectos de seguridad de tu App MiGob
                </Feedback>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="self-center font-medium"
                >
                  Visitar Portal App MiGob
                  <Icon name="open_in_new" size={16} />
                </Button>
              </div>
            )}

            {step.permission === "notifications" && notificationsEnabled && (
              <p className="mt-4 text-xs font-medium text-primary">Notificaciones activadas</p>
            )}
            {step.permission === "location" && locationEnabled && (
              <p className="mt-4 text-xs font-medium text-primary">Ubicación activada</p>
            )}
            {step.permission === "biometric" && biometricEnabled && (
              <p className="mt-4 text-xs font-medium text-primary">Desbloqueo local autorizado</p>
            )}
          </motion.div>
        </AnimatePresence>

        <SetupWizardFooter
          primaryLabel={step.primaryLabel}
          secondaryLabel={step.secondaryLabel}
          onPrimary={handlePrimary}
          onSecondary={step.secondaryLabel ? handleSecondary : undefined}
        />
      </div>
    </ScreenOverlay>
  );
}

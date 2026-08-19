import { AnimatePresence, motion } from "motion/react";
import { Button, Icon, IconBox } from "../ui";
import { useOnboarding } from "../../context/OnboardingContext";
import { ScreenOverlay } from "../ScreenOverlay";
import { AppCiudadanaIcon } from "../DeviceHomescreenOverlay";
import { GobFranja } from "../GobFranja";

const SETUP_STEPS = [
  {
    title: "Configuremos MiGob",
    body: "En un par de pasos activaremos lo esencial para que aproveches la app desde el primer día.",
    showSkip: true,
  },
  {
    icon: "notifications" as const,
    title: "Activa las notificaciones",
    body: "Recibe avisos de vencimientos, beneficios y notificaciones oficiales del Estado al instante.",
    showSkip: true,
    permission: "notifications" as const,
  },
  {
    icon: "my_location" as const,
    title: "Comparte tu ubicación",
    body: "Te mostraremos las sucursales y oficinas públicas más cercanas cuando las necesites.",
    showSkip: true,
    permission: "location" as const,
  },
];

export function SetupWizard() {
  const {
    setupStep,
    nextSetupStep,
    prevSetupStep,
    skipSetup,
    notificationsEnabled,
    locationEnabled,
    setNotificationsEnabled,
    setLocationEnabled,
  } = useOnboarding();

  const step = SETUP_STEPS[setupStep];
  const isFirst = setupStep === 0;
  const isPermissionStep = Boolean(step.permission);

  function handlePrimary() {
    if (step.permission === "notifications") {
      setNotificationsEnabled(true);
    }
    if (step.permission === "location") {
      setLocationEnabled(true);
    }
    nextSetupStep();
  }

  function handleSkipPermission() {
    if (step.permission === "notifications") {
      setNotificationsEnabled(false);
    }
    if (step.permission === "location") {
      setLocationEnabled(false);
    }
    nextSetupStep();
  }

  return (
    <ScreenOverlay zIndex={250} className="bg-white">
      <div className="flex min-h-0 flex-1 flex-col">
        <GobFranja centered />

        <header className="shrink-0 border-b border-border-muted bg-white px-4 pb-4 pt-8">
          <p className="text-xs tracking-widest text-muted-foreground">
            Configuración inicial · {setupStep + 1}/{SETUP_STEPS.length}
          </p>
        </header>

        {!isFirst && (
          <div className="shrink-0 px-4 pt-3">
            <Button
              type="button"
              onClick={prevSetupStep}
              variant="nav-back"
              size="none"
              aria-label="Volver"
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
            className="flex flex-1 flex-col items-center justify-center px-8 pb-8 text-center"
          >
            {isFirst ? (
              <div className="mb-6">
                <AppCiudadanaIcon size={80} />
              </div>
            ) : (
              <IconBox size="auto" className="mb-6">
                <Icon name={step.icon!} size={36} className="text-primary" />
              </IconBox>
            )}

            <h2
              className="text-foreground text-2xl leading-[32px] max-w-[300px]"
              style={{ fontFamily: "'Roboto Slab', sans-serif" }}
            >
              {step.title}
            </h2>
            <p className="mt-3 max-w-[300px] text-xs leading-[20px] text-muted-foreground">
              {step.body}
            </p>

            {step.permission === "notifications" && notificationsEnabled && (
              <p className="mt-4 text-xs text-primary font-medium">
                Notificaciones activadas
              </p>
            )}
            {step.permission === "location" && locationEnabled && (
              <p className="mt-4 text-xs text-primary font-medium">
                Ubicación activada
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {isPermissionStep ? (
          <div className="flex flex-col items-center gap-5 px-5 pb-10">
            <Button type="button" variant="primary" size="lg" fullWidth onClick={handlePrimary}>
              {step.permission === "notifications" ? "Activar notificaciones" : "Activar ubicación"}
            </Button>
            <button
              type="button"
              onClick={handleSkipPermission}
              className="py-1 text-base font-bold text-muted-foreground active:opacity-70"
            >
              Ahora no
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 px-5 pb-10">
            <Button type="button" variant="primary" size="lg" fullWidth onClick={handlePrimary}>
              {isFirst ? "Comenzar" : "Continuar al recorrido"}
              <Icon name="chevron_right" size={16} />
            </Button>

            {isFirst && (
              <button
                type="button"
                onClick={skipSetup}
                className="self-center py-2 text-xs font-bold text-muted-foreground active:opacity-70"
              >
                Configurar después
              </button>
            )}
          </div>
        )}
      </div>
    </ScreenOverlay>
  );
}

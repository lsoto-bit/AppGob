import { Button, Icon } from "../ui";
import { useOnboarding } from "../../context/OnboardingContext";
import { ScreenOverlay } from "../ScreenOverlay";
import { GobFranja } from "../GobFranja";

export function SetupIntroScreen({ onGoHome }: { onGoHome: () => void }) {
  const { beginTourFromHome } = useOnboarding();

  function handleContinue() {
    onGoHome();
    beginTourFromHome();
  }

  return (
    <ScreenOverlay zIndex={250} className="bg-white">
      <div className="flex min-h-0 flex-1 flex-col">
        <GobFranja centered />

        <div className="flex flex-1 flex-col items-center justify-center px-8 pb-8 text-center">
          <Icon name="check_circle" size={80} className="text-primary mb-6" />

          <h2
            className="text-foreground text-2xl leading-[32px] max-w-[300px]"
            style={{ fontFamily: "'Roboto Slab', sans-serif" }}
          >
            Configuración completada
          </h2>

          <p className="mt-3 max-w-[300px] text-xs leading-[20px] text-muted-foreground">
            Ya estás listo para usar MiGob.
          </p>

          <p className="mt-4 max-w-[300px] text-xs leading-[20px] text-foreground">
            A continuación te mostraremos dónde está cada función principal.
          </p>
        </div>

        <div className="px-5 pb-10">
          <Button type="button" variant="primary" size="lg" fullWidth onClick={handleContinue}>
            Continuar al recorrido
            <Icon name="chevron_right" size={16} />
          </Button>
        </div>
      </div>
    </ScreenOverlay>
  );
}

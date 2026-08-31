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
        <div className="relative shrink-0 pt-2">
          <GobFranja centered />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-8 pb-8 text-center">
          <Icon name="check_circle" size={80} className="mb-6 text-primary" />

          <h2
            className="max-w-[300px] text-2xl leading-9 text-foreground"
            style={{ fontFamily: "'Roboto Slab', sans-serif" }}
          >
            Configuración completada
          </h2>

          <p className="mt-3 max-w-[300px] text-xs leading-4 text-muted-foreground">
            Ya estás listo para usar MiGob.
          </p>

          <p className="mt-4 max-w-[300px] text-xs leading-4 text-foreground">
            A continuación te mostraremos dónde está cada función principal.
          </p>
        </div>

        <div className="px-5 pb-10">
          <Button type="button" variant="primary" size="lg" fullWidth onClick={handleContinue}>
            Continuar al recorrido
            <Icon name="chevron_right" size={20} />
          </Button>
        </div>
      </div>
    </ScreenOverlay>
  );
}

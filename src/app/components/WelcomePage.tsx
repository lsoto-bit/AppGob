import { Icon, Button, Card } from "./ui";
import { NavCardRow } from "./NavCardRow";
import { AppIntroCarouselCard } from "./AppIntroCarousel";
import { AppCiudadanaIcon } from "./DeviceHomescreenOverlay";

function FranjaChile() {
  return (
    <div className="w-[110px] h-2 flex shrink-0">
      <div className="w-[42px] bg-[#0f5ac4]" />
      <div className="flex-1 bg-[#ff2930]" />
    </div>
  );
}

export function WelcomePage({
  onLogin,
  onBiometric,
  onLugares,
}: {
  onLogin: () => void;
  onBiometric?: () => void;
  onLugares?: () => void;
}) {
  return (
    <div className="w-full max-w-[390px] min-h-screen bg-white flex flex-col">
      {/* Flag stripe */}
      <div className="flex justify-center">
        <FranjaChile />
      </div>

      {/* Header */}
      <header className="px-6 pt-10 pb-5 flex flex-col items-center gap-4">
        <AppCiudadanaIcon size={96} />
        <div className="text-center w-[336px]">
          <h1
            className="text-foreground font-medium text-2xl leading-9 px-5"
            style={{ fontFamily: "'Roboto Slab', sans-serif" }}
          >
            Te damos la bienvenida a MiGob
          </h1>
          <p className="text-xs text-muted-foreground leading-[20px] pt-1">
            El Estado de Chile en tu bolsillo
          </p>
        </div>
      </header>

      {/* Carousel card */}
      <div className="px-6">
        <AppIntroCarouselCard />
      </div>

      {/* CTAs + footer link */}
      <div className="mt-auto flex flex-col">
        <div className="px-5 pt-5 pb-0 flex flex-col gap-3">
          <Button onClick={onLogin} variant="primary" size="xl" fullWidth>
            Iniciar sesión con ClaveÚnica
            <Icon name="chevron_right" size={16} />
          </Button>
          <Button onClick={onBiometric} variant="secondary" size="xl" fullWidth>
            Inicia sesión con datos biométricos
          </Button>
        </div>

        <div className="px-5 pt-8 pb-6">
          <Card>
            <NavCardRow
              icon="domain"
              title="Sucursales de atención"
              onClick={onLugares}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

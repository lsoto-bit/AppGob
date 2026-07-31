import { Icon } from "./Icon";
import { Button } from "./Button";
import { AppIntroCarouselCard } from "./AppIntroCarousel";
import { AppCiudadanaIcon } from "./DeviceHomescreenOverlay";

function FranjaChile() {
  return (
    <div className="w-[110px] h-2 flex shrink-0">
      <div className="w-[41px] bg-[#0f5ac4]" />
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
            className="text-[#333] font-medium text-[24px] leading-9 px-5"
            style={{ fontFamily: "'Roboto Slab', sans-serif" }}
          >
            Te damos la bienvenida a MiGob
          </h1>
          <p className="text-[12px] text-[#666] leading-[18px] pt-1">
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
          <Button onClick={onBiometric} variant="secondary" size="lg" fullWidth>
            Inicia sesión con datos biométricos
          </Button>
        </div>

        <div className="px-5 pt-12 pb-6">
          <Button onClick={onLugares} variant="card" size="md" fullWidth>
            <div className="w-8 h-8 bg-[#f2f2f2] rounded-[8px] flex items-center justify-center shrink-0">
              <Icon name="domain" size={16} className="text-[#0f5ac4]" />
            </div>
            <span className="text-[#333]">Lugares de atención del Estado</span>
            <Icon name="chevron_right" size={14} className="text-[#0f5ac4] ml-auto" />
          </Button>
        </div>
      </div>
    </div>
  );
}

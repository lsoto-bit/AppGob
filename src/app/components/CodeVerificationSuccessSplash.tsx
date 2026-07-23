import { createPortal } from "react-dom";
import { Icon } from "./Icon";
import { Button } from "./Button";

export function CodeVerificationSuccessSplash({
  onReturnToApp,
}: {
  onReturnToApp: () => void;
}) {
  return createPortal(
    <div className="fixed inset-0 z-[240] flex justify-center bg-white">
      <div className="relative flex min-h-screen w-full max-w-[390px] flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center gap-8 w-full">
          <Icon name="check_circle" size={96} className="text-[#0046a8]" />
          <p
            className="text-center text-[22px] font-medium leading-tight text-[#333]"
            style={{ fontFamily: "'Roboto Slab', sans-serif" }}
          >
            Tarea cumplida
          </p>
          <Button
            onClick={onReturnToApp}
            variant="primary"
            size="md"
            fullWidth
            className="max-w-[300px]"
          >
            Volver a aplicación MiGob
          </Button>
        </div>

        <div className="absolute bottom-0 left-1/2 flex h-2 w-[110px] -translate-x-1/2">
          <div className="w-[41px] bg-[#0f5ac4]" />
          <div className="flex-1 bg-[#ff2930]" />
        </div>
      </div>
    </div>,
    document.body,
  );
}

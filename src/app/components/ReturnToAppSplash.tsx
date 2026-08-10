import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AppCiudadanaIcon } from "./DeviceHomescreenOverlay";

const FADE_MS = 300;
const HOLD_MS = 1900;

export function ReturnToAppSplash({ onFinish }: { onFinish: () => void }) {
  const [opacity, setOpacity] = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setTransitioning(true);
      setOpacity(0);
    }, HOLD_MS);

    const finishTimer = setTimeout(onFinish, HOLD_MS + FADE_MS);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex justify-center bg-white"
      style={{
        opacity,
        transition: transitioning ? `opacity ${FADE_MS}ms ease-in-out` : "none",
      }}
      aria-busy="true"
      aria-label="Redirigiendo a la aplicación MiGob"
    >
      <div className="relative flex min-h-screen w-full max-w-[390px] flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center gap-6">
          <AppCiudadanaIcon size={160} />
          <div className="flex flex-col items-center gap-5">
            <p
              className="text-center text-[24px] font-medium leading-tight text-black"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              MiGob
            </p>
            <div className="flex flex-col items-center gap-3" role="status" aria-live="polite">
              <div
                className="h-6 w-6 animate-spin rounded-full border-[2px] border-[#e6e6e6] border-t-[#0f5ac4]"
                aria-hidden
              />
              <p className="max-w-[260px] text-center text-[16px] leading-snug text-[#666666]">
                Redirigiendo a la aplicación MiGob
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 flex h-2 w-[110px] -translate-x-1/2">
          <div className="w-[42px] bg-[#0f5ac4]" />
          <div className="flex-1 bg-[#ff2930]" />
        </div>
      </div>
    </div>,
    document.body,
  );
}

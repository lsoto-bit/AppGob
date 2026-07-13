import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AppCiudadanaIcon } from "./DeviceHomescreenOverlay";

const FADE_MS = 400;
const HOLD_MS = 900;

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
      aria-hidden
    >
      <div className="relative flex min-h-screen w-full max-w-[390px] flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center gap-6">
          <AppCiudadanaIcon size={160} />
          <p
            className="text-center text-[22px] font-medium leading-tight text-black"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            App ciudadana
          </p>
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

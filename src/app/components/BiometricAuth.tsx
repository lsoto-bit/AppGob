import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { BottomSheet } from "./BottomSheet";

type BiometricPhase = "permission" | "scanning" | "success";

const SCAN_OVERLAY_Z = 210;

export function BiometricAuth({
  onSuccess,
  onCancel,
  successSubtitle = "Accediendo al documento…",
}: {
  onSuccess: () => void;
  onCancel?: () => void;
  successSubtitle?: string;
}) {
  const [phase, setPhase] = useState<BiometricPhase>("permission");
  const onSuccessRef = useRef(onSuccess);
  const onCancelRef = useRef(onCancel);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  onSuccessRef.current = onSuccess;
  onCancelRef.current = onCancel;

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  function handleAuthorize() {
    clearTimers();
    setPhase("scanning");
    timersRef.current.push(
      setTimeout(() => setPhase("success"), 2000),
      setTimeout(() => onSuccessRef.current(), 2800),
    );
  }

  const scanOverlay =
    phase === "scanning" || phase === "success" ? (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center bg-foreground/90"
        style={{ zIndex: SCAN_OVERLAY_Z }}
      >
        <div className="flex w-full max-w-[390px] flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-6">
            <div
              className={`relative flex h-32 w-32 items-center justify-center border-2 transition-all duration-500 ${
                phase === "success" ? "border-primary-foreground" : "border-primary-foreground/50"
              }`}
            >
              <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary-foreground" />
              <div className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-primary-foreground" />
              <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary-foreground" />
              <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary-foreground" />

              {phase === "scanning" ? (
                <Icon name="face_unlock" size={52} weight={100} className="text-primary-foreground opacity-80" />
              ) : (
                <Icon name="check_circle" size={52} weight={100} className="text-primary-foreground" />
              )}

              {phase === "scanning" && (
                <div
                  className="absolute left-0 right-0 h-0.5 bg-primary-foreground/60"
                  style={{ animation: "biometric-scan 1.4s ease-in-out infinite", top: "50%" }}
                />
              )}
            </div>

            <div className="text-center">
              <p className="text-[14px] text-primary-foreground">
                {phase === "scanning" ? "Reconocimiento facial" : "Identidad verificada"}
              </p>
              <p className="mt-1 text-[11px] text-primary-foreground/60">
                {phase === "scanning" ? "Mire a la cámara para acceder" : successSubtitle}
              </p>
            </div>
          </div>

          <style>{`
            @keyframes biometric-scan {
              0% { top: 10%; }
              50% { top: 90%; }
              100% { top: 10%; }
            }
          `}</style>
        </div>
      </div>
    ) : null;

  return (
    <>
      <BottomSheet
        open={phase === "permission"}
        onClose={() => onCancelRef.current?.()}
        zIndexClassName="z-[200]"
        backdropClassName="bg-[rgba(51,51,51,0.4)]"
        panelClassName="bg-white border-t border-[#ccc] flex flex-col"
      >
        <div className="flex min-h-[180px] flex-col items-center justify-center gap-4 px-8 py-6 text-center">
          <div className="flex items-center justify-center rounded-[8px] bg-[#f2f2f2] p-2">
            <Icon name="face_unlock" size={36} className="text-[#0f5ac4]" />
          </div>
          <div className="flex w-full max-w-[320px] flex-col gap-1.5">
            <h2
              className="text-[20px] font-normal leading-[30px] text-[#333]"
              style={{ fontFamily: "'Roboto Slab', sans-serif" }}
            >
              Reconocimiento facial
            </h2>
            <p className="text-[12px] leading-[19.5px] text-[#808080]">
              Por favor, autoriza el uso de datos biométricos para verificar tu identidad de forma segura.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-6 px-4 pb-4">
          <Button onClick={() => onCancelRef.current?.()} variant="ghost" size="md" className="flex-1">
            Cancelar
            <Icon name="close" size={13} />
          </Button>
          <Button onClick={handleAuthorize} variant="primary" size="md" className="flex-1">
            Autorizar ahora
          </Button>
        </div>
      </BottomSheet>

      {scanOverlay && createPortal(scanOverlay, document.body)}
    </>
  );
}

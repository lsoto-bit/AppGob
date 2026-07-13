import { useState, useEffect } from "react";
import { ScanFace, CheckCircle2 } from "lucide-react";

type BiometricState = "scanning" | "success";

export function BiometricAuth({
  onSuccess,
  successSubtitle = "Accediendo al documento…",
}: {
  onSuccess: () => void;
  successSubtitle?: string;
}) {
  const [state, setState] = useState<BiometricState>("scanning");

  useEffect(() => {
    const t1 = setTimeout(() => setState("success"), 2000);
    const t2 = setTimeout(() => onSuccess(), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onSuccess]);

  return (
    <div className="fixed inset-0 z-[70] bg-foreground/90 flex flex-col items-center justify-center w-full max-w-[390px] mx-auto gap-8">
      <div className="flex flex-col items-center gap-6">
        <div
          className={`relative w-32 h-32 border-2 flex items-center justify-center transition-all duration-500 ${
            state === "success" ? "border-primary-foreground" : "border-primary-foreground/50"
          }`}
        >
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary-foreground" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary-foreground" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary-foreground" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary-foreground" />

          {state === "scanning" ? (
            <ScanFace size={52} strokeWidth={1} className="text-primary-foreground opacity-80" />
          ) : (
            <CheckCircle2 size={52} strokeWidth={1} className="text-primary-foreground" />
          )}

          {state === "scanning" && (
            <div
              className="absolute left-0 right-0 h-0.5 bg-primary-foreground/60"
              style={{ animation: "scan 1.4s ease-in-out infinite", top: "50%" }}
            />
          )}
        </div>

        <div className="text-center">
          <p className="text-[14px] text-primary-foreground">
            {state === "scanning" ? "Reconocimiento facial" : "Identidad verificada"}
          </p>
          <p className="text-[11px] text-primary-foreground/60 mt-1">
            {state === "scanning" ? "Mire a la cámara para acceder" : successSubtitle}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 10%; }
          50% { top: 90%; }
          100% { top: 10%; }
        }
      `}</style>
    </div>
  );
}

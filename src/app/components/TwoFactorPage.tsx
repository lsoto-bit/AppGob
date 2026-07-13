import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export function TwoFactorPage({ onSuccess, onBack }: { onSuccess: () => void; onBack: () => void }) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  function handleChange(index: number, value: string) {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...digits];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  }

  const filled = digits.every((d) => d !== "");

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#e6e6e6] px-4 pt-10 pb-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 p-1 -ml-1 text-[#0046a8] active:bg-blue-50 rounded-full transition-colors mb-4"
          aria-label="Volver"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="text-[12px] tracking-widest">Volver</span>
        </button>
        <h1 className="text-[#333]">Verificación en dos pasos</h1>
      </header>

      <div className="flex-1 flex flex-col items-center px-6 pt-10 gap-8">
        {/* Icon */}
        <div className="w-16 h-16 flex items-center justify-center bg-[#f2f2f2] rounded-[8px] p-2 flex items-center justify-center">
          <ShieldCheck size={28} strokeWidth={1.5} className="text-[#0f5ac4]"  />
        </div> 
        {/* Explanation */}
        <div className="text-center flex flex-col gap-2">
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            Ingresa el código de 6 dígitos que fue enviado al correo electrónico registrado en tu ClaveÚnica.
          </p>
          <p className="text-[11px] text-muted-foreground">
            m.vale●●●●●@correo.cl
          </p>
        </div>

        {/* Code inputs */}
        <div className="flex gap-3">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className={`w-11 h-14 text-center text-[20px] border-2 bg-card outline-none transition-colors ${ digit ? "border-primary" : "border-border" } rounded-[4px]`}
            />
          ))}
        </div>

        {/* Resend */}
        <button className="text-[11px] text-muted-foreground underline active:text-foreground transition-colors">
          Reenviar código al correo
        </button>

        {/* Confirm */}
        <button
          onClick={onSuccess}
          disabled={!filled}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-full disabled:opacity-30 active:opacity-80 transition-opacity"
        >
          Confirmar
        </button>

      </div>
    </div>
  );
}

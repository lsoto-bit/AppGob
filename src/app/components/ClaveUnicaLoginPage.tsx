import { useState } from "react";
import { Icon, Button } from "./ui";
import Header from "../../imports/Header/index";

const CLAVEUNICA_URL =
  "https://accounts.claveunica.gob.cl/accounts/login/?next=/openid/authorize/";

export function ClaveUnicaLoginPage({
  onSuccess,
  onBack,
}: {
  onSuccess: () => void;
  onBack: () => void;
}) {
  const [run, setRun] = useState("");
  const [clave, setClave] = useState("");
  const [showClave, setShowClave] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (run.trim() && clave.trim()) onSuccess();
  }

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-white flex flex-col">
      {/* Simulated browser chrome */}
      <div className="bg-white border-b border-border px-3 pt-10 pb-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 px-1">
            <Button
              onClick={onBack}
              variant="icon"
              size="icon"
              className="w-4 h-4 rounded-full bg-muted border border-border active:opacity-70"
              aria-label="Cerrar navegador"
            >
              <Icon name="close" size={6} weight={700} className="text-muted-foreground" />
            </Button>
            <div className="w-4 h-4 rounded-full border border-border" />
            <div className="w-4 h-4 rounded-full border border-border" />
          </div>
          <div className="flex-1 bg-muted border border-border rounded px-3 py-1 flex items-center gap-2 min-w-0">
            <div className="w-2.5 h-2.5 border border-muted-foreground rounded-full shrink-0" />
            <span className="text-xs text-muted-foreground truncate">{CLAVEUNICA_URL}</span>
          </div>
        </div>
      </div>

      {/* ClaveÚnica login card */}
      <div className="flex-1 bg-muted flex flex-col items-center justify-center p-5">
        <div className="w-full bg-white border border-border rounded-2xl px-6 pb-6 flex flex-col gap-2">
          <div className="px-5 pt-0">
            <Header />
          </div>

          <h2
            className="text-3xl leading-[48px] text-foreground text-center font-normal"
            style={{ fontFamily: "'Roboto Slab', sans-serif" }}
          >
            MiGob
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-2">
            {/* RUN */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="run"
                className="text-base font-bold text-foreground leading-6"
              >
                Ingresa tu RUN
              </label>
              <input
                id="run"
                type="text"
                value={run}
                onChange={(e) => setRun(e.target.value)}
                className="w-full border border-foreground rounded px-3 py-2 text-base text-foreground outline-none focus:ring-2 focus:ring-primary/20 bg-white"
              />
            </div>

            {/* ClaveÚnica */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="clave"
                className="text-base font-bold text-foreground leading-6"
              >
                Ingresa tu ClaveÚnica
              </label>
              <div className="relative">
                <input
                  id="clave"
                  type={showClave ? "text" : "password"}
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  className="w-full border border-foreground rounded px-3 py-2 pr-10 text-base text-foreground outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                />
                <Button
                  type="button"
                  onClick={() => setShowClave(!showClave)}
                  variant="icon-muted"
                  size="none"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground active:opacity-70"
                  aria-label={showClave ? "Ocultar clave" : "Mostrar clave"}
                >
                  {showClave ? (
                    <Icon name="visibility_off" size={24} />
                  ) : (
                    <Icon name="visibility" size={24} />
                  )}
                </Button>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-1.5">
              <a
                href="#"
                className="text-base font-bold text-primary underline text-center"
                onClick={(e) => e.preventDefault()}
              >
                Recupera tu ClaveÚnica
              </a>
              <a
                href="#"
                className="text-base font-bold text-primary underline text-center"
                onClick={(e) => e.preventDefault()}
              >
                Solicita tu ClaveÚnica
              </a>
            </div>

            {/* Submit */}
            <Button type="submit" variant="primary" size="lg" fullWidth>
              INGRESA
            </Button>

            {/* Help */}
            <p className="text-center">
              <a
                href="#"
                className="text-base font-bold text-foreground underline"
                onClick={(e) => e.preventDefault()}
              >
                ¿Necesitas ayuda?
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

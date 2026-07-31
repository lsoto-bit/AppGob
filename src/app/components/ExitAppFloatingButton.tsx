import { Button } from "./Button";

export function ExitAppFloatingButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant="utility"
      size="utility"
      className="absolute left-1/2 top-0 z-30 -translate-x-1/2"
      style={{ fontFamily: "system-ui, sans-serif", opacity: 0.83 }}
    >
      Salir de la aplicación
    </Button>
  );
}

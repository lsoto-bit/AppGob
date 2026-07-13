export function ExitAppFloatingButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute left-1/2 top-10 z-30 -translate-x-1/2 bg-white text-black border border-black px-1.5 py-1.5 text-[9px] rounded-[2px] font-normal shrink-0 active:opacity-70 transition-opacity"
      style={{ fontFamily: "system-ui, sans-serif", opacity: 0.83 }}
    >
      Salir de la aplicación
    </button>
  );
}

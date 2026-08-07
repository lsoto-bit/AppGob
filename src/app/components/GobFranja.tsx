const franjaMarkup = (
  <>
    <div className="w-[41px] bg-[#0f5ac4]" />
    <div className="flex-1 bg-[#ff2930]" />
  </>
);

export function GobFranja({
  onClick,
  centered = false,
}: {
  onClick?: () => void;
  centered?: boolean;
}) {
  const stripeClassName = "h-2 w-[110px] flex shrink-0";

  if (centered) {
    if (onClick) {
      return (
        <div className="flex w-full shrink-0 justify-center">
          <button
            type="button"
            onClick={onClick}
            className={`${stripeClassName} cursor-pointer border-0 bg-transparent p-0`}
            aria-label="Salir de la aplicación"
          >
            {franjaMarkup}
          </button>
        </div>
      );
    }

    return (
      <div className="flex w-full shrink-0 justify-center" aria-hidden="true">
        <div className={stripeClassName}>{franjaMarkup}</div>
      </div>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="absolute left-2 top-0 h-2 w-[110px] flex cursor-pointer border-0 bg-transparent p-0"
        aria-label="Salir de la aplicación"
      >
        {franjaMarkup}
      </button>
    );
  }

  return (
    <div className="absolute left-2 top-0 h-2 w-[110px] flex" aria-hidden="true">
      {franjaMarkup}
    </div>
  );
}

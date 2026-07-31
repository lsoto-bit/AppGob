export const PUSH_NOTIFICATION_ID = 13;

const DOCK_APPS = [
  { src: "/assets/dock-phone.png", alt: "Teléfono" },
  { src: "/assets/dock-safari.png", alt: "Safari" },
  { src: "/assets/dock-messages.png", alt: "Mensajes" },
  { src: "/assets/dock-music.png", alt: "Música" },
] as const;

const CALENDAR_DAYS = ["L", "M", "M", "J", "V", "S", "D"] as const;

/** July layout — 1st falls on Wednesday (column index 3). */
const JULY_DATES: (number | null)[] = [
  null, null, null, 1, 2, 3, 4,
  5, 6, 7, 8, 9, 10, 11,
  12, 13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24, 25,
  26, 27, 28, 29, 30, 31,
];

const SELECTED_DATE = 14;

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-[26px] pt-[14px] text-white">
      <span className="text-[15px] font-semibold tracking-[-0.3px]">9:41</span>
      <div className="flex items-center gap-[5px]">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none" aria-hidden>
          <rect x="0" y="7" width="3" height="4" rx="0.5" fill="white" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.5" fill="white" />
          <rect x="9" y="3" width="3" height="8" rx="0.5" fill="white" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" fill="white" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none" aria-hidden>
          <path
            d="M7.5 2.5C9.8 2.5 11.9 3.4 13.4 5L14.8 3.6C13 1.8 10.4 0.7 7.5 0.7C4.6 0.7 2 1.8 0.2 3.6L1.6 5C3.1 3.4 5.2 2.5 7.5 2.5Z"
            fill="white"
          />
          <path
            d="M7.5 5.5C8.9 5.5 10.2 6 11.2 7L12.6 5.6C11.2 4.2 9.4 3.4 7.5 3.4C5.6 3.4 3.8 4.2 2.4 5.6L3.8 7C4.8 6 6.1 5.5 7.5 5.5Z"
            fill="white"
          />
          <circle cx="7.5" cy="9.5" r="1.5" fill="white" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden>
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="white" strokeOpacity="0.35" />
          <rect x="2" y="2" width="17" height="8" rx="1.5" fill="white" />
          <path
            d="M23 4.5V7.5C23.8 7.2 24.5 6.5 24.5 6C24.5 5.5 23.8 4.8 23 4.5Z"
            fill="white"
            fillOpacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}

function CalendarWidget() {
  return (
    <div className="flex flex-col items-center gap-[7px]">
      <div className="w-[169px] rounded-[22px] bg-white p-[11px] shadow-[0_2px_16px_rgba(0,0,0,0.12)]">
        <p className="text-[11px] font-bold tracking-[0.4px] text-[#fe373c] mb-[6px]">JULIO</p>
        <div className="grid grid-cols-7 gap-y-[2px]">
          {CALENDAR_DAYS.map((day, i) => (
            <span
              key={`${day}-${i}`}
              className="text-center text-[9px] font-medium text-[#333] leading-[14px]"
            >
              {day}
            </span>
          ))}
          {JULY_DATES.map((date, i) => {
            const col = i % 7;
            const isWeekend = col >= 5;
            const isSelected = date === SELECTED_DATE;

            if (date === null) {
              return <span key={`empty-${i}`} className="h-[22px]" />;
            }

            return (
              <div key={date} className="flex h-[22px] items-center justify-center">
                {isSelected ? (
                  <span className="flex size-[22px] items-center justify-center rounded-full bg-[#fe373c] text-[11px] font-medium text-white">
                    {date}
                  </span>
                ) : (
                  <span
                    className={`text-[11px] leading-none ${isWeekend ? "text-[#aeaeb2]" : "text-[#333]"}`}
                  >
                    {date}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <span className="text-[11px] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">Calendario</span>
    </div>
  );
}

export function AppCiudadanaIcon({ size = 60 }: { size?: number }) {
  const radius = Math.round(size * (52 / 240));

  return (
    <div
      className="overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
      style={{ width: size, height: size, borderRadius: radius }}
    >
      <div className="flex h-full">
        <div className="flex-1 bg-[#0f5ac4]" />
        <div className="flex-1 bg-[#ff2930]" />
      </div>
    </div>
  );
}

function DockIcon({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick?: () => void;
}) {
  const content = (
    <>
      <div className="pointer-events-none absolute left-1/2 top-0 size-[60px] -translate-x-1/2 overflow-hidden rounded-[13px] bg-gradient-to-b from-[#303030] to-[#121212]">
        <img
          src={src}
          alt=""
          className="pointer-events-none absolute -left-1 -top-1 size-[68px] max-w-none object-cover"
        />
      </div>
      <span className="sr-only">{alt}</span>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="relative z-10 size-[60px] shrink-0 touch-manipulation active:opacity-80 transition-opacity"
        aria-label={alt}
      >
        {content}
      </button>
    );
  }

  return <div className="relative size-[60px] shrink-0">{content}</div>;
}

function AppPushBanner({ onClick }: { onClick: () => void }) {
  return (
    <div className="absolute left-0 right-0 top-[88px] z-20 animate-in slide-in-from-top px-3 duration-300">
      <button
        type="button"
        onClick={onClick}
        className="w-full rounded-2xl bg-[rgba(37,37,37,0.5)] p-2.5 text-left shadow-lg backdrop-blur-[40px] transition-opacity active:opacity-90"
      >
        <div className="flex items-center gap-2.5">
          <AppCiudadanaIcon size={38} />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[15px] font-semibold leading-5 tracking-tight text-white">
                Devolución por pagos dobles de contribuciones
              </p>
              <span className="shrink-0 text-[13px] text-[rgba(235,235,245,0.6)]">Ahora</span>
            </div>
            <p className="mt-0.5 text-[13px] text-white">Tu solicitud fue resuelta favorablemente. Presiona aquí para ver el detalle.</p>
          </div>
        </div>
      </button>
    </div>
  );
}

export function DeviceHomescreenOverlay({
  showPushNotification,
  onPushNotificationClick,
  onSafariClick,
  onMiGobClick,
}: {
  showPushNotification: boolean;
  onPushNotificationClick?: () => void;
  onSafariClick?: () => void;
  onMiGobClick?: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[220] flex justify-center bg-black">
      <div className="relative min-h-screen w-full max-w-[390px] overflow-hidden">
        <img
          src="/assets/homescreen-wallpaper.png"
          alt=""
          className="pointer-events-none absolute inset-0 size-full object-cover"
        />

        <div className="relative z-10 flex min-h-screen flex-col">
          <StatusBar />

          <div className="mt-[18px] flex items-start gap-[22px] px-[26px]">
            <CalendarWidget />
            {onMiGobClick ? (
              <button
                type="button"
                onClick={onMiGobClick}
                className="flex flex-col items-center gap-[7px] pt-[2px] active:opacity-80 transition-opacity"
                aria-label="Abrir MiGob"
              >
                <AppCiudadanaIcon size={60} />
                <span className="max-w-[78px] text-center text-[11px] leading-[13px] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
                  MiGob
                </span>
              </button>
            ) : (
              <div className="flex flex-col items-center gap-[7px] pt-[2px]">
                <AppCiudadanaIcon size={60} />
                <span className="max-w-[78px] text-center text-[11px] leading-[13px] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
                  MiGob
                </span>
              </div>
            )}
          </div>

          <div className="mt-auto px-3 pb-3">
            <div className="relative z-20 h-[93px] w-full">
              <div className="pointer-events-none absolute inset-0 rounded-[29px] bg-[rgba(0,0,0,0.2)] backdrop-blur-[40px]" />
              <div className="absolute inset-x-[4.79%] inset-y-[17.2%] z-10 flex items-start justify-between">
                {DOCK_APPS.map(({ src, alt }) => (
                  <DockIcon
                    key={alt}
                    src={src}
                    alt={alt}
                    onClick={alt === "Safari" ? onSafariClick : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {showPushNotification && onPushNotificationClick && (
          <AppPushBanner onClick={onPushNotificationClick} />
        )}
      </div>
    </div>
  );
}

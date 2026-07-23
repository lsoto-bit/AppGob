import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon, type IconName } from "./Icon";
import { Button } from "./Button";

const AUTO_ADVANCE_MS = 9000;
const SWIPE_THRESHOLD = 48;
const SLIDE_TRANSITION_S = 0.45;

export const WELCOME_FEATURES: {
  icon: IconName;
  title: string;
  desc: string;
}[] = [
  {
    icon: "description",
    title: "Documentos digitales",
    desc: "Accede a tu cédula de identidad, credencial de discapacidad y otros documentos oficiales desde tu celular.",
  },
  {
    icon: "notifications",
    title: "Notificaciones oficiales",
    desc: "Recibe avisos de vencimientos, pagos de beneficios y citaciones del Estado.",
  },
  {
    icon: "person",
    title: "Tu espacio ciudadano",
    desc: "Consulta tu Registro Social de Hogares, fondos de pensiones, cobertura de salud y beneficios estatales. Gestiona tus datos y preferencias en un solo lugar.",
  },
  {
    icon: "verified_user",
    title: "Tu identidad, bajo tu control",
    desc: "Cuando un servicio público necesite confirmar quién eres, recibirás una solicitud en MiGob para aprobarla con ClaveÚnica.",
  },
  {
    icon: "domain",
    title: "Lugares de atención del Estado",
    desc: "Encuentra las oficinas públicas más cercanas con horarios actualizados.",
  },
];

function CarouselSlide({
  icon,
  title,
  desc,
  contentClassName = "w-[320px]",
}: {
  icon: IconName;
  title: string;
  desc: string;
  contentClassName?: string;
}) {
  return (
    <div className="px-8 py-6 text-center h-[260px] flex flex-col justify-center items-center gap-4 touch-pan-y">
      <div className="bg-[#f2f2f2] rounded-[8px] p-2 flex items-center justify-center shrink-0">
        <Icon name={icon} size={36} className="text-[#0f5ac4]" />
      </div>
      <div className={`flex flex-col gap-1.5 ${contentClassName}`}>
        <h2
          className="text-[#333] font-normal text-[20px] leading-[30px] min-h-[60px] flex items-center justify-center"
          style={{ fontFamily: "'Roboto Slab', sans-serif" }}
        >
          {title}
        </h2>
        <p className="text-[12px] text-[#808080] leading-[19.5px] min-h-[78px]">{desc}</p>
      </div>
    </div>
  );
}

/** Carrusel de introducción con avance automático, pausa, arrastre y navegación manual. */
export function AppIntroCarousel({
  contentClassName = "w-[320px]",
}: {
  contentClassName?: string;
}) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isLast = current === WELCOME_FEATURES.length - 1;
  const { icon, title, desc } = WELCOME_FEATURES[current];

  const clearAutoAdvance = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleAutoAdvance = useCallback(() => {
    clearAutoAdvance();
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % WELCOME_FEATURES.length);
    }, AUTO_ADVANCE_MS);
  }, [isPaused, clearAutoAdvance]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrent(index);
      scheduleAutoAdvance();
    },
    [scheduleAutoAdvance],
  );

  const goNext = useCallback(() => {
    setCurrent((c) => Math.min(c + 1, WELCOME_FEATURES.length - 1));
    scheduleAutoAdvance();
  }, [scheduleAutoAdvance]);

  const goPrev = useCallback(() => {
    setCurrent((c) => Math.max(0, c - 1));
    scheduleAutoAdvance();
  }, [scheduleAutoAdvance]);

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      const swipe = info.offset.x + info.velocity.x * 0.15;
      if (swipe < -SWIPE_THRESHOLD) goNext();
      else if (swipe > SWIPE_THRESHOLD) goPrev();
      else scheduleAutoAdvance();
    },
    [goNext, goPrev, scheduleAutoAdvance],
  );

  const togglePause = useCallback(() => {
    setIsPaused((paused) => !paused);
  }, []);

  useEffect(() => {
    scheduleAutoAdvance();
    return clearAutoAdvance;
  }, [scheduleAutoAdvance, clearAutoAdvance]);

  return (
    <>
      <div className="relative overflow-hidden">
        <Button
          type="button"
          onClick={togglePause}
          variant="icon"
          size="icon-circle"
          className="absolute top-3 right-3 z-10 text-primary active:bg-[#f2f2f2]"
          aria-label={isPaused ? "Reanudar avance automático" : "Pausar avance automático"}
          aria-pressed={isPaused}
        >
          <Icon name={isPaused ? "play_arrow" : "pause"} size={16} />
        </Button>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: SLIDE_TRANSITION_S, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={handleDragEnd}
            className="cursor-grab active:cursor-grabbing"
          >
            <CarouselSlide
              icon={icon}
              title={title}
              desc={desc}
              contentClassName={contentClassName}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-3 px-5 py-4 border-t border-[#ccc]">
        <Button
          type="button"
          onClick={goPrev}
          disabled={current === 0}
          variant="secondary"
          size="sm"
        >
          <Icon name="chevron_left" size={13} />
          Anterior
        </Button>

        <div className="flex gap-1.5">
          {WELCOME_FEATURES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-[#0046a8]" : "bg-[#ccc]"}`}
              aria-label={`Ir a slide ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
            />
          ))}
        </div>

        <Button
          type="button"
          onClick={goNext}
          disabled={isLast}
          variant="secondary"
          size="sm"
        >
          Siguiente
          <Icon name="chevron_right" size={13} />
        </Button>
      </div>
    </>
  );
}

/** Tarjeta contenedora del carrusel de introducción (mismo aspecto en bienvenida y tutorial). */
export function AppIntroCarouselCard({
  contentClassName = "w-[320px]",
  className = "",
}: {
  contentClassName?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#ccc] bg-white flex flex-col overflow-hidden ${className}`}
    >
      <AppIntroCarousel contentClassName={contentClassName} />
    </div>
  );
}

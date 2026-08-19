import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "../ui";
import { TOUR_STEPS } from "../../onboarding/tourSteps";
import { useOnboarding } from "../../context/OnboardingContext";

const SPOTLIGHT_PAD = 8;
const TOOLTIP_GAP = 8;
const Z_INDEX = 250;

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function getAppShell(): HTMLElement | null {
  return document.querySelector("[data-app-shell]");
}

function measureTarget(targetId: string, shellTop: number, shellLeft: number): Rect | null {
  const el = document.querySelector<HTMLElement>(`[data-tour-id="${targetId}"]`);
  if (!el) return null;

  const inBottomNav = el.closest("[data-bottom-nav]");
  if (!inBottomNav) {
    el.scrollIntoView({ block: "nearest", behavior: "instant" });
  }

  const box = el.getBoundingClientRect();
  return {
    top: box.top - shellTop - SPOTLIGHT_PAD,
    left: box.left - shellLeft - SPOTLIGHT_PAD,
    width: box.width + SPOTLIGHT_PAD * 2,
    height: box.height + SPOTLIGHT_PAD * 2,
  };
}

function useAppShellRect(active: boolean) {
  const [shellRect, setShellRect] = useState<Rect | null>(null);

  useEffect(() => {
    if (!active) return;

    const update = () => {
      const shell = getAppShell();
      if (!shell) return;
      const box = shell.getBoundingClientRect();
      setShellRect({
        top: box.top,
        left: box.left,
        width: box.width,
        height: box.height,
      });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [active]);

  return shellRect;
}

function CoachMarkTooltip({
  title,
  body,
  placement,
  targetRect,
  appWidth,
  stepIndex,
  totalSteps,
  isLast,
  onNext,
  onSkip,
}: {
  title: string;
  body: string;
  placement: "top" | "bottom";
  targetRect: Rect;
  appWidth: number;
  stepIndex: number;
  totalSteps: number;
  isLast: boolean;
  onNext: () => void;
  onSkip: () => void;
}) {
  const tooltipWidth = Math.min(320, appWidth - 32);
  const centerX = targetRect.left + targetRect.width / 2;
  let left = centerX - tooltipWidth / 2;
  left = Math.max(16, Math.min(left, appWidth - tooltipWidth - 16));

  const anchorY =
    placement === "bottom"
      ? targetRect.top + targetRect.height + TOOLTIP_GAP
      : targetRect.top - TOOLTIP_GAP;

  const arrowLeft = Math.max(20, Math.min(centerX - left - 8, tooltipWidth - 28));

  return (
    <div
      className="absolute"
      style={{
        zIndex: Z_INDEX + 3,
        left,
        width: tooltipWidth,
        top: anchorY,
        transform: placement === "top" ? "translateY(-100%)" : undefined,
      }}
      role="dialog"
      aria-labelledby="coach-mark-title"
      aria-describedby="coach-mark-body"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative rounded-2xl bg-white px-5 py-4 shadow-lg">
        {placement === "bottom" && (
          <div
            className="pointer-events-none absolute -top-[8px] h-0 w-0 border-x-8 border-b-8 border-x-transparent border-b-white"
            style={{ left: arrowLeft }}
            aria-hidden
          />
        )}

        <p className="text-xs tracking-widest text-muted-foreground mb-1">
          {stepIndex + 1} de {totalSteps}
        </p>
        <h3
          id="coach-mark-title"
          className="text-primary text-base font-bold leading-snug"
          style={{ fontFamily: "'Roboto Slab', sans-serif" }}
        >
          {title}
        </h3>
        <p id="coach-mark-body" className="mt-2 text-xs leading-[20px] text-foreground">
          {body}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <Button type="button" variant="link" size="none" className="text-xs text-muted-foreground" onClick={onSkip}>
            Omitir recorrido
          </Button>
          <Button type="button" variant="link" size="none" className="text-xs font-bold text-primary" onClick={onNext}>
            {isLast ? "Listo" : "Entendido"}
          </Button>
        </div>

        {placement === "top" && (
          <div
            className="pointer-events-none absolute -bottom-[8px] h-0 w-0 border-x-8 border-t-8 border-x-transparent border-t-white"
            style={{ left: arrowLeft }}
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}

export function CoachMarkOverlay({ requiresHome }: { requiresHome: boolean }) {
  const { tourStep, nextTourStep, skipTour } = useOnboarding();
  const step = TOUR_STEPS[tourStep];
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const tourVisible = Boolean(step && !(step.requiresHome && !requiresHome));
  const shellRect = useAppShellRect(tourVisible);

  useEffect(() => {
    if (!step) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [step]);

  useEffect(() => {
    if (!step || !shellRect) return;

    if (step.requiresHome && !requiresHome) {
      setTargetRect(null);
      return;
    }

    let attempts = 0;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      const shell = getAppShell();
      if (!shell) return;

      const box = shell.getBoundingClientRect();
      const rect = measureTarget(step.targetId, box.top, box.left);
      if (rect) {
        setTargetRect(rect);
        return;
      }
      if (attempts < 20) {
        attempts += 1;
        retryTimer = setTimeout(update, 100);
      }
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    return () => {
      if (retryTimer) clearTimeout(retryTimer);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [step, requiresHome, shellRect]);

  if (!step || !shellRect || (step.requiresHome && !requiresHome)) return null;

  const isLast = tourStep === TOUR_STEPS.length - 1;

  return createPortal(
    <div
      className="fixed overflow-hidden"
      style={{
        zIndex: Z_INDEX,
        top: shellRect.top,
        left: shellRect.left,
        width: shellRect.width,
        height: shellRect.height,
      }}
      aria-hidden={false}
    >
      <div className="relative h-full w-full">
        {targetRect ? (
          <>
            <div
              className="absolute inset-0"
              style={{ zIndex: Z_INDEX + 1 }}
              onClick={nextTourStep}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute rounded-[16px] ring-2 ring-white/90"
              style={{
                top: targetRect.top,
                left: targetRect.left,
                width: targetRect.width,
                height: targetRect.height,
                boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.55)",
                zIndex: Z_INDEX + 2,
              }}
            />
            <CoachMarkTooltip
              title={step.title}
              body={step.body}
              placement={step.placement}
              targetRect={targetRect}
              appWidth={shellRect.width}
              stepIndex={tourStep}
              totalSteps={TOUR_STEPS.length}
              isLast={isLast}
              onNext={nextTourStep}
              onSkip={skipTour}
            />
          </>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}

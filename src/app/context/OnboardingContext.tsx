import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  markOnboardingComplete,
  readOnboardingComplete,
  STORAGE_KEYS,
} from "../onboarding/constants";
import { TOUR_STEPS } from "../onboarding/tourSteps";

export type OnboardingPhase = "idle" | "setup" | "intro" | "tour" | "done";

interface OnboardingContextValue {
  phase: OnboardingPhase;
  setupStep: number;
  tourStep: number;
  notificationsEnabled: boolean;
  locationEnabled: boolean;
  enterApp: () => void;
  nextSetupStep: () => void;
  prevSetupStep: () => void;
  skipSetup: () => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setLocationEnabled: (enabled: boolean) => void;
  finishSetup: () => void;
  beginTourFromHome: () => void;
  startTour: () => void;
  nextTourStep: () => void;
  skipTour: () => void;
  replaySetup: () => void;
  replayTour: () => void;
  isTourActive: boolean;
  isSetupActive: boolean;
  isIntroActive: boolean;
}

const SETUP_STEP_COUNT = 3;

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

function readBool(key: string): boolean {
  return localStorage.getItem(key) === "true";
}

function writeBool(key: string, value: boolean) {
  localStorage.setItem(key, String(value));
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<OnboardingPhase>("idle");
  const [setupStep, setSetupStep] = useState(0);
  const [tourStep, setTourStep] = useState(0);
  const [notificationsEnabled, setNotificationsEnabledState] = useState(() =>
    readBool(STORAGE_KEYS.notificationsEnabled),
  );
  const [locationEnabled, setLocationEnabledState] = useState(() =>
    readBool(STORAGE_KEYS.locationEnabled),
  );

  const finishOnboarding = useCallback(() => {
    markOnboardingComplete();
    setPhase("done");
  }, []);

  const enterApp = useCallback(() => {
    if (readOnboardingComplete()) {
      setPhase("done");
      return;
    }
    setSetupStep(0);
    setTourStep(0);
    setPhase("setup");
  }, []);

  const startTour = useCallback(() => {
    writeBool(STORAGE_KEYS.setupComplete, true);
    setTourStep(0);
    setPhase("tour");
  }, []);

  const finishSetup = useCallback(() => {
    writeBool(STORAGE_KEYS.setupComplete, true);
    setPhase("intro");
  }, []);

  const beginTourFromHome = useCallback(() => {
    setTourStep(0);
    setPhase("tour");
  }, []);

  const nextSetupStep = useCallback(() => {
    setSetupStep((step) => {
      if (step >= SETUP_STEP_COUNT - 1) {
        finishSetup();
        return step;
      }
      return step + 1;
    });
  }, [finishSetup]);

  const prevSetupStep = useCallback(() => {
    setSetupStep((step) => Math.max(0, step - 1));
  }, []);

  const skipSetup = useCallback(() => {
    finishSetup();
  }, [finishSetup]);

  const nextTourStep = useCallback(() => {
    setTourStep((step) => {
      if (step >= TOUR_STEPS.length - 1) {
        writeBool(STORAGE_KEYS.tourComplete, true);
        finishOnboarding();
        return step;
      }
      return step + 1;
    });
  }, [finishOnboarding]);

  const skipTour = useCallback(() => {
    writeBool(STORAGE_KEYS.tourComplete, true);
    finishOnboarding();
  }, [finishOnboarding]);

  const replaySetup = useCallback(() => {
    setSetupStep(0);
    setPhase("setup");
  }, []);

  const replayTour = useCallback(() => {
    setTourStep(0);
    setPhase("tour");
  }, []);

  const setNotificationsEnabled = useCallback((enabled: boolean) => {
    setNotificationsEnabledState(enabled);
    writeBool(STORAGE_KEYS.notificationsEnabled, enabled);
  }, []);

  const setLocationEnabled = useCallback((enabled: boolean) => {
    setLocationEnabledState(enabled);
    writeBool(STORAGE_KEYS.locationEnabled, enabled);
  }, []);

  const value = useMemo<OnboardingContextValue>(
    () => ({
      phase,
      setupStep,
      tourStep,
      notificationsEnabled,
      locationEnabled,
      enterApp,
      nextSetupStep,
      prevSetupStep,
      skipSetup,
      setNotificationsEnabled,
      setLocationEnabled,
      finishSetup,
      beginTourFromHome,
      startTour,
      nextTourStep,
      skipTour,
      replaySetup,
      replayTour,
      isTourActive: phase === "tour",
      isSetupActive: phase === "setup",
      isIntroActive: phase === "intro",
    }),
    [
      phase,
      setupStep,
      tourStep,
      notificationsEnabled,
      locationEnabled,
      enterApp,
      nextSetupStep,
      prevSetupStep,
      skipSetup,
      setNotificationsEnabled,
      setLocationEnabled,
      finishSetup,
      beginTourFromHome,
      startTour,
      nextTourStep,
      skipTour,
      replaySetup,
      replayTour,
    ],
  );

  return (
    <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}

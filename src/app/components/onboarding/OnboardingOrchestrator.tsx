import { useEffect } from "react";
import { useOnboarding } from "../../context/OnboardingContext";
import { SetupWizard } from "./SetupWizard";
import { SetupIntroScreen } from "./SetupIntroScreen";
import { CoachMarkOverlay } from "./CoachMarkOverlay";
import type { Page } from "../BottomNav";

export function OnboardingOrchestrator({
  page,
  onNavigateHome,
}: {
  page: Page;
  onNavigateHome: () => void;
}) {
  const { phase, isSetupActive, isIntroActive, isTourActive } = useOnboarding();
  const isHome = page === "home";

  useEffect(() => {
    if (!isTourActive) return;
    onNavigateHome();
  }, [isTourActive, onNavigateHome]);

  if (phase === "idle" || phase === "done") return null;

  return (
    <>
      {isSetupActive && <SetupWizard />}
      {isIntroActive && <SetupIntroScreen onGoHome={onNavigateHome} />}
      {isTourActive && <CoachMarkOverlay requiresHome={isHome} />}
    </>
  );
}

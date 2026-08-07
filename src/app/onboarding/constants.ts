export const ONBOARDING_VERSION = "1";

export const STORAGE_KEYS = {
  complete: "migob-onboarding-complete",
  setupComplete: "migob-onboarding-setup-complete",
  tourComplete: "migob-onboarding-tour-complete",
  version: "migob-onboarding-version",
  notificationsEnabled: "migob-notifications-enabled",
  locationEnabled: "migob-location-enabled",
} as const;

export function readOnboardingComplete(): boolean {
  return localStorage.getItem(STORAGE_KEYS.complete) === "true";
}

export function markOnboardingComplete() {
  localStorage.setItem(STORAGE_KEYS.complete, "true");
  localStorage.setItem(STORAGE_KEYS.version, ONBOARDING_VERSION);
}

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Icon,
  type IconName,
  Button,
  Card,
  Badge,
  SearchInput,
  SectionLabel,
} from "./components/ui";
import { PageTransition } from "./components/PageTransition";
import { BOTTOM_NAV_ACTIVE, getNavDirection, type NavDirection } from "./motion/navigation";

import { NotificationsPage } from "./components/NotificationsPage";
import { AlertsPage } from "./components/AlertsPage";
import { AssistancePage } from "./components/AssistancePage";
import { FloatingAssistant, VIRTUAL_ASSISTANT_ENABLED } from "./components/FloatingAssistant";
import { DocumentsPage } from "./components/DocumentsPage";
import { ProfilePage, type ProfileSectionId } from "./components/ProfilePage";
import { TramitesServiciosPage } from "./components/TramitesServiciosPage";
import { PagoDeudasPage } from "./components/PagoDeudasPage";
import { AutorizacionesPage, BrowserFlowOverlay, generateClaveUnicaCode, type BrowserStep } from "./components/AutorizacionesPage";
import { AppSettingsPage } from "./components/AppSettingsPage";
import { WelcomePage } from "./components/WelcomePage";
import { ClaveUnicaLoginPage } from "./components/ClaveUnicaLoginPage";
import { TwoFactorPage } from "./components/TwoFactorPage";
import { BiometricAuth } from "./components/BiometricAuth";
import { FontSizeProvider } from "./context/FontSizeContext";
import { OnboardingProvider, useOnboarding } from "./context/OnboardingContext";
import { OnboardingOrchestrator } from "./components/onboarding/OnboardingOrchestrator";
import { BottomNav, Page } from "./components/BottomNav";
import { GobFranja } from "./components/GobFranja";
import { DeviceHomescreenOverlay } from "./components/DeviceHomescreenOverlay";
import { ReturnToAppSplash } from "./components/ReturnToAppSplash";
import { ExitAppSplash } from "./components/ExitAppSplash";
import { countUnreadAlerts, hasUnreadBuzon, ALERTS, BUZN_NOTIFICATIONS } from "./notificationsData";
import { AvisosPreviewSection } from "./components/AvisosPreviewSection";
import { NavCardRow } from "./components/NavCardRow";
import { BenefitHomeBanner } from "./components/beneficios/BenefitHomeBanner";
import { BeneficiosPage } from "./components/beneficios/BeneficiosPage";
import { DOCUMENTS } from "./components/DocumentsPage";
import { searchGlobalIndex, type GlobalSearchResult } from "./globalSearchIndex";
import { useThemeColor } from "./hooks/useThemeColor";
import { THEME_COLORS } from "./themeColors";
import type { OnboardingPhase } from "./context/OnboardingContext";

type AuthStep = "welcome" | "guest-lugares" | "claveunica" | "two-factor" | "app";

function resolveThemeColor(
  authStep: AuthStep,
  page: Page,
  onboardingPhase: OnboardingPhase,
): string {
  if (authStep !== "app") return THEME_COLORS.light;
  if (onboardingPhase !== "idle" && onboardingPhase !== "done") return THEME_COLORS.light;
  if (page === "home") return THEME_COLORS.home;
  return THEME_COLORS.light;
}

const MY_DOCUMENTS = DOCUMENTS;

const QUICK_LINKS: { icon: IconName; label: string; page: Page }[] = [
  { icon: "domain", label: "Sucursales de atención", page: "lugares" },
  { icon: "account_balance", label: "Pago de deudas con el Estado", page: "pago-deudas" },
  { icon: "verified_user", label: "Mi actividad ClaveÚnica", page: "autorizaciones" },
];

function HomeHeaderAction({
  icon,
  label,
  onClick,
  badgeCount,
  tourId,
  ariaLabel,
}: {
  icon: IconName;
  label: string;
  onClick: () => void;
  badgeCount?: number;
  tourId?: string;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-tour-id={tourId}
      aria-label={ariaLabel}
      className="relative flex min-h-[44px] flex-col items-center justify-center gap-0 border-0 bg-transparent p-0 text-white"
    >
      <Icon name={icon} size={24} className="text-white" />
      {badgeCount != null && badgeCount > 0 && (
        <span className="absolute left-[22px] top-[6px] flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#fdc700] px-1 text-[8px] font-bold text-[#101828]">
          {badgeCount}
        </span>
      )}
      <span className="text-[10px] font-normal leading-normal">{label}</span>
    </button>
  );
}

function HomePage({
  onNavigate,
  onOpenNotification,
  onOpenDocument,
  onOpenProfileTarget,
  onOpenBenefit,
  onOpenAlerts,
  onOpenClaveUnicaVerification,
  alertUnreadCount,
  buzonHasUnread,
}: {
  onNavigate: (page: Page) => void;
  onOpenNotification: (id: number) => void;
  onOpenDocument: (documentId: number) => void;
  onOpenProfileTarget: (sectionId: ProfileSectionId, highlight?: string) => void;
  onOpenBenefit: (benefitId?: string) => void;
  onOpenAlerts: () => void;
  onOpenClaveUnicaVerification: (code: string) => void;
  alertUnreadCount: number;
  buzonHasUnread: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [showHomescreen, setShowHomescreen] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const [browserStep, setBrowserStep] = useState<BrowserStep>("landing");
  const [showBrowserNotification, setShowBrowserNotification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("123456");
  const [showReturnSplash, setShowReturnSplash] = useState(false);
  const [showExitSplash, setShowExitSplash] = useState(false);

  const filteredResults = searchGlobalIndex(searchQuery);
  const showSearchResults = searchFocused && searchQuery.trim().length > 0;

  function handleSearchResultClick(result: GlobalSearchResult) {
    setSearchFocused(false);
    setSearchQuery("");
    if (result.notificationId != null) {
      onOpenNotification(result.notificationId);
      return;
    }
    if (result.documentId != null) {
      onOpenDocument(result.documentId);
      return;
    }
    if (result.profileSectionId != null) {
      onOpenProfileTarget(result.profileSectionId, result.profileHighlight);
      return;
    }
    if (result.benefitId != null) {
      onOpenBenefit(result.benefitId);
      return;
    }
    onNavigate(result.page);
  }

  function handleExitApp() {
    setShowHomescreen(false);
    setBrowserStep("landing");
    setShowBrowserNotification(false);
    setShowExitSplash(true);
  }

  function handleExitSplashFinish() {
    setShowBrowser(true);
  }

  useEffect(() => {
    if (!showBrowser || !showExitSplash) return;
    const id = requestAnimationFrame(() => setShowExitSplash(false));
    return () => cancelAnimationFrame(id);
  }, [showBrowser, showExitSplash]);

  function handleSafariClick() {
    setBrowserStep("landing");
    setShowBrowserNotification(false);
    setShowBrowser(true);
  }

  function handleCloseBrowser() {
    setShowBrowser(false);
    setBrowserStep("landing");
    setShowBrowserNotification(false);
  }

  function handleGenerateCode() {
    setVerificationCode(generateClaveUnicaCode());
    setShowBrowserNotification(true);
  }

  function handleBrowserNotificationClick() {
    setShowBrowser(false);
    setBrowserStep("landing");
    setShowBrowserNotification(false);
    setShowHomescreen(false);
    setShowReturnSplash(true);
  }

  function handleReturnSplashFinish() {
    setShowReturnSplash(false);
    onOpenClaveUnicaVerification(verificationCode);
  }

  function handleMiGobClick() {
    setShowBrowser(false);
    setBrowserStep("landing");
    setShowBrowserNotification(false);
    setShowHomescreen(false);
  }

  return (
    <div className="relative flex min-h-screen w-full max-w-[390px] flex-col bg-[#01084d]">
      {showSearchResults && (
        <div
          className="absolute inset-0 z-[15] bg-[rgba(51,51,51,0.4)]"
          aria-hidden="true"
          onMouseDown={(e) => {
            e.preventDefault();
            setSearchFocused(false);
          }}
        />
      )}

      {/* Header oscuro */}
      <div className="relative z-20 shrink-0">
        <GobFranja onClick={handleExitApp} />

        <div className="flex items-center justify-between px-4 pb-2 pt-4">
          <span
            className="text-[21px] font-bold leading-[31.5px] text-white"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            MiGob
          </span>
          <div className="flex items-center gap-2">
            <HomeHeaderAction
              icon="support_agent"
              label="Asistencia"
              onClick={() => onNavigate("assistance")}
              ariaLabel="Asistencia"
            />
            <HomeHeaderAction
              icon="notifications"
              label="Alertas"
              onClick={onOpenAlerts}
              badgeCount={alertUnreadCount}
              tourId="tour-alerts"
              ariaLabel="Alertas y recordatorios"
            />
          </div>
        </div>

        <div className="px-4 pb-4">
          <p className="text-[12px] tracking-[1.1px] text-white">Buenos días</p>
          <h1
            className="text-[24px] font-medium text-white"
            style={{ fontFamily: "'Roboto Slab', sans-serif" }}
          >
            María Valenzuela
          </h1>
        </div>
      </div>

      {/* Panel de contenido gris */}
      <div className="flex min-h-0 flex-1 flex-col rounded-t-[16px] bg-[#f2f2f2]">
        <div className="relative z-20 shrink-0 rounded-t-[16px] border-b border-[#e6e6e6] bg-white p-4">
          <div className="relative" data-tour-id="tour-search">
            <SearchInput
              placeholder="Buscar en toda la aplicación..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
              onClear={() => setSearchQuery("")}
              clearLabel="Borrar"
              padding="lg"
              className="h-[50px] py-3"
            />
          </div>

          {showSearchResults && (
            <Card
              variant="elevated"
              className="absolute left-4 right-4 top-full z-30 mt-2 max-h-72 shadow-lg"
              overflow="auto"
            >
              {filteredResults.length === 0 ? (
                <p className="px-4 py-3 text-[12px] text-muted-foreground">
                  Sin resultados para "{searchQuery}"
                </p>
              ) : (
                filteredResults.map((r) => (
                  <Button
                    key={r.id}
                    onClick={() => handleSearchResultClick(r)}
                    variant="list-row"
                    size="none"
                    className="flex items-start gap-3 border-b border-border px-4 py-2.5 last:border-b-0"
                  >
                    <Badge variant="info" size="sm" weight="medium" className="mt-0.5">
                      {r.type}
                    </Badge>
                    <div className="min-w-0">
                      <p className="text-[12px] text-foreground">{r.label}</p>
                      {r.sub && (
                        <p className="truncate text-[12px] text-muted-foreground">{r.sub}</p>
                      )}
                    </div>
                  </Button>
                ))
              )}
            </Card>
          )}
        </div>

        <div className="flex-1 overflow-y-auto pb-6">
          <BenefitHomeBanner onNavigate={() => onOpenBenefit()} />

          <section className="px-4 pb-2 pt-2">
            <SectionLabel className="pb-2 pt-2">Mis documentos</SectionLabel>
            <Card variant="elevated" data-tour-id="tour-documents-shortcut">
              <NavCardRow
                icon="description"
                title="Ver mis documentos"
                subtitle={`${MY_DOCUMENTS.length} documentos disponibles`}
                onClick={() => onNavigate("documents")}
              />
            </Card>
          </section>

          <section className="px-4 pb-2 pt-2">
            <SectionLabel className="pb-2 pt-2">Explorar</SectionLabel>
            <Card variant="elevated" divided>
              {QUICK_LINKS.map(({ icon, label, page: linkPage }) => (
                <NavCardRow
                  key={label}
                  icon={icon}
                  title={label}
                  onClick={() => onNavigate(linkPage)}
                />
              ))}
            </Card>
          </section>

          <AvisosPreviewSection onNavigate={onNavigate} onOpenNotification={onOpenNotification} />
        </div>
      </div>

      {showHomescreen &&
        createPortal(
          <DeviceHomescreenOverlay
            showPushNotification={false}
            onSafariClick={handleSafariClick}
            onMiGobClick={handleMiGobClick}
          />,
          document.body,
        )}

      {showBrowser &&
        createPortal(
          <BrowserFlowOverlay
            step={browserStep}
            showNotification={showBrowserNotification}
            onClose={handleCloseBrowser}
            onLogin={() => setBrowserStep("login")}
            onIngresa={() => setBrowserStep("identity")}
            onGenerateCode={handleGenerateCode}
            onNotificationClick={handleBrowserNotificationClick}
          />,
          document.body,
        )}

      {showReturnSplash &&
        createPortal(
          <ReturnToAppSplash onFinish={handleReturnSplashFinish} />,
          document.body,
        )}

      {showExitSplash &&
        createPortal(
          <ExitAppSplash onFinish={handleExitSplashFinish} />,
          document.body,
        )}
    </div>
  );
}

export default function App() {
  return (
    <FontSizeProvider>
      <OnboardingProvider>
        <AppShell />
      </OnboardingProvider>
    </FontSizeProvider>
  );
}

function AppShell() {
  const { enterApp, phase } = useOnboarding();
  const [authStep, setAuthStep] = useState<AuthStep>("welcome");
  const [authNavDirection, setAuthNavDirection] = useState<NavDirection>("forward");
  const [page, setPage] = useState<Page>("home");
  const [navDirection, setNavDirection] = useState<NavDirection>("forward");
  const [showBiometric, setShowBiometric] = useState(false);
  const [pendingNotificationId, setPendingNotificationId] = useState<number | null>(null);
  const [pendingDocumentId, setPendingDocumentId] = useState<number | null>(null);
  const [pendingProfileSectionId, setPendingProfileSectionId] = useState<ProfileSectionId | null>(null);
  const [pendingProfileHighlight, setPendingProfileHighlight] = useState<string | null>(null);
  const [pendingBenefitId, setPendingBenefitId] = useState<string | null>(null);
  const [pendingVerificationCode, setPendingVerificationCode] = useState<string | null>(null);

  const alertUnreadCount = countUnreadAlerts(ALERTS);
  const buzonHasUnread = hasUnreadBuzon(BUZN_NOTIFICATIONS);

  useThemeColor(resolveThemeColor(authStep, page, phase));

  function navigateTo(nextPage: Page) {
    if (nextPage === page) return;
    setNavDirection(getNavDirection(page, nextPage));
    setPage(nextPage);
  }

  function navigateBack(target: Page = "home") {
    setNavDirection("back");
    setPage(target);
  }

  function navigateAuthTo(step: "guest-lugares") {
    setAuthNavDirection("forward");
    setAuthStep(step);
  }

  function navigateAuthBack() {
    setAuthNavDirection("back");
    setAuthStep("welcome");
  }

  function handleOpenNotification(id: number) {
    setPendingNotificationId(id);
    navigateTo("notifications");
  }

  function handleOpenBuzonFromAlert(buzonId: number) {
    setPendingNotificationId(buzonId);
    navigateTo("notifications");
  }

  function handleOpenAlerts() {
    navigateTo("alerts");
  }

  function handleOpenDocument(documentId: number) {
    setPendingDocumentId(documentId);
    navigateTo("documents");
  }

  function handleOpenProfileTarget(sectionId: ProfileSectionId, highlight?: string) {
    setPendingProfileSectionId(sectionId);
    setPendingProfileHighlight(highlight ?? null);
    if (page !== "profile") {
      navigateTo("profile");
    }
  }

  function handleOpenBenefit(benefitId?: string) {
    setPendingBenefitId(benefitId ?? null);
    navigateTo("beneficios");
  }

  function handleOpenClaveUnicaVerification(code: string) {
    setPendingVerificationCode(code);
    navigateTo("autorizaciones");
  }

  function handleEnterApp() {
    setAuthStep("app");
    enterApp();
  }

  function handleLogout() {
    setNavDirection("back");
    setAuthNavDirection("back");
    setPage("home");
    setAuthStep("welcome");
    setShowBiometric(false);
  }

  return (
    <div className="min-h-screen bg-background flex justify-center items-start">
      {(authStep === "welcome" || authStep === "guest-lugares") && (
        <>
          <PageTransition pageKey={authStep} direction={authNavDirection}>
            {authStep === "welcome" && (
              <WelcomePage
                onLogin={() => setAuthStep("claveunica")}
                onBiometric={() => setShowBiometric(true)}
                onLugares={() => navigateAuthTo("guest-lugares")}
              />
            )}
            {authStep === "guest-lugares" && (
              <TramitesServiciosPage
                variant="guest"
                onBack={navigateAuthBack}
              />
            )}
          </PageTransition>
          {showBiometric && authStep === "welcome" && (
            <BiometricAuth
              successSubtitle="Accediendo a la aplicación…"
              onCancel={() => setShowBiometric(false)}
              onSuccess={() => {
                setShowBiometric(false);
                handleEnterApp();
              }}
            />
          )}
        </>
      )}
      {authStep === "claveunica" && (
        <ClaveUnicaLoginPage onSuccess={() => setAuthStep("two-factor")} onBack={() => setAuthStep("welcome")} />
      )}
      {authStep === "two-factor" && (
        <TwoFactorPage
          onSuccess={handleEnterApp}
          onBack={() => setAuthStep("claveunica")}
        />
      )}
      {authStep === "app" && (
        <>
          <div className="relative w-full max-w-[390px]" data-app-shell>
            <PageTransition
              pageKey={page}
              direction={navDirection}
              reserveBottomNav={BOTTOM_NAV_ACTIVE[page] != null}
            >
            {page === "home" && (
              <HomePage
                onNavigate={navigateTo}
                onOpenNotification={handleOpenNotification}
                onOpenDocument={handleOpenDocument}
                onOpenProfileTarget={handleOpenProfileTarget}
                onOpenBenefit={handleOpenBenefit}
                onOpenAlerts={handleOpenAlerts}
                onOpenClaveUnicaVerification={handleOpenClaveUnicaVerification}
                alertUnreadCount={alertUnreadCount}
                buzonHasUnread={buzonHasUnread}
              />
            )}
            {page === "alerts" && (
              <AlertsPage
                onBack={() => navigateBack()}
                onNavigate={navigateTo}
                onOpenBuzonNotification={handleOpenBuzonFromAlert}
                onOpenDocument={handleOpenDocument}
                onOpenBenefit={handleOpenBenefit}
              />
            )}
            {page === "notifications" && (
              <NotificationsPage
                onBack={() => navigateBack()}
                onNavigate={navigateTo}
                onOpenClaveUnicaVerification={handleOpenClaveUnicaVerification}
                onOpenBenefit={handleOpenBenefit}
                initialSelectedId={pendingNotificationId}
                onInitialSelectedConsumed={() => setPendingNotificationId(null)}
                buzonHasUnread={buzonHasUnread}
              />
            )}
            {page === "assistance" && (
              <AssistancePage onBack={() => navigateBack()} onNavigate={navigateTo} />
            )}
            {page === "documents" && (
              <DocumentsPage
                onBack={() => navigateBack()}
                onNavigate={navigateTo}
                initialDocumentId={pendingDocumentId}
                onInitialDocumentConsumed={() => setPendingDocumentId(null)}
              />
            )}
            {page === "profile" && (
              <ProfilePage
                onBack={() => navigateBack()}
                onLogout={handleLogout}
                onNavigate={navigateTo}
                onOpenDocument={handleOpenDocument}
                initialProfileSectionId={pendingProfileSectionId}
                initialProfileHighlight={pendingProfileHighlight}
                onInitialProfileTargetConsumed={() => {
                  setPendingProfileSectionId(null);
                  setPendingProfileHighlight(null);
                }}
              />
            )}
            {page === "beneficios" && (
              <BeneficiosPage
                onBack={() => navigateBack()}
                initialBenefitId={pendingBenefitId}
                onInitialTargetsConsumed={() => setPendingBenefitId(null)}
                onOpenNotification={handleOpenNotification}
              />
            )}
            {page === "lugares" && (
              <TramitesServiciosPage onBack={() => navigateBack()} onNavigate={navigateTo} />
            )}
            {page === "pago-deudas" && (
              <PagoDeudasPage onBack={() => navigateBack()} onNavigate={navigateTo} />
            )}
            {page === "autorizaciones" && (
              <AutorizacionesPage
                onBack={() => navigateBack()}
                onNavigate={navigateTo}
                pendingVerificationCode={pendingVerificationCode}
                onPendingVerificationConsumed={() => setPendingVerificationCode(null)}
              />
            )}
            {page === "settings" && (
              <AppSettingsPage onBack={() => navigateBack("profile")} />
            )}
            </PageTransition>
            {BOTTOM_NAV_ACTIVE[page] && (
              <BottomNav
                active={BOTTOM_NAV_ACTIVE[page]!}
                onNavigate={navigateTo}
                buzonHasUnread={buzonHasUnread}
              />
            )}
          </div>
          {VIRTUAL_ASSISTANT_ENABLED && <FloatingAssistant />}
          <OnboardingOrchestrator page={page} onNavigateHome={() => navigateTo("home")} />
        </>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Icon,
  type IconName,
  Button,
  Card,
  Badge,
  SearchInput,
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
import { DOCUMENTS } from "./components/DocumentsPage";
import { searchGlobalIndex, type GlobalSearchResult } from "./globalSearchIndex";

type AuthStep = "welcome" | "guest-lugares" | "claveunica" | "two-factor" | "app";

const MY_DOCUMENTS = DOCUMENTS;

const QUICK_LINKS: { icon: IconName; label: string; page: Page }[] = [
  { icon: "domain", label: "Sucursales de atención", page: "lugares" },
  { icon: "account_balance", label: "Pago de deudas con el Estado", page: "pago-deudas" },
  { icon: "verified_user", label: "Mi actividad ClaveÚnica", page: "autorizaciones" },
];

function HomePage({
  onNavigate,
  onOpenNotification,
  onOpenDocument,
  onOpenProfileTarget,
  onOpenAlerts,
  onOpenClaveUnicaVerification,
  alertUnreadCount,
  buzonHasUnread,
}: {
  onNavigate: (page: Page) => void;
  onOpenNotification: (id: number) => void;
  onOpenDocument: (id: number) => void;
  onOpenProfileTarget: (sectionId: ProfileSectionId, highlight?: string) => void;
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

  function handleSearchResultClick(result: GlobalSearchResult) {
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
    <div className="w-full max-w-[390px] min-h-screen bg-[#ffffff] flex flex-col relative">
      {/* Header producto — blanco con franja chilena */}
      <div className="bg-white border-b border-[#e6e6e6] relative">
        <GobFranja onClick={handleExitApp} />

        {/* Barra principal */}
        <div className="flex items-center justify-between px-[16px] pt-[36px] pb-[8px]">
          <span className="text-[#333] text-[21px] font-weight: 900" style={{ fontFamily: "'gobCL_Heavy', 'Roboto', sans-serif" }}><span className=""><span className=""><span className="font-bold">MiGob</span></span></span></span>
          <div className="flex items-center gap-1">
            <Button
              onClick={() => onNavigate("assistance")}
              variant="icon"
              size="icon-lg"
              className="text-primary shrink-0"
              aria-label="Asistencia"
            >
              <Icon name="support_agent" size={24} className="inline-flex items-center justify-center" />
            </Button>
            <Button
              onClick={onOpenAlerts}
              variant="icon"
              size="icon-lg"
              className="relative text-primary shrink-0"
              aria-label="Alertas y recordatorios"
              data-tour-id="tour-alerts"
            >
              <Icon name="notifications" size={24} className="inline-flex items-center justify-center" />
              {alertUnreadCount > 0 && (
                <span className="absolute top-[6px] right-[6px] min-w-[16px] h-4 px-1 bg-[#fdc700] text-[#101828] text-[9px] font-bold rounded-full flex items-center justify-center">
                  {alertUnreadCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Buenos días + nombre */}
        <div className="px-4 pb-5 pt-2">
          <p className="text-[11px] tracking-widest text-[#666]">Buenos días</p>
          <h1 className="mt-0.5 text-[#333] text-[24px] font-medium" style={{ fontFamily: "'Roboto Slab', sans-serif" }}>
            María Valenzuela
          </h1>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-4 bg-white border-b border-[#e6e6e6] relative z-10">
        <div className="relative" data-tour-id="tour-search">
          <SearchInput
            placeholder="Buscar en toda la aplicación..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
            padding="lg"
          />
        </div>

        {searchFocused && searchQuery.trim() && (
          <Card className="absolute left-4 right-4 top-full mt-2 z-20 max-h-72" shadow="md" overflow="auto">
            {filteredResults.length === 0 ? (
              <p className="px-4 py-3 text-[12px] text-muted-foreground">Sin resultados para "{searchQuery}"</p>
            ) : (
              filteredResults.map((r) => (
                <Button
                  key={r.id}
                  onClick={() => handleSearchResultClick(r)}
                  variant="list-row"
                  size="none"
                  className="flex items-start gap-3 px-4 py-2.5 border-b border-border last:border-b-0"
                >
                  <Badge variant="info" size="sm" weight="medium" className="mt-0.5">
                    {r.type}
                  </Badge>
                  <div className="min-w-0">
                    <p className="text-[12px] text-foreground">{r.label}</p>
                    {r.sub && <p className="text-[10px] text-muted-foreground truncate">{r.sub}</p>}
                  </div>
                </Button>
              ))
            )}
          </Card>
        )}
      </div>

      {/* My Documents shortcut */}
      <section className="px-4 pt-5 pb-2">
        <p className="text-[10px] tracking-widest text-muted-foreground mb-3">Mis documentos</p>
        <Card data-tour-id="tour-documents-shortcut">
          <NavCardRow
            icon="description"
            title="Ver mis documentos"
            subtitle={`${MY_DOCUMENTS.length} documentos disponibles`}
            onClick={() => onNavigate("documents")}
          />
        </Card>
      </section>

      {/* Explorar — vertical list */}
      <section className="px-4 pt-5 pb-2">
        <p className="text-[10px] tracking-widest text-muted-foreground mb-3">Explorar</p>
        <Card divided>
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
  const { enterApp } = useOnboarding();
  const [authStep, setAuthStep] = useState<AuthStep>("welcome");
  const [authNavDirection, setAuthNavDirection] = useState<NavDirection>("forward");
  const [page, setPage] = useState<Page>("home");
  const [navDirection, setNavDirection] = useState<NavDirection>("forward");
  const [showBiometric, setShowBiometric] = useState(false);
  const [pendingNotificationId, setPendingNotificationId] = useState<number | null>(null);
  const [pendingDocumentId, setPendingDocumentId] = useState<number | null>(null);
  const [pendingProfileSectionId, setPendingProfileSectionId] = useState<ProfileSectionId | null>(null);
  const [pendingProfileHighlight, setPendingProfileHighlight] = useState<string | null>(null);
  const [pendingVerificationCode, setPendingVerificationCode] = useState<string | null>(null);

  const alertUnreadCount = countUnreadAlerts(ALERTS);
  const buzonHasUnread = hasUnreadBuzon(BUZN_NOTIFICATIONS);

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
              />
            )}
            {page === "notifications" && (
              <NotificationsPage
                onBack={() => navigateBack()}
                onNavigate={navigateTo}
                onOpenClaveUnicaVerification={handleOpenClaveUnicaVerification}
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

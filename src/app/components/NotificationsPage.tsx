import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon, Button, SearchInput } from "./ui";
import { AppliedFilterPills } from "./AppliedFilterPills";
import {
  CheckRow,
  ClearFiltersButton,
  FilterSection,
  FilterSheet,
  RadioRow,
} from "./FilterSheet";
import { Page } from "./BottomNav";
import { InteriorPageLayout } from "./InteriorPageLayout";
import { getBuzonNotifications, type Notification } from "../notificationsData";
import {
  AVISO_CATEGORY_BADGE,
  AVISO_CATEGORY_LABEL,
  AVISO_FILTER_CATEGORIES,
  AVISO_READ_FILTERS,
  type AvisoCategory,
  type AvisoReadFilter,
} from "../notificationCategories";
import { AvisoItem } from "./AvisoItem";
import {
  DeviceHomescreenOverlay,
  PUSH_NOTIFICATION_ID,
} from "./DeviceHomescreenOverlay";
import { ReturnToAppSplash } from "./ReturnToAppSplash";
import { ExitAppSplash } from "./ExitAppSplash";
import { NotificationDetailModal } from "./NotificationDetailModal";
import {
  BrowserFlowOverlay,
  generateClaveUnicaCode,
  type BrowserStep,
} from "./AutorizacionesPage";

export type { Notification } from "../notificationsData";

function toggleCategorySet(
  set: Set<AvisoCategory>,
  setFn: (s: Set<AvisoCategory>) => void,
  val: AvisoCategory,
) {
  const next = new Set(set);
  if (next.has(val)) next.delete(val);
  else next.add(val);
  setFn(next);
}

export function NotificationsPage({
  onBack,
  onNavigate,
  onOpenClaveUnicaVerification,
  onOpenBenefit,
  initialSelectedId = null,
  onInitialSelectedConsumed,
  buzonHasUnread = false,
}: {
  onBack: () => void;
  onNavigate: (page: Page) => void;
  onOpenClaveUnicaVerification: (code: string) => void;
  onOpenBenefit?: (benefitId: string) => void;
  initialSelectedId?: number | null;
  onInitialSelectedConsumed?: () => void;
  buzonHasUnread?: boolean;
}) {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [readFilter, setReadFilter] = useState<AvisoReadFilter>("all");
  const [categoryFilters, setCategoryFilters] = useState<Set<AvisoCategory>>(new Set());
  const [notifications, setNotifications] = useState(getBuzonNotifications);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showDeviceHomescreen, setShowDeviceHomescreen] = useState(false);
  const [showDevicePushNotification, setShowDevicePushNotification] = useState(false);
  const [showReturnSplash, setShowReturnSplash] = useState(false);
  const [showExitSplash, setShowExitSplash] = useState(false);
  const [pendingVerificationNavigation, setPendingVerificationNavigation] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const [browserStep, setBrowserStep] = useState<BrowserStep>("landing");
  const [showBrowserNotification, setShowBrowserNotification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("123456");

  const activeFilterCount =
    (readFilter !== "all" ? 1 : 0) + categoryFilters.size;

  const filtered = notifications.filter((n) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      n.title.toLowerCase().includes(q) ||
      n.body.toLowerCase().includes(q) ||
      n.detail.toLowerCase().includes(q);
    const matchRead =
      readFilter === "all" ||
      (readFilter === "unread" && !n.read) ||
      (readFilter === "read" && n.read);
    const matchCategory =
      categoryFilters.size === 0 || categoryFilters.has(n.category);
    return matchSearch && matchRead && matchCategory;
  });

  function clearFilters() {
    setReadFilter("all");
    setCategoryFilters(new Set());
  }

  function removeCategoryFilter(key: AvisoCategory) {
    setCategoryFilters((prev) => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  }

  const unreadCount = notifications.filter((n) => !n.read).length;
  const selectedNotif =
    selectedId !== null ? notifications.find((n) => n.id === selectedId) ?? null : null;

  function openNotification(id: number) {
    setSelectedId(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }

  function handleExitApp() {
    setShowDeviceHomescreen(false);
    setShowDevicePushNotification(false);
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
    setShowDeviceHomescreen(false);
    setShowDevicePushNotification(false);
    setPendingVerificationNavigation(true);
    setShowReturnSplash(true);
  }

  function handleMiGobClick() {
    setShowBrowser(false);
    setBrowserStep("landing");
    setShowBrowserNotification(false);
    setShowDeviceHomescreen(false);
    setShowDevicePushNotification(false);
  }

  function handleDevicePushClick() {
    setShowReturnSplash(true);
    setShowDeviceHomescreen(false);
    setShowDevicePushNotification(false);
    setShowBrowser(false);
  }

  function handleReturnSplashFinish() {
    setShowReturnSplash(false);
    if (pendingVerificationNavigation) {
      setPendingVerificationNavigation(false);
      onOpenClaveUnicaVerification(verificationCode);
      return;
    }
    openNotification(PUSH_NOTIFICATION_ID);
  }

  useEffect(() => {
    if (!showDeviceHomescreen || showBrowser) return;
    const timer = setTimeout(() => setShowDevicePushNotification(true), 1400);
    return () => clearTimeout(timer);
  }, [showDeviceHomescreen, showBrowser]);

  useEffect(() => {
    if (initialSelectedId == null) return;
    setSelectedId(initialSelectedId);
    setNotifications((prev) =>
      prev.map((n) => (n.id === initialSelectedId ? { ...n, read: true } : n)),
    );
    onInitialSelectedConsumed?.();
  }, [initialSelectedId, onInitialSelectedConsumed]);

  return (
    <>
      <InteriorPageLayout
        onBack={onBack}
        onFranjaClick={handleExitApp}
        title="Notificaciones del Estado"
        titleExtra={
          unreadCount > 0 ? (
            <span className="shrink-0 text-xs font-bold tracking-[1.2px] text-positive">
              {unreadCount} no leído
            </span>
          ) : undefined
        }
        description="Aquí encontrarás las notificaciones oficiales que los servicios públicos te envían por MiGob."
        toolbar={
          <div className="flex items-center gap-2">
            <SearchInput
              wrapperClassName="min-w-0 flex-1"
              placeholder="Buscar notificaciones..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-[50px] py-3"
            />
            <Button
              type="button"
              onClick={() => setShowFilters(true)}
              variant={activeFilterCount > 0 ? "toggle-active" : "toggle-trigger"}
              size="none"
              className="shrink-0"
              aria-label="Filtrar notificaciones"
            >
              <Icon name="tune" size={16} />
              {activeFilterCount > 0 ? `Filtros (${activeFilterCount})` : "Filtrar"}
            </Button>
          </div>
        }
      >
        <AppliedFilterPills
          className="bg-muted"
          filters={[
            ...(readFilter !== "all"
              ? [{
                  id: `read-${readFilter}`,
                  label: AVISO_READ_FILTERS.find((f) => f.key === readFilter)?.label ?? readFilter,
                  onRemove: () => setReadFilter("all"),
                }]
              : []),
            ...[...categoryFilters].map((key) => ({
              id: `cat-${key}`,
              label: AVISO_CATEGORY_LABEL[key],
              onRemove: () => removeCategoryFilter(key),
            })),
          ]}
        />

        {(search || activeFilterCount > 0) && (
          <div className="shrink-0 px-4 py-2">
            <p className="type-label-section text-muted-foreground">
              {filtered.length} notificación{filtered.length !== 1 ? "es" : ""}
            </p>
          </div>
        )}

        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4 pb-6 pt-2">
          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-xs text-muted-foreground">
                {search || activeFilterCount > 0
                  ? "Sin notificaciones para los filtros aplicados."
                  : "No tienes notificaciones por ahora."}
              </p>
            </div>
          ) : (
            filtered.map((n) => (
              <AvisoItem key={n.id} notif={n} onOpen={() => openNotification(n.id)} />
            ))
          )}
        </div>
      </InteriorPageLayout>

      <NotificationDetailModal
        open={selectedId !== null}
        notif={selectedNotif}
        onClose={() => setSelectedId(null)}
        showTypeBadge
        badgeLabel={
          selectedNotif ? AVISO_CATEGORY_LABEL[selectedNotif.category] : undefined
        }
        badgeStyle={
          selectedNotif ? AVISO_CATEGORY_BADGE[selectedNotif.category] : undefined
        }
        secondaryActionLabel="Ver en Mis beneficios"
        onSecondaryAction={
          selectedNotif?.relatedBenefitId && onOpenBenefit
            ? () => {
                const benefitId = selectedNotif.relatedBenefitId!;
                setSelectedId(null);
                onOpenBenefit(benefitId);
              }
            : undefined
        }
      />

      <FilterSheet
        open={showFilters}
        title="Filtrar notificaciones"
        onClose={() => setShowFilters(false)}
      >
        <FilterSection label="Estado">
          {AVISO_READ_FILTERS.map(({ key, label }) => (
            <RadioRow
              key={key}
              label={label}
              checked={readFilter === key}
              onChange={() => setReadFilter(key)}
            />
          ))}
        </FilterSection>
        <FilterSection label="Tipo">
          {AVISO_FILTER_CATEGORIES.map(({ key, label }) => (
            <CheckRow
              key={key}
              label={label}
              checked={categoryFilters.has(key)}
              onChange={() => toggleCategorySet(categoryFilters, setCategoryFilters, key)}
            />
          ))}
        </FilterSection>
        {activeFilterCount > 0 && (
          <ClearFiltersButton onClick={clearFilters} />
        )}
      </FilterSheet>

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

      {showDeviceHomescreen &&
        createPortal(
          <DeviceHomescreenOverlay
            showPushNotification={showDevicePushNotification && !showBrowser}
            onPushNotificationClick={handleDevicePushClick}
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

    </>
  );
}

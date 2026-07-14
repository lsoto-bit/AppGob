import { useState } from "react";
import { FileText, Search, ChevronRight, Building2, Landmark, ShieldCheck, Settings } from "lucide-react";

import { NotificationsPage } from "./components/NotificationsPage";
import { NotificationSettingsPage } from "./components/NotificationSettingsPage";
import { AssistancePage } from "./components/AssistancePage";
import { FloatingAssistant } from "./components/FloatingAssistant";
import { DocumentsPage } from "./components/DocumentsPage";
import { ProfilePage } from "./components/ProfilePage";
import { TramitesServiciosPage } from "./components/TramitesServiciosPage";
import { PagoDeudasPage } from "./components/PagoDeudasPage";
import { AutorizacionesPage } from "./components/AutorizacionesPage";
import { AppSettingsPage } from "./components/AppSettingsPage";
import { WelcomePage } from "./components/WelcomePage";
import { ClaveUnicaLoginPage } from "./components/ClaveUnicaLoginPage";
import { TwoFactorPage } from "./components/TwoFactorPage";
import { BiometricAuth } from "./components/BiometricAuth";
import { FontSizeProvider } from "./context/FontSizeContext";
import { BottomNav, Page } from "./components/BottomNav";
import { NOTIF_TYPE_BADGE, NOTIF_TYPE_LABEL } from "./notificationCategories";
import { getHomeNotifications } from "./notificationsData";

type AuthStep = "welcome" | "guest-lugares" | "claveunica" | "two-factor" | "app";

const MY_DOCUMENTS = [
  { id: 1, name: "Cédula de identidad", status: "Vigente", expiry: "Jun 2028" },
  { id: 2, name: "Credencial de discapacidad digital", status: "Vigente", expiry: "Jun 2028" },
  { id: 3, name: "Certificado de afiliación FONASA", status: "Vigente", expiry: "Permanente" },
  { id: 4, name: "Certificado de nacimiento", status: "Vigente", expiry: "Sin vencimiento" },
  { id: 5, name: "Certificado de matrimonio", status: "Vigente", expiry: "Sin vencimiento" },
  { id: 6, name: "Receta electrónica — 14 jun 2026", status: "Vigente", expiry: "14 Jul 2026" },
  { id: 7, name: "Receta electrónica — 02 may 2026", status: "Por vencer", expiry: "02 Jun 2026" },
];

interface SearchEntry {
  type: string;
  label: string;
  sub?: string;
  page: Page;
  pageTab?: string;
}

const GLOBAL_INDEX: SearchEntry[] = [
  // Documentos
  { type: "Documento", label: "Cédula de identidad", sub: "RUN 14.582.301-K · Vigente", page: "documents" },
  { type: "Documento", label: "Credencial de discapacidad digital", sub: "N.° CD-2024-00341 · Vigente", page: "documents" },
  // Lugares y gestiones
  { type: "Lugar", label: "Renovación de cédula de identidad", sub: "Registro Civil — Identidad · Oficina", page: "lugares" },
  { type: "Documento", label: "Certificado de nacimiento", sub: "Registro Civil · En línea", page: "documents" },
  { type: "Sección", label: "Pago de patente vehicular", sub: "Municipalidad · En línea / Oficina", page: "lugares" },
  { type: "Sección", label: "Declaración de impuesto a la renta", sub: "SII · En línea", page: "pago-deudas" },
  { type: "Sección", label: "Solicitud de bono FONASA", sub: "Salud · En línea / Oficina", page: "lugares" },
  { type: "Sección", label: "Subsidio habitacional DS49", sub: "MINVU · Oficina", page: "lugares" },
  // Lugares
  { type: "Lugar", label: "Registro Civil — Santiago Centro", sub: "Huérfanos 1570 · 0.4 km", page: "lugares" },
  { type: "Lugar", label: "ChileAtiende — Providencia", sub: "Av. Providencia 1234 · 1.2 km", page: "lugares" },
  { type: "Lugar", label: "Municipalidad de Santiago", sub: "Plaza de Armas s/n · 0.7 km", page: "lugares" },
  { type: "Lugar", label: "SII — Dirección Regional Metropolitana", sub: "Teatinos 120 · 0.6 km", page: "lugares" },
  { type: "Lugar", label: "ChileAtiende — Ñuñoa", sub: "Av. Irarrázaval 4285 · 3.8 km", page: "lugares" },
  { type: "Lugar", label: "COMPIN Metropolitana", sub: "Monjitas 665 · 0.9 km", page: "lugares" },
  // Perfil — datos del Estado
  { type: "Mi perfil", label: "Registro Social de Hogares", sub: "Caracterización socioeconómica del hogar", page: "profile" },
  { type: "Mi perfil", label: "Calificación socioeconómica", sub: "Tramo 40% — Acceso a subsidios prioritarios", page: "profile" },
  { type: "Mi perfil", label: "Pagos de beneficios sociales", sub: "Aporte Familiar, Bonos, Pase Cultural", page: "profile" },
  { type: "Mi perfil", label: "Aporte Familiar Permanente", sub: "$22.690 · Pagado 15/05/2026", page: "profile" },
  { type: "Mi perfil", label: "Bono Logro Escolar", sub: "$50.000 · Pagado 20/03/2026", page: "profile" },
  { type: "Mi perfil", label: "Pase Cultural", sub: "$50.000 · Vigente", page: "profile" },
  { type: "Mi perfil", label: "Mis capacitaciones SENCE", sub: "Cursos, talleres y diplomados", page: "profile" },
  { type: "Mi perfil", label: "Información previsional AFP", sub: "AFP Habitat · Fondos B y C", page: "profile" },
  { type: "Mi perfil", label: "Seguro Social — cotizaciones", sub: "Historial de aportes mensuales", page: "profile" },
  { type: "Mi perfil", label: "Mutualidad ACHS", sub: "Seguridad laboral", page: "profile" },
  { type: "Mi perfil", label: "Caja de compensación Los Andes", sub: "Prestaciones sociales complementarias", page: "profile" },
  // Funcionalidades
  { type: "Sección", label: "Mis notificaciones", sub: "Notificaciones oficiales y recordatorios", page: "notifications" },
  { type: "Sección", label: "Mis documentos", sub: "Cédula, licencia y credencial digital", page: "documents" },
  { type: "Sección", label: "Asistencia y soporte", sub: "Asistente virtual, FAQ, contacto", page: "assistance" },
  { type: "Sección", label: "Configurar notificaciones", sub: "Push, email, SMS por tipo", page: "notification-settings" },
  { type: "Sección", label: "Pago de deudas con el Estado", sub: "TGR — Obligaciones pendientes", page: "pago-deudas" },
  { type: "Sección", label: "Configuración de la App", sub: "Seguridad del dispositivo y ajustes", page: "settings" },
  { type: "Sección", label: "Mi actividad Claveúnica", sub: "Historial de segundo factor de autenticación", page: "autorizaciones" },
];

const QUICK_LINKS = [
  { icon: Building2, label: "Lugares de atención", page: "lugares" as Page },
  { icon: Landmark, label: "Pago de deudas con el Estado", page: "pago-deudas" as Page },
  { icon: ShieldCheck, label: "Mi actividad Claveúnica", page: "autorizaciones" as Page },
];


function HomePage({
  onNavigate,
  onOpenNotification,
}: {
  onNavigate: (page: Page) => void;
  onOpenNotification: (id: number) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const filteredResults = searchQuery.trim()
    ? GLOBAL_INDEX.filter((r) => {
        const q = searchQuery.toLowerCase();
        return r.label.toLowerCase().includes(q) || (r.sub ?? "").toLowerCase().includes(q);
      }).slice(0, 8)
    : [];

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-[#ffffff] flex flex-col relative">

      {/* Header producto — blanco con franja chilena */}
      <div className="bg-white border-b border-[#e6e6e6] relative">
        {/* Franja chilena */}
        <div className="absolute left-2 top-0 h-2 w-[110px] flex">
          <div className="w-[41px] bg-[#0f5ac4]" />
          <div className="flex-1 bg-[#ff2930]" />
        </div>

        {/* Barra principal */}
        <div className="flex items-center justify-between px-[16px] pt-[20px] pb-[8px]">
          <span className="text-[#333] text-[21px] font-weight: 900" style={{ fontFamily: "'gobCL_Heavy', 'Roboto', sans-serif" }}><span className=""><span className=""><span className="font-bold">App ciudadana</span></span></span></span>
          <div className="flex items-center">
            <button
              onClick={() => onNavigate("settings")}
              className="flex items-center gap-1 p-2 text-[#0046a8] active:bg-blue-50 rounded-full transition-colors"
              aria-label="Configuración"
            >
              <span className="text-[9px] font-bold tracking-[0.9px]">Configuración</span>
              <Settings size={22} strokeWidth={1.5} />
            </button>
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
        <div className="relative">
          <Search size={15} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar en toda la aplicación..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
            className="w-full pl-10 pr-4 py-3 rounded-[24px] border border-[#333] bg-white text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>

        {searchFocused && searchQuery.trim() && (
          <div className="absolute left-4 right-4 top-full mt-2 rounded-2xl border border-[#ccc] bg-white z-20 shadow-md max-h-72 overflow-y-auto">
            {filteredResults.length === 0 ? (
              <p className="px-4 py-3 text-[12px] text-muted-foreground">Sin resultados para "{searchQuery}"</p>
            ) : (
              filteredResults.map((r, i) => (
                <button
                  key={i}
                  onClick={() => { onNavigate(r.page); setSearchQuery(""); }}
                  className="w-full flex items-start gap-3 px-4 py-2.5 border-b border-border last:border-b-0 active:bg-muted text-left"
                >
                  <span className="text-[10px] font-medium bg-[#e3f2fd] text-[#0d47a1] rounded-[4px] px-2 py-0.5 shrink-0 mt-0.5">
                    {r.type}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12px] text-foreground">{r.label}</p>
                    {r.sub && <p className="text-[10px] text-muted-foreground truncate">{r.sub}</p>}
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* My Documents shortcut */}
      <section className="px-4 pt-5 pb-2">
        <p className="text-[10px] tracking-widest text-muted-foreground mb-3">Mis documentos</p>
        <button
          onClick={() => onNavigate("documents")}
          className="w-full rounded-2xl border border-[#ccc] bg-white flex items-center justify-between px-4 py-4 active:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#f2f2f2] rounded-[8px] flex items-center justify-center shrink-0">
              <FileText size={16} strokeWidth={1.5} className="text-[#0f5ac4]" />
            </div>
            <div className="text-left">
              <p className="text-[13px]">Ver mis documentos</p>
              <p className="text-[11px] text-muted-foreground">{MY_DOCUMENTS.length} documentos disponibles</p>
            </div>
          </div>
          <ChevronRight size={16} strokeWidth={1.5} className="text-[#0f5ac4]" />
        </button>
      </section>

      {/* Explorar — vertical list */}
      <section className="px-4 pt-5 pb-2">
        <p className="text-[10px] tracking-widest text-muted-foreground mb-3">Explorar</p>
        <div className="rounded-2xl border border-[#ccc] bg-white divide-y divide-[#ccc]">
          {QUICK_LINKS.map(({ icon: Icon, label, page: linkPage }) => (
            <button
              key={label}
              onClick={() => onNavigate(linkPage)}
              className="w-full flex items-center gap-4 px-4 py-3.5 first:rounded-t-2xl last:rounded-b-2xl active:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 bg-[#f2f2f2] rounded-[8px] flex items-center justify-center shrink-0">
                <Icon size={16} strokeWidth={1.5} className="text-[#0f5ac4]" />
              </div>
              <span className="text-[13px]">{label}</span>
              <ChevronRight size={14} strokeWidth={1.5} className="text-[#0f5ac4] ml-auto" />
            </button>
          ))}
        </div>
      </section>

      {/* Latest notifications */}
      <section className="px-4 pt-5 pb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] tracking-widest text-muted-foreground">Últimas notificaciones</p>
          <button onClick={() => onNavigate("notifications")} className="text-[10px] tracking-widest text-[#1d70b8] active:opacity-70 transition-opacity">
            Ver todas
          </button>
        </div>
        <div className="space-y-2">
          {getHomeNotifications().map((n) => (
            <button
              key={n.id}
              onClick={() => onOpenNotification(n.id)}
              className="w-full rounded-2xl border border-[#ccc] bg-white flex items-start justify-between px-4 py-3 active:bg-gray-50 transition-colors text-left"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-[10px] font-medium rounded-[4px] px-2 py-0.5 shrink-0"
                    style={{ background: NOTIF_TYPE_BADGE[n.type].bg, color: NOTIF_TYPE_BADGE[n.type].color }}
                  >
                    {NOTIF_TYPE_LABEL[n.type]}
                  </span>
                </div>
                <p className="text-[12px]">{n.title}</p>
                <p className="text-[10px] text-muted-foreground truncate">{n.body}</p>
              </div>
              <span className="text-[10px] text-muted-foreground shrink-0 ml-3 mt-0.5">{n.homeTime}</span>
            </button>
          ))}
        </div>
        <button onClick={() => onNavigate("notifications")} className="mt-2 w-full rounded-2xl border border-[#ccc] bg-white py-3 text-[11px] tracking-widest text-muted-foreground active:bg-gray-50 transition-colors">
          Ver todas mis notificaciones
        </button>
      </section>

      <BottomNav active="home" onNavigate={onNavigate} />


    </div>
  );
}

export default function App() {
  const [authStep, setAuthStep] = useState<AuthStep>("welcome");
  const [page, setPage] = useState<Page>("home");
  const [showBiometric, setShowBiometric] = useState(false);
  const [pendingNotificationId, setPendingNotificationId] = useState<number | null>(null);

  function handleOpenNotification(id: number) {
    setPendingNotificationId(id);
    setPage("notifications");
  }

  function handleLogout() {
    setPage("home");
    setAuthStep("welcome");
    setShowBiometric(false);
  }

  return (
    <FontSizeProvider>
    <div className="min-h-screen bg-background flex justify-center items-start">
      {authStep === "welcome" && (
        <>
          <WelcomePage
            onLogin={() => setAuthStep("claveunica")}
            onBiometric={() => setShowBiometric(true)}
            onLugares={() => setAuthStep("guest-lugares")}
          />
          {showBiometric && (
            <BiometricAuth
              successSubtitle="Accediendo a la aplicación…"
              onSuccess={() => {
                setShowBiometric(false);
                setAuthStep("app");
              }}
            />
          )}
        </>
      )}
      {authStep === "guest-lugares" && (
        <TramitesServiciosPage
          variant="guest"
          onBack={() => setAuthStep("welcome")}
        />
      )}
      {authStep === "claveunica" && (
        <ClaveUnicaLoginPage onSuccess={() => setAuthStep("two-factor")} onBack={() => setAuthStep("welcome")} />
      )}
      {authStep === "two-factor" && (
        <TwoFactorPage
          onSuccess={() => setAuthStep("app")}
          onBack={() => setAuthStep("claveunica")}
        />
      )}
      {authStep === "app" && (
        <>
          {page === "home" && (
            <HomePage
              onNavigate={setPage}
              onOpenNotification={handleOpenNotification}
            />
          )}
          {page === "notifications" && (
            <NotificationsPage
              onBack={() => setPage("home")}
              onSettings={() => setPage("notification-settings")}
              onNavigate={setPage}
              initialSelectedId={pendingNotificationId}
              onInitialSelectedConsumed={() => setPendingNotificationId(null)}
            />
          )}
          {page === "notification-settings" && (
            <NotificationSettingsPage onBack={() => setPage("notifications")} />
          )}
          {page === "assistance" && (
            <AssistancePage onBack={() => setPage("home")} onNavigate={setPage} />
          )}
          {page === "documents" && (
            <DocumentsPage onBack={() => setPage("home")} onNavigate={setPage} />
          )}
          {page === "profile" && (
            <ProfilePage onBack={() => setPage("home")} onLogout={handleLogout} onNavigate={setPage} />
          )}
          {page === "lugares" && (
            <TramitesServiciosPage onBack={() => setPage("home")} onNavigate={setPage} />
          )}
          {page === "pago-deudas" && (
            <PagoDeudasPage onBack={() => setPage("home")} onNavigate={setPage} />
          )}
          {page === "autorizaciones" && (
            <AutorizacionesPage onBack={() => setPage("home")} onNavigate={setPage} />
          )}
          {page === "settings" && (
            <AppSettingsPage onBack={() => setPage("home")} />
          )}
          <FloatingAssistant />
        </>
      )}
    </div>
    </FontSizeProvider>
  );
}

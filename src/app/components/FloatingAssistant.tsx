import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, User, RotateCcw, Minimize2 } from "lucide-react";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
}

const QUICK_PROMPTS = [
  "¿Dónde veo mi cédula digital?",
  "¿Cómo pago deudas con el Estado?",
  "¿Dónde hay oficinas cerca?",
  "¿Cómo reviso mis notificaciones?",
];

const BOT_RESPONSES: Record<string, string> = {
  default:
    "Puede buscar en Inicio o ir a Asistencia para contactar a un ejecutivo. También puede explorar Mis docs, Lugares o Buzón desde la barra inferior. ¿Qué necesita?",
  documentos:
    "Su cédula y otros documentos están en Mis docs. Ahí puede ver cédula, certificados, recetas y credenciales. Algunos documentos sensibles requieren verificación biométrica.",
  pagos:
    "Para pagar obligaciones con el Estado, vaya a Inicio → Explorar → Pago de deudas con el Estado. Ahí puede revisar deudas pendientes y pagar en línea.",
  lugares:
    "Para encontrar oficinas del Estado cerca de usted, ingrese a Lugares en la barra inferior. Puede buscar por tipo, distancia y ver dirección, horario y teléfono.",
  notificaciones:
    "Las actualizaciones oficiales y avances de gestiones llegan a su Buzón. Filtre por tipo (Oficial, Trámite, Recordatorio) para encontrar el aviso que busca.",
  perfil:
    "Su información del Estado está en Mi perfil: datos personales, Registro Social de Hogares, beneficios sociales e información previsional.",
  claveunica:
    "Para revisar dónde ha usado su ClaveÚnica, vaya a Inicio → Explorar → Mi actividad Claveúnica. Ahí verá el historial de accesos y autorizaciones.",
};

function getBotResponse(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("cédula") || t.includes("cedula") || t.includes("identidad") || t.includes("run") || t.includes("certificado") || t.includes("receta") || t.includes("credencial") || t.includes("documento")) return BOT_RESPONSES.documentos;
  if (t.includes("pago") || t.includes("deuda") || t.includes("impuesto") || t.includes("patente") || t.includes("contribución") || t.includes("tgr")) return BOT_RESPONSES.pagos;
  if (t.includes("turno") || t.includes("cita") || t.includes("hora") || t.includes("oficina") || t.includes("registro civil") || t.includes("chileatiende") || t.includes("municipalidad") || t.includes("lugar")) return BOT_RESPONSES.lugares;
  if (t.includes("estado") || t.includes("trámite") || t.includes("tramite") || t.includes("expediente") || t.includes("avance") || t.includes("notificación") || t.includes("notificacion") || t.includes("buzón") || t.includes("buzon") || t.includes("aviso")) return BOT_RESPONSES.notificaciones;
  if (t.includes("perfil") || t.includes("beneficio") || t.includes("bono") || t.includes("afp") || t.includes("previsional") || t.includes("rsh")) return BOT_RESPONSES.perfil;
  if (t.includes("clave única") || t.includes("claveunica") || t.includes("autorización") || t.includes("autorizacion")) return BOT_RESPONSES.claveunica;
  return BOT_RESPONSES.default;
}

const INITIAL_MESSAGE: Message = {
  id: 0,
  from: "bot",
  text: "Hola, soy el asistente virtual del Gobierno de Chile. Puedo orientarle sobre sus documentos, notificaciones, lugares de atención, deudas con el Estado y su información personal. ¿En qué le ayudo?",
};

export function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isTyping, open]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    const userMsg: Message = { id: nextId.current++, from: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: nextId.current++,
        from: "bot",
        text: getBotResponse(trimmed),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  }

  function reset() {
    setMessages([{ ...INITIAL_MESSAGE, id: nextId.current++ }]);
    setInput("");
    setIsTyping(false);
  }

  const unreadDot = !open && messages.length > 1;

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed inset-0 z-20 flex items-end justify-center pointer-events-none">
          {/* Backdrop — only covers behind the panel */}
          <div
            className="absolute inset-0 bg-foreground/20 pointer-events-auto"
            onClick={() => setOpen(false)}
          />
          <div
            className="relative w-full max-w-[390px] bg-card border border-border border-b-0 flex flex-col pointer-events-auto"
            style={{ height: "72vh" }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
              <div className="flex items-center gap-2">
                <Bot size={15} strokeWidth={1.5} />
                <span className="text-[11px] tracking-widest">Asistente virtual</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={reset}
                  className="p-1.5 text-muted-foreground active:text-foreground transition-colors"
                  aria-label="Reiniciar conversación"
                >
                  <RotateCcw size={13} strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 text-muted-foreground active:text-foreground transition-colors"
                  aria-label="Minimizar"
                >
                  <Minimize2 size={13} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 bg-background">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2 ${m.from === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className="shrink-0 w-6 h-6 border border-border flex items-center justify-center mt-0.5 rounded-[16px] bg-[#ececec00]">
                    {m.from === "bot" ? (
                      <Bot size={12} strokeWidth={1.5} />
                    ) : (
                      <User size={12} strokeWidth={1.5} />
                    )}
                  </div>
                  <div
                    className={`max-w-[78%] px-3 py-2 text-[12px] rounded-2xl leading-relaxed border ${
                      m.from === "user"
                        ? "bg-secondary text-secondary-foreground border-secondary"
                        : "bg-card text-foreground border-border"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="shrink-0 w-6 h-6 border border-border flex items-center justify-center">
                    <Bot size={12} strokeWidth={1.5} />
                  </div>
                  <div className="px-3 py-2 border border-border bg-card text-[12px] text-muted-foreground">
                    Escribiendo…
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick prompts */}
            <div className="px-4 py-2 border-t border-border flex gap-2 overflow-x-auto shrink-0 bg-card">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="shrink-0 border border-border px-2.5 py-1.5 text-[10px] whitespace-nowrap text-muted-foreground active:bg-muted transition-colors rounded-full"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex border-t border-border shrink-0 p-4">
              <input
                ref={inputRef}
                type="text"
                placeholder="Escriba su consulta..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                className="flex-1 px-4 py-3 bg-input-background text-foreground placeholder:text-muted-foreground outline-none text-[12px]"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || isTyping}
                className="px-4 border-l border-border bg-card active:bg-muted disabled:opacity-30 transition-colors"
                aria-label="Enviar"
              >
                <Send size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <div className="fixed bottom-24 right-4 z-30">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2.5 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.25)] active:opacity-80 transition-opacity relative"
          aria-label={open ? "Cerrar asistente" : "Abrir asistente virtual"}
        >
          {open ? <X size={15} strokeWidth={1.5} className="shrink-0" /> : <Bot size={15} strokeWidth={1.5} className="shrink-0" />}
          <span className="text-[9px] tracking-widest leading-tight">
            {open ? "Cerrar" : <><span className="block">Asistente</span><span className="block">virtual</span></>}
          </span>
          {unreadDot && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-card border-2 border-primary rounded-full" />
          )}
        </button>
      </div>
    </>
  );
}

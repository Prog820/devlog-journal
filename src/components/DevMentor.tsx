import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Bot, AlertTriangle, Lightbulb, CheckCircle2, Sparkles, X, Send, Loader2, MessageSquare, BarChart2 } from 'lucide-react';
import { Week } from '../types';
import { ERRORS_DB, ACHIEVEMENTS } from '../data/errors';

interface DevMentorProps {
  weeks: Week[];
  savedErrorIds: number[];
  chatMessages: ChatMessage[];
  onChatMessagesChange: (msgs: ChatMessage[]) => void;
  user: any;
  aiErrorsCount: number;
}

type AlertLevel = 'alert' | 'suggestion' | 'positive';

interface MentorAlert {
  id: string;
  level: AlertLevel;
  message: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// ─── Motor del agente: puras reglas, sin cambios ────────────────
function runAgent(weeks: Week[], savedErrorIds: number[], aiErrorsCount: number = 0, chatMessagesCount: number = 0): MentorAlert[] {
  const alerts: MentorAlert[] = [];
  const sortedWeeks = [...weeks].sort((a, b) => b.semana - a.semana);
  
  // Reglas IA — Logros de inteligencia artificial
  if (aiErrorsCount >= 1) {
    alerts.push({ id: 'primer-analisis-ia', level: 'positive', message: '✨ ¡Desbloqueaste "Primer análisis IA"! Ya usaste la IA para entender tus errores.' });
  }
  if (aiErrorsCount >= 5) {
    alerts.push({ id: 'aprendiz-ia', level: 'positive', message: '✨ ¡Desbloqueaste "Aprendiz de IA"! 5 errores analizados con inteligencia artificial.' });
  }
  if (aiErrorsCount >= 10) {
    alerts.push({ id: 'biblioteca-inteligente', level: 'positive', message: '✨ ¡Desbloqueaste "Biblioteca inteligente"! 10 errores en tu biblioteca IA.' });
  }
  if (chatMessagesCount >= 1) {
    alerts.push({ id: 'conversador', level: 'positive', message: '✨ ¡Desbloqueaste "Conversador"! Ya tuviste tu primera conversación con el mentor IA.' });
  }
  if (chatMessagesCount >= 20) {
    alerts.push({ id: 'mentor-frecuente', level: 'positive', message: '✨ ¡Desbloqueaste "Mentor frecuente"! 20 mensajes con tu mentor IA.' });
  }

  if (sortedWeeks.length === 1) {
    alerts.push({ id: 'first-week', level: 'positive', message: '🎉 ¡Bienvenido! Acabas de dar el primer paso. Vuelve cada semana para ver tu crecimiento.' });
  }

  if (sortedWeeks.length >= 2) {
    const [w1, w2] = sortedWeeks;
    if (Number(w1.satisfaccion) < 5 && Number(w2.satisfaccion) < 5) {
      alerts.push({ id: 'low-satisfaction', level: 'alert', message: '⚠️ Llevas 2 semanas con satisfacción baja. ¿Qué está pasando?' });
    }
  }

  if (sortedWeeks.length >= 2) {
    const [w1, w2] = sortedWeeks;
    const b1 = w1.bloqueos?.trim().toLowerCase();
    const b2 = w2.bloqueos?.trim().toLowerCase();
    if (b1 && b2 && b1.length > 5 && b1.slice(0, 30) === b2.slice(0, 30)) {
      alerts.push({ id: 'repeated-block', level: 'alert', message: '🔁 Este bloqueo lleva repitiéndose. Puede que necesites enfocarte en resolverlo antes de avanzar.' });
    }
  }

  if (sortedWeeks.length > 0) {
    const lastDate = new Date(sortedWeeks[0].fecha);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays > 14) {
      alerts.push({ id: 'inactive', level: 'alert', message: `😴 Llevas ${diffDays} días sin registrar. ¡Tu racha está en riesgo!` });
    }
  }

  if (sortedWeeks.length >= 3) {
    const [w1, w2, w3] = sortedWeeks;
    if (w1.tech && w1.tech === w2.tech && w2.tech === w3.tech) {
      const suggestions: Record<string, string> = {
        JavaScript: 'TypeScript o Node.js', TypeScript: 'React o Node.js',
        React: 'TypeScript o Node.js', Python: 'SQL o FastAPI',
        'Node.js': 'bases de datos o Docker', SQL: 'Python o una ORM',
        'HTML/CSS': 'JavaScript', Java: 'Spring Boot o Kotlin', default: 'otra tecnología complementaria',
      };
      alerts.push({ id: 'same-tech', level: 'suggestion', message: `💡 Llevas 3 semanas con ${w1.tech}. Considera explorar ${suggestions[w1.tech] || suggestions.default} como complemento.` });
    }
  }

  if (sortedWeeks.length >= 3) {
    const [w1, w2, w3] = sortedWeeks;
    const h1 = Number(w1.horas), h2 = Number(w2.horas), h3 = Number(w3.horas);
    if (h1 < h2 && h2 < h3 && h1 > 0) {
      alerts.push({ id: 'declining-hours', level: 'suggestion', message: '📉 Tus horas de estudio han bajado 3 semanas seguidas. ¿Puedes recuperar el ritmo?' });
    }
  }

  if (sortedWeeks.length >= 2) {
    const weeksWithoutLatest = sortedWeeks.slice(1);
    const unlockedBefore = ACHIEVEMENTS.filter(a => a.check(weeksWithoutLatest, savedErrorIds, aiErrorsCount, chatMessagesCount));
    const unlockedNow = ACHIEVEMENTS.filter(a => a.check(sortedWeeks, savedErrorIds, aiErrorsCount, chatMessagesCount));
    const newlyUnlocked = unlockedNow.filter(a => !unlockedBefore.find(b => b.id === a.id));
    if (newlyUnlocked.length > 0) {
      alerts.push({ id: 'new-achievement', level: 'positive', message: `✨ ¡Desbloqueaste "${newlyUnlocked[0].name}" esta semana!` });
    }
  }

  if (sortedWeeks.length > 0) {
    const notUnlocked = ACHIEVEMENTS.filter(a => !a.check(sortedWeeks, savedErrorIds, aiErrorsCount, chatMessagesCount));
    const simulatedWeeks = [sortedWeeks[0], ...sortedWeeks];
    const nearlyUnlocked = notUnlocked.filter(a => a.check(simulatedWeeks, savedErrorIds, aiErrorsCount, chatMessagesCount));
    if (nearlyUnlocked.length > 0) {
      alerts.push({ id: 'near-achievement', level: 'positive', message: `🎯 Estás muy cerca de desbloquear "${nearlyUnlocked[0].name}". ¡Solo te falta un poco más!` });
    }
  }

  if (savedErrorIds.length === 0 && sortedWeeks.length > 2) {
    alerts.push({ id: 'no-errors-saved', level: 'suggestion', message: `📚 Llevas ${sortedWeeks.length} semanas estudiando pero no has guardado ningún error. Documentar tus errores acelera el aprendizaje.` });
  }

  if (savedErrorIds.length > 5) {
    alerts.push({ id: 'solid-library', level: 'positive', message: '🏆 Tienes una biblioteca personal sólida. ¡Recuerda revisarlos!' });
  }

  if (savedErrorIds.length >= 3) {
    const savedErrors = ERRORS_DB.filter(e => savedErrorIds.includes(e.id));
    const langCount: Record<string, number> = {};
    savedErrors.forEach(e => { langCount[e.lang] = (langCount[e.lang] || 0) + 1; });
    const langs = Object.keys(langCount);
    if (langs.length === 1) {
      alerts.push({ id: 'single-lang-errors', level: 'suggestion', message: `💡 Todos tus errores guardados son de ${langs[0]}. ¿Estás teniendo dificultades con ese lenguaje específicamente?` });
    }
  }

  if (sortedWeeks.length > 0 && savedErrorIds.length > 0) {
    const techCount: Record<string, number> = {};
    sortedWeeks.forEach(w => { if (w.tech) techCount[w.tech] = (techCount[w.tech] || 0) + 1; });
    const topTech = Object.entries(techCount).sort((a, b) => b[1] - a[1])[0]?.[0];
    const techToLang: Record<string, string> = {
      JavaScript: 'JavaScript', TypeScript: 'JavaScript',
      React: 'JavaScript', 'Node.js': 'JavaScript',
      Python: 'Python', Java: 'Java',
    };
    const relatedLang = techToLang[topTech];
    if (relatedLang) {
      const savedErrors = ERRORS_DB.filter(e => savedErrorIds.includes(e.id));
      if (savedErrors.some(e => e.lang === relatedLang)) {
        alerts.push({ id: 'tech-error-match', level: 'suggestion', message: `🔁 Estás estudiando ${topTech} y tienes errores de ${relatedLang} guardados. ¡Puede que estén relacionados!` });
      }
    }
  }

  return alerts;
}

// ─── Función para llamar a Gemini ─────────────────────────────
async function callGemini(messages: ChatMessage[], weeks: Week[], savedErrorIds: number[], userName: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const sortedWeeks = [...weeks].sort((a, b) => b.semana - a.semana);
  const recentWeeks = sortedWeeks.slice(0, 5);
  const savedErrors = ERRORS_DB.filter(e => savedErrorIds.includes(e.id));

  const context = `
Eres DevMentor, un mentor de desarrollo de software integrado en la app DevGrowth.
El nombre del desarrollador es: ${userName}.
REGLAS IMPORTANTES:
- Cuando el usuario salude (hola, hi, hey, buenas, etc), responde SOLO con un mensaje corto de bienvenida usando su nombre. Máximo 2 líneas. No analices datos en el saludo.
- Sé directo y conciso. Máximo 3 párrafos cortos por respuesta.
- No uses markdown como ** en tus respuestas, escribe en texto plano.
- No inventes datos que no estén en el contexto.
Sé conciso, directo y motivador. Responde siempre en español. Máximo 3 párrafos cortos.
No inventes datos que no estén en el contexto.

DATOS DEL DESARROLLADOR:
- Semanas registradas: ${weeks.length}
- Errores guardados en biblioteca: ${savedErrorIds.length}
${recentWeeks.length > 0 ? `
- Últimas ${recentWeeks.length} semanas:
${recentWeeks.map(w => `  Semana ${w.semana}: ${w.horas}h estudiadas, satisfacción ${w.satisfaccion}/10, tecnología: ${w.tech}. Aprendió: ${w.aprendizajes?.slice(0, 100) || 'sin registrar'}. Bloqueos: ${w.bloqueos?.slice(0, 80) || 'ninguno'}.`).join('\n')}` : '- Sin semanas registradas aún.'}
${savedErrors.length > 0 ? `- Errores guardados: ${savedErrors.map(e => e.name).join(', ')}` : ''}
`.trim();

  const geminiMessages = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: context }] },
        contents: geminiMessages,
        generationConfig: { maxOutputTokens: 3000, temperature: 0.7 }
      })
    }
  );

  if (!response.ok) throw new Error(`Error ${response.status}`);

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No pude generar una respuesta. Intenta de nuevo.';
}

export default function DevMentor({ weeks, savedErrorIds, chatMessages, onChatMessagesChange, user, aiErrorsCount }: DevMentorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'analysis' | 'chat'>('analysis');
  const messages = chatMessages;
  const setMessages = onChatMessagesChange;
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const alerts = useMemo(() => runAgent(weeks, savedErrorIds, aiErrorsCount, chatMessages.length), [weeks, savedErrorIds, aiErrorsCount, chatMessages.length]);
  const alertItems = alerts.filter(a => a.level === 'alert');
  const suggestionItems = alerts.filter(a => a.level === 'suggestion');
  const positiveItems = alerts.filter(a => a.level === 'positive');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMsg];
    onChatMessagesChange(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'desarrollador';
      const reply = await callGemini(updatedMessages, weeks, savedErrorIds, userName);
      onChatMessagesChange([...updatedMessages, { role: 'assistant', content: reply }]);
    } catch {
      onChatMessagesChange([...updatedMessages, {
        role: 'assistant',
        content: '⚠️ No pude conectarme con el mentor en este momento. Verifica tu conexión e intenta de nuevo.'
      }]);
    } finally {
      setIsLoading(false);
    }
};

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const levelConfig = {
    alert: {
      border: 'border-red-500/30', bg: 'bg-red-950/10', dot: 'bg-red-500',
      label: 'Alertas', labelColor: 'text-red-400',
      icon: <AlertTriangle size={11} className="text-red-400" />,
    },
    suggestion: {
      border: 'border-[#f59e0b]/30', bg: 'bg-amber-950/10', dot: 'bg-[#f59e0b]',
      label: 'Sugerencias', labelColor: 'text-[#f59e0b]',
      icon: <Lightbulb size={11} className="text-[#f59e0b]" />,
    },
    positive: {
      border: 'border-emerald-500/30', bg: 'bg-emerald-950/10', dot: 'bg-emerald-400',
      label: 'Positivos', labelColor: 'text-emerald-400',
      icon: <CheckCircle2 size={11} className="text-emerald-400" />,
    },
  };

  const renderGroup = (items: MentorAlert[], level: AlertLevel) => {
    if (items.length === 0) return null;
    const cfg = levelConfig[level];
    return (
      <div className="space-y-2">
        <div className={`flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest ${cfg.labelColor}`}>
          {cfg.icon} {cfg.label}
        </div>
        <div className="space-y-2">
          {items.map(alert => (
            <div key={alert.id} className={`flex items-start gap-3 px-4 py-3 rounded-lg border ${cfg.border} ${cfg.bg}`}>
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
              <p className="text-xs font-mono text-orange-100/80 leading-relaxed">{alert.message}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* ── Botón flotante ── */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-30 flex items-center gap-2 px-4 py-3 bg-[#0a0a0d] border border-[#ff5500]/40 hover:border-[#ff5500] rounded-lg text-xs font-mono font-bold text-[#ff5500] hover:bg-[#ff5500]/10 transition duration-150 cursor-pointer shadow-[0_0_20px_rgba(255,85,0,0.2)]"
      >
        <Bot size={14} />
        <span className="hidden sm:inline uppercase tracking-wider">DevMentor</span>
        {alerts.length > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#ff5500] text-black text-[9px] font-extrabold flex items-center justify-center">
            {alerts.length}
          </span>
        )}
      </button>

      {/* ── Panel modal ── */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />

          <div
            className="fixed right-6 z-50 w-full max-w-sm flex flex-col bg-[#030304] border border-[#ff5500]/40 rounded-xl shadow-[0_0_40px_rgba(255,85,0,0.15)]"
            style={{ top: '50%', transform: 'translateY(-50%)', height: '85vh', animation: 'devmentorFloat 3s ease-in-out infinite' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#ff5500]/15">
              <div className="flex items-center gap-2">
                <Bot size={16} className="text-[#ff5500]" />
                <span className="font-mono text-sm font-bold text-white uppercase tracking-widest">DevMentor</span>
                <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase px-2 py-0.5 bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff5500] rounded">
                  <span className="w-1 h-1 rounded-full bg-[#ff5500] animate-pulse" /> Activo
                </span>
              </div>
              <div className="flex items-center gap-2">
                {activeTab === 'chat' && messages.length > 0 && (
                  <button
                    onClick={() => onChatMessagesChange([])}
                    className="px-2 py-1 border border-[#ff5500]/20 hover:bg-red-500/10 text-[#a18265] hover:text-red-400 rounded text-[9px] font-mono uppercase tracking-wider transition cursor-pointer"
                  >
                    Borrar chat
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="p-1.5 border border-[#ff5500]/20 hover:bg-[#ff5500]/10 text-[#ff5500] rounded transition cursor-pointer">
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#ff5500]/15">
              <button
                onClick={() => setActiveTab('analysis')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider transition cursor-pointer ${
                  activeTab === 'analysis'
                    ? 'text-[#ff5500] border-b-2 border-[#ff5500]'
                    : 'text-[#a18265]/60 hover:text-[#a18265]'
                }`}
              >
                <BarChart2 size={11} /> Análisis
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider transition cursor-pointer ${
                  activeTab === 'chat'
                    ? 'text-[#ff5500] border-b-2 border-[#ff5500]'
                    : 'text-[#a18265]/60 hover:text-[#a18265]'
                }`}
              >
                <MessageSquare size={11} /> Chat IA
              </button>
            </div>

            {/* Contenido */}
            {activeTab === 'analysis' ? (
              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
                {weeks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
                    <Sparkles size={24} className="text-[#ff5500]/30" />
                    <p className="text-xs font-mono text-[#a18265]/60 leading-relaxed">
                      Registra tu primera semana para activar el análisis del mentor.
                    </p>
                  </div>
                ) : alerts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
                    <CheckCircle2 size={24} className="text-emerald-500/40" />
                    <p className="text-xs font-mono text-[#a18265]/60 leading-relaxed">
                      Todo va bien. Sigue registrando tu progreso cada semana.
                    </p>
                  </div>
                ) : (
                  <>
                    {renderGroup(alertItems, 'alert')}
                    {renderGroup(suggestionItems, 'suggestion')}
                    {renderGroup(positiveItems, 'positive')}
                  </>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mensajes */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-8">
                      <MessageSquare size={24} className="text-[#ff5500]/30" />
                      <p className="text-xs font-mono text-[#a18265]/60 leading-relaxed px-4">
                        Pregúntame sobre tu progreso, bloqueos, o qué aprender después. Con gusto te ayudo :)
                      </p>
                    </div>
                  )}
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] px-3 py-2.5 rounded-lg text-xs font-mono leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#ff5500]/15 border border-[#ff5500]/30 text-orange-100'
                          : 'bg-[#0a0a0d] border border-[#ff5500]/10 text-orange-200/80'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="px-3 py-2.5 rounded-lg bg-[#0a0a0d] border border-[#ff5500]/10 flex items-center gap-2">
                        <Loader2 size={12} className="text-[#ff5500] animate-spin" />
                        <span className="text-xs font-mono text-[#a18265]/60">Analizando...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="px-4 py-3 border-t border-[#ff5500]/15 flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe tu pregunta..."
                    disabled={isLoading}
                    className="flex-1 px-3 py-2 bg-[#0a0a0d] border border-[#ff5500]/20 rounded text-xs font-mono text-white placeholder-[#a18265]/40 focus:outline-none focus:border-[#ff5500]/50 disabled:opacity-50 transition"
                  />
                  <button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="p-2 bg-[#ff5500]/15 border border-[#ff5500]/30 hover:bg-[#ff5500]/25 text-[#ff5500] rounded transition disabled:opacity-40 cursor-pointer"
                  >
                    <Send size={13} />
                  </button>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="px-5 py-3 border-t border-[#ff5500]/10">
              <p className="text-[10px] font-mono text-[#a18265]/40 text-center uppercase tracking-widest">
                {activeTab === 'analysis' ? 'Agente basado en reglas · Sin IA' : 'Powered by Gemini · IA real'}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
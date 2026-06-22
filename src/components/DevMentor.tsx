import React, { useMemo, useState } from 'react';
import { Bot, AlertTriangle, Lightbulb, CheckCircle2, Sparkles, X } from 'lucide-react';
import { Week } from '../types';
import { ERRORS_DB, ACHIEVEMENTS } from '../data/errors';
 
interface DevMentorProps {
  weeks: Week[];
  savedErrorIds: number[];
}
 
type AlertLevel = 'alert' | 'suggestion' | 'positive';
 
interface MentorAlert {
  id: string;
  level: AlertLevel;
  message: string;
}
 
// ─── Motor del agente: puras reglas, sin IA ────────────────
function runAgent(weeks: Week[], savedErrorIds: number[]): MentorAlert[] {
  const alerts: MentorAlert[] = [];
  const sortedWeeks = [...weeks].sort((a, b) => b.semana - a.semana);
 
  // ── BLOQUE 1: SEMANAS ──────────────────────────────────
 
  // Regla 1 — Primera semana registrada
  if (sortedWeeks.length === 1) {
    alerts.push({
      id: 'first-week',
      level: 'positive',
      message: '🎉 ¡Bienvenido! Acabas de dar el primer paso. Vuelve cada semana para ver tu crecimiento.',
    });
  }
 
  // Regla 2 — Satisfacción menor a 5 dos semanas seguidas
  if (sortedWeeks.length >= 2) {
    const [w1, w2] = sortedWeeks;
    if (Number(w1.satisfaccion) < 5 && Number(w2.satisfaccion) < 5) {
      alerts.push({
        id: 'low-satisfaction',
        level: 'alert',
        message: '⚠️ Llevas 2 semanas con satisfacción baja. ¿Qué está pasando?',
      });
    }
  }
 
  // Regla 3 — Mismo bloqueo dos semanas seguidas
  if (sortedWeeks.length >= 2) {
    const [w1, w2] = sortedWeeks;
    const b1 = w1.bloqueos?.trim().toLowerCase();
    const b2 = w2.bloqueos?.trim().toLowerCase();
    if (b1 && b2 && b1.length > 5 && b1.slice(0, 30) === b2.slice(0, 30)) {
      alerts.push({
        id: 'repeated-block',
        level: 'alert',
        message: '🔁 Este bloqueo lleva repitiéndose. Puede que necesites enfocarte en resolverlo antes de avanzar.',
      });
    }
  }
 
  // Regla 4 — Más de 2 semanas sin registrar
  if (sortedWeeks.length > 0) {
    const lastDate = new Date(sortedWeeks[0].fecha);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays > 14) {
      alerts.push({
        id: 'inactive',
        level: 'alert',
        message: `😴 Llevas ${diffDays} días sin registrar. ¡Tu racha está en riesgo!`,
      });
    }
  }
 
  // Regla 5 — Misma tecnología 3 semanas seguidas
  if (sortedWeeks.length >= 3) {
    const [w1, w2, w3] = sortedWeeks;
    if (w1.tech && w1.tech === w2.tech && w2.tech === w3.tech) {
      const suggestions: Record<string, string> = {
        JavaScript: 'TypeScript o Node.js',
        TypeScript: 'React o Node.js',
        React: 'TypeScript o Node.js',
        Python: 'SQL o FastAPI',
        'Node.js': 'bases de datos o Docker',
        SQL: 'Python o una ORM',
        'HTML/CSS': 'JavaScript',
        Java: 'Spring Boot o Kotlin',
        default: 'otra tecnología complementaria',
      };
      const sugerencia = suggestions[w1.tech] || suggestions.default;
      alerts.push({
        id: 'same-tech',
        level: 'suggestion',
        message: `💡 Llevas 3 semanas con ${w1.tech}. Considera explorar ${sugerencia} como complemento.`,
      });
    }
  }
 
  // Regla 6 — Horas cayendo 3 semanas consecutivas
  if (sortedWeeks.length >= 3) {
    const [w1, w2, w3] = sortedWeeks;
    const h1 = Number(w1.horas);
    const h2 = Number(w2.horas);
    const h3 = Number(w3.horas);
    if (h1 < h2 && h2 < h3 && h1 > 0) {
      alerts.push({
        id: 'declining-hours',
        level: 'suggestion',
        message: '📉 Tus horas de estudio han bajado 3 semanas seguidas. ¿Puedes recuperar el ritmo?',
      });
    }
  }
 
  // ── BLOQUE 2: LOGROS ───────────────────────────────────
 
  // Regla 7 — Logro desbloqueado esta semana
  if (sortedWeeks.length >= 2) {
    const weeksWithoutLatest = sortedWeeks.slice(1);
    const unlockedBefore = ACHIEVEMENTS.filter(a => a.check(weeksWithoutLatest, savedErrorIds));
    const unlockedNow = ACHIEVEMENTS.filter(a => a.check(sortedWeeks, savedErrorIds));
    const newlyUnlocked = unlockedNow.filter(a => !unlockedBefore.find(b => b.id === a.id));
    if (newlyUnlocked.length > 0) {
      alerts.push({
        id: 'new-achievement',
        level: 'positive',
        message: `✨ ¡Desbloqueaste "${newlyUnlocked[0].name}" esta semana!`,
      });
    }
  }
 
  // Regla 8 — Logro a 1 paso de desbloquearse
  if (sortedWeeks.length > 0) {
    const notUnlocked = ACHIEVEMENTS.filter(a => !a.check(sortedWeeks, savedErrorIds));
    const simulatedWeeks = [sortedWeeks[0], ...sortedWeeks];
    const nearlyUnlocked = notUnlocked.filter(a => a.check(simulatedWeeks, savedErrorIds));
    if (nearlyUnlocked.length > 0) {
      alerts.push({
        id: 'near-achievement',
        level: 'positive',
        message: `🎯 Estás muy cerca de desbloquear "${nearlyUnlocked[0].name}". ¡Solo te falta un poco más!`,
      });
    }
  }
 
  // ── BLOQUE 3: ERRORES ──────────────────────────────────
 
  // Regla 9 — 0 errores guardados y más de 2 semanas
  if (savedErrorIds.length === 0 && sortedWeeks.length > 2) {
    alerts.push({
      id: 'no-errors-saved',
      level: 'suggestion',
      message: `📚 Llevas ${sortedWeeks.length} semanas estudiando pero no has guardado ningún error. Documentar tus errores acelera el aprendizaje.`,
    });
  }
 
  // Regla 10 — Más de 5 errores guardados
  if (savedErrorIds.length > 5) {
    alerts.push({
      id: 'solid-library',
      level: 'positive',
      message: '🏆 Tienes una biblioteca personal sólida. ¡Recuerda revisarlos!',
    });
  }
 
  // Regla 11 — Todos los errores son de un solo lenguaje
  if (savedErrorIds.length >= 3) {
    const savedErrors = ERRORS_DB.filter(e => savedErrorIds.includes(e.id));
    const langCount: Record<string, number> = {};
    savedErrors.forEach(e => { langCount[e.lang] = (langCount[e.lang] || 0) + 1; });
    const langs = Object.keys(langCount);
    if (langs.length === 1) {
      alerts.push({
        id: 'single-lang-errors',
        level: 'suggestion',
        message: `💡 Todos tus errores guardados son de ${langs[0]}. ¿Estás teniendo dificultades con ese lenguaje específicamente?`,
      });
    }
  }
 
  // Regla 12 — Tecnología top coincide con lenguaje de errores guardados
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
        alerts.push({
          id: 'tech-error-match',
          level: 'suggestion',
          message: `🔁 Estás estudiando ${topTech} y tienes errores de ${relatedLang} guardados. ¡Puede que estén relacionados!`,
        });
      }
    }
  }
 
  return alerts;
}
 
// ─── Componente visual ─────────────────────────────────────
// Agrega esto en index.css:
// @keyframes devmentorFloat {
//   0%, 100% { transform: translateY(-50%); }
//   50%       { transform: translateY(calc(-50% - 8px)); }
// }
 
export default function DevMentor({ weeks, savedErrorIds }: DevMentorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const alerts = useMemo(() => runAgent(weeks, savedErrorIds), [weeks, savedErrorIds]);
 
  const alertItems = alerts.filter(a => a.level === 'alert');
  const suggestionItems = alerts.filter(a => a.level === 'suggestion');
  const positiveItems = alerts.filter(a => a.level === 'positive');
 
  const levelConfig = {
    alert: {
      border: 'border-red-500/30',
      bg: 'bg-red-950/10',
      dot: 'bg-red-500',
      label: 'Alertas',
      labelColor: 'text-red-400',
      icon: <AlertTriangle size={11} className="text-red-400" />,
    },
    suggestion: {
      border: 'border-[#f59e0b]/30',
      bg: 'bg-amber-950/10',
      dot: 'bg-[#f59e0b]',
      label: 'Sugerencias',
      labelColor: 'text-[#f59e0b]',
      icon: <Lightbulb size={11} className="text-[#f59e0b]" />,
    },
    positive: {
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-950/10',
      dot: 'bg-emerald-400',
      label: 'Positivos',
      labelColor: 'text-emerald-400',
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
        {/* Badge con número de alertas */}
        {alerts.length > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#ff5500] text-black text-[9px] font-extrabold flex items-center justify-center">
            {alerts.length}
          </span>
        )}
      </button>
 
      {/* ── Panel modal derecho ── */}
      {isOpen && (
        <>
          {/* Fondo oscuro semitransparente */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
 
          {/* Panel flotante */}
          <div
            className="fixed right-6 z-50 w-full max-w-sm flex flex-col bg-[#030304] border border-[#ff5500]/40 rounded-xl shadow-[0_0_40px_rgba(255,85,0,0.15)]"
            style={{
              top: '50%',
              transform: 'translateY(-50%)',
              maxHeight: '70vh',
              animation: 'devmentorFloat 3s ease-in-out infinite',
            }}
          >
 
            {/* Header del panel */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#ff5500]/15">
              <div className="flex items-center gap-2">
                <Bot size={16} className="text-[#ff5500]" />
                <span className="font-mono text-sm font-bold text-white uppercase tracking-widest">DevMentor</span>
                <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase px-2 py-0.5 bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff5500] rounded">
                  <span className="w-1 h-1 rounded-full bg-[#ff5500] animate-pulse" />
                  Activo
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 border border-[#ff5500]/20 hover:bg-[#ff5500]/10 text-[#ff5500] rounded transition cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
 
            {/* Contenido scrolleable */}
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
 
            {/* Footer */}
            <div className="px-5 py-3 border-t border-[#ff5500]/10">
              <p className="text-[10px] font-mono text-[#a18265]/40 text-center uppercase tracking-widest">
                Agente basado en reglas · Sin IA
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
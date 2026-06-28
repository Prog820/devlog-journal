import React from 'react';
import { 
  Trophy, Sprout, Star, Flame, Clock, Zap, SmilePlus, Layers, Bug, Lock, Sparkles, MessageSquare, Bot, BrainCircuit, LibraryBig
} from 'lucide-react';
import { Week } from '../types';
import { ACHIEVEMENTS } from '../data/errors';

interface LogrosProps {
  weeks: Week[];
  savedErrorIds: number[];
  aiErrorsCount: number;
  chatMessagesCount: number;
}

export default function Logros({ weeks, savedErrorIds, aiErrorsCount, chatMessagesCount }: LogrosProps) {
  
  // Custom manual mappings for Lucide components matching achievement definition keys
  const getIconComponent = (key: string, unlocked: boolean) => {
    const size = 22;
    const colorClass = unlocked ? 'text-black' : 'text-[#a18265]/40';

    switch (key) {
      case 'Sprout':
        return <Sprout size={size} className={colorClass} />;
      case 'Star':
        return <Star size={size} className={colorClass} />;
      case 'Flame':
        return <Flame size={size} className={colorClass} />;
      case 'Clock':
        return <Clock size={size} className={colorClass} />;
      case 'Zap':
        return <Zap size={size} className={colorClass} />;
      case 'SmilePlus':
        return <SmilePlus size={size} className={colorClass} />;
      case 'Layers':
        return <Layers size={size} className={colorClass} />;
      case 'Bug':
        return <Bug size={size} className={colorClass} />;
      case 'Sparkles':
        return <Sparkles size={size} className={colorClass} />;
      case 'BrainCircuit':
        return <BrainCircuit size={size} className={colorClass} />;
      case 'LibraryBig':
        return <LibraryBig size={size} className={colorClass} />;
      case 'MessageSquare':
        return <MessageSquare size={size} className={colorClass} />;
      case 'Bot':
        return <Bot size={size} className={colorClass} />;
      default:
        return <Trophy size={size} className={colorClass} />;
    }
  };

  const getGradientClass = (iconKey: string) => {
    switch (iconKey) {
      case 'Sprout': return 'from-emerald-400 to-green-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
      case 'Star': return 'from-amber-400 to-yellow-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]';
      case 'Flame': return 'from-[#ff5500] to-red-500 shadow-[0_0_15px_rgba(255,107,0,0.3)]';
      case 'Clock': return 'from-sky-400 to-blue-500 shadow-[0_0_15px_rgba(56,189,248,0.3)]';
      case 'Zap': return 'from-amber-400 to-orange-500 shadow-[0_0_15px_rgba(217,119,6,0.3)]';
      case 'SmilePlus': return 'from-pink-400 to-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]';
      case 'Layers': return 'from-violet-400 to-indigo-500 shadow-[0_0_15px_rgba(139,92,246,0.3)]';
      case 'Bug': return 'from-teal-400 to-emerald-500 shadow-[0_0_15px_rgba(20,184,166,0.3)]';
      case 'Sparkles': return 'from-violet-400 to-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.3)]';
      case 'BrainCircuit': return 'from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.3)]';
      case 'LibraryBig': return 'from-emerald-400 to-teal-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
      case 'MessageSquare': return 'from-pink-400 to-fuchsia-500 shadow-[0_0_15px_rgba(244,114,182,0.3)]';
      case 'Bot': return 'from-amber-400 to-orange-500 shadow-[0_0_15px_rgba(251,146,60,0.3)]';
      default: return 'from-amber-400 to-yellow-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]';
    }
  };

  const unlockedCount = ACHIEVEMENTS.filter(a => a.check(weeks, savedErrorIds, aiErrorsCount, chatMessagesCount)).length;
  const totalCount = ACHIEVEMENTS.length;

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold font-sans tracking-tight text-white flex items-center gap-2 text-shadow-red text-shadow-[0_0_15px_rgba(255,107,0,0.3)]">
          <Trophy className="text-[#ff5500] h-6 w-6" /> Mis logros
        </h2>
        <p className="text-xs font-mono text-[#a18265]/80 mt-1">
          DESBLOQUEA MEDALLAS TÁCTICAS MANTENIENDO LA CONSISTENCIA SEMANAL
        </p>
      </div>

      {/* Progress Level bar */}
      <div className="p-5 bg-[#0a0a0d] border border-[#ff5500]/25 rounded-xl font-mono">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider">Avance de Desbloqueo</span>
          <span className="text-xs font-bold text-orange-300">
            {unlockedCount} / {totalCount} logrados ({Math.round(unlockedCount / totalCount * 100)}%)
          </span>
        </div>
        <div className="w-full bg-[#111115] h-3.5 rounded-full overflow-hidden border border-red-950/40 p-0.5">
          <div 
            className="bg-gradient-to-r from-[#ff5500] to-[#f59e0b] h-full rounded-full transition-all duration-500"
            style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ACHIEVEMENTS.map(a => {
          const isUnlocked = a.check(weeks, savedErrorIds, aiErrorsCount, chatMessagesCount);

          return (
            <div 
              key={a.id}
              className={`
                p-5 rounded-xl border transition-all duration-300 relative group overflow-hidden flex flex-col justify-between select-none
                ${isUnlocked 
                  ? 'bg-[#09090b] border-[#ff5500]/40 hover:border-[#ff5500]/70' 
                  : 'bg-[#070709] border-[#ff5500]/10 hover:border-[#ff5500]/20 brightness-75'
                }
              `}
            >
              <div>
                {/* Icon wrapper */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`
                    w-11 h-11 rounded-lg flex items-center justify-center border
                    ${isUnlocked 
                      ? `bg-gradient-to-br ${getGradientClass(a.icon)} border-transparent` 
                      : 'bg-[#0d0a08] border-[#ff5500]/10 text-[#a18265]/40'
                    }
                  `}>
                    {getIconComponent(a.icon, isUnlocked)}
                  </div>
                  {!isUnlocked && (
                    <span className="text-[#a18265]/40 p-1 bg-[#060608] rounded border border-[#ff5500]/5" title="Bloqueado">
                      <Lock size={12} />
                    </span>
                  )}
                </div>

                <h3 className={`
                  font-mono text-xs font-bold uppercase tracking-wider mb-1.5
                  ${isUnlocked ? 'text-white' : 'text-[#a18265]/60'}
                `}>
                  {a.name}
                </h3>
                <p className={`
                  text-[10px] font-mono leading-relaxed
                  ${isUnlocked ? 'text-orange-200/60' : 'text-[#a18265]/40'}
                `}>
                  {a.desc}
                </p>
              </div>

              {/* Status footer labels */}
              <div className="mt-8 pt-3 border-t border-[#ff5500]/5 text-right">
                {isUnlocked ? (
                  <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-900/30 uppercase tracking-widest">
                    Completado
                  </span>
                ) : (
                  <span className="text-[9px] font-mono font-semibold text-[#a18265]/40 uppercase tracking-widest">
                    Bloqueado
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Bookmark, Trash2, ArrowRight, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { ERRORS_DB } from '../data/errors';

interface GuardadosProps {
  savedErrorIds: number[];
  onRemoveBookmark: (errorId: number) => Promise<void>;
  onNavigateToErrorInLibrary: (errorId: number) => void;
  aiErrors: any[];
  onDeleteAiError: (id: string) => Promise<void>;
}

export default function Guardados({ 
  savedErrorIds, 
  onRemoveBookmark, 
  onNavigateToErrorInLibrary,
  aiErrors,
  onDeleteAiError
}: GuardadosProps) {
  
  const bookmarkedErrors = ERRORS_DB.filter(e => savedErrorIds.includes(e.id));
  const [activeSection, setActiveSection] = useState<'catalogo' | 'ia'>('catalogo');
  const [expandedCatalogIds, setExpandedCatalogIds] = useState<number[]>([]);
  const [expandedAiIds, setExpandedAiIds] = useState<string[]>([]);

  const toggleCatalog = (id: number) => {
    setExpandedCatalogIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleAi = (id: string) => {
    setExpandedAiIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const getLangBadgeClass = (lang: string) => {
    switch (lang) {
      case 'JavaScript': return 'bg-red-500/10 border-red-500/30 text-orange-400';
      case 'Python': return 'bg-blue-500/10 border-blue-500/30 text-blue-300';
      case 'Java': return 'bg-red-500/10 border-red-500/30 text-red-300';
      case 'HTTP': return 'bg-purple-500/10 border-purple-500/30 text-purple-300';
      default: return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">

      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold font-sans tracking-tight text-white flex items-center gap-2 text-shadow-red text-shadow-[0_0_15px_rgba(255,107,0,0.3)]">
          <Bookmark className="text-[#ff5500] h-6 w-6" /> Errores guardados
        </h2>
        <p className="text-xs font-mono text-[#a18265]/80 mt-1">
          SU COLECCIÓN PERSONAL DE ERRORES CATALOGADOS EN EL DIARIO
        </p>
      </div>

      {/* Pestañas */}
      <div className="flex border-b border-[#ff5500]/15">
        <button
          onClick={() => setActiveSection('catalogo')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider transition cursor-pointer border-b-2 ${
            activeSection === 'catalogo'
              ? 'text-[#ff5500] border-[#ff5500]'
              : 'text-[#a18265]/60 border-transparent hover:text-[#a18265]'
          }`}
        >
          <Bookmark size={11} /> Del catálogo
          <span className="ml-1 text-[#a18265]/50">({bookmarkedErrors.length})</span>
        </button>
        <button
          onClick={() => setActiveSection('ia')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider transition cursor-pointer border-b-2 ${
            activeSection === 'ia'
              ? 'text-emerald-400 border-emerald-400'
              : 'text-[#a18265]/60 border-transparent hover:text-[#a18265]'
          }`}
        >
          <Sparkles size={11} /> Analizados con IA
          <span className="ml-1 text-[#a18265]/50">({aiErrors.length})</span>
        </button>
      </div>

      {/* Sección: Del catálogo */}
      {activeSection === 'catalogo' && (
        <div className="space-y-4">
          {bookmarkedErrors.length === 0 ? (
            <div className="text-center py-10 px-4 bg-[#0a0a0d] border border-[#ff5500]/15 rounded-xl flex flex-col items-center justify-center space-y-3">
              <Bookmark className="text-[#a18265] w-8 h-8 stroke-[1.5] opacity-50" />
              <p className="text-xs text-[#a18265] max-w-sm leading-relaxed font-mono">
                No tienes errores del catálogo guardados. Ve a la Biblioteca de errores y guarda los que más se te dificulten.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {bookmarkedErrors.map(e => {
                const isExpanded = expandedCatalogIds.includes(e.id);
                return (
                  <div key={e.id} className="bg-[#0a0a0d] border border-[#ff5500]/20 hover:border-[#ff5500]/30 rounded-xl overflow-hidden transition-all duration-200">
                    <div className="p-5 flex flex-col sm:flex-row justify-between items-start gap-4 bg-[#17110c]/40">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-extrabold text-[#f59e0b] text-base">{e.name}</span>
                          <span className={`inline-block border text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded uppercase ${getLangBadgeClass(e.lang)}`}>
                            {e.lang}
                          </span>
                        </div>
                        <p className="text-xs text-orange-200/70 font-mono leading-relaxed max-w-2xl">{e.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 sm:self-center">
                        <button
                          onClick={() => toggleCatalog(e.id)}
                          className="px-3 py-1.5 border border-[#ff5500]/25 hover:border-[#ff5500]/50 hover:bg-[#ff5500]/10 text-orange-300 rounded text-[10px] font-mono font-bold uppercase transition flex items-center gap-1 cursor-pointer"
                        >
                          {isExpanded ? <><ChevronUp size={12} /> Ver menos</> : <><ChevronDown size={12} /> Ver más</>}
                        </button>
                        <button
                          onClick={() => onNavigateToErrorInLibrary(e.id)}
                          className="px-3 py-1.5 border border-[#ff5500]/25 hover:border-[#ff5500]/50 hover:bg-[#ff5500]/10 text-[#ff5500] rounded text-[10px] font-mono font-bold uppercase transition flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowRight size={12} /> Biblioteca
                        </button>
                        <button
                          onClick={() => onRemoveBookmark(e.id)}
                          className="px-3 py-1.5 border border-red-500/20 hover:bg-red-500/10 text-red-400 rounded text-[10px] font-mono font-bold uppercase transition flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-5 bg-[#040405] border-t border-[#ff5500]/10 space-y-5">
                        <div className="space-y-1.5 text-xs font-mono">
                          <div className="text-[10px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Posibles causas
                          </div>
                          <ul className="list-disc pl-4 space-y-1 text-orange-200/60 leading-normal">
                            {e.causes.map((c: string, idx: number) => <li key={idx}>{c}</li>)}
                          </ul>
                        </div>
                        <div className="space-y-1.5 text-xs font-mono">
                          <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Cómo solucionarlo
                          </div>
                          <p className="text-orange-200/70 leading-relaxed">{e.solution}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2 text-xs font-mono">
                            <div className="text-[10px] font-bold text-red-500 uppercase">❌ Ejemplo Incorrecto</div>
                            <div className="p-3.5 bg-red-950/10 border border-red-500/20 rounded-lg text-red-300 whitespace-pre-wrap font-mono text-[11px]">{e.bad}</div>
                          </div>
                          <div className="space-y-2 text-xs font-mono">
                            <div className="text-[10px] font-bold text-emerald-400 uppercase">✔ Ejemplo Corregido</div>
                            <div className="p-3.5 bg-emerald-950/10 border border-emerald-500/20 rounded-lg text-emerald-300 whitespace-pre-wrap font-mono text-[11px]">{e.good}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Sección: Analizados con IA */}
      {activeSection === 'ia' && (
        <div className="space-y-4">
          {aiErrors.length === 0 ? (
            <div className="text-center py-10 px-4 bg-[#040a06] border border-emerald-500/15 rounded-xl flex flex-col items-center justify-center space-y-3">
              <Sparkles className="text-emerald-500/30 w-8 h-8" />
              <p className="text-xs text-[#a18265] max-w-sm leading-relaxed font-mono">
                Aún no has analizado ningún error con IA. Ve a la Biblioteca de errores y usa el Analizador IA.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {aiErrors.map(e => {
                const isExpanded = expandedAiIds.includes(e.id);
                return (
                  <div key={e.id} className="bg-[#040a06] border border-emerald-500/20 hover:border-emerald-500/35 rounded-xl overflow-hidden transition-all duration-200">
                    <div className="p-5 flex flex-col sm:flex-row justify-between items-start gap-4 bg-emerald-950/10">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-extrabold text-emerald-300 text-base">{e.titulo}</span>
                          <span className={`inline-block border text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded uppercase ${getLangBadgeClass(e.lenguaje)}`}>
                            {e.lenguaje}
                          </span>
                        </div>
                        <p className="text-xs text-emerald-100/50 font-mono leading-relaxed max-w-2xl">{e.descripcion}</p>
                      </div>
                      <div className="flex items-center gap-2 sm:self-center">
                        <button
                          onClick={() => toggleAi(e.id)}
                          className="px-3 py-1.5 border border-emerald-500/25 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-mono font-bold uppercase transition flex items-center gap-1 cursor-pointer"
                        >
                          {isExpanded ? <><ChevronUp size={12} /> Ver menos</> : <><ChevronDown size={12} /> Ver más</>}
                        </button>
                        <button
                          onClick={() => onDeleteAiError(e.id)}
                          className="px-3 py-1.5 border border-red-500/20 hover:bg-red-500/10 text-red-400 rounded text-[10px] font-mono font-bold uppercase transition flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-5 bg-[#020704] border-t border-emerald-500/10 space-y-5">
                        <div className="space-y-1.5 text-xs font-mono">
                          <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Qué significa
                          </div>
                          <p className="text-emerald-100/70 leading-relaxed">{e.descripcion}</p>
                        </div>
                        <div className="space-y-1.5 text-xs font-mono">
                          <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Cómo resolverlo
                          </div>
                          <p className="text-emerald-100/70 leading-relaxed">{e.solucion}</p>
                        </div>
                        <div className="space-y-1.5 text-xs font-mono">
                          <div className="text-[10px] font-bold text-[#a18265]/60 uppercase tracking-widest">Error original</div>
                          <div className="p-3 bg-black/40 border border-emerald-500/10 rounded-lg text-emerald-200/40 leading-relaxed whitespace-pre-wrap text-[11px]">
                            {e.error_original}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-[#a18265]/40">
                            {new Date(e.created_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
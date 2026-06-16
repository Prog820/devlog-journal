import React, { useState } from 'react';
import { Search, Bug, ChevronDown, ChevronUp, Bookmark, BookmarkCheck, Code } from 'lucide-react';
import { ErrorItem } from '../types';
import { ERRORS_DB } from '../data/errors';

interface ErroresProps {
  savedErrorIds: number[];
  onToggleSaveError: (errorId: number) => Promise<void>;
  onShowToast: (msg: string) => void;
  initialSearchQuery?: string;
}

export default function Errores({ 
  savedErrorIds, 
  onToggleSaveError, 
  onShowToast,
  initialSearchQuery = '' 
}: ErroresProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [expandedErrorIds, setExpandedErrorIds] = useState<number[]>([]);
  const [loadingMap, setLoadingMap] = useState<{ [id: number]: boolean }>({});

  const filterTabs = ['Todos', 'JavaScript', 'Python', 'Java', 'HTTP'];

  const getLangBadgeClass = (lang: string) => {
    switch (lang) {
      case 'JavaScript': return 'bg-red-500/10 border-red-500/30 text-orange-400';
      case 'Python': return 'bg-blue-500/10 border-blue-500/30 text-blue-300';
      case 'Java': return 'bg-red-500/10 border-red-500/30 text-red-300';
      case 'HTTP': return 'bg-purple-500/10 border-purple-500/30 text-purple-300';
      default: return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300';
    }
  };

  const toggleExpand = (id: number) => {
    if (expandedErrorIds.includes(id)) {
      setExpandedErrorIds(expandedErrorIds.filter(item => item !== id));
    } else {
      setExpandedErrorIds([...expandedErrorIds, id]);
    }
  };

  const handleBookmarkToggle = async (id: number) => {
    setLoadingMap(prev => ({ ...prev, [id]: true }));
    await onToggleSaveError(id);
    setLoadingMap(prev => ({ ...prev, [id]: false }));
  };

  // Filter & search logic
  const filteredErrors = ERRORS_DB.filter(e => {
    const matchTab = activeFilter === 'Todos' || e.lang === activeFilter;
    const cleanQuery = searchQuery.toLowerCase();
    const matchText = !cleanQuery || 
      e.name.toLowerCase().includes(cleanQuery) || 
      e.desc.toLowerCase().includes(cleanQuery) || 
      e.lang.toLowerCase().includes(cleanQuery);
    return matchTab && matchText;
  });

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold font-sans tracking-tight text-white flex items-center gap-2 text-shadow-red text-shadow-[0_0_15px_rgba(255,107,0,0.3)]">
          <Bug className="text-[#ff5500] h-6 w-6" /> Biblioteca de errores
        </h2>
        <p className="text-xs font-mono text-[#a18265]/80 mt-1">
          COMPENDIO TÁCTICO DE ERRORES Y SOLUCIONES DE PROGRAMACIÓN
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="flex gap-2.5 max-w-xl">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#a18265]">
            <Search size={16} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Busca por nombre, descripción o lenguaje..."
            className="w-full pl-9 pr-4 py-3 bg-[#110d0a] border border-[#ff5500]/25 rounded-md text-xs font-mono text-white placeholder-amber-100/20 focus:outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500]/30 transition"
          />
        </div>
      </div>

      {/* Filter Tabs Row */}
      <div className="flex flex-wrap gap-2 border-b border-[#ff5500]/10 pb-3">
        {filterTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`
              px-4 py-1.5 rounded text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer border transition duration-150
              ${tab === activeFilter 
                ? 'bg-[#ff5500]/15 text-white border-[#ff5500]/50 shadow-[0_0_10px_rgba(255,107,0,0.1)]' 
                : 'text-[#a18265]/80 bg-transparent border-transparent hover:text-orange-200 hover:border-red-500/10'
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 gap-5">
        {filteredErrors.length === 0 ? (
          <div className="text-center py-12 bg-[#0a0a0d] border border-[#ff5500]/15 rounded-xl flex flex-col items-center justify-center space-y-2">
            <Search className="text-[#a18265] w-8 h-8 opacity-40" />
            <h4 className="font-mono text-orange-300">Sin resultados</h4>
            <p className="text-xs text-[#a18265] font-mono">No se encontraron registros de error en el catálogo.</p>
          </div>
        ) : (
          filteredErrors.map(e => {
            const isExpanded = expandedErrorIds.includes(e.id);
            const isSaved = savedErrorIds.includes(e.id);
            const isLoading = !!loadingMap[e.id];

            return (
              <div 
                key={e.id}
                id={`ecard-${e.id}`}
                className="bg-[#0a0a0d] border border-[#ff5500]/20 hover:border-[#ff5500]/30 rounded-xl overflow-hidden transition-all duration-200 shadow-md scroll-mt-24"
              >
                {/* Header row */}
                <div className="p-5 flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-[#ff5500]/5 bg-[#17110c]/40">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-white font-extrabold text-[#f59e0b] text-base">
                        {e.name}
                      </span>
                      <span className={`inline-block border text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded uppercase ${getLangBadgeClass(e.lang)}`}>
                        {e.lang}
                      </span>
                    </div>
                    <p className="text-xs text-orange-200/70 font-mono leading-relaxed max-w-2xl">{e.desc}</p>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-2.5 sm:self-center">
                    <button
                      onClick={() => toggleExpand(e.id)}
                      className="px-3 py-1.5 border border-[#ff5500]/25 hover:border-[#ff5500]/50 hover:bg-[#ff5500]/10 text-orange-300 rounded text-[10px] font-mono font-bold uppercase transition flex items-center gap-1 cursor-pointer"
                    >
                      {isExpanded ? (
                        <>Ver menos <ChevronUp size={12} /></>
                      ) : (
                        <>Ver más <ChevronDown size={12} /></>
                      )}
                    </button>
                    <button
                      disabled={isLoading}
                      onClick={() => handleBookmarkToggle(e.id)}
                      className={`
                        px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase transition flex items-center gap-1.5 border cursor-pointer
                        ${isSaved 
                          ? 'bg-[#ff5500]/15 border-[#ff5500] text-white shadow-[0_0_10px_rgba(255,107,0,0.2)]' 
                          : 'border-[#ff5500]/25 hover:border-[#ff5500]/60 text-[#a18265] hover:text-orange-300'
                        }
                      `}
                    >
                      {isSaved ? (
                        <><BookmarkCheck size={12} className="text-[#ff5500]" /> Guardado</>
                      ) : (
                        <><Bookmark size={12} /> Guardar</>
                      )}
                    </button>
                  </div>
                </div>

                {/* Collapsible expanded detail */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 bg-[#040405] border-t border-[#ff5500]/10 space-y-5 animate-slide-down">
                    
                    {/* Causes Column */}
                    <div className="space-y-1.5 text-xs font-mono">
                      <div className="text-[10px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Posibles causas
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-orange-200/60 leading-normal">
                        {e.causes.map((c, idx) => (
                          <li key={idx}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    {/* How to solve */}
                    <div className="space-y-1.5 text-xs font-mono">
                      <div className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Cómo solucionarlo
                      </div>
                      <p className="text-orange-200/70 leading-relaxed pr-2">{e.solution}</p>
                    </div>

                    {/* Monospace Code Codeblocks */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Incorrect block */}
                      <div className="space-y-2 text-xs font-mono">
                        <div className="text-[10px] font-bold text-red-500 tracking-wider flex items-center gap-1.5 uppercase">
                          ❌ Ejemplo Incorrecto
                        </div>
                        <div className="p-3.5 bg-red-950/10 border border-red-500/20 rounded-lg text-red-300 leading-normal whitespace-pre-wrap select-all font-mono text-[11px]">
                          {e.bad}
                        </div>
                      </div>

                      {/* Corrected block */}
                      <div className="space-y-2 text-xs font-mono">
                        <div className="text-[10px] font-bold text-emerald-400 tracking-wider flex items-center gap-1.5 uppercase">
                          ✔ Ejemplo Corregido
                        </div>
                        <div className="p-3.5 bg-emerald-950/10 border border-emerald-500/20 rounded-lg text-emerald-300 leading-normal whitespace-pre-wrap select-all font-mono text-[11px]">
                          {e.good}
                        </div>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

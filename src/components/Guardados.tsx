import React from 'react';
import { Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { ErrorItem } from '../types';
import { ERRORS_DB } from '../data/errors';

interface GuardadosProps {
  savedErrorIds: number[];
  onRemoveBookmark: (errorId: number) => Promise<void>;
  onNavigateToErrorInLibrary: (errorId: number) => void;
}

export default function Guardados({ 
  savedErrorIds, 
  onRemoveBookmark, 
  onNavigateToErrorInLibrary 
}: GuardadosProps) {
  
  const bookmarkedErrors = ERRORS_DB.filter(e => savedErrorIds.includes(e.id));

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

      {/* Grid mapping logs */}
      <div>
        {bookmarkedErrors.length === 0 ? (
          <div className="text-center py-16 px-4 bg-[#0a0a0d] border border-[#ff5500]/15 rounded-xl flex flex-col items-center justify-center space-y-3">
            <Bookmark className="text-[#a18265] w-12 h-12 stroke-[1.5] opacity-50" />
            <h4 className="font-mono text-[#fef3c7] font-bold uppercase text-sm">Colección vacía</h4>
            <p className="text-xs text-[#a18265] max-w-sm leading-relaxed">
              No tienes ningún error guardado todavía. Navega a la "Biblioteca de errores" y presiona guardar en aquellos problemas que más se te dificulten para estudiarlos después.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {bookmarkedErrors.map(e => (
              <div 
                key={e.id}
                className="p-5 bg-[#0a0a0d] border border-[#ff5500]/20 hover:border-[#ff5500]/45 rounded-xl transition duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="font-mono text-white font-extrabold text-[#f59e0b] text-sm">
                      {e.name}
                    </h3>
                    <span className={`inline-block border text-[8.5px] font-mono font-bold tracking-wider px-2 py-0.5 rounded uppercase ${getLangBadgeClass(e.lang)}`}>
                      {e.lang}
                    </span>
                  </div>
                  <p className="text-xs text-orange-200/60 font-mono leading-relaxed line-clamp-3 mb-5 pr-2">
                    {e.desc}
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between border-t border-[#ff5500]/10 pt-4 mt-auto">
                  <button
                    onClick={() => onNavigateToErrorInLibrary(e.id)}
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-[#ff5500] hover:text-orange-500 group transition cursor-pointer"
                  >
                    Ver en biblioteca <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => onRemoveBookmark(e.id)}
                    className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold hover:font-bold text-red-400 hover:text-red-300 transition duration-100 cursor-pointer"
                  >
                    <Trash2 size={12} /> Quitar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

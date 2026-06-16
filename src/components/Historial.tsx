import React, { useState } from 'react';
import { History, Calendar, Smile, Clock, Trash2, X, FileText, ChevronRight, MessageSquareCode } from 'lucide-react';
import { Week } from '../types';

interface HistorialProps {
  weeks: Week[];
  onDeleteWeek: (id: string) => Promise<void>;
}

export default function Historial({ weeks, onDeleteWeek }: HistorialProps) {
  const [selectedWeek, setSelectedWeek] = useState<Week | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getTechColorClass = (techName: string) => {
    switch (techName) {
      case 'JavaScript': return 'border-red-500/30 text-orange-300 bg-red-500/5';
      case 'TypeScript': return 'border-indigo-500/30 text-indigo-300 bg-indigo-500/5';
      case 'Python': return 'border-blue-500/30 text-blue-300 bg-blue-500/5';
      case 'React': return 'border-emerald-500/30 text-emerald-300 bg-emerald-500/5';
      case 'Node.js': return 'border-green-600/30 text-green-300 bg-green-600/5';
      case 'Java': return 'border-red-500/30 text-red-300 bg-red-500/5';
      case 'SQL': return 'border-red-500/30 text-orange-300 bg-red-500/5';
      case 'IA / Machine Learning': return 'border-purple-500/30 text-purple-300 bg-purple-500/5';
      default: return 'border-amber-600/20 text-orange-300 bg-amber-600/5';
    }
  };

  const handleOpenModal = (w: Week) => {
    setSelectedWeek(w);
  };

  const handleCloseModal = () => {
    setSelectedWeek(null);
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (confirm('¿Estás seguro de que deseas eliminar este registro de semana?')) {
      setDeleteLoading(true);
      await onDeleteWeek(id);
      setDeleteLoading(false);
      setSelectedWeek(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in relative">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold font-sans tracking-tight text-white flex items-center gap-2 text-shadow-red text-shadow-[0_0_15px_rgba(255,107,0,0.3)]">
          <History className="text-[#ff5500] h-6 w-6" /> Historial
        </h2>
        <p className="text-xs font-mono text-[#a18265]/80 mt-1">
          REGISTRO CRONOLÓGICO DE LOGROS Y APRENDIZAJES SEMANALES
        </p>
      </div>

      {/* List content */}
      <div id="historial-list" className="space-y-4">
        {weeks.length === 0 ? (
          <div className="text-center py-16 px-4 bg-[#0a0a0d] border border-[#ff5500]/15 rounded-xl flex flex-col items-center justify-center space-y-3">
            <History className="text-[#a18265] w-12 h-12 stroke-[1.5] opacity-50" />
            <h4 className="font-mono text-[#fef3c7] font-bold uppercase text-sm">Bitácora vacía</h4>
            <p className="text-xs text-[#a18265] max-w-sm leading-relaxed">
              Aún no tienes semanas registradas a tu nombre. Dirígete al panel "Registrar semana" para catalogar tus primeras horas de estudio.
            </p>
          </div>
        ) : (
          weeks.map(w => {
            const truncatedLearnings = w.aprendizajes 
              ? (w.aprendizajes.length > 130 ? `${w.aprendizajes.substring(0, 130)}...` : w.aprendizajes)
              : '';
            const truncatedLogros = w.logros 
              ? (w.logros.length > 130 ? `${w.logros.substring(0, 130)}...` : w.logros)
              : '';

            return (
              <div 
                key={w.id || w.semana}
                onClick={() => handleOpenModal(w)}
                className="group p-5 bg-[#0a0a0d] border border-[#ff5500]/20 hover:border-[#ff5500]/50 rounded-xl cursor-pointer transition-all duration-200 shadow-md relative text-left"
              >
                {/* Visual hover neon aura */}
                <div className="absolute top-0 left-0 w-1 h-full bg-[#ff5500] rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                  <div>
                    <h3 className="font-mono text-[#fef3c7] font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                      Semana {w.semana} 
                      <span className="text-[10px] text-[#a18265] font-normal lowercase tracking-normal">({w.fecha})</span>
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold bg-emerald-950/20 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                      <Clock size={10} /> {w.horas}h
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold bg-[#ff5500]/5 text-[#ff5500] border border-[#ff5500]/20 px-2 py-0.5 rounded">
                      <Smile size={10} /> {w.satisfaccion}/10
                    </span>
                    <span className={`inline-flex py-0.5 px-2.5 rounded text-[10px] font-mono font-bold tracking-wide border uppercase ${getTechColorClass(w.tech)}`}>
                      {w.tech}
                    </span>
                  </div>
                </div>

                {/* Body Snippet */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  {truncatedLearnings && (
                    <div className="space-y-1">
                      <div className="text-[#a18265] text-[10px] uppercase font-bold tracking-wider">Aprendizaje</div>
                      <p className="text-orange-200/70 line-clamp-2 pr-2">{truncatedLearnings}</p>
                    </div>
                  )}
                  {truncatedLogros && (
                    <div className="space-y-1">
                      <div className="text-red-500 text-[10px] uppercase font-bold tracking-wider">Logros destacados</div>
                      <p className="text-orange-200/70 line-clamp-2 pr-2">{truncatedLogros}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end items-center mt-4 text-[10px] font-mono font-bold uppercase text-[#ff5500] opacity-80 group-hover:opacity-100 transition-opacity gap-1">
                  Ver Bitácora Completa <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* FULL DETAILS MODAL */}
      {selectedWeek && (
        <div 
          id="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div className="bg-[#0a0a0d] border border-[#ff5500]/40 rounded-xl shadow-2xl p-6 w-full max-w-lg overflow-y-auto max-h-[90vh] text-left animate-slide-up select-text">
            
            {/* Header */}
            <div className="flex justify-between items-start pb-4 border-b border-[#ff5500]/15 mb-5">
              <div>
                <h3 className="font-mono text-[#fef3c7] font-extrabold text-base uppercase tracking-wider flex items-center gap-2">
                  Registro Semana {selectedWeek.semana}
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#a18265]/90 mt-1">
                  <Calendar size={11} className="text-[#ff5500]" /> {selectedWeek.fecha} · {selectedWeek.tech}
                </span>
              </div>
              <button 
                onClick={handleCloseModal}
                className="p-1 px-1.5 border border-[#ff5500]/20 rounded hover:bg-[#ff5500]/10 text-red-500 cursor-pointer transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Fields Content */}
            <div className="space-y-4 text-xs font-mono">
              
              {/* Field: Aprendizajes */}
              {selectedWeek.aprendizajes && (
                <div className="p-3 bg-[#050506] border border-[#ff5500]/10 rounded-lg space-y-1">
                  <div className="text-[10px] font-bold text-[#ff5500] uppercase tracking-wider">Aprendizaje obtenido</div>
                  <p className="text-white leading-relaxed whitespace-pre-wrap">{selectedWeek.aprendizajes}</p>
                </div>
              )}

              {/* Field: Logros */}
              {selectedWeek.logros && (
                <div className="p-3 bg-[#050506] border border-[#ff5500]/10 rounded-lg space-y-1">
                  <div className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Logros completados</div>
                  <p className="text-white leading-relaxed whitespace-pre-wrap">{selectedWeek.logros}</p>
                </div>
              )}

              {/* Field: Bloqueos */}
              {selectedWeek.bloqueos && (
                <div className="p-3 bg-[#050506] border border-red-500/10 rounded-lg space-y-1">
                  <div className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Bloqueos encontrados</div>
                  <p className="text-white leading-relaxed whitespace-pre-wrap">{selectedWeek.bloqueos}</p>
                </div>
              )}

              {/* Field: Mejoras */}
              {selectedWeek.mejoras && (
                <div className="p-3 bg-[#050506] border border-emerald-500/10 rounded-lg space-y-1">
                  <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Plan de mejora próximo sprint</div>
                  <p className="text-white leading-relaxed whitespace-pre-wrap">{selectedWeek.mejoras}</p>
                </div>
              )}

              {/* Grid block: hours and satisfaction */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-3 bg-[#050506] border border-[#ff5500]/10 rounded-lg">
                  <div className="text-[10px] font-bold text-[#a18265] uppercase tracking-wider">Estudio</div>
                  <div className="text-sm font-bold text-white mt-1">{selectedWeek.horas} horas</div>
                </div>

                <div className="p-3 bg-[#050506] border border-[#ff5500]/10 rounded-lg flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-[#a18265] uppercase tracking-wider">Satisfacción</div>
                    <div className="text-sm font-bold text-white mt-1">{selectedWeek.satisfaccion} / 10</div>
                  </div>
                  {/* Sat visual gradient line */}
                  <div className="w-full bg-[#111115] h-1.5 rounded-full mt-2.5 overflow-hidden border border-red-950/40">
                    <div 
                      className="bg-[#f59e0b] h-full rounded-full"
                      style={{ width: `${selectedWeek.satisfaccion * 10}%` }}
                    ></div>
                  </div>
                </div>
              </div>

            </div>

            {/* Actions panel */}
            <div className="flex justify-between items-center mt-6 pt-5 border-t border-[#ff5500]/15">
              <button
                disabled={deleteLoading}
                onClick={() => handleDelete(selectedWeek.id)}
                className="flex items-center gap-1.5 px-3 py-2 border border-red-500/50 hover:bg-red-500/10 text-red-400 disabled:opacity-40 rounded text-xs font-mono font-bold cursor-pointer transition"
              >
                <Trash2 size={13} /> {deleteLoading ? 'Eliminando...' : 'Eliminar registro'}
              </button>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-[#111115] border border-[#ff5500]/20 hover:border-[#ff5500]/50 rounded text-xs font-mono font-bold text-orange-300 hover:text-white cursor-pointer transition"
              >
                Volver
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { PenSquare, AlertTriangle, BookOpen, Clock, Code, Smile, Eraser, Check } from 'lucide-react';
import { Week } from '../types';

interface DiarioProps {
  onSaveWeek: (week: Omit<Week, 'id' | 'user_id' | 'created_at'>) => void;
  onShowToast: (msg: string) => void;
  totalWeeksRegistered: number;
}

export default function Diario({ onSaveWeek, onShowToast, totalWeeksRegistered }: DiarioProps) {
  const [aprendizajes, setAprendizajes] = useState('');
  const [bloqueos, setBloqueos] = useState('');
  const [logros, setLogros] = useState('');
  const [mejoras, setMejoras] = useState('');
  const [horas, setHoras] = useState('');
  const [tech, setTech] = useState('');
  const [satisfaccion, setSatisfaccion] = useState(7);

  const handleClear = () => {
    setAprendizajes('');
    setBloqueos('');
    setLogros('');
    setMejoras('');
    setHoras('');
    setTech('');
    setSatisfaccion(7);
    onShowToast('Consola de entrada restablecida.');
  };

  const handleSave = () => {
    const cleanAprendizajes = aprendizajes.trim();
    const cleanLogros = logros.trim();

    if (!cleanAprendizajes && !cleanLogros) {
      onShowToast('Completa al menos "qué aprendiste" o "qué lograste".');
      return;
    }

    const payload = {
      fecha: new Date().toISOString().split('T')[0],
      semana: totalWeeksRegistered + 1,
      aprendizajes: cleanAprendizajes,
      bloqueos: bloqueos.trim(),
      logros: cleanLogros,
      mejoras: mejoras.trim(),
      horas: Number(horas) || 0,
      tech: tech || 'Otra',
      satisfaccion: Number(satisfaccion)
    };

    onSaveWeek(payload);
    
    // Clear state
    setAprendizajes('');
    setBloqueos('');
    setLogros('');
    setMejoras('');
    setHoras('');
    setTech('');
    setSatisfaccion(7);
  };

  const technologies = [
    'JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 
    'SQL', 'HTML/CSS', 'Git', 'Java', 'PHP', 'IA / Machine Learning', 'Otra'
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold font-sans tracking-tight text-white flex items-center gap-2 text-shadow-red text-shadow-[0_0_15px_rgba(255,107,0,0.3)]">
          <PenSquare className="text-[#ff5500] h-6 w-6" /> Registrar semana
        </h2>
        <p className="text-xs font-mono text-[#a18265]/80 mt-1">
          CONSOLA CENTRAL DE CATALOGACIÓN PARA EL SPRINT CORRIENTE
        </p>
      </div>

      {/* Main card containing input form */}
      <div className="bg-[#0a0a0d] border border-[#ff5500]/20 rounded-xl p-5 sm:p-8 shadow-[0_0_20px_rgba(255,107,0,0.03)] selection:bg-[#ff5500]/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Section: Aprendizajes */}
          <div className="md:col-span-2 space-y-1.5 text-left">
            <label className="block text-xs font-mono font-bold text-[#ff5500] uppercase tracking-wider">
              ¿Qué aprendiste esta semana?  <span className="text-red-500/50 text-[10px] lowercase font-normal">(requerido si "logros" está vacío)</span>
            </label>
            <textarea
              id="f-aprendizajes"
              rows={3}
              value={aprendizajes}
              onChange={(e) => setAprendizajes(e.target.value)}
              placeholder="Ej: Estudié React Hooks fundamentales, practiqué cláusulas SQL JOIN, entendí verbos HTTP de REST APIs..."
              className="w-full px-4 py-3 bg-[#050506] border border-[#ff5500]/20 focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500]/30 rounded-lg text-xs font-mono text-white placeholder-amber-100/20 focus:outline-none transition duration-150"
            />
          </div>

          {/* Section: Bloqueos */}
          <div className="md:col-span-2 space-y-1.5 text-left">
            <label className="block text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
              ¿Qué bloqueó tu progreso?  <span className="text-red-500/50 text-[10px] lowercase font-normal">(opcional)</span>
            </label>
            <textarea
              id="f-bloqueos"
              rows={2}
              value={bloqueos}
              onChange={(e) => setBloqueos(e.target.value)}
              placeholder="Ej: Me costó configurar CORS en el backend, tuve problemas con el tipado estricto de TypeScript..."
              className="w-full px-4 py-3 bg-[#050506] border border-red-500/20 focus:border-red-500 focus:ring-1 focus:ring-red-500/30 rounded-lg text-xs font-mono text-white placeholder-amber-100/20 focus:outline-none transition duration-150"
            />
          </div>

          {/* Section: Logros */}
          <div className="md:col-span-2 space-y-1.5 text-left">
            <label className="block text-xs font-mono font-bold text-[#f59e0b] uppercase tracking-wider">
              ¿Qué lograste esta semana?  <span className="text-red-500/50 text-[10px] lowercase font-normal">(requerido si "aprendizajes" está vacío)</span>
            </label>
            <textarea
              id="f-logros"
              rows={2}
              value={logros}
              onChange={(e) => setLogros(e.target.value)}
              placeholder="Ej: Terminé maquetas responsivas del dashboard, integré oauth y lo desplegué con éxito en Cloud Run..."
              className="w-full px-4 py-3 bg-[#050506] border border-red-500/20 focus:border-red-500 focus:ring-1 focus:ring-amber-500/30 rounded-lg text-xs font-mono text-white placeholder-amber-100/20 focus:outline-none transition duration-150"
            />
          </div>

          {/* Section: Mejoras */}
          <div className="md:col-span-2 space-y-1.5 text-left">
            <label className="block text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              ¿Qué quieres mejorar la próxima semana?  <span className="text-red-500/50 text-[10px] lowercase font-normal">(opcional)</span>
            </label>
            <textarea
              id="f-mejoras"
              rows={2}
              value={mejoras}
              onChange={(e) => setMejoras(e.target.value)}
              placeholder="Ej: Practicar resolución de algoritmos en LeetCode, aprender testing automatizado..."
              className="w-full px-4 py-3 bg-[#050506] border border-emerald-500/20 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 rounded-lg text-xs font-mono text-white placeholder-amber-100/20 focus:outline-none transition duration-150"
            />
          </div>

          {/* Column Left: Hours input */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Clock size={13} className="text-[#ff5500]" /> Horas de estudio esta semana
            </label>
            <input
              id="f-horas"
              type="number"
              min="0"
              max="168"
              value={horas}
              onChange={(e) => setHoras(e.target.value)}
              placeholder="Ej: 15"
              className="w-full px-4 py-3 bg-[#050506] border border-[#ff5500]/20 focus:border-[#ff5500] rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-[#ff5500]/30 transition"
            />
          </div>

          {/* Column Right: Main tech selector */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Code size={13} className="text-[#f59e0b]" /> Tecnología principal
            </label>
            <select
              id="f-tech"
              value={tech}
              onChange={(e) => setTech(e.target.value)}
              className="w-full px-4 py-3 bg-[#050506] border border-[#ff5500]/20 focus:border-[#ff5500] rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-[#ff5500]/30 transition appearance-none cursor-pointer"
            >
              <option value="" className="bg-[#050506] text-orange-200/30">Selecciona una tecnología</option>
              {technologies.map(lang => (
                <option key={lang} value={lang} className="bg-[#050506] text-white">
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Row: Satisfaction level range */}
          <div className="md:col-span-2 space-y-2 mt-2 text-left">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-mono font-bold text-[#ff5500] uppercase tracking-wider flex items-center gap-1.5">
                <Smile size={13} /> Nivel de satisfacción
              </label>
              <span className="font-mono text-sm font-extrabold text-white bg-[#ff5500]/15 border border-[#ff5500]/40 px-2 py-0.5 rounded">
                <span id="sat-label">{satisfaccion}</span> / 10
              </span>
            </div>
            <div className="flex items-center gap-4 bg-[#050506] p-3 border border-[#ff5500]/10 rounded-lg">
              <span className="text-xs font-mono text-[#a18265]">1/Insatisfecho</span>
              <input
                id="f-satisfaccion"
                type="range"
                min="1"
                max="10"
                value={satisfaccion}
                onChange={(e) => setSatisfaccion(Number(e.target.value))}
                className="flex-1 h-1.5 bg-[#111115] border border-red-950 rounded-lg appearance-none cursor-pointer accent-[#ff5500] focus:outline-none focus:ring-0"
              />
              <span className="text-xs font-mono text-[#a18265]">10/Excelente</span>
            </div>
          </div>

          {/* Form action buttons */}
          <div className="md:col-span-2 flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 pt-6 border-t border-[#ff5500]/15">
            <button
              onClick={handleClear}
              className="flex items-center justify-center gap-2 px-5 py-3 border border-red-500/40 text-red-400 hover:text-white hover:bg-red-500/10 rounded-lg text-xs font-mono font-semibold transition cursor-pointer"
            >
              <Eraser size={14} /> Limpiar formulario
            </button>
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff5500] to-[#f59e0b] hover:from-[#ff8133] hover:to-[#ffb020] text-black font-extrabold rounded-lg text-xs font-mono transition transform hover:-translate-y-0.5 shadow-[0_0_15px_rgba(255,107,0,0.2)] hover:shadow-[0_0_25px_rgba(255,107,0,0.4)] cursor-pointer"
            >
              <Check size={14} /> Guardar semana
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

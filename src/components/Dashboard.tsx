import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { Week } from '../types';
import { Award, BookOpen, Clock, Activity, Zap } from 'lucide-react';

interface DashboardProps {
  weeks: Week[];
}

export default function Dashboard({ weeks }: DashboardProps) {
  // Aggregate stats
  const totalWeeks = weeks.length;
  const totalHours = weeks.reduce((acc, curr) => acc + (Number(curr.horas) || 0), 0);
  const avgSatisfaction = totalWeeks 
    ? (weeks.reduce((acc, curr) => acc + (Number(curr.satisfaccion) || 0), 0) / totalWeeks).toFixed(1)
    : '—';

  // Compute top technology
  const techCount: { [key: string]: number } = {};
  weeks.forEach(w => {
    if (w.tech) {
      techCount[w.tech] = (techCount[w.tech] || 0) + 1;
    }
  });
  const sortedTechs = Object.entries(techCount).sort((a, b) => b[1] - a[1]);
  const topTech = sortedTechs.length ? sortedTechs[0][0] : '—';

  // Prepare chart series (newest last)
  const chartData = [...weeks].reverse().map((w, index) => ({
    name: `S${index + 1}`,
    weekNum: w.semana,
    fecha: w.fecha,
    horas: Number(w.horas) || 0,
    satisfaccion: Number(w.satisfaccion) || 0,
    tech: w.tech
  }));

  // Style helper for tooltips
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#0a0a0d] border border-[#ff5500]/40 p-3 rounded-lg shadow-xl font-mono text-[11px] text-[#fef3c7]">
          <p className="text-white font-bold mb-1.5 uppercase border-b border-[#ff5500]/20 pb-1">Semana {data.weekNum} ({data.fecha})</p>
          <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span> Horas: <strong className="text-white">{data.horas}h</strong></p>
          <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]"></span> Satisfacción: <strong className="text-white">{data.satisfaccion}/10</strong></p>
          <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Lenguaje: <strong className="text-white">{data.tech}</strong></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold font-sans tracking-tight text-white flex items-center gap-2 text-shadow-red text-shadow-[0_0_15px_rgba(255,107,0,0.3)]">
          <Activity className="text-[#ff5500] h-6 w-6" /> Dashboard
        </h2>
        <p className="text-xs font-mono text-[#a18265]/80 mt-1">
          PANEL PRINCIPAL DE TELEMETRÍA Y CONTROL DE PROGRESO
        </p>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Stat Card 1 */}
        <div className="p-4 sm:p-6 bg-[#0a0a0d] border border-[#ff5500]/20 hover:border-[#ff5500]/40 rounded-xl transition duration-300 relative group overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-gradient-to-br from-[#ff5500]/5 to-transparent rounded-full blur-xl"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#a18265] uppercase">
              Semanas
            </span>
            <BookOpen size={16} className="text-[#ff5500] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono leading-none tracking-tight">
            {totalWeeks}
          </div>
          <p className="text-[9px] font-mono text-[#a18265] mt-2">Registradas en bitácora</p>
        </div>

        {/* Stat Card 2 */}
        <div className="p-4 sm:p-6 bg-[#0a0a0d] border border-[#ff5500]/20 hover:border-[#ff5500]/40 rounded-xl transition duration-300 relative group overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-gradient-to-br from-[#f59e0b]/5 to-transparent rounded-full blur-xl"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#a18265] uppercase">
              Horas
            </span>
            <Clock size={16} className="text-[#f59e0b] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono leading-none tracking-tight">
            {totalHours}<span className="text-xs font-sans text-red-500 font-semibold ml-0.5">h</span>
          </div>
          <p className="text-[9px] font-mono text-[#a18265] mt-2">Tiempo total de estudio</p>
        </div>

        {/* Stat Card 3 */}
        <div className="p-4 sm:p-6 bg-[#0a0a0d] border border-[#ff5500]/20 hover:border-[#ff5500]/40 rounded-xl transition duration-300 relative group overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full blur-xl"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#a18265] uppercase">
              Satisfacción
            </span>
            <Award size={16} className="text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono leading-none tracking-tight">
            {avgSatisfaction}<span className="text-xs font-sans text-[#a18265] ml-0.5">/10</span>
          </div>
          <p className="text-[9px] font-mono text-[#a18265] mt-2">Promedio emocional de sprint</p>
        </div>

        {/* Stat Card 4 */}
        <div className="p-4 sm:p-6 bg-[#0a0a0d] border border-[#ff5500]/20 hover:border-[#ff5500]/40 rounded-xl transition duration-300 relative group overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-xl"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#a18265] uppercase">
              Tecnología Top
            </span>
            <Zap size={16} className="text-[#ff5500] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-base sm:text-lg font-bold text-white font-mono leading-7 truncate tracking-tight uppercase" title={topTech}>
            {topTech}
          </div>
          <p className="text-[9px] font-mono text-[#a18265] mt-2">Core del aprendizaje</p>
        </div>

      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Column Left: Hours bar chart */}
        <div className="p-4 sm:p-5 bg-[#0a0a0d] border border-[#ff5500]/20 rounded-xl relative">
          <h3 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-6 border-b border-[#ff5500]/10 pb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]"></span> Horas de estudio por semana
          </h3>
          <div className="h-60 w-full font-mono text-[10px]">
            {totalWeeks === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#a18265]/60">
                <p>Navega a cannel "Registrar semana" para renderizar estadísticas.</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#231d18" vertical={false} />
                  <XAxis dataKey="name" stroke="#8b7355" tickLine={false} fontSize={10} />
                  <YAxis stroke="#8b7355" tickLine={false} fontSize={10} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,107,0,0.04)' }} />
                  <Bar dataKey="horas" fill="#ff5500" radius={[4, 4, 0, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Column Right: Satisfaction Line Chart */}
        <div className="p-4 sm:p-5 bg-[#0a0a0d] border border-[#ff5500]/20 rounded-xl relative">
          <h3 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-6 border-b border-[#ff5500]/10 pb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span> Nivel de satisfacción semanal
          </h3>
          <div className="h-60 w-full font-mono text-[10px]">
            {totalWeeks === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#a18265]/60">
                <p>Navega a cannel "Registrar semana" para renderizar estadísticas.</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#231d18" vertical={false} />
                  <XAxis dataKey="name" stroke="#8b7355" tickLine={false} fontSize={10} />
                  <YAxis stroke="#8b7355" tickLine={false} fontSize={10} domain={[0, 10]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="satisfaccion" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    dot={{ r: 4, stroke: '#0a0a0d', strokeWidth: 1.5, fill: '#f59e0b' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>

      {/* Techologies taglist */}
      <div className="p-4 sm:p-6 bg-[#0a0a0d] border border-[#ff5500]/20 rounded-xl">
        <h3 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-4 border-b border-[#ff5500]/10 pb-3">
          Distribución de Tecnologías Estudiadas
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {weeks.length === 0 ? (
            <span className="text-xs font-mono text-[#a18265]/70 italic py-2">
              Registra tu primer reporte semanal para empezar a mapear tus tecnologías del diario.
            </span>
          ) : (
            Object.entries(techCount).map(([techName, count]) => {
              return (
                <span 
                  key={techName} 
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-semibold bg-[#111115] border border-[#ff5500]/30 text-orange-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]"></span>
                  {techName} <span className="text-[#a18265] text-[10px] ml-1">({count} {count === 1 ? 'semana' : 'semanas'})</span>
                </span>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

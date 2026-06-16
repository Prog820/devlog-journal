import React, { useState, useEffect } from 'react';
import { Terminal, Bot, Sparkles, BookOpen, Star, ShieldAlert, Target, Trophy, Play, ArrowDown, ChevronRight, Zap } from 'lucide-react';

interface LandingPageProps {
  onLogin: (mode?: 'login' | 'register') => void;
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  const [typedCode, setTypedCode] = useState('');
  const codeString = `const dev = {\n  username: "Grower",\n  status: "learning",\n  skills: ["React", "TypeScript", "SQL"],\n  logProgress: () => "Evidence of Growth!"\n};`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedCode((prev) => prev + codeString.charAt(index));
      index++;
      if (index >= codeString.length) {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="landing-page" className="bg-[#0d0d0d] text-[#e0e0e0] min-h-screen font-sans selection:bg-[#ff2200]/30 selection:text-white relative overflow-x-hidden border-4 border-[#ff220033]">
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,34,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,34,0,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      
      {/* Top glowing ambient lights */}
      <div className="absolute top-[-10%] left-[10%] w-[350px] h-[350px] rounded-full bg-radial-gradient bg-[radial-gradient(ellipse_at_center,rgba(255,34,0,0.08),transparent_70%)] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-5%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,34,0,0.05),transparent_70%)] pointer-events-none"></div>

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[#030304]/95 backdrop-blur-md border-b border-[#ff220033]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 bg-[#ff2200] rounded-full animate-pulse shadow-[0_0_10px_#ff2200]"></div>
            <span className="text-xl font-bold tracking-tighter text-[#ff2200] font-mono flex items-center gap-1">
              DEVGROWTH
            </span>
          </div>
          
          <button 
            id="login-btn-nav"
            onClick={() => onLogin('login')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-mono border border-[#ff220088] bg-[#030304] text-[#ff2200] hover:text-white hover:bg-[#ff220022] rounded-none transition duration-150 cursor-pointer shadow-[0_0_10px_rgba(255,34,0,0.15)] font-mono"
          >
            INICIAR_SESION
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-6xl mx-auto px-2 md:px-8 pt-16 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-[#ff220011] border border-[#ff220055] text-xs font-semibold uppercase tracking-wider text-[#ff2200] mb-5 font-mono">
              <span className="w-1.5 h-1.5 bg-[#ff2200] rounded-full animate-ping" /> CORE_SYSTEM_INITIATED_OK
            </span>
            <h1 className="text-[2rem] font-bold tracking-tight text-white leading-none mb-6 font-mono">
              CONVIERTE_TU_APRENDIZAJE_<br />
                EN_<span className="text-[#ff4900cf] drop-shadow-[0_0_15px_rgba(255,77,0,0.82)] text-shadow-yellow">
                EVIDENCIA
            </span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-mono">
              Registra tu progreso como desarrollador, documenta lo que aprendes cada semana y visualiza tu crecimiento profesional a lo largo del tiempo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto">
              <button 
                id="login-btn-hero"
                onClick={() => onLogin('login')}
                className="flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-[#ff2200] border-2 border-[#ff2200] bg-[#ff220011] hover:bg-[#ff220022] rounded-none transition duration-150 cursor-pointer shadow-[0_0_20px_rgba(255,34,0,0.3)] font-mono"
              >
                <img src="https://www.google.com/favicon.ico" width="20" height="20" alt="Google" className="rounded-full bg-white p-0.5" />
                ACCEDER_CON_GOOGLE
              </button>
              
            </div>
          </div>

          {/* Glowing Code Window Visual */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 rounded-none bg-[#ff2200] opacity-20 blur-md animate-pulse"></div>
            <div className="relative bg-[#030304] border-2 border-[#ff220055] rounded-none overflow-hidden shadow-[0_0_30px_rgba(255,34,0,0.15)] font-mono text-xs">
              
              {/* Terminal Title Bar */}
              <div className="bg-[#111111] px-4 py-2 border-b border-[#ff220033] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-none bg-[#ef4444] inline-block opacity-85"></span>
                  <span className="w-2.5 h-2.5 rounded-none bg-[#ff2200] inline-block opacity-85"></span>
                  <span className="w-2.5 h-2.5 rounded-none bg-[#00ff99] inline-block opacity-85"></span>
                </div>
                <span className="text-[#ff2200] text-[10px] tracking-widest font-mono uppercase">DEVGROWTH</span>
                <div></div>
              </div>

              {/* Terminal Code Body */}
              <div className="p-5 overflow-auto max-height-[240px] text-[#e0e0e0] leading-normal">
                <pre className="text-gray-600 mb-2"># Analizando historial de crecimiento...</pre>

                <pre className="text-[#ff2200] mb-3">$ npm run growth-report</pre>

                <div className="text-[#00ff99] bg-[#00ff99]/5 p-2.5 rounded-none border border-[#00ff99]/20 mb-4 whitespace-pre-line text-[11px] leading-relaxed">
                  <span className="font-bold">📅 WEEKS_TRACKED:</span> 24 ✔{'\n'}
                  <span className="font-bold">⏱ HOURS_LOGGED:</span> 143 ✔{'\n'}
                  <span className="font-bold">🧠 LESSONS_LEARNED:</span> 37 ✔
                </div>

                <pre className="text-gray-400">$ git log --progress</pre>

                <pre className="text-white bg-[#111111] p-3 rounded-none border border-[#ff220044] whitespace-pre-wrap overflow-ellipsis">
                {`commit 18b7d4e
                feat: connected first database

                const developer = {
                  consistency: "ACTIVE",
                  confidence: "INCREASING",
                  experience: "ACCUMULATING"
                };

                developer.grow();`}
                <span className="w-2 h-4 bg-[#ff2200] inline-block animate-pulse align-middle ml-1"></span>
                </pre>
              </div>
            </div>
            
            {/* Soft Floating Badges */}
            <div className="absolute -top-6 -left-6 bg-[#111111] border border-[#ff220033] p-3 flex items-center gap-3 shadow-lg hover:border-[#ff220055] transition duration-300">
              <div className="w-8 h-8 bg-[#ff220011] flex items-center justify-center text-[#ff2200] border border-[#ff220033]">
                <BookOpen size={16} />
              </div>
              <div className="text-left font-mono">
                <div className="text-[9px] text-[#666]">SYSTEM_ENV</div>
                <div className="text-xs font-bold text-white">PROGRESS_LOG</div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-[#111111] border border-[#00ff99]/30 p-3 flex items-center gap-3 shadow-lg hover:border-[#00ff99]/50 transition duration-300">
              <div className="w-8 h-8 bg-[#00ff99]/10 flex items-center justify-center text-[#00ff99] border border-[#00ff99]/20">
                <Trophy size={16} />
              </div>
              <div className="text-left font-mono">
                <div className="text-[9px] text-[#666]">DEV_PROGRESS</div>
                <div className="text-xs font-bold text-white">PERSISTENCE_ACTIVE</div>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* COMPONENT PROBLEM: "El Problema" */}
      <section className="bg-[#030304] border-y border-[#ff220033] py-20 relative font-mono">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-s font-mono font-bold tracking-wider text-[#ff2200] bg-[#ff220011] px-4 py-2 rounded-none border border-[#ff220033] uppercase">
                EL_DESAFIO_DEL_DEVELOPER
              </span>
              <h2 className="text-3xl font-bold text-white mt-4 mb-6 leading-tight">
                El problema no es aprender.<br />
                <span className="text-[#ff7800cf] drop-shadow-[0_0_15px_rgba(255,159,0,0.82)] text-shadow-yellow">
                Es olvidar cuánto has avanzado.
            </span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Los desarrolladores y estudiantes aprenden constantemente nuevas tecnologías, resuelven errores y completan proyectos. Sin embargo, muchas veces sienten que no están progresando porque no tienen una forma clara de registrar y visualizar todo lo que han logrado.
              </p>
              <div className="p-4 border-l-2 border-[#ff005ccc] bg-[#111111] rounded-none text-xs text-[#ff005ccc] leading-relaxed">
                "Tu progreso habla por ti. Ver cuánto has avanzado te ayuda a confiar más en lo que eres capaz de lograr."
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#0a0a0a] border border-[#ef444433] rounded-none flex gap-4 items-start hover:border-[#ef4444aa] transition shadow-[0_0_15px_rgba(255,51,51,0.05)]">
                <div className="text-[#ef4444] p-2.5 rounded-none bg-[#ef444411] border border-[#ef444433]"><ShieldAlert size={18} /></div>
                <div>
                  <h4 className="font-mono text-white text-sm font-bold uppercase">Pérdida de Tiempo Recurrente</h4>
                  <p className="text-xs text-gray-500 mt-1">Horas en Google buscando la solución al mismo bug crítico que ya habías resuelto hace tres meses.</p>
                </div>
              </div>
              <div className="p-4 bg-[#0a0a0a] border border-[#ff220033] rounded-none flex gap-4 items-start hover:border-[#ff220088] transition shadow-[0_0_15px_rgba(255,34,0,0.05)]">
                <div className="text-[#ff2200] p-2.5 rounded-none bg-[#ff220011] border border-[#ff220033]"><Bot size={18} /></div>
                <div>
                  <h4 className="font-mono text-white text-sm font-bold uppercase">Esfuerzo Invisibilizado</h4>
                  <p className="text-xs text-gray-500 mt-1">Semanas enteras de trabajo intenso que se desvanecen en la rutina diaria al no quedar registradas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENT POTENTIAL / STATS */}
      <section className="py-20 max-w-6xl mx-auto px-4 md:px-8 text-center relative font-mono">
        <span className="text-xs font-mono font-bold tracking-wider text-[#ff2200] bg-[#ff220011] px-3 py-1 rounded-none border border-[#ff220033] uppercase">
          SIMULADOR_TELEMETRIA
        </span>
        <h2 className="text-3xl font-bold text-white mt-4 mb-4">
          Lo que conseguirás siendo regular
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto text-sm mb-12">
          Todo el camino recorrido por un desarrollador durante 6 meses de crecimiento continuo.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 bg-[#111111] border border-[#ff220033] rounded-none hover:border-[#ff2200] hover:shadow-[0_0_20px_rgba(255,34,0,0.1)] transition duration-200">
            <div className="text-4xl font-bold text-[#ff2200] font-mono mb-2">24</div>
            <div className="text-xs text-gray-500 uppercase font-mono">Semanas Registradas</div>
          </div>
          <div className="p-6 bg-[#111111] border border-[#ff220033] rounded-none hover:border-[#ff2200] hover:shadow-[0_0_20px_rgba(255,34,0,0.1)] transition duration-200">
            <div className="text-4xl font-bold text-[#ff2200] font-mono mb-2">180h</div>
            <div className="text-xs text-gray-500 uppercase font-mono">Horas de Estudio</div>
          </div>
          <div className="p-6 bg-[#111111] border border-[#ff220033] rounded-none hover:border-[#ff2200] hover:shadow-[0_0_20px_rgba(255,34,0,0.1)] transition duration-200">
            <div className="text-4xl font-bold text-[#ff2200] font-mono mb-2">12</div>
            <div className="text-xs text-gray-500 uppercase font-mono">Tecnologías Clave</div>
          </div>
          <div className="p-6 bg-[#111111] border border-[#00ff9933] rounded-none hover:border-[#00ff99] hover:shadow-[0_0_20px_rgba(0,255,153,0.1)] transition duration-200">
            <div className="text-4xl font-bold text-[#00ff99] font-mono mb-2">92%</div>
            <div className="text-xs text-gray-500 uppercase font-mono">Constancia Promedio</div>
          </div>
        </div>
      </section>

      {/* COMPONENT FINAL CTA */}
      <section className="bg-gradient-to-b from-[#030304] to-[#0d0d0d] py-20 border-t border-[#ff220033] text-center relative font-mono">
        <div className="absolute inset-0 bg-[#ff2200]/[0.01] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-none mb-6">
            Tu desarrollo profesional merece <br />
            <span className="text-[#ff7800cf] drop-shadow-[0_0_15px_rgba(255,159,0,0.82)] text-shadow-yellow">
                ser visible.
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg mb-10 leading-relaxed">
            Tu aprendizaje merece algo más que la memoria a corto plazo. Regístralo, visualízalo y conviértelo en evidencia de todo lo que has avanzado.
          </p>
          <button 
            id="login-btn-cta"
            onClick={() => onLogin('register')}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-[#ff2200] border-2 border-[#ff2200] bg-[#ff220011] hover:bg-[#ff220022] rounded-none transition duration-150 cursor-pointer shadow-[0_0_20px_rgba(255,34,0,0.3)] font-mono"
          >
            INICIAR_MI_BITACORA
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#030304] border-t border-[#ff220033] py-8 relative font-mono">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#ff2200] rounded-full animate-pulse shadow-[0_0_10px_#ff2200]"></div>
            <span className="font-mono text-white text-base font-bold">DEVGROWTH</span>
          </div>
          <span className="text-xs text-gray-600 font-mono">
            © 2026 DevGrowth. Creado para quienes construyen un poco mejor cada semana.
          </span>
        </div>
      </footer>
    </div>
  );
}

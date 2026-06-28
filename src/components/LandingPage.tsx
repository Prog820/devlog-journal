import React, { useState, useEffect } from 'react';
import { Terminal, Bot, Sparkles, BookOpen, Star, ShieldAlert, Target, Trophy, Play, ArrowDown, Zap } from 'lucide-react';
import { motion } from 'motion/react';

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
      <motion.header
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-2 md:px-8 pt-16 pb-20 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-[#ff220011] border border-[#ff220055] text-xs font-semibold uppercase tracking-wider text-[#ff2200] mb-5 font-mono">
              <span className="w-1.5 h-1.5 bg-[#ff2200] rounded-full animate-ping" /> CORE_SYSTEM_INITIATED_OK
            </span>
            <h1 className="text-[1.55rem] min-[390px]:text-[1.75rem] sm:text-[2rem] font-bold tracking-tight text-white leading-tight sm:leading-none mb-6 font-mono break-words max-w-full">
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
      </motion.header>

      {/* COMPONENT PROBLEM: "El Problema" */}
      <motion.section
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="bg-[#030304] border-y border-[#ff220033] py-20 relative font-mono"
      >
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
      </motion.section>

      {/* COMPONENT AI INTELLIGENCE */}
      <motion.section
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="py-20 max-w-6xl mx-auto px-4 md:px-8 relative font-mono overflow-hidden"
      >
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#ff220033] to-transparent pointer-events-none"></div>
        <div className="absolute top-10 right-4 md:right-16 w-64 h-64 bg-[radial-gradient(ellipse_at_center,rgba(0,255,153,0.05),transparent_70%)] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10"
        >
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-[#00ff99] bg-[#00ff9911] px-3 py-1 rounded-none border border-[#00ff9933] uppercase mb-5">
              <Sparkles size={13} /> AI_MENTOR_CORE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-5">
              Inteligencia artificial que entiende tu progreso.
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-7">
              DevGrowth usa IA para analizar tus registros, detectar patrones de aprendizaje y convertir tus bloqueos en recomendaciones concretas para avanzar con más claridad.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: Bot,
                title: 'Analiza tus errores',
                text: 'Interpreta mensajes de error, resume qué significan y propone pasos simples para resolverlos.'
              },
              {
                icon: Target,
                title: 'Detecta patrones',
                text: 'Revisa semanas, tecnologías, horas, satisfacción y bloqueos para encontrar señales repetidas.'
              },
              {
                icon: BookOpen,
                title: 'Acelera el aprendizaje',
                text: 'Transforma tus registros en explicaciones claras para que entiendas qué practicar después.'
              },
              {
                icon: Zap,
                title: 'Recomienda con contexto',
                text: 'Personaliza sugerencias usando tu historial, errores guardados y conversaciones con DevMentor.'
              },
              {
                icon: Star,
                title: 'Mide tu avance',
                text: 'Conecta logros, constancia y evolución semanal para mostrar progreso real, no solo actividad.'
              },
              {
                icon: Terminal,
                title: 'Usa tus datos clave',
                text: 'Trabaja con aprendizajes, bloqueos, logros, mejoras, tecnologías, horas y biblioteca de errores.'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
                  className="bg-[#0a0a0a] border border-[#ff220033] hover:border-[#00ff9955] p-4 rounded-none transition duration-200 shadow-[0_0_15px_rgba(255,34,0,0.04)] group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-[#ff220011] group-hover:bg-[#00ff9911] border border-[#ff220033] group-hover:border-[#00ff9933] flex items-center justify-center text-[#ff2200] group-hover:text-[#00ff99] transition">
                      <Icon size={17} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
          className="relative z-10 mt-12 bg-[#030304] border border-[#00ff9933] rounded-none overflow-hidden shadow-[0_0_25px_rgba(0,255,153,0.06)]"
        >
          <div className="px-4 py-2 border-b border-[#00ff9933] bg-[#07110d] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#ff2200] inline-block"></span>
              <span className="w-2 h-2 bg-[#ff7800] inline-block"></span>
              <span className="w-2 h-2 bg-[#00ff99] inline-block"></span>
            </div>
            <span className="text-[10px] text-[#00ff99] uppercase tracking-widest">DEVMENTOR_ANALYSIS_PIPELINE</span>
            <div></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#00ff991a]">
            <div className="bg-[#030304] p-5">
              <div className="text-[10px] text-[#ff2200] uppercase tracking-widest mb-2">INPUT_DATA</div>
              <p className="text-xs text-gray-400 leading-relaxed">Semanas registradas, errores guardados, bloqueos, satisfacción y tecnologías estudiadas.</p>
            </div>
            <div className="bg-[#030304] p-5">
              <div className="text-[10px] text-[#00ff99] uppercase tracking-widest mb-2">AI_REASONING</div>
              <p className="text-xs text-gray-400 leading-relaxed">Cruza señales, identifica tendencias y prioriza acciones útiles para tu siguiente semana.</p>
            </div>
            <div className="bg-[#030304] p-5">
              <div className="text-[10px] text-[#ff7800] uppercase tracking-widest mb-2">OUTPUT_GUIDANCE</div>
              <p className="text-xs text-gray-400 leading-relaxed">Entrega explicaciones, sugerencias personalizadas y alertas para mantener tu crecimiento visible.</p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* COMPONENT POTENTIAL / STATS */}
      <motion.section
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="py-20 max-w-6xl mx-auto px-4 md:px-8 text-center relative font-mono"
      >
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
      </motion.section>

      {/* COMPONENT FINAL CTA */}
      <motion.section
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="bg-gradient-to-b from-[#030304] to-[#0d0d0d] py-20 border-t border-[#ff220033] text-center relative font-mono"
      >
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
      </motion.section>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-[#030304] border-t border-[#ff220033] py-8 relative font-mono"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#ff2200] rounded-full animate-pulse shadow-[0_0_10px_#ff2200]"></div>
            <span className="font-mono text-white text-base font-bold">DEVGROWTH</span>
          </div>
          <span className="text-xs text-gray-600 font-mono">
            © 2026 DevGrowth. Creado para quienes construyen un poco mejor cada semana.
          </span>
        </div>
      </motion.footer>
    </div>
  );
}

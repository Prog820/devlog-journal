import React, { useState } from 'react';
import { 
  Settings, LogOut, Trash2, ShieldAlert, BadgeInfo, 
  Clock, BookOpen, Bookmark, User, Mail, ShieldCheck, X 
} from 'lucide-react';
import { Week } from '../types';
import { User as AuthUser } from '@supabase/supabase-js';

interface ConfiguracionProps {
  weeks: Week[];
  savedErrorIds: number[];
  user: AuthUser;
  onLogout: () => void;
  onDeleteAccountData: () => Promise<void>;
  onShowToast: (msg: string) => void;
}

export default function Configuracion({
  weeks,
  savedErrorIds,
  user,
  onLogout,
  onDeleteAccountData,
  onShowToast
}: ConfiguracionProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Parse user attributes
  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Desarrollador';
  const userEmail = user.email || '';
  const avatarUrl = user.user_metadata?.avatar_url;

  // Calculte operational stats
  const totalWeeks = weeks.length;
  const totalHours = weeks.reduce((acc, curr) => acc + (Number(curr.horas) || 0), 0);
  const totalSavedErrors = savedErrorIds.length;

  const handleDeleteTrigger = async () => {
    setLoading(true);
    try {
      await onDeleteAccountData();
      setShowConfirmModal(false);
      onShowToast('✓ Su cuenta y todos sus progresos han sido purgados de la base de datos.');
    } catch (err: any) {
      onShowToast('Error al purgar los datos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold font-sans tracking-tight text-white flex items-center gap-2 text-shadow-red text-shadow-[0_0_15px_rgba(255,107,0,0.3)]">
          <Settings className="text-[#ff5500] h-6 w-6" /> Configuración
        </h2>
        <p className="text-xs font-mono text-[#a18265]/80 mt-1">
          PANEL DE CONFIGURACIÓN DE SEGURIDAD Y CONFIGURACIONES DE LA CUENTA
        </p>
      </div>

      {/* Profile Info Row card */}
      <div className="bg-[#0a0a0d] border border-[#ff5500]/20 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/[0.02] rounded-full blur-xl pointer-events-none"></div>

        {/* Big overlapping Avatar */}
        <div className="relative flex-shrink-0">
          {avatarUrl ? (
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#ff5500] shadow-[0_0_20px_rgba(255,107,0,0.25)]">
              <img src={avatarUrl} alt={userName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ff5500] to-[#f59e0b] text-black font-extrabold font-mono text-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,107,0,0.25)] border border-orange-500/40">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
          {/* Overlapping Google Badge */}
          <div className="absolute bottom-[-4px] right-[-4px] w-6.5 h-6.5 bg-[#0a0a0d] border border-[#ff5500]/30 rounded-full flex items-center justify-center shadow-lg" title="Google Provider Connected">
            <img src="https://www.google.com/favicon.ico" width="12" height="12" alt="Google Connection" />
          </div>
        </div>

        {/* Profile Info Details */}
        <div className="text-center sm:text-left space-y-1.5 flex-1 min-w-0">
          <h3 className="font-mono text-white text-base font-extrabold flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {userName}
            <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase py-0.5 px-2 bg-emerald-950/20 text-emerald-400 border border-emerald-500/20 rounded">
              <ShieldCheck size={10} /> Autenticado con Google
            </span>
          </h3>
          <p className="text-xs font-mono text-[#a18265] truncate flex items-center justify-center sm:justify-start gap-1">
            <Mail size={12} className="text-[#ff5500]" /> {userEmail}
          </p>
        </div>
      </div>

      {/* Account statistics details */}
      <div className="bg-[#0a0a0d] border border-[#ff5500]/25 rounded-xl p-5 sm:p-6 space-y-4">
        <h3 className="font-mono text-xs font-bold text-white uppercase tracking-widest border-b border-[#ff5500]/10 pb-3">
          Resumen de tu cuenta
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Stat box 1 */}
          <div className="bg-[#040405] p-4 rounded-lg border border-[#ff5500]/10 text-center space-y-1">
            <div className="text-2xl font-extrabold text-[#ff5500] font-mono leading-none">{totalWeeks}</div>
            <div className="text-[10px] font-mono font-bold text-[#a18265]/70 uppercase tracking-widest flex items-center justify-center gap-1.5 pt-1">
              <BookOpen size={11} /> Semanas registradas
            </div>
          </div>
          {/* Stat box 2 */}
          <div className="bg-[#040405] p-4 rounded-lg border border-[#ff5500]/10 text-center space-y-1">
            <div className="text-2xl font-extrabold text-white font-mono leading-none">{totalHours}h</div>
            <div className="text-[10px] font-mono font-bold text-[#a18265]/70 uppercase tracking-widest flex items-center justify-center gap-1.5 pt-1">
              <Clock size={11} className="text-[#f59e0b]" /> Horas de estudio
            </div>
          </div>
          {/* Stat box 3 */}
          <div className="bg-[#040405] p-4 rounded-lg border border-[#ff5500]/10 text-center space-y-1">
            <div className="text-2xl font-extrabold text-[#f59e0b] font-mono leading-none">{totalSavedErrors}</div>
            <div className="text-[10px] font-mono font-bold text-[#a18265]/70 uppercase tracking-widest flex items-center justify-center gap-1.5 pt-1">
              <Bookmark size={11} /> Errores guardados
            </div>
          </div>
        </div>
      </div>

      {/* Sessions control tab bar */}
      <div className="bg-[#0a0a0d] border border-[#ff5500]/20 rounded-xl p-5 sm:p-6 text-left">
        <h3 className="font-mono text-xs font-bold text-white uppercase tracking-widest border-b border-[#ff5500]/10 pb-3 mb-5">
          Sesión
        </h3>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1 text-xs font-mono">
            <h4 className="font-bold text-white uppercase tracking-wide">Cerrar sesión activa</h4>
            <p className="text-orange-200/50 leading-relaxed max-w-lg">
              Tu progreso actual y configuraciones quedarán respaldados de forma segura en las bases de datos de Supabase. Podrás volver a ingresar con tu misma cuenta en cualquier momento.
            </p>
          </div>
          <button 
            id="cfg-logout-btn"
            onClick={onLogout}
            className="flex items-center gap-1.5 px-4.5 py-2.5 border border-[#ff5500]/40 text-orange-300 hover:text-white hover:bg-[#ff5500]/10 rounded-md text-xs font-mono font-bold tracking-wide transition cursor-pointer self-stretch sm:self-center text-center justify-center"
          >
            <LogOut size={14} /> Cerrar sesión
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="p-5 sm:p-6 bg-[#1a0e0a] border border-red-500/20 hover:border-red-500/35 rounded-xl text-left transition duration-200">
        <h3 className="font-mono text-xs font-bold text-red-400 uppercase tracking-widest border-b border-red-500/10 pb-3 mb-5 flex items-center gap-2">
          <ShieldAlert size={14} /> Área de Peligro Táctico
        </h3>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1 text-xs font-mono">
            <h4 className="font-bold text-white uppercase tracking-wide">Eliminar cuenta permanentemente</h4>
            <p className="text-orange-200/50 leading-relaxed max-w-lg">
              Esta operación purga de forma inmediata e irreversible todos tus registros históricos de semanas, estadísticas acumuladas y logs guardados de Supabase.
            </p>
          </div>
          <button 
            id="cfg-delete-account-btn"
            onClick={() => setShowConfirmModal(true)}
            className="flex items-center justify-center gap-1.5 px-5 py-3 bg-red-650 hover:bg-red-700 text-white font-extrabold rounded-lg text-xs font-mono transition transform hover:-translate-y-0.5 cursor-pointer self-stretch sm:self-center shadow-[0_0_15px_rgba(239,68,68,0.2)]"
          >
            <Trash2 size={14} /> Eliminar cuenta
          </button>
        </div>
      </div>

      {/* CONFIRM DELETE ACCOUNT DATA MODAL */}
      {showConfirmModal && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowConfirmModal(false);
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 selection:bg-red-600/30 selection:text-white"
        >
          <div className="bg-[#0a0a0d] border border-red-500/40 rounded-xl shadow-2xl p-6 w-full max-w-md overflow-hidden animate-slide-up text-left">
            
            {/* Modal title */}
            <div className="flex items-center gap-3 pb-3 border-b border-red-500/10 mb-4 text-red-500">
              <ShieldAlert size={20} className="animate-bounce" />
              <h3 className="font-mono text-base font-extrabold uppercase tracking-wider">
                Confirmación de purgado
              </h3>
            </div>

            <p className="text-xs font-mono text-orange-200/80 leading-relaxed mb-4">
              Estás a punto de eliminar de forma permanente tu cuenta de acceso de DevGrowth y <strong>toda tu información registrada</strong> en nuestras tablas:
            </p>

            <ul className="list-disc pl-5 mb-5 text-[11px] font-mono text-orange-200/60 leading-loose">
              <li>Todas tus semanas de estudio catalogadas ({totalWeeks})</li>
              <li>Todos tus errores guardados ({totalSavedErrors})</li>
              <li>Tu sesión de autenticación con Google</li>
            </ul>

            <div className="bg-red-950/15 border border-red-500/20 rounded-lg p-3.5 mb-6 flex gap-3 items-start">
              <BadgeInfo size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
              <div className="text-[10.5px] font-mono text-red-300 leading-relaxed">
                Esta acción es <strong>completamente irreversible</strong>. No será posible restaurar tus datos de progreso técnico bajo ningún concepto.
              </div>
            </div>

            {/* Confirm action drawer */}
            <div className="flex justify-end gap-3 font-mono text-xs font-bold uppercase">
              <button
                disabled={loading}
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-[#111115] border border-[#ff5500]/20 rounded text-orange-300 hover:text-white cursor-pointer transition disabled:opacity-40"
              >
                Cancelar
              </button>
              <button
                disabled={loading}
                onClick={handleDeleteTrigger}
                className="px-4 py-2 bg-red-650 hover:bg-red-700 text-white rounded cursor-pointer transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.3)] disabled:opacity-40"
              >
                <Trash2 size={13} /> {loading ? 'Eliminando...' : 'Sí, eliminar datos'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

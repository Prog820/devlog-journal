import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { User } from '@supabase/supabase-js';
import { Week } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Activity, Loader2 } from 'lucide-react';

// Modular Page Screens
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Diario from './components/Diario';
import Historial from './components/Historial';
import Errores from './components/Errores';
import Guardados from './components/Guardados';
import Logros from './components/Logros';
import Configuracion from './components/Configuracion';
import AuthModal from './components/AuthModal';

export default function App() {
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [savedErrorIds, setSavedErrorIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');

  // Custom Toast State
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2800);
  };

  // Auth modal overlay controllers (Login vs Register)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // ----------------------------------------------------
  // 1. SUPABASE AUTH INTIALIZATION & LISTENERS
  // ----------------------------------------------------
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setCurrentUser(session.user);
          await syncUserData(session.user);
        } else {
          setCurrentUser(null);
        }
      } catch (err: any) {
        console.error('Error during Auth setup:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Set up dynamic auth state changes trigger
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setLoading(true);
      if (session?.user) {
        setCurrentUser(session.user);
        await syncUserData(session.user);
      } else {
        setCurrentUser(null);
        setWeeks([]);
        setSavedErrorIds([]);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // ----------------------------------------------------
  // 2. DATA SYNCHRONIZATION FROM SUPABASE (AND SIMULATION BYPASS)
  // ----------------------------------------------------
  const syncUserData = async (user: User) => {
    if (!user) return;

    try {
      // Query weeks
      const { data: weeksData, error: wError } = await supabase
        .from('semanas')
        .select('*')
        .eq('user_id', user.id)
        .order('semana', { ascending: false }); // Sort descending so newest is first

      if (wError) {
        console.error('Error loading weeks:', wError);
      } else {
        setWeeks(weeksData || []);
      }

      // Query saved errors bookmarks IDs
      const { data: savedData, error: sError } = await supabase
        .from('errores_guardados')
        .select('error_id')
        .eq('user_id', user.id);

      if (sError) {
        console.error('Error loading bookmarks:', sError);
      } else {
        const ids = (savedData || []).map(r => Number(r.error_id));
        setSavedErrorIds(ids);
      }
    } catch (err) {
      console.error('Database Sync Error:', err);
    }
  };

  // ----------------------------------------------------
  // 3. MUTATION PROCEDURES
  // ----------------------------------------------------
  const handleLogin = (mode?: 'login' | 'register') => {
    setAuthModalMode(mode || 'login');
    setIsAuthModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err: any) {
      console.warn('Logging out bypassed auth client:', err.message);
    } finally {
      setCurrentUser(null);
      setWeeks([]);
      setSavedErrorIds([]);
      setActivePage('dashboard');
      showToast('✓ Sesión cerrada. Su progreso está seguro.');
    }
  };

  const handleSaveWeek = async (weekData: Omit<Week, 'id' | 'user_id' | 'created_at'>) => {
    if (!currentUser) return;

    try {
      const { error } = await supabase.from('semanas').insert({
        user_id: currentUser.id,
        fecha: weekData.fecha,
        semana: weekData.semana,
        aprendizajes: weekData.aprendizajes,
        bloqueos: weekData.bloqueos,
        logros: weekData.logros,
        mejoras: weekData.mejoras,
        horas: weekData.horas,
        tech: weekData.tech,
        satisfaccion: weekData.satisfaccion
      });

      if (error) {
        showToast('Error al guardar reporte: ' + error.message);
      } else {
        showToast('✓ Reporte semanal guardado correctamente.');
        await syncUserData(currentUser);
        setActivePage('historial');
      }
    } catch (err: any) {
      showToast('Inconveniente al registrar: ' + err.message);
    }
  };

  const handleDeleteWeek = async (weekId: string) => {
    if (!currentUser) return;

    try {
      const { error } = await supabase
        .from('semanas')
        .delete()
        .eq('id', weekId)
        .eq('user_id', currentUser.id);

      if (error) {
        showToast('No se pudo eliminar: ' + error.message);
      } else {
        showToast('✓ Registro semanal eliminado.');
        await syncUserData(currentUser);
      }
    } catch (err: any) {
      showToast('Error durante la eliminación: ' + err.message);
    }
  };

  const handleToggleSaveError = async (errorId: number) => {
    if (!currentUser) {
      showToast('Debes iniciar sesión para guardar errores.');
      return;
    }

    try {
      const isBookmarked = savedErrorIds.includes(errorId);
      if (isBookmarked) {
        const { error } = await supabase
          .from('errores_guardados')
          .delete()
          .eq('user_id', currentUser.id)
          .eq('error_id', errorId);

        if (error) {
          showToast('Inconveniente: ' + error.message);
        } else {
          setSavedErrorIds(prev => prev.filter(id => id !== errorId));
          showToast('Error removido de tu lista guardada.');
        }
      } else {
        const { error } = await supabase
          .from('errores_guardados')
          .insert({
            user_id: currentUser.id,
            error_id: errorId
          });

        if (error) {
          showToast('Inconveniente: ' + error.message);
        } else {
          setSavedErrorIds(prev => [...prev, errorId]);
          showToast('✓ Error guardado en tus marcadores de estudio.');
        }
      }
    } catch (err: any) {
      showToast('Excepción al sincronizar marcadores: ' + err.message);
    }
  };

   // Accounts & Data Erasure Protocol
  const handleDeleteAccountData = async () => {
    if (!currentUser) return;

    try {
      // 1. Purge all weeks
      const { error: wError } = await supabase
        .from('semanas')
        .delete()
        .eq('user_id', currentUser.id);

      if (wError) throw wError;

      // 2. Purge all bookmarks
      const { error: sError } = await supabase
        .from('errores_guardados')
        .delete()
        .eq('user_id', currentUser.id);

      if (sError) throw sError;

      // 3. Delete user from auth.users securely using PostgreSQL Security Definer RPC
      const { error: rpcError } = await supabase.rpc('delete_user');
      if (rpcError) {
        console.error('Error invoking delete_user RPC:', rpcError.message);
        throw new Error('Error al remover cuenta en auth.users: ' + rpcError.message);
      }

      // 4. Clear session and sign out
      await supabase.auth.signOut();
      setCurrentUser(null);
      setWeeks([]);
      setSavedErrorIds([]);
      setActivePage('dashboard');
    } catch (err: any) {
      throw err;
    }
  };

  // Bookmark redirection handler
  const handleNavigateToErrorInLibrary = (errorId: number) => {
    // We map the error item title to set dynamic search input
    setActivePage('errores');
    setGlobalSearchQuery(`id:${errorId}`);
  };

  // Render Loader Splash
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-[#e0e0e0] flex flex-col items-center justify-center font-mono border-4 border-[#ff220033]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,34,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,34,0,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
        <div className="space-y-4 text-center z-10">
          <Loader2 className="animate-spin text-[#ff2200] h-10 w-10 mx-auto" />
          <h3 className="text-sm font-semibold tracking-widest text-[#ff2200] uppercase animate-pulse">
            Estableciendo comunicación táctica con Supabase DB_
          </h3>
        </div>
      </div>
    );
  }

  // Render Landing Page if no user authenticated
  if (!currentUser) {
    return (
      <>
        <LandingPage onLogin={handleLogin} />
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
          onShowToast={showToast} 
          initialMode={authModalMode}
        />
      </>
    );
  }

  // Helper page renderer
  const renderPageContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard weeks={weeks} />;
      case 'diario':
        return (
          <Diario 
            onSaveWeek={handleSaveWeek} 
            onShowToast={showToast} 
            totalWeeksRegistered={weeks.length} 
          />
        );
      case 'historial':
        return <Historial weeks={weeks} onDeleteWeek={handleDeleteWeek} />;
      case 'errores':
        // If coming from dynamic redirect, extract search pattern
        let initialQuery = '';
        if (globalSearchQuery.startsWith('id:')) {
          const idStr = globalSearchQuery.replace('id:', '');
          const errorId = Number(idStr);
          // Let's reset the redirection search once loaded
          setGlobalSearchQuery('');
          // Filter specifically
          initialQuery = idStr;
        }
        return (
          <Errores 
            savedErrorIds={savedErrorIds} 
            onToggleSaveError={handleToggleSaveError} 
            onShowToast={showToast}
            initialSearchQuery={initialQuery}
          />
        );
      case 'guardados':
        return (
          <Guardados 
            savedErrorIds={savedErrorIds} 
            onRemoveBookmark={handleToggleSaveError} 
            onNavigateToErrorInLibrary={handleNavigateToErrorInLibrary} 
          />
        );
      case 'logros':
        return <Logros weeks={weeks} savedErrorIds={savedErrorIds} />;
      case 'configuracion':
        return (
          <Configuracion 
            weeks={weeks} 
            savedErrorIds={savedErrorIds} 
            user={currentUser} 
            onLogout={handleLogout} 
            onDeleteAccountData={handleDeleteAccountData} 
            onShowToast={showToast} 
          />
        );
      default:
        return <Dashboard weeks={weeks} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#e0e0e0] font-sans selection:bg-[#ff2200]/30 selection:text-white flex flex-col md:flex-row relative border-4 border-[#ff220033]">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,34,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,34,0,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      {/* Dynamic responsive navigation sidebar */}
      <Sidebar 
        activePage={activePage} 
        onPageChange={setActivePage} 
        user={currentUser} 
        onLogout={handleLogout} 
      />

      {/* Interactive Main Dashboard Frame */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto z-10 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.16, ease: 'easeInOut' }}
            className="max-w-5xl mx-auto h-full"
          >
            {renderPageContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Dynamic Glowing Notification Toast Box */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-55 max-w-sm px-4.5 py-4 bg-[#030304] border border-[#ff2200] text-[#e0e0e0] font-mono text-xs rounded-none shadow-[0_0_25px_rgba(255,34,0,0.25)] flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-[#ff2200] animate-ping" />
            <span className="leading-normal">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

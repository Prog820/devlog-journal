import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { X, Lock, Mail, User, ShieldAlert, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string) => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, onShowToast, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    // Basic client input check
    if (!email || !password) {
      setErrorMessage('Por favor, ingresa tu correo y contraseña.');
      setLoading(false);
      return;
    }
    if (mode === 'register' && !fullName.trim()) {
      setErrorMessage('Por favor, ingresa tu nombre completo.');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (error) {
          throw new Error(error.message);
        }
        onShowToast('✓ Sesión iniciada correctamente.');
        onClose();
      } else {
        // Sign up with user metadata
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              full_name: fullName.trim(),
            },
          },
        });

        if (error) {
          throw new Error(error.message);
        }
        
        onShowToast('✓ Registro exitoso. ¡Iniciando sesión...');
        onClose();
      }
    } catch (err: any) {
      console.error('Email Authentication error:', err);
      // Translate typical messages for better user experience
      let msg = err.message || 'Error inconsciente de red.';
      if (msg.includes('Invalid login credentials')) {
        msg = 'Credenciales inválidas. Comprueba tu correo y contraseña.';
      } else if (msg.includes('User already registered')) {
        msg = 'El usuario ya se encuentra registrado. Intenta iniciar sesión.';
      } else if (msg.includes('Signup requires a valid password')) {
        msg = 'La contraseña debe tener al menos 6 caracteres.';
      }
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            prompt: 'select_account'
          },
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (err: any) {
      console.error('Google OAuth connection error:', err);
      setErrorMessage('Error al entablar Google OAuth: ' + err.message);
      onShowToast('Error al entablar Google OAuth: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      {/* Background Cyber Accents inside modal container */}
      <div className="relative w-full max-w-md bg-[#030304] border-2 border-[#ff2200] p-6 sm:p-8 shadow-[0_0_40px_rgba(255,34,0,0.25)] font-mono">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition duration-150 cursor-pointer"
          title="Cerrar modal"
        >
          <X size={18} />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-[#ff220011] border border-[#ff220033] text-[9px] uppercase text-[#ff2200] mb-2">
            <span className="w-1.5 h-1.5 bg-[#ff2200] rounded-full animate-pulse" /> SECURITY_CORE_LAYER
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white uppercase">
            {mode === 'login' ? 'INICIAR_SESION_SISTEMA' : 'REGISTRARSE_NUEVO_SISTEMA'}
          </h3>
          <p className="text-[11px] text-gray-500 mt-1">
            {mode === 'login' 
              ? 'Introduce tus comandos de acceso autorizados' 
              : 'Configura un nuevo perfil tecno-programador'
            }
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 border border-[#ff220033] mb-6 p-0.5 bg-black">
          <button
            onClick={() => { setMode('login'); setErrorMessage(null); }}
            className={`py-2 text-xs font-bold transition duration-150 cursor-pointer ${
              mode === 'login' 
                ? 'bg-[#ff2200] text-black' 
                : 'text-[#ff220099] hover:text-[#ff2200] hover:bg-[#ff220011]'
            }`}
          >
            INICIAR SESIÓN
          </button>
          <button
            onClick={() => { setMode('register'); setErrorMessage(null); }}
            className={`py-2 text-xs font-bold transition duration-150 cursor-pointer ${
              mode === 'register' 
                ? 'bg-[#ff2200] text-black' 
                : 'text-[#ff220099] hover:text-[#ff2200] hover:bg-[#ff220011]'
            }`}
          >
            REGISTRARSE
          </button>
        </div>

        {/* Error Alert panel */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-950/40 border border-red-500/50 text-red-400 text-xs flex gap-2 items-start animate-fade-in">
            <ShieldAlert size={16} className="shrink-0 text-red-500" />
            <span className="leading-tight">{errorMessage}</span>
          </div>
        )}

        {/* Auth form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-[10px] uppercase text-gray-400 mb-1 font-bold">Nombre Completo</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <User size={13} />
                </span>
                <input
                  type="text"
                  placeholder="Ej. Ada Lovelace"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-black border border-[#ff220033] py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-[#ff2200] font-mono transition duration-150"
                  required={mode === 'register'}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase text-gray-400 mb-1 font-bold">Correo Electrónico</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Mail size={13} />
              </span>
              <input
                type="email"
                placeholder="developer@supabase.co"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-[#ff220033] py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-[#ff2200] font-mono transition duration-150"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase text-gray-400 mb-1 font-bold">Contraseña</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Lock size={13} />
              </span>
              <input
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-[#ff220033] py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-[#ff2200] font-mono transition duration-150"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#ff2200] text-black font-bold text-xs uppercase hover:bg-[#ff2200]/90 transition duration-150 disabled:opacity-50 cursor-pointer flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                AUTENTICANDO...
              </>
            ) : (
              mode === 'login' ? 'INICIAR SESIÓN' : 'COMPLETAR REGISTRO'
            )}
          </button>
        </form>

        <div className="my-5 flex items-center justify-between text-gray-600 text-[10px]">
          <span className="h-px bg-gray-800 flex-1"></span>
          <span className="px-3 uppercase font-bold tracking-widest text-[#ff220077]">O ADEMÁS</span>
          <span className="h-px bg-gray-800 flex-1"></span>
        </div>

        {/* Real Google OAuth Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-2.5 bg-black border border-[#ff220088] text-[#ff2200] hover:text-white hover:bg-[#ff220022] font-bold text-xs uppercase transition duration-150 cursor-pointer flex justify-center items-center gap-2.5 shadow-[0_0_10px_rgba(255,34,0,0.1)]"
        >
          <img src="https://www.google.com/favicon.ico" width="14" height="14" alt="Google" className="rounded-full bg-white p-0.5 shrink-0" />
          {mode === 'login' ? 'INICIAR_CON_GOOGLE' : 'REGISTRARSE_CON_GOOGLE'}
        </button>

        {/* Change Mode Hint */}
        <div className="mt-5 text-center text-[11px] text-gray-500">
          {mode === 'login' ? (
            <span>
              ¿Aún no tienes cuenta?{' '}
              <button
                onClick={() => { setMode('register'); setErrorMessage(null); }}
                className="text-[#ff2200] underline font-bold hover:text-[#ff3c11]"
              >
                Regístrate aquí
              </button>
            </span>
          ) : (
            <span>
              ¿Ya estás registrado?{' '}
              <button
                onClick={() => { setMode('login'); setErrorMessage(null); }}
                className="text-[#ff2200] underline font-bold hover:text-[#ff3c11]"
              >
                Inicia sesión aquí
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

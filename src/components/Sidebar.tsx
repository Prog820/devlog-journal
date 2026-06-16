import React, { useState } from 'react';
import { 
  Terminal, Gauge, PenSquare, History, Bug, Bookmark, 
  Trophy, Settings, LogOut, Menu, X 
} from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface SidebarProps {
  activePage: string;
  onPageChange: (pageName: string) => void;
  user: User;
  onLogout: () => void;
}

export default function Sidebar({ activePage, onPageChange, user, onLogout }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Gauge, section: 'Principal' },
    { id: 'diario', label: 'Registrar semana', icon: PenSquare, section: 'Principal' },
    { id: 'historial', label: 'Historial', icon: History, section: 'Principal' },
    { id: 'errores', label: 'Biblioteca de errores', icon: Bug, section: 'Herramientas' },
    { id: 'guardados', label: 'Errores guardados', icon: Bookmark, section: 'Herramientas' },
    { id: 'logros', label: 'Mis logros', icon: Trophy, section: 'Logros' },
    { id: 'configuracion', label: 'Configuración', icon: Settings, section: 'Cuenta' }
  ];

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Desarrollador';
  const userEmail = user.email || '';
  const avatarUrl = user.user_metadata?.avatar_url;

  // Group items by section
  const sections = ['Principal', 'Herramientas', 'Logros', 'Cuenta'];

  const handleNavClick = (id: string) => {
    onPageChange(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Sticky Header Bar */}
      <header className="md:hidden h-14 bg-[#030304] border-b border-[#ff220055] px-4 flex items-center justify-between sticky top-0 z-40 w-full">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#ff2200] rounded-full animate-pulse shadow-[0_0_10px_#ff2200]"></div>
          <span className="font-mono text-white text-base font-bold tracking-tight">TECH_SYSTEM_V.4</span>
        </div>
        <button 
          id="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-[#ff2200] hover:text-white border border-[#ff220033] rounded bg-[#111111]"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Sidebar Overlay for Mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-45 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-[calc(100vh-3.5rem)] md:h-screen w-64 bg-[#030304] border-r border-[#ff220055] flex flex-col z-48 transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        ${mobileOpen ? 'top-14' : 'top-0'} md:top-0
      `}>
        {/* Brand Logo Header (Desktop only) */}
        <div className="hidden md:flex flex-col p-6 border-b border-[#ff220011] bg-[#030304]">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 bg-[#ff2200] rounded-full animate-pulse shadow-[0_0_10px_#ff2200]"></div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white font-mono flex items-center gap-0.5">
                TECH_SYSTEM_V.4
              </span>
            </div>
          </div>
          <div className="text-[10px] text-[#ff220099] mt-2 uppercase tracking-widest font-mono">
            Access Level: Developer
          </div>
        </div>

        {/* Scrollable Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {sections.map(section => {
            const items = navItems.filter(item => item.section === section);
            return (
              <div key={section} className="space-y-1">
                <div className="text-[10px] font-mono font-extrabold text-[#666666] tracking-widest px-3 py-1 uppercase">
                  {section}
                </div>
                <div className="space-y-0.5">
                  {items.map(item => {
                    const Icon = item.icon;
                    const isActive = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        id={`nav-item-${item.id}`}
                        onClick={() => handleNavClick(item.id)}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2.5 rounded-[0px] text-xs font-mono font-semibold transition-all duration-150 cursor-pointer text-left group
                          ${isActive 
                            ? 'bg-[#ff220011] text-[#ff2200] border-l-2 border-[#ff2200] shadow-[0_0_15px_rgba(255,34,0,0.1)]' 
                            : 'text-[#888888] hover:text-[#ff2200] hover:bg-[#ff220011] border-l-2 border-transparent'
                          }
                        `}
                      >
                        <Icon size={16} className={`
                          transition-colors duration-150
                          ${isActive ? 'text-[#ff2200]' : 'text-[#888888] group-hover:text-[#ff2200]'}
                        `} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* User Workspace Info (Bottom Sidebar) */}
        <div id="sidebar-user-section" className="border-t border-[#ff220033] p-4 bg-[#030304] flex items-center gap-3 mt-auto relative">
          <div className="relative">
            {avatarUrl ? (
              <div className="w-9 h-9 border border-[#ff2200] rounded-none p-0.5 overflow-hidden shadow-[0_0_12px_rgba(255,34,0,0.15)]">
                <img src={avatarUrl} alt={userName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-9 h-9 border border-[#ff2200] rounded-none bg-[#ff220011] text-[#ff2200] font-bold font-mono text-center flex items-center justify-center text-xs shadow-[0_0_12px_rgba(255,34,0,0.15)]">
                {userName.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h5 className="text-[12px] font-bold font-mono text-white truncate leading-tight">
              {userName}
            </h5>
            <p className="text-[9.5px] font-mono text-[#ff220099] truncate leading-none mt-1 uppercase">
              {userEmail}
            </p>
          </div>

          <button
            id="sidebar-logout-btn"
            onClick={onLogout}
            title="Cerrar sesión"
            className="p-2 border border-[#ff220055] rounded-none hover:bg-[#ff220022] text-[#ff2200] cursor-pointer transition-all duration-150"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>
    </>
  );
}

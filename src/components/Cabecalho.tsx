import React from 'react';
import { useAuth } from '../contexts/useAuth';
import { LogOut, User } from 'lucide-react';

const Cabecalho: React.FC = () => {
  const { logout } = useAuth();

  return (
    <header className="flex items-center justify-between h-20 header-modern px-6 sticky top-0 z-50 bg-white animate-fade-in-down">
      {/* Left section - Title */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-gray-900">
          Painel de Controle
        </h1>
        <p className="text-xs text-gray-500 mt-1">Bem-vindo de volta</p>
      </div>

      {/* Right section - User info and logout */}
      <div className="flex items-center gap-4">
        {/* User greeting */}
        <div className="text-right hidden sm:block animate-fade-in-left">
          <p className="text-sm font-medium text-gray-900">Pedro Silva</p>
          <p className="text-xs text-gray-500">Última acesso: Hoje</p>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-[var(--border)]"></div>

        {/* Logout button */}
        <button 
          onClick={logout}
          className="btn-secondary text-sm px-4 py-2 flex items-center gap-2 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
        >
          <LogOut size={16} className="opacity-70 group-hover:opacity-100" />
          <span>Sair</span>
        </button>

        {/* User avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-0.5 group">
          <User size={20} className="group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </header>
  );
};

export default Cabecalho;
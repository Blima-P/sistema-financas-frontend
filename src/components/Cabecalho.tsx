import React from 'react';
import { useAuth } from '../contexts/useAuth';

const Cabecalho: React.FC = () => {
  const { logout } = useAuth();

  return (
    <header className="flex items-center justify-between h-20 header-modern px-6 sticky top-0 z-50 bg-white">
      {/* Left section - Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Painel de Controle
        </h1>
        <p className="text-xs text-gray-500 mt-1">Bem-vindo de volta</p>
      </div>

      {/* Right section - User info and logout */}
      <div className="flex items-center gap-4">
        {/* User greeting */}
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-900">Pedro Silva</p>
          <p className="text-xs text-gray-500">Última acesso: Hoje</p>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-[var(--border)]"></div>

        {/* Logout button */}
        <button 
          onClick={logout}
          className="btn-secondary text-sm px-4 py-2"
        >
          Sair
        </button>

        {/* User avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg shadow-sm">
          P
        </div>
      </div>
    </header>
  );
};

export default Cabecalho;
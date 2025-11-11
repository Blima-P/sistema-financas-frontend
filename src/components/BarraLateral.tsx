import React from 'react';
import { Link } from 'react-router-dom';

const BarraLateral: React.FC = () => {
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="hidden md:flex flex-col w-72 p-6 bg-white border-r border-[var(--border)] h-screen sticky top-0">
      {/* Logo/Branding */}
      <div className="flex items-center gap-3 px-4 py-4 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
          💰
        </div>
        <div className="flex flex-col">
          <div className="text-lg font-bold text-gray-900">Finanças</div>
          <div className="text-xs text-gray-500">Sistema MEI</div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1">
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 ${
            isActive('/dashboard')
              ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span className="text-xl">📊</span>
          <span>Dashboard</span>
          {isActive('/dashboard') && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></div>}
        </Link>

        <Link
          to="/transacoes"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 ${
            isActive('/transacoes')
              ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span className="text-xl">�</span>
          <span>Transações</span>
          {isActive('/transacoes') && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></div>}
        </Link>

        <Link
          to="/relatorios"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 ${
            isActive('/relatorios')
              ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span className="text-xl">📈</span>
          <span>Relatórios</span>
          {isActive('/relatorios') && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></div>}
        </Link>
      </nav>

      {/* Footer Info */}
      <div className="border-t border-[var(--border)] pt-4">
        <div className="text-xs text-gray-500 text-center">
          <p className="font-medium mb-1">Sistema Financeiro</p>
          <p>Versão 1.0</p>
        </div>
      </div>
    </aside>
  );
};

export default BarraLateral;
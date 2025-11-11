import React from 'react';
import { Link } from 'react-router-dom';

const BarraLateral: React.FC = () => {
  return (
    <aside className="hidden md:flex flex-col w-72 p-4 bg-white border-r border-[var(--border)] glass">
      <div className="flex items-center justify-start h-16 px-3">
        <div className="text-lg font-semibold text-gray-900">Finanças</div>
        <div className="ml-2 text-sm text-gray-500">MEI</div>
      </div>

      <nav className="mt-6 flex-1 space-y-2">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-800 hover:bg-gray-100 transition"
        >
          <span>📊</span>
          <span>Dashboard</span>
        </Link>

        <Link
          to="/transacoes"
          className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-800 hover:bg-gray-100 transition"
        >
          <span>📝</span>
          <span>Transações</span>
        </Link>

        <Link
          to="/relatorios"
          className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-800 hover:bg-gray-100 transition"
        >
          <span>📈</span>
          <span>Relatórios</span>
        </Link>
      </nav>
    </aside>
  );
};

export default BarraLateral;
import React from 'react';
import { Link } from 'react-router-dom';

const BarraLateral: React.FC = () => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-indigo-700 text-white">
      <div className="flex items-center justify-center h-16 bg-indigo-800 text-xl font-bold">
        Finanças MEI
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link 
          to="/dashboard" 
          className="block px-3 py-2 rounded-md hover:bg-indigo-600 transition duration-150 ease-in-out"
        >
          📊 Dashboard
        </Link>
        <Link 
          to="/transacoes" 
          className="block px-3 py-2 rounded-md hover:bg-indigo-600 transition duration-150 ease-in-out"
        >
          📝 Transações
        </Link>
        <Link 
          to="/relatorios" 
          className="block px-3 py-2 rounded-md hover:bg-indigo-600 transition duration-150 ease-in-out"
        >
          📈 Relatórios
        </Link>
      </nav>
    </div>
  );
};

export default BarraLateral;
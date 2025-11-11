import React from 'react';
import { useAuth } from '../contexts/useAuth';

const Cabecalho: React.FC = () => {
  const { logout } = useAuth();

  return (
    <header className="flex items-center justify-between h-16 header-modern px-6">
      <h1 className="text-xl font-semibold text-gray-800">
        Dashboard
      </h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Olá, Pedro!</span>
        <button onClick={logout} className="btn-danger">
          Sair
        </button>
        <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm">P</div>
      </div>
    </header>
  );
};

export default Cabecalho;
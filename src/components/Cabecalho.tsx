import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Cabecalho: React.FC = () => {
  const { logout } = useAuth();

  return (
    <header className="flex items-center justify-between h-16 bg-white border-b px-6">
      <h1 className="text-xl font-semibold text-gray-800">
        Dashboard
      </h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Olá, Pedro!</span>
        <button
          onClick={logout}
          className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-150"
        >
          Sair
        </button>
        <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm">P</div>
      </div>
    </header>
  );
};

export default Cabecalho;
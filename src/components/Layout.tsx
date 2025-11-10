import React from 'react';
import type { ReactNode } from 'react';
import BarraLateral from './BarraLateral';
import Cabecalho from './Cabecalho';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <BarraLateral />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Cabecalho />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
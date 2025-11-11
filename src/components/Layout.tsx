import React from 'react';
import type { ReactNode } from 'react';
import BarraLateral from './BarraLateral';
import Cabecalho from './Cabecalho';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <BarraLateral />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Cabecalho />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
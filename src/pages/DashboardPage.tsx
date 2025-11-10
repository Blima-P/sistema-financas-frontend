import React from 'react';
import Layout from '../components/Layout';

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Visão Geral Mensal</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">Saldo Atual</p>
          <p className="text-3xl font-bold text-green-600">R$ 5.890,00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">Receitas Mês</p>
          <p className="text-3xl font-bold text-indigo-600">R$ 7.500,00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">Despesas Mês</p>
          <p className="text-3xl font-bold text-red-600">R$ 1.610,00</p>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow h-96">
        <h3 className="text-lg font-semibold mb-4">Distribuição de Gastos</h3>
        <p className="text-gray-400">Placeholder para o componente de gráfico.</p>
      </div>
      
    </Layout>
  );
};

export default DashboardPage;
import React from 'react';
import Layout from '../components/Layout';
import CartaoKPI from '../components/CartaoKPI';

const DashboardPage: React.FC = () => {
  const dadosFinanceiros = {
    saldoAtual: 5890.00,
    receitasMes: 7500.00,
    despesasMes: 1610.00,
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Visão Geral Mensal</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <CartaoKPI 
          titulo="Saldo Atual" 
          valor={dadosFinanceiros.saldoAtual} 
          corDestaque="verde" 
        />
        
        <CartaoKPI 
          titulo="Receitas do Mês" 
          valor={dadosFinanceiros.receitasMes} 
          corDestaque="indigo" 
        />
        
        <CartaoKPI 
          titulo="Despesas do Mês" 
          valor={dadosFinanceiros.despesasMes} 
          corDestaque="vermelho" 
        />
        
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md h-96">
        <h3 className="text-lg font-semibold mb-4">Distribuição de Gastos</h3>
        <p className="text-gray-400">Placeholder para o componente de gráfico (futuramente será carregado aqui).</p>
      </div>
      
    </Layout>
  );
};

export default DashboardPage;
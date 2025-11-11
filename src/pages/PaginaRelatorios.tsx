// src/pages/PaginaRelatorios.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import GraficoDespesas from '../components/GraficoDespesas'; // Importar componente de gráfico

const dadosMockGrafico = [
  { categoria: 'Aluguel', despesa: 1500 },
  { categoria: 'Marketing', despesa: 800 },
  { categoria: 'Material', despesa: 350 },
  { categoria: 'Pessoal', despesa: 1800 },
  { categoria: 'Impostos', despesa: 1000 },
];

const PaginaRelatorios: React.FC = () => {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [tipo, setTipo] = useState('TODOS');

  const aplicarFiltros = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Filtros Aplicados:', { dataInicio, dataFim, tipo });
    // Futuramente: Chamar API para buscar dados com base nos filtros
    alert('Simulação de busca de dados de relatório.');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📊 Relatórios Financeiros</h1>
          <p className="text-gray-500">Analise suas finanças com detalhes e gráficos</p>
        </div>
        
        {/* Filter Panel */}
        <div className="card mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">🔍 Filtrar Relatório</h3>
          <form onSubmit={aplicarFiltros} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

            <div>
              <label htmlFor="dataInicio" className="block text-sm font-semibold text-gray-800 mb-2">
                Data Inicial
              </label>
              <input 
                id="dataInicio" 
                type="date" 
                value={dataInicio} 
                onChange={(e) => setDataInicio(e.target.value)} 
                className="input-modern"
                required
              />
            </div>

            <div>
              <label htmlFor="dataFim" className="block text-sm font-semibold text-gray-800 mb-2">
                Data Final
              </label>
              <input 
                id="dataFim" 
                type="date" 
                value={dataFim} 
                onChange={(e) => setDataFim(e.target.value)} 
                className="input-modern"
                required
              />
            </div>

            <div>
              <label htmlFor="tipo" className="block text-sm font-semibold text-gray-800 mb-2">
                Tipo de Transação
              </label>
              <select
                id="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="select-modern"
              >
                <option value="TODOS">📋 Todos</option>
                <option value="RECEITA">💰 Receita</option>
                <option value="DESPESA">💸 Despesa</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn-primary w-full h-fit"
            >
              🔄 Gerar Relatório
            </button>
          </form>
        </div>
        
        {/* Report Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Chart Section */}
          <div className="card-hero lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-6">💹 Despesas por Categoria</h3>
            <div className="h-96">
              <GraficoDespesas dados={dadosMockGrafico} /> 
            </div>
          </div>

          {/* Summary Card */}
          <div className="space-y-4">
            <div className="card-hero">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Resumo do Período</h3>
              
              {/* Saldo Líquido */}
              <div className="bg-green-50 rounded-xl p-4 mb-3">
                <p className="text-xs text-green-700 font-semibold uppercase tracking-wide">Saldo Líquido</p>
                <p className="text-2xl font-bold text-green-600 mt-1">R$ 4.500,00</p>
              </div>

              {/* Total Receitas */}
              <div className="bg-blue-50 rounded-xl p-4 mb-3">
                <p className="text-xs text-blue-700 font-semibold uppercase tracking-wide">Total Receitas</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">R$ 9.000,00</p>
              </div>

              {/* Total Despesas */}
              <div className="bg-red-50 rounded-xl p-4">
                <p className="text-xs text-red-700 font-semibold uppercase tracking-wide">Total Despesas</p>
                <p className="text-2xl font-bold text-red-600 mt-1">R$ 4.500,00</p>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--border)]">
                <p className="text-xs text-gray-500 text-center">
                  💡 Dados simulados para demonstração
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaginaRelatorios;
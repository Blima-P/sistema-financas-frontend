// src/pages/PaginaRelatorios.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Input from '../components/Input';
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Relatórios Financeiros</h2>
      
      {/* 1. Área de Filtros */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Filtrar Período e Tipo</h3>
        <form onSubmit={aplicarFiltros} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          
          <Input 
            id="dataInicio" 
            rotulo="Data Inicial" 
            type="date" 
            value={dataInicio} 
            onChange={(e) => setDataInicio(e.target.value)} 
            required
          />
          
          <Input 
            id="dataFim" 
            rotulo="Data Final" 
            type="date" 
            value={dataFim} 
            onChange={(e) => setDataFim(e.target.value)} 
            required
          />
          
          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
              Tipo de Transação
            </label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="TODOS">Todos</option>
              <option value="RECEITA">Receita</option>
              <option value="DESPESA">Despesa</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition"
            >
              Gerar Relatório
            </button>
          </div>
        </form>
      </div>
      
      {/* 2. Área de Visualização do Relatório (Gráficos) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Integração do Gráfico */}
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2 h-96">
          <h3 className="text-lg font-semibold mb-4">Despesas por Categoria</h3>
          <GraficoDespesas dados={dadosMockGrafico} /> 
        </div>

        {/* Resumo Rápido */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Resumo do Período</h3>
          <p className="text-gray-500 mb-2">**Saldo Líquido:** <span className="font-bold text-2xl text-green-600">R$ 4.500,00</span></p>
          <p className="text-gray-500 mb-2">**Total Receitas:** <span className="font-bold text-xl text-indigo-600">R$ 9.000,00</span></p>
          <p className="text-gray-500">**Total Despesas:** <span className="font-bold text-xl text-red-600">R$ 4.500,00</span></p>
          <div className="mt-4 pt-4 border-t border-gray-200">
             <p className="text-sm text-gray-500">Dados simulados para demonstração.</p>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default PaginaRelatorios;
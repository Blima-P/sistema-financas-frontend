// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import GraficoSaldoAnual from '../components/GraficoSaldoAnual'; // Importar o novo gráfico

// Dados mock para simular o saldo anual antes da integração real da API
const dadosMockSaldoAnual = [
  { mes: 'Jan', saldo: 2500 },
  { mes: 'Fev', saldo: 1800 },
  { mes: 'Mar', saldo: 3500 },
  { mes: 'Abr', saldo: 3100 },
  { mes: 'Mai', saldo: 4200 },
  { mes: 'Jun', saldo: 5500 },
  { mes: 'Jul', saldo: 4800 },
  { mes: 'Ago', saldo: 5900 },
  { mes: 'Set', saldo: 6500 },
  { mes: 'Out', saldo: 7200 },
  { mes: 'Nov', saldo: 6800 },
  { mes: 'Dez', saldo: 8000 },
];

const DashboardPage: React.FC = () => {
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [carregando, setCarregando] = useState(true);

  // Função para buscar dados de resumo no backend
  const carregarResumo = async () => {
    try {
      // Nota: Esta API de resumo ainda não existe no nosso backend, é um endpoint futuro
      // Estamos simulando a busca para fins de estrutura
      await api.get('/resumo/atual'); 
      
      // Simulação: se a API for bem-sucedida, atualize os estados
      setTotalReceitas(50000); 
      setTotalDespesas(35000); 
      setSaldo(15000); 

    } catch (error) {
      console.error("Erro ao carregar resumo do dashboard:", error);
      // Mantém os valores simulados se houver erro
      setTotalReceitas(50000); 
      setTotalDespesas(35000); 
      setSaldo(15000); 
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarResumo();
  }, []);

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard Financeiro</h1>
          <p className="text-gray-500">Acompanhe sua situação financeira em tempo real</p>
        </div>
        
        {/* Cards de Resumo - KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card Saldo Atual */}
          <div className={`card border-l-4 ${saldo >= 0 ? 'border-l-blue-500' : 'border-l-red-500'} hover-lift`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Saldo Atual</p>
                <p className={`text-3xl font-bold mt-3 ${saldo >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  {carregando ? '...' : formatarValor(saldo)}
                </p>
                <p className="text-xs text-gray-400 mt-2">Seu saldo disponível</p>
              </div>
            </div>
          </div>

          {/* Card Total Receitas */}
          <div className="card border-l-4 border-l-green-500 hover-lift">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Receitas</p>
                <p className="text-3xl font-bold text-green-600 mt-3">
                  {carregando ? '...' : formatarValor(totalReceitas)}
                </p>
                <p className="text-xs text-gray-400 mt-2">Mês atual</p>
              </div>
            </div>
          </div>

          {/* Card Total Despesas */}
          <div className="card border-l-4 border-l-red-500 hover-lift">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Despesas</p>
                <p className="text-3xl font-bold text-red-600 mt-3">
                  {carregando ? '...' : formatarValor(totalDespesas)}
                </p>
                <p className="text-xs text-gray-400 mt-2">Mês atual</p>
              </div>
            </div>
          </div>
        </div>

        {/* Área do Gráfico de Saldo Anual */}
        <div className="card-hero h-[450px]"> 
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Evolução do Saldo Anual</h2>
          <GraficoSaldoAnual dados={dadosMockSaldoAnual} /> {/* Componente Integrado */}
        </div>
      </div>
      
    </Layout>
  );
};

export default DashboardPage;
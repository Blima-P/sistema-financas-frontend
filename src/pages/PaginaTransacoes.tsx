// src/pages/PaginaTransacoes.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import ModalTransacao from '../components/ModalTransacao';
import axios from 'axios'; // Importar Axios

const PaginaTransacoes: React.FC = () => {
  const [modalAberto, setModalAberto] = useState(false);
  
  const transacoesIniciais = [
    { id: 1, data: '2025-11-08', descricao: 'Venda de Serviço A', valor: 3500.00, tipo: 'Receita', categoria: 'Serviços' },
    { id: 2, data: '2025-11-09', descricao: 'Aluguel do Escritório', valor: -1500.00, tipo: 'Despesa', categoria: 'Custos Fixos' },
    { id: 3, data: '2025-11-09', descricao: 'Compra de Material', valor: -150.00, tipo: 'Despesa', categoria: 'Materiais' },
  ];
  const [transacoes, setTransacoes] = useState(transacoesIniciais);

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const lidarComSalvarTransacao = async (dados: any) => {
    console.log('Dados prontos para envio:', dados);
    
    // Simulação da chamada POST com Axios
    try {
        const token = localStorage.getItem('tokenAuth');
        const resposta = await axios.post(
            'http://localhost:8080/api/transacoes', // URL da API da Nicole
            dados,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        
        // Simular a adição local após sucesso da API
        const novaTransacao = {
            ...resposta.data, // Idealmente, a API retorna o objeto completo
            id: Date.now(), // Usamos Date.now() como ID temporário
            valor: dados.tipo === 'DESPESA' ? -dados.valor : dados.valor,
        };
        setTransacoes([novaTransacao, ...transacoes]);
        alert('Transação salva com sucesso!');
        
    } catch (erro) {
        console.error('Erro ao salvar transação:', erro);
        alert('Erro ao salvar transação. Verifique o console.');
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Minhas Transações</h2>
        <button 
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          onClick={() => setModalAberto(true)}
        >
          + Nova Transação
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <p className="text-sm text-gray-500">Filtros: Data, Categoria, Tipo (Em desenvolvimento)</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transacoes.map((t) => (
              <tr key={t.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.data}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.descricao}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${t.tipo === 'Receita' ? 'text-green-600' : 'text-red-600'}`}>
                  {formatarValor(Math.abs(t.valor))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.categoria}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">✏️</button>
                  <button className="text-red-600 hover:text-red-900">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalTransacao
        aberto={modalAberto}
        onClose={() => setModalAberto(false)}
        onSave={lidarComSalvarTransacao}
      />

    </Layout>
  );
};

export default PaginaTransacoes;
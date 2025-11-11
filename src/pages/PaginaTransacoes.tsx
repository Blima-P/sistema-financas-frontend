// src/pages/PaginaTransacoes.tsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ModalTransacao from '../components/ModalTransacao';
import api from '../services/api'; // Importa a instância centralizada

export interface Transacao {
  id: number;
  data: string;
  descricao: string;
  valor: number;
  tipo: 'Receita' | 'Despesa';
  categoria: string;
}

const PaginaTransacoes: React.FC = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [transacaoEmEdicao, setTransacaoEmEdicao] = useState<Transacao | null>(null);

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const carregarTransacoes = async () => {
    setCarregando(true);
    setErro(null);
    try {
        // Uso da instância 'api'
        const resposta = await api.get<Transacao[]>('/transacoes'); 
        
        const dadosFormatados = resposta.data.map(t => ({
            ...t,
            valor: t.tipo === 'Despesa' ? -Math.abs(t.valor) : Math.abs(t.valor)
        }));
        
        setTransacoes(dadosFormatados);
        
    } catch (e) {
        setErro('Não foi possível carregar as transações. O backend está ativo?');
    } finally {
        setCarregando(false);
    }
  };

  useEffect(() => {
    carregarTransacoes();
  }, []);

  const fecharModal = () => {
    setModalAberto(false);
    setTransacaoEmEdicao(null);
  };

  const abrirModalParaCriacao = () => {
    setTransacaoEmEdicao(null); 
    setModalAberto(true);
  };

  const abrirModalParaEdicao = (transacao: Transacao) => {
    setTransacaoEmEdicao(transacao); 
    setModalAberto(true);
  };

  const lidarComSalvarTransacao = async (dados: any, isEdicao: boolean) => {
    try {
        if (isEdicao) {
            // ROTA DE EDIÇÃO (PUT)
            await api.put(`/transacoes/${dados.id}`, dados);
            alert('Transação atualizada com sucesso!');
        } else {
            // ROTA DE CRIAÇÃO (POST)
            await api.post('/transacoes', dados);
            alert('Transação criada com sucesso!');
        }
        
        carregarTransacoes(); 
        
    } catch (erro) {
        alert(`Erro ao ${isEdicao ? 'atualizar' : 'salvar'} transação.`);
    }
  };

  const lidarComExclusao = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir esta transação?')) {
      return;
    }

    try {
      // ROTA DE EXCLUSÃO (DELETE)
      await api.delete(`/transacoes/${id}`);

      setTransacoes(transacoes.filter(t => t.id !== id));
      alert('Transação excluída com sucesso!');

    } catch (erro) {
      alert('Erro ao excluir transação. Verifique o console.');
    }
  };


  if (carregando) {
    return (
        <Layout>
            <div className="text-center p-12 text-lg text-indigo-600">Carregando transações...</div>
        </Layout>
    );
  }

  if (erro) {
    return (
        <Layout>
            <div className="text-center p-12 text-red-600 font-bold">{erro}</div>
        </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Minhas Transações</h2>
        <button 
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          onClick={abrirModalParaCriacao}
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
                  <button 
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                    onClick={() => abrirModalParaEdicao(t)}
                  >
                    ✏️
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={() => lidarComExclusao(t.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
            {transacoes.length === 0 && (
                <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                        Nenhuma transação encontrada. Clique em "+ Nova Transação" para começar.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      <ModalTransacao
        aberto={modalAberto}
        onClose={fecharModal}
        onSave={lidarComSalvarTransacao}
        transacaoInicial={transacaoEmEdicao}
      />

    </Layout>
  );
};

export default PaginaTransacoes;
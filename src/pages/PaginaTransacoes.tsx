import React, { useState } from 'react';
import Layout from '../components/Layout';
import ModalTransacao from '../components/ModalTransacao';
import { useAuth } from '../contexts/useAuth';

// --- CORREÇÃO: EXPORTAR OS TIPOS AQUI ---
export type TipoTransacao = 'RECEITA' | 'DESPESA';
export interface Categoria {
    id: number;
    nome: string;
}
export interface Transacao {
    id: number;
    data: string;
    descricao: string;
    valor: number;
    tipo: TipoTransacao;
    categoriaId: number;
}
// ----------------------------------------

const mockTransacoes: Transacao[] = [
    { id: 1, data: '2025-10-01', descricao: 'Salário', valor: 3000, tipo: 'RECEITA', categoriaId: 2 },
    { id: 2, data: '2025-10-05', descricao: 'Aluguel', valor: 1200, tipo: 'DESPESA', categoriaId: 4 },
];

const PaginaTransacoes: React.FC = () => {
    const [transacoes, setTransacoes] = useState<Transacao[]>(mockTransacoes);
    const [modalAberto, setModalAberto] = useState(false);
    const [transacaoParaEditar, setTransacaoParaEditar] = useState<Transacao | null>(null);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    useAuth(); // Exemplo de uso de auth

    // Função mock para simular POST/PUT
    const lidarComSalvarTransacao = async (dados: Omit<Transacao, 'id'>) => {
        setCarregando(true);
        setErro(null);
        try {
            // Simulação de delay de API
            await new Promise(resolve => setTimeout(resolve, 500)); 

            if (transacaoParaEditar) {
                // Simulação de Edição
                setTransacoes(transacoes.map(t => 
                    t.id === transacaoParaEditar.id ? { ...dados, id: t.id } : t
                ));
            } else {
                // Simulação de Criação
                const novaTransacao = { ...dados, id: Date.now() };
                setTransacoes([...transacoes, novaTransacao]);
            }
        } catch (e) {
            setErro('Erro ao salvar transação.');
            console.error(e);
        } finally {
            setCarregando(false);
            setTransacaoParaEditar(null);
        }
    };
    
    // Função para deletar
    const lidarComDeletar = (id: number) => {
        setTransacoes(transacoes.filter(t => t.id !== id));
    };

    const lidarComEditar = (transacao: Transacao) => {
        setTransacaoParaEditar(transacao);
        setModalAberto(true);
    };

    if (carregando) {
        return <Layout><div className="text-center p-12 text-lg text-indigo-600">Carregando transações...</div></Layout>;
    }
    
    if (erro) {
        return <Layout><div className="text-center p-12 text-red-600 font-bold">{erro}</div></Layout>;
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">💳 Transações</h1>
                    <p className="text-gray-500">Gerencie todas as suas transações financeiras</p>
                </div>

                {/* Action Bar */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Total: <span className="font-bold text-gray-900">{transacoes.length}</span> transações</span>
                    </div>
                    <button
                        onClick={() => { setTransacaoParaEditar(null); setModalAberto(true); }}
                        className="btn-primary"
                    >
                        ➕ Nova Transação
                    </button>
                </div>

                {/* Transações Table */}
                {transacoes.length > 0 ? (
                    <div className="card">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[var(--border)]">
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">📅 Data</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">📝 Descrição</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">💰 Valor</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">📊 Tipo</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">🏷️ Categoria</th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--border)]">
                                    {transacoes.map((t) => (
                                        <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {new Date(t.data).toLocaleDateString('pt-BR')}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{t.descricao}</td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${t.tipo === 'RECEITA' ? 'text-green-600' : 'text-red-600'}`}>
                                                {t.tipo === 'RECEITA' ? '+' : '-'} R$ {t.valor.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    t.tipo === 'RECEITA' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {t.tipo}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {t.categoriaId === 1 ? 'Alimentação' :
                                                 t.categoriaId === 2 ? 'Salário' :
                                                 t.categoriaId === 3 ? 'Transporte' :
                                                 t.categoriaId === 4 ? 'Moradia' :
                                                 t.categoriaId === 5 ? 'Investimentos' : 'Outra'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button 
                                                        onClick={() => lidarComEditar(t)}
                                                        className="btn-ghost text-sm"
                                                        title="Editar transação"
                                                    >
                                                        ✏️ Editar
                                                    </button>
                                                    <button 
                                                        onClick={() => lidarComDeletar(t.id)}
                                                        className="btn-ghost text-sm text-red-600 hover:bg-red-50"
                                                        title="Deletar transação"
                                                    >
                                                        🗑️ Deletar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="card text-center py-12">
                        <p className="text-lg text-gray-500 mb-4">📭 Nenhuma transação encontrada</p>
                        <p className="text-sm text-gray-400 mb-6">Comece criando sua primeira transação</p>
                        <button
                            onClick={() => { setTransacaoParaEditar(null); setModalAberto(true); }}
                            className="btn-primary"
                        >
                            ➕ Nova Transação
                        </button>
                    </div>
                )}

                <ModalTransacao
                    aberto={modalAberto}
                    onClose={() => { setModalAberto(false); setTransacaoParaEditar(null); }}
                    onSave={lidarComSalvarTransacao}
                    transacaoParaEditar={transacaoParaEditar}
                />
            </div>
        </Layout>
    );
};

export default PaginaTransacoes;
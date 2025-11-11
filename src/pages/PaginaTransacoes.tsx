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
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Transações</h1>
                
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => { setTransacaoParaEditar(null); setModalAberto(true); }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                    >
                        + Nova Transação
                    </button>
                </div>

                {/* Tabela de Transações */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {transacoes.length > 0 ? (
                                transacoes.map((t) => (
                                    <tr key={t.id} className={t.tipo === 'RECEITA' ? 'bg-green-50' : 'bg-red-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.data}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.descricao}</td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${t.tipo === 'RECEITA' ? 'text-green-600' : 'text-red-600'}`}>
                                            R$ {t.valor.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.tipo}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.categoriaId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button 
                                                onClick={() => lidarComEditar(t)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                onClick={() => lidarComDeletar(t.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Deletar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                        Nenhuma transação encontrada. Clique em "Nova Transação" para começar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

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
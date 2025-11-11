import React, { useState, useEffect } from 'react';
import Input from './Input';
// --- CORREÇÃO: Importa os tipos de PaginaTransacoes.tsx ---
import type { Transacao, TipoTransacao, Categoria } from '../pages/PaginaTransacoes'; 

// Mock de categorias
const mockCategorias: Categoria[] = [
    { id: 1, nome: 'Alimentação' },
    { id: 2, nome: 'Salário' },
    { id: 3, nome: 'Transporte' },
    { id: 4, nome: 'Moradia' },
    { id: 5, nome: 'Investimentos' },
];

interface ModalTransacaoProps {
  aberto: boolean;
  onClose: () => void;
  onSave: (transacao: Omit<Transacao, 'id'>) => Promise<void>;
  transacaoParaEditar?: Transacao | null; 
}

const ModalTransacao: React.FC<ModalTransacaoProps> = ({ 
  aberto, 
  onClose, 
  onSave, 
  transacaoParaEditar = null 
}) => {
  // ... (useState declarations)
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(0);
  const [tipo, setTipo] = useState<TipoTransacao>('RECEITA');
  const [categoriaId, setCategoriaId] = useState<number>(mockCategorias[0].id);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (transacaoParaEditar) {
      setData(transacaoParaEditar.data);
      setDescricao(transacaoParaEditar.descricao);
      setValor(transacaoParaEditar.valor);
      setTipo(transacaoParaEditar.tipo);
      setCategoriaId(transacaoParaEditar.categoriaId);
    } else {
      setData(new Date().toISOString().substring(0, 10));
      setDescricao('');
      setValor(0);
      setTipo('RECEITA');
      setCategoriaId(mockCategorias[0].id);
    }
  }, [transacaoParaEditar]);

  if (!aberto) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);

    const novaTransacao: Omit<Transacao, 'id'> = {
      data,
      descricao,
      valor,
      tipo,
      categoriaId,
    };

    try {
      await onSave(novaTransacao);
      onClose();
    } catch (error) {
      alert("Erro ao salvar transação. Verifique o console.");
      console.error("Erro ao salvar transação:", error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      {/* Container do Modal */}
      <div className="card-hero w-full max-w-lg mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {transacaoParaEditar ? 'Editar Transação' : 'Nova Transação'}
        </h2>

        {/* Formulário */}
        <form onSubmit={handleSubmit}>

          {/* Campo Tipo (Botões de Rádio simples) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
            <div className="flex gap-3">
              <button type="button" onClick={() => setTipo('RECEITA')} className={`px-4 py-2 rounded-full ${tipo === 'RECEITA' ? 'bg-green-100 text-green-800' : 'bg-gray-50 text-gray-700'}`}>
                Receita
              </button>
              <button type="button" onClick={() => setTipo('DESPESA')} className={`px-4 py-2 rounded-full ${tipo === 'DESPESA' ? 'bg-red-100 text-red-800' : 'bg-gray-50 text-gray-700'}`}>
                Despesa
              </button>
            </div>
          </div>

          <Input
            id="descricao"
            rotulo="Descrição"
            type="text"
            placeholder="Ex: Aluguel, Salário, etc."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />

          <Input
            id="valor"
            rotulo="Valor (R$)"
            type="number"
            placeholder="0.00"
            value={valor}
            onChange={(e) => setValor(parseFloat(e.target.value) || 0)}
            step="0.01"
            required
          />

          <Input
            id="data"
            rotulo="Data"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />

          {/* Dropdown Categoria */}
          <div className="mb-6">
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
              Categoria
            </label>
            <select
              id="categoria"
              value={categoriaId}
              onChange={(e) => setCategoriaId(parseInt(e.target.value))}
              className="mt-1 input-modern"
              required
            >
              {mockCategorias.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-secondary" disabled={carregando}>
              Cancelar
            </button>
            <button type="submit" className={`btn-primary ${carregando ? 'opacity-60 pointer-events-none' : ''}`} disabled={carregando}>
              {carregando ? 'Salvando...' : (transacaoParaEditar ? 'Salvar Edição' : 'Salvar Transação')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- CORREÇÃO CRÍTICA DE EXPORTAÇÃO ---
export default ModalTransacao;
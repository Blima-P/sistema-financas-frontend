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
    // Backdrop with fade-in
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Container do Modal */}
      <div className="card-hero w-full max-w-md mx-auto animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {transacaoParaEditar ? '✏️ Editar Transação' : '➕ Nova Transação'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">Preencha os dados da transação</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Campo Tipo - Botões modernos */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">Tipo de Transação</label>
            <div className="flex gap-2">
              <button 
                type="button" 
                onClick={() => setTipo('RECEITA')} 
                className={`flex-1 px-4 py-2.5 rounded-xl font-semibold transition-all duration-150 ${
                  tipo === 'RECEITA' 
                    ? 'bg-green-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💰 Receita
              </button>
              <button 
                type="button" 
                onClick={() => setTipo('DESPESA')} 
                className={`flex-1 px-4 py-2.5 rounded-xl font-semibold transition-all duration-150 ${
                  tipo === 'DESPESA' 
                    ? 'bg-red-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💸 Despesa
              </button>
            </div>
          </div>

          {/* Campo Descrição */}
          <Input
            id="descricao"
            rotulo="Descrição"
            type="text"
            placeholder="Ex: Salário, Aluguel, Comida..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />

          {/* Campo Valor */}
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

          {/* Campo Data */}
          <Input
            id="data"
            rotulo="Data da Transação"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />

          {/* Dropdown Categoria */}
          <div>
            <label htmlFor="categoria" className="block text-sm font-semibold text-gray-800 mb-2">
              Categoria
            </label>
            <select
              id="categoria"
              value={categoriaId}
              onChange={(e) => setCategoriaId(parseInt(e.target.value))}
              className="select-modern"
              required
            >
              {mockCategorias.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Botões - Action Footer */}
          <div className="flex gap-3 pt-4 border-t border-[var(--border)]">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 btn-secondary" 
              disabled={carregando}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className={`flex-1 btn-primary ${carregando ? 'opacity-60 pointer-events-none' : ''}`} 
              disabled={carregando}
            >
              {carregando ? '⏳ Salvando...' : (transacaoParaEditar ? '💾 Salvar Edição' : '💾 Salvar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- CORREÇÃO CRÍTICA DE EXPORTAÇÃO ---
export default ModalTransacao;
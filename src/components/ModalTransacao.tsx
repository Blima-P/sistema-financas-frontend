// src/components/ModalTransacao.tsx
import React, { useState, useEffect } from 'react';
import Input from './Input';
import type { Transacao } from '../pages/PaginaTransacoes';

interface ModalTransacaoProps {
  aberto: boolean;
  onClose: () => void;
  transacaoInicial: Transacao | null;
  onSave: (dados: any, isEdicao: boolean) => void;
}

const ModalTransacao: React.FC<ModalTransacaoProps> = ({ aberto, onClose, transacaoInicial, onSave }) => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('RECEITA'); 
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    if (transacaoInicial) {
      setDescricao(transacaoInicial.descricao);
      setValor(Math.abs(transacaoInicial.valor).toFixed(2)); 
      setTipo(transacaoInicial.tipo.toUpperCase());
      setCategoria(transacaoInicial.categoria);
      setData(transacaoInicial.data); 
    } else {
      setDescricao('');
      setValor('');
      setTipo('RECEITA');
      setCategoria('');
      setData('');
    }
  }, [transacaoInicial, aberto]);

  if (!aberto) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEdicao = !!transacaoInicial;
    
    const dadosTransacao = {
      id: isEdicao ? transacaoInicial.id : undefined,
      descricao,
      valor: parseFloat(valor),
      tipo,
      categoria,
      data,
    };
    
    onSave(dadosTransacao, isEdicao);
  };

  const tituloModal = transacaoInicial ? 'Editar Transação' : 'Nova Transação';
  const corBotao = transacaoInicial ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{tituloModal}</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  name="tipo" 
                  value="RECEITA" 
                  checked={tipo === 'RECEITA'} 
                  onChange={() => setTipo('RECEITA')}
                  className="form-radio text-green-600"
                />
                <span className="ml-2 text-green-600 font-medium">Receita</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  name="tipo" 
                  value="DESPESA" 
                  checked={tipo === 'DESPESA'} 
                  onChange={() => setTipo('DESPESA')}
                  className="form-radio text-red-600"
                />
                <span className="ml-2 text-red-600 font-medium">Despesa</span>
              </label>
            </div>
          </div>

          <Input 
            id="data" 
            rotulo="Data" 
            type="date" 
            value={data} 
            onChange={(e) => setData(e.target.value)} 
            required
          />
          
          <Input 
            id="descricao" 
            rotulo="Descrição" 
            type="text" 
            value={descricao} 
            onChange={(e) => setDescricao(e.target.value)} 
            required
          />
          
          <Input 
            id="valor" 
            rotulo="Valor (R$)" 
            type="number" 
            step="0.01" 
            value={valor} 
            onChange={(e) => setValor(e.target.value)} 
            required
          />

          <Input 
            id="categoria" 
            rotulo="Categoria" 
            type="text" 
            value={categoria} 
            onChange={(e) => setCategoria(e.target.value)} 
            placeholder="Ex: Venda, Aluguel, Marketing"
            required
          />

          <div className="flex justify-end space-x-4 mt-6">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className={`px-4 py-2 text-white rounded-md transition ${corBotao}`}
            >
              {transacaoInicial ? 'Salvar Edição' : 'Salvar Transação'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalTransacao;
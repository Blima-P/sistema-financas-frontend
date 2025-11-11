import React from 'react';

interface CartaoKPIProps {
  titulo: string;
  valor: number;
  corDestaque: 'verde' | 'indigo' | 'vermelho';
}

const CartaoKPI: React.FC<CartaoKPIProps> = ({ titulo, valor, corDestaque }) => {
  
  let classeCorValor = '';
  switch (corDestaque) {
    case 'verde':
      classeCorValor = 'text-green-600';
      break;
    case 'indigo':
      classeCorValor = 'text-indigo-600';
      break;
    case 'vermelho':
      classeCorValor = 'text-red-600';
      break;
    default:
      classeCorValor = 'text-gray-800';
  }

  const valorFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);

  return (
    <div className="card">
      <p className="text-sm font-medium muted">{titulo}</p>
      <p className={`mt-2 text-3xl font-extrabold ${classeCorValor}`}>
        {valorFormatado}
      </p>
    </div>
  );
};

export default CartaoKPI;
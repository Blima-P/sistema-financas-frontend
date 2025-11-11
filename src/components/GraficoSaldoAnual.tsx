// src/components/GraficoSaldoAnual.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DadosSaldoAnual {
  mes: string;
  saldo: number;
}

interface GraficoSaldoAnualProps {
  dados: DadosSaldoAnual[];
}

// Custom Tooltip para exibir valores formatados
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const valor = payload[0].value;
    const cor = valor >= 0 ? 'text-green-600' : 'text-red-600';
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="text-sm font-semibold text-gray-800">{`Mês: ${label}`}</p>
        <p className={`text-lg font-bold ${cor}`}>
          {`Saldo: ${valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
        </p>
      </div>
    );
  }

  return null;
};

const GraficoSaldoAnual: React.FC<GraficoSaldoAnualProps> = ({ dados }) => {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={dados}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="mes" stroke="#555" />
        <YAxis 
          stroke="#555"
          tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {/* A cor da linha é definida por uma função para mudar de acordo com o saldo */}
        <Line 
          type="monotone" 
          dataKey="saldo" 
          stroke="#4f46e5" // Cor padrão Índigo
          strokeWidth={2}
          name="Saldo Acumulado"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GraficoSaldoAnual;
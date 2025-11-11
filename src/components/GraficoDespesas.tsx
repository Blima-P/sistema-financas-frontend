// src/components/GraficoDespesas.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DadosGrafico {
  categoria: string;
  despesa: number;
}

interface GraficoDespesasProps {
  dados: DadosGrafico[];
}

const GraficoDespesas: React.FC<GraficoDespesasProps> = ({ dados }) => {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={dados}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="categoria" stroke="#555" />
        <YAxis 
          stroke="#555" 
          tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
        />
        <Tooltip 
          formatter={(value) => [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 'Despesa']} 
        />
        <Legend />
        <Bar dataKey="despesa" fill="#ef4444" name="Total Despesas" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GraficoDespesas;
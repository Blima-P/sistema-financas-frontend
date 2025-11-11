import React from 'react';
import type { InputHTMLAttributes } from 'react'; // Correção de importação de tipo

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    rotulo: string;
    id: string;
}

const Input: React.FC<InputProps> = ({ rotulo, id, ...rest }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {rotulo}
      </label>
      <input
        id={id}
        {...rest} // Passa todas as props nativas (value, onChange, type, required)
        className="mt-2 input-modern"
      />
    </div>
  );
};

export default Input;
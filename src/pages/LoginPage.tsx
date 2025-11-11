import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { useAuth } from '../contexts/useAuth';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useAuth();
  const navegar = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'teste@mail.com' && senha === '123456') {
        login('mock-token'); // Simula login bem-sucedido
        navegar('/dashboard');
    } else {
        alert('Credenciais inválidas. Tente: teste@mail.com / 123456');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"> 
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Acesse sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            id="email"
            rotulo="Email"
            name="email"
            type="email"
            required
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="senha"
            rotulo="Senha"
            name="senha"
            type="password"
            required
            placeholder="********"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Entrar
            </button>
          </div>
          <div className="text-sm text-center mt-4">
            Não tem uma conta?{' '}
            <Link to="/registro" className="font-medium text-indigo-600 hover:text-indigo-500">
              Registre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
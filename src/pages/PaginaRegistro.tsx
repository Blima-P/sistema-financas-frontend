import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';

const PaginaRegistro: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    console.log('Tentativa de Registro:', { nome, email, senha });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crie sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            id="nome"
            rotulo="Nome Completo"
            name="nome"
            type="text"
            required
            placeholder="Seu Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
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
          <Input
            id="confirmar-senha"
            rotulo="Confirme a Senha"
            name="confirmar-senha"
            type="password"
            required
            placeholder="********"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Registrar
            </button>
          </div>
          <div className="text-sm text-center">
            Já tem uma conta?{' '}
            <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
              Faça Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaginaRegistro;
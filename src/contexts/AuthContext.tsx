import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, type AuthContextType } from './auth.context';

interface AuthProviderProps {
    children: ReactNode;
}

export const ProvedorAutenticacao: React.FC<AuthProviderProps> = ({ children }) => {
  const [estaAutenticado, setEstaAutenticado] = useState<boolean>(() => {
    const token = localStorage.getItem('tokenAuth');
    return !!token; 
  });

  const [nomeUsuario, setNomeUsuario] = useState<string | null>(() => {
    return localStorage.getItem('nomeUsuario');
  });
  
  const navegar = useNavigate();

  const login = (token: string, nome?: string | null) => {
    localStorage.setItem('tokenAuth', token);
    if (nome) {
      localStorage.setItem('nomeUsuario', nome);
      setNomeUsuario(nome);
    }
    setEstaAutenticado(true);
  };

  const logout = () => {
    localStorage.removeItem('tokenAuth');
    localStorage.removeItem('nomeUsuario');
    setNomeUsuario(null);
    setEstaAutenticado(false);
    navegar('/');
  };

  const value: AuthContextType = { estaAutenticado, nomeUsuario, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
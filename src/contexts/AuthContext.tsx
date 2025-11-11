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
  
  const navegar = useNavigate();

  const login = (token: string) => {
    localStorage.setItem('tokenAuth', token);
    setEstaAutenticado(true);
  };

  const logout = () => {
    localStorage.removeItem('tokenAuth');
    setEstaAutenticado(false);
    navegar('/');
  };

  const value: AuthContextType = { estaAutenticado, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
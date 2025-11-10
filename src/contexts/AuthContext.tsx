import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  estaAutenticado: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const ProvedorAutenticacao: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [estaAutenticado, setEstaAutenticado] = useState(false);
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

  return (
    <AuthContext.Provider value={{ estaAutenticado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const contexto = useContext(AuthContext);
  if (contexto === undefined) {
    throw new Error('useAuth deve ser usado dentro de um ProvedorAutenticacao');
  }
  return contexto;
};
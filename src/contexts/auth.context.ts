import { createContext } from 'react';

export interface AuthContextType {
  estaAutenticado: boolean;
  nomeUsuario?: string | null;
  login: (token: string, nomeUsuario?: string | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

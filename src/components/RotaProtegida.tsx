import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

interface RotaProtegidaProps {
  elemento: React.ReactElement;
}

const RotaProtegida: React.FC<RotaProtegidaProps> = ({ elemento }) => {
  const { estaAutenticado } = useAuth();

  if (!estaAutenticado) {
    return <Navigate to="/" replace />;
  }

  return elemento;
};

export default RotaProtegida;
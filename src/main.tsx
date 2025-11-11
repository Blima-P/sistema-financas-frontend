import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ProvedorAutenticacao } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProvedorAutenticacao>
        <App />
      </ProvedorAutenticacao>
    </BrowserRouter>
  </React.StrictMode>,
);
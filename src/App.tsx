import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PaginaRegistro from './pages/PaginaRegistro';
import DashboardPage from './pages/DashboardPage';
import PaginaTransacoes from './pages/PaginaTransacoes';
import RotaProtegida from './components/RotaProtegida';
import './index.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registro" element={<PaginaRegistro />} />
        
        <Route 
          path="/dashboard" 
          element={<RotaProtegida elemento={<DashboardPage />} />} 
        />
        
        <Route 
          path="/transacoes" 
          element={<RotaProtegida elemento={<PaginaTransacoes />} />} 
        />
        
        <Route 
          path="/relatorios" 
          element={<RotaProtegida elemento={<h1>Página de Relatórios</h1>} />} 
        />
        
        <Route path="*" element={<h1>404 | Não Encontrado</h1>} />
      </Routes>
    </div>
  );
}

export default App;
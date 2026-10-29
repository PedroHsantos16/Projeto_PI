import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from './pages/Home';
import HomeAntigo from './pages/HomeAntigo';
import CadastroEmpresa from './pages/CadastroEmpresa';
import LoginEmpresa from './pages/LoginEmpresa';
import LoginFuncionario from './pages/LoginFuncionario';
import Publicacoes from './pages/Publicacoes';
import MeuSetor from './pages/MeuSetor';
import Salvos from './pages/Salvos';
import DetalhePublicacao from './pages/DetalhePublicacao';
import AdminFunc from './pages/AdminFunc';
import AdminSetor from './pages/AdminSetor';
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LembretesProvider } from './context/LembreteContext';
import RotaPrivada from "./components/RotaPrivada";

function App() {

  return (
    <AuthProvider>
      <LembretesProvider>
        <Routes>
          
          <Route path="/" element={<Navigate to="/Home" replace />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/LoginEmpresa" element={<LoginEmpresa />} />
          <Route path="/LoginFuncionario" element={<LoginFuncionario />} />
          <Route path="/CadastroEmpresa" element={<CadastroEmpresa />} />
          <Route path="/Publicacoes" 
                element={
                <RotaPrivada perm="funcionario">
                  <Publicacoes />
                </RotaPrivada>
              } 
          />
          <Route path="/MeuSetor" element={<RotaPrivada perm="funcionario"><MeuSetor /></RotaPrivada>} />
          <Route path="/Salvos" element={<RotaPrivada perm="funcionario"><Salvos /></RotaPrivada>} />
          <Route
            path="/publicacoes/:id"
            element={
              <RotaPrivada perm="funcionario">
                <DetalhePublicacao />
              </RotaPrivada>
            }
          />
          <Route path="/AdminFunc" element={<RotaPrivada perm="empresa"><AdminFunc /></RotaPrivada>} />
          <Route path="/AdminSetor" element={<RotaPrivada perm="empresa"><AdminSetor /></RotaPrivada>} />
          <Route path="/HomeAntigo" element={<HomeAntigo />} />
        </Routes>
      </LembretesProvider>
    </AuthProvider> 
  );
}

export default App

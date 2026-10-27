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

function App() {

  return (
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/LoginEmpresa" element={<LoginEmpresa />} />
        <Route path="/LoginFuncionario" element={<LoginFuncionario />} />
        <Route path="/CadastroEmpresa" element={<CadastroEmpresa />} />
        <Route path="/Publicacoes" element={<Publicacoes />} />
        <Route path="/MeuSetor" element={<MeuSetor />} />
        <Route path="/Salvos" element={<Salvos />} />
        <Route path="/DetalhePublicacao" element={<DetalhePublicacao />} />
        <Route path="/AdminFunc" element={<AdminFunc />} />
        <Route path="/AdminSetor" element={<AdminSetor />} />
        <Route path="/HomeAntigo" element={<HomeAntigo />} />
      </Routes>
  );
}

export default App

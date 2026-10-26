import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CadastroEmpresa from './pages/CadastroEmpresa'
import LoginEmpresa from './pages/LoginEmpresa'
import LoginFuncionario from './pages/LoginFuncionario'
import Publicacoes from './pages/Publicacoes'
import AdminFunc from './pages/AdminFunc'
import AdminSetor from './pages/AdminSetor'

function App() {

  return (
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/LoginEmpresa" element={<LoginEmpresa />} />
        <Route path="/LoginFuncionario" element={<LoginFuncionario />} />
        <Route path="/CadastroEmpresa" element={<CadastroEmpresa />} />
        <Route path="/Publicacoes" element={<Publicacoes />} />
        <Route path="/AdminFunc" element={<AdminFunc />} />
        <Route path="/AdminSetor" element={<AdminSetor />} />
      </Routes>
  )
}

export default App

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RotaPrivada({ children, perm }) {
  const { usuario, carregando, tipo } = useAuth();

  if (carregando) return <p>Carregando...</p>;
  
  if (usuario && tipo === perm) {
    return children;
  }

  return <Navigate to="/Home" replace />;
}

export default RotaPrivada;
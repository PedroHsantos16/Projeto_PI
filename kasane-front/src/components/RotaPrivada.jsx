import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RotaPrivada({ children }) {
  const { usuario, carregando } = useAuth();

  if (carregando) return <p>Carregando...</p>;
  if (!usuario) return <Navigate to="/Home" replace />;

  return children;
}

export default RotaPrivada;
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../assets/css/tela-carregamento.css';
import '../assets/css/global.css';
import loading from '../assets/loading.gif'

function RotaPrivada({ children, perm }) {
  const { usuario, carregando, tipo } = useAuth();

  if (carregando) {
    return(
      <div id="loading-screen" class="loading-container">
        <div class="loading-content">
         
          <center><div class="loader"></div></center>
          <h2 id="loading-title">Preparando seu ambiente...</h2>
          <p id="loading-text">Estamos organizando os dados para você.</p>
          
        </div>
      </div>
    )
  }
  
  if (usuario && tipo === perm) {
    return children;
  }

  return <Navigate to="/Home" replace />;
}

export default RotaPrivada;
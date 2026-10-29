import { useNavigate } from 'react-router-dom';
import { Network, User, LogOut, ChevronDown } from 'lucide-react';
import '../assets/css/admin.css';
import logo from '../assets/KasaneLogo.svg';
import { useAuth } from "../context/AuthContext";

/*
  Estrutura compartilhada das telas administrativas.
  Uso: <AdminLayout active="setores"> ...conteúdo da página... </AdminLayout>
  "active" aceita: 'setores' | 'funcionarios'
*/
function AdminLayout({ active, children }) {
  const navigate = useNavigate();
  const { usuario, tipo } = useAuth();
  const { logout } = useAuth();

  function formatarDataAtual() {
    const agora = new Date();

    const diaSemana = agora
      .toLocaleDateString('pt-BR', { weekday: 'long' })
      .split('-')[0];                       

    const dia = agora.getDate();
    const mes = agora
      .toLocaleDateString('pt-BR', { month: 'short' })
      .replace('.', '');                    
    const ano = agora.getFullYear();

    const capitalizado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);

    return `${capitalizado}, ${dia} ${mes} ${ano}`;
  }

  function deslogar(){
    logout();
    navigate("/Home");
  }

  return (
    <div className="admin">
      {/* ---------- Sidebar ---------- */}
      <aside className="admin-sidebar">
        <img className="admin-sidebar__logo" src={logo} alt="Kasane" />

        <div className="admin-sidebar__company">
          <p className="admin-sidebar__company-name">{usuario?.razao_social}</p>
          <p className="admin-sidebar__company-tagline">Nossa rede de conexões</p>
        </div>

        <p className="admin-sidebar__label">Administração</p>

        <nav className="admin-nav">
          <button
            type="button"
            className="admin-nav__item"
            aria-current={active === 'setores' ? 'page' : undefined}
            onClick={() => navigate('/AdminSetor')}
          >
            <Network strokeWidth={1.5} aria-hidden="true" />
            Setores
          </button>

          <button
            type="button"
            className="admin-nav__item"
            aria-current={active === 'funcionarios' ? 'page' : undefined}
            onClick={() => navigate('/AdminFunc')}
          >
            <User strokeWidth={1.5} aria-hidden="true" />
            Funcionários
          </button>
        </nav>

        <button type="button" className="admin-sidebar__logout" onClick={() => deslogar()}>
          <LogOut size={20} strokeWidth={1.5} aria-hidden="true" />
          Sair da conta
        </button>
      </aside>

      {/* ---------- Área principal ---------- */}
      <div className="admin-main">
        <header className="admin-topbar">
          <p className="admin-topbar__date">{formatarDataAtual()}</p>

          <button type="button" className="admin-topbar__user">
            <span className="admin-topbar__avatar" aria-hidden="true">X</span>
            <span className="admin-topbar__info">
              <span className="admin-topbar__name">{usuario?.razao_social}</span>
              <span className="admin-topbar__role">Conta administrativa</span>
            </span>
          </button>
        </header>

        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
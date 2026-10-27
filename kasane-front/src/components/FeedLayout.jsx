import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Bookmark, LogOut, ChevronDown, Search } from 'lucide-react';
import '../assets/css/admin.css';
import logo from '../assets/KasaneLogo.svg';

/*
  Estrutura compartilhada das telas do usuário comum (feed, meu setor, salvos).
  Reaproveita as classes do admin.css, pois o visual da sidebar/topbar é o mesmo.
  Uso: <FeedLayout active="geral" busca={busca} onBuscaChange={setBusca}> ... </FeedLayout>
  "active" aceita: 'geral' | 'meu-setor' | 'salvos'
*/
function FeedLayout({ active, busca = '', onBuscaChange, children }) {
  const navigate = useNavigate();

  return (
    <div className="admin">
      {/* ---------- Sidebar ---------- */}
      <aside className="admin-sidebar">
        <img className="admin-sidebar__logo" src={logo} alt="Kasane" />

        <div className="admin-sidebar__company">
          <p className="admin-sidebar__company-name">Empresa X</p>
          <p className="admin-sidebar__company-tagline">Nossa rede de conexões</p>
        </div>

        <nav className="admin-nav admin-nav--first">
          <button
            type="button"
            className="admin-nav__item"
            aria-current={active === 'geral' ? 'page' : undefined}
            onClick={() => navigate('/Publicacoes')}
          >
            <LayoutDashboard strokeWidth={1.5} aria-hidden="true" />
            Geral
          </button>

          <button
            type="button"
            className="admin-nav__item"
            aria-current={active === 'meu-setor' ? 'page' : undefined}
            onClick={() => navigate('/MeuSetor')}
          >
            <Briefcase strokeWidth={1.5} aria-hidden="true" />
            Meu setor
          </button>

          <button
            type="button"
            className="admin-nav__item"
            aria-current={active === 'salvos' ? 'page' : undefined}
            onClick={() => navigate('/Salvos')}
          >
            <Bookmark strokeWidth={1.5} aria-hidden="true" />
            Salvos
          </button>
        </nav>

        <button type="button" className="admin-sidebar__logout" onClick={() => navigate('/Home')}>
          <LogOut size={20} strokeWidth={1.5} aria-hidden="true" />
          Sair da conta
        </button>
      </aside>

      {/* ---------- Área principal ---------- */}
      <div className="admin-main">
        <header className="admin-topbar">
          <p className="admin-topbar__date">Quarta, 21 out 2026</p>

          <div className="topbar-search">
            <Search className="topbar-search__icon" strokeWidth={1.5} aria-hidden="true" />
            <input
              className="topbar-search__input"
              type="search"
              placeholder="Buscar publicações..."
              aria-label="Buscar publicações"
              value={busca}
              onChange={(event) => onBuscaChange?.(event.target.value)}
            />
          </div>

          <button type="button" className="admin-topbar__user">
            <span className="admin-topbar__avatar" aria-hidden="true">ML</span>
            <span className="admin-topbar__info">
              <span className="admin-topbar__name">Marina Lima</span>
              <span className="admin-topbar__role">Recursos Humanos</span>
            </span>
            <ChevronDown size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </header>

        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}

export default FeedLayout;
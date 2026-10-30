import { useNavigate } from 'react-router-dom';
import '../assets/css/Home.css';
import KasaneLogo from '../assets/KasaneLogo.svg';
import { UsersRound, BuildingComplex, ArrowRight } from "lucide-react"
import BoxNotificacao from '../components/BoxNotificacao';

function Home() {
  const navigate = useNavigate();

  return (
    
    <main className="welcome">
      {/* Painel vermelho lateral */}
      <aside className="welcome__brand">
        <img className="welcome__logo" src={KasaneLogo} alt="Kasane" />

        <div className="welcome__brand-text">
          <h2 className="welcome__brand-title">
            Boas conversas.
            <br />
            Grandes conexões.
          </h2>
          <p className="welcome__brand-description">
            Um lugar para organizar pessoas, compartilhar avisos e fazer o
            trabalho acontecer. Juntos.
          </p>
          <hr className="welcome__brand-divider" />
          <p className="welcome__brand-tagline">Sua empresa, mais conectada.</p>
        </div>
      </aside>

      {/* Área de conteúdo */}
      <section className="welcome__content">
        <p className="eyebrow eyebrow--dark welcome__topbar">Bem-vindo ao Kasane</p>
        
        <div className="welcome__main">
          <div className="welcome__inner">
            <p className="eyebrow">Um espaço para a sua equipe</p>
            <h1 className="welcome__title">
              Sua próxima conexão
              <br />
              começa aqui.
            </h1>
            <p className="welcome__description">
              Novidades da empresa, mensagens do seu setor e lembretes
              importantes. Tudo junto, para sua conveniência.
            </p>

            <div className="welcome__cards">
              {/* Card: funcionário */}
              <article className="access-card">
                <div className="access-card__icon">
                  <UsersRound aria-hidden="true"/>
                </div>
                <p className="access-card__text">
                  Entre na sua comunidade e acompanhe o que acontece na empresa.
                </p>
                <h2 className="access-card__title">Sou funcionário</h2>
                <div className="access-card__actions">
                  <button
                    type="button"
                    className="btn btn--primary btn--block"
                    onClick={() => navigate('/LoginFuncionario')}
                  >
                    <ArrowRight size={16} aria-hidden="true"/>
                    Entrar
                  </button>
                </div>
              </article>

              {/* Card: empresa */}
              <article className="access-card">
                <div className="access-card__icon">
                  <BuildingComplex aria-hidden="true"/>
                </div>
                <p className="access-card__text">
                  Conecte sua equipe e organize a comunicação da sua empresa.
                </p>
                <h2 className="access-card__title">Sou empresa</h2>
                <div className="access-card__actions">
                  <button
                    type="button"
                    className="btn btn--primary btn--block"
                    onClick={() => navigate('/LoginEmpresa')}
                  >
                    <ArrowRight size={16} aria-hidden="true"/>
                    Entrar
                  </button>
                  <button
                    type="button"
                    className="btn btn--outline btn--block"
                    onClick={() => navigate('/CadastroEmpresa')}
                  >
                    Cadastrar
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
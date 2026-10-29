import { X, Building2, Mail, Phone, CalendarDays } from 'lucide-react';
import '../assets/css/feed.css';

/*
  Modal "Perfil do funcionário".
  Props:
    perfil  -> { iniciais, nome, cargo, setor, empresa, email, ramal, desde }
    onClose -> função chamada ao fechar (X, "Fechar perfil" ou clique no fundo)
*/
function PerfilFuncionarioModal({ perfil, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal modal--sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-perfil-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal__head">
          <h2 className="profile__heading" id="modal-perfil-title">Perfil do funcionário</h2>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Fechar">
            <X strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        {/* Identificação */}
        <div className="profile__hero">
          <span className="profile__avatar" aria-hidden="true">{perfil.nome?.charAt(0)}</span>
          <h3 className="profile__name">{perfil.nome}</h3>
          <p className="profile__role">{perfil.setors?.cargo}</p>
          <span className="badge">{perfil.setors?.nome}</span>
        </div>

        {/* Informações */}
        <div className="profile__info">
          <div className="profile__item">
            <Building2 strokeWidth={1.5} aria-hidden="true" />
            <div>
              <p className="profile__label">Empresa</p>
              <p className="profile__value">{perfil.empresas?.razao_social}</p>
            </div>
          </div>

          <div className="profile__item">
            <Mail strokeWidth={1.5} aria-hidden="true" />
            <div>
              <p className="profile__label">E-mail corporativo</p>
              <p className="profile__value">{perfil.email}</p>
            </div>
          </div>

          <div className="profile__row">
            <div className="profile__item">
              <Phone strokeWidth={1.5} aria-hidden="true" />
              <div>
                <p className="profile__label">Ramal</p>
                <p className="profile__value">{perfil.ramal}</p>
              </div>
            </div>

          </div>
        </div>

        <div className="profile__actions">
          <button type="button" className="btn btn--outline" onClick={onClose}>
            Fechar perfil
          </button>
        </div>
      </div>
    </div>
  );
}

export default PerfilFuncionarioModal;
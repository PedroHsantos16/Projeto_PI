import { useState } from 'react';
import { X, ChevronDown, Send } from 'lucide-react';
import '../assets/css/feed.css';

const estadoInicial = {
  titulo: '',
  mensagem: '',
  area_publicacao: 'todos',
};

/*
  Modal "Criar publicação".
  Props:
    onClose  -> função chamada ao cancelar, fechar (X) ou clicar no fundo
    onSubmit (opcional) -> função chamada com o objeto "form" ao publicar
*/
function CriarPublicacaoModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(estadoInicial);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: enviar "form" para a API
    console.log(form);
    onSubmit?.(form);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation evita fechar ao clicar dentro do modal */}
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-publicacao-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal__head">
          <h2 className="modal__title" id="modal-publicacao-title">Criar publicação</h2>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Fechar">
            <X strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        {/* Autor */}
        <div className="modal-author">
          <span className="modal-author__avatar" aria-hidden="true">ML</span>
          <div>
            <p className="modal-author__name">Marina Lima</p>
            <p className="modal-author__role">Recursos Humanos · Aurora Tecnologia</p>
          </div>
        </div>

        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-field__label" htmlFor="titulo">Título *</label>
            <input
              className="input"
              id="titulo"
              name="titulo"
              type="text"
              placeholder="Escreva um título..."
              value={form.titulo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label className="form-field__label" htmlFor="mensagem">Mensagem *</label>
            <textarea
              className="input textarea"
              id="mensagem"
              name="mensagem"
              placeholder="Digite sua mensagem..."
              value={form.mensagem}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label className="form-field__label" htmlFor="area_publicacao">Área de publicação *</label>
            <div className="input-wrapper">
              <select
                className="input input--icon select"
                id="area_publicacao"
                name="area_publicacao"
                value={form.area_publicacao}
                onChange={handleChange}
                required
              >
                <option value="todos">Todos os setores</option>
                {/* TODO: listar os setores vindos da API */}
                <option value="rh">Recursos Humanos</option>
                <option value="tecnologia">Tecnologia</option>
                <option value="comunicacao">Comunicação</option>
              </select>
              <span className="input-wrapper__icon">
                <ChevronDown strokeWidth={1.5} aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className="modal__actions">
            <button type="button" className="btn btn--outline" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary">
              <Send size={18} strokeWidth={1.5} aria-hidden="true" />
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CriarPublicacaoModal;
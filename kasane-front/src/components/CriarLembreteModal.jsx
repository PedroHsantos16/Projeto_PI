import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

const estadoInicial = {
  titulo: '',
  descricao: '',
  data_hora: '',
};

/*
  Modal "Criar lembrete".
  Props:
    onClose  -> função chamada ao cancelar, fechar (X) ou clicar no fundo
    onSubmit (opcional) -> função chamada com o objeto "form" ao confirmar
*/
function CriarLembreteModal({ onClose, onSubmit }) {
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
        aria-labelledby="modal-lembrete-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal__head">
          <h2 className="modal__title" id="modal-lembrete-title">Criar lembrete</h2>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Fechar">
            <X strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-field__label" htmlFor="titulo">Título</label>
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
            <label className="form-field__label" htmlFor="descricao">Descrição</label>
            <textarea
              className="input textarea"
              id="descricao"
              name="descricao"
              placeholder="Digite sua mensagem..."
              value={form.descricao}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label className="form-field__label" htmlFor="data_hora">Data/hora</label>
            <div className="input-wrapper">
              <input
                className="input input--icon input--datetime"
                id="data_hora"
                name="data_hora"
                type="datetime-local"
                value={form.data_hora}
                onChange={handleChange}
                required
              />
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
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CriarLembreteModal;
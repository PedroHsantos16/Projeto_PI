import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import api from '../api/client';
import BoxNotificacao from '../components/BoxNotificacao';

const estadoInicial = {
  titulo: '',
  descricao: '',
  horario: '',
};

/*
  Modal "Criar lembrete".
  Props:
    onClose   -> função chamada ao cancelar, fechar (X) ou clicar no fundo
    onCriado  (opcional) -> função chamada com o lembrete criado pela API
*/
function CriarLembreteModal({ onClose, onCriado }) {
  const [form, setForm] = useState(estadoInicial);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);
  const [boxNotificacao, setBoxNotificacao] = useState(false);
  const [notificacao, setNotificacao] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setEnviando(true);
    try {
      const { data } = await api.post('/lembretes', {
        titulo: form.titulo,
        descricao: form.descricao,
        horario: form.horario,
      });
      onCriado?.(data);
      setNotificacao("Lembrete criado com sucesso!");
      setBoxNotificacao(true);
    } 
    catch (err) {
      console.error(err.response?.status, err.response?.data);
      setErro("Não foi possível criar o lembrete.");
      setBoxNotificacao(true);
      setEnviando(false);
    } 
    finally {
      setEnviando(false);
    }
    
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      {erro && boxNotificacao && <BoxNotificacao mensagem={erro} subtexto="Tente novamente." cor={1} onClose={() => setBoxNotificacao(false)}/>}
      {notificacao && boxNotificacao && <BoxNotificacao mensagem={notificacao} subtexto="O lembrete já está disponível para visualização!" cor={2} onClose={() => setBoxNotificacao(false)}/>}

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
            <label className="form-field__label" htmlFor="horario">Data/hora</label>
            <div className="input-wrapper">
              <input
                className="input input--icon input--datetime"
                id="horario"
                name="horario"
                type="datetime-local"
                value={form.horario}
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
            <button type="submit" className="btn btn--primary" disabled={enviando}>
              {enviando ? 'Salvando...' : 'Confirmar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CriarLembreteModal;
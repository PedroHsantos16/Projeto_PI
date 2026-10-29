import { useState } from 'react';
import { X, Clock, Circle, CheckCircle2, Plus } from 'lucide-react';
import { useLembretes } from '../context/LembreteContext';
import '../assets/css/lembretes.css';
import CriarLembreteModal from './CriarLembreteModal';

function formatarPrazo(horario) {
  const data = new Date(horario);
  const hora = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const dia = data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  return `${dia}, às ${hora}`;
}

/*
  Painel lateral "Lembretes".
  Os dados vêm do LembretesContext (compartilhado com o Radar).
  Props:
    onClose -> função chamada ao fechar (X ou clique no fundo escurecido)
*/
function LembretesDrawer({ onClose }) {
  const [modalAberto, setModalAberto] = useState(false);
  const { lembretes, carregando, erro, adicionar, concluir } = useLembretes();

  const pendentes = lembretes.length;

  function renderCard(item) {
    const atrasado = new Date(item.horario) < new Date();
    const classes = ['reminder', atrasado ? 'reminder--highlight' : ''].join(' ');

    return (
      <li className={classes} key={item.lembrete_id}>
        <h3 className="reminder__title">{item.titulo}</h3>
        <p className="reminder__text">{item.descricao}</p>

        <p className="reminder__time">
          <Clock strokeWidth={2} aria-hidden="true" />
          {formatarPrazo(item.horario)}
        </p>

        <button
          type="button"
          className="reminder__action"
          onClick={() => concluir(item.lembrete_id)}
        >
          <Circle strokeWidth={2} aria-hidden="true" />
          Marcar como concluído
        </button>
      </li>
    );
  }

  return (
    <>
      {/* Fundo escurecido (cobre só a área de conteúdo, não a sidebar nem a topbar) */}
      <div className="drawer-overlay" onClick={onClose} aria-hidden="true" />

      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <div className="drawer__head">
          <h2 className="drawer__title" id="drawer-title">Lembretes</h2>
          <button type="button" className="drawer__close" onClick={onClose} aria-label="Fechar lembretes">
            <X strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <p className="drawer__subtitle">
          {lembretes.length} {lembretes.length === 1 ? 'lembrete pendente' : 'lembretes pendentes'}
        </p>

        <div className="drawer__body">
          {carregando && <p>Carregando...</p>}
          {erro && <p>{erro}</p>}

          {!carregando && !erro && lembretes.length === 0 && (
            <p>Você ainda não tem lembretes.</p>
          )}

          {!carregando && !erro && lembretes.length > 0 && (
            <ul className="drawer__list">{lembretes.map(renderCard)}</ul>
          )}
        </div>

        <div className="drawer__footer">
          <button type="button" className="btn btn--primary" onClick={() => setModalAberto(true)}>
            <Plus size={18} aria-hidden="true" />
            Criar Lembrete
          </button>
        </div>
      </aside>

      {modalAberto && (
        <CriarLembreteModal
          onClose={() => setModalAberto(false)}
          onCriado={adicionar}
        />
      )}
    </>
  );
}

export default LembretesDrawer;
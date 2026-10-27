import { useState } from 'react';
import { X, Clock, Circle, CheckCircle2, Plus } from 'lucide-react';
import '../assets/css/lembretes.css';
import CriarLembreteModal from './CriarLembreteModal';

/* Dados de exemplo: substitua pelos dados da API */
const lembretesIniciais = [
  {
    id: 1,
    grupo: 'hoje',
    destaque: true,
    titulo: 'Atualize seus dados cadastrais',
    descricao: 'Confira telefone e contato de emergência no portal de pessoas.',
    prazo: 'Hoje, até 18h',
    concluido: false,
  },
  {
    id: 2,
    grupo: 'hoje',
    destaque: false,
    titulo: 'Alinhamento de benefícios',
    descricao: 'Reunião do time de RH. Sala Ipê, 2º andar.',
    prazo: 'Hoje, às 16h',
    concluido: false,
  },
  {
    id: 3,
    grupo: 'proximos',
    destaque: false,
    titulo: 'Responda à pesquisa de clima',
    descricao: 'Sua voz transforma a Aurora. A participação é anônima.',
    prazo: '23/10, até 18h',
    concluido: false,
  },
  {
    id: 4,
    grupo: 'proximos',
    destaque: false,
    titulo: 'Café entre setores',
    descricao: 'Espaço de convivência. Traga sua caneca.',
    prazo: '23/10, às 15h',
    concluido: false,
  },
];

/*
  Painel lateral "Lembretes".
  Props:
    onClose        -> função chamada ao fechar (X ou clique no fundo escurecido)
    onCriar (opcional) -> função chamada ao clicar em "Criar Lembrete"
*/
function LembretesDrawer({ onClose, onCriar }) {
  const [lembretes, setLembretes] = useState(lembretesIniciais);
  const [modalAberto, setModalAberto] = useState(false);

  function toggleConcluido(id) {
    setLembretes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, concluido: !item.concluido } : item))
    );
  }

  const hoje = lembretes.filter((item) => item.grupo === 'hoje');
  const proximos = lembretes.filter((item) => item.grupo === 'proximos');
  const pendentesHoje = hoje.filter((item) => !item.concluido).length;

  function renderCard(item) {
    const classes = [
      'reminder',
      item.destaque ? 'reminder--highlight' : '',
      item.concluido ? 'reminder--done' : '',
    ].join(' ');

    return (
      <li className={classes} key={item.id}>
        <h3 className="reminder__title">{item.titulo}</h3>
        <p className="reminder__text">{item.descricao}</p>

        <p className="reminder__time">
          <Clock strokeWidth={2} aria-hidden="true" />
          {item.prazo}
        </p>

        <button
          type="button"
          className="reminder__action"
          onClick={() => toggleConcluido(item.id)}
          aria-pressed={item.concluido}
        >
          {item.concluido ? (
            <CheckCircle2 strokeWidth={2} aria-hidden="true" />
          ) : (
            <Circle strokeWidth={2} aria-hidden="true" />
          )}
          {item.concluido ? 'Concluído' : 'Marcar como concluído'}
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
          {lembretes.length} lembretes para manter tudo em dia.
        </p>

        <div className="drawer__body">
          <section>
            <div className="drawer__group-head">
              <p className="eyebrow">Hoje · 21 out</p>
              <span className="drawer__count">{pendentesHoje} pendentes</span>
            </div>
            <ul className="drawer__list">{hoje.map(renderCard)}</ul>
          </section>

          <section>
            <div className="drawer__group-head">
              <p className="eyebrow">Próximos</p>
              <span className="drawer__count">{proximos.length} lembretes</span>
            </div>
            <ul className="drawer__list">{proximos.map(renderCard)}</ul>
          </section>
        </div>

        <div className="drawer__footer">
            <button type="button" className="btn btn--primary" onClick={() => setModalAberto(true)}>
                <Plus size={18} aria-hidden="true" />
                Criar Lembrete
            </button>
        </div>
      </aside>

      {modalAberto && <CriarLembreteModal onClose={() => setModalAberto(false)} />}
    </>
  );
}

export default LembretesDrawer;
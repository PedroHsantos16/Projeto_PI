import { useState } from 'react';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { useLembretes } from '../context/LembreteContext';
import LembretesDrawer from './LembretesDrawer';
import '../assets/css/feed.css';

const MAX_ITENS = 3;

function formatarData(horario) {
  const data = new Date(horario);
  const dia = data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '');
  const hora = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return `${dia}, ${hora}`;
}

function Radar() {
  const [aberto, setAberto] = useState(false);
  const { lembretes, carregando, erro } = useLembretes();

  const proximos = lembretes.slice(0, MAX_ITENS);

  return (
    <>
      <aside className="radar">
        <div className="radar__head">
          <h2 className="radar__title">No radar</h2>
          <CalendarDays strokeWidth={1.5} aria-hidden="true" />
        </div>

        {carregando && <p className="radar__sub">Carregando...</p>}
        {erro && <p className="radar__sub">{erro}</p>}
        {!carregando && !erro && proximos.length === 0 && (
          <p className="radar__sub">Nenhum lembrete pendente.</p>
        )}

        <ul className="radar__list">
          {proximos.map((item) => (
            <li key={item.lembrete_id}>
              <p className="radar__date">{formatarData(item.horario)}</p>
              <p className="radar__name">{item.titulo}</p>
              <p className="radar__sub">{item.descricao}</p>
            </li>
          ))}
        </ul>

        <button type="button" className="radar__link" onClick={() => setAberto(true)}>
          Ver lembretes
          <ArrowRight strokeWidth={2} aria-hidden="true" />
        </button>
      </aside>

      {aberto && <LembretesDrawer onClose={() => setAberto(false)} />}
    </>
  );
}

export default Radar;
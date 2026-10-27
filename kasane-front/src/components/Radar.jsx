import { useState } from 'react';
import { CalendarDays, ArrowRight } from 'lucide-react';
import LembretesDrawer from './LembretesDrawer';
import '../assets/css/feed.css';

/* Dados de exemplo: substitua pelos dados da API */
const lembretesExemplo = [
  { id: 1, data: '21 out', titulo: 'Atualizar seus dados', detalhe: 'Hoje, até 18h' },
  { id: 2, data: '23 out', titulo: 'Pesquisa de clima', detalhe: 'Sexta, até 18h' },
  { id: 3, data: '23 out', titulo: 'Café entre setores', detalhe: 'Sexta, às 15h' },
];

/*
  Bloco "No radar" com os próximos lembretes.
  O botão "Ver lembretes" abre o painel lateral (LembretesDrawer).
  Props:
    lembretes (opcional) -> [{ id, data, titulo, detalhe }]
*/
function Radar({ lembretes = lembretesExemplo }) {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <aside className="radar">
        <div className="radar__head">
          <h2 className="radar__title">No radar</h2>
          <CalendarDays strokeWidth={1.5} aria-hidden="true" />
        </div>

        <ul className="radar__list">
          {lembretes.map((item) => (
            <li key={item.id}>
              <p className="radar__date">{item.data}</p>
              <p className="radar__name">{item.titulo}</p>
              <p className="radar__sub">{item.detalhe}</p>
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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import FeedLayout from '../components/FeedLayout';
import Post from '../components/Post';
import '../assets/css/feed.css';

/* Dados de exemplo: substitua pelos dados da API (ex.: useParams para buscar pelo id) */
const postInicial = {
  id: 1,
  iniciais: 'CS',
  autor: 'Camila Souza',
  cargo: 'Coordenadora de RH · Recursos Humanos',
  data: 'Hoje, 09:15',
  titulo: 'Sua voz transforma a Aurora',
  texto: [
    'Nossa pesquisa de clima está aberta! Reserve 5 minutos para contar como tem sido sua experiência. As respostas são anônimas e nos ajudam a construir um lugar melhor para todos.',
    'Você pode responder pelo formulário anexado até sexta-feira, 23/10, às 18h. Os resultados serão compartilhados com a equipe em novembro. Obrigada por construir essa conversa com a gente!',
  ],
  comentarios: 2,
  salvo: true,
};

const comentariosIniciais = [
  {
    id: 1,
    iniciais: 'ML',
    autor: 'Marina Lima',
    cargo: 'Analista de RH · Recursos Humanos',
    data: 'Hoje, 09:32',
    texto: 'Já respondi! Muito bom ter esse espaço para compartilhar o que podemos melhorar juntos.',
  },
  {
    id: 2,
    iniciais: 'RM',
    autor: 'Rafael Mendes',
    cargo: 'Analista de infraestrutura · Tecnologia',
    data: 'Hoje, 10:05',
    texto: 'Obrigado pelo lembrete, Camila. Vou compartilhar com o pessoal do time de TI.',
  },
];

function DetalhePublicacao() {
  const navigate = useNavigate();

  const [busca, setBusca] = useState('');
  const [post, setPost] = useState(postInicial);
  const [comentarios, setComentarios] = useState(comentariosIniciais);

  const [form, setForm] = useState({
    comentario: '',
  });

  function toggleSalvo() {
    setPost((prev) => ({ ...prev, salvo: !prev.salvo }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: enviar "form" para a API
    console.log(form);
  }

  return (
    <FeedLayout active="geral" busca={busca} onBuscaChange={setBusca}>
      {/* Trilha de navegação */}
      <nav className="breadcrumb" aria-label="Trilha de navegação">
        <button type="button" className="link-back" onClick={() => navigate('/Publicacoes')}>
          <ArrowLeft aria-hidden="true" />
          Voltar ao feed
        </button>
        <span className="breadcrumb__sep" aria-hidden="true">/</span>
        <span>Geral</span>
        <span className="breadcrumb__sep" aria-hidden="true">/</span>
        <span aria-current="page">Publicação</span>
      </nav>

      <div className="detail__grid">
        <div className="detail__main">
          {/* Publicação */}
          <Post post={post} onSalvar={toggleSalvo} detalhe />

          {/* Comentários */}
          <section className="comments">
            <h2 className="comments__title">Comentários ({comentarios.length})</h2>

            <ul className="comments__list">
              {comentarios.map((comentario) => (
                <li className="comment" key={comentario.id}>
                  <span className="comment__avatar" aria-hidden="true">{comentario.iniciais}</span>
                  <div>
                    <p className="comment__name">{comentario.autor}</p>
                    <p className="comment__role">{comentario.cargo}</p>
                  </div>
                  <time className="comment__date">{comentario.data}</time>
                  <p className="comment__text">{comentario.texto}</p>
                </li>
              ))}
            </ul>

            <form className="comment-form" onSubmit={handleSubmit}>
              <label className="form-field__label" htmlFor="comentario">Seu comentário</label>
              <div className="comment-form__row">
                <input
                  className="input"
                  id="comentario"
                  name="comentario"
                  type="text"
                  placeholder="Participe da conversa com respeito e gentileza..."
                  value={form.comentario}
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="btn btn--primary">
                  <Send size={18} strokeWidth={1.5} aria-hidden="true" />
                  Comentar
                </button>
              </div>
              <p className="comment-form__note">
                Comentando como Marina Lima · Recursos Humanos
              </p>
            </form>
          </section>
        </div>

        {/* Sobre esta publicação */}
        <aside className="about">
          <h2 className="about__title">Sobre esta publicação</h2>

          <p className="about__label">Publicado por</p>
          <span className="badge">Recursos Humanos</span>

          <p className="about__label">Público</p>
          <p className="about__value">Geral</p>
        </aside>
      </div>
    </FeedLayout>
  );
}

export default DetalhePublicacao;
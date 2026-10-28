import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import FeedLayout from '../components/FeedLayout';
import Post from '../components/Post';
import '../assets/css/feed.css';

function DetalhePublicacao() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { usuario } = useAuth();

   const {
    origem = '/publicacoes',
    active = 'geral',
    rotulo = 'Geral',
  } = location.state ?? {};

  const [busca, setBusca] = useState('');
  const [post, setPost] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [form, setForm] = useState({ comentario: '' });
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    api
      .get(`/publicacaos/${id}`)
      .then((res) => setPost(res.data))
      .catch(() => setErro('Não foi possível carregar a publicação.'))
      .finally(() => setCarregando(false));
  }, [id]);

  const comentarios = post?.comentarios ?? [];

  async function toggleSalvo(id) {
    const post = posts.find((p) => p.publicacao_id === id);
    const salvar = !post.salvo;

    // atualiza a tela na hora
    setPosts((prev) =>
      prev.map((p) => (p.publicacao_id === id ? { ...p, salvo: salvar } : p))
    );

    try {
      if (salvar) await api.post(`/publicacaos/${id}/salvar`);
      else await api.delete(`/publicacaos/${id}/salvar`);
    } catch {
      // desfaz se der erro
      setPosts((prev) =>
        prev.map((p) => (p.publicacao_id === id ? { ...p, salvo: !salvar } : p))
      );
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setEnviando(true);
    try {
      const { data: novo } = await api.post(`/publicacaos/${id}/comentarios`, {
        texto: form.comentario,
      });
      setPost((prev) => ({
        ...prev,
        comentarios: [...prev.comentarios, novo],
        total_comentarios: (prev.total_comentarios ?? 0) + 1,
      }));
      setForm({ comentario: '' });
    } catch (err){
      console.error(err.response?.status, err.response?.data);
      alert('Não foi possível enviar o comentário.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <FeedLayout active={active} busca={busca} onBuscaChange={setBusca}>
       <nav className="breadcrumb" aria-label="Trilha de navegação">
        <button type="button" className="link-back" onClick={() => navigate(origem)}>
          <ArrowLeft aria-hidden="true" />
          Voltar ao feed
        </button>
        <span className="breadcrumb__sep" aria-hidden="true">/</span>
        <span>{rotulo}</span>
        <span className="breadcrumb__sep" aria-hidden="true">/</span>
        <span aria-current="page">Publicação</span>
      </nav>

      {carregando && <p>Carregando...</p>}
      {erro && <p>{erro}</p>}

      {post && (
        <div className="detail__grid">
          <div className="detail__main">
            <Post post={post} onSalvar={toggleSalvo} detalhe />

            <section className="comments">
              <h2 className="comments__title">Comentários ({comentarios.length})</h2>

              <ul className="comments__list">
                {comentarios.map((c) => (
                  <li className="comment" key={c.comentario_id}>
                    <span className="comment__avatar" aria-hidden="true">
                      {c.autor?.charAt(0)}
                    </span>
                    <div>
                      <p className="comment__name">{c.autor}</p>
                      <p className="comment__role">{c.autor_cargo}</p>
                    </div>
                    <time className="comment__date">
                      {new Date(c.created_at).toLocaleDateString('pt-BR')}
                    </time>
                    <p className="comment__text">{c.texto}</p>
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
                  <button type="submit" className="btn btn--primary" disabled={enviando}>
                    <Send size={18} strokeWidth={1.5} aria-hidden="true" />
                    Comentar
                  </button>
                </div>
                <p className="comment-form__note">
                  Comentando como {usuario?.nome} · {usuario?.setors?.nome}
                </p>
              </form>
            </section>
          </div>

          <aside className="about">
            <h2 className="about__title">Sobre esta publicação</h2>

            <p className="about__label">Publicado por</p>
            <span className="badge">{post.autor_setor}</span>
          </aside>
        </div>
      )}
    </FeedLayout>
  );
}

export default DetalhePublicacao;
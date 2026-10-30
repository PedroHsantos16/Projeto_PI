import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, BookmarkCheck } from 'lucide-react';
import api from '../api/client';
import FeedLayout from '../components/FeedLayout';
import Post from '../components/Post';
import Radar from '../components/Radar';
import CriarPublicacaoModal from '../components/CriarPublicacaoModal';
import PerfilFuncionarioModal from '../components/PerfilFuncionarioModal';
import '../assets/css/feed.css';
import BoxNotificacao from '../components/BoxNotificacao';

function Salvos() {
  const navigate = useNavigate();

  const [busca, setBusca] = useState('');
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [boxNotificacao, setBoxNotificacao] = useState(false);
  const [notificacao, setNotificacao] = useState(null);
  const [texto, setTexto] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [perfil, setPerfil] = useState(null);

  function carregarPosts(termo = busca) {
    return api
      .get('/salvos', { params: { busca: termo } })
      .then((res) => {
        setPosts(res.data);
        setErro(null);
      })
      .catch(() => {
        setErro('Não foi possível carregar as publicações.')
        setTexto("Houve um erro na busca.");
        setBoxNotificacao(true);        
      })
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    const timer = setTimeout(() => carregarPosts(busca), 400);
    return () => clearTimeout(timer);
  }, [busca]);

  async function abrirPerfil(post) {
    try
    {
      await api.get(`/funcionarios/${post.funcionario_id}`)
               .then((res) => setPerfil(res.data))
    }
    catch(err)
    {
      setErro("Não foi possivel abrir o perfil");
      setTexto("Houve um erro na busca.");
      setBoxNotificacao(true);
    }
  }

  // Remove da lista na hora e avisa a API; se falhar, recarrega
  async function removerDosSalvos(id) {
    setPosts((prev) => prev.filter((p) => p.publicacao_id !== id));
    try {
      await api.delete(`/publicacaos/${id}/salvar`);
      setBoxNotificacao(true); 
      setNotificacao("Salvo retirado com sucesso!");
      setTexto("Se necessitar salve novamente.");
    } catch {
      setErro('Não foi possível remover dos salvos.');
      setTexto("Houve um erro na retirada do salvamento");
      setBoxNotificacao(true)
      carregarPosts();
    }
  }

  function abrirDetalhe(id) {
    navigate(`/publicacoes/${id}`, {
      state: { origem: '/Salvos', active: 'salvos', rotulo: 'Salvos' },
    });
  }

  return (
    <FeedLayout active="salvos" busca={busca} onBuscaChange={setBusca}>
      <div className="page-header page-header--center">
        <div>
          <h1 className="page-header__title">Publicações salvas</h1>
          <p className="page-header__subtitle">
            Sua seleção de conteúdos para revisitar quando precisar.
          </p>
        </div>

        <button type="button" className="btn btn--primary" onClick={() => setModalAberto(true)}>
          <Plus size={18} aria-hidden="true" />
          Fazer post
        </button>
      </div>

      <div className="saved-summary">
        <span className="saved-summary__count">
          <BookmarkCheck strokeWidth={1.5} aria-hidden="true" />
          {posts.length} {posts.length === 1 ? 'publicação salva' : 'publicações salvas'}
        </span>
        <span className="saved-summary__note">Visíveis somente para você</span>
      </div>

      <div className="feed__grid">
        <div className="feed__list">
          {carregando && <p>Carregando...</p>}
          {erro && boxNotificacao && <BoxNotificacao mensagem={erro} subtexto={texto} cor={1} onClose={() => setBoxNotificacao(false)}/>}
          {notificacao && boxNotificacao && <BoxNotificacao mensagem={notificacao} subtexto={texto} cor={2} onClose={() => setBoxNotificacao(false)}/>}

          {!carregando && !erro && posts.length === 0 && (
            <p className="feed__end">
              {busca ? `Nenhum resultado para "${busca}".` : 'Você ainda não salvou nenhuma publicação.'}
            </p>
          )}

          {posts.map((post) => (
            <Post
              key={post.publicacao_id}
              post={post}
              onSalvar={removerDosSalvos}
              removivel
              onComentarios={abrirDetalhe}
              onAutorClick={abrirPerfil}
            />
          ))}

          {!carregando && posts.length > 0 && (
            <p className="feed__end">Você viu todos seus posts salvos.</p>
          )}
        </div>

        <Radar />
      </div>

      {modalAberto && (
        <CriarPublicacaoModal
          onClose={() => {
            setModalAberto(false);
            carregarPosts();
          }}
        />
      )}
      {perfil && <PerfilFuncionarioModal perfil={perfil} onClose={() => setPerfil(null)} />}
    </FeedLayout>
  );
}

export default Salvos;
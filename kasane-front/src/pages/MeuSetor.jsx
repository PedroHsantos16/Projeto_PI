import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import api from '../api/client';
import FeedLayout from '../components/FeedLayout';
import Post from '../components/Post';
import Radar from '../components/Radar';
import CriarPublicacaoModal from '../components/CriarPublicacaoModal';
import PerfilFuncionarioModal from '../components/PerfilFuncionarioModal';
import '../assets/css/feed.css';

const SETOR = 'meu-setor';

function MeuSetor() {
  const navigate = useNavigate();

  const [busca, setBusca] = useState('');
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [perfil, setPerfil] = useState(null);

  function carregarPosts(termo = busca) {
    return api
      .get('/publicacaos', { params: { setor: SETOR, busca: termo } })
      .then((res) => {
        setPosts(res.data);
        setErro(null);
      })
      .catch(() => setErro('Não foi possível carregar as publicações.'))
      .finally(() => setCarregando(false));
  }

  // Busca com debounce: espera o usuário parar de digitar
  useEffect(() => {
    const timer = setTimeout(() => carregarPosts(busca), 400);
    return () => clearTimeout(timer);
  }, [busca]);

  function abrirPerfil(post) {
    // TODO: buscar o perfil real do autor na API
    setPerfil({
      iniciais: post.autor?.charAt(0),
      nome: post.autor,
      cargo: post.autor_cargo,
      setor: post.autor_setor,
      empresa: '',
      email: '',
      ramal: '',
      desde: '',
    });
  }

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

  return (
    <FeedLayout active="meu-setor" busca={busca} onBuscaChange={setBusca}>
      <div className="page-header page-header--center">
        <div>
          <h1 className="page-header__title">Meu setor</h1>
        </div>

        <button type="button" className="btn btn--primary" onClick={() => setModalAberto(true)}>
          <Plus size={18} aria-hidden="true" />
          Fazer post
        </button>
      </div>

      <div className="feed__grid">
        <div className="feed__list">
          {carregando && <p>Carregando...</p>}
          {erro && <p>{erro}</p>}

          {!carregando && !erro && posts.length === 0 && (
            <p className="feed__end">
              {busca ? `Nenhum resultado para "${busca}".` : 'Seu setor ainda não tem publicações.'}
            </p>
          )}

          {posts.map((post) => (
            <Post
              key={post.publicacao_id}
              post={post}
              onSalvar={toggleSalvo}
              onComentarios={(id) =>
                navigate(`/publicacoes/${id}`, {
                  state: { origem: '/MeuSetor', active: 'meu-setor', rotulo: 'Meu setor' },
                })
}
              onAutorClick={abrirPerfil}
            />
          ))}

          {!carregando && posts.length > 0 && (
            <p className="feed__end">Você viu todas as novidades do seu setor.</p>
          )}
        </div>

        <Radar />
      </div>

      {modalAberto && (
        <CriarPublicacaoModal
          onClose={() => {
            setModalAberto(false);
            carregarPosts(); // recarrega para mostrar o post recém-criado
          }}
        />
      )}
      {perfil && <PerfilFuncionarioModal perfil={perfil} onClose={() => setPerfil(null)} />}
    </FeedLayout>
  );
}

export default MeuSetor;
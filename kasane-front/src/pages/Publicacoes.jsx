import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import api from '../api/client';
import Radar from '../components/Radar';
import FeedLayout from '../components/FeedLayout';
import Post from '../components/Post';
import '../assets/css/feed.css';
import CriarPublicacaoModal from '../components/CriarPublicacaoModal';
import PerfilFuncionarioModal from '../components/PerfilFuncionarioModal';
import { useNavigate } from 'react-router-dom';

const setor = 'geral';

const lembretes = [
  { id: 1, data: '21 out', titulo: 'Atualizar seus dados', detalhe: 'Hoje, até 18h' },
  { id: 2, data: '23 out', titulo: 'Pesquisa de clima', detalhe: 'Sexta, até 18h' },
  { id: 3, data: '23 out', titulo: 'Café entre setores', detalhe: 'Sexta, às 15h' },
];

function Publicacoes() {
  const [busca, setBusca] = useState('');
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [perfil, setPerfil] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/publicacaos", { params: { setor, busca } })
      .then((res) => setPosts(res.data), setErro(null))
      .catch(() => setErro('Não foi possível carregar as publicações.'))
      .finally(() => setCarregando(false));
  }, [busca]);


 
  async function abrirPerfil(post) {
    try
    {
      await api.get(`/funcionarios/${post.funcionario_id}`)
               .then((res) => setPerfil(res.data))
    }
    catch(err)
    {
      alert("Não foi possivel abrir o perfil")
    }
  }

  // Alterna entre "Salvar" e "Salvo" no post clicado
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
    <FeedLayout active="geral" busca={busca} onBuscaChange={setBusca}>
      {/* Cabeçalho */}
      <div className="page-header page-header--center">
        <h1 className="page-header__title">Feed Geral</h1>
        <button type="button" className="btn btn--primary" onClick={() => setModalAberto(true)}>
          <Plus size={18} aria-hidden="true" />
          Fazer post
        </button>
      </div>

      <div className="feed__grid">
        {/* Lista de publicações */}
        <div className="feed__list">
          {carregando && <p>Carregando...</p>}
          {erro && <p>{erro}</p>}

          {posts.map((post) => (
            <Post
              key={post.publicacao_id}
              post={post}
              onSalvar={toggleSalvo}
              onComentarios={(id) =>
                navigate(`/publicacoes/${id}`, {
                  state: { origem: '/publicacoes', active: 'geral', rotulo: 'Geral' },
                })
              }
              onAutorClick={abrirPerfil}
            />
          ))}

          {!carregando && posts.length > 0 && (
            <p className="feed__end">Você viu todas as novidades da sua empresa.</p>
          )}
        </div>

        <Radar />
      </div>

      {modalAberto && <CriarPublicacaoModal onClose={() => setModalAberto(false)} />}
      {perfil && <PerfilFuncionarioModal perfil={perfil} onClose={() => setPerfil(null)} />}
    </FeedLayout>
  );
}

export default Publicacoes;
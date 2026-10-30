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
import BoxNotificacao from '../components/BoxNotificacao';

const setor = 'geral';

function Publicacoes() {
  const [busca, setBusca] = useState('');
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [boxNotificacao, setBoxNotificacao] = useState(false);
  const [notificacao, setNotificacao] = useState(null);
  const [texto, setTexto] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [perfil, setPerfil] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/publicacaos", { params: { setor, busca } })
      .then((res) => {
        setPosts(res.data);
        setErro(null); 
      })
      .catch(() => {
        setErro('Não foi possível carregar as publicações.'); 
        setTexto("Houve um erro na busca.");
        setBoxNotificacao(true); 
      })
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
      setErro("Não foi possivel abrir o perfil.");
      setTexto("Houve um erro na busca.");
      setBoxNotificacao(true);
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
      if (salvar) {
        await api.post(`/publicacaos/${id}/salvar`)
        setBoxNotificacao(true); 
        setNotificacao("Post Salvo com sucesso!");
        setTexto("O post já está disponível em sua página de salvos.");
      }
      else {
        await api.delete(`/publicacaos/${id}/salvar`);
        setBoxNotificacao(true); 
        setNotificacao("Salvo retirado com sucesso!");
        setTexto("Se necessitar salve novamente.");
      }
    } catch {
      setErro('Não foi possível salvar o post.');
      setTexto("Houve um erro no salvamento");
      setBoxNotificacao(true)
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
          {erro && boxNotificacao && <BoxNotificacao mensagem={erro} subtexto={texto} cor={1} onClose={() => setBoxNotificacao(false)}/>}
          {notificacao && boxNotificacao && <BoxNotificacao mensagem={notificacao} subtexto={texto} cor={2} onClose={() => setBoxNotificacao(false)}/>}

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
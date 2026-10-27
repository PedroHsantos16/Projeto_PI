import { useState } from 'react';
import { Plus, BookmarkCheck } from 'lucide-react';
import FeedLayout from '../components/FeedLayout';
import Post from '../components/Post';
import Radar from '../components/Radar';
import CriarPublicacaoModal from '../components/CriarPublicacaoModal';
import PerfilFuncionarioModal from '../components/PerfilFuncionarioModal';

/* Dados de exemplo: substitua pelos dados da API */
const postsIniciais = [
  {
    id: 1,
    iniciais: 'CS',
    autor: 'Camila Souza',
    cargo: 'Coordenadora de RH · Recursos Humanos',
    data: '16 de Outubro, 09:15',
    titulo: 'Sua voz transforma a Aurora',
    texto:
      'Nossa pesquisa de clima está aberta! Reserve 5 minutos para contar como tem sido sua experiência. As respostas são anônimas e nos ajudam a construir um lugar melhor para todos.',
    comentarios: 2,
    salvo: true,
  },
  {
    id: 2,
    iniciais: 'RM',
    autor: 'Rafael Mendes',
    cargo: 'Analista de infraestrutura · Tecnologia',
    data: '16/10, 08:40',
    titulo: 'Manutenção da rede neste sábado',
    texto:
      'No dia 24/10, das 8h às 10h, faremos uma atualização na rede interna. Nesse período, a VPN ficará indisponível. Programe suas atividades e conte com o time de TI.',
    comentarios: 4,
    salvo: true,
  },
];

function Salvos() {
  const [busca, setBusca] = useState('');
  const [posts, setPosts] = useState(postsIniciais);
  const [modalAberto, setModalAberto] = useState(false);
  const [perfil, setPerfil] = useState(null);

  function abrirPerfil(post) {
  // TODO: buscar o perfil real do autor na API
  setPerfil({
    iniciais: post.iniciais,
    nome: post.autor,
    cargo: 'Coordenadora de Recursos Humanos',
    setor: 'Recursos Humanos',
    empresa: 'Empresa X',
    email: 'camila.souza@auroratec.com.br',
    ramal: '204',
    desde: '15 de março de 2021',
  });
}

  // Remove o post da lista de salvos
  function removerDosSalvos(id) {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  }

  return (
    <FeedLayout active="salvos" busca={busca} onBuscaChange={setBusca}>
      {/* Cabeçalho */}
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

      {/* Resumo */}
      <div className="saved-summary">
        <span className="saved-summary__count">
          <BookmarkCheck strokeWidth={1.5} aria-hidden="true" />
          {posts.length} {posts.length === 1 ? 'publicação salva' : 'publicações salvas'}
        </span>
        <span className="saved-summary__note">Visíveis somente para você</span>
      </div>

      <div className="feed__grid">
        <div className="feed__list">
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onSalvar={removerDosSalvos} 
              removivel
              onComentarios={() => navigate('/DetalhePublicacao')}
              onAutorClick={abrirPerfil}
            />
          ))}

          <p className="feed__end">Você viu todos seus posts salvos.</p>
        </div>

        <Radar />
      </div>

      {modalAberto && <CriarPublicacaoModal onClose={() => setModalAberto(false)} />}
      {perfil && <PerfilFuncionarioModal perfil={perfil} onClose={() => setPerfil(null)} />}
    </FeedLayout>
  );
}

export default Salvos;
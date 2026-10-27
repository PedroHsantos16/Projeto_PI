import { useState } from 'react';
import { Plus } from 'lucide-react';
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
    iniciais: 'CS',
    autor: 'Camila Souza',
    cargo: 'Coordenadora de RH · Recursos Humanos',
    data: '16/10, 14:10',
    titulo: 'Vamos preparar a integração de novembro?',
    texto:
      'Equipe, o roteiro de boas-vindas já está na pasta do RH. Revisem as atividades e enviem suas sugestões até quinta-feira, às 17h. Nosso próximo encontro de alinhamento será na sexta, às 10h.',
    comentarios: 5,
    salvo: false,
  },
];

function MeuSetor() {
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

  function toggleSalvo(id) {
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, salvo: !post.salvo } : post))
    );
  }

  return (
    <FeedLayout active="meu-setor" busca={busca} onBuscaChange={setBusca}>
      {/* Cabeçalho */}
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
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onSalvar={toggleSalvo}
              onComentarios={() => navigate('/DetalhePublicacao')}
              onAutorClick={abrirPerfil}
            />
          ))}

          <p className="feed__end">Você viu todas as novidades do seu setor.</p>
        </div>

        <Radar />
      </div>

      {modalAberto && <CriarPublicacaoModal onClose={() => setModalAberto(false)} />}
      {perfil && <PerfilFuncionarioModal perfil={perfil} onClose={() => setPerfil(null)} />}
    </FeedLayout>
  );
}

export default MeuSetor;
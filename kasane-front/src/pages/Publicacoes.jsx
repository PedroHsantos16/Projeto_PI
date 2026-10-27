import { useState } from 'react';
import { Plus } from 'lucide-react';
import Radar from '../components/Radar';
import FeedLayout from '../components/FeedLayout';
import Post from '../components/Post';
import '../assets/css/feed.css';
import CriarPublicacaoModal from '../components/CriarPublicacaoModal';
import PerfilFuncionarioModal from '../components/PerfilFuncionarioModal';

/* Dados de exemplo para montar o visual: substitua pelos dados da API */
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
    data: '16/10, 8:45',
    titulo: 'Manutenção da rede neste sábado',
    texto:
      'No dia 24/10, das 8h às 10h, faremos uma atualização na rede interna. Nesse período, a VPN ficará indisponível. Programe suas atividades e conte com o time de TI.',
    comentarios: 4,
    salvo: true,
  },
  {
    id: 3,
    iniciais: 'BR',
    autor: 'Beatriz Rocha',
    cargo: 'Analista de comunicação · Comunicação',
    data: '15 de Outubro, 16:30',
    titulo: 'Um café para conectar ideias',
    texto:
      'Nosso café entre setores acontece na sexta, às 15h, no espaço de convivência. Traga sua caneca e uma boa ideia para compartilhar!',
    comentarios: 3,
    salvo: false,
  },
];

const lembretes = [
  { id: 1, data: '21 out', titulo: 'Atualizar seus dados', detalhe: 'Hoje, até 18h' },
  { id: 2, data: '23 out', titulo: 'Pesquisa de clima', detalhe: 'Sexta, até 18h' },
  { id: 3, data: '23 out', titulo: 'Café entre setores', detalhe: 'Sexta, às 15h' },
];

function Publicacoes() {
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

  // Alterna entre "Salvar" e "Salvo" no post clicado
  function toggleSalvo(id) {
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, salvo: !post.salvo } : post))
    );
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
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onSalvar={toggleSalvo}
              onComentarios={() => navigate('/DetalhePublicacao')}
              onAutorClick={abrirPerfil}
            />
          ))}
        </div>

        <Radar />
      </div>

      {modalAberto && <CriarPublicacaoModal onClose={() => setModalAberto(false)} />}
      {perfil && <PerfilFuncionarioModal perfil={perfil} onClose={() => setPerfil(null)} />}
    </FeedLayout>
  );
}

export default Publicacoes;
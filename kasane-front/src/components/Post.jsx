import { MessageCircle, Bookmark, BookmarkCheck } from 'lucide-react';
import '../assets/css/feed.css';

/*
  Card de uma publicação.
  Props:
    post          -> { post_id, autor_foto, autor, autor_cargo, created_at, titulo, texto, comentarios}
                     "texto" pode ser string ou array de parágrafos
    onSalvar      -> função chamada com o id do post ao clicar em "Salvar/Salvo"
    onComentarios (opcional) -> função chamada com o id ao clicar em "comentários"
    removivel     (opcional) -> true na tela de Salvos: botão vira "Remover dos salvos"
    detalhe       (opcional) -> true na tela de detalhe: título vira h1
*/
function Post({ post, onSalvar, onComentarios, onAutorClick, removivel = false, detalhe = false }){
  const marcado = removivel || post.salvo;
  const rotulo = removivel ? 'Remover dos salvos' : post.salvo ? 'Salvo' : 'Salvar';
  const Titulo = detalhe ? 'h1' : 'h2';
  const paragrafos = Array.isArray(post.texto) ? post.texto : [post.texto];

  const total = post.total_comentarios ?? post.quantidade_comentarios ?? 0;
  const data = post.created_at
    ? new Date(post.created_at).toLocaleDateString('pt-BR')
    : '';

  return (
    <article className="post">
      <header className="post__header">
        <button
          type="button"
          className="post__author-btn"
          onClick={() => onAutorClick?.(post)}
          aria-label={`Ver perfil de ${post.autor}`}
        >
          <span className="post__avatar" aria-hidden="true">{post.autor?.charAt(0)}</span>
          <div className="post__author">
            <p className="post__name">{post.autor}</p>
            <p className="post__role">{post.autor_cargo}</p>
          </div>
        </button>
        <time className="post__date">{data}</time>
      </header>

      <Titulo className="post__title">{post.titulo}</Titulo>
      {paragrafos.map((paragrafo, index) => (
        <p className="post__text" key={index}>{paragrafo}</p>
      ))}

      <footer className="post__footer">
        <button
          type="button"
          className="post__comments"
          onClick={() => onComentarios?.(post.publicacao_id)}
        >
          <MessageCircle strokeWidth={1.5} aria-hidden="true" />
          {total} comentários
        </button>

        <button
          type="button"
          className="post__save"
          onClick={() => onSalvar?.(post.publicacao_id)}
          aria-pressed={marcado}
        >
          {marcado ? (
            <BookmarkCheck strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Bookmark strokeWidth={1.5} aria-hidden="true" />
          )}
          {rotulo}
        </button>
      </footer>
    </article>
  );
}

export default Post;
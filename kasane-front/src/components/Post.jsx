import { MessageCircle, Bookmark, BookmarkCheck } from 'lucide-react';
import '../assets/css/feed.css';

/*
  Card de uma publicação.
  Props:
    post          -> { id, iniciais, autor, cargo, data, titulo, texto, comentarios, salvo }
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

  return (
    <article className="post">
      <header className="post__header">
        <button
          type="button"
          className="post__author-btn"
          onClick={() => onAutorClick?.(post)}
          aria-label={`Ver perfil de ${post.autor}`}
        >
          <span className="post__avatar" aria-hidden="true">{post.iniciais}</span>
          <div className="post__author">
            <p className="post__name">{post.autor}</p>
            <p className="post__role">{post.cargo}</p>
          </div>
        </button>
        <time className="post__date">{post.data}</time>
      </header>

      <Titulo className="post__title">{post.titulo}</Titulo>
      {paragrafos.map((paragrafo, index) => (
        <p className="post__text" key={index}>{paragrafo}</p>
      ))}

      <footer className="post__footer">
        <button
          type="button"
          className="post__comments"
          onClick={() => onComentarios?.(post.id)}
        >
          <MessageCircle strokeWidth={1.5} aria-hidden="true" />
          {post.comentarios} comentários
        </button>

        <button
          type="button"
          className="post__save"
          onClick={() => onSalvar?.(post.id)}
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
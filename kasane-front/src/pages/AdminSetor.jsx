import { useState } from 'react';
import { Network, Users, Search, ChevronDown, Plus } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import '../assets/css/admin-setor.css';

/* Dados de exemplo para montar o visual: substitua pelos dados da API */


function AdminSetor() {
  const [busca, setBusca] = useState('');
  const [setores, setSetores] = useState([]);

  const [form, setForm] = useState({
    nome: '',
    responsavel: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleCancel() {
    setForm({ nome: '', descricao: '', responsavel: '' });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: enviar "form" para a API
    console.log(form);
  }

  async function verSetores()
  {
    await api.get("/setors")
  }

  return (
    <AdminLayout active="setores">
      {/* Cabeçalho */}
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Setores da empresa</h1>
          <p className="page-header__subtitle">
            Organize os times e mantenha cada conversa no lugar certo.
          </p>
        </div>
        <span className="badge">Acesso de administrador</span>
      </div>

      {/* Estatísticas */}
      <div className="stats">
        <article className="stat-card">
          <div className="stat-card__icon">
            <Network strokeWidth={1.5} aria-hidden="true" />
          </div>
          <div>
            <p className="stat-card__value">6</p>
            <p className="stat-card__label">setores cadastrados</p>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-card__icon">
            <Users strokeWidth={1.5} aria-hidden="true" />
          </div>
          <div>
            <p className="stat-card__value">64</p>
            <p className="stat-card__label">pessoas na organização</p>
          </div>
        </article>
      </div>

      <div className="setores__grid">
        {/* Lista de setores */}
        <section className="panel">
          <div className="setores__list-head">
            <h2 className="panel__title">Todos os setores</h2>

            <div className="search">
              <Search className="search__icon" strokeWidth={1.5} aria-hidden="true" />
              <input
                className="search__input"
                type="search"
                placeholder="Buscar setor"
                aria-label="Buscar setor"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
              />
            </div>
          </div>

          <table className="setores__table">
            <thead>
              <tr>
                <th scope="col">Setor</th>
                <th scope="col" className="setores__col-owner">Responsável</th>
                <th scope="col" className="setores__col-members">Membros</th>
              </tr>
            </thead>
            <tbody>
              {setores.map((setor) => (
                <tr key={setor.setor_id}>
                  <td>
                    <p className="setores__name">{setor.nome}</p>
                  </td>
                  <td className="setores__owner">{setor.responsavel}</td>
                  <td className="setores__members">{setor.quantidade_funcionarios}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="setores__footer">
            Exibindo 6 de 6 setores · Aurora Tecnologia
          </p>
        </section>

        {/* Formulário */}
        <section className="panel">
          <h2 className="setores__form-title">Cadastrar novo setor</h2>

          <form className="setores__form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="form-field__label" htmlFor="nome">Nome do setor *</label>
              <input
                className="input"
                id="nome"
                name="nome"
                type="text"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-field">
              <label className="form-field__label" htmlFor="responsavel">Responsável *</label>
              <div className="input-wrapper">
                <select
                  className="input input--icon select"
                  id="responsavel"
                  name="responsavel"
                  value={form.responsavel}
                  onChange={handleChange}
                  required
                >
                  <option value="" />
                  {/* TODO: listar os funcionários vindos da API */}
                  <option value="camila">Camila Souza</option>
                  <option value="rafael">Rafael Mendes</option>
                  <option value="beatriz">Beatriz Rocha</option>
                </select>
                <span className="input-wrapper__icon">
                  <ChevronDown strokeWidth={1.5} aria-hidden="true" />
                </span>
              </div>
            </div>

            <div className="setores__actions">
              <button type="button" className="btn btn--outline" onClick={handleCancel}>
                Cancelar
              </button>
              <button type="submit" className="btn btn--primary">
                <Plus size={18} aria-hidden="true" />
                Cadastrar setor
              </button>
            </div>
          </form>
        </section>
      </div>
    </AdminLayout>
  );
}

export default AdminSetor;
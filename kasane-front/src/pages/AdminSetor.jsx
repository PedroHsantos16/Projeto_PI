import { useState, useEffect } from 'react';
import { Network, Users, Search, ChevronDown, Plus } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/AdminLayout';
import '../assets/css/admin-setor.css';

const estadoInicial = { nome: '', responsavel_id: '' };

function primeiroErro(err) {
  const erros = err.response?.data?.errors;
  if (erros) return Object.values(erros)[0][0];
  return err.response?.data?.message ?? 'Não foi possível concluir a operação.';
}

function AdminSetor() {
  const { usuario } = useAuth();

  const [busca, setBusca] = useState('');
  const [setores, setSetores] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [form, setForm] = useState(estadoInicial);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);

  function carregarSetores() {
    return api
      .get('/setors')
      .then((res) => setSetores(res.data))
      .catch(() => setErro('Não foi possível carregar os setores.'))
      .finally(() => setCarregando(false));
  }

  function carregarFuncionarios() {
    return api.get('/funcionarios').then((res) => setFuncionarios(res.data));
  }

  useEffect(() => {
    carregarSetores();
    carregarFuncionarios();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleCancel() {
    setForm(estadoInicial);
    setErro(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setEnviando(true);
    setErro(null);
    try {
      await api.post('/setors', form);
      setForm(estadoInicial);
      await carregarSetores(); // atualiza a lista
    } catch (err) {
      console.error(err.response?.status, err.response?.data);
      setErro(primeiroErro(err));
    } finally {
      setEnviando(false);
    }
  }

  const setoresFiltrados = setores.filter((s) =>
    s.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const totalPessoas = setores.reduce(
    (soma, s) => soma + (s.quantidade_funcionarios ?? 0),
    0
  );

  return (
    <AdminLayout active="setores">
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Setores da empresa</h1>
          <p className="page-header__subtitle">
            Organize os times e mantenha cada conversa no lugar certo.
          </p>
        </div>
        <span className="badge">Acesso de administrador</span>
      </div>

      <div className="stats">
        <article className="stat-card">
          <div className="stat-card__icon">
            <Network strokeWidth={1.5} aria-hidden="true" />
          </div>
          <div>
            <p className="stat-card__value">{setores.length}</p>
            <p className="stat-card__label">
              {setores.length === 1 ? 'setor cadastrado' : 'setores cadastrados'}
            </p>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-card__icon">
            <Users strokeWidth={1.5} aria-hidden="true" />
          </div>
          <div>
            <p className="stat-card__value">{totalPessoas}</p>
            <p className="stat-card__label">pessoas na organização</p>
          </div>
        </article>
      </div>

      <div className="setores__grid">
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
                <th></th>
                <th scope="col" className="setores__col-members">Membros</th>
              </tr>
            </thead>
            <tbody>
              {carregando && (
                <tr><td colSpan={3}>Carregando...</td></tr>
              )}
              {!carregando && setoresFiltrados.length === 0 && (
                <tr>
                  <td colSpan={3}>
                    {busca ? `Nenhum resultado para "${busca}".` : 'Nenhum setor cadastrado.'}
                  </td>
                </tr>
              )}
              {setoresFiltrados.map((setor) => (
                <tr key={setor.setor_id}>
                  <td>
                    <p className="setores__name">{setor.nome}</p>
                  </td>
                  <td></td>
                  <td className="setores__members">{setor.quantidade_funcionarios ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="setores__footer">
            Exibindo {setoresFiltrados.length} de {setores.length} setores · {usuario?.razao_social}
          </p>
        </section>

        <section className="panel">
          <h2 className="setores__form-title">Cadastrar novo setor</h2>

          {erro && <p role="alert">{erro}</p>}

          <form className="setores__form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="form-field__label" htmlFor="nome">Nome do setor *</label>
              <input className="input" id="nome" name="nome" type="text"
                value={form.nome} onChange={handleChange} required />
            </div>


            <div className="setores__actions">
              <button type="button" className="btn btn--outline" onClick={handleCancel}>
                Cancelar
              </button>
              <button type="submit" className="btn btn--primary" disabled={enviando}>
                <Plus size={18} aria-hidden="true" />
                {enviando ? 'Cadastrando...' : 'Cadastrar setor'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </AdminLayout>
  );
}

export default AdminSetor;
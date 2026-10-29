import { useState, useEffect } from 'react';
import { Search, ChevronDown, Plus } from 'lucide-react';
import api from '../api/client';
import AdminLayout from '../components/AdminLayout';

const estadoInicial = {
  nome: '',
  setor_id: '',
  cargo: '',
  tipo_conta: '',
  cpf: '',
  ramal: '',
  telefone: '',
  email: '',
};

function primeiroErro(err) {
  const erros = err.response?.data?.errors;
  if (erros) return Object.values(erros)[0][0];
  return err.response?.data?.message ?? 'Não foi possível concluir a operação.';
}

function AdminFunc() {
  const [busca, setBusca] = useState('');
  const [form, setForm] = useState(estadoInicial);
  const [funcionarios, setFuncionarios] = useState([]);
  const [setores, setSetores] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);
  const [criado, setCriado] = useState(null); // { nome, email, senha }

  function carregarFuncionarios(termo = busca) {
    return api
      .get('/funcionarios', { params: { busca: termo } })
      .then((res) => setFuncionarios(res.data))
      .catch(() => setErro('Não foi possível carregar os funcionários.'))
      .finally(() => setCarregando(false));
  }

  // setores para o <select>: carrega uma vez
  useEffect(() => {
    api.get('/setors').then((res) => setSetores(res.data));
  }, []);

  // busca com debounce
  useEffect(() => {
    const timer = setTimeout(() => carregarFuncionarios(busca), 400);
    return () => clearTimeout(timer);
  }, [busca]);

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
      const { data } = await api.post('/funcionarios', form);
      setCriado({
        nome: data.funcionario.nome,
        email: data.funcionario.email,
        senha: data.senha_temporaria,
      });
      setForm(estadoInicial);
      await carregarFuncionarios(); // atualiza a lista
    } catch (err) {
      console.error(err.response?.status, err.response?.data);
      setErro(primeiroErro(err));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <AdminLayout active="funcionarios">
      <div className="page-header">
        <h1 className="page-header__title">Cadastrar Funcionário</h1>
        <span className="badge">Acesso de administrador</span>
      </div>

      <div className="admin-grid">
        <section className="panel">
          <div className="panel__head">
            <h2 className="panel__title">Todos os funcionários</h2>

            <div className="search">
              <Search className="search__icon" strokeWidth={1.5} aria-hidden="true" />
              <input
                className="search__input search__input--wide"
                type="search"
                placeholder="Buscar funcionário"
                aria-label="Buscar funcionário"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
              />
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col" className="data-table__col-mid">Cargo</th>
                <th scope="col" className="data-table__col-end">Ramal</th>
              </tr>
            </thead>
            <tbody>
              {carregando && (
                <tr><td colSpan={3}>Carregando...</td></tr>
              )}
              {!carregando && funcionarios.length === 0 && (
                <tr>
                  <td colSpan={3}>
                    {busca ? `Nenhum resultado para "${busca}".` : 'Nenhum funcionário cadastrado.'}
                  </td>
                </tr>
              )}
              {funcionarios.map((func) => (
                <tr key={func.funcionario_id}>
                  <td>
                    <p className="data-table__name">{func.nome}</p>
                    <p className="data-table__sub">{func.setors?.nome}</p>
                  </td>
                  <td className="data-table__muted">{func.cargo}</td>
                  <td className="data-table__value">{func.ramal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="panel">
          <h2 className="panel-form__title">Cadastrar novo funcionário</h2>

          {criado && (
            <div className="badge" role="status">
              <p>
                {criado.nome} cadastrado(a). 
              </p>
              <td></td>
              <button type="button" className="btn btn--outline" onClick={() => setCriado(null)}>
                Fechar aviso
              </button>
            </div>
          )}

          {erro && <p role="alert">{erro}</p>}

          <form className="panel-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="form-field__label" htmlFor="nome">Nome *</label>
              <input className="input" id="nome" name="nome" type="text"
                value={form.nome} onChange={handleChange} required />
            </div>

            <div className="form-field">
              <label className="form-field__label" htmlFor="setor_id">Setor *</label>
              <div className="input-wrapper">
                <select className="input input--icon select" id="setor_id" name="setor_id"
                  value={form.setor_id} onChange={handleChange} required>
                  <option value="" />
                  {setores.map((s) => (
                    <option key={s.setor_id} value={s.setor_id}>{s.nome}</option>
                  ))}
                </select>
                <span className="input-wrapper__icon">
                  <ChevronDown strokeWidth={1.5} aria-hidden="true" />
                </span>
              </div>
            </div>

            <div className="panel-form__row">
              <div className="form-field">
                <label className="form-field__label" htmlFor="cargo">Cargo *</label>
                <input className="input" id="cargo" name="cargo" type="text"
                  value={form.cargo} onChange={handleChange} required />
              </div>

              <div className="form-field">
                <label className="form-field__label" htmlFor="tipo_conta">
                  Conta Administrativa? *
                </label>
                <div className="input-wrapper">
                  <select className="input input--icon select" id="tipo_conta" name="tipo_conta"
                    value={form.tipo_conta} onChange={handleChange} required>
                    <option value="" />
                    <option value="admin">Sim</option>
                    <option value="comum">Não</option>
                  </select>
                  <span className="input-wrapper__icon">
                    <ChevronDown strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>

            <div className="panel-form__row">
              <div className="form-field">
                <label className="form-field__label" htmlFor="cpf">CPF *</label>
                <input className="input" id="cpf" name="cpf" type="text" inputMode="numeric"
                  value={form.cpf} onChange={handleChange} required />
              </div>

              <div className="form-field">
                <label className="form-field__label" htmlFor="ramal">Ramal *</label>
                <input className="input" id="ramal" name="ramal" type="text" inputMode="numeric"
                  value={form.ramal} onChange={handleChange} required />
              </div>
            </div>

            <div className="panel-form__row">
              <div className="form-field">
                <label className="form-field__label" htmlFor="telefone">Telefone *</label>
                <input className="input" id="telefone" name="telefone" type="tel" autoComplete="tel"
                  value={form.telefone} onChange={handleChange} required />
              </div>

              <div className="form-field">
                <label className="form-field__label" htmlFor="email">E-mail *</label>
                <input className="input" id="email" name="email" type="email" autoComplete="email"
                  value={form.email} onChange={handleChange} required />
              </div>

              <div className="form-field">
                <label className="form-field__label" htmlFor="email">Senha *</label>
                <input className="input" id="senha" name="senha" type="text"
                  value={form.senha} onChange={handleChange} required />
              </div>
            </div>

            <div className="panel-form__actions">
              <button type="button" className="btn btn--outline" onClick={handleCancel}>
                Cancelar
              </button>
              <button type="submit" className="btn btn--primary" disabled={enviando}>
                <Plus size={18} aria-hidden="true" />
                {enviando ? 'Cadastrando...' : 'Cadastrar funcionário'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </AdminLayout>
  );
}

export default AdminFunc;
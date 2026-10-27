import { useState } from 'react';
import { Search, ChevronDown, Plus } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

/* Dados de exemplo para montar o visual: substitua pelos dados da API */
const funcionarios = [
  { id: 1, nome: 'Carlos Marcos', setor: 'Recursos Humanos', cargo: 'Cantor', ramal: 200 },
  { id: 2, nome: 'Rafael Mendes', setor: 'Tecnologia', cargo: 'Programador', ramal: 24 },
  { id: 3, nome: 'Beatriz Rocha', setor: 'Comunicação', cargo: 'Comunicadora', ramal: 8 },
  { id: 4, nome: 'Diego Santos', setor: 'Operações', cargo: 'Operador', ramal: 14 },
  { id: 5, nome: 'Luciana Alves', setor: 'Financeiro', cargo: 'Financeiro', ramal: 6 },
  { id: 6, nome: 'Renata Costa', setor: 'Projetos especiais', cargo: 'Projetista', ramal: 0 },
];

const estadoInicial = {
  nome: '',
  setor: '',
  cargo: '',
  conta_administrativa: '',
  cpf: '',
  ramal: '',
  telefone: '',
  email: '',
};

function AdminFunc() {
  const [busca, setBusca] = useState('');
  const [form, setForm] = useState(estadoInicial);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleCancel() {
    setForm(estadoInicial);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: enviar "form" para a API
    console.log(form);
  }

  return (
    <AdminLayout active="funcionarios">
      {/* Cabeçalho */}
      <div className="page-header">
        <h1 className="page-header__title">Cadastrar Funcionário</h1>
        <span className="badge">Acesso de administrador</span>
      </div>

      <div className="admin-grid">
        {/* Lista de funcionários */}
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
              {funcionarios.map((func) => (
                <tr key={func.id}>
                  <td>
                    <p className="data-table__name">{func.nome}</p>
                    <p className="data-table__sub">{func.setor}</p>
                  </td>
                  <td className="data-table__muted">{func.cargo}</td>
                  <td className="data-table__value">{func.ramal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Formulário */}
        <section className="panel">
          <h2 className="panel-form__title">Cadastrar novo funcionário</h2>

          <form className="panel-form" onSubmit={handleSubmit}>
            {/* Nome */}
            <div className="form-field">
              <label className="form-field__label" htmlFor="nome">Nome *</label>
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

            {/* Setor */}
            <div className="form-field">
              <label className="form-field__label" htmlFor="setor">Setor *</label>
              <div className="input-wrapper">
                <select
                  className="input input--icon select"
                  id="setor"
                  name="setor"
                  value={form.setor}
                  onChange={handleChange}
                  required
                >
                  <option value="" />
                  {/* TODO: listar os setores vindos da API */}
                  <option value="rh">Recursos Humanos</option>
                  <option value="tecnologia">Tecnologia</option>
                  <option value="comunicacao">Comunicação</option>
                </select>
                <span className="input-wrapper__icon">
                  <ChevronDown strokeWidth={1.5} aria-hidden="true" />
                </span>
              </div>
            </div>

            {/* Cargo + Conta administrativa */}
            <div className="panel-form__row">
              <div className="form-field">
                <label className="form-field__label" htmlFor="cargo">Cargo *</label>
                <input
                  className="input"
                  id="cargo"
                  name="cargo"
                  type="text"
                  value={form.cargo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-field__label" htmlFor="conta_administrativa">
                  Conta Administrativa? *
                </label>
                <div className="input-wrapper">
                  <select
                    className="input input--icon select"
                    id="conta_administrativa"
                    name="conta_administrativa"
                    value={form.conta_administrativa}
                    onChange={handleChange}
                    required
                  >
                    <option value="" />
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                  <span className="input-wrapper__icon">
                    <ChevronDown strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>

            {/* CPF + Ramal */}
            <div className="panel-form__row">
              <div className="form-field">
                <label className="form-field__label" htmlFor="cpf">CPF *</label>
                <input
                  className="input"
                  id="cpf"
                  name="cpf"
                  type="text"
                  inputMode="numeric"
                  value={form.cpf}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-field__label" htmlFor="ramal">Ramal *</label>
                <input
                  className="input"
                  id="ramal"
                  name="ramal"
                  type="text"
                  inputMode="numeric"
                  value={form.ramal}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Telefone + E-mail */}
            <div className="panel-form__row">
              <div className="form-field">
                <label className="form-field__label" htmlFor="telefone">Telefone *</label>
                <input
                  className="input"
                  id="telefone"
                  name="telefone"
                  type="tel"
                  autoComplete="tel"
                  value={form.telefone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-field__label" htmlFor="email">E-mail *</label>
                <input
                  className="input"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="panel-form__actions">
              <button type="button" className="btn btn--outline" onClick={handleCancel}>
                Cancelar
              </button>
              <button type="submit" className="btn btn--primary">
                <Plus size={18} aria-hidden="true" />
                Cadastrar funcionário
              </button>
            </div>
          </form>
        </section>
      </div>
    </AdminLayout>
  );
}

export default AdminFunc;
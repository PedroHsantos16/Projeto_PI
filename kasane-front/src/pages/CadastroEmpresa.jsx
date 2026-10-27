import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/auth.css';
import '../assets/css/cadastro-empresa.css';
import logo from '../assets/KasaneLogo.svg';
import ArrowIcon from '../components/ArrowIcon';
import api from '../api/client'

function CadastroEmpresa() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    razao_social: '',
    cnpj: '',
    telefone: '',
    email: '',
    cep: '',
    rua: '',
    bairro: '',
    numero: '',
    senha: '',
    confirmar_senha: '',
  });

  // Visibilidade das senhas (não faz parte dos dados do formulário)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Atualiza apenas o campo que mudou, usando o "name" do input como chave
  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await api.post("/registrar/empresa", form)
  }

  return (
    <main className="auth">
      {/* Selo da logo */}
      <div className="auth__logo">
        <img src={logo} alt="Kasane" />
      </div>

      <section className="auth-card">
        <div className="auth-card__back">
          <button type="button" className="link-back" onClick={() => navigate('/')}>
            <ArrowIcon />
            Voltar ao início
          </button>
        </div>

        <p className="eyebrow">Cadastro da empresa</p>
        <h1 className="auth-card__title">Preencha os dados.</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Razão social */}
          <div className="form-field">
            <label className="form-field__label" htmlFor="razao_social">
              Razão social / nome da empresa *
            </label>
            <div className="input-wrapper">
              <input
                className="input input--icon"
                id="razao_social"
                name="razao_social"
                type="text"
                placeholder="Aurora Tecnologia Ltda."
                autoComplete="organization"
                value={form.razao_social}
                onChange={handleChange}
                required
              />
              <span className="input-wrapper__icon">
                <BuildingIcon />
              </span>
            </div>
          </div>

          {/* CNPJ */}
          <div className="form-field">
            <label className="form-field__label" htmlFor="cnpj">CNPJ *</label>
            <input
              className="input"
              id="cnpj"
              name="cnpj"
              type="text"
              inputMode="numeric"
              placeholder="12.345.678/0001-95"
              value={form.cnpj}
              onChange={handleChange}
              required
            />
          </div>

          {/* Telefone + E-mail */}
          <div className="register__row">
            <div className="form-field">
              <label className="form-field__label" htmlFor="telefone">Telefone *</label>
              <input
                className="input"
                id="telefone"
                name="telefone"
                type="tel"
                placeholder="(**) *****-****"
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
                placeholder="renata.costa@auroratec.com.br"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* CEP + Rua */}
          <div className="register__row">
            <div className="form-field">
              <label className="form-field__label" htmlFor="cep">CEP *</label>
              <input
                className="input"
                id="cep"
                name="cep"
                type="text"
                inputMode="numeric"
                placeholder="Insira o CEP da empresa"
                autoComplete="postal-code"
                value={form.cep}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label className="form-field__label" htmlFor="rua">Rua *</label>
              <input
                className="input"
                id="rua"
                name="rua"
                type="text"
                placeholder="Insira a rua da empresa"
                autoComplete="street-address"
                value={form.rua}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Bairro + Número */}
          <div className="register__row register__row--address">
            <div className="form-field">
              <label className="form-field__label" htmlFor="bairro">Bairro *</label>
              <input
                className="input"
                id="bairro"
                name="bairro"
                type="text"
                placeholder="Insira o bairro da empresa"
                value={form.bairro}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label className="form-field__label" htmlFor="numero">Número *</label>
              <input
                className="input"
                id="numero"
                name="numero"
                type="text"
                inputMode="numeric"
                value={form.numero}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Senha + Confirmar senha */}
          <div className="register__row">
            <div className="form-field">
              <label className="form-field__label" htmlFor="senha">Senha *</label>
              <div className="input-wrapper">
                <input
                  className="input input--icon"
                  id="senha"
                  name="senha"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.senha}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="input-wrapper__action"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
            </div>

            <div className="form-field">
              <label className="form-field__label" htmlFor="confirmar_senha">Confirmar senha *</label>
              <div className="input-wrapper">
                <input
                  className="input input--icon"
                  id="confirmar_senha"
                  name="confirmar_senha"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.confirmar_senha}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="input-wrapper__action"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  aria-label={showConfirm ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showConfirm ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn--primary btn--block register__submit">
            <ArrowIcon />
            Cadastrar empresa
          </button>
        </form>

        <p className="auth-card__footer">
          Empresa já cadastrada?{' '}
          <button type="button" className="link-inline" onClick={() => navigate('/login-empresa')}>
            Entrar
          </button>
        </p>
      </section>
    </main>
  );
}

/* ---------- Ícones locais ---------- */

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.73 5.08A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-2.16 3.19" />
      <path d="M6.61 6.61A17.5 17.5 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.39-1.61" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <path d="m2 2 20 20" />
    </svg>
  );
}

export default CadastroEmpresa;
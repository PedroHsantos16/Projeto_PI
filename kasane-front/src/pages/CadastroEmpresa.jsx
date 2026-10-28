import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/auth.css';
import '../assets/css/cadastro-empresa.css';
import logo from '../assets/KasaneLogo.svg';
import api from '../api/client'
import { ArrowRight, ArrowLeft, Building2, Eye, EyeOff } from 'lucide-react';

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
  const [erro, setErro] = useState(null);

  // Atualiza apenas o campo que mudou, usando o "name" do input como chave
  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try
    {
      await api.post("/registrar/empresa", form)
    }
    catch (err)
    {

    }


  }

  return (
    <main className="auth">
      {/* Selo da logo */}
      <div className="auth__logo">
        <img src={logo} alt="Kasane" />
      </div>

      <section className="auth-card">
        <div className="auth-card__back">
          <button type="button" className="link-back" onClick={() => navigate('/Home')}>
            <ArrowLeft aria-hidden="true" />
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
                <Building2 strokeWidth={1.5} aria-hidden="true" />
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
                  {showPassword ? <Eye strokeWidth={1.5} /> : <EyeOff strokeWidth={1.5} />}
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
                  {showConfirm ? <Eye strokeWidth={1.5} /> : <EyeOff strokeWidth={1.5} />}
                </button>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn--primary btn--block register__submit">
            <ArrowRight size={16} aria-hidden="true" />
            Cadastrar empresa
          </button>
        </form>

        <p className="auth-card__footer">
          Empresa já cadastrada?{' '}
          <button type="button" className="link-inline" onClick={() => navigate('/LoginEmpresa')}>
            Entrar
          </button>
        </p>
      </section>
    </main>
  );
}

export default CadastroEmpresa;